export interface Env {
  STEAM_API_KEY: string;
  STEAM_ID: string;
}

const CACHE_KEY = new Request("https://cache.internal/steam-snapshot-v1");

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300, stale-while-revalidate=1800",
      "access-control-allow-origin": "https://zhiyonglu.top",
    },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405);

    const cached = await caches.default.match(CACHE_KEY);
    if (cached) return cached;

    const base = "https://api.steampowered.com";
    const [summaryResponse, recentResponse] = await Promise.all([
      fetch(`${base}/ISteamUser/GetPlayerSummaries/v0002/?key=${encodeURIComponent(env.STEAM_API_KEY)}&steamids=${encodeURIComponent(env.STEAM_ID)}`),
      fetch(`${base}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${encodeURIComponent(env.STEAM_API_KEY)}&steamid=${encodeURIComponent(env.STEAM_ID)}&format=json&count=6`),
    ]);

    if (!summaryResponse.ok || !recentResponse.ok) return json({ error: "steam_upstream_unavailable" }, 502);
    const summary = await summaryResponse.json() as { response?: { players?: Array<Record<string, string>> } };
    const recent = await recentResponse.json() as { response?: { games?: Array<Record<string, string | number>> } };
    const player = summary.response?.players?.[0];
    const snapshot = {
      personaName: player?.personaname || "Steam 玩家",
      avatar: player?.avatarfull || "",
      profileUrl: player?.profileurl || "",
      recentlyPlayedGames: (recent.response?.games || []).map((game) => ({
        appid: Number(game.appid),
        name: String(game.name),
        playtime_forever: Number(game.playtime_forever || 0),
        img_icon_url: game.img_icon_url ? `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg` : "",
      })),
      lastSyncedAt: new Date().toISOString(),
    };
    const response = json(snapshot);
    ctx.waitUntil(caches.default.put(CACHE_KEY, response.clone()));
    return response;
  },
};
