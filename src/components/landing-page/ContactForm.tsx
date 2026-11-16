"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { submitLandingInquiry } from "@/lib/landing-contact-client";
import { contactIndustries, contactTopics, initialContactResult, type ContactField, type ContactFormValues, type ContactTopic, type ContactResult } from "@/lib/contact-schema";
import Link from "next/link";
import shared from "./landing-page.module.css";
import styles from "./contact-page.module.css";

export function ContactForm({ initialTopic = "Product question", initialRequestId }: { initialTopic?: ContactTopic; initialRequestId: string }) {
  const [form, setForm] = useState({ revision: 0, id: initialRequestId });
  return <ContactFormFields key={form.revision} initialTopic={initialTopic} initialRequestId={form.id} reset={() => setForm(current => ({ revision: current.revision + 1, id: crypto.randomUUID() }))} />;
}

function ContactFormFields({ initialTopic, initialRequestId, reset }: { initialTopic: ContactTopic; initialRequestId: string; reset: () => void }) {
  const [response, setResponse] = useState<ContactResult>(initialContactResult);
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);
  async function action(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const data = new FormData(event.currentTarget);
    submitting.current = true;
    setHideErrors(false);
    setPending(true);
    try { setResponse(await submitLandingInquiry(data)); }
    finally { submitting.current = false; setPending(false); }
  }
  const [requestId, setRequestId] = useState(response.requestId ?? initialRequestId);
  const [hideErrors, setHideErrors] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const [draftValues, setDraftValues] = useState<ContactFormValues>({ fullName: "", shopName: "", email: "", phone: "", country: "", preferredCallback: "", industry: "", topic: initialTopic, message: "", consent: false });
  const values = !hasEdited && response.values ? response.values : draftValues;

  useEffect(() => {
    if (response.status !== "idle") summary.current?.focus();
  }, [response]);

  const errors = hideErrors ? undefined : response.errors;
  const error = (field: ContactField) => errors?.[field] ? <span id={`contact-${field}-error`} className={styles.fieldError}>{errors[field]}</span> : null;
  const attributes = (field: ContactField) => ({
    "aria-invalid": Boolean(errors?.[field]) || undefined,
    "aria-describedby": errors?.[field] ? `contact-${field}-error` : undefined,
  });
  const update = (field: keyof typeof values, value: string | boolean) => {
    setDraftValues(current => ({ ...(!hasEdited && response.values ? response.values : current), [field]: value }));
    setHasEdited(true);
    setRequestId(crypto.randomUUID());
    setHideErrors(true);
  };

  if (response.status === "success") return (
    <div ref={summary} className={styles.success} role="status" tabIndex={-1}>
      <span className={styles.successIcon}><Check size={24} aria-hidden="true" /></span>
      <h2>Thanks for getting in touch</h2><p>{response.message}</p>
      <button type="button" onClick={reset} className={shared.button}>Send another inquiry <ArrowUpRight size={17} aria-hidden="true" /></button>
    </div>
  );

  return (
    <form action="/api/demo" method="post" className={styles.form} onSubmit={action}>
      <div className={styles.formIntro}><h2>Tell us about your shop</h2><p>Share a few details and what you’d like to discuss.</p></div>
      {response.status === "error" && !hideErrors ? <div ref={summary} tabIndex={-1} role="alert" className={styles.errorSummary}><strong>We couldn’t submit your inquiry</strong><p>{response.message}</p>{errors ? <ul>{Object.entries(errors).filter(([field]) => field !== "website" && field !== "requestId").map(([field, message]) => <li key={field}><a href={`#contact-${field}`}>{message}</a></li>)}</ul> : null}</div> : null}
      <input type="hidden" name="requestId" value={!hasEdited && response.requestId ? response.requestId : requestId} />
      <div className={styles.honeypot} aria-hidden="true"><label htmlFor="contact-website">Leave this empty</label><input name="website" id="contact-website" tabIndex={-1} autoComplete="off" /></div>
      <fieldset disabled={pending} className={styles.fields}>
        <div className={styles.field}><label htmlFor="contact-fullName">Full name <span aria-hidden="true">*</span></label><input id="contact-fullName" name="fullName" autoComplete="name" required minLength={2} maxLength={100} value={values.fullName} onChange={event => update("fullName", event.target.value)} {...attributes("fullName")} />{error("fullName")}</div>
        <div className={styles.field}><label htmlFor="contact-shopName">Shop name <span aria-hidden="true">*</span></label><input id="contact-shopName" name="shopName" autoComplete="organization" required minLength={2} maxLength={160} value={values.shopName} onChange={event => update("shopName", event.target.value)} {...attributes("shopName")} />{error("shopName")}</div>
        <div className={styles.field}><label htmlFor="contact-email">Your email <span aria-hidden="true">*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={event => update("email", event.target.value)} {...attributes("email")} />{error("email")}</div>
        <div className={styles.field}><label htmlFor="contact-phone">Phone <span className={styles.optional}>(optional)</span></label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Include your country code" value={values.phone} onChange={event => update("phone", event.target.value)} {...attributes("phone")} />{error("phone")}</div>
        <div className={styles.field}><label htmlFor="contact-country">Country <span className={styles.optional}>(optional)</span></label><input id="contact-country" name="country" autoComplete="country-name" maxLength={80} placeholder="e.g. United States" value={values.country} onChange={event => update("country", event.target.value)} {...attributes("country")} />{error("country")}</div>
        <div className={styles.field}><label htmlFor="contact-preferredCallback">Preferred callback time & time zone <span className={styles.optional}>(optional)</span></label><input id="contact-preferredCallback" name="preferredCallback" maxLength={160} placeholder="e.g. Monday, 2 PM US Eastern Time" value={values.preferredCallback} onChange={event => update("preferredCallback", event.target.value)} {...attributes("preferredCallback")} />{error("preferredCallback")}<span className={styles.optional}>We’ll confirm availability before scheduling your callback.</span></div>
        <div className={styles.selectRow}>
          <div className={styles.field}><label htmlFor="contact-industry">Type of shop <span aria-hidden="true">*</span></label><select id="contact-industry" name="industry" required value={values.industry} onChange={event => update("industry", event.target.value)} {...attributes("industry")}><option value="" disabled>Select your industry</option>{contactIndustries.map(value => <option key={value}>{value}</option>)}</select>{error("industry")}</div>
          <div className={styles.field}><label htmlFor="contact-topic">I’m asking about <span aria-hidden="true">*</span></label><select id="contact-topic" name="topic" required value={values.topic} onChange={event => update("topic", event.target.value)} {...attributes("topic")}>{contactTopics.map(value => <option key={value}>{value}</option>)}</select>{error("topic")}</div>
        </div>
        <div className={styles.field}><label htmlFor="contact-message">How can we help? <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" required minLength={10} maxLength={3000} rows={5} placeholder="Tell us about your shop and what you need" value={values.message} onChange={event => update("message", event.target.value)} {...attributes("message")} />{error("message")}</div>
        <div><label className={styles.consent} htmlFor="contact-consent"><input type="checkbox" id="contact-consent" name="consent" required checked={values.consent} onChange={event => update("consent", event.target.checked)} {...attributes("consent")} /><span>I agree to be contacted about this inquiry.</span></label>{error("consent")}</div>
        <div className={styles.formActions}><button type="button" onClick={reset} className={styles.reset}>Reset</button><button type="submit" className={shared.button} disabled={pending}>{pending ? <>Submitting <Loader2 size={17} className={styles.spinner} aria-hidden="true" /></> : <>Send inquiry <ArrowUpRight size={17} aria-hidden="true" /></>}</button></div>
        <p className={styles.requiredNote}>* Required fields. Sending this form does not start a paid subscription. See our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>.</p>
      </fieldset>
    </form>
  );
}
