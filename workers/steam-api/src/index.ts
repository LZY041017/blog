export interface Env {
  STEAM_API_KEY: string;
  STEAM_ID: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

const CACHE_SECONDS = 1800;
const ORIGIN = "https://zhiyonglu.top";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": status === 200 ? "public, max-age=300" : "no-store",
      "access-control-allow-origin": ORIGIN,
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "Accept",
    },
  });
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (new URL(request.url).pathname !== "/") return json({ error: "not_found" }, 404);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: json(null).headers });
    if (request.method !== "GET") {
      const response = json({ error: "method_not_allowed" }, 405);
      response.headers.set("allow", "GET, OPTIONS");
      return response;
    }
    if (!env.STEAM_API_KEY || !/^\d{17}$/.test(env.STEAM_ID)) {
      return json({ error: "steam_not_configured" }, 503);
    }

    // Cache API 不支持 stale-while-revalidate；按账户隔离缓存并显式设置边缘 TTL。
    const cacheKey = new Request(`${new URL(request.url).origin}/__steam-cache__/${env.STEAM_ID}`);
    const workerCache = (caches as unknown as { default: Cache }).default;
    try {
      const cached = await workerCache.match(cacheKey);
      if (cached) {
        const response = new Response(cached.body, cached);
        response.headers.set("cache-control", "public, max-age=300");
        return response;
      }
    } catch {
      // 边缘缓存故障时继续读取官方 API。
    }

    try {
      const base = "https://api.steampowered.com";
      const key = encodeURIComponent(env.STEAM_API_KEY);
      const id = encodeURIComponent(env.STEAM_ID);
      const options = { signal: AbortSignal.timeout(8000) };
      const [summaryResponse, recentResponse] = await Promise.all([
        fetch(`${base}/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${id}`, options),
        fetch(`${base}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${id}&format=json&count=6`, options),
      ]);
      if (!summaryResponse.ok || !recentResponse.ok) throw new Error("upstream_http_error");
      const summary = await summaryResponse.json() as { response?: { players?: Array<Record<string, string>> } };
      const recent = await recentResponse.json() as { response?: { games?: Array<Record<string, string | number>> } };
      const player = summary.response?.players?.[0];
      if (!player) throw new Error("player_unavailable");
      const snapshot = {
        personaName: player.personaname || "Steam 玩家",
        avatar: player.avatarfull || "",
        profileUrl: player.profileurl || "",
        recentlyPlayedGames: (recent.response?.games || []).map((game) => ({
          appid: Number(game.appid),
          name: String(game.name),
          playtime_forever: Number(game.playtime_forever || 0),
          img_icon_url: game.img_icon_url ? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg` : "",
        })),
        lastSyncedAt: new Date().toISOString(),
      };
      const response = json(snapshot);
      const cacheResponse = response.clone();
      cacheResponse.headers.set("cache-control", `public, max-age=${CACHE_SECONDS}`);
      ctx.waitUntil(workerCache.put(cacheKey, cacheResponse).catch(() => undefined));
      return response;
    } catch {
      return json({ error: "steam_upstream_unavailable" }, 502);
    }
  },
};

export default worker;
