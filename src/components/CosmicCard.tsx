import { cn } from "@/lib/utils";

/**
 * Cosmic card primitive. Replaces ~12 hand-rolled
 * `rounded-3xl border border-border bg-card-gradient` blocks across the site.
 */
export function CosmicCard({
  className,
  glow = false,
  interactive = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { glow?: boolean; interactive?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border border-border bg-card-gradient overflow-hidden",
        interactive && "transition-colors hover:border-primary/40",
        glow && "glow-cyan",
        className,
      )}
      {...props}
    />
  );
}

/** Decorative ambient blobs commonly placed inside CosmicCard. */
export function CardAmbient() {
  return (
    <>
      <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />
    </>
  );
}
