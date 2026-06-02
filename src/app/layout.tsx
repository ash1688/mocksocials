import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MockSocial",
  description:
    "Internal teaching tool — a mock social-media sandbox (MockTweet, MockBook, MockGram, MockTube).",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
