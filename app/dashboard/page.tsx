import { redirect } from "next/navigation";
import Link from "next/link";
import { Table2, Plus, Users, ChevronRight, Link2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatShares } from "@/lib/cap-table";
import { SignOutButton } from "./sign-out-button";
import { createCapTable } from "./actions";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Druga linia obrony obok middleware.
  if (!user) {
    redirect("/login");
  }

  const { data: capTables } = await supabase
    .from("cap_tables")
    .select("id, company_name, is_shared, updated_at, shareholders(shares)")
    .order("updated_at", { ascending: false });

  const tables = (capTables ?? []) as Array<{
    id: string;
    company_name: string;
    is_shared: boolean;
    updated_at: string;
    shareholders: { shares: number }[];
  }>;

  const errorMessage =
    error === "nazwa"
      ? "Podaj nazwę spółki."
      : error === "zapis"
        ? "Nie udało się utworzyć cap table. Spróbuj ponownie."
        : null;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-primary">
            <Table2 className="h-6 w-6" strokeWidth={2.25} />
            <span className="font-heading text-lg font-bold">ClearTable PL</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted sm:inline">
              {user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-primary">Twoje cap tables</h1>
          <p className="text-sm text-muted">
            Jedno źródło prawdy o strukturze udziałowej Twojej sp. z o.o.
          </p>
        </div>

        {errorMessage && (
          <p className="mt-6 rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-sm font-medium text-error">
            {errorMessage}
          </p>
        )}

        {/* Formularz nowego cap table */}
        <form
          action={createCapTable}
          className="mt-6 rounded-lg border border-border bg-surface p-5 shadow-sm"
        >
          <label
            htmlFor="company_name"
            className="block text-sm font-semibold text-text"
          >
            Nowy cap table
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="company_name"
              name="company_name"
              required
              placeholder="Nazwa spółki, np. Acme sp. z o.o."
              className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-surface shadow-sm transition-colors hover:bg-secondary"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              Utwórz
            </button>
          </div>
        </form>

        {/* Lista lub stan pusty */}
        {tables.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-border bg-surface p-10 text-center shadow-sm">
            <Users className="mx-auto h-8 w-8 text-muted" strokeWidth={1.75} />
            <p className="mt-3 text-base font-medium text-text">
              Nie masz jeszcze żadnej struktury udziałowej.
            </p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
              Wpisz nazwę spółki powyżej i kliknij „Utwórz", żeby zacząć dodawać
              wspólników.
            </p>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {tables.map((t) => {
              const count = t.shareholders?.length ?? 0;
              const total =
                t.shareholders?.reduce((s, h) => s + Number(h.shares), 0) ?? 0;
              return (
                <li key={t.id}>
                  <Link
                    href={`/dashboard/${t.id}`}
                    className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-5 py-4 shadow-sm transition-colors hover:border-secondary"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-heading text-base font-semibold text-primary">
                          {t.company_name}
                        </span>
                        {t.is_shared && (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                            <Link2 className="h-3 w-3" strokeWidth={2.5} />
                            Udostępniony
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-muted">
                        {count === 0
                          ? "Brak wspólników"
                          : `${count} ${count === 1 ? "wspólnik" : "wspólników"} · `}
                        {count > 0 && (
                          <span className="num">{formatShares(total)}</span>
                        )}
                        {count > 0 && " udziałów"}
                      </p>
                    </div>
                    <ChevronRight
                      className="h-5 w-5 shrink-0 text-muted"
                      strokeWidth={2}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
