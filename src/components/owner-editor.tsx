import { useEffect, useState } from "react";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Save, Plus, Trash2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, portfolioSchema, type Portfolio } from "@/lib/portfolio";
import { portfolioQuery, savePortfolio } from "@/lib/portfolio.functions";

export function OwnerEditor() {
  const [owner, setOwner] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let live = true;
    async function check() {
      const { data } = await supabase.auth.getUser();
      const role = data.user ? await supabase.rpc("has_role", { _user_id: data.user.id, _role: "owner" }) : null;
      if (live) { setSignedIn(Boolean(data.user)); setOwner(role?.data === true); setChecked(true); }
    }
    void check();
    const listener = () => void check();
    window.addEventListener("filmabent-auth", listener);
    return () => { live = false; window.removeEventListener("filmabent-auth", listener); };
  }, []);
  async function authenticate(signup: boolean) {
    setBusy(true); setMessage("");
    try {
      const { error } = signup ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/owner` } }) : await supabase.auth.signInWithPassword({ email, password });
      setMessage(error ? error.message : signup ? "Check your email to confirm your account, then sign in." : "");
    } finally { setBusy(false); }
  }
  return <main className="grain min-h-screen bg-background px-6 py-16 text-foreground">
    <div className="mx-auto max-w-5xl">
      <a href="/" className="font-display text-3xl">filmabent</a>
      <h1 className="mt-12 font-display text-5xl">Owner studio</h1>
      {!checked ? <p className="mt-8 text-muted-foreground">Checking access…</p> : owner ? <>
        <Button variant="ghost" className="mt-5" onClick={() => void supabase.auth.signOut()}><LogOut /> Sign out</Button>
        <EditorForms />
      </> : signedIn ? <div className="mt-10"><p>Only the authorised owner can edit these galleries.</p><Button variant="outline" className="mt-5" onClick={() => void supabase.auth.signOut()}>Sign out</Button></div> : <form className="mt-10 max-w-sm space-y-5" onSubmit={event => { event.preventDefault(); void authenticate(false); }}>
        <label className="block text-sm">Email<Input autoComplete="email" type="email" required value={email} onChange={event => setEmail(event.target.value)} className="mt-2" /></label>
        <label className="block text-sm">Password<Input autoComplete="current-password" type="password" required minLength={8} value={password} onChange={event => setPassword(event.target.value)} className="mt-2" /></label>
        <div className="flex flex-wrap gap-3"><Button disabled={busy} type="submit">Sign in</Button><Button disabled={busy} variant="outline" type="button" onClick={() => void authenticate(true)}>Create owner account</Button></div>
        <Button type="button" variant="outline" className="w-full" onClick={async () => { const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/owner` }); if (result.error) setMessage(result.error.message); }}>Continue with Google</Button>
        <Button type="button" variant="link" onClick={async () => { const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` }); setMessage(error ? error.message : "Check your email for a password reset link."); }}>Forgot password?</Button>
        {message && <p role="status" className="text-sm text-muted-foreground">{message}</p>}
      </form>}
    </div>
  </main>;
}

function EditorForms() {
  const { data } = useSuspenseQuery(portfolioQuery);
  return <div className="mt-6">{categories.map(category => <CategoryForm key={category.slug} title={category.title} initial={data.find(row => row.slug === category.slug) ?? { slug: category.slug, featured_url: "", gallery_urls: [] }} />)}</div>;
}

function CategoryForm({ title, initial }: { title: string; initial: Portfolio }) {
  const [values, setValues] = useState(initial);
  const [validation, setValidation] = useState("");
  const client = useQueryClient();
  const save = useServerFn(savePortfolio);
  const mutation = useMutation({ mutationFn: (data: Portfolio) => save({ data }), onSuccess: () => client.invalidateQueries({ queryKey: ["portfolio"] }) });
  return <form className="border-b border-border py-10" onSubmit={event => { event.preventDefault(); const parsed = portfolioSchema.safeParse(values); setValidation(parsed.success ? "" : parsed.error.issues[0]?.message ?? "Check your links."); if (parsed.success) mutation.mutate(parsed.data); }}>
    <h2 className="mb-6 font-display text-3xl">{title}</h2>
    <label className="block text-sm">Featured video URL<Input type="url" value={values.featured_url} onChange={event => setValues({ ...values, featured_url: event.target.value })} placeholder="https://www.youtube.com/watch?v=…" className="mt-2" /></label>
    <div className="mt-6 space-y-3">{values.gallery_urls.map((url, i) => <div key={i} className="flex items-center gap-3"><label className="flex-1 text-sm">Gallery video {i + 1}<Input type="url" value={url} onChange={event => setValues({ ...values, gallery_urls: values.gallery_urls.map((value, j) => i === j ? event.target.value : value) })} className="mt-2" /></label><Button type="button" variant="ghost" size="icon" aria-label={`Remove gallery video ${i + 1}`} onClick={() => setValues({ ...values, gallery_urls: values.gallery_urls.filter((_, j) => j !== i) })}><Trash2 /></Button></div>)}</div>
    <div className="mt-6 flex flex-wrap gap-3"><Button type="button" variant="outline" disabled={values.gallery_urls.length >= 30} onClick={() => setValues({ ...values, gallery_urls: [...values.gallery_urls, ""] })}><Plus /> Add video</Button><Button type="submit" disabled={mutation.isPending}><Save />{mutation.isPending ? "Saving…" : "Save gallery"}</Button></div>
    {(validation || mutation.error || mutation.isSuccess) && <p role="status" className="mt-4 text-sm text-muted-foreground">{validation || mutation.error?.message || "Gallery saved."}</p>}
  </form>;
}