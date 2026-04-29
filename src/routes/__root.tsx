import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-aurora">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Off the orbit</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has drifted out of view.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-aurora px-5 py-2.5 text-sm font-medium text-background">
            Go home →
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Neom Teckverse — Digital marketing engineered for growth" },
      { name: "description", content: "Neom Teckverse is a performance-led digital marketing firm. Paid media, SEO, content, brand and web — engineered as one growth system." },
      { name: "author", content: "Neom Teckverse" },
      { property: "og:title", content: "Neom Teckverse — Digital marketing engineered for growth" },
      { property: "og:description", content: "Performance-led digital marketing. Paid, organic, brand and web as one system." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
