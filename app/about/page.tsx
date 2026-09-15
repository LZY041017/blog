import type { Metadata } from "next";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Boxes,
  Cpu,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Microscope,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "自我",
  description: `Lu Zhiyong 的个人简历、研究方向与作品集`,
};

const directions = [
  {
    number: "01",
    title: "IC 设计与验证",
    eyebrow: "DIGITAL IC / VERIFICATION",
    icon: Cpu,
    description: "从可读、可测的最小硬件单元开始，持续练习 RTL 建模、testbench、仿真与阵列化思考。",
    items: ["int8 MAC 乘加单元", "SystemVerilog RTL 与 testbench", "时钟、复位、有符号位宽与仿真波形"],
    href: "/posts/int8-mac-systemverilog",
    linkLabel: "查看 MAC 项目",
  },
  {
    number: "02",
    title: "IC 制造工艺优化",
    eyebrow: "COMPUTATIONAL LITHOGRAPHY",
    icon: Microscope,
    description: "正在尝试复现一篇计算光刻相关论文，从光学传播、可微建模和优化闭环理解工艺与版图之间的关系。",
    items: ["傅里叶光学与角谱传播", "计算光刻 / 光学逆设计", "梯度检查、版图优化与可复现实验"],
    href: "https://github.com/LZY041017",
    linkLabel: "查看研究方向",
  },
  {
    number: "03",
    title: "嵌入式与可编程逻辑",
    eyebrow: "EMBEDDED / FPGA / NATIONAL INSTRUMENTS",
    icon: Boxes,
    description: "把算法放进真实的软硬件边界：关注数据通路、接口、时序和可验证的工程结果。",
    items: ["东南大学暑期学校中的 National Instruments（NI）myRIO 与 LabVIEW 实践", "RT / FPGA 分工与 DMA FIFO 数据通路", "摄像头、灰度、高斯滤波与 Canny 边缘处理"],
    href: "https://github.com/LZY041017",
    linkLabel: "查看 GitHub 主页",
  },
];

const portfolio = [
  { type: "IC DESIGN", title: "int8 MAC / SystemVerilog", description: "从一个可综合、可自检的 MAC 单元出发，建立 AI 芯片 RTL 设计与验证闭环。", href: "/posts/int8-mac-systemverilog", external: false },
  { type: "RESEARCH IN PROGRESS", title: "计算光刻复现尝试", description: "正在围绕一篇计算光刻相关论文搭建学习与复现实验路径，逐步验证传播模型和优化过程。", href: "https://github.com/LZY041017", external: true },
  { type: "EMBEDDED / FPGA", title: "National Instruments（NI）myRIO 图像处理", description: "东南大学暑期学校中的 National Instruments（NI）myRIO、LabVIEW、DMA FIFO 与 FPGA 图像处理实践。", href: "https://github.com/LZY041017", external: true },
  { type: "DESKTOP TOOL", title: "时光涂涂", description: "本地 Windows 周计划工具，把课程、学习、实验和临时安排画成时间块。", href: "/posts/shiguang-timepaint", external: false },
  { type: "DESKTOP TOOL", title: "拾念", description: "本地 Windows 记忆辅助工作台，用引句、标签、检索和抽查帮助主动回忆。", href: "/posts/shinian-memory-aid", external: false },
  { type: "DESKTOP TOOL", title: "时屿", description: "本地 Windows 时间记录工具，用正计时、倒计时和时间轨道看见正在发生的事。", href: "/posts/shiyu-time-management", external: false },
  { type: "CREATIVE LAB · COMING SOON", title: "术力口创作专区", description: "待建设的音乐与声库创作空间，当前工具栈为 FL Studio 26 + VOCALOID6，记录编曲、调声与作品迭代。", href: "/creative", external: false },
];

