export interface Industry {
  slug: string;
  name: string;
  title: string;
  description: string;
  introduction: string;
  workflow: { title: string; text: string }[];
  questions: { question: string; answer: string }[];
  fit: string;
}

export const industries: Industry[] = [
  {
    slug: "phone-repair", name: "Phone repair", title: "Phone Repair Shop Software",
    description: "Keep phone repair tickets, replacement parts, customer history, and checkout together with RepairNox. Explore the workflow and request a trial.",
    introduction: "A screen replacement can move quickly. The details around it still need a home: which phone came in, what the customer reported, who is doing the work, and what remains to be paid. RepairNox connects those everyday records in one workspace for the counter and repair bench.",
    workflow: [
      { title: "Give every device a clear repair ticket", text: "Keep the device details and reported fault with the diagnosis and repair status. When several similar phones are on the bench, a specific ticket gives the team a shared reference instead of relying on a verbal handoff." },
      { title: "Keep the part and the repair in context", text: "Use the parts inventory alongside repair work. A replacement display and a battery belong to specific device models; checking the item and its availability before promising a collection time helps the counter set a realistic expectation." },
      { title: "Keep customers connected to their repair history", text: "Customer records give returning visitors context. Review the previous work before opening a new ticket, and keep technician assignments and current status visible so the next person at the counter can follow the job." },
      { title: "Finish the job at checkout", text: "Bring the repair to checkout with its deposit and remaining balance in view. Invoices and transaction history keep a record of the sale, including accessories sold alongside the service. Card payments depend on your configured terminal." },
    ],
    questions: [
      { question: "Is this for phone repair operations or repairing a phone itself?", answer: "RepairNox manages shop records and workflow. It is not a device diagnostic, unlocking, or data recovery tool." },
      { question: "Can the same shop manage computer repairs?", answer: "The platform brings repair tickets, parts, customers, and checkout together. If your team handles both phones and computers, walk through both types of job during your trial discussion." },
    ],
    fit: "Bring a typical screen replacement and an accessory sale to your trial discussion. Ask the team to demonstrate your intake details, deposit handling, receipt, and existing payment setup before deciding.",
  },
  {
    slug: "computer-repair", name: "Computer repair", title: "Computer Repair Shop Software",
    description: "Manage computer repair tickets, technician handoffs, parts, customer records, and checkout with RepairNox. Discuss your laptop and desktop repair workflow.",
    introduction: "Computer repairs often span several conversations: the original problem, the diagnosis, a part that needs ordering, and the collection call. RepairNox keeps the job, customer, inventory, and sale connected so the counter and technician have a common record to work from.",
    workflow: [
      { title: "Separate the reported problem from the diagnosis", text: "A laptop that will not start can have several possible causes. Keep the customer's description with the device record, then add the diagnosis to the repair ticket. The next technician can pick up the context without asking the customer to repeat it." },
      { title: "Make technician handoffs easier to follow", text: "Use assignments and repair status to show who is handling the work and where the job stands. A battery replacement waiting for a part needs a different next step from a computer ready for collection." },
      { title: "Keep replacement parts in the shop workflow", text: "Connect the inventory conversation to the job at hand. Confirm compatibility and availability before setting expectations about completion. Inventory records and repair tickets give the team a place to check the practical details." },
      { title: "Keep a customer record beyond collection", text: "Customer history and transaction records remain useful when a visitor returns with another machine or a question about a previous service. Finish the repair at checkout and keep the invoice with the sale rather than reconstructing it later." },
    ],
    questions: [
      { question: "Does RepairNox include remote access or diagnostic utilities?", answer: "These pages describe shop management: tickets, parts, customers, and checkout. Do not assume that remote access, antivirus, or diagnostic tools are included; discuss any required integrations before choosing a plan." },
      { question: "What should I test before moving my computer repair business?", answer: "Walk through a real intake, technician handoff, part replacement, deposit, and final invoice. Ask about your existing data and hardware so the proposed setup matches your shop." },
    ],
    fit: "Use a laptop repair that takes more than one visit as your trial example. Include the initial fault, part requirement, customer history, and final collection so you can assess the entire handoff.",
  },
  {
    slug: "automotive-repair", name: "Automotive repair", title: "Shop Management Software for Automotive Repair",
    description: "Explore RepairNox for automotive repair job tracking, parts, customer records, and checkout. Discuss your garage workflow and specialist requirements.",
    introduction: "An independent garage needs a clear view of the work promised, the person responsible, the parts involved, and the balance at collection. Explore RepairNox's shared repair-shop workflow, then discuss the vehicle-specific requirements your garage needs before choosing a setup.",
    workflow: [
      { title: "Keep the job and the customer together", text: "A repair ticket gives the counter and workshop a shared reference for the reported issue, diagnosis, assignment, and status. Keep the description specific enough that another member of the team can understand the next step." },
      { title: "Keep parts visible alongside the work", text: "The parts conversation affects both completion time and cost. Review inventory and job details together before giving the customer an expectation. A shared record helps the counter distinguish work in progress from a job waiting for a part." },
      { title: "Follow the handoff through to collection", text: "Technician assignments and repair status help answer the everyday question: where does this job stand? Keep the customer history close so a returning customer does not have to start every conversation from the beginning." },
      { title: "Account for the final sale", text: "Review the repair, deposit, and remaining balance at checkout. Keep invoices and transaction history available for later questions. Confirm your payment terminal and receipt requirements as part of the setup discussion." },
    ],
    questions: [
      { question: "Does this page promise VIN decoding or labor-time databases?", answer: "No. The workflow described here covers shared shop management. VIN decoding, vehicle fitment, diagnostic integrations, labor guides, and inspection systems need explicit confirmation from the RepairNox team." },
      { question: "How should a garage evaluate the fit?", answer: "Use one complete job as a demonstration: intake, diagnosis, parts, technician handoff, and payment. List any specialist automotive tools you already use and ask how those requirements would be handled." },
    ],
    fit: "Tell us which vehicle details, estimates, integrations, and workshop documents are essential to your garage. The fit discussion should establish what is supported before you move your operation.",
  },
  {
    slug: "jewelry-repair", name: "Jewelry repair", title: "Shop Management Software for Jewelry Repair",
    description: "Explore repair ticket tracking, customer history, parts, and checkout for jewelry repair work. Discuss item records and specialist requirements with RepairNox.",
    introduction: "A jewelry repair passes between the customer, counter, and bench. Clear job details matter at every handoff. Explore RepairNox's shared ticket, customer, inventory, and checkout workflow, and discuss the specialist records your jewelry business needs before choosing a setup.",
    workflow: [
      { title: "Start with a clear description of the job", text: "Keep the customer's request and the work to be discussed in one repair record. A ring resize and a clasp replacement need different instructions; a specific description helps the person receiving the job understand what the customer expects." },
      { title: "Give the counter and bench a shared status", text: "Assignments and repair status help the team follow a job through the workday. When a customer asks for an update, a shared ticket is a clearer starting point than trying to find the last person who handled the item." },
      { title: "Keep materials and customer context close", text: "Review inventory records alongside the repair and keep the customer history accessible. Returning customers may have previous service questions, so the link between the customer, work, and transaction matters beyond the day of collection." },
      { title: "Close the loop at collection", text: "Check the work and the outstanding balance before finishing checkout. Repair-linked deposits, invoices, and transaction history provide a financial record of the sale. Confirm your receipt and payment setup during the fit discussion." },
    ],
    questions: [
      { question: "Are gemstone tracking and valuation features included?", answer: "This page describes shared repair-shop workflow. Gemstone identification, valuations, weight tracking, custody documentation, and specialist jewelry integrations must be confirmed separately with the RepairNox team." },
      { question: "What should a jewelry store bring to a demonstration?", answer: "Bring an example job and the intake, item identification, approval, custody, and collection records you require. Ask the team to demonstrate how your essential requirements would be met before changing systems." },
    ],
    fit: "Your item identification and custody requirements deserve a specific discussion. Share a typical repair and the documents you use so that the trial conversation can establish the fit for your store.",
  },
];
