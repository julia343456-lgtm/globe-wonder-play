export default function PageHeader({
  eyebrow,
  title,
  highlight,
  body,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  body?: string;
}) {
  return (
    <section className="relative pt-40 pb-16 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative max-w-5xl mx-auto text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-5">{eyebrow}</div>
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
          {title} <span className="text-aurora italic">{highlight}</span>
        </h1>
        {body && <p className="mt-7 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">{body}</p>}
      </div>
    </section>
  );
}
