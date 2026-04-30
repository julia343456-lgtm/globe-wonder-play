import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { CosmicCard } from "@/components/CosmicCard";

const SERVICES = [
  {
    n: "01",
    title: "Performance marketing",
    desc: "Paid search, paid social, programmatic and retail media — measured to the cent, optimized weekly.",
    tags: ["Meta", "Google", "TikTok", "Amazon"],
  },
  {
    n: "02",
    title: "SEO & content",
    desc: "Topical authority, technical SEO, and a content engine that compounds quarter over quarter.",
    tags: ["Technical", "Content", "Digital PR"],
  },
  {
    n: "03",
    title: "Social & creative",
    desc: "Always-on social, creator partnerships, and a weekly creative rhythm that fuels paid and organic.",
    tags: ["TikTok", "IG", "YouTube", "Creators"],
  },
  {
    n: "04",
    title: "Brand & web",
    desc: "Identity, messaging, motion, and high-conversion sites — the surfaces your growth runs on.",
    tags: ["Brand", "Web", "Motion", "Copy"],
  },
];

export default function Services({ headingOnly = false }: { headingOnly?: boolean }) {
  return (
    <section id="services" className="relative py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ services ]</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight max-w-2xl">
              Four orbits of <span className="text-aurora italic">growth.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            We work in tight, senior pods. No layers, no slowdowns — just strategists, marketers and engineers
            shipping at the speed of your roadmap.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <CosmicCard interactive className="group p-8 md:p-10 h-full">
                <div className="pointer-events-none absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
                <div className="relative flex items-start justify-between mb-6">
                  <span className="font-mono text-xs text-muted-foreground">{s.n} / 04</span>
                  <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary">→</span>
                </div>
                <h3 className="relative font-display text-3xl md:text-4xl mb-4">{s.title}</h3>
                <p className="relative text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
                <div className="relative flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </CosmicCard>
            </motion.div>
          ))}
        </div>

        {headingOnly && (
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:text-foreground transition-colors"
            >
              Explore all services →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
