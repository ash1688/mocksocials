import { redirect } from "next/navigation";

// The scenario list now lives at /scenarios; play individual ones at
// /scenario/[id]. Keep this path working by redirecting to the index.
export default function ScenarioIndexRedirect() {
  redirect("/scenarios");
}
