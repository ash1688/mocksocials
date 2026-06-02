const SUBNAV = [
  { href: "/youtube", label: "Home" },
  { href: "/youtube/upload", label: "Upload" },
  { href: "/youtube/channel", label: "My channel" },
  { href: "/youtube/analytics", label: "Analytics" },
];

/** Faithful port of PHP yt_subnav(). */
export function YtSubnav({ active }: { active?: string }) {
  return (
    <div className="yt-subnav">
      {SUBNAV.map((s) => (
        <a key={s.href} className={s.href === active ? "active" : ""} href={s.href}>
          {s.label}
        </a>
      ))}
    </div>
  );
}
