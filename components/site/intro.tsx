"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, reducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { stackLooks } from "@/lib/opening-data";
import { DrawnWord } from "@/components/ui/drawn-word";

/** Wait for the stack images (the loading screen), but never longer than `timeout` ms. */
function preloadImages(sources: string[], onProgress: (share: number) => void, timeout = 3000) {
  let done = 0;
  const loads = sources.map(
    (src) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = image.onerror = () => {
          done += 1;
          onProgress(done / sources.length);
          resolve();
        };
        image.src = src;
      }),
  );
  return Promise.race([Promise.all(loads), new Promise((resolve) => setTimeout(resolve, timeout))]);
}

/**
 * The opening: JASINI is written in outline, fills in solid, then the work
 * flashes over it. A swipe rewinds it and the site slides up like a curtain.
 */
export function Intro({
  onEnter,
  onComplete,
  onSkip,
}: {
  onEnter: () => void;
  onComplete: () => void;
  onSkip: () => void;
}) {
  const curtain = useRef<HTMLElement>(null);
  const events = useRef({ onEnter, onComplete });
  events.current = { onEnter, onComplete };

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onSkip();
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [onSkip]);

  useGSAP(
    () => {
      const element = curtain.current;
      const stage = element?.closest(".ko");
      const outer = stage?.querySelector(".ko-shop-outer");
      const inner = stage?.querySelector(".ko-shop-inner");
      const shop = stage?.querySelector(".ko-shop");
      if (!element || !outer || !inner || !shop) return;

      let killed = false;
      let requested = false;
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        events.current.onComplete();
      };
      if (reducedMotion()) {
        finish();
        return;
      }

      const arrival = gsap
        .timeline({
          paused: true,
          defaults: { duration: 1.05, ease: "power1.inOut" },
          onStart: () => events.current.onEnter(),
          onComplete: finish,
        })
        .set(outer, { autoAlpha: 1 }, 0)
        .fromTo([outer, inner], { yPercent: (index: number) => (index ? -100 : 100) }, { yPercent: 0, immediateRender: false }, 0)
        .fromTo(shop, { y: () => window.innerHeight * 0.15 }, { y: 0, immediateRender: false }, 0)
        .to(element, { yPercent: -15 }, 0);

      const word = element.querySelector(".ko-intro-word");
      const strokes = element.querySelectorAll(".dw-stroke");
      const count = element.querySelector(".ko-intro-count");

      const stack = gsap
        .timeline({
          paused: true,
          onComplete: () => {
            if (requested) rewind();
          },
          onReverseComplete: () => arrival.play(),
        })
        .fromTo(strokes, { strokeDashoffset: 1.02 }, { strokeDashoffset: 0, duration: 1.15, stagger: 0.3, ease: "power2.inOut" }, 0)
        .to(element.querySelectorAll(".dw-fill"), { opacity: 1, duration: 0.4, ease: "power1.out" }, 2.45)
        .to(strokes, { opacity: 0, duration: 0.35 }, 2.6)
        .fromTo(
          element.querySelectorAll(".ko-intro-face"),
          { autoAlpha: 0, scale: 0.96 },
          { autoAlpha: 1, scale: 1, duration: 0.04, stagger: 0.11, ease: "steps(1)" },
          2.85,
        );

      function rewind() {
        stack.timeScale(2.4).reverse();
      }
      function enterSite() {
        if (requested || finished) return;
        requested = true;
        // An early swipe waits for the last image, then rewinds the same timeline.
        if (stack.progress() === 1) rewind();
      }

      const observer = ScrollTrigger.observe({
        target: element,
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onUp: enterSite,
        tolerance: 10,
        lockAxis: true,
        preventDefault: true,
        allowClicks: true,
        ignore: element.querySelectorAll("button"),
      });
      const keyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
        if (event.target instanceof Element && event.target.closest("button, a, input, textarea")) return;
        if (["ArrowDown", "PageDown", " ", "End", "Enter"].includes(event.key)) {
          event.preventDefault();
          enterSite();
        }
      };
      window.addEventListener("keydown", keyDown);

      // Loading screen: the counter tracks image loading, then runs to 100 with the drawing.
      const counter = { value: 0 };
      const paint = () => {
        if (count) count.textContent = String(Math.floor(counter.value)).padStart(3, "0");
      };
      Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        preloadImages(
          stackLooks.map((look) => look.src),
          (share) => {
            counter.value = Math.max(counter.value, share * 30);
            paint();
          },
        ),
      ]).then(() => {
        if (killed) return;
        gsap.set(word, { visibility: "visible" });
        gsap.to(counter, { value: 100, duration: 2.85, ease: "power2.out", onUpdate: paint });
        stack.play();
      });

      return () => {
        killed = true;
        observer.kill();
        window.removeEventListener("keydown", keyDown);
      };
    },
    { scope: curtain },
  );

  return (
    <section className="ko-intro" ref={curtain} aria-label="Opening">
      <button className="ko-intro-skip" type="button" onClick={onSkip}>
        Skip intro <ArrowUpRight aria-hidden="true" />
      </button>
      <div className="ko-intro-lockup">
        <div className="ko-intro-word">
          <DrawnWord from="#4CB36E" to="#1B3A25" fill="var(--intro-ink)" strokeWidth={30} className="ko-intro-svg" />
        </div>
        <div className="ko-intro-art" aria-hidden="true">
          {stackLooks.map(({ src, x, y }, index) => (
            <span
              key={src}
              className="ko-intro-layer"
              style={{ "--layer-x": `${x}em`, "--layer-y": `${y}em`, zIndex: index + 1 } as CSSProperties}
            >
              <span className="ko-intro-face">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" width={480} height={480} fetchPriority={index === 0 ? "high" : "auto"} />
              </span>
            </span>
          ))}
        </div>
        <span className="ko-intro-count" aria-hidden="true">
          000
        </span>
      </div>
      <span className="ko-intro-cue">
        Scroll or swipe to enter <ArrowDown aria-hidden="true" />
      </span>
    </section>
  );
}
