"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { UserPlus } from "lucide-react";
import {
  addShareholder,
  type ActionResult,
} from "../actions";
import { SHAREHOLDER_TYPE_OPTIONS, formatPercent } from "@/lib/cap-table";

export function AddShareholderForm({
  capTableId,
  totalShares,
}: {
  capTableId: string;
  totalShares: number;
}) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    addShareholder,
    {}
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [sharesInput, setSharesInput] = useState("");

  // Po udanym dodaniu (brak błędu, nie pending) — wyczyść formularz.
  useEffect(() => {
    if (!pending && !state.error) {
      formRef.current?.reset();
      setSharesInput("");
    }
  }, [state, pending]);

  // Live preview %: ile dany wpis będzie miał po dodaniu do obecnej sumy.
  const parsed = Number(sharesInput.replace(/\s/g, ""));
  const previewValid = Number.isFinite(parsed) && parsed > 0;
  const previewPct = previewValid
    ? (parsed / (totalShares + parsed)) * 100
    : null;

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-6 rounded-lg border border-border bg-surface p-5 shadow-sm"
    >
      <h2 className="text-sm font-semibold text-text">Dodaj wspólnika</h2>
      <input type="hidden" name="cap_table_id" value={capTableId} />

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-12">
        <div className="sm:col-span-5">
          <label
            htmlFor="name"
            className="mb-1 block text-xs font-medium text-muted"
          >
            Imię i nazwisko / nazwa
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="np. Anna Kowalska"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
          />
        </div>
        <div className="sm:col-span-4">
          <label
            htmlFor="type"
            className="mb-1 block text-xs font-medium text-muted"
          >
            Typ
          </label>
          <select
            id="type"
            name="type"
            defaultValue="founder"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
          >
            {SHAREHOLDER_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="shares"
            className="mb-1 block text-xs font-medium text-muted"
          >
            Liczba udziałów
          </label>
          <input
            id="shares"
            name="shares"
            inputMode="numeric"
            required
            value={sharesInput}
            onChange={(e) => setSharesInput(e.target.value)}
            placeholder="np. 5000"
            className="num w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-h-5 text-sm">
          {state.error ? (
            <span className="font-medium text-error">{state.error}</span>
          ) : previewPct !== null ? (
            <span className="text-muted">
              Po dodaniu:{" "}
              <span className="num font-medium text-secondary">
                {formatPercent(previewPct)}
              </span>
            </span>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-surface shadow-sm transition-colors hover:bg-secondary disabled:opacity-60"
        >
          <UserPlus className="h-4 w-4" strokeWidth={2.25} />
          {pending ? "Dodaję…" : "Dodaj wspólnika"}
        </button>
      </div>
    </form>
  );
}
