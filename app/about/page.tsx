import type { Metadata } from "next";
import {
  GraduationCap,
  Code2,
  Cpu,
  Wrench,
  Microscope,
  Mail,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "自我",
  description: `关于 ${SITE_CONFIG.author} 的个人介绍`,
};

const skillCategories = [
  {
    title: "编程语言",
    icon: Code2,
    skills: ["Python", "Matlab", "C/C++", "HTML", "Java", "Verilog HDL"],
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    title: "技术方向",
    icon: Cpu,
    skills: [
      "嵌入式系统开发",
      "FPGA 开发 (PL / PS / AI Engine)",
      "COMSOL 柔性有机晶体管仿真",
    ],
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950",
  },
  {
    title: "研究领域",
    icon: Microscope,
    skills: ["电子器件设计与制造", "FPGA 编程"],
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Hello, I&apos;m{" "}
          <span className="text-primary-600 dark:text-primary-400">
            Zhiyong Lu
          </span>
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-gray-600 dark:text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap size={18} />
            东南大学
          </span>
          <span className="text-gray-300 dark:text-gray-700">·</span>
          <span>电子科学与工程学院</span>
          <span className="text-gray-300 dark:text-gray-700">·</span>
          <span>本科在读</span>
        </div>
      </section>

      {/* Bio */}
      <section className="mb-16">
        <div className="prose prose-gray dark:prose-invert prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            我目前专注于 <strong>电子器件设计与制造</strong> 以及{" "}
            <strong>FPGA 编程</strong> 领域的学习与研究。
            对嵌入式系统、可编程逻辑和半导体器件有着浓厚的兴趣，
            享受从底层硬件到上层软件的全栈式探索过程。
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
          <Wrench
            size={24}
            className="text-primary-600 dark:text-primary-400"
          />
          技能与方向
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className={`rounded-xl border border-gray-200/80 dark:border-gray-800/80 p-6 ${cat.bg} hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 bg-gradient-to-br from-white via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/20`}
            >
              <cat.icon size={28} className={`mb-3 ${cat.color}`} />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                {cat.title}
              </h3>
              <ul className="space-y-1.5">
                {cat.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5"
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${cat.color} opacity-60`}
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Mail size={24} className="text-primary-600 dark:text-primary-400" />
          联系方式
        </h2>
        <div className="flex flex-wrap gap-4">
          {SITE_CONFIG.social.github && (
            <a
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-sm transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
          <a
            href="tencent://message/?uin=3178144936"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-sm transition-all"
          >
            <MessageCircle size={18} />
            QQ: 3178144936
          </a>
          {SITE_CONFIG.social.email && (
            <a
              href={`mailto:${SITE_CONFIG.social.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-sm transition-all"
            >
              <Mail size={18} />
              {SITE_CONFIG.social.email}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
