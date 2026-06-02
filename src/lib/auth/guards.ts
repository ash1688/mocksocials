import { redirect } from "next/navigation";

import { getCurrentUser, type CurrentUser } from "./session";

/** Require a logged-in user (PHP: redirect to login if !current_user()). */
export async function requireUser(): Promise<CurrentUser> {
  const me = await getCurrentUser();
  if (!me) redirect("/login");
  return me;
}

/** Require an admin (PHP require_admin). Non-admins get bounced home. */
export async function requireAdmin(): Promise<CurrentUser> {
  const me = await requireUser();
  if (!me.isAdmin) redirect("/");
  return me;
}
