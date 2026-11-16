import { z } from "zod";

export const contactIndustries = ["Phone & tablet repair", "Computer repair", "Phone & computer repair", "Parts & accessories", "Other"] as const;
export const contactTopics = ["Product question", "Free trial", "Pricing & plans", "Advanced plan"] as const;
export type ContactTopic = typeof contactTopics[number];
const singleLine = (max: number) => z.string().trim().max(max).refine(value => !/[\u0000-\u001f\u007f]/.test(value), "Use a single line of text.");
export const contactSchema = z.object({
  fullName: singleLine(100).pipe(z.string().min(2, "Enter your full name.")),
  shopName: singleLine(160).pipe(z.string().min(2, "Enter your shop name.")),
  email: singleLine(254).pipe(z.email("Enter a valid email address.")),
  phone: singleLine(40).refine(value => !value || /^[+\d\s().-]{7,40}$/.test(value), "Enter a valid phone number or leave it blank."),
  country: singleLine(80).default(""),
  preferredCallback: singleLine(160).default(""),
  industry: z.enum(contactIndustries, { error: "Choose your type of shop." }),
  topic: z.enum(contactTopics, { error: "Choose an inquiry topic." }),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(3000, "Keep your message under 3,000 characters.").refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value), "Remove unsupported characters from your message."),
  consent: z.literal(true, { error: "Please confirm we may contact you about this inquiry." }),
  website: z.literal(""),
  requestId: z.union([z.uuid(), z.literal("")]),
}).strict();
export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export interface ContactFormValues {
  fullName: string; shopName: string; email: string; phone: string;
  country: string; preferredCallback: string;
  industry: string; topic: string; message: string; consent: boolean;
}
export interface ContactResult {
  status: "idle" | "error" | "success";
  message: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: ContactFormValues;
  requestId?: string;
}
export const initialContactResult: ContactResult = { status: "idle", message: "" };
