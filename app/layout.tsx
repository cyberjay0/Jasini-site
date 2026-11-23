import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jasini | AI Automation Studio",
  description:
    "Voice AI agents, AI receptionists, payment confirmation agents, B2B email automations, GoHighLevel and CRM integrations for businesses worldwide.",
  metadataBase: new URL("https://skarijasini.com"),
};

export const viewport: Viewport = {
  themeColor: "#07110b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
