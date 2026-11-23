"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/gsap";
import { automations, motion, websites, type Project } from "@/lib/work";
import { BookCall } from "./book-call";
import { SectionHead } from "./section-head";

type Select = (project: Project) => void;

export function Work({ onSelect }: { onSelect: Select }) {
  let index = 0;
  const card = (project: Project) => <Card key={project.id} project={project} index={++index} onSelect={onSelect} />;

  return (
    <section id="work" className="ko-work ko-wrap" aria-labelledby="work-title">
      <SectionHead
        index="01"
        title="Selected work"
        id="work-title"
        note="Automations, websites and motion graphics, built for real businesses. Tap any project to see how it works."
      />

      <div className="ko-group">
        <GroupHead label="Automations" count={automations.length} />
        <ul className="ko-cards ko-cards-lead">{automations.slice(0, 4).map(card)}</ul>
        <ul className="ko-cards ko-spread ko-spread-auto">
          {automations.slice(4).map(card)}
          <li className="ko-card-entry">
            <div className="ko-next-card">
              <span className="ko-next-index">(07)</span>
              <p>Your business could be the next one on this page.</p>
              <BookCall className="ko-cta" align="start" />
            </div>
          </li>
        </ul>
      </div>

      <div className="ko-group">
        <GroupHead label="Websites" count={websites.length} />
        <ul className="ko-cards ko-spread ko-spread-web">{websites.map(card)}</ul>
      </div>

      <div className="ko-group">
        <GroupHead label="Motion graphics" count={motion.length} />
        <ul className="ko-cards ko-cards-lead ko-cards-motion">{motion.map(card)}</ul>
      </div>
    </section>
  );
}

function GroupHead({ label, count }: { label: string; count: number }) {
  return (
    <div className="ko-group-head">
      <h3>{label}</h3>
      <span>({String(count).padStart(2, "0")})</span>
    </div>
  );
}

function Card({ project, index, onSelect }: { project: Project; index: number; onSelect: Select }) {
  const video = useRef<HTMLVideoElement>(null);

  // Motion cards play silently while on screen.
  useEffect(() => {
    const element = video.current;
    if (!element || reducedMotion()) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) element.play().catch(() => {});
        else element.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <li className="ko-card-entry" data-kind={project.kind} data-project={project.id}>
      <button
        className="ko-card"
        type="button"
        aria-label={`View ${project.name}, ${project.role}`}
        onClick={() => onSelect(project)}
      >
        <span className="ko-card-media">
          <span className="ko-card-art">
            {project.video ? (
              <video ref={video} src={project.video} poster={project.poster} muted loop playsInline preload="none" aria-hidden="true" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.card} alt="" loading="lazy" decoding="async" />
            )}
          </span>
        </span>
        <span className="ko-card-info">
          <span>
            <strong>{project.name}</strong>
            <small>{project.role}</small>
          </span>
          <span className="ko-card-index">({String(index).padStart(2, "0")})</span>
        </span>
      </button>
    </li>
  );
}
