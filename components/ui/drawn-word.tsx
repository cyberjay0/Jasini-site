"use client";

import { useId, useMemo, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { layoutWord } from "@/lib/wordmark";
import { cn } from "@/lib/utils";

type DrawnWordProps = {
  /** Gradient start colour (any CSS colour, CSS variables allowed) */
  from: string;
  /** Gradient end colour */
  to: string;
  /** Solid colour revealed when a parent animates `.dw-fill` */
  fill?: string;
  /** Stroke width in font units (2000 per em) */
  strokeWidth?: number;
  /** Letter spacing in em */
  tracking?: number;
  /** Images that flash inside the letters (opening option C) */
  clipImages?: string[];
  /** Self-driven redraw loop, as in the 21st.dev path drawing hero */
  loop?: boolean;
  /** Start the loop (used to wait for the curtain) */
  play?: boolean;
  className?: string;
};

const PAD = 80;

/**
 * JASINI drawn as real Manrope outlines. Each letter is a path with
 * pathLength=1, so `.dw-stroke` can be drawn by tweening strokeDashoffset
 * from 1.02 (hidden) to 0 (fully drawn).
 */
export function DrawnWord({
  from,
  to,
  fill = "currentColor",
  strokeWidth = 26,
  tracking = -0.02,
  clipImages,
  loop = false,
  play = true,
  className,
}: DrawnWordProps) {
  const id = useId().replace(/:/g, "");
  const svg = useRef<SVGSVGElement>(null);
  const { placed, minX, maxX, capHeight } = useMemo(() => layoutWord(tracking), [tracking]);
  const viewBox = `${minX - PAD} ${-PAD} ${maxX - minX + PAD * 2} ${capHeight + PAD * 2}`;

  useGSAP(
    () => {
      if (!loop || !play || !svg.current) return;
      const strokes = svg.current.querySelectorAll(".dw-stroke");
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.45 })
          .fromTo(
            strokes,
            { strokeDashoffset: 1.02 },
            { strokeDashoffset: 0, duration: 1.15, stagger: 0.3, ease: "power1.inOut" },
          );
      });
      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(strokes, { strokeDashoffset: 0 });
      });
      return () => media.revert();
    },
    { scope: svg, dependencies: [loop, play], revertOnUpdate: true },
  );

  const glyphPaths = (props: React.SVGProps<SVGPathElement>) =>
    placed.map((glyph) => (
      <path key={glyph.key} d={glyph.d} transform={`translate(${glyph.x} 0)`} {...props} />
    ));

  return (
    <svg
      ref={svg}
      viewBox={viewBox}
      className={cn("dw", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`dw-grad-${id}`} gradientUnits="userSpaceOnUse" x1={minX} y1="0" x2={maxX} y2="0">
          <stop offset="0%" style={{ stopColor: from }} />
          <stop offset="100%" style={{ stopColor: to }} />
        </linearGradient>
        {clipImages && <clipPath id={`dw-clip-${id}`}>{glyphPaths({})}</clipPath>}
      </defs>

      {clipImages && (
        <g clipPath={`url(#dw-clip-${id})`}>
          {clipImages.map((src) => (
            <image
              key={src}
              className="dw-photo"
              href={src}
              x={minX}
              y={-PAD}
              width={maxX - minX}
              height={capHeight + PAD * 2}
              preserveAspectRatio="xMidYMid slice"
              style={{ opacity: 0, visibility: "hidden" }}
            />
          ))}
        </g>
      )}

      <g>{glyphPaths({ className: "dw-fill", fill, style: { opacity: 0 } })}</g>

      <g>
        {glyphPaths({
          className: "dw-stroke",
          fill: "none",
          stroke: `url(#dw-grad-${id})`,
          strokeWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          pathLength: 1,
          style: { strokeDasharray: "1 2", strokeDashoffset: 1.02 },
        })}
      </g>
    </svg>
  );
}
