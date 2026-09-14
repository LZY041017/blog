import type { Metadata } from "next";
import { Headphones, Music2, Mic2 } from "lucide-react";

export const metadata: Metadata = {
  title: "术力口创作",
  description: "Lu Zhiyong 的术力口音乐创作专区，使用 FL Studio 26 与 VOCALOID6。",
};

const stages = [
  { label: "编曲", detail: "FL Studio 26", icon: Music2 },
  { label: "调声", detail: "VOCALOID6", icon: Mic2 },
  { label: "发布", detail: "待建设", icon: Headphones },
];

export default function CreativePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-white via-white to-fuchsia-50/70 p-7 shadow-sm dark:border-gray-800 dark:from-gray-950 dark:via-gray-950 dark:to-fuchsia-950/20 sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-600 dark:text-fuchsia-400">Creative lab · coming soon</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-6xl">术力口创作专区</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">一个待建设的音乐创作空间，记录编曲、调声、试听与作品迭代。这里会和技术项目一样，保留从工具到成品的过程。</p>
        <div className="mt-8 inline-flex rounded-full border border-fuchsia-200 bg-white/80 px-4 py-2 text-sm font-semibold text-fuchsia-700 dark:border-fuchsia-900 dark:bg-gray-900/70 dark:text-fuchsia-300">当前工具栈：FL Studio 26 + VOCALOID6</div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {stages.map(({ label, detail, icon: Icon }, index) => <div key={label} className="rounded-3xl border border-gray-200 bg-gray-50/70 p-6 dark:border-gray-800 dark:bg-gray-900/40"><div className="flex items-start justify-between"><Icon className="text-fuchsia-600 dark:text-fuchsia-400" size={24} /><span className="font-mono text-sm text-gray-400">0{index + 1}</span></div><p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{label}</p><h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">{detail}</h2></div>)}
      </section>

      <section className="mt-8 rounded-3xl border border-dashed border-fuchsia-300 p-7 dark:border-fuchsia-800 sm:p-9"><p className="text-sm leading-7 text-gray-600 dark:text-gray-400">专区正在建设中。后续将逐步加入原创曲目、工程记录、声库使用心得和试听入口。</p></section>
    </div>
  );
}
