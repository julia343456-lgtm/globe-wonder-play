import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Neom Teckverse" },
      { name: "description", content: "Tell us about your project. We'll come back within 24 hours with a plan." },
      { property: "og:title", content: "Contact — Neom Teckverse" },
      { property: "og:description", content: "Start a project with Neom Teckverse. 24h response, real humans." },
    ],
  }),
});

const SERVICES = ["Performance marketing", "SEO & content", "Social & creative", "Brand & web", "Not sure yet"];
const BUDGETS = ["< $25k", "$25k–$75k", "$75k–$150k", "$150k+"];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

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
          {/* Form */}
          <div className="p-8 md:p-12 rounded-3xl border border-border bg-card-gradient">
            {submitted ? (
              <div className="py-20 text-center">
                <div className="font-display text-6xl text-aurora mb-4">Sent.</div>
                <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Your name" name="name" placeholder="Maya Chen" required />
                  <Field label="Work email" name="email" type="email" placeholder="maya@company.com" required />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Company" name="company" placeholder="Aurora Labs" />
                  <Field label="Website" name="website" placeholder="auroralabs.com" />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    What do you need help with?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <label key={s} className="cursor-pointer">
                        <input type="checkbox" name="service" value={s} className="peer sr-only" />
                        <span className="inline-block px-3 py-1.5 rounded-full border border-border text-sm peer-checked:bg-aurora peer-checked:text-background peer-checked:border-transparent transition-colors">
                          {s}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Monthly budget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <label key={b} className="cursor-pointer">
                        <input type="radio" name="budget" value={b} className="peer sr-only" />
                        <span className="inline-block px-3 py-1.5 rounded-full border border-border text-sm peer-checked:bg-aurora peer-checked:text-background peer-checked:border-transparent transition-colors">
                          {b}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Tell us about the project
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="What are you trying to grow? What's worked, what hasn't?"
                    className="w-full px-4 py-3 rounded-2xl bg-background border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-aurora text-background font-medium hover:scale-[1.01] transition-transform"
                >
                  <span className="absolute inset-0 rounded-full bg-aurora blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                  <span className="relative">Send brief</span>
                  <span className="relative">→</span>
                </button>
              </form>
            )}
          </div>

          {/* Side */}
          <div className="space-y-8">
            <Block title="Email" body="hello@neomteckverse.com" />
            <Block title="Response time" body="Within 24 hours, every working day." />
            <Block title="Studios" body="Berlin · NYC · Tokyo · Remote-first" />
            <Block
              title="Prefer a call?"
              body="Book a 30-min intro directly with a partner."
              link="Book a slot →"
            />
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

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-full bg-background border border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
      />
    </div>
  );
}

function Block({ title, body, link }: { title: string; body: string; link?: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{title}</div>
      <div className="font-display text-2xl mb-1">{body}</div>
      {link && <div className="text-primary font-mono text-sm">{link}</div>}
    </div>
  );
}
