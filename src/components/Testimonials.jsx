import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { styles } from "../styles";
import { testimonials } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useBooking } from "../context/BookingContext";

const initials = (name) => name.split(" ").map((n) => n[0]).join("");

const AVATAR_COLORS = [
  { bg: "bg-[#ede7c0]/80", text: "text-[#606c38]" },
  { bg: "bg-[#f5efc8]/80", text: "text-[#bc6c25]" },
  { bg: "bg-[#e2d9a8]/80", text: "text-[#283618]" },
];

const TestimonialCard = ({ index, testimonial, name, designation, company, context }) => {
  const shouldReduce = useReducedMotion();
  const av = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    whileHover={shouldReduce ? {} : { y: -5, boxShadow: "0 16px 40px rgba(61,107,82,0.18)" }}
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
    className="bg-cream-card p-6 sm:p-8 rounded-2xl border border-lavender/10 shadow-card flex flex-col gap-5 w-full sm:flex-1 sm:min-w-[280px] sm:max-w-[380px]"
  >
    {context && (
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-lavender-mid border-l-2 border-lavender-mid pl-2 leading-tight">
        {context}
      </p>
    )}
    <div className="flex items-start gap-3">
      <span className="text-lavender text-[56px] font-light leading-none select-none -mb-3 block">&#x201C;</span>
      <p className="text-secondary text-[16px] sm:text-[17px] leading-[1.75] mt-3 flex-1">{testimonial}</p>
    </div>
    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-lavender/10">
      <div className={`w-11 h-11 rounded-full ${av.bg} border-2 border-lavender/20 flex items-center justify-center shrink-0`}>
        <span className={`${av.text} font-bold text-[13px] tracking-wide select-none`}>{initials(name)}</span>
      </div>
      <div>
        <p className="text-text-dark font-bold text-[15px]">{name}</p>
        <p className="text-secondary text-[12px] font-normal">{designation}</p>
        <p className="text-lavender-deep text-[11px] font-medium">{company}</p>
      </div>
    </div>
  </motion.div>
  );
};

const Testimonials = () => {
  const { open: openBooking } = useBooking();
  return (
  <>
    <div className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute -top-6 left-0 font-black text-lavender/5 leading-none select-none pointer-events-none uppercase"
        style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)", letterSpacing: "-0.04em", whiteSpace: "nowrap" }}
      >
        WORDS
      </span>
      <motion.div variants={textVariant()} className="relative z-10">
        <p className={styles.sectionSubText}>3 real clients</p>
        <h2 className={styles.sectionHeadText}>Small Businesses. Real Numbers.</h2>
      </motion.div>
    </div>

    <p className="text-secondary text-[16px] sm:text-[17px] leading-[1.7] mt-4 max-w-xl">
      Here's what happened when three businesses decided to take their website seriously.
    </p>

    <div className={`${styles.sectionBodyGap} flex flex-col sm:flex-row flex-wrap gap-6 justify-start`}>
      {testimonials.map((t, index) => (
        <TestimonialCard key={t.name} index={index} {...t} />
      ))}
    </div>

    <div className="flex justify-center mt-16">
      <button
        onClick={openBooking}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-lavender-deep text-white text-[15px] font-semibold shadow-[0_8px_30px_rgba(61,107,82,0.35)] hover:bg-lavender-mid hover:shadow-[0_12px_40px_rgba(61,107,82,0.45)] transition-all duration-200 active:scale-[0.97]"
      >
        Want results like these? Book the call →
      </button>
    </div>
  </>
  );
};

export default SectionWrapper(Testimonials, "testimonials");
