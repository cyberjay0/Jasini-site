"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { stackLooks, type Theme, type Variant } from "@/lib/opening-data";
import { DrawnWord } from "@/components/ui/drawn-word";
import { SolidWordmark } from "./solid-wordmark";
import { SitePreview } from "./site-preview";

type Phase = "stacking" | "entering" | "ready";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

export function Opening({ variant, theme: initialTheme }: { variant: Variant; theme: Theme }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [phase, setPhase] = useState<Phase>("stacking");
  const [run, setRun] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const intro = phase !== "ready";

  useLayoutEffect(() => {
    if (reducedMotion()) setPhase("ready");
  }, []);

  // Once the curtain is gone, drop the transforms so the fixed header behaves normally.
  useLayoutEffect(() => {
    if (phase !== "ready" || !root.current) return;
    gsap.set(root.current.querySelectorAll(".ko-shop-outer, .ko-shop-inner, .ko-shop"), { clearProps: "all" });
  }, [phase]);

  const finish = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setPhase("ready");
  }, []);

  const replay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (reducedMotion()) return;
    setRun((value) => value + 1);
    setPhase("stacking");
  }, []);

  return (
    <div className="ko" ref={root} data-theme={theme} data-intro={intro ? phase : undefined}>
      <div className="ko-shop-outer" inert={intro}>
        <div className="ko-shop-inner">
          <div className="ko-shop">
            <SitePreview
              variant={variant}
              theme={theme}
              onTheme={setTheme}
              onReplay={replay}
              visible={phase !== "stacking"}
            />
          </div>
        </div>
      </div>
      {intro && (
        <Intro
          key={run}
          variant={variant}
          onEnter={() => setPhase("entering")}
          onComplete={finish}
          onSkip={finish}
        />
      )}
    </div>
  );
}

function Intro({
  variant,
  onEnter,
  onComplete,
  onSkip,
}: {
  variant: Variant;
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

      // The site slides up over the opening like a curtain (Knockout).
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
      const layers = element.querySelectorAll(".ko-intro-face");
      const count = element.querySelector(".ko-intro-count");
      let rewindSpeed = 1;
      let countDuration = 1.5;

      const stack = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (requested) rewind();
        },
        onReverseComplete: () => arrival.play(),
      });

      if (variant === "b") {
        // Knockout as written: letters rise while the work flashes over them.
        stack
          .fromTo(layers, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.04, stagger: 0.125, ease: "steps(1)" }, 0.16)
          .fromTo(element.querySelectorAll(".ko-glyph-ink"), { yPercent: 112 }, { yPercent: 0, stagger: { amount: 1.08 }, duration: 0.42, ease: "expo.out" }, 0)
          .set(word, { zIndex: 2 }, 1.08)
          .set(word, { zIndex: 0 }, 1.3);
      } else {
        const strokes = element.querySelectorAll(".dw-stroke");
        stack.fromTo(strokes, { strokeDashoffset: 1.02 }, { strokeDashoffset: 0, duration: 1.15, stagger: 0.3, ease: "power2.inOut" }, 0);
        if (variant === "a") {
          // Written in outline, filled in, then the work flashes over it.
          stack
            .to(element.querySelectorAll(".dw-fill"), { opacity: 1, duration: 0.4, ease: "power1.out" }, 2.45)
            .to(strokes, { opacity: 0, duration: 0.35 }, 2.6)
            .fromTo(layers, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.04, stagger: 0.11, ease: "steps(1)" }, 2.85);
          countDuration = 2.85;
          rewindSpeed = 2.4;
        } else {
          // Written in outline while the work flashes inside the letters.
          stack.fromTo(element.querySelectorAll(".dw-photo"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04, stagger: 0.2, ease: "steps(1)" }, 0.35);
          countDuration = 2.6;
          rewindSpeed = 2.2;
        }
      }

      function rewind() {
        stack.timeScale(rewindSpeed).reverse();
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

      // Loading screen: the counter shows image loading, then runs to 100 with the animation.
      const counter = { value: 0 };
      const paint = () => {
        if (count) count.textContent = String(Math.floor(counter.value)).padStart(3, "0");
      };
      const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
      Promise.all([
        fontsReady,
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
        gsap.to(counter, { value: 100, duration: countDuration, ease: "power2.out", onUpdate: paint });
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
      <div className="ko-intro-lockup" data-variant={variant}>
        <div className="ko-intro-word">
          {variant === "b" ? (
            <SolidWordmark />
          ) : (
            <DrawnWord
              from="#4CB36E"
              to="#1B3A25"
              strokeWidth={30}
              fill="var(--intro-ink)"
              clipImages={variant === "c" ? stackLooks.map((look) => look.src) : undefined}
              className="ko-intro-svg"
            />
          )}
        </div>
        {variant !== "c" && (
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
        )}
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
