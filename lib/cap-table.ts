// Pomocniki domeny cap table — formatowanie liczb i % (PRD §3, §4).
// % liczone w runtime: shares / SUM(shares). Bez klas udziałów (flat).
import type { Shareholder, ShareholderType } from "@/lib/supabase/types";

// Etykiety typów wspólnika — polskie, zgodne z brand (zakaz EN etykiet).
export const SHAREHOLDER_TYPE_LABELS: Record<ShareholderType, string> = {
  founder: "Założyciel",
  angel: "Anioł biznesu",
  vc: "Fundusz VC",
  esop: "ESOP / pula opcji",
  other: "Inny",
};

export const SHAREHOLDER_TYPE_OPTIONS = (
  Object.keys(SHAREHOLDER_TYPE_LABELS) as ShareholderType[]
).map((value) => ({ value, label: SHAREHOLDER_TYPE_LABELS[value] }));

// Liczba udziałów — pl-PL grupowanie (spacja tysięczna).
const intFmt = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 });
export function formatShares(n: number): string {
  return intFmt.format(n);
}

// Procent — 2 miejsca, pl-PL (przecinek dziesiętny).
const pctFmt = new Intl.NumberFormat("pl-PL", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export function formatPercent(p: number): string {
  return `${pctFmt.format(p)}%`;
}

export interface CapRow extends Shareholder {
  percent: number; // 0–100, zaokrąglone metodą największych reszt do sumy 100
}

export interface CapSummary {
  rows: CapRow[];
  totalShares: number;
  count: number;
}

// Liczy % per wspólnik. Metoda największych reszt → suma wyświetlanych % = 100,00
// (unika artefaktu 99,99%). Pusta lista / suma 0 → percent 0 (obsłuży stan pusty UI).
export function computeCapTable(shareholders: Shareholder[]): CapSummary {
  const totalShares = shareholders.reduce((s, h) => s + Number(h.shares), 0);
  const count = shareholders.length;

  if (totalShares <= 0) {
    return {
      rows: shareholders.map((h) => ({ ...h, percent: 0 })),
      totalShares,
      count,
    };
  }

  // Surowe % i podział na część całkowitą (w setnych) + resztę.
  const scaled = shareholders.map((h) => {
    const exact = (Number(h.shares) / totalShares) * 10000; // setne procenta
    const floor = Math.floor(exact);
    return { h, floor, remainder: exact - floor };
  });

  let distributed = scaled.reduce((s, x) => s + x.floor, 0);
  let leftover = 10000 - distributed; // setne do rozdania

  // Rozdaj resztę wierszom o największej reszcie.
  const order = [...scaled].sort((a, b) => b.remainder - a.remainder);
  for (const item of order) {
    if (leftover <= 0) break;
    item.floor += 1;
    leftover -= 1;
  }

  const rows = scaled.map((x) => ({ ...x.h, percent: x.floor / 100 }));
  return { rows, totalShares, count };
}
