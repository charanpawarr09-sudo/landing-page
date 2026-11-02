export type GuideSection = {
  heading: string;
  paragraphs: readonly string[];
  checklist?: readonly string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  sections: readonly GuideSection[];
};

export const guides: readonly Guide[] = [
  {
    slug: "repair-ticket-intake-checklist",
    title: "A repair intake checklist your team can repeat.",
    description:
      "Give every device a clear starting point: the customer, the issue, what arrived and what happens next.",
    category: "Front desk",
    readTime: "4 min read",
    sections: [
      {
        heading: "Start with one job reference",
        paragraphs: [
          "A busy counter is an easy place to lose a small detail. Give each repair one ticket reference before the device moves to the bench, and use that reference on its label and in every later note. A customer name alone is not enough when the same person leaves two devices.",
          "Read the contact details back to the customer. Ask how they want to receive updates and record that preference. A clear number and an agreed contact method are more useful than guessing which message they will see.",
        ],
        checklist: [
          "Create one ticket for this repair.",
          "Confirm the customer's name and contact details.",
          "Record the preferred way to share updates.",
        ],
      },
      {
        heading: "Record exactly what arrived",
        paragraphs: [
          "Identify the model and any identifier your shop normally uses. Describe the visible condition without assuming the cause of damage. Write “cracked lower-left corner” rather than deciding how the crack happened. Record accessories separately so pickup staff know what belongs with the job.",
          "Keep the physical device and the ticket connected. Apply a label where it will remain readable and will not damage the device. Use the same reference for a case, charger or other item accepted with it.",
        ],
        checklist: [
          "Confirm device type, model and identifying details.",
          "Note visible damage and missing components.",
          "List any accessories left with the device.",
          "Label the device and accepted accessories.",
        ],
      },
      {
        heading: "Separate the symptom from the diagnosis",
        paragraphs: [
          "Write the customer's description before adding your own assessment. Ask when the issue started, whether it is constant and what they have already tried. If you can reproduce it safely at the counter, record what you observed. If you cannot, say so; “not reproduced at intake” is clearer than a confident guess.",
          "Avoid collecting information that the job does not require. Use your shop's approved process for device access and customer data. Do not place passwords or unrelated personal information in a general ticket note.",
        ],
        checklist: [
          "Capture the customer's main concern in plain language.",
          "Distinguish reported symptoms from observed symptoms.",
          "Record any checks already completed at intake.",
        ],
      },
      {
        heading: "Agree on the next action",
        paragraphs: [
          "Explain whether the next step is a diagnosis, a quote or an already agreed repair. Record the agreed scope, any estimate or deposit, and how further work will be authorized under your shop's process. Treat a requested completion date separately from a confirmed commitment.",
          "Before the customer leaves, summarize what you accepted and when they should expect the next update. Give them their ticket reference so another staff member can find the same job without starting the conversation again.",
        ],
        checklist: [
          "Record the agreed next step and any approval needed.",
          "Record any quote, deposit or existing payment clearly.",
          "Set an owner for the next customer update.",
          "Give the customer the ticket reference.",
        ],
      },
      {
        heading: "Make the first handoff explicit",
        paragraphs: [
          "Move the device to a named location and assign the next action to a person. A note saying “on bench” is less useful than a ticket that identifies who will inspect it and where it is stored. At the end of the shift, review new tickets that still have no owner or next action.",
        ],
        checklist: [
          "Record where the device is waiting.",
          "Assign the next action to a team member.",
          "Check that the ticket and device references match.",
        ],
      },
    ],
  },
  {
    slug: "repair-parts-inventory-routine",
    title: "A practical routine for repair parts inventory.",
    description:
      "Keep physical parts and stock records aligned with a repeatable receive, use, count and reorder routine.",
    category: "Parts inventory",
    readTime: "4 min read",
    sections: [
      {
        heading: "Give each part a clear identity",
        paragraphs: [
          "Start with the parts your bench reaches for most often. Use a consistent name, an internal SKU and a shelf or bin location for each item. Similar-looking screens, batteries and connectors need enough detail to distinguish their model, version or compatibility. Keep supplier references separate when they differ from your own SKU.",
          "Choose a naming pattern the whole team can follow. A readable label is more useful than an elaborate code that only one person understands. Place the label on the bin as well as the stock record, and separate items that are easy to confuse.",
        ],
        checklist: [
          "Use one internal SKU for each distinct item.",
          "Record model and compatibility details your bench needs.",
          "Give the item a labelled shelf or bin.",
        ],
      },
      {
        heading: "Receive parts before they reach the shelf",
        paragraphs: [
          "When a delivery arrives, compare what is actually in the box with the order. Count units, check item identities and note damaged or missing items before changing stock quantities. Keep uncertain or faulty stock apart from parts ready for use so it is not picked accidentally.",
          "Record the received quantity once, then put the parts in their assigned location. If several people can receive deliveries, make ownership explicit. A box left by the counter with no receiving note can become either missing stock or stock counted twice.",
        ],
        checklist: [
          "Match the delivery to the correct order and SKU.",
          "Count usable units and set exceptions aside.",
          "Record the quantity received and who checked it.",
          "Put accepted stock in its labelled location.",
        ],
      },
      {
        heading: "Connect parts usage to the job",
        paragraphs: [
          "When a technician takes a part, record which repair it is for using the shop's normal stock process. Do this close to the movement, while the details are clear. A pile of empty packaging at closing time is a difficult way to reconstruct which parts went into which devices.",
          "Agree how your team handles a part that was picked but not used, a faulty new part or an item waiting to be returned. These movements are different from a completed repair. Do not silently put a questionable part back into the ready-to-use bin.",
        ],
        checklist: [
          "Record parts used against the relevant ticket.",
          "Keep unused, faulty and return stock distinguishable.",
          "Record corrections with a clear reason.",
        ],
      },
      {
        heading: "Count a small, useful group regularly",
        paragraphs: [
          "Choose a manageable group of frequently used or easily confused parts for a regular physical count. Count the shelf first, compare it with the record and investigate differences. Check recent deliveries, repair usage and returns before making an adjustment. The aim is an explainable quantity, not simply making two numbers match.",
          "Record what you counted and any correction made. Repeated differences on the same SKU are a signal to inspect the handling routine or bin labels, rather than asking staff to remember more carefully.",
        ],
        checklist: [
          "Choose a small group of priority SKUs.",
          "Compare physical quantities with recorded quantities.",
          "Investigate differences before adjusting the record.",
        ],
      },
      {
        heading: "Make reordering a review, not a guess",
        paragraphs: [
          "Review low-stock items alongside the jobs waiting for parts and orders already placed. Set practical minimum quantities using your own usage and supplier lead times; a slow-moving specialist part may need a different rule from a common battery. Assign one person to decide what to order and record the decision so another shift does not duplicate it.",
        ],
        checklist: [
          "Check low stock and repairs waiting for parts.",
          "Review incoming orders before buying again.",
          "Give each reorder decision a clear owner.",
        ],
      },
    ],
  },
  {
    slug: "repair-technician-handoff-checklist",
    title: "Make every technician handoff clear.",
    description:
      "A simple handoff routine that tells the next person what happened, what is waiting and who owns the next move.",
    category: "Team workflow",
    readTime: "4 min read",
    sections: [
      {
        heading: "Hand over a ticket, not a memory",
        paragraphs: [
          "A repair handoff should work even when the person who started the job has gone home. Keep the ticket reference with the device and use the same record for the customer concern, checks completed and current status. Avoid making an important instruction depend on a private message or a conversation across the shop.",
          "At each handoff, identify the person responsible for the next action. Ownership does not mean they must do every task; it means the team knows who will move the job forward or ask for help when it is blocked.",
        ],
        checklist: [
          "Match the ticket reference to the physical device.",
          "Keep the current notes on the shared job record.",
          "Name the person responsible for the next action.",
        ],
      },
      {
        heading: "Write the smallest complete update",
        paragraphs: [
          "A useful note answers three questions: what did you check, what did you find and what should happen next? Record a result clearly enough that the next technician does not repeat a test simply to discover what you meant. Separate confirmed findings from a possible cause that still needs checking.",
          "For example, “tested with known-good charging cable; no charge response; inspect charge port next” is more actionable than “charging issue.” Keep the update focused on the repair and use terms the counter team can explain without translating a string of abbreviations.",
        ],
        checklist: [
          "List the relevant checks already completed.",
          "State the result, including anything not reproduced.",
          "Write one clear next action.",
        ],
      },
      {
        heading: "Make a blocked job easy to understand",
        paragraphs: [
          "If work has stopped, record why. Waiting for a part, waiting for customer approval and waiting for a technician are different problems. Note what must happen before the repair can continue and who owns that follow-up. Change the status when the situation changes so the queue remains useful.",
          "Keep the physical device somewhere the next shift can find it. If a part has been picked, state whether it is with the device or still in stock. Follow your shop's normal parts routine rather than relying on an unlabelled item placed beside a bench.",
        ],
        checklist: [
          "Record the specific reason work is waiting.",
          "Name the next follow-up and its owner.",
          "Record the device location and relevant part details.",
        ],
      },
      {
        heading: "Give the counter a pickup-ready summary",
        paragraphs: [
          "Before marking a job ready for pickup, record the work completed and the checks your team performed. State any remaining issue or agreed limitation clearly. The person speaking to the customer should not need to interrupt the bench to work out what the shop has done.",
          "Check the recorded quote, deposits and any remaining balance through your normal checkout process. Keep repair completion, customer notification, payment and physical collection distinct: a repaired device may still be waiting on the shelf after its bill is settled.",
        ],
        checklist: [
          "Summarize completed work and final checks.",
          "Record any remaining issue or agreed limitation.",
          "Make the payment position clear for checkout.",
          "Record the actual collection when it happens.",
        ],
      },
      {
        heading: "Close the shift with a short queue review",
        paragraphs: [
          "Review jobs that have no owner, are waiting on a decision or have changed status since the last handoff. Resolve unclear next steps while the relevant team members are still available. Use the ticket record as the outcome of the conversation, so the morning team can act on it without another meeting.",
        ],
        checklist: [
          "Review unassigned and blocked tickets.",
          "Confirm each waiting job has a next action.",
          "Leave the shared record ready for the next shift.",
        ],
      },
    ],
  },
];
