import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-700 bg-gray-900 px-4 py-4 text-sm text-gray-300 md:px-10">
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <h2 className="text-2xl font-semibold text-white">
          Feeding <span className="text-green-500">Futures</span>
        </h2>

        <div className="text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Feeding Futures. All Rights Reserved.</p>
          <p className="mt-1 italic text-gray-300">
            Less waste on the plate, more smiles to create {"\u2764\uFE0F"}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.instagram.com/namanmahajan_17/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-emerald-500/30 bg-transparent p-2 text-gray-300 shadow-[0_8px_18px_rgba(34,197,94,0.14)] transition hover:-translate-y-0.5 hover:text-emerald-300 active:text-emerald-400"
            aria-label="Instagram"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3.25"
                y="3.25"
                width="17.5"
                height="17.5"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.3" cy="6.7" r="1" fill="currentColor" />
            </svg>
          </a>
          <a
            href="mailto:mahajannaman2020@gmail.com"
            className="rounded-full border border-emerald-500/30 bg-transparent p-2 text-gray-300 shadow-[0_8px_18px_rgba(34,197,94,0.14)] transition hover:-translate-y-0.5 hover:text-emerald-300 active:text-emerald-400"
            aria-label="Gmail"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="m4.5 7.5 6.64 5.22a1.4 1.4 0 0 0 1.72 0L19.5 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="https://github.com/namanmahajan2020"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-emerald-500/30 bg-transparent p-2 text-gray-300 shadow-[0_8px_18px_rgba(34,197,94,0.14)] transition hover:-translate-y-0.5 hover:text-emerald-300 active:text-emerald-400"
            aria-label="GitHub"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .5C5.65.5.5 5.8.5 12.33c0 5.22 3.3 9.64 7.87 11.2.58.11.79-.26.79-.58 0-.28-.01-1.04-.02-2.04-3.2.71-3.88-1.59-3.88-1.59-.52-1.37-1.28-1.73-1.28-1.73-1.05-.73.08-.72.08-.72 1.16.08 1.78 1.23 1.78 1.23 1.03 1.84 2.7 1.31 3.36 1 .1-.77.4-1.31.73-1.61-2.55-.3-5.23-1.31-5.23-5.84 0-1.29.45-2.35 1.19-3.18-.12-.3-.52-1.5.11-3.12 0 0 .97-.32 3.19 1.21a10.7 10.7 0 0 1 5.82 0c2.22-1.53 3.18-1.21 3.18-1.21.64 1.62.24 2.82.12 3.12.74.83 1.18 1.89 1.18 3.18 0 4.54-2.68 5.53-5.24 5.83.41.36.78 1.08.78 2.18 0 1.58-.01 2.85-.01 3.24 0 .32.21.7.8.58 4.56-1.57 7.86-5.98 7.86-11.2C23.5 5.8 18.35.5 12 .5Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
