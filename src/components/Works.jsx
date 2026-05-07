import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant, cardGridContainer, cardReveal } from "../utils/motion";
import { useBooking } from "../context/BookingContext";

// Change D — Custom Framer Motion 3D perspective tilt (replaces react-tilt)
const ProjectTilt = ({ children, className }) => {
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 260, damping: 28 });
  const glareXPct = useTransform(x, [-0.5, 0.5], ["15%", "85%"]);
  const glareYPct = useTransform(y, [-0.5, 0.5], ["15%", "85%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareXPct} ${glareYPct}, rgba(255,255,255,0.28) 0%, transparent 55%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className={`${className} overflow-hidden rounded-2xl cursor-pointer`}
      style={{ rotateX: shouldReduce ? 0 : rotateX, rotateY: shouldReduce ? 0 : rotateY, transformPerspective: 900, transformStyle: "preserve-3d", willChange: hovered ? "transform" : "auto" }}
      onMouseMove={shouldReduce ? undefined : handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: glareBackground }}
      />
    </motion.div>
  );
};

const ProjectCard = ({ name, description, tags, gradient, source_code_link, overlayLabel }) => {
  const dest = source_code_link || "#contact";
  const handleCardClick = () => {
    if (dest.startsWith("#")) {
      document.querySelector(dest)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(dest, "_blank");
    }
  };

  return (
    <motion.div variants={cardReveal} onClick={handleCardClick} style={{ cursor: "pointer" }}>
      {/* Change D — ProjectTilt replaces <Tilt>; relative added for glare overlay */}
      <ProjectTilt className="relative bg-cream-card p-6 rounded-2xl sm:w-[340px] w-full border border-lavender/10 card-deep">
        {/* Change C — gradient thumbnail with noise overlay */}
        <a
          href={dest}
          target={source_code_link ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="relative w-full h-[200px] rounded-xl overflow-hidden group cursor-pointer block"
          style={{ background: gradient }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-lavender-deep/0 group-hover:bg-lavender-deep/70 transition-all duration-300 flex items-center justify-center">
            <span className="text-white font-semibold text-[15px] opacity-0 group-hover:opacity-100 transition-all duration-300">
              {source_code_link ? "View Project ↗" : (overlayLabel || "Ask About This →")}
            </span>
          </div>
          {/* Mobile-only persistent label */}
          <div className="absolute bottom-2 right-2 md:hidden">
            <span className="px-2.5 py-1 rounded-full bg-black/40 text-white text-[11px] font-medium backdrop-blur-sm">
              View ↗
            </span>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="text-white/90 font-bold text-[18px] drop-shadow-lg">{name}</span>
          </div>
          {/* Change C — noise/grain texture overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
              opacity: 0.08,
              mixBlendMode: "overlay",
              borderRadius: "inherit",
            }}
          />
        </a>

        <div className="mt-4">
          <h3 className="text-text-dark font-bold text-[20px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px] leading-[1.7]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={`text-[12px] font-semibold ${tag.color} px-2 py-0.5 rounded-full bg-lavender-light/50`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </ProjectTilt>
    </motion.div>
  );
};

const SKILLS = [
  "Custom Websites",
  "Online Stores",
  "Mobile-Friendly",
  "Fast Load Times",
  "Brand Identity",
  "Landing Pages",
  "SEO-Ready",
  "No Ongoing Fees",
  "Responsive Design",
  "Logo & Visual Design",
  "Easy to Update",
  "Built for Conversions",
  "Launched on Time",
  "Clear Pricing",
  "Local & Remote",
];

const Works = () => {
  const { open: openBooking } = useBooking();
  const marqueeRef = useRef(null);
  const marqueeContainerRef = useRef(null);
  // Change B — ref so hover handlers can pause/resume the tween
  const marqueeTweenRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = marqueeRef.current;
    if (!el) return;
    let tween;
    let velocityST;
    const raf = requestAnimationFrame(() => {
      const totalWidth = el.scrollWidth / 2;
      if (totalWidth === 0) return;
      tween = gsap.to(el, {
        x: -totalWidth,
        duration: 24,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const val = parseFloat(x) % totalWidth;
            return val > 0 ? val - totalWidth : val;
          }),
        },
      });
      // Change B — store tween in ref for hover access
      marqueeTweenRef.current = tween;

      velocityST = ScrollTrigger.create({
        trigger: marqueeContainerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const speed = Math.abs(self.getVelocity()) / 1000;
          marqueeTweenRef.current?.timeScale(1 + Math.min(speed, 4));
        },
        onLeave: () => {
          gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 1.2, ease: "power2.out" });
        },
        onLeaveBack: () => {
          gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 1.2, ease: "power2.out" });
        },
      });
    });
    return () => { cancelAnimationFrame(raf); tween?.kill(); velocityST?.kill(); };
  }, []);

  return (
    <>
      <div className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute -top-8 left-0 font-black text-lavender/5 leading-none select-none pointer-events-none whitespace-nowrap uppercase"
          style={{ fontSize: "clamp(5rem, 12vw, 10rem)", letterSpacing: "-0.05em" }}
        >
          PROJECTS
        </span>
        <motion.div variants={textVariant()} className="relative z-10">
          <p className={styles.sectionSubText}>20+ projects · 3 shown</p>
          <h2 className={styles.sectionHeadText}>Work That Paid Off.</h2>
        </motion.div>
      </div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className={`${styles.sectionBodyGap} text-secondary text-[16px] sm:text-[17px] max-w-2xl leading-[1.7]`}
      >
        Three from <strong className="text-lavender-deep font-bold text-[18px]">20+ client projects</strong> — each a real brief, a real business, and a real outcome.
      </motion.p>

      {/* Change B — hover pause/resume on the outer overflow-hidden container */}
      <div
        ref={marqueeContainerRef}
        className="mt-8 mb-6 overflow-hidden w-full"
        aria-hidden="true"
        onMouseEnter={() => marqueeTweenRef.current?.pause()}
        onMouseLeave={() => marqueeTweenRef.current?.play()}
      >
        <div ref={marqueeRef} className="flex gap-3 w-max will-change-transform">
          {[...SKILLS, ...SKILLS].map((skill, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full bg-lavender/20 border border-lavender/20 text-lavender-deep text-[13px] font-semibold whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        variants={cardGridContainer(0.12, 0.3)}
        className="mt-14 flex flex-wrap gap-8"
        id="projects"
        style={{ perspective: "900px" }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} />
        ))}
      </motion.div>

      <motion.div
        variants={fadeIn("up", "spring", 0.4, 0.75)}
        className="mt-16 flex flex-col sm:flex-row items-center gap-4"
      >
        <p className="text-secondary text-[16px] max-w-md">These three have something in common — they all started with a 15-minute call.</p>
        <button
          onClick={openBooking}
          className="px-7 py-3 rounded-full bg-lavender-deep text-white font-semibold text-[15px] hover:bg-lavender transition-all duration-300 shadow-lavender hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none active:scale-[0.97] shrink-0"
        >
          Book the 15-Minute Call →
        </button>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "work");
