import Link from "next/link";

import { logout } from "@/lib/auth/actions";
import type { CurrentUser } from "@/lib/auth/session";
import { ThemeToggle } from "./theme-toggle";

type Platform = "twitter" | "facebook" | "instagram" | "youtube";

const TABS: { platform: Platform; label: string }[] = [
  { platform: "twitter", label: "MockTweet" },
  { platform: "facebook", label: "MockBook" },
  { platform: "instagram", label: "MockGram" },
  { platform: "youtube", label: "MockTube" },
];

/**
 * Faithful port of the PHP render_header() top bar: brand logo, platform nav,
 * theme toggle, current user + admin/logout. `active` highlights the tab.
 */
export function AppChrome({
  user,
  active,
}: {
  user: CurrentUser;
  active?: Platform;
}) {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/logo_light.png"
          alt="MockSocial"
          className="brand-logo brand-logo-light"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/logo_dark.png"
          alt="MockSocial"
          className="brand-logo brand-logo-dark"
        />
      </Link>
      <nav className="topnav">
        {TABS.map((t) => (
          <Link
            key={t.platform}
            className={`${active === t.platform ? "active" : ""} tab-${t.platform}`}
            href={`/${t.platform}`}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <div className="userbox">
        <ThemeToggle />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="avatar-sm"
          src={user.avatarUrl || `https://picsum.photos/seed/u${user.id}/40`}
          alt=""
        />
        <span>{user.displayName}</span>
        <Link href="/campaigns">Campaigns</Link>
        <Link href="/scenario">Scenario</Link>
        {user.isAdmin ? <Link href="/admin">Admin</Link> : null}
        <form action={logout} style={{ display: "inline" }}>
          <button
            type="submit"
            className="linklike"
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              cursor: "pointer",
              marginLeft: "8px",
              padding: 0,
              font: "inherit",
            }}
          >
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}
