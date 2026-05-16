import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const buildPaths = (position, stroke, baseOpacity, opacityStep) =>
  Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    stroke,
    width: 0.5 + i * 0.03,
    opacity: baseOpacity + i * opacityStep,
    duration: 18 + ((i * 7) % 12),
  }));

const PathLayer = ({ position, stroke, baseOpacity, opacityStep }) => {
  const paths = useMemo(
    () => buildPaths(position, stroke, baseOpacity, opacityStep),
    [position, stroke, baseOpacity, opacityStep]
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {paths.map((p) => (
          <motion.path
            key={p.id}
            d={p.d}
            stroke={p.stroke}
            strokeWidth={p.width}
            strokeOpacity={p.opacity}
            initial={{ pathLength: 0.3, opacity: p.opacity * 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const BackgroundPaths = () => {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <PathLayer position={1}  stroke="#ad2831" baseOpacity={0.18} opacityStep={0.016} />
      <PathLayer position={-1} stroke="#ad2831" baseOpacity={0.12} opacityStep={0.013} />
    </div>
  );
};

export default BackgroundPaths;
