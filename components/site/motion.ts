"use client";

import { useRef, type RefObject } from "react";
import { gsap, reducedMotion, ScrollSmoother, useGSAP } from "@/lib/gsap";

/** Smooth scrolling (desktop), in-page links and scroll reveals, adapted from Knockout. */
export function useSiteMotion(root: RefObject<HTMLDivElement | null>, ready: boolean, dialogOpen: boolean) {
  const smoother = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      const stage = root.current;
      if (!ready || !stage) return;
      const media = gsap.matchMedia();

      media.add("(min-width: 781px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const wrapper = stage.querySelector<HTMLElement>(".ko-scroll-frame");
        const content = stage.querySelector<HTMLElement>(".ko-scroll-content");
        if (!wrapper || !content) return;
        const instance = ScrollSmoother.create({ wrapper, content, smooth: 0.38, smoothTouch: false });
        smoother.current = instance;
        return () => {
          instance.kill();
          smoother.current = null;
        };
      });

      const followLink = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
        if (!link) return;
        const id = link.getAttribute("href")?.slice(1) ?? "";
        const target = id && id !== "top" ? document.getElementById(id) : null;
        if (id && id !== "top" && !target) return;
        event.preventDefault();
        const offset = stage.querySelector<HTMLElement>(".ko-header")?.offsetHeight ?? 0;
        const smooth = !reducedMotion();
        if (smoother.current) {
          if (target) smoother.current.scrollTo(target, smooth, `top ${offset}px`);
          else smoother.current.scrollTo(0, smooth);
        } else if (target) {
          target.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
        } else {
          window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        }
        const heading = target?.querySelector<HTMLElement>("h2[tabindex]");
        heading?.focus({ preventScroll: true });
      };
      stage.addEventListener("click", followLink);

      // Deep links such as /#work land on their section once the page is measured.
      const deepLink = location.hash ? document.getElementById(location.hash.slice(1)) : null;
      const landing = deepLink
        ? requestAnimationFrame(() => {
            const offset = stage.querySelector<HTMLElement>(".ko-header")?.offsetHeight ?? 0;
            if (smoother.current) smoother.current.scrollTo(deepLink, false, `top ${offset}px`);
            else deepLink.scrollIntoView();
          })
        : 0;

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, stage);
        const once = (trigger: Element, start = "top 88%") => ({ scrollTrigger: { trigger, start, once: true } });

        q(".ko-section-head").forEach((head) => {
          gsap
            .timeline(once(head))
            .from(head.querySelector(".ko-rule"), { scaleX: 0, duration: 0.8, ease: "power3.out" }, 0)
            .from(head.querySelectorAll(".ko-line > span"), { yPercent: 105, duration: 0.85, ease: "expo.out" }, 0.1)
            .from(head.querySelectorAll(".ko-section-index, .ko-section-row > p"), { opacity: 0, y: 8, duration: 0.5, stagger: 0.06 }, 0.3);
        });

        q(".ko-group-head").forEach((head) => {
          gsap.from(head.children, { opacity: 0, y: 10, duration: 0.5, stagger: 0.06, ease: "power2.out", ...once(head, "top 92%") });
        });

        q(".ko-cards").forEach((group) => {
          gsap
            .timeline(once(group, "top 92%"))
            .from(group.querySelectorAll(".ko-card-media, .ko-next-card"), {
              y: 38,
              opacity: 0.2,
              duration: 0.56,
              stagger: 0.075,
              ease: "power3.out",
              clearProps: "transform,opacity",
            }, 0)
            .from(group.querySelectorAll(".ko-card-art"), {
              clipPath: "inset(0 100% 0 0)",
              duration: 0.51,
              stagger: 0.075,
              ease: "power2.inOut",
              clearProps: "clipPath",
            }, 0.15)
            .from(group.querySelectorAll(".ko-card-info"), { opacity: 0, duration: 0.4, stagger: 0.075 }, 0.35);
        });

        q(".ko-service").forEach((row) => {
          gsap
            .timeline(once(row, "top 92%"))
            .from(row.querySelector(".ko-rule"), { scaleX: 0, duration: 0.7, ease: "power3.out" }, 0)
            .from(row.querySelectorAll(".ko-service-index, h3, .ko-service-body"), { opacity: 0, y: 14, duration: 0.6, stagger: 0.07, ease: "power3.out" }, 0.1);
        });

        q(".ko-process li").forEach((item, index) => {
          gsap.from(item, { opacity: 0, y: 18, duration: 0.6, delay: index * 0.08, ease: "power3.out", ...once(item, "top 94%") });
        });

        const portrait = stage.querySelector(".ko-about-media img");
        if (portrait) {
          gsap.from(portrait, { clipPath: "inset(100% 0 0 0)", scale: 1.08, duration: 1.1, ease: "power3.inOut", clearProps: "clipPath", ...once(portrait) });
        }
        q(".ko-about-text > *").forEach((item, index) => {
          gsap.from(item, { opacity: 0, y: 16, duration: 0.6, delay: index * 0.06, ease: "power3.out", ...once(item, "top 94%") });
        });

        const footer = stage.querySelector(".ko-footer");
        if (footer) {
          gsap
            .timeline(once(footer, "top 84%"))
            .from(".ko-footer-rule", { scaleX: 0, duration: 0.72, ease: "power3.out" }, 0)
            .from(".ko-footer-line > span", { yPercent: 104, duration: 0.67, stagger: 0.064, ease: "expo.out" }, 0.17)
            .from(".ko-footer-contact > *", { opacity: 0, y: 10, duration: 0.5, stagger: 0.06 }, 0.3);
        }
        const mark = stage.querySelector(".ko-footer-mark");
        if (mark) {
          gsap.from(mark.querySelectorAll(".ko-glyph-ink"), {
            yPercent: 115,
            stagger: 0.05,
            duration: 0.9,
            ease: "expo.out",
            ...once(mark, "top 95%"),
          });
        }
      });

      return () => {
        cancelAnimationFrame(landing);
        stage.removeEventListener("click", followLink);
        media.revert();
      };
    },
    { scope: root, dependencies: [ready], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (!ready || !smoother.current) return;
      smoother.current.paused(dialogOpen);
    },
    { dependencies: [ready, dialogOpen] },
  );
}

