import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import PageHeader from "@/components/PageHeader";
import { submitContact } from "@/server/contact.functions";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Neom Teckverse" },
      { name: "description", content: "Tell us about your project. We'll come back within 24 hours with a plan." },
      { property: "og:title", content: "Contact — Neom Teckverse" },
      { property: "og:description", content: "Start a project with Neom Teckverse. 24h response, real humans." },
      { rel: "canonical", href: "https://neomteckverse.com/contact" },
    ],
  }),
});

const SERVICES = ["Performance marketing", "SEO & content", "Social & creative", "Brand & web", "Not sure yet"];
const BUDGETS = ["< $25k", "$25k–$75k", "$75k–$150k", "$150k+"];

function ContactPage() {
  const submit = useServerFn(submitContact);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      const result = await submit({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          company: String(fd.get("company") || ""),
          website: String(fd.get("website") || ""),
          services,
          budget,
          message: String(fd.get("message") || ""),
          referrer: typeof document !== "undefined" ? document.referrer : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
      });
      if (result.ok) setStatus("success");
      else { setStatus("error"); setError(result.error); }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="[ contact ]"
        title="Let's build the"
        highlight="orbit."
        body="Tell us where you want to grow. We'll come back within 24 hours with a plan, a price, and the team."
      />

      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <div className="p-8 md:p-12 rounded-3xl border border-border bg-card-gradient">
            {status === "success" ? (
              <div className="py-20 text-center" role="status" aria-live="polite">
                <div className="font-display text-6xl text-aurora mb-4">Sent.</div>
                <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Your name" name="name" placeholder="Maya Chen" required />
                  <Field label="Work email" name="email" type="email" placeholder="maya@company.com" required />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Company" name="company" placeholder="Aurora Labs" />
                  <Field label="Website" name="website" placeholder="auroralabs.com" />
                </div>

                <fieldset>
                  <legend className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    What do you need help with?
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => {
                      const active = services.includes(s);
                      return (
                        <button
                          type="button"
                          key={s}
                          aria-pressed={active}
                          onClick={() => setServices((cur) => cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s])}
                          className={`px-3 py-1.5 rounded-full border text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            active ? "bg-aurora text-background border-transparent" : "border-border text-foreground"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Monthly budget
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => {
                      const active = budget === b;
                      return (
                        <button
                          type="button"
                          key={b}
                          aria-pressed={active}
                          onClick={() => setBudget(b)}
                          className={`px-3 py-1.5 rounded-full border text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            active ? "bg-aurora text-background border-transparent" : "border-border text-foreground"
                          }`}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Tell us about the project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={5000}
                    placeholder="What are you trying to grow? What's worked, what hasn't?"
                    className="w-full px-4 py-3 rounded-2xl bg-background border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                {status === "error" && error && (
                  <div role="alert" className="text-sm text-destructive font-mono">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-aurora text-background font-medium hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:hover:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="absolute inset-0 rounded-full bg-aurora blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                  <span className="relative">{status === "loading" ? "Sending…" : "Send brief"}</span>
                  <span className="relative">→</span>
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <Block title="Email" body="hello@neomteckverse.com" />
            <Block title="Response time" body="Within 24 hours, every working day." />
            <Block title="Studios" body="Berlin · NYC · Tokyo · Remote-first" />
            <div className="p-6 rounded-2xl border border-border bg-surface/30">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">Now booking</div>
              <div className="font-display text-2xl mb-2">Q3 — 2 slots left</div>
              <p className="text-muted-foreground text-sm">
                We take on a maximum of 8 active engagements at once. Currently 6 of 8 filled.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}{required && <span className="text-primary"> *</span>}</label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        autoComplete={name === "email" ? "email" : name === "name" ? "name" : "off"}
        className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
      />
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{title}</div>
      <div className="font-display text-2xl mb-1">{body}</div>
    </div>
  );
}
