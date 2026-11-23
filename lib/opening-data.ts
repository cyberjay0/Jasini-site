export type Theme = "forest" | "paper";

export const themes: Record<Theme, { label: string; color: string }> = {
  forest: { label: "Dark", color: "#0B1A11" },
  paper: { label: "Light", color: "#ECEEE6" },
};

/** Work that flashes over the name during the opening. Order mixes the three kinds of work. */
export const stackLooks = [
  { src: "/images/opening/n8n-splendall-store.webp", x: -0.08, y: 0.03 },
  { src: "/images/opening/motion-chitalk.webp", x: 0.06, y: 0.05 },
  { src: "/images/opening/web-bluehaven.webp", x: 0.1, y: -0.08 },
  { src: "/images/opening/n8n-right-life.webp", x: -0.07, y: 0.02 },
  { src: "/images/opening/motion-opay-stats.webp", x: 0.04, y: 0.07 },
  { src: "/images/opening/web-shotblac.webp", x: 0.09, y: 0.03 },
  { src: "/images/opening/n8n-splendall-pay.webp", x: 0.05, y: -0.06 },
  { src: "/images/opening/motion-opay-phone.webp", x: -0.04, y: 0.07 },
  { src: "/images/opening/web-fade.webp", x: -0.07, y: -0.04 },
  { src: "/images/opening/n8n-shotblac.webp", x: 0.03, y: -0.05 },
  { src: "/images/opening/portrait.webp", x: 0, y: 0 },
];

const defaultMessage = "Hi Jasini, I would like to book a call about an automation for my business.";

export const contact = {
  whatsappNumber: "2349115205339",
  emailAddress: "skarijasini@gmail.com",
};

export function whatsappLink(message = defaultMessage) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function emailLink(message = defaultMessage, subject = "Book a call") {
  return `mailto:${contact.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
