import { motion } from "framer-motion";

const SERVICES = [
  {
    n: "01",
    title: "Spatial interfaces",
    desc: "WebGL, three.js and shader-driven UI that gives flat pixels weight, depth, and motion.",
    tags: ["three.js", "GLSL", "R3F"],
  },
  {
    n: "02",
    title: "Product engineering",
    desc: "End-to-end React and TypeScript builds — performant by default, type-safe to the edge.",
    tags: ["React", "TS", "Edge"],
  },
  {
    n: "03",
    title: "Brand systems",
    desc: "Design systems with personality. Tokens, motion, sound and identity that scale together.",
    tags: ["Tokens", "Motion", "Identity"],
  },
  {
    n: "04",
    title: "Data visualization",
    desc: "Globes, graphs, and live dashboards. Make billions of rows feel intuitive and alive.",
    tags: ["D3", "WebGL", "Realtime"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ services ]</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight max-w-2xl">
              Four orbits of <span className="text-aurora italic">craft.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            We work in tight, senior pods. No layers, no slowdowns — just engineers and designers shipping at the
            speed of thought.
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
              className="group relative p-8 md:p-10 rounded-2xl border border-border bg-card-gradient overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
