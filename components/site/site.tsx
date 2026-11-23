"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import type { Theme } from "@/lib/opening-data";
import type { Project } from "@/lib/work";
import { About } from "./about";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { Intro } from "./intro";
import { useCursor, useSiteMotion } from "./motion";
import { ProjectDialog } from "./project-dialog";
import { Services } from "./services";
import { Work } from "./work";

type Phase = "stacking" | "entering" | "ready";
const THEME_KEY = "jasini-theme";

export function Site() {
  const [theme, setTheme] = useState<Theme>("forest");
  const [phase, setPhase] = useState<Phase>("stacking");
  const [run, setRun] = useState(0);
  const [project, setProject] = useState<Project | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const intro = phase !== "ready";

  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "forest" || saved === "paper") setTheme(saved);
    } catch {
      // Storage can be blocked; the default theme is fine.
    }
    // Deep links (for example /#work), reduced motion and search engine or link preview
    // crawlers skip the opening, so the whole page is visible to them straight away.
    const crawler = /bot|crawl|spider|slurp|lighthouse|google-|facebookexternalhit|whatsapp|linkedin|preview/i.test(
      navigator.userAgent,
    );
    if (reducedMotion() || location.hash || crawler) setPhase("ready");
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Once the curtain is gone, drop its transforms so the fixed header and smooth scroll behave.
  useLayoutEffect(() => {
    if (phase !== "ready" || !root.current) return;
    gsap.set(root.current.querySelectorAll(".ko-shop-outer, .ko-shop-inner, .ko-shop"), { clearProps: "all" });
  }, [phase]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "forest" ? "paper" : "forest";
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // Ignore blocked storage.
      }
      return next;
    });
  }, []);

  const finish = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setPhase("ready");
  }, []);

  const replay = useCallback(() => {
    setProject(null);
    window.scrollTo({ top: 0, behavior: "instant" });
    if (reducedMotion()) return;
    setRun((value) => value + 1);
    setPhase("stacking");
  }, []);

  useSiteMotion(root, phase === "ready", Boolean(project));
  useCursor(root, phase === "ready" && !project);

  return (
    <div className="ko" id="top" ref={root} data-theme={theme} data-intro={intro ? phase : undefined}>
      <div className="ko-shop-outer" inert={intro}>
        <div className="ko-shop-inner">
          <div className="ko-shop">
            <a className="ko-skip" href="#work">
              Skip to work
            </a>
            <Header theme={theme} onToggleTheme={toggleTheme} onReplay={replay} />
            <div className="ko-scroll-frame">
              <div className="ko-scroll-content">
                <main className="ko-main">
                  <Hero visible={phase !== "stacking"} />
                  <Work onSelect={setProject} />
                  <Services />
                  <About />
                </main>
                <Footer onReplay={replay} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {intro && <Intro key={run} onEnter={() => setPhase("entering")} onComplete={finish} onSkip={finish} />}

      <div className="ko-cursor" aria-hidden="true">
        <span>View project</span>
      </div>

      {project && <ProjectDialog project={project} onClose={() => setProject(null)} />}
    </div>
  );
}
