"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ShareholderType } from "@/lib/supabase/types";

const VALID_TYPES: ShareholderType[] = [
  "founder",
  "angel",
  "vc",
  "esop",
  "other",
];

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export type ActionResult = { error?: string };

// Tworzy cap table i przenosi do edytora (Ekran B).
export async function createCapTable(formData: FormData) {
  const companyName = String(formData.get("company_name") ?? "").trim();
  if (!companyName) {
    redirect("/dashboard?error=nazwa");
  }

  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from("cap_tables")
    .insert({ company_name: companyName, owner_id: user.id })
    .select("id")
    .single();

  if (error || !data) {
    redirect("/dashboard?error=zapis");
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard/${data.id}`);
}

// Dodaje wspólnika do cap table (Ekran B).
export async function addShareholder(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const capTableId = String(formData.get("cap_table_id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const typeRaw = String(formData.get("type") ?? "other") as ShareholderType;
  const sharesRaw = String(formData.get("shares") ?? "").trim();

  if (!capTableId) return { error: "Brak cap table." };
  if (!name) return { error: "Podaj imię i nazwisko lub nazwę wspólnika." };

  const shares = Number(sharesRaw.replace(/\s/g, ""));
  if (!Number.isFinite(shares) || shares < 0 || !Number.isInteger(shares)) {
    return { error: "Liczba udziałów musi być liczbą całkowitą ≥ 0." };
  }

  const type = VALID_TYPES.includes(typeRaw) ? typeRaw : "other";

  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("shareholders")
    .insert({ cap_table_id: capTableId, name, type, shares });

  if (error) return { error: "Nie udało się dodać wspólnika." };

  // Bump updated_at cap table (data aktualizacji na Ekranie D).
  await supabase
    .from("cap_tables")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", capTableId);

  revalidatePath(`/dashboard/${capTableId}`);
  return {};
}

// Usuwa wspólnika (Ekran B).
export async function deleteShareholder(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const capTableId = String(formData.get("cap_table_id") ?? "");
  if (!id || !capTableId) return;

  const { supabase } = await requireUser();
  await supabase.from("shareholders").delete().eq("id", id);
  await supabase.from("cap_tables").update({ updated_at: new Date().toISOString() }).eq("id", capTableId);
  revalidatePath(`/dashboard/${capTableId}`);
}

// Aktywuje read-only link (Ekran C). Token istnieje od utworzenia.
export async function shareCapTable(capTableId: string): Promise<ActionResult> {
  if (!capTableId) return { error: "Brak cap table." };
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("cap_tables")
    .update({ is_shared: true })
    .eq("id", capTableId);
  if (error) return { error: "Nie udało się udostępnić." };
  revalidatePath(`/dashboard/${capTableId}`);
  return {};
}

// Odwołuje link (Open Question §7: token niewygasający + „odwołaj").
export async function unshareCapTable(
  capTableId: string
): Promise<ActionResult> {
  if (!capTableId) return { error: "Brak cap table." };
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("cap_tables")
    .update({ is_shared: false })
    .eq("id", capTableId);
  if (error) return { error: "Nie udało się odwołać linku." };
  revalidatePath(`/dashboard/${capTableId}`);
  return {};
}
