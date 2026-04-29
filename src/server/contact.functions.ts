import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200, "Name too long"),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  website: z.string().trim().max(500).optional().or(z.literal("")),
  services: z.array(z.string().max(80)).max(10).default([]),
  budget: z.string().max(50).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  referrer: z.string().max(500).optional().or(z.literal("")),
  userAgent: z.string().max(500).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const { error } = await supabaseAdmin.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        website: data.website || null,
        services: data.services,
        budget: data.budget || null,
        message: data.message || null,
        referrer: data.referrer || null,
        user_agent: data.userAgent || null,
      });

      if (error) {
        console.error("[contact] insert failed", error);
        return { ok: false as const, error: "Could not save submission. Please try again." };
      }

      return { ok: true as const };
    } catch (err) {
      console.error("[contact] handler error", err);
      return { ok: false as const, error: "Something went wrong. Please try again." };
    }
  });
