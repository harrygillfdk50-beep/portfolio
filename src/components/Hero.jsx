import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { styles } from "../styles";
import { useMagnetic } from "../hooks/useMagnetic";
import { useBooking } from "../context/BookingContext";

const CYCLING_WORDS = ["AI Automations That Save Hours", "Lead Systems That Don't Sleep", "Websites That Fill Tables", "Stores That Sell While You Sleep"];

const MagneticButton = ({ children, className }) => {
  const { x, y, onMouseMove, onMouseLeave } = useMagnetic({ pull: 0.30 });
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 200, damping: 28 });

  return (
    <motion.div
      style={{ x, y, scale: springScale, display: "inline-block" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onFocus={() => scale.set(1.04)}
      onBlur={() => scale.set(1)}
      whileTap={{ scale: 0.94 }}
      className={`outline-none rounded-full ${className || ""}`}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const { open: openBooking } = useBooking();
  const shouldReduceMotion = useReducedMotion();
  const nameRef = useRef(null);
  const cycleRef = useRef(null);
  const wordIndex = useRef(0);
  const scrambleRefs = useRef([]);
  const nameScrambleActive = useRef(false);
  const rafPending = useRef(false);

  // Mouse-reactive orb motion values
  const [orbsActive, setOrbsActive] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const handleSectionMouseMove = useCallback((e) => {
    if (!orbsActive) setOrbsActive(true);
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
      rafPending.current = false;
    });
  }, [mouseX, mouseY, orbsActive]);
  const handleSectionMouseLeave = useCallback(() => {
    setOrbsActive(false);
  }, []);

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
    }, 7000);

    return () => {
      clearInterval(cycleInterval);
      scrambleRefs.current.forEach(clearInterval);
      scrambleRefs.current = [];
    };
  }, []);

  // Name scramble on hover
  const handleNameHover = useCallback(() => {
    if (shouldReduceMotion || nameScrambleActive.current || !nameRef.current) return;
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
  }, [shouldReduceMotion]);

  return (
    <section
      className="relative w-full h-screen mx-auto overflow-hidden paper-texture"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
    >
      {/* Floating lavender orbs — mouse-reactive */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full blur-3xl pointer-events-none w-[400px] h-[400px] bg-lavender/20 top-[-80px] right-[-100px]"
        style={{ x: orb1X, y: orb1Y, willChange: orbsActive ? "transform" : "auto" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full blur-3xl pointer-events-none w-[300px] h-[300px] bg-lavender-deep/15 bottom-[100px] left-[-80px]"
        style={{ x: orb2X, y: orb2Y, willChange: orbsActive ? "transform" : "auto" }}
      />

      {/* Main content */}
      <div className={`absolute inset-0 max-w-7xl mx-auto ${styles.paddingX} flex flex-col items-center justify-center text-center`}>

        {/* Text */}
        <div className="z-10 flex flex-col items-center">
          <h1
            ref={nameRef}
            className={`${styles.heroHeadText} hero-head-fluid`}
            style={{ perspective: "600px" }}
            onMouseEnter={handleNameHover}
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
            <span className="font-display italic">
              {"Harry".split("").map((char, i) => (
                <span
                  key={`name-${i}`}
                  className="letter inline-block text-lavender-deep"
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          {/* Cycling subtitle */}
          <div className={`${styles.heroSubText} mt-3 flex flex-wrap items-center justify-center gap-2`}>
            <span className="text-secondary">I build</span>
            <span
              ref={cycleRef}
              aria-live="polite"
              aria-atomic="true"
              className="text-lavender-deep font-semibold inline-block min-w-[min(200px,55vw)] border-b-2 border-accent/50"
            >
              {CYCLING_WORDS[0]}
            </span>
          </div>

          {/* Tagline */}
          <p className="mt-4 text-secondary text-[15px] sm:text-[17px] max-w-[520px] leading-[1.65] text-center">
            {"Real, working AI automation for small businesses — plus the websites and brands that make them look the part.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.9 + i * 0.035, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.28em]"
              >
                {word}
              </motion.span>
            ))}
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-3 text-secondary/60 text-[13px] tracking-wide"
          >
            Canadian designer · remote-friendly worldwide
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8 flex flex-col xs:flex-row flex-wrap gap-3 xs:gap-4 justify-center items-center"
          >
            <MagneticButton>
              <a
                href="#projects"
                className="w-full xs:w-auto px-8 py-3.5 rounded-full bg-lavender-deep text-white font-bold text-[15px] hover:bg-lavender-mid transition-all duration-300 shadow-[0_8px_30px_rgba(61,107,82,0.35)] hover:shadow-[0_12px_40px_rgba(61,107,82,0.45)] hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-[1px]"
              >
                See What I've Built
              </a>
            </MagneticButton>
            <MagneticButton>
              <button
                onClick={openBooking}
                className="w-full xs:w-auto px-7 py-3 rounded-full border-2 border-lavender text-lavender-deep font-semibold text-[15px] hover:bg-lavender hover:text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-[1px]"
              >
                Book the Free Call
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-8 w-full flex justify-center items-center z-10">
        <a href="#about" aria-label="Scroll to About section" className="p-3 -m-3 inline-flex">
          <div className="w-[32px] h-[58px] rounded-3xl border-[3px] border-lavender flex justify-center items-start p-2">
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 20, 0] }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-2.5 h-2.5 rounded-full bg-lavender"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
