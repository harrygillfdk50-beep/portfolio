import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
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
      scrollTrigger: { trigger: el, start: "top 85%" },
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
      variants={fadeIn("up", "spring", 0.3, 0.8)}
      className="flex flex-col items-center p-8 bg-cream-card rounded-2xl shadow-card border border-lavender/10 min-w-[130px]"
    >
      <span ref={numRef} className="text-[42px] font-black text-lavender-deep leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>
        0{suffix}
      </span>
      <span className="text-secondary text-[13px] mt-3 text-center font-medium">{label}</span>
    </motion.div>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Who I Am</p>
        <h2 className={styles.sectionHeadText}>About Me.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 text-secondary text-[17px] sm:text-[18px] max-w-3xl leading-[1.75]"
      >
        I'm a Canadian designer and front-end developer who's spent the last three years working with restaurants, startups, and independent brands to make their websites work as hard as they do. I care about the details most clients never see — the micro-interaction that builds trust, the hierarchy that makes a decision feel easy, the load time that keeps someone on the page.
      </motion.p>

      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.8)}
        className="mt-16 flex flex-wrap gap-8 sm:gap-10 justify-start"
      >
        {stats.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");
