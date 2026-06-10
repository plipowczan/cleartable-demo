"use client";

import { useEffect, useState, useTransition } from "react";
import { Link2, Copy, Check, ExternalLink, X, Ban } from "lucide-react";
import { shareCapTable, unshareCapTable } from "../actions";

export function ShareControls({
  capTableId,
  token,
  isShared,
  canShare,
}: {
  capTableId: string;
  token: string;
  isShared: boolean;
  canShare: boolean;
}) {
  const [shared, setShared] = useState(isShared);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/share/${token}`);
  }, [token]);

  useEffect(() => setShared(isShared), [isShared]);

  function handleShare() {
    setError("");
    startTransition(async () => {
      if (!shared) {
        const res = await shareCapTable(capTableId);
        if (res.error) {
          setError(res.error);
          return;
        }
        setShared(true);
      }
      setOpen(true);
    });
  }

  function handleRevoke() {
    setError("");
    startTransition(async () => {
      const res = await unshareCapTable(capTableId);
      if (res.error) {
        setError(res.error);
        return;
      }
      setShared(false);
      setOpen(false);
    });
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Nie udało się skopiować. Skopiuj ręcznie.");
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {shared && (
          <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">
            <Link2 className="h-3 w-3" strokeWidth={2.5} />
            Udostępniony
          </span>
        )}
        <button
          type="button"
          onClick={handleShare}
          disabled={!canShare || pending}
          title={
            canShare
              ? undefined
              : "Dodaj wspólnika z liczbą udziałów > 0, aby udostępnić."
          }
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-surface shadow-sm transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Link2 className="h-4 w-4" strokeWidth={2.25} />
          {shared ? "Pokaż link" : "Udostępnij"}
        </button>
      </div>

      {error && !open && (
        <p className="mt-2 text-sm font-medium text-error">{error}</p>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2
                  id="share-title"
                  className="font-heading text-lg font-bold text-primary"
                >
                  Read-only link
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Inwestor zobaczy aktualną strukturę bez logowania. Link nie
                  wygasa — możesz go odwołać w każdej chwili.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Zamknij"
                className="rounded-md p-1 text-muted transition-colors hover:bg-background hover:text-text"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
              <span className="num flex-1 truncate text-left text-sm text-text">
                {url}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold text-surface transition-colors hover:bg-primary"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Skopiowano
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Kopiuj
                  </>
                )}
              </button>
            </div>

            {error && (
              <p className="mt-2 text-sm font-medium text-error">{error}</p>
            )}

            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRevoke}
                disabled={pending}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-error transition-colors hover:underline disabled:opacity-50"
              >
                <Ban className="h-4 w-4" strokeWidth={2} />
                Odwołaj dostęp
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-secondary transition-colors hover:border-secondary"
              >
                <ExternalLink className="h-4 w-4" strokeWidth={2} />
                Otwórz link
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
