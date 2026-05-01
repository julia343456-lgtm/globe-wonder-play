import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

const SERVICES = [
  {
    n: "01",
    title: "Performance marketing",
    blurb: "Paid search, social, programmatic and retail media — measured to the cent, optimized weekly.",
    cat: "Paid",
    tags: ["Meta", "Google", "TikTok", "Amazon"],
  },
  {
    n: "02",
    title: "SEO & content",
    blurb: "Topical authority, technical SEO, and a content engine that compounds quarter over quarter.",
    cat: "Organic",
    tags: ["Technical", "Content", "Digital PR"],
  },
  {
    n: "03",
    title: "Social & creative",
    blurb: "Always-on social, creator partnerships, and a weekly creative rhythm fueling paid and organic.",
    cat: "Creative",
    tags: ["TikTok", "IG", "YouTube", "Creators"],
  },
  {
    n: "04",
    title: "Brand & web",
    blurb: "Identity, messaging, motion, and high-conversion sites — the surfaces growth runs on.",
    cat: "Brand",
    tags: ["Brand", "Web", "Motion", "Copy"],
  },
];

export default function ZServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let queued = false;

    const compute = () => {
      queued = false;
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      if (trackRef.current) {
        const maxX = trackRef.current.scrollWidth - window.innerWidth;
        // Reversed: start at -maxX (rightmost), move toward 0 (leftmost) → cards travel left-to-right visually,
        // i.e. opposite of ZSlides which moves right-to-left.
        trackRef.current.style.transform = `translate3d(${-(1 - p) * maxX}px, 0, 0)`;
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative"
      style={{ height: `${SERVICES.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: "1800px" }}>
        <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-10 pt-28 pointer-events-none">
          <div className="max-w-7xl mx-auto flex items-end justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3" aria-hidden="true">[ services · z-axis ]</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight">
                Four orbits of <span className="text-aurora italic">growth.</span>
              </h2>
            </div>
            <div className="hidden md:block font-mono text-xs text-muted-foreground">
              {String(Math.min(SERVICES.length, Math.floor((1 - progress) * SERVICES.length) + 1)).padStart(2, "0")}
              <span className="mx-1">/</span>
              {String(SERVICES.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center" style={{ transformStyle: "preserve-3d" }}>
          <div
            ref={trackRef}
            className="flex items-center gap-10 px-[15vw] will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {SERVICES.map((s, i) => (
              <ZServiceCard key={s.n} index={i} progress={progress} total={SERVICES.length} service={s} />
            ))}
            <div className="shrink-0 w-[10vw]" />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[60vw] max-w-md">
          <div className="h-px bg-border relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 bg-aurora" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">
            scroll ← flies forward
          </div>
        </div>
      </div>
    </section>
  );
}

function ZServiceCard({
  index,
  progress,
  total,
  service,
}: {
  index: number;
  progress: number;
  total: number;
  service: (typeof SERVICES)[number];
}) {
  // Reverse focus order so the last card is featured first, matching reversed travel.
  const center = ((total - 1 - index) + 0.5) / total;
  const dist = progress - center;
  const z = Math.max(-600, -Math.abs(dist) * 1800);
  const rotY = -dist * 18;
  const opacity = 1 - Math.min(0.6, Math.abs(dist) * 1.4);
  const scale = 1 - Math.min(0.25, Math.abs(dist) * 0.6);

  return (
    <article
      className="shrink-0 w-[70vw] md:w-[44vw] lg:w-[36vw] aspect-[4/5] rounded-3xl relative overflow-hidden border border-border bg-card-gradient"
      style={{
        transform: `translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`,
        opacity,
        transition: "transform 0.1s linear",
        boxShadow: Math.abs(dist) < 0.1 ? "var(--shadow-glow-cyan)" : "var(--shadow-elevated)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -right-24 w-72 h-72 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />

      <div className="relative h-full p-8 md:p-10 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-muted-foreground">{service.n} / {String(total).padStart(2, "0")}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-primary/40 text-primary">
            {service.cat}
          </span>
        </div>

        <div className="flex-1 flex items-center">
          <h3 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            {service.title}
          </h3>
        </div>

        <div>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">{service.blurb}</p>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {service.tags.map((t) => (
                <span key={t} className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground shrink-0"
            >
              <span className="relative">
                Explore
                <span className="absolute left-0 -bottom-1 h-px w-full bg-aurora origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
              </span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
