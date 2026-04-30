import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import { CosmicCard } from "@/components/CosmicCard";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({
    meta: [
      { title: "Process — Neom Teckverse" },
      { name: "description", content: "How we work: discovery, plan, embed, optimize. A weekly cadence built for compounding." },
      { property: "og:title", content: "Process — Neom Teckverse" },
      { property: "og:description", content: "Discovery → Plan → Embed → Optimize. A weekly cadence built for compounding." },
    ],
  }),
});

const STEPS = [
  { n: "01", title: "Discovery", t: "Week 1–2", desc: "We audit your funnel, channels, creative, brand and tech stack. You get a written diagnosis even if we don't work together." },
  { n: "02", title: "Plan", t: "Week 2–3", desc: "A 90-day plan with priorities, owners, budgets and forecasted outcomes. Reviewed live in a working session, not a deck." },
  { n: "03", title: "Embed", t: "Week 3+", desc: "Your pod goes live in your tools — Slack, Notion, Linear, Looker. Daily standups, weekly reviews, monthly business reviews." },
  { n: "04", title: "Optimize", t: "Always", desc: "Weekly creative tests, monthly channel rebalancing, quarterly planning. Compounding, not chasing." },
];

function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="[ process ]"
        title="A weekly cadence,"
        highlight="built to compound."
        body="No 90-page strategy decks. We diagnose, plan, embed, then optimize — every week, forever."
      />

      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute left-[27px] md:left-[39px] top-4 bottom-4 w-px bg-border" />
          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] gap-6 items-start"
              >
                <div className="relative z-10 flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-full bg-aurora text-background font-mono text-sm md:text-base font-bold">
                  {s.n}
                </div>
                <CosmicCard className="p-6 md:p-8">
                  <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
                    <h3 className="font-display text-3xl md:text-4xl">{s.title}</h3>
                    <span className="font-mono text-xs uppercase tracking-widest text-primary">{s.t}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </CosmicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 md:px-10 py-20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ principles ]</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight">
              How we <span className="text-aurora italic">operate.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { t: "Senior pods only", d: "No layered teams. The person you meet is the person doing the work." },
              { t: "Open by default", d: "You see our roadmap, our experiments, our wins and our misses — in your tools, in real time." },
              { t: "Outcomes, not outputs", d: "We measure ourselves on revenue, pipeline and CAC — not deliverables shipped." },
              { t: "Weekly cadence", d: "One review meeting a week. Async writing the rest." },
              { t: "Creative as fuel", d: "Performance lives or dies on creative. We treat it as the core asset, not an afterthought." },
              { t: "Compounding > spikes", d: "We optimize for the curve at month 12, not the dashboard at week 2." },
            ].map((p) => (
              <div key={p.t} className="p-7 rounded-2xl border border-border bg-surface/30">
                <div className="font-display text-2xl mb-2">{p.t}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="See it in motion." body="Book a 30-min intro and we'll walk you through how a real Neom pod operates." />
    </>
  );
}
