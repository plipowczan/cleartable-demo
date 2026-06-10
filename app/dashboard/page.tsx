import { redirect } from "next/navigation";
import { Table2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "./sign-out-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Druga linia obrony obok middleware.
  if (!user) {
    redirect("/login");
  }

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
        <h1 className="text-2xl font-bold text-primary">Panel foundera</h1>
        <p className="mt-2 text-sm text-muted">
          Tu powstanie Twój cap table. Zaczniemy od dodania wspólników i
          udziałów.
        </p>

        {/* Stan pusty — zgodnie z regułami projektu. */}
        <div className="mt-8 rounded-lg border border-border bg-surface p-10 text-center shadow-sm">
          <p className="text-base font-medium text-text">
            Nie masz jeszcze żadnej struktury udziałowej.
          </p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
            Dodaj pierwszego wspólnika, żeby zacząć budować jedyne źródło prawdy
            o swojej sp. z o.o.
          </p>
          <button
            disabled
            className="mt-6 cursor-not-allowed rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-surface opacity-60 shadow-sm"
            title="Wkrótce"
          >
            Dodaj wspólnika
          </button>
        </div>
      </main>
    </div>
  );
}
