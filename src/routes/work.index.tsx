import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import { PROJECTS } from "@/data/projects";

export const Route = createFileRoute("/work/")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Work — Neom Teckverse" },
      { name: "description", content: "Selected case studies — DTC, SaaS, healthcare, climate, beauty. Real numbers, real outcomes." },
      { property: "og:title", content: "Work — Neom Teckverse" },
      { property: "og:description", content: "Selected case studies. Real numbers, real outcomes." },
    ],
  }),
});

function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="[ work ]"
        title="Selected"
        highlight="case studies."
        body="A small slice of what we've shipped. Every number is real and verifiable on request."
      />

      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group block relative p-8 md:p-10 rounded-3xl border border-border bg-card-gradient overflow-hidden hover:border-primary/40 transition-colors h-full"
              >
                <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-primary/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative flex items-start justify-between mb-6">
                  <span className="font-mono text-xs text-muted-foreground">{p.n} / {String(PROJECTS.length).padStart(2, "0")}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-primary/40 text-primary">
                    {p.cat}
                  </span>
                </div>
                <h2 className="relative font-display text-4xl md:text-5xl tracking-tight mb-4 group-hover:text-aurora transition-colors">
                  {p.title}
                </h2>
                <p className="relative text-muted-foreground leading-relaxed mb-8">{p.blurb}</p>
                <div className="relative grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                  {p.metrics.map((m) => (
                    <div key={m.v}>
                      <div className="font-display text-2xl text-aurora">{m.k}</div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-1">{m.v}</div>
                    </div>
                  ))}
                </div>
                <div className="relative flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {p.services.slice(0, 3).map((s) => (
                      <span key={s} className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <CTA title="Want to be next?" body="Bring us a hard problem. We love those." />
    </>
  );
}
