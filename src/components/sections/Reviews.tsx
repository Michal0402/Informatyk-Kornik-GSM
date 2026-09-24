import { reviews } from "@/data/reviews";

export function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <section id="opinie" className="scroll-mt-24 border-t border-white/8" aria-label="Opinie Google">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Opinie Google</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-2xl border border-white/8 bg-card p-5">
              <p className="text-sm text-accent-2">
                {review.source} · {review.rating}/5
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text">{review.text}</p>
              <p className="mt-4 text-xs text-muted">
                {review.author} · {review.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
