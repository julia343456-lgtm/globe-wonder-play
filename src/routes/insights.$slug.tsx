import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import CTA from "@/components/CTA";
import { INSIGHTS } from "@/data/insights";

export const Route = createFileRoute("/insights/$slug")({
  component: InsightDetail,
  loader: ({ params }) => {
    const post = INSIGHTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Neom Teckverse` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: `${loaderData.post.title} — Neom Teckverse` },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-6xl text-aurora mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Insight not found.</p>
        <Link to="/insights" className="text-primary font-mono">← Back to insights</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-3xl mb-3">Something went off-orbit</h1>
        <p className="text-muted-foreground mb-6 text-sm">{error.message}</p>
        <button onClick={reset} className="px-5 py-2.5 rounded-full bg-aurora text-background font-medium">
          Try again
        </button>
      </div>
    </div>
  ),
});

function InsightDetail() {
  const { post } = Route.useLoaderData() as { post: import("@/data/insights").Insight };
  const idx = INSIGHTS.findIndex((p) => p.slug === post.slug);
  const next = INSIGHTS[(idx + 1) % INSIGHTS.length];

  return (
    <>
      <article className="relative pt-40 pb-16 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto">
          <Link to="/insights" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← All insights
          </Link>
          <div className="mt-6 flex items-center gap-3 mb-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-primary/40 text-primary">
              {post.tag}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{post.date} · {post.time} read</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.98] tracking-tight">{post.title}</h1>
          <p className="mt-7 text-lg md:text-xl text-muted-foreground leading-relaxed">{post.excerpt}</p>
          <div className="mt-8 font-mono text-xs text-muted-foreground">By {post.author}</div>
        </div>
      </article>

      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/85 leading-relaxed text-lg">
          {post.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="pt-8 mt-8 border-t border-border font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            [ end transmission ]
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-20">
        <Link
          to="/insights/$slug"
          params={{ slug: next.slug }}
          className="group block max-w-3xl mx-auto p-10 rounded-3xl border border-border bg-card-gradient hover:border-primary/40 transition-colors"
        >
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Next read →</div>
          <div className="flex items-center justify-between gap-6">
            <h3 className="font-display text-2xl md:text-3xl group-hover:text-aurora transition-colors">{next.title}</h3>
            <span className="text-primary text-2xl group-hover:translate-x-1 transition-transform shrink-0">→</span>
          </div>
        </Link>
      </section>

      <CTA />
    </>
  );
}
