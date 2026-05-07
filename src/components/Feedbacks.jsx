import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { useBooking } from "../context/BookingContext";

const ServiceCard = ({ index, title, icon, description }) => {
  const shouldReduce = useReducedMotion();
  return (
  <motion.div
    whileHover={shouldReduce ? {} : { y: -6, boxShadow: "0 20px 40px rgba(162, 144, 204, 0.2)" }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="xs:w-[240px] w-full group"
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.15, 0.75)}
      className="w-full lavender-gradient p-[1.5px] rounded-2xl shadow-card card-torn card-torn-shadow"
    >
      <div className="bg-cream-card rounded-2xl py-8 px-8 min-h-[260px] flex flex-col items-center gap-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
          index % 2 === 0
            ? "bg-lavender-light"
            : "bg-cream-card border border-lavender/20"
        }`}>
          <motion.span
            whileHover={shouldReduce ? {} : { y: -6, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-hidden="true"
            className="text-4xl block"
          >
            <img
              src={icon}
              alt=""
              className="w-7 h-7 object-contain"
              style={{ filter: "invert(35%) sepia(30%) saturate(600%) hue-rotate(225deg)" }}
            />
          </motion.span>
        </div>
        <h3 className="text-text-dark text-[18px] font-bold text-center">{title}</h3>
        <p className="text-secondary text-[13px] sm:text-[15px] text-center leading-[1.7]">{description}</p>
      </div>
    </motion.div>
  </motion.div>
  );
};

const Services = () => {
  const { open: openBooking } = useBooking();
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I Offer</p>
        <h2 className={styles.sectionHeadText}>Services.</h2>
      </motion.div>

      <p className="text-secondary text-[16px] sm:text-[17px] leading-[1.7] mt-4 mb-10 max-w-xl">
        These are the services behind those projects — each one part of how I work with clients from first call to final launch.
      </p>

      <div className="mt-14 flex flex-wrap gap-8 justify-center sm:justify-start">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <button onClick={openBooking} className="inline-block px-8 py-3 rounded-full bg-lavender-deep text-white font-semibold text-[15px] hover:bg-lavender-mid hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(61,107,82,0.35)] active:translate-y-0 active:shadow-none active:scale-[0.97] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-deep focus-visible:ring-offset-2">
          Let's discuss your project →
        </button>
      </div>
    </>
  );
};

export default SectionWrapper(Services, "services");
