import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { portfolioSchema } from "./portfolio";

export const getPortfolio = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  const url = process.env['SUPABASE_URL'];
  if (!key || !url) throw new Error("Gallery unavailable. Please try again.");
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from("portfolio_categories").select("slug,featured_url,gallery_urls");
  if (error) throw new Error("Gallery unavailable. Please try again.");
  return (data ?? []).map(row => portfolioSchema.parse(row));
});

export const portfolioQuery = queryOptions({ queryKey: ["portfolio"], queryFn: () => getPortfolio() });

export const savePortfolio = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => portfolioSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: allowed, error: roleError } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "owner" });
    if (roleError || !allowed) throw new Error("Only the owner can edit galleries.");
    const { error } = await context.supabase.from("portfolio_categories").upsert({ ...data, updated_at: new Date().toISOString() });
    if (error) throw new Error("Your changes could not be saved. Please try again.");
    return { saved: true };
  });