/** Spring cursor that grows into "View project" over work cards (Knockout). */
export function useCursor(root: RefObject<HTMLDivElement | null>, enabled: boolean) {
  useGSAP(
    () => {
      const stage = root.current;
      const cursor = stage?.querySelector<HTMLElement>(".ko-cursor");
      if (!enabled || !stage || !cursor) return;
      const media = gsap.matchMedia();
      media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        let x = 0;
        let y = 0;
        let targetX = 0;
        let targetY = 0;
        let vx = 0;
        let vy = 0;
        let frame = 0;
        let last = 0;
        const paint = () => {
          cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        };
        function tick(now: number) {
          const dt = Math.min((now - last) / 1000, 0.024);
          last = now;
          vx += (220 * (targetX - x) - 25 * vx) * dt;
          vy += (220 * (targetY - y) - 25 * vy) * dt;
          x += vx * dt;
          y += vy * dt;
          paint();
          frame = Math.hypot(targetX - x, targetY - y) + Math.hypot(vx, vy) > 0.35 ? requestAnimationFrame(tick) : 0;
        }
        function move(event: PointerEvent) {
          if (event.pointerType !== "mouse") return;
          targetX = event.clientX;
          targetY = event.clientY;
          if (!cursor!.hasAttribute("data-visible")) {
            x = targetX;
            y = targetY;
            vx = vy = 0;
            paint();
          }
          cursor!.setAttribute("data-visible", "");
          cursor!.toggleAttribute(
            "data-on-item",
            event.target instanceof Element && Boolean(event.target.closest(".ko-card-media")),
          );
          if (!frame) {
            last = performance.now();
            frame = requestAnimationFrame(tick);
          }
        }
        function hide() {
          cancelAnimationFrame(frame);
          frame = 0;
          cursor!.removeAttribute("data-visible");
          cursor!.removeAttribute("data-on-item");
        }
        stage.addEventListener("pointermove", move);
        stage.addEventListener("pointerleave", hide);
        window.addEventListener("blur", hide);
        return () => {
          hide();
          stage.removeEventListener("pointermove", move);
          stage.removeEventListener("pointerleave", hide);
          window.removeEventListener("blur", hide);
        };
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [enabled], revertOnUpdate: true },
  );
}
