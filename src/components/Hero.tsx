import { motion } from "framer-motion";
import Globe from "./Globe";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/50 backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-mono text-xs text-muted-foreground">Now shipping in 12 timezones</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
          >
            Build along the<br />
            <span className="text-aurora italic">third axis.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 max-w-lg text-lg text-muted-foreground leading-relaxed"
          >
            We design and engineer interfaces with depth — products that move, breathe, and pull users forward.
            From orbiting data layers to interactive 3D worlds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#deck"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-aurora text-background font-medium hover:scale-[1.03] transition-transform"
            >
              <span className="absolute inset-0 rounded-full bg-aurora blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <span className="relative">Enter the deck</span>
              <span className="relative">→</span>
            </a>
            <a href="#services" className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors">
              ↓ scroll to explore
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { k: "120+", v: "shipped" },
              { k: "12", v: "timezones" },
              { k: "9 yrs", v: "in motion" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl text-aurora">{s.k}</div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative aspect-square w-full max-w-[600px] justify-self-center lg:justify-self-end"
        >
          <Globe />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            drag · spin · explore
          </div>
        </motion.div>
      </div>
    </section>
  );
}
