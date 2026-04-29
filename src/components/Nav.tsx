import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

const LINKS = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insights" },
] as const;

export default function Nav() {
  const { location } = useRouterState();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 backdrop-blur-md bg-background/60 border-b border-border/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <span className="relative flex h-8 w-8 items-center justify-center rounded-md bg-aurora">
            <span className="absolute inset-0 rounded-md bg-aurora blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="relative font-mono text-xs font-bold text-background">N</span>
          </span>
          <span className="font-display text-xl tracking-wide leading-none">
            Neom <span className="text-aurora italic">Teckverse</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm font-mono text-muted-foreground">
          {LINKS.map((l) => {
            const active = location.pathname === l.to || location.pathname.startsWith(l.to + "/");
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`transition-colors hover:text-foreground ${active ? "text-foreground" : ""}`}
              >
                {l.label}
                {active && <span className="block h-px w-full bg-aurora mt-1" />}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex text-sm font-mono px-4 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:glow-cyan"
          >
            Start a project →
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden flex flex-col gap-1.5 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className={`h-px w-5 bg-foreground transition-transform ${open ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`h-px w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-5 bg-foreground transition-transform ${open ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden mt-4 pb-4 flex flex-col gap-1 max-w-7xl mx-auto">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="px-2 py-3 font-display text-2xl border-b border-border/40 hover:text-aurora transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center px-4 py-3 rounded-full bg-aurora text-background font-medium"
          >
            Start a project →
          </Link>
        </div>
      )}
    </nav>
  );
}
