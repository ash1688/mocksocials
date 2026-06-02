import { redirect } from "next/navigation";

import { getCurrentAccount, type Account } from "./session";
import { getOrCreateWorkspace } from "./provision";
import type { workspaces } from "@/db/schema";

/** Require a signed-in teacher. Redirects students to their dashboard. */
export async function requireTeacher(): Promise<Account> {
  const account = await getCurrentAccount();
  if (!account) redirect("/login");
  if (account.role !== "teacher") redirect("/dashboard");
  return account;
}

type Workspace = typeof workspaces.$inferSelect;

/** Require a signed-in student and return them with their Workspace. Redirects
 *  unauthenticated users to /login and teachers to /admin. */
export async function requireStudentWorkspace(): Promise<{
  account: Account;
  workspace: Workspace;
}> {
  const account = await getCurrentAccount();
  if (!account) redirect("/login");
  if (account.role !== "student") redirect("/admin");
  const workspace = await getOrCreateWorkspace(account.id);
  return { account, workspace };
}
