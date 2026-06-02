"use client";

import { useState } from "react";

import { tweet } from "@/lib/twitter/actions";

const MAX = 280;

/** Faithful port of the PHP feed composer (char counter, Tweet button). */
export function Composer({ returnTo }: { returnTo: string }) {
  const [remaining, setRemaining] = useState(MAX);
  return (
    <div className="composer card">
      <form action={tweet}>
        <input type="hidden" name="subaction" value="tweet" />
        <input type="hidden" name="_return" value={returnTo} />
        <textarea
          name="content"
          maxLength={MAX}
          placeholder="What's happening?"
          onChange={(e) => setRemaining(MAX - e.target.value.length)}
        />
        <div className="composer-bar">
          <span className="muted">{remaining}</span>
          <button type="submit" className="btn-twitter">
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}
