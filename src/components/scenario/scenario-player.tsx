"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type {
  Scenario,
  Beat,
  ScenarioPost,
  AvKind,
  ClientTask,
} from "@/lib/scenario/red-bull";
import {
  saveScenarioResponses,
  markScenarioFeedbackSeen,
  resetMyScenario,
  type GradedTask,
  type SaveResult,
} from "@/lib/scenario/actions";
import type { PriorResponse } from "@/lib/scenario/queries";

const AV_COLORS: Record<AvKind, { bg: string; color: string }> = {
  journo: { bg: "#e4f0fb", color: "#1574c2" },
  creator: { bg: "#fce4f1", color: "#c2186b" },
  jos: { bg: "#fdeede", color: "#c2670f" },
  mr: { bg: "#e3f6e9", color: "#1c7a3e" },
  news: { bg: "#fde8e8", color: "#c22020" },
  public: { bg: "#ece6fb", color: "#6b46c1" },
  official: { bg: "#fbf3d6", color: "#9a7a12" },
  brand: { bg: "#fde8e8", color: "#c2202c" },
  driver: { bg: "#fdeaef", color: "#c41e5a" },
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

/** MockTube beat → native video card (faithful .yt-card) + the text as the
 *  video description, so the combined feed mixes real-looking platforms. */
function YtCard({ p }: { p: ScenarioPost }) {
  const c = AV_COLORS[p.av];
  const thumb = `https://picsum.photos/seed/${encodeURIComponent(p.videoTitle ?? p.handle)}/640/360`;
  return (
    <div className="scn-yt-wrap">
      <div className="yt-card scn-yt">
        <div className="yt-thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt="" />
          <span className="yt-duration">{p.duration ?? "10:00"}</span>
          <span className="yt-play">▶</span>
        </div>
        <div className="yt-meta">
          <div
            className="avatar scn-avatar scn-yt-av"
            style={{ background: c.bg, color: c.color }}
          >
            {p.initials}
          </div>
          <div>
            <div className="yt-title">{p.videoTitle ?? p.text.slice(0, 60)}</div>
            <div className="muted small">
              {p.name} · <span className="scn-mocktube">MockTube</span>
            </div>
            <div className="muted small">{fmtNum(p.likes)} views</div>
          </div>
        </div>
      </div>
      <div className="scn-yt-desc">{highlight(p.text)}</div>
    </div>
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
  if (beat.type === "verdict") {
    return (
      <div className={`card scn-verdict scn-verdict-${beat.tone}`}>
        <div className="scn-verdict-label">
          {beat.label} · {beat.tone}
        </div>
        <div className="scn-verdict-heading">{beat.heading}</div>
        <div className="scn-verdict-body">{beat.body}</div>
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
  if (beat.type === "silence") {
    return (
      <div className="card scn-silence">
        <div className="scn-silence-title">{beat.title}</div>
        <div className="scn-silence-rows">
          {beat.rows.map((r, i) => (
            <div key={i} className="scn-silence-row">
              <span className="scn-silence-time">{r.time}</span>
              <span className="scn-silence-event">{r.event}</span>
              <span
                className={`scn-silence-status ${r.responded ? "ok" : "bad"}`}
              >
                {r.responded ? "✓ Responded" : "● Silence"}
              </span>
            </div>
          ))}
        </div>
        {beat.footer ? (
          <div className="scn-silence-footer">{beat.footer}</div>
        ) : null}
      </div>
    );
  }
  if (beat.type === "prapology") {
    return (
      <div className="card scn-prapology">
        <div className="scn-prapology-title">{beat.title}</div>
        <div className="scn-prapology-cols">
          <div className="scn-prapology-col bad">
            <div className="scn-prapology-label">{beat.bad.label}</div>
            {beat.bad.points.map((p, i) => (
              <div key={i} className="scn-prapology-point">
                {p}
              </div>
            ))}
          </div>
          <div className="scn-prapology-col good">
            <div className="scn-prapology-label">{beat.good.label}</div>
            {beat.good.points.map((p, i) => (
              <div key={i} className="scn-prapology-point">
                {p}
              </div>
            ))}
          </div>
        </div>
        {beat.verdict ? (
          <div className="scn-prapology-verdict">{beat.verdict}</div>
        ) : null}
      </div>
    );
  }
  if (beat.type === "reported") {
    return (
      <div className="card scn-reported">
        <div className="scn-reported-source">{beat.source}</div>
        <div className="scn-reported-context">{beat.context}</div>
        <blockquote className="scn-reported-quote">
          &ldquo;{beat.quote}&rdquo;
        </blockquote>
        {beat.footer ? (
          <div className="scn-reported-footer">{beat.footer}</div>
        ) : null}
      </div>
    );
  }
  if (beat.type === "factcheck") {
    return (
      <div className="card scn-factcheck">
        <div className="scn-factcheck-title">🔍 {beat.title}</div>
        <div className="scn-factcheck-claim">{beat.claim}</div>
        {beat.rows.map((r, i) => (
          <div key={i} className="scn-factcheck-row">
            <div className="scn-factcheck-k">{r.k}</div>
            <div className="scn-factcheck-v">{r.v}</div>
          </div>
        ))}
        {beat.verdict ? (
          <div className="scn-factcheck-verdict">
            <strong>Verdict: </strong>
            {beat.verdict}
          </div>
        ) : null}
      </div>
    );
  }
  if (beat.type === "broadcast") {
    return (
      <div className="card scn-broadcast">
        <div className="scn-broadcast-top">
          <span className="scn-broadcast-live">● LIVE</span>
          <span className="scn-broadcast-show">{beat.show}</span>
          <span className="scn-broadcast-seg">{beat.segment}</span>
        </div>
        <div className="scn-broadcast-headline">{beat.headline}</div>
        <div className="scn-broadcast-standfirst">{beat.standfirst}</div>
        {beat.ticker ? (
          <div className="scn-broadcast-ticker">{beat.ticker}</div>
        ) : null}
      </div>
    );
  }
  if (beat.type === "podcast") {
    return (
      <div className="card scn-podcast">
        <div className="scn-podcast-top">
          <span className="scn-podcast-mic">🎙️</span>
          <span className="scn-podcast-show">{beat.show}</span>
          <span className="scn-podcast-ep">{beat.epnum}</span>
        </div>
        <div className="scn-podcast-title">{beat.title}</div>
        <div className="scn-podcast-panel">
          {beat.panel.map((m, i) => (
            <span key={i} className="scn-podcast-guest">
              <span className="scn-podcast-initials">{m.initials}</span>
              {m.name}
            </span>
          ))}
        </div>
        {beat.tagline ? (
          <div className="scn-podcast-tagline">{beat.tagline}</div>
        ) : null}
      </div>
    );
  }
  if (beat.type === "multilens") {
    return (
      <div className="card scn-multilens">
        <div className="scn-multilens-title">{beat.title}</div>
        {beat.lenses.map((l, i) => (
          <div key={i} className="scn-multilens-lens">
            <div className="scn-multilens-label">{l.label}</div>
            <div className="scn-multilens-text">{l.text}</div>
          </div>
        ))}
        {beat.footer ? (
          <div className="scn-multilens-footer">{beat.footer}</div>
        ) : null}
      </div>
    );
  }
  if (beat.type === "counttimeline") {
    return (
      <div className="card scn-ctl">
        <div className="scn-ctl-title">{beat.title}</div>
        <div className="scn-ctl-rows">
          {beat.rows.map((r, i) => (
            <div key={i} className={`scn-ctl-row ${r.final ? "final" : ""}`}>
              <span className="scn-ctl-date">{r.date}</span>
              <span className="scn-ctl-event">{r.event}</span>
              <span className="scn-ctl-count">{r.count}</span>
            </div>
          ))}
        </div>
        {beat.footer ? (
          <div className="scn-ctl-footer">{beat.footer}</div>
        ) : null}
      </div>
    );
  }
  if (beat.type === "consequences") {
    return (
      <div className="card scn-conseq">
        <div className="scn-conseq-title">{beat.title}</div>
        {beat.items.map((it, i) => (
          <div key={i} className="scn-conseq-item">
            <div className="scn-conseq-icon">{it.icon}</div>
            <div>
              <div className="scn-conseq-label">{it.label}</div>
              <div className="scn-conseq-detail">{it.detail}</div>
            </div>
          </div>
        ))}
        {beat.footer ? (
          <div className="scn-conseq-footer">{beat.footer}</div>
        ) : null}
      </div>
    );
  }
  if (beat.type === "terrace") {
    return (
      <div className="card scn-terrace">
        <div className="scn-terrace-top">
          <span className="scn-terrace-live">● LIVE</span>
          <span className="scn-terrace-stadium">{beat.stadium}</span>
        </div>
        <div className="scn-terrace-chants">
          {beat.chants.map((c, i) => (
            <div key={i} className="scn-terrace-chant">
              {c}
            </div>
          ))}
        </div>
        {beat.note ? (
          <div className="scn-terrace-note">{beat.note}</div>
        ) : null}
      </div>
    );
  }
  if (beat.type === "twolesson") {
    return (
      <div className="card scn-twolesson">
        <div className="scn-twolesson-title">{beat.title}</div>
        <div className="scn-twolesson-cols">
          <div className="scn-twolesson-col left">
            <div className="scn-twolesson-label">{beat.left.label}</div>
            {beat.left.points.map((p, i) => (
              <div key={i} className="scn-twolesson-point">
                {p}
              </div>
            ))}
          </div>
          <div className="scn-twolesson-col right">
            <div className="scn-twolesson-label">{beat.right.label}</div>
            {beat.right.points.map((p, i) => (
              <div key={i} className="scn-twolesson-point">
                {p}
              </div>
            ))}
          </div>
        </div>
        {beat.verdict ? (
          <div className="scn-twolesson-verdict">{beat.verdict}</div>
        ) : null}
      </div>
    );
  }
  // beat.type === "post" — render in the post's native platform style.
  if (beat.platform === "MockTube") return <YtCard p={beat} />;
  return <PostCard p={beat} />;
}

/** End-of-scenario Q&A. Answers (MCQ choices + written responses) are collected
 *  locally, then saved + graded server-side on submit — only then are the
 *  correct answers and explanations revealed. Resubmitting upserts. */
function TaskPanel({
  scenarioId,
  tasks,
  prior,
}: {
  scenarioId: string;
  tasks: ClientTask[];
  prior: PriorResponse[];
}) {
  const priorById = new Map(prior.map((p) => [p.taskId, p]));
  const hasPrior = prior.length > 0;
  const [choices, setChoices] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const p of prior) if (p.selectedIndex != null) init[p.taskId] = p.selectedIndex;
    return init;
  });
  const [texts, setTexts] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const p of prior) if (p.responseText != null) init[p.taskId] = p.responseText;
    return init;
  });
  const [result, setResult] = useState<SaveResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Reaching the Tasks panel counts as viewing any waiting feedback — clear the
  // nav badge (best-effort; the badge updates on the next navigation).
  const hasFeedback = prior.some((p) => p.teacherFeedback);
  useEffect(() => {
    if (hasFeedback) void markScenarioFeedbackSeen(scenarioId);
  }, [hasFeedback, scenarioId]);

  const allAnswered = tasks.every((t) =>
    t.type === "mcq"
      ? choices[t.id] !== undefined
      : (texts[t.id] ?? "").trim().length > 0,
  );

  const gradedById = new Map<string, GradedTask>(
    (result?.graded ?? []).map((g) => [g.taskId, g]),
  );
  const submitted = result?.ok === true;

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const answers = tasks.map((t) => ({
        taskId: t.id,
        value: t.type === "mcq" ? (choices[t.id] ?? -1) : (texts[t.id] ?? ""),
      }));
      const res = await saveScenarioResponses(scenarioId, answers);
      if (!res.ok) setError(res.error ?? "Could not save your answers.");
      setResult(res);
    } catch {
      setError("Something went wrong saving your answers. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReset() {
    if (
      !window.confirm(
        "Reset your attempt? This clears your saved answers (and any teacher feedback) for this scenario so you can start again.",
      )
    )
      return;
    setResetting(true);
    setError(null);
    try {
      await resetMyScenario(scenarioId);
      setChoices({});
      setTexts({});
      setResult(null);
      router.refresh(); // drop the now-stale prior answers from the server
    } catch {
      setError("Could not reset your attempt. Please try again.");
    } finally {
      setResetting(false);
    }
  }

  const canReset = hasPrior || submitted;

  return (
    <div className="card scn-tasks">
      <p className="muted small scn-tasks-intro">
        Answer every question, then press <strong>Submit answers</strong>. Your
        responses are saved and the correct answers are revealed at the end. Some
        questions ask you to apply what you learned to people the scenario didn&apos;t
        directly show.
        {hasPrior ? (
          <>
            {" "}
            Your previous answers are filled in below — look out for{" "}
            <strong>teacher feedback</strong> on your written responses.
          </>
        ) : null}
      </p>

      {tasks.map((task, i) => {
        const graded = gradedById.get(task.id);
        return (
          <div key={task.id} className="scn-task">
            <div className="scn-task-prompt">
              <span className="scn-task-num">{i + 1}</span>
              {task.prompt}
            </div>

            {task.type === "mcq" ? (
              <div className="scn-opts">
                {task.options.map((opt, oi) => {
                  const chosen = choices[task.id] === oi;
                  const isCorrect = submitted && graded?.correctIndex === oi;
                  const isWrongChoice = submitted && chosen && !isCorrect;
                  return (
                    <button
                      key={oi}
                      type="button"
                      className={[
                        "scn-opt",
                        chosen ? "chosen" : "",
                        isCorrect ? "correct" : "",
                        isWrongChoice ? "wrong" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      disabled={submitting || submitted}
                      onClick={() =>
                        setChoices((c) => ({ ...c, [task.id]: oi }))
                      }
                    >
                      <span className="scn-opt-mark">
                        {isCorrect ? "✓" : isWrongChoice ? "✗" : ""}
                      </span>
                      {opt}
                    </button>
                  );
                })}
                {submitted && graded?.explanation ? (
                  <div className="scn-explain">
                    <strong>
                      {graded.correct ? "Correct. " : "Answer. "}
                    </strong>
                    {graded.explanation}
                  </div>
                ) : null}
              </div>
            ) : (
              <div>
                <textarea
                  className="scn-textarea"
                  rows={4}
                  placeholder={task.placeholder ?? "Type your answer…"}
                  value={texts[task.id] ?? ""}
                  disabled={submitting}
                  onChange={(e) =>
                    setTexts((t) => ({ ...t, [task.id]: e.target.value }))
                  }
                />
                {submitted ? (
                  <div className="scn-explain">
                    <strong>Saved. </strong>
                    Written responses are recorded for your teacher to review —
                    there is no single right answer.
                  </div>
                ) : null}
                {priorById.get(task.id)?.teacherFeedback ? (
                  <div className="scn-feedback">
                    <strong>Teacher feedback: </strong>
                    {priorById.get(task.id)!.teacherFeedback}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        );
      })}

      {error ? <div className="scn-task-error">{error}</div> : null}

      {submitted && result?.score && result.score.total > 0 ? (
        <div className="scn-score">
          You answered <strong>{result.score.correct}</strong> of{" "}
          <strong>{result.score.total}</strong> multiple-choice questions
          correctly.
        </div>
      ) : null}

      <div className="scn-task-buttons">
        <button
          type="button"
          className="btn-twitter scn-submit"
          disabled={submitting || resetting || !allAnswered}
          onClick={handleSubmit}
        >
          {submitting
            ? "Saving…"
            : submitted
              ? "Resubmit answers"
              : "Submit answers"}
        </button>
        {canReset ? (
          <button
            type="button"
            className="btn-outline scn-reset"
            disabled={submitting || resetting}
            onClick={handleReset}
          >
            {resetting ? "Resetting…" : "Reset attempt"}
          </button>
        ) : null}
      </div>
      {!allAnswered && !submitted ? (
        <span className="muted small scn-submit-hint">
          Answer all questions to submit.
        </span>
      ) : null}
    </div>
  );
}

export function ScenarioPlayer({
  scenario,
  scenarioId,
  tasks,
  prior,
}: {
  scenario: Omit<Scenario, "tasks">;
  scenarioId: string;
  tasks: ClientTask[];
  prior: PriorResponse[];
}) {
  const [step, setStep] = useState(0);
  const hasTasks = tasks.length > 0;
  // The Tasks panel is one extra terminal step after the last section.
  const total = scenario.sections.length + (hasTasks ? 1 : 0);
  const onTasksStep = hasTasks && step > scenario.sections.length;
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
            <BeatCard key={`pre-${i}`} beat={p} />
          ))}
        </div>

        {scenario.sections
          .slice(0, Math.min(step, scenario.sections.length))
          .map((section, si) => (
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

        {onTasksStep ? (
          <div ref={latestRef} className="scn-reveal">
            <div className="scn-divider">
              <span className="scn-divider-line" />
              <span className="scn-divider-text">Tasks — Check Your Understanding</span>
              <span className="scn-divider-line" />
            </div>
            <TaskPanel scenarioId={scenarioId} tasks={tasks} prior={prior} />
          </div>
        ) : null}

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

/* MockTube native card in the combined feed */
.scn-yt-wrap { margin-bottom: 8px; }
.scn-yt { display: block; margin-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
.scn-yt-av { width: 36px; height: 36px; font-size: 12px; }
.scn-yt-desc {
  background: var(--card-bg); border: 1px solid var(--border); border-top: none;
  border-radius: 0 0 12px 12px; padding: 12px 14px; font-size: 14px;
  line-height: 1.5; white-space: pre-wrap; color: var(--text);
}

.scn-trend { border-left: 3px solid var(--primary); }
.scn-trend-tag { font-size: 18px; font-weight: 600; color: var(--primary); margin: 4px 0; }

/* Verdict (closing slide) */
.scn-verdict { border-left: 4px solid var(--muted); }
.scn-verdict-cautionary { border-left-color: #d98a1a; }
.scn-verdict-win { border-left-color: #1c7a3e; }
.scn-verdict-fail { border-left-color: var(--danger); }
.scn-verdict-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); font-weight: 600; }
.scn-verdict-heading { font-size: 20px; font-weight: 700; margin: 6px 0 10px; }
.scn-verdict-body { font-size: 14px; line-height: 1.7; color: var(--text); }

/* Silence timer */
.scn-silence { border-left: 4px solid var(--danger); }
.scn-silence-title { font-size: 15px; font-weight: 700; color: var(--danger); margin-bottom: 8px; }
.scn-silence-rows { display: flex; flex-direction: column; }
.scn-silence-row { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px dashed var(--border); }
.scn-silence-row:last-child { border-bottom: none; }
.scn-silence-time { flex: none; width: 78px; font-size: 12px; font-weight: 600; color: var(--muted); }
.scn-silence-event { flex: 1; font-size: 13px; line-height: 1.45; color: var(--text); }
.scn-silence-status { flex: none; font-size: 12px; font-weight: 700; text-align: right; min-width: 92px; }
.scn-silence-status.bad { color: var(--danger); }
.scn-silence-status.ok { color: #1c7a3e; }
.scn-silence-footer { margin-top: 10px; font-size: 12px; font-style: italic; color: var(--muted); line-height: 1.5; }

/* PR apology vs real apology */
.scn-prapology-title { font-size: 15px; font-weight: 700; text-align: center; margin-bottom: 12px; }
.scn-prapology-cols { display: flex; gap: 10px; align-items: stretch; }
.scn-prapology-col { flex: 1; border-radius: 8px; padding: 12px; }
.scn-prapology-col.bad { background: color-mix(in srgb, var(--danger) 8%, var(--card-bg)); border: 1px solid color-mix(in srgb, var(--danger) 30%, var(--border)); }
.scn-prapology-col.good { background: color-mix(in srgb, #1c7a3e 10%, var(--card-bg)); border: 1px solid color-mix(in srgb, #1c7a3e 30%, var(--border)); }
.scn-prapology-label { font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 8px; }
.scn-prapology-col.bad .scn-prapology-label { color: var(--danger); }
.scn-prapology-col.good .scn-prapology-label { color: #1c7a3e; }
.scn-prapology-point { font-size: 12.5px; line-height: 1.5; color: var(--text); margin-bottom: 7px; padding-left: 16px; position: relative; }
.scn-prapology-col.bad .scn-prapology-point::before { content: "✗"; position: absolute; left: 0; color: var(--danger); font-weight: 700; }
.scn-prapology-col.good .scn-prapology-point::before { content: "✓"; position: absolute; left: 0; color: #1c7a3e; font-weight: 700; }
.scn-prapology-verdict { margin-top: 12px; padding-top: 11px; border-top: 1px solid var(--border); font-size: 13px; font-style: italic; text-align: center; color: var(--muted); line-height: 1.5; }

/* Reported quote */
.scn-reported { border-left: 3px solid #d98a1a; }
.scn-reported-source { font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #d98a1a; margin-bottom: 8px; }
.scn-reported-context { font-size: 13px; color: var(--muted); line-height: 1.5; margin-bottom: 10px; }
.scn-reported-quote { font-size: 18px; font-weight: 600; line-height: 1.4; color: var(--text); padding: 6px 0 6px 14px; border-left: 2px solid var(--muted); margin: 0 0 10px; }
.scn-reported-footer { font-size: 12px; font-style: italic; color: var(--muted); line-height: 1.5; }

/* Fact-check */
.scn-factcheck-title { font-size: 15px; font-weight: 700; margin-bottom: 10px; }
.scn-factcheck-claim { background: color-mix(in srgb, var(--danger) 10%, var(--card-bg)); border: 1px solid color-mix(in srgb, var(--danger) 30%, var(--border)); border-left: 3px solid var(--danger); border-radius: 6px; padding: 10px 12px; font-size: 14px; font-style: italic; color: var(--text); margin-bottom: 12px; }
.scn-factcheck-row { padding: 8px 0; border-bottom: 1px dashed var(--border); }
.scn-factcheck-row:last-of-type { border-bottom: none; }
.scn-factcheck-k { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: var(--muted); margin-bottom: 3px; }
.scn-factcheck-v { font-size: 13px; line-height: 1.45; color: var(--text); }
.scn-factcheck-verdict { margin-top: 12px; padding: 10px 12px; background: color-mix(in srgb, #1c7a3e 10%, var(--card-bg)); border: 1px solid color-mix(in srgb, #1c7a3e 30%, var(--border)); border-radius: 6px; font-size: 13px; line-height: 1.5; color: var(--text); }
.scn-factcheck-verdict strong { color: #1c7a3e; }

/* Two-lesson / two-trap */
.scn-twolesson-title { font-size: 15px; font-weight: 700; text-align: center; margin-bottom: 12px; }
.scn-twolesson-cols { display: flex; gap: 10px; align-items: stretch; }
.scn-twolesson-col { flex: 1; border-radius: 8px; padding: 12px; }
.scn-twolesson-col.left { background: color-mix(in srgb, #d98a1a 10%, var(--card-bg)); border: 1px solid color-mix(in srgb, #d98a1a 30%, var(--border)); }
.scn-twolesson-col.right { background: color-mix(in srgb, var(--primary) 8%, var(--card-bg)); border: 1px solid color-mix(in srgb, var(--primary) 30%, var(--border)); }
.scn-twolesson-label { font-size: 11px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; margin-bottom: 8px; }
.scn-twolesson-col.left .scn-twolesson-label { color: #d98a1a; }
.scn-twolesson-col.right .scn-twolesson-label { color: var(--primary); }
.scn-twolesson-point { font-size: 12.5px; line-height: 1.5; color: var(--text); margin-bottom: 7px; padding-left: 14px; position: relative; }
.scn-twolesson-point::before { content: "›"; position: absolute; left: 0; color: var(--muted); font-weight: 700; }
.scn-twolesson-verdict { margin-top: 12px; padding-top: 11px; border-top: 1px solid var(--border); font-size: 13px; font-style: italic; text-align: center; color: var(--muted); line-height: 1.5; }

/* Broadcast segment */
.scn-broadcast { border-left: 4px solid var(--primary); }
.scn-broadcast-top { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
.scn-broadcast-live { font-size: 11px; font-weight: 800; color: var(--danger); letter-spacing: 0.04em; }
.scn-broadcast-show { font-size: 12px; font-weight: 700; color: var(--text); }
.scn-broadcast-seg { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
.scn-broadcast-headline { font-size: 16px; font-weight: 700; line-height: 1.35; margin-bottom: 6px; }
.scn-broadcast-standfirst { font-size: 13px; color: var(--text); line-height: 1.55; }
.scn-broadcast-ticker { margin-top: 10px; background: var(--primary); color: #fff; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; padding: 6px 10px; border-radius: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* Podcast */
.scn-podcast { border-left: 4px solid #6b46c1; }
.scn-podcast-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.scn-podcast-show { font-size: 12px; font-weight: 700; }
.scn-podcast-ep { font-size: 11px; color: var(--muted); }
.scn-podcast-title { font-size: 15px; font-weight: 700; line-height: 1.35; margin-bottom: 10px; }
.scn-podcast-panel { display: flex; flex-wrap: wrap; gap: 8px; }
.scn-podcast-guest { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text); background: var(--bg); border: 1px solid var(--border); border-radius: 999px; padding: 3px 10px 3px 3px; }
.scn-podcast-initials { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: #6b46c1; color: #fff; font-size: 10px; font-weight: 700; }
.scn-podcast-tagline { margin-top: 10px; font-size: 12px; font-style: italic; color: var(--muted); line-height: 1.5; }

/* Multi-lens perspectives */
.scn-multilens-title { font-size: 15px; font-weight: 700; text-align: center; margin-bottom: 12px; }
.scn-multilens-lens { padding: 8px 0 8px 12px; border-left: 3px solid var(--primary); margin-bottom: 8px; }
.scn-multilens-lens:nth-child(2) { border-left-color: #d98a1a; }
.scn-multilens-lens:nth-child(3) { border-left-color: #1c7a3e; }
.scn-multilens-lens:nth-child(4) { border-left-color: #6b46c1; }
.scn-multilens-lens:nth-child(5) { border-left-color: var(--danger); }
.scn-multilens-label { font-size: 12.5px; font-weight: 700; color: var(--text); margin-bottom: 3px; }
.scn-multilens-text { font-size: 13px; color: var(--muted); line-height: 1.5; }
.scn-multilens-footer { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); font-size: 13px; font-style: italic; text-align: center; color: var(--muted); line-height: 1.5; }

/* Count timeline (escalation) */
.scn-ctl { border-left: 4px solid #d98a1a; }
.scn-ctl-title { font-size: 15px; font-weight: 700; margin-bottom: 10px; }
.scn-ctl-rows { display: flex; flex-direction: column; }
.scn-ctl-row { display: flex; gap: 10px; align-items: baseline; padding: 8px 0; border-bottom: 1px dashed var(--border); }
.scn-ctl-row:last-child { border-bottom: none; }
.scn-ctl-date { flex: none; width: 96px; font-size: 12px; font-weight: 600; color: var(--muted); }
.scn-ctl-event { flex: 1; font-size: 13px; line-height: 1.45; color: var(--text); }
.scn-ctl-count { flex: none; font-size: 14px; font-weight: 700; color: var(--text); text-align: right; min-width: 64px; }
.scn-ctl-row.final { background: color-mix(in srgb, #d98a1a 12%, var(--card-bg)); border-radius: 6px; padding: 8px 8px; margin-top: 4px; border-bottom: none; }
.scn-ctl-row.final .scn-ctl-count { color: #d98a1a; font-size: 16px; }
.scn-ctl-footer { margin-top: 10px; font-size: 12px; font-style: italic; color: var(--muted); line-height: 1.5; }

/* Consequences tally */
.scn-conseq { border-left: 4px solid var(--danger); }
.scn-conseq-title { font-size: 15px; font-weight: 700; margin-bottom: 10px; }
.scn-conseq-item { display: flex; gap: 12px; align-items: flex-start; padding: 8px 0; border-bottom: 1px dashed var(--border); }
.scn-conseq-item:last-of-type { border-bottom: none; }
.scn-conseq-icon { font-size: 20px; flex: none; width: 26px; text-align: center; }
.scn-conseq-label { font-size: 14px; font-weight: 600; color: var(--text); }
.scn-conseq-detail { font-size: 13px; color: var(--muted); line-height: 1.45; margin-top: 1px; }
.scn-conseq-footer { margin-top: 10px; font-size: 12px; font-style: italic; color: var(--muted); line-height: 1.5; }

/* Terrace / live crowd */
.scn-terrace { border-left: 4px solid #d98a1a; }
.scn-terrace-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.scn-terrace-live { font-size: 11px; font-weight: 800; color: var(--danger); letter-spacing: 0.04em; }
.scn-terrace-stadium { font-size: 14px; font-weight: 700; color: var(--text); }
.scn-terrace-chants { display: flex; flex-direction: column; gap: 7px; }
.scn-terrace-chant { font-size: 13.5px; line-height: 1.5; color: var(--text); }
.scn-terrace-note { margin-top: 10px; font-size: 12px; font-style: italic; color: var(--muted); line-height: 1.5; }

.scn-impact { background: linear-gradient(135deg, #0f2027, #1a3a4a); border-color: #1d4a5e; color: #fff; }
.scn-impact-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #4a9db5; font-weight: 600; }
.scn-impact-title { font-size: 16px; font-weight: 600; margin: 4px 0 16px; }
.scn-impact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.scn-impact-num { font-size: 22px; font-weight: 700; }
.scn-impact-desc { font-size: 11px; color: #4a9db5; margin-top: 3px; line-height: 1.35; }

/* Tasks / Q&A panel */
.scn-tasks { display: flex; flex-direction: column; gap: 18px; }
.scn-tasks-intro { margin: 0; }
.scn-task { display: flex; flex-direction: column; gap: 10px; }
.scn-task-prompt { font-size: 15px; font-weight: 600; line-height: 1.45; display: flex; gap: 10px; }
.scn-task-num {
  flex: none; width: 22px; height: 22px; border-radius: 50%;
  background: var(--primary); color: #fff; font-size: 12px; font-weight: 700;
  display: inline-flex; align-items: center; justify-content: center;
}
.scn-opts { display: flex; flex-direction: column; gap: 8px; }
.scn-opt {
  display: flex; align-items: center; gap: 8px; text-align: left;
  padding: 10px 12px; font-size: 14px; line-height: 1.4;
  background: var(--card-bg); color: var(--text);
  border: 1px solid var(--border); border-radius: 10px; cursor: pointer;
  transition: border-color .15s, background .15s;
}
.scn-opt:hover:not(:disabled) { border-color: var(--primary); }
.scn-opt:disabled { cursor: default; }
.scn-opt.chosen { border-color: var(--primary); background: color-mix(in srgb, var(--primary) 8%, var(--card-bg)); }
.scn-opt.correct { border-color: #1c7a3e; background: color-mix(in srgb, #1c7a3e 14%, var(--card-bg)); }
.scn-opt.wrong { border-color: var(--danger); background: color-mix(in srgb, var(--danger) 12%, var(--card-bg)); }
.scn-opt-mark { width: 14px; font-weight: 700; }
.scn-opt.correct .scn-opt-mark { color: #1c7a3e; }
.scn-opt.wrong .scn-opt-mark { color: var(--danger); }
.scn-explain {
  font-size: 13px; line-height: 1.6; color: var(--text);
  background: var(--bg); border-left: 3px solid var(--primary);
  border-radius: 0 8px 8px 0; padding: 10px 12px;
}
.scn-textarea {
  width: 100%; resize: vertical; font: inherit; font-size: 14px; line-height: 1.5;
  padding: 10px 12px; border: 1px solid var(--border); border-radius: 10px;
  background: var(--card-bg); color: var(--text);
}
.scn-textarea:focus { outline: none; border-color: var(--primary); }
.scn-score {
  font-size: 15px; padding: 12px 14px; border-radius: 10px;
  background: var(--bg); border: 1px solid var(--border);
}
.scn-feedback {
  font-size: 13px; line-height: 1.6; color: var(--text);
  background: color-mix(in srgb, #d98a1a 12%, var(--card-bg));
  border-left: 3px solid #d98a1a; border-radius: 0 8px 8px 0;
  padding: 10px 12px; margin-top: 6px;
}
.scn-feedback strong { color: #b06f0f; }
.scn-task-error { color: var(--danger); font-size: 13px; }
.scn-task-buttons { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.scn-submit { padding: 10px 18px; }
.scn-reset { padding: 10px 16px; }
.scn-submit-hint { margin-top: -10px; }

@media (max-width: 720px) {
  .scn-title { display: none; }
  .scn-impact-grid { grid-template-columns: repeat(2, 1fr); }
}
`;
