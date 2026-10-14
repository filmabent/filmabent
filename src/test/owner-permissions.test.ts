import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sql = readFileSync("drizzle/migrations/0000_portfolio_owner_editing.sql", "utf8");

describe("exclusive portfolio owner permissions", () => {
  it("requires the designated verified email before assigning the owner role", () => {
    expect(sql).toContain("lower(NEW.email) = 'filmabent@gmail.com' AND NEW.email_confirmed_at IS NOT NULL");
  });
  it("does not permit visitors to change portfolio rows", () => {
    expect(sql).toContain("GRANT SELECT ON public.portfolio_categories TO anon");
    expect(sql).not.toMatch(/GRANT\s+(?:ALL|INSERT|UPDATE|DELETE)[^;]*portfolio_categories[^;]*TO anon/i);
    expect(sql).toContain("WITH CHECK (public.has_role(auth.uid(),'owner'))");
    expect(sql).toContain("FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'owner'))");
  });
  it("does not let users assign their own role", () => {
    expect(sql).toContain("GRANT SELECT ON public.user_roles TO authenticated");
    expect(sql).not.toMatch(/GRANT\s+(?:ALL|INSERT|UPDATE|DELETE)[^;]*user_roles[^;]*TO authenticated/i);
  });
});