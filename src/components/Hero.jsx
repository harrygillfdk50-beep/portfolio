import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { styles } from "../styles";

const CYCLING_WORDS = ["UI Designer", "UX Designer", "Front-End Developer", "Problem Solver"];

const Hero = () => {
  const nameRef = useRef(null);
  const cycleRef = useRef(null);
  const wordIndex = useRef(0);
  const scrambleRefs = useRef([]);
  const nameScrambleActive = useRef(false);

  // Mouse-reactive orb motion values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const handleSectionMouseMove = useCallback((e) => {
    mouseX.set(e.clientX / window.innerWidth);
    mouseY.set(e.clientY / window.innerHeight);
  }, [mouseX, mouseY]);

  const orb1X = useSpring(useTransform(mouseX, (v) => (v - 0.5) * 80), { stiffness: 40, damping: 20, mass: 1.5 });
  const orb1Y = useSpring(useTransform(mouseY, (v) => (v - 0.5) * 60), { stiffness: 40, damping: 20, mass: 1.5 });
  const orb2X = useSpring(useTransform(mouseX, (v) => (v - 0.5) * -50), { stiffness: 35, damping: 18, mass: 2 });
  const orb2Y = useSpring(useTransform(mouseY, (v) => (v - 0.5) * -40), { stiffness: 35, damping: 18, mass: 2 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Letter reveal
    if (!prefersReduced && nameRef.current) {
      const letters = nameRef.current.querySelectorAll(".letter");
      gsap.fromTo(
        letters,
        { opacity: 0, y: 40, rotateX: -90, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.045,
          ease: "back.out(1.4)",
          delay: 0.2,
          transformOrigin: "50% 0%",
        }
      );
    }

    // Scramble cycling
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const scrambleTo = (el, targetWord) => {
      let iteration = 0;
      const maxIterations = targetWord.length * 3;
      const id = setInterval(() => {
        el.textContent = targetWord
          .split("")
          .map((char, i) => {
            if (i < Math.floor(iteration / 3)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        iteration++;
        if (iteration > maxIterations) {
          clearInterval(id);
          scrambleRefs.current = scrambleRefs.current.filter(i => i !== id);
          el.textContent = targetWord;
        }
      }, 30);
      scrambleRefs.current.push(id);
    };

    if (prefersReduced) {
      if (cycleRef.current) cycleRef.current.textContent = CYCLING_WORDS[0];
      return;
    }

    const cycleInterval = setInterval(() => {
      if (!cycleRef.current) return;
      wordIndex.current = (wordIndex.current + 1) % CYCLING_WORDS.length;
      scrambleTo(cycleRef.current, CYCLING_WORDS[wordIndex.current]);
    }, 2500);

    return () => {
      clearInterval(cycleInterval);
      scrambleRefs.current.forEach(clearInterval);
      scrambleRefs.current = [];
    };
  }, []);

  // Name scramble on hover
  const handleNameHover = useCallback(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || nameScrambleActive.current || !nameRef.current) return;
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const allLetters = nameRef.current.querySelectorAll(".letter");
    // "Hi, I'm Harry" — "Harry" is the last 5 letters
    const harryLetters = Array.from(allLetters).slice(-5);
    const originalChars = harryLetters.map((el) => el.textContent);
    nameScrambleActive.current = true;
    let frame = 0;
    const TOTAL_FRAMES = 18;
    const tick = () => {
      frame++;
      harryLetters.forEach((el, i) => {
        const resolveAt = Math.floor((TOTAL_FRAMES / harryLetters.length) * i);
        if (frame > resolveAt + TOTAL_FRAMES * 0.4) {
          el.textContent = originalChars[i];
        } else {
          el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      });
      if (frame < TOTAL_FRAMES) setTimeout(tick, 30);
      else {
        harryLetters.forEach((el, i) => { el.textContent = originalChars[i]; });
        nameScrambleActive.current = false;
      }
    };
    tick();
  }, []);

  return (
    <section
      className="relative w-full h-screen mx-auto overflow-hidden"
      onMouseMove={handleSectionMouseMove}
    >
      {/* Floating lavender orbs — first two are mouse-reactive */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none orb-float w-[400px] h-[400px] bg-lavender/20 top-[-80px] right-[-100px]"
        style={{ x: orb1X, y: orb1Y, willChange: "transform" }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none orb-float-delay w-[300px] h-[300px] bg-lavender-deep/15 bottom-[100px] left-[-80px]"
        style={{ x: orb2X, y: orb2Y, willChange: "transform" }}
      />
      <div className="absolute rounded-full blur-3xl pointer-events-none orb-float-slow w-[200px] h-[200px] bg-lavender/25 top-[200px] left-[40%]" />
      <div className="absolute rounded-full blur-3xl pointer-events-none orb-float w-[150px] h-[150px] bg-lavender-deep/20 bottom-[200px] right-[20%]" />

      {/* Main content */}
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        {/* Lavender accent line */}
        <div className="flex flex-col justify-center items-center mt-5">
          <motion.div
            className="w-5 h-5 rounded-full bg-lavender"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4, ease: "backOut" }}
          />
          <motion.div
            className="w-1 sm:h-80 h-40 violet-gradient"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
          />
        </div>

        {/* Text */}
        <div className="z-10">
          <h1
            ref={nameRef}
            className={`${styles.heroHeadText} hero-head-fluid`}
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
              aria-live="polite"
              aria-atomic="true"
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
            className="mt-4 text-secondary text-[15px] sm:text-[17px] max-w-[500px] leading-[1.65]"
          >
            I turn complex briefs into clean, beautiful websites that actually convert.
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
              className="px-8 py-3.5 rounded-full bg-lavender-deep text-white font-bold text-[15px] hover:bg-[#4a3a7a] transition-all duration-300 shadow-[0_8px_30px_rgba(107,91,149,0.45)] hover:shadow-[0_12px_40px_rgba(107,91,149,0.6)] hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-[1px]"
            >
              See My Work
            </a>
            <a
              href="#contact"
              className="px-7 py-3 rounded-full border-2 border-lavender text-lavender-deep font-semibold text-[15px] hover:bg-lavender hover:text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-[1px]"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-8 w-full flex justify-center items-center z-10">
        <a href="#about" aria-label="Scroll to About section" className="p-3 -m-3 inline-flex">
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
