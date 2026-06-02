import Link from "next/link";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getExplore } from "@/lib/instagram/queries";
import { IgSubnav } from "@/components/instagram/story-bar";

// Faithful port of PHP ig_explore().
export default async function InstagramExplorePage() {
  const me = await requireUser();
  const tiles = await getExplore();

  return (
    <>
      <AppChrome user={me} active="instagram" />
      <main className="content">
        <IgSubnav active="/instagram/explore" />
        <h2>Explore</h2>
        <div className="ig-explore">
          {tiles.map((t) => (
            <Link key={t.id} href={`/instagram/view/${t.id}`} className="ig-explore-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.imageUrl ?? ""} alt="" />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
