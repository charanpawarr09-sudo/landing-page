import { test } from "node:test";
import assert from "node:assert/strict";
import { handleContactRequest } from "./contact-endpoint";
import type { ContactInput } from "./contact-schema";
import { sendContactInquiry } from "./contact-sender";
import type { ContactSuccessEvent } from "./contact-service";
const origin = "https://repairnox.com";
const valid: ContactInput = { fullName: "Test Owner", shopName: "Example Repair", email: "owner@example.test", phone: "", country: "United States", preferredCallback: "Monday 2 PM US Eastern Time", industry: "Phone & computer repair", topic: "Free trial", message: "Please arrange a demo for my repair shop.", consent: true, website: "", requestId: "cadfcf78-50db-4a43-a262-0bf8a7400399" };
const request = (value: unknown = valid, path = "/api/demo", requestOrigin = origin) => new Request(origin + path, { method: "POST", headers: { Origin: requestOrigin, Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(value) });

test("only canonical same-origin POST reaches validated delivery", async () => {
  let sent = 0;
  const deps = { origins: [origin], send: async () => { sent++; return "accepted" as const; } };
  for (const path of ["/api/demo.ts", "/api/demo.json", "/api/demo/private", "/api/demo%2F", "/api/d%65mo"]) assert.equal((await handleContactRequest(request(valid, path), deps)).status, 404);
  assert.equal((await handleContactRequest(request(valid, "/api/demo", "https://other.example"), deps)).status, 403);
  for (const value of [{ ...valid, to: "relay@example.test" }, { ...valid, fullName: "" }, { ...valid, consent: false }, { ...valid, website: "spam" }, { ...valid, preferredCallback: "x\r\nBcc: other@example.test" }, { ...valid, message: "a".repeat(3001) }]) assert.equal((await handleContactRequest(request(value), deps)).status, 400);
  const large = new Request(origin + "/api/demo", { method: "POST", headers: { Origin: origin, Accept: "application/json", "Content-Type": "application/json" }, body: "x".repeat(33000) });
  assert.equal((await handleContactRequest(large, deps)).status, 413);
  assert.equal(sent, 0);
  assert.equal((await handleContactRequest(request(), deps)).status, 200);
  assert.equal(sent, 1);
});

test("only accepted provider responses yield success; retry IDs follow the content", async () => {
  const keys: string[] = [];
  const deps = { origins: [origin], send: async (_input: ContactInput, key: string) => { keys.push(key); return "accepted" as const; } };
  await handleContactRequest(request(), deps); await handleContactRequest(request(), deps);
  await handleContactRequest(request({ ...valid, message: "This is another question about shop setup." }), deps);
  assert.equal(keys[0], keys[1]); assert.notEqual(keys[1], keys[2]);
  for (const status of ["unavailable", "unconfirmed", "limited"] as const) {
    const response = await handleContactRequest(request(), { origins: [origin], send: async () => status });
    assert.equal(response.status, 503); assert.equal((await response.json()).status, "error");
  }
});

test("automotive and jewelry trial inquiries reach validated delivery", async () => {
  const received: string[] = [];
  for (const industry of ["Automotive repair", "Jewelry repair"] as const) {
    const response = await handleContactRequest(request({ ...valid, industry }), {
      origins: [origin], send: async input => { received.push(input.industry); return "accepted"; },
    });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).status, "success");
  }
  assert.deepEqual(received, ["Automotive repair", "Jewelry repair"]);
});

test("conversion events only follow accepted delivery and omit contact details", async () => {
  const events: ContactSuccessEvent[] = [];
  const onAccepted = (event: ContactSuccessEvent) => { events.push(event); };
  await handleContactRequest(request({ ...valid, consent: false }), { origins: [origin], send: async () => "accepted", onAccepted });
  await handleContactRequest(request(), { origins: [origin], send: async () => "unavailable", onAccepted });
  assert.equal(events.length, 0);
  const deps = { origins: [origin], send: async () => "accepted" as const, onAccepted };
  await handleContactRequest(request(), deps);
  await handleContactRequest(request(), deps);
  assert.equal(events.length, 2);
  assert.equal(events[0].eventId, events[1].eventId);
  assert.deepEqual(Object.keys(events[0]).sort(), ["event", "eventId", "industry", "topic"]);
  assert.equal(events[0].topic, "Free trial");
  const response = await handleContactRequest(request(), { ...deps, onAccepted: () => { throw new Error("measurement unavailable"); } });
  assert.equal(response.status, 200);
});

