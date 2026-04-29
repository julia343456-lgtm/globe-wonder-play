export default function Footer() {
  return (
    <footer id="contact" className="relative py-24 px-6 md:px-10 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-12 mb-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">[ contact ]</div>
            <h3 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight">
              Got a world<br /> to <span className="text-aurora italic">render?</span>
            </h3>
            <a
              href="mailto:hello@zaxis.studio"
              className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full bg-aurora text-background font-medium hover:scale-[1.03] transition-transform"
            >
              hello@zaxis.studio →
            </a>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">studio</div>
            <ul className="space-y-2 text-foreground/80">
              <li>About</li><li>Process</li><li>Careers</li><li>Press</li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">elsewhere</div>
            <ul className="space-y-2 text-foreground/80">
              <li>Twitter</li><li>Are.na</li><li>Dribbble</li><li>GitHub</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border font-mono text-xs text-muted-foreground">
          <span>© 2026 Z·Axis Studio — built along the third dimension</span>
          <span>Berlin · NYC · Tokyo</span>
        </div>
      </div>
    </footer>
  );
}
