import { BookCall } from "./book-call";
import { SectionHead } from "./section-head";

const tools = [
  "n8n",
  "GoHighLevel",
  "Vapi",
  "OpenRouter",
  "Gemini",
  "Supabase",
  "Pinecone",
  "Airtable",
  "Paystack",
  "Google Workspace",
  "WhatsApp",
  "Telegram",
];

export function About() {
  return (
    <section id="about" className="ko-about ko-wrap" aria-labelledby="about-title">
      <SectionHead index="03" title="About" id="about-title" note="The person behind the automations." />
      <div className="ko-about-grid">
        <div className="ko-about-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/about-portrait.webp" alt="Jasini smiling, wearing a dark blazer" loading="lazy" />
        </div>
        <div className="ko-about-text">
          <p className="ko-about-lead">
            I&apos;m Jasini. I build AI automations for businesses that want their busiest work to run by itself.
          </p>
          <p>
            Voice agents that pick up the phone. Assistants that answer customers. Agents that confirm payments and update
            orders. And the GoHighLevel and CRM setups that tie it all together.
          </p>
          <p>
            I work remotely with clients worldwide, and I build for reliability first: tested on your real data, watched
            after launch, and simple for your team to understand.
          </p>
          <div className="ko-about-tools">
            <span>Tools I use every day</span>
            <ul className="ko-tools">
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          <BookCall className="ko-cta" align="start" />
        </div>
      </div>
    </section>
  );
}
