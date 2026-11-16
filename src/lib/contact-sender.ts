import "server-only";
import type { ContactInput } from "./contact-schema";
import type { ContactDelivery } from "./contact-service";

// Delivery routing is configured server-side in Vercel, never in public source.
const sender = "RepairNox <demo@repairnox.com>";

export async function sendContactInquiry(input: ContactInput, idempotencyKey: string, request: typeof fetch = fetch): Promise<ContactDelivery> {
  const key = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.DEMO_RECIPIENT_EMAIL?.trim();
  const copyRecipient = process.env.DEMO_CC_EMAIL?.trim();
  if (!key || !recipient || !copyRecipient) return "unavailable";
  try {
    const response = await request("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
      body: JSON.stringify({
        from: sender, to: [recipient], cc: [copyRecipient], reply_to: input.email,
        subject: `RepairNox — ${input.topic} inquiry`,
        text: ["A visitor submitted a RepairNox contact inquiry.", "", `Name: ${input.fullName}`, `Shop: ${input.shopName}`, `Email: ${input.email}`, `Phone: ${input.phone || "Not provided"}`, `Country: ${input.country || "Not provided"}`, `Preferred callback time: ${input.preferredCallback || "Please arrange with the visitor"}`, "Callback preference is not a confirmed appointment.", `Industry: ${input.industry}`, `Topic: ${input.topic}`, "Contact consent: Yes", "", "Message:", input.message].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000), cache: "no-store",
    });
    if (response.status === 429) return "limited";
    if (response.status >= 500) return "unconfirmed";
    if (!response.ok) return "unavailable";
    const body: unknown = await response.json();
    return body && typeof body === "object" && "id" in body && typeof body.id === "string" && body.id ? "accepted" : "unconfirmed";
  } catch {
    return "unconfirmed";
  }
}
