import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} {SITE_CONFIG.title}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {SITE_CONFIG.social.github && (
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                GitHub
              </a>
            )}
            {SITE_CONFIG.social.email && (
              <a
                href={`mailto:${SITE_CONFIG.social.email}`}
                className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Email
              </a>
            )}
            <a
              href="/rss.xml"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
