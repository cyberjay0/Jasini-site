"use client";

import { Workflow } from "lucide-react";
import { themes, type Theme } from "@/lib/opening-data";
import { BookCall } from "./book-call";

export function Header({
  theme,
  onToggleTheme,
  onReplay,
}: {
  theme: Theme;
  onToggleTheme: () => void;
  onReplay: () => void;
}) {
  const next: Theme = theme === "forest" ? "paper" : "forest";
  return (
    <header className="ko-header">
      <div className="ko-header-inner ko-wrap">
        <button className="ko-logo" type="button" onClick={onReplay} aria-label="Jasini, replay the opening">
          <Workflow aria-hidden="true" />
          <span>Jasini</span>
        </button>
        <nav className="ko-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <BookCall className="ko-nav-cta" />
          <button
            type="button"
            className="ko-theme-dot"
            onClick={onToggleTheme}
            aria-label={`Switch to ${themes[next].label.toLowerCase()} mode`}
            title={`${themes[next].label} mode`}
          >
            <span style={{ backgroundColor: themes[next].color }} />
          </button>
        </nav>
      </div>
    </header>
  );
}
