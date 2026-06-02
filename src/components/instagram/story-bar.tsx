import type { Story } from "@/lib/instagram/queries";

/** Faithful port of PHP ig_story_bar(). */
export function StoryBar({ stories }: { stories: Story[] }) {
  return (
    <div className="ig-stories card">
      {stories.map((u) => (
        <div className="story" key={u.id}>
          <div className="story-ring">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={u.avatarUrl || `https://picsum.photos/seed/u${u.id}/80`}
              alt=""
            />
          </div>
          <div className="story-name">{u.displayName}</div>
        </div>
      ))}
    </div>
  );
}

const SUBNAV = [
  { href: "/instagram", label: "Feed" },
  { href: "/instagram/explore", label: "Explore" },
  { href: "/instagram/profile", label: "Profile" },
  { href: "/instagram/analytics", label: "Analytics" },
];

/** Faithful port of the PHP ig-subnav. */
export function IgSubnav({ active }: { active: string }) {
  return (
    <div className="ig-subnav">
      {SUBNAV.map((s) => (
        <a key={s.href} className={s.href === active ? "active" : ""} href={s.href}>
          {s.label}
        </a>
      ))}
    </div>
  );
}
