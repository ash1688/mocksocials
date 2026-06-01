import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">MockSocial</h1>
        <p className="mt-2 text-muted-foreground">
          Unit 8 evidence sandbox. Run your organisation&rsquo;s social-media
          presence, schedule a campaign, simulate engagement, and review the
          analytics you&rsquo;ll screenshot for your report.
        </p>
      </div>
      <nav className="flex gap-4 text-sm">
        <Link className="text-platform underline-offset-4 hover:underline" href="/login">
          Student sign in
        </Link>
        <Link className="text-platform underline-offset-4 hover:underline" href="/admin">
          Teacher / admin
        </Link>
      </nav>
      <p className="text-xs text-muted-foreground">
        Greenfield TypeScript rebuild (ADR-0004). Scaffold — pages to follow.
      </p>
    </main>
  );
}
