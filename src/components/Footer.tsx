import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 md:px-10 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 mb-16">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-aurora">
                <span className="font-mono text-xs font-bold text-background">N</span>
              </span>
              <span className="font-display text-xl">
                Neom <span className="text-aurora italic">Teckverse</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs leading-relaxed">
              A performance-led digital marketing firm engineering growth across paid, organic, and brand.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 mt-6 px-5 py-2.5 rounded-full bg-aurora text-background font-medium hover:scale-[1.03] transition-transform"
            >
              Start a project →
            </Link>
          </div>
          <FooterCol title="Services" links={[
            { label: "Performance Marketing", to: "/services" },
            { label: "SEO & Content", to: "/services" },
            { label: "Social & Creative", to: "/services" },
            { label: "Brand & Web", to: "/services" },
          ]} />
          <FooterCol title="Studio" links={[
            { label: "About", to: "/about" },
            { label: "Process", to: "/process" },
            { label: "Work", to: "/work" },
            { label: "Insights", to: "/insights" },
          ]} />
          <FooterColExternal title="Elsewhere" links={[
            { label: "LinkedIn", href: "https://www.linkedin.com/company/neomteckverse" },
            { label: "Twitter / X", href: "https://twitter.com/neomteckverse" },
            { label: "Instagram", href: "https://www.instagram.com/neomteckverse" },
            { label: "Behance", href: "https://www.behance.net/neomteckverse" },
          ]} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border font-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Neom Teckverse — growth along the third axis</span>
          <span>hello@neomteckverse.com · Berlin · NYC · Tokyo</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">{title}</div>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-foreground/80 hover:text-aurora transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterColExternal({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">{title}</div>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-aurora transition-colors"
            >
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
