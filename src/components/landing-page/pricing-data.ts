// Marketing plan presentation, not subscription entitlements. Keep prices and
// comparison rows together; the application currently has no plan billing flow.
export const pricingPlans = [
  {
    id: "essential",
    name: "Essential",
    number: "01",
    price: "29.99",
    description: "The everyday tools for a well-run repair counter.",
    summary: "Start with the essentials",
    features: ["Repair tickets & estimates", "POS checkout & invoices", "Customers & appointments", "Parts inventory & stock alerts"],
  },
  {
    id: "growth",
    name: "Growth",
    number: "02",
    price: "49.99",
    description: "A closer view of your team and your shop’s performance.",
    summary: "Everything in Essential, plus",
    features: ["Employee timeclock", "Monthly payment reports", "Daily payment breakdowns", "Cash, card, refund & tax summaries"],
  },
  {
    id: "advanced",
    name: "Customized",
    number: "03",
    price: null,
    description: "Have a particular setup in mind? Start with your shop’s needs.",
    summary: "Build on the complete platform",
    features: ["Everything in Growth", "Review your shop’s requirements", "Define the scope of your setup", "Pricing based on the agreed scope"],
  },
] as const;

type ComparisonValue = boolean | string;
interface ComparisonGroup {
  name: string;
  rows: { name: string; values: readonly [ComparisonValue, ComparisonValue, ComparisonValue] }[];
}

export const comparisonGroups: ComparisonGroup[] = [
  {
    name: "Repair workflow & customers",
    rows: [
      { name: "Repair tickets & estimates", values: [true, true, true] },
      { name: "Diagnosis notes & technician assignment", values: [true, true, true] },
      { name: "Repair status tracking", values: [true, true, true] },
      { name: "Customer records & repair history", values: [true, true, true] },
      { name: "Appointment scheduling", values: [true, true, true] },
    ],
  },
  {
    name: "Checkout & payments",
    rows: [
      { name: "POS checkout", values: [true, true, true] },
      { name: "Repair-linked checkout & deposits", values: [true, true, true] },
      { name: "Invoices & transaction history", values: [true, true, true] },
      { name: "Cash payment recording", values: [true, true, true] },
      { name: "Poynt card-terminal connection", values: ["Separate setup", "Separate setup", "Separate setup"] },
    ],
  },
  {
    name: "Inventory & parts",
    rows: [
      { name: "Parts & accessory inventory", values: [true, true, true] },
      { name: "Item categories & stock quantities", values: [true, true, true] },
      { name: "Low-stock thresholds", values: [true, true, true] },
      { name: "Stock adjustments & restocking", values: [true, true, true] },
    ],
  },
  {
    name: "Your team & business",
    rows: [
      { name: "Employee accounts & role permissions", values: [true, true, true] },
      { name: "Employee timeclock", values: [false, true, true] },
      { name: "Owner & admin monthly reports", values: [false, true, true] },
      { name: "Daily payment breakdowns", values: [false, true, true] },
      { name: "Cash, card, refund & tax summaries", values: [false, true, true] },
    ],
  },
  {
    name: "Your workspace",
    rows: [
      { name: "Tablet, laptop & desktop access", values: [true, true, true] },
      { name: "Separate shop accounts & data", values: [true, true, true] },
      { name: "Custom scope & pricing", values: [false, false, "By agreement"] },
    ],
  },
];

export const includedFeatures = [
  "Repair tickets & estimates",
  "Customer records & history",
  "Appointments",
  "POS checkout",
  "Repair deposits",
  "Invoices & transactions",
  "Parts & accessories inventory",
  "Stock alerts & adjustments",
  "Employee permissions",
] as const;

export const pricingQuestions = [
  { title: "Which plan should I choose?", answer: "Essential covers the repair counter: tickets, customers, inventory, and checkout. Growth adds employee timeclock and payment reporting for owners and admins. Customized is for discussing a specific setup and agreeing its scope and price." },
  { title: "How are the prices shown?", answer: "Essential is $29.99 per month and Growth is $49.99 per month, in US dollars. Customized has custom pricing. Payments are arranged manually with our team. No annual discount is currently listed." },
  { title: "How does the free trial work?", answer: "Use Start free trial to open our demo inquiry form. We’ll arrange a 15–20 minute live demo for your shop. After the demo, our team provisions access credentials and a sandbox trial environment. Payments for any paid plan are arranged manually during official onboarding." },
  { title: "How do I ask about Customized pricing?", answer: "Select Contact us on the Customized plan to open our inquiry form. Share your shop name, contact details, and what you need so we can discuss the scope and custom pricing." },
  { title: "Does the plan price include a card terminal?", answer: "The software supports a configured Poynt card-terminal connection. Terminal hardware, payment processing, and provider setup are separate from the software plan shown here. The connection needs to be configured for your shop before use." },
  { title: "Is Customized for managing multiple locations?", answer: "RepairNox provides separate accounts and data for independent shops. Consolidated multi-location or franchise management is not part of the current offering. Customized starts with a review of your requirements; additional capabilities need an agreed scope." },
  { title: "Can my team use RepairNox on a phone?", answer: "The shop application is designed for tablets, laptops, and desktops. The public website and pricing page can be viewed on a phone, but the POS workspace is built for a larger screen." },
] as const;
