import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MockSocial",
  description:
    "Internal teaching tool — a mock social-media sandbox (MockTweet, MockBook, MockGram, MockTube).",
  icons: { icon: "/assets/images/logo.png" },
};

// Mirrors the PHP render_header() <head>: load all platform stylesheets and set
// the theme (light/dark) before paint to avoid a flash.
const THEME_INIT = `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',s||(d?'dark':'light'));}catch(e){}})();
function toggleTheme(){var c=document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';var n=c==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);try{localStorage.setItem('theme',n);}catch(e){}}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/assets/css/base.css" />
        <link rel="stylesheet" href="/assets/css/twitter.css" />
        <link rel="stylesheet" href="/assets/css/facebook.css" />
        <link rel="stylesheet" href="/assets/css/instagram.css" />
        <link rel="stylesheet" href="/assets/css/youtube.css" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
