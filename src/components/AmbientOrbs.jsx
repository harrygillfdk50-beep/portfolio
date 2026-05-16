import { motion, useReducedMotion } from "framer-motion";

const ORBS = [
  { w: 520, h: 520, top: "8%",  left: "60%", color: "rgba(128,14,19,0.12)",  dur: 28, delay: 0    },
  { w: 380, h: 380, top: "42%", left: "5%",  color: "rgba(173,40,49,0.09)", dur: 34, delay: -8   },
  { w: 300, h: 300, top: "70%", left: "75%", color: "rgba(173,40,49,0.10)", dur: 22, delay: -14  },
];

const AmbientOrbs = () => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.w,
            height: orb.h,
            top: orb.top,
            left: orb.left,
            background: orb.color,
            willChange: "transform",
          }}
          animate={{
            y: [0, -32, 12, -18, 0],
            x: [0, 14, -10, 20, 0],
            scale: [1, 1.06, 0.97, 1.04, 1],
            opacity: [0.7, 1, 0.75, 0.95, 0.7],
          }}
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  );
};

export default AmbientOrbs;