function ProjectLink({ href, label, external = false }: { href: string; label: string; external?: boolean }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
      {label}{external ? <ExternalLink size={15} /> : <ArrowUpRight size={16} />}
    </a>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-gray-200/80 bg-gradient-to-br from-white/72 via-white/64 to-blue-50/55 p-7 shadow-sm backdrop-blur-xl dark:border-gray-800/80 dark:from-gray-950/72 dark:via-gray-950/64 dark:to-blue-950/35 sm:p-12">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-primary-600 dark:text-primary-400">Personal resume / portfolio</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-6xl">关于我，<span className="block text-primary-600 dark:text-primary-400">以及我正在做的事。</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">我是 Lu Zhiyong，东南大学电子科学与工程学院本科在读。这里记录我的学习、实践与作品，也分享在 IC 设计、计算光刻和嵌入式系统方面的探索。</p>
          </div>
          <div className="grid gap-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white/70 p-4 dark:border-gray-800 dark:bg-gray-900/60"><GraduationCap className="text-primary-600 dark:text-primary-400" size={21} /><span>东南大学 · 电子科学与工程学院</span></div>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white/70 p-4 dark:border-gray-800 dark:bg-gray-900/60"><BriefcaseBusiness className="text-primary-600 dark:text-primary-400" size={21} /><span>National Instruments（NI）实践 · 东南大学暑期学校 · myRIO / LabVIEW / FPGA</span></div>
          </div>
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400">Experience</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-950 dark:text-white">实践经历</h2>
          <div className="mt-8 border-l-2 border-primary-200 pl-6 dark:border-primary-900">
            <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">National Instruments（NI）· 东南大学暑期学校</p>
            <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">面向工程问题理解软硬件协同</h3>
            <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">在东南大学暑期学校的 National Instruments（NI）相关实践中接触 LabVIEW、myRIO 与 FPGA 图像处理流程，围绕摄像头采集、灰度化、RT/FPGA 数据交换和边缘处理，理解实时系统中的模块边界、数据通路与验证方法。</p>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-200/80 bg-gray-50/58 p-7 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-900/42 sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400">Engineering notes</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {[["工具链", "LabVIEW / NI-RIO / myRIO"], ["数据通路", "RT → FPGA → RT / DMA FIFO"], ["图像链路", "Camera → Gray → Gaussian → Canny"], ["工程方法", "先拆边界，再做验证"]].map(([label, value]) => <div key={label}><p className="text-sm text-gray-500 dark:text-gray-500">{label}</p><p className="mt-1 font-semibold text-gray-900 dark:text-gray-100">{value}</p></div>)}
          </div>
          <p className="mt-7 border-t border-gray-200 pt-5 text-sm leading-6 text-gray-500 dark:border-gray-800 dark:text-gray-500">相关项目仍在持续整理；页面只呈现已确认的工程路径，不把未完成的硬件构建或实测结果写成最终结论。</p>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400">Three directions</p><h2 className="mt-3 text-3xl font-bold text-gray-950 dark:text-white">现在正在做什么</h2></div><p className="max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">不再罗列孤立技能，而是用具体问题、工程链路和可复现作品来描述能力边界。</p></div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {directions.map((direction) => <article key={direction.number} className="group rounded-3xl border border-gray-200/80 bg-white/58 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 dark:border-gray-800/80 dark:bg-gray-950/52 dark:hover:border-primary-800"><div className="flex items-start justify-between"><div className="rounded-2xl bg-gray-100/70 p-3 text-primary-600 dark:bg-gray-900/70 dark:text-primary-400"><direction.icon size={24} /></div><span className="font-mono text-sm text-gray-400">{direction.number}</span></div><p className="mt-8 text-[11px] font-bold tracking-[0.2em] text-gray-400">{direction.eyebrow}</p><h3 className="mt-3 text-2xl font-bold text-gray-950 dark:text-white">{direction.title}</h3><p className="mt-4 min-h-24 leading-7 text-gray-600 dark:text-gray-400">{direction.description}</p><ul className="mt-5 space-y-3 border-t border-gray-100 pt-5 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-300">{direction.items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />{item}</li>)}</ul><div className="mt-7"><ProjectLink href={direction.href} label={direction.linkLabel} external={direction.href.startsWith("http")} /></div></article>)}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400">Selected work</p><h2 className="mt-3 text-3xl font-bold text-gray-950 dark:text-white">作品集</h2></div><a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 sm:inline-flex"><GitBranch size={17} /> GitHub <ArrowUpRight size={15} /></a></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((project) => <a key={project.title} href={project.href} target={project.external ? "_blank" : undefined} rel={project.external ? "noopener noreferrer" : undefined} className="group flex min-h-48 flex-col justify-between rounded-3xl border border-gray-200 bg-gray-50/70 p-6 transition-colors hover:border-primary-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-primary-800 dark:hover:bg-gray-900"><div><p className="text-[10px] font-bold tracking-[0.18em] text-gray-400">{project.type}</p><h3 className="mt-3 text-xl font-bold text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">{project.title}</h3><p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{project.description}</p></div><span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400">查看项目 <ArrowUpRight size={15} /></span></a>)}
        </div>
      </section>

      <section id="creative-lab" className="mt-20 rounded-3xl border border-dashed border-primary-300 bg-primary-50/50 p-7 dark:border-primary-800 dark:bg-primary-950/20 sm:p-9"><div className="flex flex-wrap items-center justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-600 dark:text-primary-400">Creative lab · coming soon</p><h2 className="mt-3 text-2xl font-bold text-gray-950 dark:text-white">术力口创作专区</h2><p className="mt-3 max-w-2xl leading-7 text-gray-600 dark:text-gray-400">这里将收录编曲、调声和原创作品。目前使用 FL Studio 26 + VOCALOID6，专区正在建设中。</p></div><span className="rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-primary-700 dark:border-primary-900 dark:bg-gray-950 dark:text-primary-300">待建设</span></div></section>
      <section className="mt-8 rounded-3xl border border-gray-200 p-7 dark:border-gray-800 sm:p-9"><div className="flex flex-wrap items-center justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-600 dark:text-primary-400">Open to collaboration</p><h2 className="mt-3 text-2xl font-bold text-gray-950 dark:text-white">从可验证的小项目开始，持续把问题做深。</h2></div><ProjectLink href={SITE_CONFIG.social.github} label="访问 GitHub" external /></div></section>
    </div>
  );
}
