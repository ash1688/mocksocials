"use client";

import { useRouter } from "next/navigation";

/** A dropdown of the user's suggested scenarios; choosing one opens it. */
export function ScenarioPicker({
  items,
}: {
  items: { id: string; title: string; done: boolean }[];
}) {
  const router = useRouter();
  return (
    <select
      defaultValue=""
      className="scn-index-select"
      onChange={(e) => {
        if (e.target.value) router.push(`/scenario/${e.target.value}`);
      }}
    >
      <option value="" disabled>
        Choose one of your scenarios…
      </option>
      {items.map((it) => (
        <option key={it.id} value={it.id}>
          {it.done ? "✓ " : ""}
          {it.title}
        </option>
      ))}
    </select>
  );
}
