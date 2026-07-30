---
title: "从零实现 AI 芯片最小单元：int8 MAC 的 SystemVerilog 设计与验证"
date: "2026-07-30"
description: "用一个可综合、可自检的 int8 MAC 乘加单元，认识时钟、复位、有符号位宽和 testbench。"
tags: ["SystemVerilog", "AI芯片", "硬件设计", "仿真验证"]
author: "Lu Zhiyong"
---

神经网络里的全连接层、卷积和矩阵乘法，都会反复进行同一类基础运算：相乘，再把结果累加起来。这个项目把它缩小为一个可以完整读懂、运行和验证的硬件单元：**MAC（Multiply-Accumulate，乘加器）**。

```text
acc_out = acc_out + a * b
```

代码与仿真脚本已放在 [ai-chip-mac-pe](https://github.com/LZY041017/ai-chip-mac-pe) 仓库中。本文不追求一次讲完所有数字电路知识，而是从这个最小项目出发，建立一条可以亲手验证的学习路径。

## 这个 MAC 做什么

模块每个时钟上升沿只做一件明确的事：根据控制信号清零、累加，或保持原值。

| 信号 | 位宽 | 作用 |
| --- | ---: | --- |
| `clk` | 1 | 时钟；寄存器在上升沿更新 |
| `rst_n` | 1 | 低有效异步复位 |
| `valid` | 1 | 为 `1` 时执行一次乘加 |
| `clear` | 1 | 清空累加器，优先级高于 `valid` |
| `a`、`b` | 8 | 两个有符号 int8 输入，范围为 -128 到 127 |
| `acc_out` | 32 | 有符号累加结果 |

行为优先级如下：

```text
复位 > 清零 > 乘加 > 保持
```

例如，当前 `acc_out = 12`，且下一拍输入为 `valid=1`、`a=-2`、`b=5`，那么上升沿后的结果是：

```text
12 + (-2 × 5) = 2
```

这也是理解时序逻辑的第一个重点：SystemVerilog 不是按“代码写下来的顺序”持续运行；`always_ff @(posedge clk ...)` 描述的是一个只在时钟边沿更新状态的寄存器。

## 为什么输入是 8 位，累加器是 32 位

项目使用 `logic signed [7:0]` 描述 `a` 和 `b`。`signed` 很重要：它让最高位被解释为符号位，因此 `8'sh80` 表示 -128，而不是 128。

两个 8 位有符号数相乘，完整乘积需要 16 位：

```text
-128 × 127 = -16256
127 × 127  =  16129
```

但神经网络不会只乘一次，而是会连续累加许多项。因此项目把乘积扩展后加到 32 位 `acc_out` 中，以大幅降低溢出风险。这正是定点 AI 加速器最基础的精度设计思路。

核心数据通路很短：

```systemverilog
logic signed [15:0] product;

assign product = a * b;

always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n)
        acc_out <= '0;
    else if (clear)
        acc_out <= '0;
    else if (valid)
        acc_out <= acc_out + {{16{product[15]}}, product};
end
```

其中 `{{16{product[15]}}, product}` 是**符号扩展**：把 16 位乘积扩展成 32 位，同时让负数保持负数。`<=` 是非阻塞赋值，适合在时钟触发的寄存器逻辑中表达“同一拍结束时统一更新”。

## 怎样证明它不是“看起来能用”

硬件设计必须配合验证。项目的 testbench 会生成时钟，在每个下降沿准备输入，并在下一个上升沿后检查结果。

```systemverilog
@(negedge clk);
valid = valid_i;
clear = clear_i;
a = a_i;
b = b_i;

@(posedge clk);
#1;
if (acc_out !== expected) begin
    $error("FAIL: %s", test_name);
end
```

这里有两个值得记住的习惯：

1. 在下降沿改变输入，让它在下一次上升沿前稳定；
2. 使用自检查，而不是只盯着终端输出或波形“目测正确”。

当前测试覆盖了复位、`clear` 优先级、正负数乘加、`valid=0` 时保持，以及 `-128 × 127`、`127 × 127` 两个 int8 边界值。通过时会输出：

```text
ALL TESTS PASSED
```

## 在 Windows 上运行仿真

安装 Icarus Verilog 后，在项目根目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run_sim.ps1
```

脚本会编译 `rtl/mac_pe.sv` 与 `tb/mac_pe_tb.sv`，运行测试，并生成 `build/mac_pe_tb.vcd`。如已安装 GTKWave，可以打开波形：

```powershell
gtkwave .\build\mac_pe_tb.vcd
```

观察 `clk` 的每个上升沿，并与 `valid`、`clear`、`a`、`b` 和 `acc_out` 对照。你应该能看到累加结果依次经过：

```text
0 → 12 → 2 → 0 → -16256 → -127
```

## 下一步：把最小单元变成计算阵列

当你能解释每个时钟沿发生的事情，并能通过测试证明结果正确时，就可以自然扩展：

1. 增加 `ready/valid` 握手，理解硬件的数据流；
2. 增加饱和累加或溢出标志，理解定点数精度；
3. 组合 4 个 MAC，构建一个 2×2 小型阵列；
4. 用随机输入跑数百个周期，练习更系统的验证。

从一个正确、可测试的 MAC 开始，比一开始堆叠复杂模块更重要。硬件学习真正的分界线，是能不能清楚说出：**这一拍为什么会得到这个结果，以及测试如何证明它。**
