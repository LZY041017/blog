import Link from "next/link";
import { ArrowUpRight, BookOpen, Compass, Gamepad2, Lightbulb, Wrench } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

const portals = [
  { number: "01", label: "ABOUT / DIRECTION", title: "了解我的方向", description: "从东南大学的学习背景，到 IC、计算光刻与嵌入式系统的实践路径。", href: "/about/", icon: Compass, accent: "text-blue-600 dark:text-blue-400" },
  { number: "02", label: "THOUGHTS / NOTES", title: "听听我的见解", description: "读书、技术、生活和一些还在慢慢成形的想法。", href: "/thoughts/", icon: Lightbulb, accent: "text-violet-600 dark:text-violet-400" },
  { number: "03", label: "TECH / PROJECTS", title: "试试我的作品", description: "浏览技术文章、实验记录，以及三个本地 Windows 工具。", href: "/tech/", icon: Wrench, accent: "text-cyan-600 dark:text-cyan-400" },
];

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="relative mb-16 sm:mb-20">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400"><span className="h-px w-8 bg-current opacity-60" />Lu_Zhiyong&apos;s Blog</p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">你好，欢迎来到我的主页。</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">东南大学电子科学与工程学院本科在读。这里记录我的学习、实践与作品，也分享在 IC 设计、计算光刻和嵌入式系统方面的探索。</p>
          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400"><span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" />持续更新中</span><span className="inline-flex items-center gap-2"><BookOpen size={15} />{posts.length} 篇文章</span></div>
        </div>
      </section>

      <section aria-label="主页导引" className="grid gap-4 sm:grid-cols-2">
        {portals.map(({ number, label, title, description, href, icon: Icon, accent }) => (
          <Link key={title} href={href} className="group rounded-3xl border border-gray-200/80 bg-white/58 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 dark:border-gray-800/80 dark:bg-gray-950/52 dark:hover:border-primary-800 sm:p-7">
            <div className="flex items-start justify-between"><span className={`rounded-2xl bg-gray-100/70 p-3 ${accent} dark:bg-gray-900/70`}><Icon size={22} /></span><span className="font-mono text-sm text-gray-400">{number}</span></div>
            <p className="mt-8 text-[10px] font-bold tracking-[0.22em] text-gray-400">{label}</p>
            <h2 className="mt-3 flex items-center gap-2 text-2xl font-bold text-gray-950 dark:text-white">{title}<ArrowUpRight size={20} className="text-primary-500 opacity-0 transition-opacity group-hover:opacity-100" /></h2>
            <p className="mt-3 max-w-md leading-7 text-gray-600 dark:text-gray-400">{description}</p>
          </Link>
        ))}

        <div className="group rounded-3xl border border-gray-200/80 bg-white/58 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 dark:border-gray-800/80 dark:bg-gray-950/52 dark:hover:border-primary-800 sm:p-7">
          <div className="flex items-start justify-between"><span className="rounded-2xl bg-gray-100/70 p-3 text-emerald-600 dark:bg-gray-900/70 dark:text-emerald-400"><Gamepad2 size={22} /></span><span className="font-mono text-sm text-gray-400">04</span></div>
          <p className="mt-8 text-[10px] font-bold tracking-[0.22em] text-gray-400">STEAM / CREATIVE LAB</p>
          <h2 className="mt-3 text-2xl font-bold text-gray-950 dark:text-white">课业之外</h2>
          <p className="mt-3 max-w-md leading-7 text-gray-600 dark:text-gray-400">看看最近在玩的游戏，也看看正在建设中的术力口音乐创作空间。</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold"><Link href="/steam/" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">Steam <ArrowUpRight size={15} className="inline" /></Link><Link href="/creative/" className="text-fuchsia-600 hover:text-fuchsia-500 dark:text-fuchsia-400">术力口专区 <ArrowUpRight size={15} className="inline" /></Link></div>
        </div>
      </section>

      <section className="mt-24" aria-labelledby="latest-posts-title">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">继续阅读</p><h2 id="latest-posts-title" className="text-3xl font-bold text-gray-900 dark:text-white">最近更新</h2></div><Link href="/posts/" className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">查看全部 <ArrowUpRight size={15} className="inline" /></Link></div>
        {posts.length === 0 ? <div className="rounded-3xl border border-dashed border-gray-300/70 p-12 text-center text-gray-500 dark:border-gray-700/70 dark:text-gray-400">文章正在整理中。</div> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.slice(0, 6).map((post) => <PostCard key={post.slug} post={post} />)}</div>}
      </section>
    </div>
  );
}
