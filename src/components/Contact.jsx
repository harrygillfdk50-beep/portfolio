import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useBooking } from "../context/BookingContext";

const Contact = () => {
  const { open: openBooking } = useBooking();
  return (
  <div className="xl:mt-12">
    <div className="relative overflow-hidden mb-6">
      <span
        aria-hidden="true"
        className="absolute -top-4 left-0 text-lavender/5 font-black pointer-events-none select-none whitespace-nowrap leading-none"
        style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)" }}
      >
        HELLO
      </span>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>No pressure, no jargon</p>
        <h2 className={styles.sectionHeadText}>Let's Work Together.</h2>
      </motion.div>
    </div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-6 text-text-dark text-[18px] font-medium max-w-xl leading-[1.65]"
    >
      Every project starts with a 15-minute call.{" "}
      <span className="text-secondary font-normal">
        You don't need a deck or a spec — just tell me what's not working. I'll take it from there.
      </span>
    </motion.p>

    <motion.button
      onClick={openBooking}
      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-lavender-deep text-white font-semibold text-[16px] shadow-[0_8px_30px_rgba(96,108,56,0.35)] hover:bg-lavender-mid hover:shadow-[0_12px_40px_rgba(188,108,37,0.45)] transition-all duration-200 mt-6 mb-2"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-label="Book a free 15-minute call with Harry"
    >
      Book a Free 15-Min Call →
    </motion.button>

    <p className="mt-8 text-secondary text-[13px]">
      Prefer a different way?{" "}
      <a href="mailto:harrygillfdk50@gmail.com" className="text-lavender-deep hover:underline">
        harrygillfdk50@gmail.com
      </a>
      {" · "}
      <a href="tel:+14372501904" className="text-lavender-deep hover:underline">
        +1 437 250 1904
      </a>
    </p>
  </div>
  );
};

export default SectionWrapper(Contact, "contact");
