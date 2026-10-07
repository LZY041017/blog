import test from "node:test";
import assert from "node:assert/strict";
import worker from "../workers/steam-api/src/index.ts";

const env = { STEAM_API_KEY: "test-secret", STEAM_ID: "76561198000000000" };
const request = (method = "GET", pathname = "/") => new Request(`https://worker.example${pathname}`, { method });

function setup(t, cached) {
  const pending = [];
  const stored = [];
  const keys = [];
  const originalCache = Object.getOwnPropertyDescriptor(globalThis, "caches");
  Object.defineProperty(globalThis, "caches", { configurable: true, value: { default: {
    match: async (key) => { keys.push(key.url); return cached?.clone(); },
    put: async (key, response) => { stored.push({ key: key.url, response }); },
  } } });
  t.after(() => {
    if (originalCache) Object.defineProperty(globalThis, "caches", originalCache);
    else delete globalThis.caches;
  });
  return { ctx: { waitUntil: (promise) => pending.push(promise) }, pending, stored, keys };
}

test("方法和配置错误不缓存，也不发起上游请求", async (t) => {
  const { ctx } = setup(t);
  const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new Error("unexpected fetch"); });
  const response = await worker.fetch(request("POST"), env, ctx);
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET, OPTIONS");
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal((await worker.fetch(request(), { ...env, STEAM_ID: "REPLACE_WITH_STEAM_ID" }, ctx)).status, 503);
  assert.equal((await worker.fetch(request("OPTIONS"), env, ctx)).status, 204);
  assert.equal((await worker.fetch(request("GET", "/unknown"), env, ctx)).status, 404);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("缓存按 Steam ID 隔离，浏览器 TTL 与边缘 TTL 分开", async (t) => {
  const cached = new Response(JSON.stringify({ personaName: "Cached" }), { headers: { "cache-control": "public, max-age=1800" } });
  const { ctx, keys } = setup(t, cached);
  const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new Error("unexpected fetch"); });
  const response = await worker.fetch(request(), env, ctx);
  await worker.fetch(request(), { ...env, STEAM_ID: "76561198000000001" }, ctx);
  assert.equal(response.headers.get("cache-control"), "public, max-age=300");
  assert.notEqual(keys[0], keys[1]);
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("成功结果缓存 30 分钟且响应不包含 Secret", async (t) => {
  const { ctx, pending, stored } = setup(t);
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json(url.includes("GetPlayerSummaries")
      ? { response: { players: [{ personaname: "Player", profileurl: "https://steamcommunity.com/" }] } }
      : { response: { games: [{ appid: 123, name: "Game", playtime_forever: 120 }] } });
  });
  const response = await worker.fetch(request(), env, ctx);
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.ok(!body.includes(env.STEAM_API_KEY));
  assert.equal(JSON.parse(body).recentlyPlayedGames[0].playtime_forever, 120);
  await Promise.all(pending);
  assert.equal(stored[0].response.headers.get("cache-control"), "public, max-age=1800");
});

test("网络错误、上游错误与非法 JSON 返回可重试的 502", async (t) => {
  const { ctx, stored } = setup(t);
  for (const upstream of [
    async () => { throw new Error("network failed"); },
    async () => new Response("unavailable", { status: 503 }),
    async () => new Response("not json"),
  ]) {
    const mock = t.mock.method(globalThis, "fetch", upstream);
    const response = await worker.fetch(request(), env, ctx);
    assert.equal(response.status, 502);
    assert.equal(response.headers.get("cache-control"), "no-store");
    mock.mock.restore();
  }
  assert.equal(stored.length, 0);
});
