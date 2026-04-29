import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import appCss from "../styles.css?url";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Neom Teckverse",
  url: "https://neomteckverse.com",
  description: "Performance-led digital marketing firm — paid media, SEO, social, brand and web engineered as one growth system.",
  email: "hello@neomteckverse.com",
  sameAs: [
    "https://www.linkedin.com/company/neomteckverse",
    "https://twitter.com/neomteckverse",
  ],
};

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
      { name: "theme-color", content: "#0a0e2a" },
      { property: "og:title", content: "Neom Teckverse — Digital marketing engineered for growth" },
      { property: "og:description", content: "Neom Teckverse is a performance-led digital marketing firm. Paid media, SEO, content, brand and web — engineered as one growth system." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Neom Teckverse" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Neom Teckverse — Digital marketing engineered for growth" },
      { name: "twitter:description", content: "Neom Teckverse is a performance-led digital marketing firm. Paid media, SEO, content, brand and web — engineered as one growth system." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f245dee1-3db8-4984-8302-e2e683d70fd3/id-preview-e68bbeca--9a9f261f-a9d8-46c6-9437-cc8799cb0465.lovable.app-1777485217666.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f245dee1-3db8-4984-8302-e2e683d70fd3/id-preview-e68bbeca--9a9f261f-a9d8-46c6-9437-cc8799cb0465.lovable.app-1777485217666.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://neomteckverse.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSONLD),
      },
    ],
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-aurora focus:text-background focus:font-medium"
        >
          Skip to content
        </a>
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
      <main id="main" className="relative">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
