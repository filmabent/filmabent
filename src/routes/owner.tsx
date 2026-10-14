import { createFileRoute } from "@tanstack/react-router";
import { OwnerEditor } from "@/components/owner-editor";
import { portfolioQuery } from "@/lib/portfolio.functions";

export const Route = createFileRoute("/owner")({
  loader: ({ context }) => context.queryClient.ensureQueryData(portfolioQuery),
  component: OwnerEditor,
  errorComponent: () => <div className="p-10">Owner studio is unavailable. Please refresh and try again.</div>,
  notFoundComponent: () => <div>Owner studio not found.</div>,
  head: () => ({ meta: [
    { title: "Owner Studio — filmabent" },
    { name: "description", content: "Private filmabent portfolio editing studio." },
    { property: "og:title", content: "Owner Studio — filmabent" },
    { property: "og:description", content: "Private filmabent portfolio editing studio." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex,nofollow" },
  ] }),
});