test("native and fetch forms retain validation context; native HTML escapes visitor text", async () => {
  let sent = 0;
  const deps = { origins: [origin], send: async () => { sent++; return "accepted" as const; } };
  const form = new URLSearchParams(Object.entries(valid).map(([key, value]) => [key, key === "consent" ? "on" : String(value)]));
  form.set("fullName", ""); form.set("shopName", '<script>alert("x")</script>');
  const response = await handleContactRequest(new Request(origin + "/api/demo", { method: "POST", headers: { Origin: origin }, body: form }), deps);
  const html = await response.text();
  assert.equal(response.status, 400); assert.match(response.headers.get("content-type")!, /text\/html/);
  assert.match(html, /Enter your full name/); assert.match(html, /Monday 2 PM US Eastern Time/);
  assert.ok(html.includes("&lt;script&gt;")); assert.ok(!html.includes('<script>alert("x")</script>')); assert.equal(sent, 0);
  const multipart = new FormData();
  for (const [key, value] of Object.entries(valid)) multipart.set(key, key === "consent" ? "on" : String(value));
  assert.equal((await handleContactRequest(new Request(origin + "/api/demo", { method: "POST", headers: { Origin: origin, Accept: "application/json" }, body: multipart }), deps)).status, 200);
  assert.equal(sent, 1);
  multipart.append("topic", "Advanced plan");
  assert.equal((await handleContactRequest(new Request(origin + "/api/demo", { method: "POST", headers: { Origin: origin, Accept: "application/json" }, body: multipart }), deps)).status, 400);
});

test("sender preserves private fixed routing and does not send without configuration", async t => {
  const savedRecipient = process.env.DEMO_RECIPIENT_EMAIL;
  const savedCopy = process.env.DEMO_CC_EMAIL;
  t.after(() => {
    if (savedRecipient === undefined) delete process.env.DEMO_RECIPIENT_EMAIL; else process.env.DEMO_RECIPIENT_EMAIL = savedRecipient;
    if (savedCopy === undefined) delete process.env.DEMO_CC_EMAIL; else process.env.DEMO_CC_EMAIL = savedCopy;
  });
  process.env.DEMO_RECIPIENT_EMAIL = "inbox@example.test";
  process.env.DEMO_CC_EMAIL = "copy@example.test";
  const previous = process.env.RESEND_API_KEY;
  t.after(() => { if (previous === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previous; });
  delete process.env.RESEND_API_KEY;
  let sent = 0;
  const transport: typeof fetch = async (_url, options) => {
    sent++;
    const body = JSON.parse(String(options?.body));
    assert.deepEqual(body.to, ["inbox@example.test"]); assert.deepEqual(body.cc, ["copy@example.test"]); assert.equal(body.reply_to, valid.email);
    assert.ok(body.text.includes(valid.preferredCallback)); assert.ok(options?.signal);
    assert.equal(new Headers(options?.headers).get("Idempotency-Key"), "test-key");
    return Response.json({ id: "fake-provider-id" });
  };
  assert.equal(await sendContactInquiry(valid, "test-key", transport), "unavailable"); assert.equal(sent, 0);
  process.env.RESEND_API_KEY = "fake-unit-test-key";
  delete process.env.DEMO_RECIPIENT_EMAIL;
  assert.equal(await sendContactInquiry(valid, "test-key", transport), "unavailable"); assert.equal(sent, 0);
  process.env.DEMO_RECIPIENT_EMAIL = "inbox@example.test";
  delete process.env.DEMO_CC_EMAIL;
  assert.equal(await sendContactInquiry(valid, "test-key", transport), "unavailable"); assert.equal(sent, 0);
  process.env.DEMO_CC_EMAIL = "copy@example.test";
  assert.equal(await sendContactInquiry(valid, "test-key", transport), "accepted"); assert.equal(sent, 1);
});
