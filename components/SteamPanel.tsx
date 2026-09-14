"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Gamepad2, RefreshCw } from "lucide-react";

type SteamGame = {
  appid: number;
  name: string;
  playtime_forever?: number;
  img_icon_url?: string;
};

type SteamSnapshot = {
  personaName?: string;
  avatar?: string;
  profileUrl?: string;
  recentlyPlayedGames?: SteamGame[];
  lastSyncedAt?: string;
};

const apiUrl = process.env.NEXT_PUBLIC_STEAM_API_URL || "https://zhiyonglu-steam-api.zhiyonglu114.workers.dev/";

export default function SteamPanel() {
  const [snapshot, setSnapshot] = useState<SteamSnapshot | null>(null);
  const [loading, setLoading] = useState(Boolean(apiUrl));
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!apiUrl) return;
    fetch(apiUrl, { headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then(setSnapshot)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="overflow-hidden rounded-[2rem] border border-gray-200/80 bg-gradient-to-br from-white/72 via-white/64 to-blue-50/55 p-7 shadow-sm backdrop-blur-xl dark:border-gray-800/80 dark:from-gray-950/72 dark:via-gray-950/64 dark:to-blue-950/35 sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400">Steam activity</p>
            <h1 className="mt-3 text-4xl font-bold text-gray-950 dark:text-white">游戏生活</h1>
          </div>
          <Gamepad2 className="text-primary-600 dark:text-primary-400" size={42} strokeWidth={1.5} />
        </div>

        {!apiUrl && <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-6 text-gray-600 dark:border-gray-700 dark:text-gray-400">Steam 同步接口正在配置中。后端上线后，这里会自动显示最近游玩记录。</div>}
        {loading && <div className="mt-10 flex items-center gap-2 text-gray-500"><RefreshCw className="animate-spin" size={17} />正在同步 Steam 数据…</div>}
        {error && <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">暂时无法读取 Steam 数据，将在下一次同步时重试。</div>}
        {snapshot && <>
          <div className="mt-8 flex items-center gap-4">{snapshot.avatar && <img src={snapshot.avatar} alt="Steam avatar" className="h-14 w-14 rounded-2xl" />}<div><p className="font-semibold text-gray-950 dark:text-white">{snapshot.personaName || "Steam 玩家"}</p>{snapshot.profileUrl && <a className="mt-1 inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400" href={snapshot.profileUrl} target="_blank" rel="noreferrer">打开 Steam 主页 <ExternalLink size={14} /></a>}</div></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{(snapshot.recentlyPlayedGames || []).map((game) => <div key={game.appid} className="rounded-2xl border border-gray-200/80 bg-white/36 p-4 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/30"><div className="flex gap-3">{game.img_icon_url && <img src={game.img_icon_url} alt="" className="h-12 w-12 rounded-xl" />}<div><p className="font-semibold text-gray-900 dark:text-white">{game.name}</p><p className="mt-1 text-sm text-gray-500">{Math.round((game.playtime_forever || 0) / 60)} 小时</p></div></div></div>)}</div>
          {snapshot.lastSyncedAt && <p className="mt-6 text-xs text-gray-500">最后同步：{new Date(snapshot.lastSyncedAt).toLocaleString("zh-CN")}</p>}
        </>}
      </div>
    </section>
  );
}
