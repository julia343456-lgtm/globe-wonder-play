import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Neom Teckverse" },
      { name: "description", content: "Performance marketing, SEO & content, social & creative, brand & web. Four orbits of growth, one operating model." },
      { property: "og:title", content: "Services — Neom Teckverse" },
      { property: "og:description", content: "Performance marketing, SEO, social, brand and web — engineered as one growth system." },
    ],
  }),
});

const SERVICES = [
  {
    n: "01",
    title: "Performance marketing",
    sub: "Paid media that compounds",
    desc: "We run paid search, paid social, programmatic and retail media as a single connected system — measured to the cent, optimized weekly, with creative built into the loop.",
    deliverables: ["Channel strategy", "Account builds", "Creative testing", "Measurement & MMM", "Weekly optimization"],
    tags: ["Meta", "Google", "TikTok", "LinkedIn", "Amazon", "DV360"],
  },
  {
    n: "02",
    title: "SEO & content",
    sub: "Authority that compounds",
    desc: "Technical SEO, topical authority, and a content engine that turns search intent into pipeline. We map the buyer journey, fix what's broken, then ship at velocity.",
    deliverables: ["Technical audit", "Topical maps", "Content production", "Digital PR", "On-page CRO"],
    tags: ["Technical", "Content", "Backlinks", "Programmatic"],
  },
  {
    n: "03",
    title: "Social & creative",
    sub: "Always-on, never-on-brand-by-accident",
    desc: "A weekly creative rhythm — UGC, creator partnerships, and editorial — that fuels both organic distribution and the paid creative pipeline.",
    deliverables: ["Always-on social", "Creator program", "Editorial calendar", "Short-form video", "Community"],
    tags: ["TikTok", "IG", "YouTube", "Threads", "LinkedIn"],
  },
  {
    n: "04",
    title: "Brand & web",
    sub: "The surfaces growth runs on",
    desc: "Identity, messaging, motion, and conversion-grade websites. Built by the same team that runs your media, so brand and performance are never in tension.",
    deliverables: ["Brand strategy", "Identity systems", "Messaging", "Web design & build", "Motion & 3D"],
    tags: ["Brand", "Web", "Motion", "Copy", "WebGL"],
  },
];

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="[ services ]"
        title="Four orbits."
        highlight="One growth system."
        body="We don't sell point services. We deploy a single integrated team across paid, organic, social and brand — so every dollar reinforces the next."
      />

      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-7xl mx-auto space-y-5">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative grid md:grid-cols-[180px_1fr] gap-8 p-8 md:p-12 rounded-3xl border border-border bg-card-gradient overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="font-mono text-xs text-muted-foreground mb-2">{s.n} / 04</div>
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{s.sub}</div>
              </div>
              <div className="relative">
                <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-5">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl text-lg">{s.desc}</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Deliverables</div>
                    <ul className="space-y-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-foreground/85">
                          <span className="h-1 w-1 rounded-full bg-primary" /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Stack & channels</div>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span key={t} className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Engagement models */}
      <section className="relative py-24 px-6 md:px-10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ engagement ]</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight">
              Pick your <span className="text-aurora italic">orbit.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { tier: "Sprint", price: "From $25k", best: "Single launch or audit", points: ["4–6 week engagement", "1 senior pod", "Defined deliverable", "Fixed scope & price"] },
              { tier: "Retainer", price: "From $35k/mo", best: "Always-on growth", points: ["Embedded pod", "Weekly cadence", "Quarterly planning", "Shared roadmap"], featured: true },
              { tier: "Enterprise", price: "Custom", best: "Multi-region rollout", points: ["Multiple pods", "Dedicated leadership", "MSAs / SOWs", "Onsite as needed"] },
            ].map((p) => (
              <div
                key={p.tier}
                className={`relative p-8 rounded-2xl border ${p.featured ? "border-primary/60 bg-card-gradient" : "border-border bg-surface/30"}`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-8 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-aurora text-background">
                    Most popular
                  </span>
                )}
                <div className="font-display text-3xl mb-1">{p.tier}</div>
                <div className="text-aurora font-mono text-sm mb-1">{p.price}</div>
                <div className="text-muted-foreground text-sm mb-6">Best for: {p.best}</div>
                <ul className="space-y-2 mb-8">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-foreground/85 text-sm">
                      <span className="h-1 w-1 rounded-full bg-primary" /> {pt}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center font-mono text-sm py-2.5 rounded-full ${
                    p.featured ? "bg-aurora text-background" : "border border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  Talk to us →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Ready to compound?" body="Tell us what you're trying to grow. We'll build a 90-day plan in 48 hours." />
    </>
  );
}
