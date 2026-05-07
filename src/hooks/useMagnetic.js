import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMagnetic({ pull = 0.32, stiffness = 280, damping = 22, mass = 0.6 } = {}) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping, mass });
  const y = useSpring(rawY, { stiffness, damping, mass });

  const onMouseMove = (e) => {
    const rect = (ref.current ?? e.currentTarget).getBoundingClientRect();
    rawX.set((e.clientX - (rect.left + rect.width / 2)) * pull);
    rawY.set((e.clientY - (rect.top + rect.height / 2)) * pull);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return { ref, x, y, onMouseMove, onMouseLeave };
}
