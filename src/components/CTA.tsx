import { Link } from "@tanstack/react-router";

export default function CTA({
  eyebrow = "[ next step ]",
  title = "Let's build the orbit.",
  body = "Tell us where you want to grow. We'll come back within a day with a plan, a price, and the team.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative py-28 px-6 md:px-10">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-border bg-card-gradient p-10 md:p-16 text-center">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 right-0 w-[400px] h-[400px] rounded-full bg-accent/15 blur-3xl" />
        <div className="relative">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">{eyebrow}</div>
          <h2 className="font-display text-5xl md:text-6xl tracking-tight mb-5">
            {title.split(" ").slice(0, -1).join(" ")} <span className="text-aurora italic">{title.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">{body}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-aurora text-background font-medium hover:scale-[1.03] transition-transform"
            >
              <span className="absolute inset-0 rounded-full bg-aurora blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <span className="relative">Start a project →</span>
            </Link>
            <Link to="/work" className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors">
              See recent work →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
