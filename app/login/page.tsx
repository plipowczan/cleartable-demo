"use client";

import { useState } from "react";
import Link from "next/link";
import { Table2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError("Nie udało się wysłać linku. Sprawdź adres i spróbuj ponownie.");
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="mb-8 flex items-center gap-2 text-primary">
        <Table2 className="h-6 w-6" strokeWidth={2.25} />
        <span className="font-heading text-lg font-bold">ClearTable PL</span>
      </div>

      <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-primary">Zaloguj się</h1>
        <p className="mt-1 text-sm text-muted">
          Wyślemy Ci magic link na e-mail — bez hasła.
        </p>

        {status === "sent" ? (
          <p className="mt-6 rounded-lg border border-border bg-background p-4 text-sm text-success">
            Sprawdź skrzynkę. Wysłaliśmy link logowania na <b>{email}</b>.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-text"
              >
                Adres e-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ty@twojafirma.pl"
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-error">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-surface shadow-sm transition-colors hover:bg-secondary disabled:opacity-60"
            >
              {status === "sending" ? "Wysyłam…" : "Wyślij magic link"}
            </button>
          </form>
        )}
      </div>

      <Link
        href="/"
        className="mt-6 text-center text-sm text-muted hover:text-secondary"
      >
        ← Wróć na stronę główną
      </Link>
    </main>
  );
}
