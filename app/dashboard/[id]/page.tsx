import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Table2, ArrowLeft, Trash2, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  computeCapTable,
  formatShares,
  formatPercent,
  SHAREHOLDER_TYPE_LABELS,
} from "@/lib/cap-table";
import type { Shareholder } from "@/lib/supabase/types";
import { SignOutButton } from "../sign-out-button";
import { deleteShareholder } from "../actions";
import { AddShareholderForm } from "./add-shareholder-form";
import { ShareControls } from "./share-controls";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: capTable } = await supabase
    .from("cap_tables")
    .select("id, company_name, share_token, is_shared, updated_at")
    .eq("id", id)
    .single();

  if (!capTable) notFound();

  const { data: shareholders } = await supabase
    .from("shareholders")
    .select("*")
    .eq("cap_table_id", id)
    .order("created_at", { ascending: true });

  const { rows, totalShares, count } = computeCapTable(
    (shareholders ?? []) as Shareholder[]
  );
  const zeroSum = count > 0 && totalShares === 0;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary">
            <Table2 className="h-6 w-6" strokeWidth={2.25} />
            <span className="font-heading text-lg font-bold">ClearTable PL</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted sm:inline">
              {user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-secondary"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Wszystkie cap tables
        </Link>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-primary">
              {capTable.company_name}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {count === 0
                ? "Dodaj wspólników, aby zbudować strukturę udziałową."
                : `${count} ${count === 1 ? "wspólnik" : "wspólników"} · razem `}
              {count > 0 && (
                <>
                  <span className="num">{formatShares(totalShares)}</span>{" "}
                  udziałów
                </>
              )}
            </p>
          </div>
          <ShareControls
            capTableId={capTable.id}
            token={capTable.share_token}
            isShared={capTable.is_shared}
            canShare={count > 0 && !zeroSum}
          />
        </div>

        {zeroSum && (
          <p className="mt-5 flex items-center gap-2 rounded-lg border border-error/30 bg-error/5 px-2.5 py-3 sm:px-4 text-sm font-medium text-error">
            <AlertTriangle className="h-4 w-4 shrink-0" strokeWidth={2.25} />
            Suma udziałów wynosi 0 — uzupełnij liczby udziałów, żeby policzyć %.
          </p>
        )}

        {/* Tabela wspólników */}
        <div className="mt-5 overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background/60 text-xs uppercase tracking-wide text-muted">
                <th className="px-2.5 py-3 sm:px-4 text-left font-semibold">Wspólnik</th>
                <th className="px-2.5 py-3 sm:px-4 text-left font-semibold">Typ</th>
                <th className="px-2.5 py-3 sm:px-4 text-right font-semibold">Udziały</th>
                <th className="px-2.5 py-3 sm:px-4 text-right font-semibold">%</th>
                <th className="w-12 px-2.5 py-3 sm:px-4"></th>
              </tr>
            </thead>
            <tbody>
              {count === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-sm text-muted"
                  >
                    Brak wspólników. Dodaj pierwszego w formularzu poniżej.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-2.5 py-3 sm:px-4 font-medium text-text">{r.name}</td>
                    <td className="px-2.5 py-3 sm:px-4 text-muted">
                      {SHAREHOLDER_TYPE_LABELS[r.type]}
                    </td>
                    <td className="num px-2.5 py-3 sm:px-4 text-text">
                      {formatShares(Number(r.shares))}
                    </td>
                    <td className="num px-2.5 py-3 sm:px-4 text-text">
                      {zeroSum ? "—" : formatPercent(r.percent)}
                    </td>
                    <td className="px-2.5 py-3 sm:px-4 text-right">
                      <form action={deleteShareholder}>
                        <input type="hidden" name="id" value={r.id} />
                        <input
                          type="hidden"
                          name="cap_table_id"
                          value={capTable.id}
                        />
                        <button
                          type="submit"
                          aria-label={`Usuń wspólnika ${r.name}`}
                          className="rounded-md p-1.5 text-muted transition-colors hover:bg-error/10 hover:text-error"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={2} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {count > 0 && (
              <tfoot>
                <tr className="border-t-2 border-border bg-background/60 font-semibold text-text">
                  <td className="px-2.5 py-3 sm:px-4" colSpan={2}>
                    Razem
                  </td>
                  <td className="num px-2.5 py-3 sm:px-4">{formatShares(totalShares)}</td>
                  <td className="num px-2.5 py-3 sm:px-4">
                    {zeroSum ? "—" : formatPercent(100)}
                  </td>
                  <td className="px-2.5 py-3 sm:px-4"></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* Formularz dodawania wspólnika (live % preview) */}
        <AddShareholderForm capTableId={capTable.id} totalShares={totalShares} />
      </main>
    </div>
  );
}
