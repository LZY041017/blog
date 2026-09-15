import type { Metadata } from "next";
import { ArrowUpRight, Flame, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "PTCG",
  description: "Lu Zhiyong 的宝可梦集换式卡牌游戏分区，主推宝可梦为火焰鸟 Moltres。",
};

export default function PTCGPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-orange-200/80 bg-gradient-to-br from-orange-50/90 via-white/80 to-amber-100/70 p-6 shadow-sm backdrop-blur-md dark:border-orange-950/70 dark:from-orange-950/45 dark:via-gray-950/75 dark:to-amber-950/35 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="relative grid items-center gap-10 md:grid-cols-[minmax(230px,0.8fr)_1.2fr]">
          <div className="mx-auto w-full max-w-[270px]">
            <div className="rounded-[1.4rem] border-[10px] border-amber-100 bg-gradient-to-br from-orange-400 via-red-500 to-amber-300 p-1 shadow-[0_18px_55px_rgba(234,88,12,0.32)] dark:border-amber-950">
              <div className="rounded-[0.9rem] border-2 border-orange-950/30 bg-orange-100 p-1 dark:bg-orange-950/30">
                <img src="/assets/ptcg/moltres-30th-en-130.png" alt="宝可梦集换式卡牌中的火焰鸟 Moltres" className="block w-full rounded-lg" />
              </div>
            </div>
            <p className="mt-3 text-center text-xs font-medium tracking-[0.18em] text-orange-700/70 dark:text-orange-300/70">MOLTRES · FIRE / FLIGHT</p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-orange-600 dark:text-orange-400"><Flame size={15} /> Pokémon Trading Card Game</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-6xl">火焰鸟 <span className="text-orange-500">Moltres</span></h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-700 dark:text-gray-300">这里记录我与 PTCG 的对局、卡组和线下活动。</p>
            <div className="mt-8 max-w-sm">
              <div className="rounded-2xl border border-orange-200/80 bg-white/65 p-4 dark:border-orange-900/60 dark:bg-gray-950/45"><div className="flex items-center gap-2 text-sm font-semibold text-gray-950 dark:text-white"><MapPin size={17} className="text-orange-500" />主要活动半径</div><p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">东南大学 PTCG 社群<br />南京景枫宝可梦官方道馆</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="match-records-title">
        <div className="mb-6 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">Decks & Results</p><h2 id="match-records-title" className="text-3xl font-bold text-gray-950 dark:text-white">比赛经历</h2></div><span className="rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-950/50 dark:text-gray-400">待补充</span></div>
        <div className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white/65 shadow-sm backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/55">
          <div className="grid grid-cols-[1.2fr_1fr_0.6fr] border-b border-gray-200/80 bg-gray-50/70 px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500 dark:border-gray-800/80 dark:bg-gray-900/60 dark:text-gray-400 sm:px-7"><span>比赛经历</span><span>使用卡组</span><span>名次</span></div>
          <div className="flex min-h-32 items-center justify-center px-5 py-8 text-center text-sm text-gray-500 dark:text-gray-400 sm:px-7">暂未填充比赛记录，待实际经历整理后逐行补入。</div>
        </div>
      </section>

      <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">卡图仅作为本分区的个人主视觉展示。<a href="https://www.pokemon.cn/tcg-home" target="_blank" rel="noreferrer" className="ml-1 inline-flex items-center gap-1 text-orange-600 hover:text-orange-500 dark:text-orange-400">了解宝可梦集换式卡牌游戏 <ArrowUpRight size={14} /></a></p>
    </div>
  );
}
