import React, { useRef, useEffect } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant, cardGridContainer, cardReveal } from "../utils/motion";

const ProjectCard = ({ name, description, tags, gradient, source_code_link }) => (
  <motion.div variants={cardReveal}>
    <Tilt
      options={{ max: 12, scale: 1.02, speed: 400 }}
      className="bg-cream-card p-6 rounded-2xl sm:w-[340px] w-full border border-lavender/10 card-deep"
    >
      <a
        href={source_code_link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full h-[200px] rounded-xl overflow-hidden group cursor-pointer block"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 bg-lavender-deep/0 group-hover:bg-lavender-deep/70 transition-all duration-300 flex items-center justify-center">
          <span className="text-white font-semibold text-[15px] opacity-0 group-hover:opacity-100 transition-all duration-300">
            View Project ↗
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-white/90 font-bold text-[18px] drop-shadow-lg">{name}</span>
        </div>
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
    </Tilt>
  </motion.div>
);

const SKILLS = [
  "Figma",
  "React",
  "Tailwind CSS",
  "TypeScript",
  "GSAP",
  "UI/UX Design",
  "Next.js",
  "Framer Motion",
  "Responsive Design",
  "Prototyping",
];

const Works = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    let tween;
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
    });
    return () => { cancelAnimationFrame(raf); tween?.kill(); };
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
          <p className={styles.sectionSubText}>My Work</p>
          <h2 className={styles.sectionHeadText}>Projects.</h2>
        </motion.div>
      </div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-8 text-secondary text-[16px] max-w-3xl leading-relaxed"
      >
        Here are a few projects I've designed and built for real clients — each one crafted to be
        beautiful, easy to use, and built to make a strong impression.
      </motion.p>

      <div className="mt-8 mb-6 overflow-hidden w-full" aria-hidden="true">
        <div ref={marqueeRef} className="flex gap-3 w-max will-change-transform">
          {[...SKILLS, ...SKILLS].map((skill, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full bg-lavender/10 border border-lavender/20 text-lavender-deep text-[12px] font-semibold whitespace-nowrap"
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
      >
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} />
        ))}
      </motion.div>

      <motion.div
        variants={fadeIn("up", "spring", 0.4, 0.75)}
        className="mt-16 flex flex-col sm:flex-row items-center gap-4"
      >
        <p className="text-secondary text-[16px]">Like what you see?</p>
        <a
          href="#contact"
          className="px-7 py-3 rounded-full bg-lavender-deep text-white font-semibold text-[15px] hover:bg-lavender transition-all duration-300 shadow-lavender hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none active:scale-[0.97]"
        >
          Start a Project →
        </a>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "work");
