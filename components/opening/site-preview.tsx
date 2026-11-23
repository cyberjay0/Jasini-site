"use client";

import { useLayoutEffect, useRef } from "react";
import { Workflow } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { themes, type Theme, type Variant } from "@/lib/opening-data";
import { DrawnWord } from "@/components/ui/drawn-word";
import { SolidWordmark } from "./solid-wordmark";
import { BookCall } from "./book-call";

type SitePreviewProps = {
  variant: Variant;
  theme: Theme;
  onTheme: (theme: Theme) => void;
  onReplay: () => void;
  /** True once the curtain starts lifting, so the hero animates in as it arrives */
  visible: boolean;
};

/** The site that slides up over the opening. Phase 1 shows the header and hero only. */
export function SitePreview({ variant, theme, onTheme, onReplay, visible }: SitePreviewProps) {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const drawnHero = variant === "b";

  // Stretch the solid name to the full width of the page, as Knockout does.
  useLayoutEffect(() => {
    if (drawnHero) return;
    const box = frame.current;
    const word = title.current?.querySelector<HTMLElement>(".ko-word");
    if (!box || !word) return;
    const fit = () => {
      if (word.offsetWidth) box.style.setProperty("--word-stretch", String(box.clientWidth / word.offsetWidth));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    observer.observe(word);
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, [drawnHero]);

  useGSAP(
    () => {
      if (!visible) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        if (drawnHero) {
          intro
            .from(".ko-eyebrow", { opacity: 0, y: 12, duration: 0.7 }, 0.2)
            .from(".ko-drawn-wrap", { opacity: 0, scale: 0.985, duration: 0.9 }, 0.3)
            .from(".ko-tagline, .ko-cta-row", { opacity: 0, y: 16, duration: 0.75, stagger: 0.08 }, 0.75)
            .from(".ko-scroll-cue", { opacity: 0, duration: 0.6 }, 1.2);
        } else {
          intro
            .from(".ko-title-frame .ko-glyph-ink", { yPercent: 115, stagger: 0.045, duration: 0.76 }, 0.2)
            .from(".ko-hero-rule", { scaleX: 0, duration: 0.7 }, 0.44)
            .from(".ko-hero-note > *", { opacity: 0, y: 7, stagger: 0.048, duration: 0.46 }, 0.51);
        }
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [visible, drawnHero], revertOnUpdate: true },
  );

  return (
    <div ref={root}>
      <header className="ko-header">
        <div className="ko-header-inner ko-wrap">
          <button className="ko-logo" type="button" onClick={onReplay} aria-label="Jasini, replay the opening">
            <Workflow aria-hidden="true" />
            <span>Jasini</span>
          </button>
          <nav className="ko-nav" aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#work" className="ko-nav-secondary">Services</a>
            <BookCall className="ko-nav-cta" />
            <div className="ko-swatches" role="group" aria-label="Colour theme">
              {themes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  aria-pressed={theme === item.id}
                  onClick={() => onTheme(item.id)}
                >
                  <span style={{ backgroundColor: item.color }} />
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="ko-main">
        {drawnHero ? (
          <section className="ko-drawn-hero" aria-labelledby="ko-title">
            <p className="ko-eyebrow">AI Automation Studio</p>
            <h1 id="ko-title" className="sr-only">Jasini</h1>
            <div className="ko-drawn-wrap">
              <DrawnWord from="var(--draw-from)" to="var(--draw-to)" strokeWidth={30} loop play={visible} className="ko-drawn-svg" />
            </div>
            <p className="ko-tagline">
              AI automations that answer calls, confirm payments and book clients while you sleep.
            </p>
            <div className="ko-cta-row">
              <BookCall className="ko-cta" />
            </div>
            <a href="#work" className="ko-scroll-cue" aria-label="Scroll to work">
              <span>Scroll</span>
              <span className="ko-scroll-line" aria-hidden="true" />
            </a>
          </section>
        ) : (
          <section className="ko-hero ko-wrap" aria-labelledby="ko-title">
            <div className="ko-title-frame" ref={frame}>
              <h1 id="ko-title" ref={title} tabIndex={-1} aria-label="Jasini">
                <SolidWordmark stamp="(AI)" />
              </h1>
            </div>
            <div className="ko-hero-rule" aria-hidden="true" />
            <div className="ko-hero-note">
              <strong>Jasini, AI automation studio</strong>
              <BookCall className="ko-note-link" />
              <p>
                Voice agents, AI receptionists, payment confirmation, GoHighLevel and CRM integrations for
                businesses worldwide.
              </p>
              <span>© 2026</span>
            </div>
          </section>
        )}

        <section id="work" className="ko-next ko-wrap">
          <p>Work, services and contact sections arrive in Phase 2.</p>
        </section>
      </main>
    </div>
  );
}
