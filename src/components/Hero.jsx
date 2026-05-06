import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { styles } from "../styles";

const CYCLING_WORDS = ["UI Designer", "UX Designer", "Front-End Developer", "Problem Solver"];

const FloatingOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />
);

const Hero = () => {
  const nameRef = useRef(null);
  const cycleRef = useRef(null);
  const wordIndex = useRef(0);

  useEffect(() => {
    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll(".letter");
      gsap.fromTo(
        letters,
        { opacity: 0, y: 60, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.06,
          stagger: 0.06,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );
    }

    const cycleFn = () => {
      if (!cycleRef.current) return;
      wordIndex.current = (wordIndex.current + 1) % CYCLING_WORDS.length;
      gsap.to(cycleRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          if (cycleRef.current) {
            cycleRef.current.textContent = CYCLING_WORDS[wordIndex.current];
            gsap.to(cycleRef.current, { opacity: 1, y: 0, duration: 0.4 });
          }
        },
      });
    };

    const interval = setInterval(cycleFn, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Floating lavender orbs */}
      <FloatingOrb className="orb-float w-[400px] h-[400px] bg-lavender/20 top-[-80px] right-[-100px]" />
      <FloatingOrb className="orb-float-delay w-[300px] h-[300px] bg-lavender-deep/15 bottom-[100px] left-[-80px]" />
      <FloatingOrb className="orb-float-slow w-[200px] h-[200px] bg-lavender/25 top-[200px] left-[40%]" />
      <FloatingOrb className="orb-float w-[150px] h-[150px] bg-lavender-deep/20 bottom-[200px] right-[20%]" />

      {/* Main content */}
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        {/* Lavender accent line */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-lavender" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* Text */}
        <div className="z-10">
          <h1
            ref={nameRef}
            className={styles.heroHeadText}
            style={{ perspective: "600px" }}
          >
            {"Hi, I'm ".split("").map((char, i) => (
              <span
                key={`pre-${i}`}
                className="letter inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </span>
            ))}
            {"Harry".split("").map((char, i) => (
              <span
                key={`name-${i}`}
                className="letter inline-block text-lavender-deep"
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Cycling subtitle */}
          <div className={`${styles.heroSubText} mt-3 flex flex-wrap items-center gap-2`}>
            <span className="text-secondary">I'm a</span>
            <span
              ref={cycleRef}
              className="text-lavender-deep font-semibold inline-block min-w-[200px]"
            >
              {CYCLING_WORDS[0]}
            </span>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-4 text-secondary text-[15px] sm:text-[17px] max-w-[500px] leading-relaxed"
          >
            I believe a great website shouldn't feel complicated — for you or your customers.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-7 py-3 rounded-full bg-lavender-deep text-white font-semibold text-[15px] hover:bg-lavender transition-all duration-300 shadow-lavender hover:shadow-lg hover:-translate-y-0.5"
            >
              See My Work
            </a>
            <a
              href="#contact"
              className="px-7 py-3 rounded-full border-2 border-lavender text-lavender-deep font-semibold text-[15px] hover:bg-lavender hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-8 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-[32px] h-[58px] rounded-3xl border-[3px] border-lavender flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-2.5 h-2.5 rounded-full bg-lavender"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
