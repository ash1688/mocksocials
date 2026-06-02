"use server";

import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import {
  STAT_KEYS,
  setStat,
  autofillPreset,
  type Platform,
  type Preset,
} from "@/lib/stats";

const PLATFORMS: Platform[] = ["twitter", "facebook", "instagram", "youtube"];
const PRESETS: Preset[] = ["low", "medium", "high"];

function platformOf(formData: FormData): Platform {
  const p = String(formData.get("platform") ?? "twitter");
  return (PLATFORMS as string[]).includes(p) ? (p as Platform) : "twitter";
}

/** Save manual stat values (PHP handle_stats manual save). */
export async function saveStats(formData: FormData): Promise<void> {
  const me = await requireUser();
  const platform = platformOf(formData);
  for (const k of STAT_KEYS[platform]) {
    const raw = formData.get(k);
    if (raw !== null) await setStat(me.id, platform, k, Number(raw) || 0);
  }
  redirect(`/stats?platform=${platform}&saved=1`);
}

/** Apply a Low/Medium/High autofill preset (PHP handle_stats preset). */
export async function applyPreset(formData: FormData): Promise<void> {
  const me = await requireUser();
  const platform = platformOf(formData);
  const presetRaw = String(formData.get("preset") ?? "");
  if (!(PRESETS as string[]).includes(presetRaw)) redirect(`/stats?platform=${platform}`);
  const preset = presetRaw as Preset;
  const vals = autofillPreset(platform, preset);
  for (const [k, v] of Object.entries(vals)) {
    await setStat(me.id, platform, k, v);
  }
  redirect(`/stats?platform=${platform}&preset=${preset}`);
}
