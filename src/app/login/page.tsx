import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/session";
import { login } from "@/lib/auth/actions";

// Faithful port of PHP login.php — standalone card on the gradient backdrop
// (body.login-page in base.css), no topbar chrome.
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getCurrentUser()) redirect("/");
  const { error } = await searchParams;

  return (
    <div className="login-page">
      <div className="login-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/logo_light.png"
          alt="MockSocial"
          className="login-logo"
        />
        <p className="muted">Internal teaching tool — Hereford College</p>
        {error ? <div className="error">Invalid username or password.</div> : null}
        <form action={login}>
          <label>
            Username
            <input name="username" autoFocus required />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          <button type="submit">Log in</button>
        </form>
        <p className="muted small">
          Students: log in with your <strong>Student ID</strong> and the password{" "}
          <code>Student26</code>. Staff log in with their admin credentials.
        </p>
      </div>
    </div>
  );
}
