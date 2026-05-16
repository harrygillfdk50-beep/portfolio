import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, cardGridContainer, cardReveal } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Happy Clients" },
];

const StatCounter = ({ value, suffix, label }) => {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: function () {
        if (el) el.textContent = Math.round(obj.val) + suffix;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, suffix]);

  return (
    <motion.div
      variants={cardReveal}
      className="flex flex-col items-center p-6 sm:p-8 bg-cream-card rounded-2xl shadow-card border border-lavender/10 border-l-4 border-l-accent/70 min-w-0 w-full sm:w-auto sm:min-w-[130px]"
    >
      <span ref={numRef} className="font-display text-[46px] text-accent leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>
        0{suffix}
      </span>
      <span className="text-secondary text-[13px] mt-4 text-center font-medium">{label}</span>
    </motion.div>
  );
};

const About = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute -top-6 left-0 font-black text-lavender/5 leading-none select-none pointer-events-none uppercase"
          style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)", letterSpacing: "-0.04em", whiteSpace: "nowrap" }}
        >
          ABOUT
        </span>
        <motion.div variants={textVariant()} className="relative z-10">
          <p className={styles.sectionSubText}>Who I Am</p>
          <h2 className={styles.sectionHeadText}>Why Clients Come Back.</h2>
        </motion.div>
      </div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 text-secondary text-[16px] sm:text-[17px] max-w-2xl leading-[1.75]"
      >
        I'm a Canadian designer, front-end developer, and AI automation builder. I build things that help businesses grow and cut costs at the same time — AI systems that handle lead capture and customer follow-up around the clock, and websites that turn first-time visitors into customers. I care about the details most clients never notice: the tiny things that build trust before anyone reads a word, and make booking or buying feel obvious. Most clients come back — not because I'm the cheapest, but because they stopped having to think about their website or their leads.
      </motion.p>

      <motion.div
        variants={cardGridContainer(0.15, 0.2)}
        className={`${styles.sectionBodyGap} flex flex-wrap gap-8 sm:gap-10 justify-start`}
      >
        {stats.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </motion.div>

      <div className="mt-10">
        <p className="text-[13px] font-semibold text-lavender-mid uppercase tracking-[0.12em] mb-4">What I Build</p>
        <div className="flex flex-wrap gap-2">
          {["AI Automation", "Lead Systems", "Websites", "Online Stores", "Branding", "Mobile-Friendly", "Fast Load Times", "Landing Pages"].map((tool) => (
            <span
              key={tool}
              className="px-3 py-1.5 rounded-full text-[13px] font-medium bg-lavender-pale/40 text-lavender-deep border border-lavender-pale/60"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
