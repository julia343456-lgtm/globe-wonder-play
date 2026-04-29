import { createFileRoute } from "@tanstack/react-router";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ZSlides from "@/components/ZSlides";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Z·Axis — Spatial product studio" },
      {
        name: "description",
        content:
          "Z·Axis is a spatial product studio designing interfaces with depth — interactive globes, WebGL dashboards, and brand systems in motion.",
      },
      { property: "og:title", content: "Z·Axis — Spatial product studio" },
      {
        property: "og:description",
        content:
          "Interactive 3D experiences, WebGL data visualization, and motion-rich brand systems.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Services />
      <ZSlides />
      <Footer />
    </main>
  );
}
