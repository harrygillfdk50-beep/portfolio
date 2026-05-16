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

      {/* How it works — simple sentences, no diagram */}
      <p className="mt-10 text-text-dark text-[14px] uppercase tracking-[0.18em] font-semibold">How it works</p>
      <ol className="mt-4 space-y-3 max-w-3xl">
        {automation.howItWorks.map((line, i) => (
          <li key={i} className="flex gap-4 text-secondary text-[15px] sm:text-[16px] leading-[1.75]">
            <span className="text-lavender font-display italic text-[22px] leading-none flex-shrink-0 w-7">
              {i + 1}.
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ol>

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

      {/* Want to know more — single inline line */}
      <p className="mt-10 text-text-dark text-[15px] sm:text-[16px] leading-[1.75]">
        Want to know more?{" "}
        <button
          onClick={openBooking}
          className="text-lavender font-semibold underline decoration-lavender/40 underline-offset-4 hover:decoration-lavender transition-colors"
        >
          Book a 15-minute call
        </button>{" "}
        or send an email to{" "}
        <a
          href={`mailto:${automation.email}?subject=Speed-Lead%20enquiry`}
          className="text-lavender font-semibold underline decoration-lavender/40 underline-offset-4 hover:decoration-lavender transition-colors"
        >
          {automation.email}
        </a>
        .
      </p>
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
