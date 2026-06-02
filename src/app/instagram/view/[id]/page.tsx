import Link from "next/link";
import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getPost } from "@/lib/instagram/queries";
import { IgPostCard } from "@/components/instagram/ig-post-card";

// Faithful port of PHP ig_view() — single post.
export default async function InstagramViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const me = await requireUser();
  const { id } = await params;
  const post = await getPost(Number(id), me.id);
  if (!post) notFound();

  return (
    <>
      <AppChrome user={me} active="instagram" />
      <main className="content">
        <div className="ig-modal">
          <Link className="ig-close" href="/instagram">
            ← Back to feed
          </Link>
          <IgPostCard post={post} returnTo={`/instagram/view/${id}`} />
        </div>
      </main>
    </>
  );
}
