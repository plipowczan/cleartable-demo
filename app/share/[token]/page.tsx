import { Table2, Lock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  computeCapTable,
  formatShares,
  formatPercent,
  SHAREHOLDER_TYPE_LABELS,
} from "@/lib/cap-table";
import type { Shareholder } from "@/lib/supabase/types";

const dateFmt = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-primary">
            <Table2 className="h-6 w-6" strokeWidth={2.25} />
            <span className="font-heading text-lg font-bold">ClearTable PL</span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-background px-2.5 py-1 text-xs font-medium text-muted">
            <Lock className="h-3 w-3" strokeWidth={2.5} />
            Widok read-only
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
    </div>
  );
}

// Strona „niedostępny" — nieprawidłowy/odwołany token. Nie 500.
function Unavailable() {
  return (
    <PublicShell>
      <div className="rounded-lg border border-border bg-surface p-10 text-center shadow-sm">
        <AlertCircle className="mx-auto h-8 w-8 text-muted" strokeWidth={1.75} />
        <h1 className="mt-3 font-heading text-xl font-bold text-primary">
          Cap table niedostępny
        </h1>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
          Ten link jest nieprawidłowy lub został odwołany przez właściciela.
          Poproś o aktualny link do struktury udziałowej.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-secondary hover:underline"
        >
          Strona główna ClearTable PL
        </Link>
      </div>
    </PublicShell>
  );
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createClient();

  // RLS: anon widzi tylko wiersze is_shared=true. Filtr po tokenie tutaj.
  const { data: capTable } = await supabase
    .from("cap_tables")
    .select("id, company_name, is_shared, updated_at")
    .eq("share_token", token)
    .eq("is_shared", true)
    .maybeSingle();

  if (!capTable) return <Unavailable />;

  const { data: shareholders } = await supabase
    .from("shareholders")
    .select("*")
    .eq("cap_table_id", capTable.id)
    .order("created_at", { ascending: true });

  const { rows, totalShares, count } = computeCapTable(
    (shareholders ?? []) as Shareholder[]
  );
  const zeroSum = count > 0 && totalShares === 0;
  const empty = count === 0 || zeroSum;

  return (
    <PublicShell>
      <h1 className="font-heading text-2xl font-bold text-primary">
        {capTable.company_name}
      </h1>
      <p className="mt-1 text-sm text-muted">
        Struktura udziałowa · aktualna na{" "}
        {dateFmt.format(new Date(capTable.updated_at))}
      </p>

      {empty ? (
        <div className="mt-6 rounded-lg border border-dashed border-border bg-surface p-10 text-center shadow-sm">
          <p className="text-base font-medium text-text">
            Struktura udziałowa jest jeszcze pusta.
          </p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
            Właściciel nie wprowadził jeszcze wspólników z liczbą udziałów.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background/60 text-xs uppercase tracking-wide text-muted">
                <th className="px-2.5 py-3 sm:px-4 text-left font-semibold">Wspólnik</th>
                <th className="px-2.5 py-3 sm:px-4 text-left font-semibold">Typ</th>
                <th className="px-2.5 py-3 sm:px-4 text-right font-semibold">Udziały</th>
                <th className="px-2.5 py-3 sm:px-4 text-right font-semibold">%</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-2.5 py-3 sm:px-4 font-medium text-text">{r.name}</td>
                  <td className="px-2.5 py-3 sm:px-4 text-muted">
                    {SHAREHOLDER_TYPE_LABELS[r.type]}
                  </td>
                  <td className="num px-2.5 py-3 sm:px-4 text-text">
                    {formatShares(Number(r.shares))}
                  </td>
                  <td className="num px-2.5 py-3 sm:px-4 text-text">
                    {formatPercent(r.percent)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border bg-background/60 font-semibold text-text">
                <td className="px-2.5 py-3 sm:px-4" colSpan={2}>
                  Razem
                </td>
                <td className="num px-2.5 py-3 sm:px-4">{formatShares(totalShares)}</td>
                <td className="num px-2.5 py-3 sm:px-4">{formatPercent(100)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted">
        Widok tylko do odczytu · wygenerowano w ClearTable PL
      </p>
    </PublicShell>
  );
}
