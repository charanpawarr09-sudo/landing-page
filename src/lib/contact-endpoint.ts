import "server-only";
import { randomUUID } from "node:crypto";
import { contactIndustries, contactTopics, type ContactInput, type ContactResult } from "./contact-schema";
import { processContactInquiry, type ContactDelivery, type ContactSuccessEvent } from "./contact-service";

const maxBytes = 32_768;
const limits = { fullName: 100, shopName: 160, email: 254, phone: 40, country: 80, preferredCallback: 160, industry: 40, topic: 40, message: 3000, requestId: 36, website: 100 } as const;
const escape = (value: unknown) => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

// This is deliberately the only sending route. The existing active Vercel WAF
// limits POST /api/demo (and its aliases) to 5/IP/600s. No second Server Action
// or filename/descendant alias can bypass the canonical path check below.
export async function handleContactRequest(request: Request, dependencies: {
  origins: readonly string[];
  send: (input: ContactInput, idempotencyKey: string) => Promise<ContactDelivery>;
  onAccepted?: (event: ContactSuccessEvent) => void;
}) {
  const json = request.headers.get("accept")?.includes("application/json");
  let values: Record<string, unknown> = {};
  const reply = (result: ContactResult, status: number) => {
    const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
    return json ? Response.json(result, { status, headers }) : new Response(nativePage(result, values), { status, headers: { ...headers, "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" } });
  };
  const reject = (status: number, message: string) => reply({ status: "error", message }, status);
  if (!["/api/demo", "/api/demo/"].includes(new URL(request.url).pathname)) return reject(404, "This inquiry address is unavailable. Please use the contact page.");
  if (request.method !== "POST") return reject(405, "Use the contact form to submit an inquiry.");
  if (!dependencies.origins.includes(request.headers.get("origin") ?? "") || request.headers.get("sec-fetch-site") === "cross-site") return reject(403, "Open the contact page on repairnox.com to submit your inquiry.");
  const type = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (!["application/json", "multipart/form-data", "application/x-www-form-urlencoded"].includes(type ?? "")) return reject(415, "Use the contact form to submit an inquiry.");
  if (Number(request.headers.get("content-length")) > maxBytes) return reject(413, "Your inquiry is too large. Please keep the message under 3,000 characters.");
  try {
    const reader = request.body?.getReader();
    if (!reader) return reject(400, "Please fill in the inquiry form.");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); return reject(413, "Your inquiry is too large. Please keep the message under 3,000 characters."); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    if (type === "application/json") {
      const input: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
      if (!input || typeof input !== "object" || Array.isArray(input)) return reject(400, "Please check the inquiry form.");
      values = input as Record<string, unknown>;
    } else {
      const form = await new Response(bytes, { headers: { "Content-Type": request.headers.get("content-type")! } }).formData();
      const names = new Set<string>();
      for (const [name, value] of form) {
        if (names.has(name) || typeof value !== "string") return reject(400, "Please check the inquiry form.");
        names.add(name); values[name] = value;
      }
      values.consent = form.get("consent") === "on";
    }
    // No shop data, application credentials, or Firebase connection in this public deployment.
    const result = await processContactInquiry(values, { admit: async () => true, send: dependencies.send, onAccepted: dependencies.onAccepted });
    return reply(result, result.status === "success" ? 200 : result.errors ? 400 : 503);
  } catch {
    return reject(400, "We couldn’t read this inquiry. Please check the form and try again.");
  }
}

function nativePage(result: ContactResult, raw: Record<string, unknown>) {
  const value = (name: keyof typeof limits) => escape(typeof raw[name] === "string" ? raw[name].slice(0, limits[name]) : "");
  const error = (name: keyof ContactInput) => result.errors?.[name] ? `<p class="error" id="${name}-error">${escape(result.errors[name])}</p>` : "";
  const attributes = (name: keyof ContactInput) => result.errors?.[name] ? ` aria-invalid="true" aria-describedby="${name}-error"` : "";
  const input = (name: keyof typeof limits, label: string, type: string, required: boolean, autocomplete?: string) => `<label for="${name}">${label}${required ? " *" : " (optional)"}</label><input id="${name}" name="${name}" type="${type}" ${required ? "required" : ""} maxlength="${limits[name]}" ${autocomplete ? `autocomplete="${autocomplete}"` : ""} value="${value(name)}"${attributes(name)}>${error(name)}`;
  const select = (name: "industry" | "topic", label: string, options: readonly string[]) => `<label for="${name}">${label} *</label><select name="${name}" id="${name}" required${attributes(name)}><option value="">Choose an option</option>${options.map(option => `<option${raw[name] === option ? " selected" : ""}>${escape(option)}</option>`).join("")}</select>${error(name)}`;
  const id = typeof raw.requestId === "string" && /^[0-9a-f-]{36}$/i.test(raw.requestId) ? raw.requestId : randomUUID();
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${result.status === "success" ? "Inquiry submitted" : "Your inquiry"} | RepairNox</title><style>body{margin:0;background:#fff;color:#111;font:16px/1.6 system-ui,sans-serif}main{max-width:640px;margin:48px auto;padding:0 24px}h1{font-size:36px;line-height:1.2;letter-spacing:-.04em}a{color:inherit;text-underline-offset:4px}label{display:block;margin-top:20px;font-weight:500}input,select,textarea{box-sizing:border-box;width:100%;font:inherit;padding:12px;border:1px solid #767676;border-radius:6px;background:#fff;color:#111}input[type=checkbox]{width:auto;margin-right:8px}button{min-height:44px;margin:24px 0;background:#111;color:#fff;border:0;border-radius:6px;padding:12px 24px;font:inherit;cursor:pointer}:focus-visible{outline:2px solid currentColor;outline-offset:4px}.notice{background:#f5f5f5;padding:20px;border-radius:8px}.error{font-size:14px;color:#a12121}nav{display:flex;flex-wrap:wrap;gap:20px;margin-top:32px}.trap{position:absolute;left:-10000px}</style></head><body><main><a href="/">RepairNox</a><h1>${result.status === "success" ? "Thanks for getting in touch" : "Tell us about your shop"}</h1><p class="notice" role="${result.status === "success" ? "status" : "alert"}">${escape(result.message)}</p>${result.status === "success" ? '<a href="/contact">Send another inquiry</a>' : `<form action="/api/demo" method="post"><input type="hidden" name="requestId" value="${escape(id)}"><div class="trap" aria-hidden="true"><label for="website">Leave this empty</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div>${input("fullName", "Full name", "text", true, "name")}${input("shopName", "Shop name", "text", true, "organization")}${input("email", "Your email", "email", true, "email")}${input("phone", "Phone", "tel", false, "tel")}${input("country", "Country", "text", false, "country-name")}${input("preferredCallback", "Preferred callback time & time zone", "text", false)}<p>We’ll confirm availability before scheduling your callback.</p>${select("industry", "Type of shop", contactIndustries)}${select("topic", "I’m asking about", contactTopics)}<label for="message">How can we help? *</label><textarea id="message" name="message" required minlength="10" maxlength="3000" rows="5"${attributes("message")}>${value("message")}</textarea>${error("message")}<label for="consent"><input type="checkbox" id="consent" name="consent" required${raw.consent === true ? " checked" : ""}${attributes("consent")}>I agree to be contacted about this inquiry. *</label>${error("consent")}<button type="submit">Send inquiry</button><p>Sending this form does not start a paid subscription.</p></form>`}<nav aria-label="Policies and support"><a href="/contact">Contact page</a><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/support">Support & Help</a></nav><p>Repairnox (operated by Zonoha Group) · repairnox.com</p></main></body></html>`;
}
