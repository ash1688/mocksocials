import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MockSocial",
  description:
    "Unit 8 evidence sandbox — run an organisation's social-media campaign, simulate engagement, review analytics.",
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
