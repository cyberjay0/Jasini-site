export type ProjectKind = "automation" | "website" | "motion";

export type Project = {
  id: string;
  kind: ProjectKind;
  /** Project or brand name, shown in bold on the card */
  name: string;
  /** What it is, shown under the name */
  role: string;
  summary: string;
  points: string[];
  tools: string[];
  card: string;
  /** Large image for the detail panel */
  full?: string;
  video?: string;
  poster?: string;
  link?: { href: string; label: string };
};

export const automations: Project[] = [
  {
    id: "right-life",
    kind: "automation",
    name: "Right Life Dental",
    role: "Voice AI receptionist",
    summary:
      "A voice agent that answers the clinic phone, handles patient questions and books appointments straight into the diary, at any hour.",
    points: [
      "Answers price and treatment questions from the clinic's own knowledge base",
      "Checks opening hours and live calendar slots before offering a time",
      "Books the appointment, then double checks the slot is still free",
      "Takes a message and alerts the clinic on Telegram when a human is needed",
      "Logs every call so the team can review it",
    ],
    tools: ["Vapi", "n8n", "Google Calendar", "Supabase", "Gemini embeddings", "Telegram"],
    card: "/images/work/right-life-card.webp",
    full: "/images/work/right-life-full.webp",
  },
  {
    id: "splendall-pay",
    kind: "automation",
    name: "Splendall Store",
    role: "Payment confirmation agent",
    summary:
      "Every Paystack payment is verified the moment it lands, matched to the customer's order and sent to the right delivery team.",
    points: [
      "Listens for successful Paystack charges and verifies each transaction",
      "Matches the payment to the checkout session and ignores duplicates",
      "Builds the order and marks it paid",
      "Confirms with the customer and alerts the Lagos or interstate dispatch team",
      "Adds the order to the right delivery sheet",
    ],
    tools: ["n8n", "Paystack", "Telegram", "Google Sheets", "Data Tables"],
    card: "/images/work/splendall-pay-card.webp",
    full: "/images/work/splendall-pay-full.webp",
  },
  {
    id: "splendall-store",
    kind: "automation",
    name: "Splendall Store",
    role: "Telegram shopping assistant",
    summary:
      "Customers browse products, build a cart, choose delivery and pay, all inside one Telegram chat.",
    points: [
      "Product search with options and quantity checks",
      "A cart customers can edit, clear or check out",
      "Lagos and interstate delivery choices with shipping rates",
      "A Paystack link at checkout, then the payment agent takes over",
    ],
    tools: ["n8n", "Telegram", "Paystack", "Store API", "Data Tables"],
    card: "/images/work/splendall-store-card.webp",
    full: "/images/work/splendall-store-full.webp",
  },
  {
    id: "shotblac-sync",
    kind: "automation",
    name: "Shotblac Media",
    role: "YouTube to website sync",
    summary:
      "New episodes on Shotblac's YouTube playlists appear on their website by themselves. Nobody copies links by hand any more.",
    points: [
      "Checks every playlist on a schedule",
      "Finds episodes that are not on the site yet",
      "Pulls titles, thumbnails and details from YouTube",
      "Publishes them to shotblac.com and tells the team on Telegram",
    ],
    tools: ["n8n", "YouTube Data API", "Website API", "Telegram"],
    card: "/images/work/shotblac-sync-card.webp",
    full: "/images/work/shotblac-sync-full.webp",
  },
  {
    id: "novatech",
    kind: "automation",
    name: "Novatech",
    role: "AI customer support agent",
    summary:
      "A support agent that answers customers from the company knowledge base, looks up their orders and opens a ticket when it should.",
    points: [
      "Answers from a searchable company knowledge base",
      "Remembers the whole conversation",
      "Looks up customer records and orders in Airtable",
      "Creates a support ticket when a person needs to step in",
    ],
    tools: ["n8n", "OpenRouter", "Postgres memory", "Gemini embeddings", "Airtable", "Telegram"],
    card: "/images/work/novatech-card.webp",
    full: "/images/work/novatech-full.webp",
  },
  {
    id: "veritas",
    kind: "automation",
    name: "Veritas",
    role: "Document knowledge base",
    summary:
      "Drop a document into Google Drive and, minutes later, an AI assistant can answer questions from it accurately.",
    points: [
      "Watches a Google Drive folder for new and updated files",
      "Splits each document into clean, searchable chunks",
      "Embeds them with Gemini and stores them in Pinecone",
      "Feeds chat and voice agents answers grounded in your own documents",
    ],
    tools: ["n8n", "Google Drive", "Gemini embeddings", "Pinecone"],
    card: "/images/work/veritas-card.webp",
    full: "/images/work/veritas-full.webp",
  },
];

