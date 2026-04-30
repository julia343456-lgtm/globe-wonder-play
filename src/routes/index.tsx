import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ZSlides from "@/components/ZSlides";
import CTA from "@/components/CTA";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Neom Teckverse — Digital marketing engineered for growth" },
      { name: "description", content: "Neom Teckverse is a digital marketing firm engineering paid, organic, brand and web as one compounding growth system. $84M+ revenue driven, 4.1× avg ROAS." },
      { property: "og:title", content: "Neom Teckverse — Digital marketing engineered for growth" },
      { property: "og:description", content: "Digital marketing as one compounding system. $84M+ driven, 4.1× ROAS, 120+ brands shipped." },
    ],
  }),
});

const LOGOS = ["AURORA", "HELIO", "ORBITER", "NIMBUS", "VECTOR", "LUMA", "QUANTA", "PARALLAX"];

function Index() {
  return (
    <>
      <Hero />

      {/* Logo marquee */}
      <section className="relative py-10 border-y border-border bg-surface/30 overflow-hidden">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center mb-6">
          Trusted by ambitious brands worldwide
        </div>
        <div className="flex animate-marquee">
          {[...LOGOS, ...LOGOS, ...LOGOS].map((l, i) => (
            <div key={i} className="shrink-0 px-12 font-display text-3xl text-muted-foreground/60 hover:text-aurora transition-colors">
              {l}
            </div>
          ))}
        </div>
      </section>

      <Services headingOnly />

      {/* Results strip */}
      <section className="relative py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ outcomes ]</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight">
              Numbers that <span className="text-aurora italic">moved.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {[
              { k: "$84M+", v: "Revenue driven for clients" },
              { k: "4.1×", v: "Avg ROAS uplift" },
              { k: "12×", v: "Avg organic traffic growth" },
              { k: "98", v: "NPS from active clients" },
            ].map((s) => (
              <motion.div
                key={s.v}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-background p-10"
              >
                <div className="font-display text-5xl md:text-6xl text-aurora mb-2">{s.k}</div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ZSlides />

      {/* Testimonial */}
      <section className="relative py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-display text-3xl md:text-5xl leading-tight tracking-tight">
            "Neom Teckverse rebuilt our growth from the ground up. Within 90 days we'd 3×'d revenue and finally
            had a marketing team that <span className="text-aurora italic">felt like product engineering</span>."
          </div>
          <div className="mt-8 font-mono text-sm text-muted-foreground">
            — Maya Chen · VP Growth, Aurora DTC
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 mt-8 font-mono text-sm text-primary hover:text-foreground transition-colors"
          >
            Read the case study →
          </Link>
        </div>
      </section>

      <CTA />
    </>
  );
}
