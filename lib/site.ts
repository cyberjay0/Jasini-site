import { contact } from "./opening-data";
import { services, socials } from "./work";

/** The address the live site is served from (skarijasini.com redirects here). */
export const SITE_URL = "https://www.skarijasini.com";

export const SITE_TITLE = "Jasini | AI Automation Studio";

export const SITE_DESCRIPTION =
  "Jasini builds AI automations for businesses worldwide: voice AI agents, AI receptionists, payment confirmation agents, B2B email automations, GoHighLevel setup and CRM integrations.";

/** Structured data so search engines know who Jasini is and which profiles are Jasini's. */
export function structuredData() {
  const sameAs = socials.map((social) => social.href);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Jasini",
        alternateName: ["Jasini AI Automation Studio", "skarijasini.com"],
        publisher: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Jasini",
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/images/about-portrait.webp`,
        jobTitle: "AI Automation Specialist",
        email: `mailto:${contact.emailAddress}`,
        sameAs,
        knowsAbout: [
          "AI automation",
          "n8n",
          "GoHighLevel",
          "Voice AI agents",
          "AI receptionists",
          "CRM integration",
          "Workflow automation",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Jasini, AI Automation Studio",
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/opengraph-image.png`,
        description: SITE_DESCRIPTION,
        founder: { "@id": `${SITE_URL}/#person` },
        areaServed: "Worldwide",
        email: contact.emailAddress,
        sameAs,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI automation services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.name, description: service.text },
          })),
        },
      },
    ],
  };
}
