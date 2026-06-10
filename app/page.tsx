import Link from "next/link";
import { Table2 } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex items-center gap-2 text-primary">
        <Table2 className="h-7 w-7" strokeWidth={2.25} />
        <span className="font-heading text-xl font-bold">ClearTable PL</span>
      </div>
      <h1 className="text-balance text-4xl font-bold text-primary sm:text-5xl">
        Jedno źródło prawdy o strukturze udziałowej
      </h1>
      <p className="mt-4 max-w-md text-balance text-base text-muted">
        Wprowadź wspólników i udziały swojej sp. z o.o., a potem udostępnij
        inwestorowi bezpieczny read-only link — bez zakładania konta po jego
        stronie.
      </p>
      <Link
        href="/login"
        className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-surface shadow-sm transition-colors hover:bg-secondary"
      >
        Zaloguj się
      </Link>
    </main>
  );
}
