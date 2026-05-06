import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon, description }) => (
  <Tilt
    options={{ max: 15, scale: 1.02, speed: 400 }}
    className="xs:w-[240px] w-full"
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.15, 0.75)}
      className="w-full lavender-gradient p-[1.5px] rounded-[20px] shadow-card card-torn"
    >
      <div className="bg-cream-card rounded-[20px] py-8 px-8 min-h-[260px] flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-lavender-light flex items-center justify-center shadow-lavender">
          <img
            src={icon}
            alt={title}
            className="w-7 h-7 object-contain"
            style={{ filter: "invert(35%) sepia(30%) saturate(600%) hue-rotate(225deg)" }}
          />
        </div>
        <h3 className="text-text-dark text-[18px] font-bold text-center">{title}</h3>
        <p className="text-secondary text-[13px] text-center leading-relaxed">{description}</p>
      </div>
    </motion.div>
  </Tilt>
);

const Services = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I Offer</p>
        <h2 className={styles.sectionHeadText}>Services.</h2>
      </motion.div>

      <div className="mt-14 flex flex-wrap gap-8 justify-center sm:justify-start">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Services, "services");
