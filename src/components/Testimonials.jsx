import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { testimonials } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const TestimonialCard = ({ index, testimonial, name, designation, company, image }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    className="bg-cream-card p-8 rounded-2xl border border-lavender/10 shadow-card flex flex-col gap-5 flex-1 min-w-[280px] max-w-[380px]"
  >
    <div className="flex items-start gap-3">
      <span className="text-lavender text-[40px] leading-none font-black select-none">"</span>
      <p className="text-secondary text-[14px] leading-relaxed mt-3 flex-1">{testimonial}</p>
    </div>
    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-lavender/10">
      <img
        src={image}
        alt={name}
        className="w-11 h-11 rounded-full object-cover border-2 border-lavender/30"
      />
      <div>
        <p className="text-text-dark font-bold text-[15px]">{name}</p>
        <p className="text-lavender text-[12px] font-medium">{designation} · {company}</p>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>What Clients Say</p>
      <h2 className={styles.sectionHeadText}>Kind Words.</h2>
    </motion.div>
    <div className="mt-14 flex flex-wrap gap-6 justify-start">
      {testimonials.map((t, index) => (
        <TestimonialCard key={t.name} index={index} {...t} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Testimonials, "testimonials");
