import type { Metadata } from "next";
import SteamPanel from "@/components/SteamPanel";

export const metadata: Metadata = {
  title: "Steam",
  description: "Lu Zhiyong 的 Steam 游戏生活与最近游玩记录",
};

export default function SteamPage() {
  return <SteamPanel />;
}
