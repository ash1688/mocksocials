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
