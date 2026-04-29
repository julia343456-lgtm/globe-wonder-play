import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    n: "01",
    title: "Aurora OS",
    cat: "Spatial product",
    blurb: "An operating system for ambient computing. We designed motion, sound, and the entire shell language.",
    accent: "from-cyan-400 to-fuchsia-400",
  },
  {
    n: "02",
    title: "Helio Finance",
    cat: "Realtime dashboard",
    blurb: "A globe-anchored trading view tracking 4M positions per second across continents.",
    accent: "from-fuchsia-400 to-amber-300",
  },
  {
    n: "03",
    title: "Orbiter Studio",
    cat: "Brand system",
    blurb: "Identity, motion, and a generative type system for a satellite imaging startup.",
    accent: "from-amber-300 to-cyan-400",
  },
  {
    n: "04",
    title: "Nimbus Health",
    cat: "Spatial interface",
    blurb: "A volumetric patient record — radiology, vitals, and history rendered as one navigable space.",
    accent: "from-cyan-400 to-emerald-300",
  },
  {
    n: "05",
    title: "Vector Atlas",
    cat: "Data viz",
    blurb: "100M-vertex globe of climate signals, scrubbable across decades. Built on streaming WebGL.",
    accent: "from-emerald-300 to-fuchsia-400",
  },
];

export default function ZSlides() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      if (trackRef.current) {
        const maxX = trackRef.current.scrollWidth - window.innerWidth;
        trackRef.current.style.transform = `translate3d(${-p * maxX}px, 0, 0)`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="deck"
      ref={sectionRef}
      className="relative"
      style={{ height: `${SLIDES.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: "1800px" }}>
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-10 pt-28 pointer-events-none">
          <div className="max-w-7xl mx-auto flex items-end justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">[ deck · z-axis ]</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight">
                Selected <span className="text-aurora italic">work.</span>
              </h2>
            </div>
            <div className="hidden md:block font-mono text-xs text-muted-foreground">
              {String(Math.min(SLIDES.length, Math.floor(progress * SLIDES.length) + 1)).padStart(2, "0")}
              <span className="mx-1">/</span>
              {String(SLIDES.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Track */}
        <div className="absolute inset-0 flex items-center" style={{ transformStyle: "preserve-3d" }}>
          <div
            ref={trackRef}
            className="flex items-center gap-10 px-[15vw] will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {SLIDES.map((s, i) => {
              return (
                <ZCard key={s.n} index={i} progress={progress} total={SLIDES.length} {...s} />
              );
            })}
            <div className="shrink-0 w-[10vw]" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 w-[60vw] max-w-md">
          <div className="h-px bg-border relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-aurora"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground text-center">
            scroll → flies forward
          </div>
        </div>
      </div>
    </section>
  );
}

function ZCard({
  index,
  progress,
  total,
  n,
  title,
  cat,
  blurb,
}: {
  index: number;
  progress: number;
  total: number;
  n: string;
  title: string;
  cat: string;
  blurb: string;
  accent: string;
}) {
  // Each card has its "active" point — when card is centered horizontally
  const center = (index + 0.5) / total;
  const dist = progress - center; // -ve: not yet, +ve: passed
  const z = Math.max(-600, -Math.abs(dist) * 1800);
  const rotY = dist * 18;
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
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 w-72 h-72 rounded-full bg-accent/30 blur-3xl" />

      <div className="relative h-full p-8 md:p-10 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-muted-foreground">{n} / {String(total).padStart(2, "0")}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-primary/40 text-primary">
            {cat}
          </span>
        </div>

        <div className="flex-1 flex items-center">
          <h3 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            {title}
          </h3>
        </div>

        <div>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">{blurb}</p>
          <div className="flex items-center justify-between">
            <button className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground">
              <span className="relative">
                Case study
                <span className="absolute left-0 -bottom-1 h-px w-full bg-aurora origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
              </span>
              <span>→</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-aurora opacity-80" />
          </div>
        </div>
      </div>
    </article>
  );
}
