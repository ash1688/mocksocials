"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import type {
  Scenario,
  Beat,
  ScenarioPost,
  AvKind,
} from "@/lib/scenario/red-bull";

const AV_COLORS: Record<AvKind, { bg: string; color: string }> = {
  journo: { bg: "#e4f0fb", color: "#1574c2" },
  creator: { bg: "#fce4f1", color: "#c2186b" },
  jos: { bg: "#fdeede", color: "#c2670f" },
  mr: { bg: "#e3f6e9", color: "#1c7a3e" },
  news: { bg: "#fde8e8", color: "#c22020" },
  public: { bg: "#ece6fb", color: "#6b46c1" },
  official: { bg: "#fbf3d6", color: "#9a7a12" },
};

function fmtNum(n: number): string {
  return n >= 1_000_000
    ? (n / 1_000_000).toFixed(1) + "M"
    : n >= 1000
      ? (n / 1000).toFixed(0) + "K"
      : String(n);
}

// Highlight #hashtags / @mentions without linking (scenario is self-contained).
function highlight(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /([#@][\w]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(<Fragment key={k++}>{text.slice(last, m.index)}</Fragment>);
    parts.push(
      <span key={k++} className="scn-tag">
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<Fragment key={k++}>{text.slice(last)}</Fragment>);
  return parts;
}

function PostCard({ p }: { p: ScenarioPost }) {
  const c = AV_COLORS[p.av];
  return (
    <article className={`tweet card scn-card ${p.creator ? "scn-creator" : ""}`}>
      <div className="tweet-head">
        <div
          className="avatar scn-avatar"
          style={{ background: c.bg, color: c.color }}
        >
          {p.initials}
        </div>
        <div style={{ flex: 1 }}>
          <strong>{p.name}</strong>
          {p.verified ? <span className="scn-verified"> ✓</span> : null}{" "}
          <span className="muted">{p.handle}</span>
        </div>
        <span className={`scn-platform ${p.platform === "MockTube" ? "scn-mocktube" : ""}`}>
          {p.platform}
        </span>
      </div>
      <div className="tweet-body">{highlight(p.text)}</div>
      <div className="tweet-actions" style={{ gap: 18 }}>
        <span className="action">♥ {fmtNum(p.likes)}</span>
        <span className="action">🔁 {fmtNum(p.rts)}</span>
      </div>
    </article>
  );
}

function BeatCard({ beat }: { beat: Beat }) {
  if (beat.type === "trend") {
    return (
      <div className="card scn-trend">
        <div className="muted small">{beat.label}</div>
        <div className="scn-trend-tag">{beat.hashtag}</div>
        <div className="muted small">{beat.volume}</div>
        <div className="muted small" style={{ fontStyle: "italic", marginTop: 4 }}>
          {beat.context}
        </div>
      </div>
    );
  }
  if (beat.type === "impact") {
    return (
      <div className="card scn-impact">
        <div className="scn-impact-label">By the numbers</div>
        <div className="scn-impact-title">{beat.title}</div>
        <div className="scn-impact-grid">
          {beat.stats.map((s, i) => (
            <div key={i}>
              <div className="scn-impact-num">{s.num}</div>
              <div className="scn-impact-desc">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <PostCard p={beat} />;
}

export function ScenarioPlayer({ scenario }: { scenario: Scenario }) {
  const [step, setStep] = useState(0);
  const total = scenario.sections.length;
  const latestRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (step > 0 && latestRef.current) {
      latestRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  return (
    <>
      <style>{SCN_CSS}</style>

      <div className="scn-bar">
        <div className="scn-bar-left">
          <span className="scn-badge">{scenario.badge}</span>
          <span className="scn-title">{scenario.title}</span>
        </div>
        <div className="scn-bar-center">
          <div className="scn-pips">
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className={`scn-pip ${i === step ? "active" : i < step ? "done" : ""}`}
              />
            ))}
          </div>
          <span className="scn-step">
            Step {step} of {total}
          </span>
        </div>
        <div className="scn-bar-right">
          <button className="btn-outline" onClick={() => setStep(0)} disabled={step === 0}>
            ↺ Restart
          </button>
          <button
            className="btn-outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            ← Prev
          </button>
          <button
            className="btn-twitter"
            onClick={() => setStep((s) => Math.min(total, s + 1))}
            disabled={step >= total}
          >
            Next →
          </button>
        </div>
      </div>

      <main className="content scn-feed">
        {/* Pre-existing ambient posts (the feed before the story breaks). */}
        <div className="scn-pre">
          {scenario.prePosts.map((p, i) => (
            <PostCard key={`pre-${i}`} p={p} />
          ))}
        </div>

        {scenario.sections.slice(0, step).map((section, si) => (
          <div key={si} ref={si === step - 1 ? latestRef : null}>
            <div className="scn-divider">
              <span className="scn-divider-line" />
              <span className="scn-divider-text">{section.label}</span>
              <span className="scn-divider-line" />
            </div>
            {section.posts.map((beat, bi) => (
              <div
                key={bi}
                className={si === step - 1 ? "scn-reveal" : undefined}
                style={si === step - 1 ? { animationDelay: `${bi * 350}ms` } : undefined}
              >
                <BeatCard beat={beat} />
              </div>
            ))}
          </div>
        ))}

        {step === 0 ? (
          <p className="muted" style={{ textAlign: "center", padding: "40px 0" }}>
            Press <strong>Next →</strong> to play the documentary.
          </p>
        ) : null}
      </main>
    </>
  );
}

const SCN_CSS = `
.scn-bar {
  position: sticky; top: 57px; z-index: 9;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  background: var(--topbar-bg); border-bottom: 1px solid var(--border);
  padding: 10px 24px;
}
.scn-bar-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
.scn-badge { background: var(--primary); color: #fff; font-size: 10px; font-weight: 600;
  letter-spacing: 1.5px; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; }
.scn-title { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.scn-bar-center { display: flex; align-items: center; gap: 10px; }
.scn-pips { display: flex; gap: 5px; }
.scn-pip { width: 6px; height: 6px; border-radius: 50%; background: var(--border); transition: all .3s; }
.scn-pip.active { background: var(--primary); transform: scale(1.3); }
.scn-pip.done { background: var(--muted); }
.scn-step { font-size: 11px; color: var(--muted); white-space: nowrap; }
.scn-bar-right { display: flex; gap: 8px; }
.scn-bar-right button { padding: 6px 12px; font-size: 12px; }

.scn-feed { max-width: 600px; }
.scn-pre { opacity: 0.55; display: flex; flex-direction: column; gap: 8px; margin-bottom: 8px; }
.scn-card { margin-bottom: 8px; }
.scn-avatar { width: 40px; height: 40px; display: inline-flex; align-items: center;
  justify-content: center; font-weight: 600; font-size: 13px; }
.scn-verified { color: var(--primary); }
.scn-platform { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); }
.scn-platform.scn-mocktube { color: #e1306c; }
.scn-tag { color: var(--primary); }
.scn-card.scn-creator { border-left: 3px solid #e1306c; }

.scn-divider { display: flex; align-items: center; gap: 12px; padding: 22px 0 12px; }
.scn-divider-line { flex: 1; height: 1px; background: var(--border); }
.scn-divider-text { font-size: 11px; font-weight: 600; letter-spacing: 1.2px;
  text-transform: uppercase; color: var(--muted); white-space: nowrap; }

@keyframes scnUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
.scn-reveal { opacity: 0; animation: scnUp .4s ease forwards; }

.scn-trend { border-left: 3px solid var(--primary); }
.scn-trend-tag { font-size: 18px; font-weight: 600; color: var(--primary); margin: 4px 0; }

.scn-impact { background: linear-gradient(135deg, #0f2027, #1a3a4a); border-color: #1d4a5e; color: #fff; }
.scn-impact-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #4a9db5; font-weight: 600; }
.scn-impact-title { font-size: 16px; font-weight: 600; margin: 4px 0 16px; }
.scn-impact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.scn-impact-num { font-size: 22px; font-weight: 700; }
.scn-impact-desc { font-size: 11px; color: #4a9db5; margin-top: 3px; line-height: 1.35; }

@media (max-width: 720px) {
  .scn-title { display: none; }
  .scn-impact-grid { grid-template-columns: repeat(2, 1fr); }
}
`;
