"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/lib/work";
import { BookCall } from "./book-call";

const kindLabel = { automation: "Automation", website: "Website", motion: "Motion graphics" } as const;

export function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  function close() {
    dialog.current?.close();
    onClose();
  }

  const message = `Hi Jasini, I saw the ${project.role.toLowerCase()} you made for ${project.name}. I would like something similar for my business.`;

  return (
    <dialog
      ref={dialog}
      className="ko-dialog"
      aria-labelledby="ko-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="ko-dialog-inner" data-kind={project.kind}>
        <button type="button" className="ko-icon-button ko-dialog-close" aria-label="Close" onClick={close}>
          <X aria-hidden="true" />
        </button>

        <div className="ko-dialog-media">
          {project.video ? (
            <video src={project.video} poster={project.poster} controls autoPlay muted loop playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.full ?? project.card} alt={`${project.name}: ${project.role}`} />
          )}
        </div>

        <div className="ko-dialog-text">
          <div>
            <p className="ko-dialog-kind">{kindLabel[project.kind]}</p>
            <h2 id="ko-dialog-title">{project.name}</h2>
            <p className="ko-dialog-role">{project.role}</p>
            <p className="ko-dialog-summary">{project.summary}</p>
          </div>
          <div>
            <h3>{project.kind === "motion" ? "Details" : "What it does"}</h3>
            <ul className="ko-points">
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <ul className="ko-tools" aria-label="Tools">
              {project.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <div className="ko-dialog-actions">
              <BookCall className="ko-cta" label="Book a call about this" message={message} align="start" />
              {project.link && (
                <a className="ko-cta-ghost" href={project.link.href} target="_blank" rel="noopener noreferrer">
                  {project.link.label} <ArrowUpRight aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
