import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import { CosmicCard } from "@/components/CosmicCard";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Neom Teckverse" },
      { name: "description", content: "Founded in 2017. 28 senior operators across Berlin, NYC and Tokyo. Meet the team behind Neom Teckverse and the principles we ship by." },
      { property: "og:title", content: "About — Neom Teckverse" },
      { property: "og:description", content: "Senior, distributed, integrated. Meet the people behind Neom Teckverse." },
    ],
  }),
});

const TEAM = [
  { name: "Anika Rao", role: "Founder · Growth", bio: "12 yrs scaling DTC and SaaS from seed to nine figures." },
  { name: "Lukas Berg", role: "Partner · Brand", bio: "Brand systems for fintech, climate, and consumer." },
  { name: "Mei Tanaka", role: "Partner · Creative", bio: "Creative director — TikTok-native storytelling at scale." },
  { name: "Daniel Okafor", role: "Head of Engineering", bio: "Web, WebGL, marketing tech and the plumbing in between." },
  { name: "Sara Lindqvist", role: "Head of SEO", bio: "Topical authority, technical SEO, and digital PR." },
  { name: "Jay Chen", role: "Head of Paid", bio: "Paid media leader — Meta, Google, programmatic, retail." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="[ about ]"
        title="A small studio,"
        highlight="built for compounding."
        body="We started Neom Teckverse because growth is too important to outsource to a layered agency. We're senior, distributed, and integrated by design."
      />

      {/* Manifesto */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="font-display text-3xl md:text-5xl leading-tight tracking-tight space-y-6">
            <p>We believe brand and performance are the same job.</p>
            <p className="text-muted-foreground">Most agencies treat them as opposing departments. We don't.</p>
            <p>Strategy without shipping is theater. Shipping without strategy is noise.</p>
            <p className="text-muted-foreground">We do both, weekly, with the people you actually hired.</p>
            <p>Growth is a system, not a campaign. <span className="text-aurora italic">We build systems.</span></p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-10 py-16 border-y border-border bg-surface/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-center">
          {[
            { k: "2017", v: "Founded" },
            { k: "28", v: "Senior team" },
            { k: "9", v: "Time zones" },
            { k: "120+", v: "Brands shipped" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-5xl md:text-6xl text-aurora mb-2">{s.k}</div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ leadership ]</div>
              <h2 className="font-display text-5xl md:text-6xl tracking-tight">
                The people you'll <span className="text-aurora italic">actually meet.</span>
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <CosmicCard interactive className="group p-7 h-full">
                  <div className="aspect-square w-20 rounded-full bg-aurora mb-5 opacity-80 group-hover:scale-105 transition-transform" aria-hidden="true" />
                  <div className="font-display text-2xl">{m.name}</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-primary mt-1 mb-3">{m.role}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{m.bio}</p>
                </CosmicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Want to work here?" body="We're always looking for senior operators. Send us a note — even if we're not actively hiring." />
    </>
  );
}
