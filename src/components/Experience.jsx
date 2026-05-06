import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "#F3EFE8",
      color: "#2C2C2C",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(107,91,149,0.15)",
      border: "1px solid rgba(155,142,196,0.2)",
    }}
    contentArrowStyle={{ borderRight: "7px solid #F3EFE8" }}
    date={<span className="text-lavender-deep font-semibold">{experience.date}</span>}
    iconStyle={{ background: "#E8E0F5", border: "3px solid #9B8EC4" }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[55%] h-[55%] object-contain"
          style={{ filter: "invert(35%) sepia(30%) saturate(600%) hue-rotate(225deg)" }}
        />
      </div>
    }
  >
    <div>
      <h3 className="text-text-dark text-[20px] font-bold">{experience.title}</h3>
      <p className="text-lavender-deep text-[14px] font-semibold mt-1" style={{ margin: "4px 0 0" }}>
        {experience.company_name}
      </p>
    </div>
    <ul className="mt-4 list-disc ml-5 space-y-2">
      {experience.points.map((point, index) => (
        <li
          key={`exp-point-${index}`}
          className="text-secondary text-[13px] pl-1 tracking-wide leading-relaxed"
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} text-center`}>My Journey</p>
      <h2 className={`${styles.sectionHeadText} text-center`}>Work Experience.</h2>
    </motion.div>
    <div className="mt-16 flex flex-col">
      <VerticalTimeline lineColor="#9B8EC4">
        {experiences.map((experience, index) => (
          <ExperienceCard key={`experience-${index}`} experience={experience} />
        ))}
      </VerticalTimeline>
    </div>
  </>
);

export default SectionWrapper(Experience, "work");
