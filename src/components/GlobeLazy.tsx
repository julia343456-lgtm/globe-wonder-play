import { lazy, Suspense } from "react";

// Code-split the Three.js bundle off the main chunk. Globe is only ever in the hero.
const Globe = lazy(() => import("./Globe"));

function GlobeSkeleton() {
  return (
    <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">
      <div className="aspect-square w-[80%] rounded-full border border-primary/30 animate-pulse" />
      <div className="absolute inset-0 rounded-full" style={{ background: "var(--gradient-radial-glow)" }} />
    </div>
  );
}

export default function GlobeLazy() {
  return (
    <Suspense fallback={<GlobeSkeleton />}>
      <Globe />
    </Suspense>
  );
}
