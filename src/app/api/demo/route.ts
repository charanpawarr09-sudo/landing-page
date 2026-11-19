import { handleContactRequest } from "@/lib/contact-endpoint";
import { sendContactInquiry } from "@/lib/contact-sender";
export const runtime = "nodejs";
export const maxDuration = 20;
const origins = ["https://repairnox.com", "https://www.repairnox.com", "https://repairnox-landing.vercel.app"];
if (process.env.VERCEL_URL) origins.push(`https://${process.env.VERCEL_URL}`);
if (!process.env.VERCEL) origins.push("http://localhost:3100", "http://127.0.0.1:3100");
export const POST = (request: Request) => handleContactRequest(request, { origins, send: sendContactInquiry, onAccepted: event => console.info(JSON.stringify(event)) });
export const GET = () => Response.json({ status: "error", message: "Use the contact form to submit an inquiry." }, { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } });
