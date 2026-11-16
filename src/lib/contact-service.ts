import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { contactSchema, type ContactInput, type ContactResult } from "./contact-schema";

export type ContactDelivery = "accepted" | "unavailable" | "unconfirmed" | "limited";
export interface ContactDependencies {
  admit: (email: string) => Promise<boolean>;
  send: (input: ContactInput, idempotencyKey: string) => Promise<ContactDelivery>;
}
export async function processContactInquiry(input: unknown, dependencies: ContactDependencies): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const errors: ContactResult["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactInput;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: "error", message: "Check the highlighted fields. Your details are still here.", errors };
  }
  try {
    if (!await dependencies.admit(parsed.data.email.toLowerCase())) return { status: "error", message: "Too many requests. Please wait a while before trying again. Your details are still here." };
    const digest = createHash("sha256").update(JSON.stringify(parsed.data)).digest("hex").slice(0, 32);
    const key = `repairnox-contact-${parsed.data.requestId || randomUUID()}-${digest}`;
    const delivery = await dependencies.send(parsed.data, key);
    if (delivery === "accepted") return { status: "success", message: "Your inquiry has been submitted. We’ll reply using the contact details you provided." };
    if (delivery === "limited") return { status: "error", message: "The contact service is busy. Please wait a while and try again. Your details are still here." };
    if (delivery === "unconfirmed") return { status: "error", message: "We couldn’t confirm submission. Your details are still here. Retry with the same details to help avoid a duplicate request." };
  } catch {
    // Never expose provider errors, recipient addresses, or personal data.
  }
  return { status: "error", message: "The contact service is temporarily unavailable. Please try again later. Your details are still here." };
}
