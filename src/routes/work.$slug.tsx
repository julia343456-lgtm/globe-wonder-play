import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import CTA from "@/components/CTA";
import { PROJECTS } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  component: CaseStudy,
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Neom Teckverse` },
          { name: "description", content: loaderData.project.blurb },
          { property: "og:title", content: `${loaderData.project.title} — Neom Teckverse` },
          { property: "og:description", content: loaderData.project.blurb },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-6xl text-aurora mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Case study not found.</p>
        <Link to="/work" className="text-primary font-mono">← Back to work</Link>
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

function CaseStudy() {
  const { project } = Route.useLoaderData() as { project: import("@/data/projects").Project };
  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      <section className="relative pt-40 pb-16 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto">
          <Link to="/work" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← All work
          </Link>
          <div className="mt-6 flex items-center gap-3 mb-5">
            <span className="font-mono text-xs text-muted-foreground">{project.n}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-primary/40 text-primary">
              {project.cat}
            </span>
          </div>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            {project.title}
          </h1>
          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">{project.blurb}</p>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {project.metrics.map((m) => (
            <div key={m.v} className="bg-background p-8 text-center">
              <div className="font-display text-5xl text-aurora mb-1">{m.k}</div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ overview ]</div>
            <p className="font-display text-2xl md:text-3xl leading-tight">{project.summary}</p>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ services delivered ]</div>
            <div className="flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span key={s} className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border border-border text-foreground/85">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ approach ]</div>
              <ul className="space-y-3">
                {["Discovery sprint", "Channel & creative audit", "Roadmap & 90-day plan", "Embedded pod kickoff", "Weekly optimization rhythm"].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-foreground/85">
                    <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ outcome ]</div>
              <p className="text-foreground/85 leading-relaxed">
                In two quarters we shifted the unit economics, established a creative engine that compounds, and
                set the team up to scale spend confidently into the next fiscal year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="px-6 md:px-10 pb-20">
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group block max-w-5xl mx-auto p-10 rounded-3xl border border-border bg-card-gradient hover:border-primary/40 transition-colors"
        >
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Next case study →</div>
          <div className="flex items-center justify-between">
            <h3 className="font-display text-4xl md:text-5xl group-hover:text-aurora transition-colors">{next.title}</h3>
            <span className="text-primary text-2xl group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </Link>
      </section>

      <CTA />
    </>
  );
}
