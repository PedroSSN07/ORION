import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
export default function PointerEffects() {
  const cursor = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const halo = cursor.current;
    if (!halo) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        leave();
        return;
      }
      const target = event.target instanceof Element ? event.target : null;
      const editing = target?.closest(
        'input, textarea, select, [contenteditable="true"]',
      );
      halo.dataset.interactive = String(
        Boolean(
          target?.closest(
            'a[href], button, [role="button"], [role="tab"], canvas',
          ),
        ),
      );
      halo.dataset.editing = String(Boolean(editing));
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        halo.style.transform = `translate3d(${x - 12}px,${y - 12}px,0)`;
        halo.style.opacity = "1";
        frame = 0;
      });
    };
    const leave = () => {
      halo.style.opacity = "0";
    };
    const buttons = Array.from(
      document.querySelectorAll<HTMLElement>(".button"),
    );
    const magnetic = (event: PointerEvent) => {
      const button = event.currentTarget as HTMLElement;
      const rect = button.getBoundingClientRect();
      button.style.translate = `${(event.clientX - rect.left - rect.width / 2) * 0.055}px ${(event.clientY - rect.top - rect.height / 2) * 0.08}px`;
    };
    const reset = (event: PointerEvent) => {
      (event.currentTarget as HTMLElement).style.translate = "0px 0px";
    };
    const press = () => {
      halo.dataset.pressed = "true";
    };
    const release = () => {
      halo.dataset.pressed = "false";
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Tab") leave();
    };
    document.addEventListener("pointerdown", press);
    document.addEventListener("pointerup", release);
    document.addEventListener("pointercancel", release);
    document.addEventListener("keydown", keyboard);
    window.addEventListener("blur", leave);
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    buttons.forEach((button) => {
      button.addEventListener("pointermove", magnetic);
      button.addEventListener("pointerleave", reset);
    });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("pointercancel", release);
      document.removeEventListener("keydown", keyboard);
      window.removeEventListener("blur", leave);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      buttons.forEach((button) => {
        button.removeEventListener("pointermove", magnetic);
        button.removeEventListener("pointerleave", reset);
        button.style.translate = "";
      });
    };
  }, [reduced]);
  return <div ref={cursor} className="pointer-halo" aria-hidden="true" />;
}
