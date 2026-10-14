import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  head: () => ({ meta: [
    { title: "Reset Password — filmabent" },
    { name: "description", content: "Reset your filmabent owner account password." },
    { property: "og:title", content: "Reset Password — filmabent" },
    { property: "og:description", content: "Secure password recovery for the filmabent owner studio." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex,nofollow" },
  ] }),
});
function ResetPassword() {
  const [recovery, setRecovery] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { setRecovery(new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery"); const handle = () => setRecovery(true); window.addEventListener("filmabent-recovery", handle); return () => window.removeEventListener("filmabent-recovery", handle); }, []);
  return <main className="min-h-screen bg-background px-6 py-24 text-foreground"><form className="mx-auto max-w-sm space-y-6" onSubmit={async event => { event.preventDefault(); if (!recovery) return; setBusy(true); const { error } = await supabase.auth.updateUser({ password }); setBusy(false); setMessage(error ? error.message : "Password updated. You can return to the owner studio."); }}><h1 className="font-display text-4xl">Reset password</h1>{recovery ? <><label className="block">New password<Input type="password" autoComplete="new-password" minLength={8} required className="mt-2" value={password} onChange={event => setPassword(event.target.value)} /></label><Button disabled={busy} type="submit">Save password</Button></> : <p>Open the password reset link from your email.</p>}{message && <p role="status">{message}</p>}<a href="/owner" className="block text-primary">Return to owner studio</a></form></main>;
}