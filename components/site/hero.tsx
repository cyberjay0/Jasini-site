"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DrawnWord } from "@/components/ui/drawn-word";
import { BookCall } from "./book-call";

/** The 21st.dev path drawing hero: JASINI keeps writing itself in outline. */
export function Hero({ visible }: { visible: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!visible) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".ko-eyebrow", { opacity: 0, y: 12, duration: 0.7 }, 0.2)
          .from(".ko-drawn-wrap", { opacity: 0, scale: 0.985, duration: 0.9 }, 0.3)
          .from(".ko-tagline, .ko-cta-row", { opacity: 0, y: 16, duration: 0.75, stagger: 0.08 }, 0.75)
          .from(".ko-scroll-cue", { opacity: 0, duration: 0.6 }, 1.2);
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [visible], revertOnUpdate: true },
  );

  return (
    <section className="ko-drawn-hero" ref={root} aria-labelledby="ko-title">
      <p className="ko-eyebrow">AI Automation Studio</p>
      <h1 id="ko-title" className="sr-only" tabIndex={-1}>
        Jasini, AI automation studio
      </h1>
      <div className="ko-drawn-wrap">
        <DrawnWord from="var(--draw-from)" to="var(--draw-to)" strokeWidth={30} loop play={visible} className="ko-drawn-svg" />
      </div>
      <p className="ko-tagline">AI automations that answer calls, confirm payments and book clients while you sleep.</p>
      <div className="ko-cta-row">
        <BookCall className="ko-cta" align="center" />
        <a href="#work" className="ko-cta-ghost">
          See the work <ArrowDown aria-hidden="true" />
        </a>
      </div>
      <a href="#work" className="ko-scroll-cue" aria-label="Scroll to work">
        <span>Scroll</span>
        <span className="ko-scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
