import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-4 pt-32 pb-20">
      <div className="mx-auto max-w-xl">
        <p className="text-sm text-accent-2">404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
          Tej strony tu nie ma
        </h1>
        <p className="mt-4 text-muted">
          Adres jest zły albo strona została przeniesiona. Wróć na start albo zadzwoń, jeśli szukasz naprawy.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-semibold text-bg"
        >
          Strona główna
        </Link>
      </div>
    </main>
  );
}
