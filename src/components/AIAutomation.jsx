import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { aiAutomations } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useBooking } from "../context/BookingContext";

const AutomationCard = ({ automation }) => {
  const { open: openBooking } = useBooking();

  return (
    <motion.article
      variants={fadeIn("up", "spring", 0.15, 0.9)}
      className="relative bg-cream-card border border-lavender-light/40 card-deep rounded-3xl p-8 sm:p-12 mt-10"
    >
      {/* Status badge */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender-deep/15 border border-lavender/30 text-lavender text-[11px] uppercase tracking-wider font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-lavender animate-pulse" />
        {automation.status}
      </div>

      {/* Headline */}
      <p className="text-[12px] uppercase tracking-[0.2em] text-lavender font-semibold mb-3">
        {automation.eyebrow}
      </p>
      <h3 className="font-display italic text-text-dark text-[42px] sm:text-[64px] leading-[1.02] tracking-tight">
        {automation.name}
      </h3>
      <p className="mt-4 text-lavender-light text-[18px] sm:text-[22px] italic font-display max-w-2xl leading-[1.4]">
        {automation.tagline}
      </p>

      {/* Body */}
      <p className="mt-8 text-secondary text-[16px] sm:text-[17px] leading-[1.85] max-w-3xl">
        {automation.body}
      </p>

      {/* Flow visual */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 items-stretch">
        {automation.flow.map((step, i) => (
          <div key={i} className="relative flex flex-col">
            <div className="flex-1 px-4 py-5 sm:px-5 sm:py-6 rounded-2xl bg-primary/40 border border-lavender-light/30 text-center">
              <p className="text-text-dark font-semibold text-[14px] sm:text-[15px] leading-snug">
                {step.label}
              </p>
              <p className="mt-1.5 text-secondary text-[11px] uppercase tracking-[0.16em]">
                {step.role}
              </p>
            </div>
            {/* Arrow between steps */}
            {i < automation.flow.length - 1 && (
              <div
                aria-hidden="true"
                className="absolute hidden sm:flex items-center justify-center top-1/2 -right-2 -translate-y-1/2 z-10 text-lavender text-[24px] font-bold"
                style={{ transform: "translateX(50%) translateY(-50%)" }}
              >
                →
              </div>
            )}
            {i < automation.flow.length - 1 && (
              <div
                aria-hidden="true"
                className="sm:hidden flex items-center justify-center py-1 text-lavender text-[18px] font-bold"
              >
                ↓
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tech tags */}
      <div className="mt-8 flex flex-wrap gap-2">
        {automation.tags.map((tag) => (
          <span
            key={tag}
            className="text-[12px] font-semibold text-lavender px-3 py-1 rounded-full bg-lavender-deep/15 border border-lavender/25"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <button
          onClick={openBooking}
          className="px-7 py-3.5 rounded-full bg-lavender-deep text-white font-semibold text-[15px] hover:bg-lavender transition-all duration-300 btn-primary-shadow hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.97]"
        >
          Book a 15-Minute Zoom Call →
        </button>
        <a
          href={`mailto:${automation.email}?subject=Speed-Lead%20enquiry`}
          className="px-7 py-3.5 rounded-full border-2 border-lavender text-lavender font-semibold text-[15px] hover:bg-lavender hover:text-white transition-all duration-300 text-center"
        >
          {automation.email}
        </a>
      </div>
    </motion.article>
  );
};

const AIAutomation = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute -top-8 left-0 font-black text-lavender/5 leading-none select-none pointer-events-none whitespace-nowrap uppercase"
          style={{ fontSize: "clamp(5rem, 12vw, 10rem)", letterSpacing: "-0.05em" }}
        >
          AUTOMATION
        </span>
        <motion.div variants={textVariant()} className="relative z-10">
          <p className={styles.sectionSubText}>AI Automation · Lead Capture</p>
          <h2 className={styles.sectionHeadText}>Built with AI.</h2>
        </motion.div>
      </div>

      {aiAutomations.map((auto) => (
        <AutomationCard key={auto.name} automation={auto} />
      ))}
    </>
  );
};

export default SectionWrapper(AIAutomation, "work");
