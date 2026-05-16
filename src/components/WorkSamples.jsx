import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { workSamples } from "../constants";
import { fadeIn, textVariant, cardGridContainer, cardReveal } from "../utils/motion";

/**
 * 3D perspective tilt with glare — adapted from Works.jsx, taller cards.
 */
const SampleTilt = ({ children, className, disabled = false }) => {
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 240,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 240,
    damping: 28,
  });
  const glareXPct = useTransform(x, [-0.5, 0.5], ["20%", "80%"]);
  const glareYPct = useTransform(y, [-0.5, 0.5], ["20%", "80%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareXPct} ${glareYPct}, rgba(255,255,255,0.25) 0%, transparent 55%)`;

  const handleMouseMove = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`${className} relative overflow-hidden rounded-2xl ${disabled ? "" : "cursor-pointer"}`}
      style={{
        rotateX: shouldReduce || disabled ? 0 : rotateX,
        rotateY: shouldReduce || disabled ? 0 : rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        willChange: hovered ? "transform" : "auto",
      }}
      onMouseMove={shouldReduce || disabled ? undefined : handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={disabled ? undefined : { scale: 0.985 }}
    >
      {children}
      {!disabled && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
};

const SampleCard = ({ sample }) => {
  const isLive = sample.status === "live";
  const handleClick = () => {
    if (isLive && sample.liveUrl) window.open(sample.liveUrl, "_blank", "noopener");
  };

  return (
    <motion.div
      variants={cardReveal}
      onClick={handleClick}
      className="w-full sm:w-[360px]"
    >
      <SampleTilt
        disabled={!isLive}
        className={`bg-cream-card border border-lavender/15 card-deep h-full ${
          isLive ? "" : "opacity-70"
        }`}
      >
        {/* Image / placeholder */}
        <div
          className="relative w-full h-[230px] overflow-hidden"
          style={
            isLive
              ? undefined
              : {
                  background:
                    "linear-gradient(135deg, #5a2228 0%, #800e13 100%)",
                }
          }
        >
          {isLive && sample.image ? (
            <img
              src={sample.image}
              alt={`${sample.name} — preview`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <p className="font-display italic text-white/90 text-[34px] leading-none">
                  Coming
                </p>
                <p className="font-display italic text-white/90 text-[34px] leading-none mt-1">
                  Soon
                </p>
              </div>
            </div>
          )}

          {/* Live badge */}
          {isLive && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lavender-deep/90 text-white text-[11px] font-semibold backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                Live
              </span>
            </div>
          )}

          {/* Hover overlay (live only) */}
          {isLive && (
            <div className="absolute inset-0 bg-lavender-deep/0 hover:bg-lavender-deep/65 transition-all duration-300 flex items-center justify-center group">
              <span className="text-white font-semibold text-[15px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                Visit Site ↗
              </span>
            </div>
          )}

          {/* Noise grain */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
              opacity: 0.08,
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-lavender-deep font-semibold mb-2">
            {sample.category}
          </p>
          <h3 className="text-text-dark font-bold text-[22px] leading-tight">
            {sample.name}
          </h3>
          <p className="mt-3 text-secondary text-[14px] leading-[1.7]">
            {sample.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {sample.tags.map((tag) => (
              <span
                key={`${sample.name}-${tag.name}`}
                className={`text-[12px] font-semibold ${tag.color} px-2.5 py-0.5 rounded-full bg-lavender-light/50`}
              >
                #{tag.name}
              </span>
            ))}
          </div>

          {isLive && sample.liveUrl && (
            <a
              href={sample.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 mt-5 text-lavender-deep text-[13px] font-semibold border-b border-lavender-deep/40 hover:border-lavender-deep pb-0.5"
            >
              Open live site ↗
            </a>
          )}
        </div>
      </SampleTilt>
    </motion.div>
  );
};

const WorkSamples = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute -top-8 left-0 font-black text-lavender/5 leading-none select-none pointer-events-none whitespace-nowrap uppercase"
          style={{ fontSize: "clamp(5rem, 12vw, 10rem)", letterSpacing: "-0.05em" }}
        >
          SAMPLES
        </span>
        <motion.div variants={textVariant()} className="relative z-10">
          <p className={styles.sectionSubText}>Showcase · Sample Builds</p>
          <h2 className={styles.sectionHeadText}>My Work Samples.</h2>
        </motion.div>
      </div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className={`${styles.sectionBodyGap} text-secondary text-[16px] sm:text-[17px] max-w-2xl leading-[1.7]`}
      >
        Three end-to-end samples built to demonstrate the full range — design, copy, motion, custom domain, deploy. The first is live; the next two are in build.
      </motion.p>

      <motion.div
        variants={cardGridContainer(0.14, 0.3)}
        className="mt-14 flex flex-wrap gap-8 justify-center sm:justify-start"
        id="samples"
        style={{ perspective: "1000px" }}
      >
        {workSamples.map((sample, index) => (
          <SampleCard key={`sample-${index}`} sample={sample} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(WorkSamples, "samples");
