import type { ContactResult } from "./contact-schema";

export async function submitLandingInquiry(data: FormData): Promise<ContactResult> {
  try {
    const response = await fetch("/api/demo", {
      method: "POST", body: data, headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15_000),
    });
    if (response.status === 429) return { status: "error", message: "Too many requests. Please wait a while before trying again. Your details are still here." };
    const result: unknown = await response.json();
    if (result && typeof result === "object" && "status" in result && "message" in result &&
        (result.status === "error" || (result.status === "success" && response.ok)) && typeof result.message === "string") {
      return result as ContactResult;
    }
  } catch {
    // Keep the same request ID for retries: a timeout may follow provider acceptance.
  }
  return { status: "error", message: "We couldn’t confirm submission. Your details are still here. Please retry with the same details." };
}
