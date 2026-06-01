import { redirect } from "next/navigation";

import { getCurrentAccount } from "@/lib/auth/session";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  // Already signed in? Skip the form.
  const account = await getCurrentAccount();
  if (account) redirect(account.role === "student" ? "/dashboard" : "/admin");

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 px-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          MockSocial — Unit 8 evidence sandbox.
        </p>
      </div>
      <LoginForm />
    </main>
  );
}