export const websites: Project[] = [
  {
    id: "web-shotblac",
    kind: "website",
    name: "Shotblac Media",
    role: "Studio website",
    summary:
      "An editorial website for a documentary and campaign film studio, with their YouTube episodes flowing in automatically.",
    points: [
      "Film led, full screen hero",
      "Work, originals and services pages",
      "Episodes sync from YouTube through the Shotblac automation",
    ],
    tools: ["WordPress", "Elementor", "n8n"],
    card: "/images/work/web-shotblac-card.webp",
    full: "/images/work/web-shotblac-full.webp",
    link: { href: "https://shotblac.com", label: "Visit shotblac.com" },
  },
  {
    id: "web-bluehaven",
    kind: "website",
    name: "Blue Haven Residence",
    role: "Shortlet apartments website",
    summary: "A booking focused website for luxury shortlet apartments in Abuja.",
    points: ["Rooms and amenities at a glance", "A booking button on every screen", "Fast and built for phones first"],
    tools: ["HTML", "CSS", "JavaScript", "Vercel"],
    card: "/images/work/web-bluehaven-card.webp",
    full: "/images/work/web-bluehaven-full.webp",
    link: { href: "https://blue-haven-suites.vercel.app", label: "Visit the site" },
  },
  {
    id: "web-fade",
    kind: "website",
    name: "Fade District Barbers",
    role: "Barbershop website",
    summary: "A premium website for a London barbershop, built around booking an appointment.",
    points: ["Booking first layout", "Services, gallery and reviews", "Its 4.9 rating shown up front"],
    tools: ["HTML", "CSS", "JavaScript", "Vercel"],
    card: "/images/work/web-fade-card.webp",
    full: "/images/work/web-fade-full.webp",
    link: { href: "https://fade-district-seven.vercel.app", label: "Visit the site" },
  },
];

export const motion: Project[] = [
  {
    id: "motion-shotblac",
    kind: "motion",
    name: "Shotblac Media",
    role: "Automation explainer",
    summary: "A vertical explainer showing how Shotblac's YouTube episodes land on their website by themselves.",
    points: ["Made for Reels and TikTok", "Real workflow and website footage", "22 seconds"],
    tools: ["Motion graphics", "9:16 video", "CapCut"],
    card: "/video/motion-shotblac-poster.webp",
    poster: "/video/motion-shotblac-poster.webp",
    video: "/video/motion-shotblac.mp4",
  },
  {
    id: "motion-opay",
    kind: "motion",
    name: "OPay sales tracker",
    role: "Explainer, part 1",
    summary: "How a small juice business can capture every OPay payment alert and see the day's sales.",
    points: ["Story led explainer", "Phone and payment UI animation", "23 seconds"],
    tools: ["Motion graphics", "9:16 video", "CapCut"],
    card: "/video/motion-opay-poster.webp",
    poster: "/video/motion-opay-poster.webp",
    video: "/video/motion-opay.mp4",
  },
  {
    id: "motion-opay-2",
    kind: "motion",
    name: "OPay sales tracker",
    role: "Explainer, part 2",
    summary: "Every OPay alert recorded in a sheet and counted, shown step by step.",
    points: ["Follows on from part 1", "Sheet and dashboard animation", "9 seconds"],
    tools: ["Motion graphics", "9:16 video", "CapCut"],
    card: "/video/motion-opay-2-poster.webp",
    poster: "/video/motion-opay-2-poster.webp",
    video: "/video/motion-opay-2.mp4",
  },
  {
    id: "motion-chitalk",
    kind: "motion",
    name: "ChiTalk",
    role: "Product ad",
    summary: "How many sales did you lose last night? A launch ad for an AI sales chat plugin.",
    points: ["Hook in the first second", "Website and chat UI animation", "31 seconds"],
    tools: ["Motion graphics", "9:16 video", "CapCut"],
    card: "/video/motion-chitalk-poster.webp",
    poster: "/video/motion-chitalk-poster.webp",
    video: "/video/motion-chitalk.mp4",
  },
];

export const services = [
  {
    name: "Voice AI agents",
    text: "Phone agents that answer, qualify callers and book appointments in a natural voice, day and night.",
    tools: ["Vapi", "n8n", "Calendars"],
  },
  {
    name: "AI receptionists",
    text: "Chat assistants for your website, WhatsApp or Telegram that answer from your own knowledge and hand hot leads to you.",
    tools: ["n8n", "RAG", "WhatsApp", "Telegram"],
  },
  {
    name: "Payment confirmation agents",
    text: "Every payment verified the moment it lands, orders updated and your customer and team told automatically.",
    tools: ["Paystack", "Webhooks", "Sheets"],
  },
  {
    name: "B2B email automations",
    text: "Lead lists, personalised outreach and follow ups that send themselves, with replies routed straight to you.",
    tools: ["n8n", "Gmail", "AI writing"],
  },
  {
    name: "GoHighLevel setup",
    text: "Pipelines, calendars, funnels and workflows set up properly, then connected to the rest of your tools.",
    tools: ["GoHighLevel", "Funnels", "Workflows"],
  },
  {
    name: "CRM integrations",
    text: "Your CRM kept in sync with your forms, calls, payments and inbox, so nothing falls through the cracks.",
    tools: ["GoHighLevel", "Airtable", "HubSpot", "Sheets"],
  },
];

export const steps = [
  { step: "Call", text: "A short call to find the work that eats your week and what it costs you." },
  { step: "Build", text: "I build and test the automation on your real data, then walk you through it." },
  { step: "Run", text: "It goes live. I watch it, fix anything that breaks and keep improving it." },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ijasini-daniel-shettima-23a797337" },
  { label: "TikTok", href: "https://www.tiktok.com/@jasiniwithalaptop" },
  { label: "GitHub", href: "https://github.com/cyberjay0" },
];
