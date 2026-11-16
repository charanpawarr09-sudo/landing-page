export type RepairCategory =
  | "Screen Repair"
  | "Battery Swap"
  | "Water Damage"
  | "Quick Accessories";
export type RepairStatus = "In Progress" | "Ready for Pickup" | "Diagnosing";
export interface MarketingTicket {
  id: number;
  device: string;
  issue: string;
  category: RepairCategory;
  technician: string;
  initials: string;
  duration: string;
  status: RepairStatus;
  image: string;
  kind: "phone" | "laptop" | "board" | "accessory";
  customer: string;
  serial: string;
  price: number;
}
export const repairCategories: RepairCategory[] = [
  "Screen Repair",
  "Battery Swap",
  "Water Damage",
  "Quick Accessories",
];
export const marketingTickets: MarketingTicket[] = [
  {
    id: 1042,
    device: "iPhone 15 Pro",
    issue: "Cracked OLED screen",
    category: "Screen Repair",
    technician: "Alex Morgan",
    initials: "AM",
    duration: "25 mins",
    status: "In Progress",
    image: "marquee-screen-iphone15pro",
    kind: "phone",
    customer: "Jamie Parker",
    serial: "DEMO-15P-1042",
    price: 149,
  },
  {
    id: 1043,
    device: "Galaxy S24 Ultra",
    issue: "Display replacement",
    category: "Screen Repair",
    technician: "Sam Rivera",
    initials: "SR",
    duration: "35 mins",
    status: "Ready for Pickup",
    image: "marquee-screen-s24ultra",
    kind: "phone",
    customer: "Taylor Lee",
    serial: "DEMO-S24-1043",
    price: 179,
  },
  {
    id: 1044,
    device: "iPhone 13",
    issue: "A fresh start. A fresh battery.",
    category: "Battery Swap",
    technician: "Alex Morgan",
    initials: "AM",
    duration: "20 mins",
    status: "In Progress",
    image: "marquee-battery-iphone13",
    kind: "phone",
    customer: "Robin Ellis",
    serial: "DEMO-IP13-1044",
    price: 69,
  },
  {
    id: 1045,
    device: "MacBook Air M2",
    issue: "Battery replacement",
    category: "Battery Swap",
    technician: "Chris Kim",
    initials: "CK",
    duration: "45 mins",
    status: "Diagnosing",
    image: "marquee-battery-macbookair",
    kind: "laptop",
    customer: "Avery James",
    serial: "DEMO-MBA-1045",
    price: 199,
  },
  {
    id: 1046,
    device: "iPad Pro",
    issue: "Liquid damage diagnostics",
    category: "Water Damage",
    technician: "Sam Rivera",
    initials: "SR",
    duration: "60 mins",
    status: "Diagnosing",
    image: "marquee-board-liquidclean",
    kind: "board",
    customer: "Casey Chen",
    serial: "DEMO-IPAD-1046",
    price: 89,
  },
  {
    id: 1047,
    device: "The everyday essentials",
    issue: "Tempered glass + 30W charger",
    category: "Quick Accessories",
    technician: "Chris Kim",
    initials: "CK",
    duration: "2 mins",
    status: "Ready for Pickup",
    image: "marquee-retail-bundle",
    kind: "accessory",
    customer: "Jordan Avery",
    serial: "DEMO-ACC-1047",
    price: 39,
  },
];
export const heroIconSets = [
  [
    { name: "iPhone 16 Pro", file: "hero-device-iphone", kind: "phone" },
    { name: "MacBook Pro", file: "hero-device-macbook", kind: "laptop" },
    { name: "iPad Pro", file: null, kind: "tablet" },
    { name: "Galaxy S24 Ultra", file: null, kind: "phone" },
  ],
  [
    {
      name: "OLED replacement screen",
      file: "hero-part-screen",
      kind: "screen",
    },
    { name: "Fresh battery", file: null, kind: "battery" },
    { name: "Precision repair tools", file: null, kind: "tools" },
    { name: "Repair ticket", file: null, kind: "ticket" },
  ],
  [
    { name: "Cash register", file: null, kind: "cash" },
    { name: "30-second intake", file: null, kind: "speed" },
    { name: "Private passcode vault", file: null, kind: "vault" },
    { name: "Five-star reviews", file: null, kind: "review" },
  ],
] as const;
export const demoSteps = [
  {
    title: "Quick customer drop-off",
    detail:
      "Find a returning customer by phone. Their history is already here.",
    short: "Customer",
  },
  {
    title: "Parts reserved. Passcode secured.",
    detail: "Pick a device and issue. Reserve its part and mask its lock code.",
    short: "Device & issue",
  },
  {
    title: "Claim tag printed. You're ready.",
    detail: "Hand over a claim tag. The technician gets a clear work order.",
    short: "Claim tag",
  },
] as const;
