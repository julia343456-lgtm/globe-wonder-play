import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
  head: () => ({
    meta: [
      { title: "Insights — Neom Teckverse" },
      { name: "description", content: "Field notes from the Neom Teckverse team — playbooks, teardowns, and points of view on modern growth." },
      { property: "og:title", content: "Insights — Neom Teckverse" },
      { property: "og:description", content: "Playbooks, teardowns, and points of view on modern growth." },
    ],
  }),
});

const POSTS = [
  { tag: "Playbook", title: "The 4× ROAS playbook for sub-$50 AOV brands", time: "12 min", date: "Apr 2026" },
  { tag: "Teardown", title: "Why every B2B site looks the same — and what to do about it", time: "8 min", date: "Apr 2026" },
  { tag: "POV", title: "Brand vs performance is a false dichotomy", time: "6 min", date: "Mar 2026" },
  { tag: "Playbook", title: "Building a creative engine that fuels both paid and organic", time: "14 min", date: "Mar 2026" },
  { tag: "Teardown", title: "How Aurora 4×'d revenue without raising the budget", time: "10 min", date: "Feb 2026" },
  { tag: "POV", title: "MMM is back. Here's how we use it weekly", time: "9 min", date: "Feb 2026" },
];

function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="[ insights ]"
        title="Field notes,"
        highlight="not thought leadership."
        body="Playbooks, teardowns, and opinions from the team — written when we have something to say, not on a content calendar."
      />

      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Featured */}
          <Link
            to="/insights"
            className="group relative block mb-10 p-10 md:p-14 rounded-3xl border border-border bg-card-gradient overflow-hidden hover:border-primary/40 transition-colors"
          >
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-aurora text-background">
                  Featured
                </span>
                <span className="font-mono text-xs text-muted-foreground">Apr 2026 · 12 min read</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-3xl group-hover:text-aurora transition-colors">
                The 4× ROAS playbook for sub-$50 AOV brands
              </h2>
              <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
                A complete teardown of how we rebuilt the funnel for a sleep brand and quadrupled new-customer
                revenue without raising spend.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-primary">
                Read the playbook <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {POSTS.slice(1).map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to="/insights"
                  className="group block h-full p-7 rounded-2xl border border-border bg-surface/30 hover:bg-card-gradient hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border border-primary/40 text-primary">
                      {p.tag}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">{p.date}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-aurora transition-colors mb-6">
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                    <span className="font-mono text-xs text-muted-foreground">{p.time} read</span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-3xl mx-auto p-10 md:p-14 rounded-3xl border border-border bg-card-gradient text-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ newsletter ]</div>
          <h3 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
            One email, <span className="text-aurora italic">every other Tuesday.</span>
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            What we shipped, what we learned, what we're reading. No fluff, no funnel.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 px-4 py-3 rounded-full bg-background border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-aurora text-background font-medium whitespace-nowrap hover:scale-[1.03] transition-transform"
            >
              Subscribe →
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
