export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 backdrop-blur-md bg-background/40 border-b border-border/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-aurora">
            <span className="absolute inset-0 rounded-md bg-aurora blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="relative font-mono text-xs font-bold text-background">Z</span>
          </span>
          <span className="font-display text-xl tracking-wide">z·axis</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono text-muted-foreground">
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#deck" className="hover:text-foreground transition-colors">Deck</a>
        </div>
        <a
          href="#contact"
          className="text-sm font-mono px-4 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:glow-cyan"
        >
          Get in touch →
        </a>
      </div>
    </nav>
  );
}
