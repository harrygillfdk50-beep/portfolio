import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dot = dotRef.current;
    if (!dot) return;
    const onMouseMove = (e) => { pos.current.x = e.clientX; pos.current.y = e.clientY; };
    const onPointerOver = (e) => {
      if (e.target.closest("a, button")) dot.classList.add("cursor-dot--hovered");
    };
    const onPointerOut = (e) => {
      if (e.target.closest("a, button")) dot.classList.remove("cursor-dot--hovered");
    };
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    const LERP = 0.18;
    const tick = () => {
      current.current.x += (pos.current.x - current.current.x) * LERP;
      current.current.y += (pos.current.y - current.current.y) * LERP;
      dot.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
};

export default CustomCursor;
