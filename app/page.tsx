"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Monitor, RotateCcw, Smartphone } from "lucide-react";
import { themes, type Theme, type Variant } from "@/lib/opening-data";

type Device = "desktop" | "phone";

const options: { id: Variant; name: string; text: string }[] = [
  {
    id: "a",
    name: "Draw, then photos",
    text: "Your name is written in outline, fills in green, then your work flashes over it. Swipe and the site slides up with your name rising letter by letter.",
  },
  {
    id: "b",
    name: "Knockout opening, drawn hero",
    text: "Knockout as it is: letters rise while your work flashes over them. Swipe and the site slides up; then your name writes itself in the hero.",
  },
  {
    id: "c",
    name: "Photos inside the letters",
    text: "Your name is written in outline while your work flashes inside the letters. Swipe and the site slides up with your name rising letter by letter.",
  },
];

const screens: Record<Device, { w: number; h: number }> = {
  desktop: { w: 1440, h: 900 },
  phone: { w: 390, h: 844 },
};

export default function OpeningLab() {
  const [device, setDevice] = useState<Device>("desktop");
  const [theme, setTheme] = useState<Theme>("forest");
  const [runs, setRuns] = useState<Record<Variant, number>>({ a: 0, b: 0, c: 0 });

  const replay = (id: Variant) => setRuns((current) => ({ ...current, [id]: current[id] + 1 }));
  const replayAll = () => setRuns((current) => ({ a: current.a + 1, b: current.b + 1, c: current.c + 1 }));

  return (
    <main className="min-h-dvh bg-[#0b100d] px-4 py-8 text-[#e5ece3] sm:px-8 lg:px-10" style={{ fontFamily: '"Manrope Variable", system-ui, sans-serif' }}>
      <header className="mx-auto flex max-w-[1800px] flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[#8fa192]">Jasini · Phase 1 · Opening</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Three ways to merge the two openings</h1>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-[#8fa192]">
            Each window plays its opening. When the counter reaches 100, scroll or swipe inside the window to enter the site.
            Use Replay to watch again, or open one full screen to feel it properly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
          <div className="flex gap-1 rounded-full bg-[#141d17] p-1" role="group" aria-label="Screen size">
            {(["desktop", "phone"] as Device[]).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={device === item}
                onClick={() => setDevice(item)}
                className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 capitalize text-[#8fa192] aria-pressed:bg-[#e5ece3] aria-pressed:text-[#0b100d]"
              >
                {item === "desktop" ? <Monitor className="size-4" aria-hidden="true" /> : <Smartphone className="size-4" aria-hidden="true" />}
                {item}
              </button>
            ))}
          </div>
          <div className="flex gap-1 rounded-full bg-[#141d17] p-1" role="group" aria-label="Site colour">
            {themes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={theme === item.id}
                onClick={() => setTheme(item.id)}
                className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-[#8fa192] aria-pressed:bg-[#e5ece3] aria-pressed:text-[#0b100d]"
              >
                <span className="size-3.5 rounded-full ring-1 ring-white/30" style={{ background: item.color }} aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={replayAll}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#8bd39b] px-5 text-[#06110a]"
          >
            <RotateCcw className="size-4" aria-hidden="true" /> Replay all
          </button>
        </div>
      </header>

      <div className="mx-auto mt-10 grid max-w-[1800px] gap-10 lg:grid-cols-3 lg:gap-6">
        {options.map((option) => (
          <section key={option.id} aria-labelledby={`option-${option.id}`} className="flex flex-col">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-[#8bd39b]">{option.id.toUpperCase()}</span>
              <h2 id={`option-${option.id}`} className="text-lg font-extrabold tracking-tight">
                {option.name}
              </h2>
            </div>
            <p className="mt-2 min-h-[4.5rem] text-sm font-semibold leading-relaxed text-[#8fa192]">{option.text}</p>

            <Screen variant={option.id} device={device} theme={theme} run={runs[option.id]} />

            <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold">
              <button
                type="button"
                onClick={() => replay(option.id)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#243629] px-4 hover:border-[#8bd39b]"
              >
                <RotateCcw className="size-4" aria-hidden="true" /> Replay
              </button>
              <a
                href={`/opening/${option.id}?theme=${theme}`}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#243629] px-4 hover:border-[#8bd39b]"
              >
                Open full screen <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function Screen({ variant, device, theme, run }: { variant: Variant; device: Device; theme: Theme; run: number }) {
  const box = useRef<HTMLDivElement>(null);
  const size = screens[device];
  const [scale, setScale] = useState(0.4);

  useLayoutEffect(() => {
    const element = box.current;
    if (!element) return;
    const measure = () => setScale(element.clientWidth / size.w);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [size.w]);

  return (
    <div
      ref={box}
      className={
        device === "phone"
          ? "relative mx-auto w-full max-w-[300px] overflow-hidden rounded-[2rem] bg-black ring-[6px] ring-[#1c261f]"
          : "relative w-full overflow-hidden rounded-xl bg-black ring-1 ring-[#243629]"
      }
      style={{ aspectRatio: `${size.w} / ${size.h}` }}
    >
      <iframe
        key={`${run}-${device}-${theme}`}
        src={`/opening/${variant}?theme=${theme}`}
        title={`Opening option ${variant.toUpperCase()}`}
        className="absolute left-0 top-0 border-0"
        style={{ width: size.w, height: size.h, transform: `scale(${scale})`, transformOrigin: "0 0" }}
      />
    </div>
  );
}
