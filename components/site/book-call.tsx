"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { contact, emailLink, whatsappLink } from "@/lib/opening-data";
import { cn } from "@/lib/utils";

/** "Book a call" button that offers WhatsApp or email, optionally with a prefilled message. */
export function BookCall({
  className,
  label = "Book a call",
  message,
  align = "end",
}: {
  className?: string;
  label?: string;
  message?: string;
  align?: "start" | "center" | "end";
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape, true);
    };
  }, [open]);

  return (
    <div className="ko-book" ref={root}>
      <button
        type="button"
        className={cn("ko-book-trigger", className)}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {label} <ArrowUpRight aria-hidden="true" />
      </button>
      {open && (
        <div className="ko-book-menu" role="menu" data-align={align}>
          <a role="menuitem" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" />
            <span>
              WhatsApp<small>Fastest reply</small>
            </span>
          </a>
          <a role="menuitem" href={emailLink(message)}>
            <Mail aria-hidden="true" />
            <span>
              Email<small>{contact.emailAddress}</small>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
