<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Portfolio categories and video URL validation live in a shared browser-safe module so the public gallery and owner editor stay consistent.
- Public portfolio reads use a publishable-key server function with Query loaders; writes use authenticated server functions and owner-role RLS to prevent visitor edits.
- Owner roles live in a protected role table and are assigned only after the designated account email is verified, preventing self-assigned privileges.
- Authentication identity events are subscribed to once in the root; owner views receive scoped events rather than competing auth subscriptions.
