"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUp, ArrowUpRight, RotateCcw } from "lucide-react";
import { contact, emailLink, whatsappLink } from "@/lib/opening-data";
import { socials } from "@/lib/work";
import { BookCall } from "./book-call";
import { SolidWordmark } from "./solid-wordmark";

/** Stretch the solid wordmark to the full width of its frame, as Knockout does. */
function useStretchFit() {
  const frame = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const box = frame.current;
    const word = box?.querySelector<HTMLElement>(".ko-word");
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
  }, []);
  return frame;
}

export function Footer({ onReplay }: { onReplay: () => void }) {
  const frame = useStretchFit();
  return (
    <footer id="contact" className="ko-footer ko-wrap">
      <div className="ko-rule ko-footer-rule" aria-hidden="true" />
      <div className="ko-footer-main">
        <h2>
          <span className="ko-footer-line">
            <span>Built to run while you sleep.</span>
          </span>
          <span className="ko-footer-line ko-footer-muted">
            <span>Or while you sell. Or both.</span>
          </span>
        </h2>
        <div className="ko-footer-contact">
          <BookCall className="ko-cta" align="end" />
          <ul>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={emailLink()}>
                {contact.emailAddress} <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label} <ArrowUpRight aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ko-title-frame ko-footer-mark" ref={frame}>
        <p aria-hidden="true">
          <SolidWordmark stamp="(AI)" />
        </p>
      </div>

      <div className="ko-footer-bottom">
        <span>© 2026 Jasini</span>
        <span className="ko-footer-tag">AI automation studio, working worldwide</span>
        <button type="button" onClick={onReplay}>
          <RotateCcw aria-hidden="true" /> Replay intro
        </button>
        <a href="#top">
          Back to top <ArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
