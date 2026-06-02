import Link from "next/link";
import { Fragment } from "react";

// Faithful port of PHP linkify(): turn #hashtags into links. Rendered as JSX
// (not dangerouslySetInnerHTML) so text is escaped by React automatically.
export function Linkify({
  text,
  platform = "twitter",
}: {
  text: string;
  platform?: string;
}) {
  const parts: React.ReactNode[] = [];
  const re = /#([\p{L}0-9_]+)/gu;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    const tag = m[1]!.toLowerCase();
    parts.push(
      <Link
        key={key++}
        className="hashtag"
        href={`/${platform}/hashtag/${encodeURIComponent(tag)}`}
      >
        #{m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{parts}</>;
}
