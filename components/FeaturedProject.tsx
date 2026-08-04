import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Code2,
  Cpu,
  FlaskConical,
  Gauge,
} from "lucide-react";

const projectLayers = [
  { label: "MODEL", detail: "Python 性能模型", icon: Gauge },
  { label: "SIM", detail: "周期级模拟器", icon: FlaskConical },
  { label: "RTL / HLS", detail: "PE 阵列与存储", icon: Cpu },
  { label: "SYSTEM", detail: "Attention 与 KV Cache", icon: Boxes },
];

const milestones = [
  { stage: "本科阶段", focus: "MAC → GEMM", state: "NOW" },
  { stage: "研一", focus: "数据流与存储", state: "NEXT" },
  { stage: "研二", focus: "Transformer 推理", state: "RESEARCH" },
  { stage: "研三", focus: "教材与开源发布", state: "RELEASE" },
];

export default function FeaturedProject() {
  return (
    <section
      aria-labelledby="featured-project-title"
      className="project-showcase relative mb-16 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0c] text-white shadow-2xl shadow-red-950/20 sm:mb-20"
    >
      <div className="project-noise pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-red-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-16 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />

      <div className="relative p-5 sm:p-9 lg:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.22em] text-red-300 uppercase">
            <span className="project-live-dot h-2 w-2 rounded-full bg-red-500" />
            Flagship project · Build log 01
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[0.65rem] tracking-[0.16em] text-zinc-400">
            LONG-TERM / OPEN LAB
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.18em] text-zinc-500 uppercase">
              From verified compute to full-stack architecture
            </p>
            <h2
              id="featured-project-title"
              className="max-w-2xl text-3xl font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl"
            >
              从一颗 MAC，走向
              <span className="project-title-accent mt-1 block text-red-400">
                Transformer 加速器
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
              一套以 Transformer / LLM 为主线，以 FPGA、RTL/HLS
              和性能建模为验证手段的中文教材与实验平台。用实现验证知识，用数据解释架构。
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/posts/int8-mac-systemverilog"
                className="group inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-red-400 hover:shadow-lg hover:shadow-red-500/25"
              >
                查看起点：int8 MAC
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <a
                href="https://github.com/LZY041017/ai-chip-mac-pe"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08]"
              >
                <Code2 size={16} />
                查看代码
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-red-400/20 bg-red-500/[0.07] p-5">
            <div className="absolute right-4 top-3 font-mono text-5xl font-black text-white/[0.035]">
              01
            </div>
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="font-mono text-[0.68rem] tracking-[0.18em] text-red-300 uppercase">
                Current signal
              </span>
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[0.65rem] font-semibold text-emerald-300">
                已验证
              </span>
            </div>
            <p className="text-lg font-bold text-white">int8 MAC 最小闭环</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              RTL、testbench 与 Icarus 仿真基线已跑通，下一站是 4×4 / 8×8 PE
              阵列与基础性能模型。
            </p>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="project-progress h-full w-[22%] rounded-full bg-gradient-to-r from-red-500 to-amber-300" />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[0.62rem] text-zinc-600">
              <span>FOUNDATION</span>
              <span>FULL STACK</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {projectLayers.map(({ label, detail, icon: Icon }, index) => (
            <div
              key={label}
              className="group relative bg-[#0d0d10]/95 p-4 transition-colors hover:bg-white/[0.055] sm:p-5"
            >
              <div className="mb-5 flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-red-300 transition-colors group-hover:border-red-400/30 group-hover:bg-red-400/10">
                  <Icon size={17} />
                </span>
                <span className="font-mono text-[0.62rem] text-zinc-700">
                  0{index + 1}
                </span>
              </div>
              <p className="font-mono text-[0.65rem] tracking-[0.18em] text-zinc-500">
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-200">{detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 border-t border-white/10 pt-7 lg:grid-cols-[auto_1fr] lg:items-start">
          <div className="flex items-center gap-3 text-sm font-semibold text-zinc-200">
            <BookOpen size={17} className="text-red-400" />
            四阶段路线
          </div>
          <ol className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {milestones.map((milestone, index) => (
              <li key={milestone.stage} className="relative pl-5">
                <span
                  className={`absolute left-0 top-1.5 h-2 w-2 rounded-full ${
                    index === 0
                      ? "bg-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.12)]"
                      : "bg-zinc-700"
                  }`}
                />
                <p className="font-mono text-[0.6rem] tracking-[0.14em] text-zinc-600">
                  {milestone.state}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{milestone.stage}</p>
                <p className="mt-0.5 text-sm font-semibold text-zinc-200">
                  {milestone.focus}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
