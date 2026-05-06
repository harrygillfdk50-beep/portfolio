import React, { useRef, useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const CARD_STYLE = {
  background: "#F3EFE8",
  color: "#2C2C2C",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(107,91,149,0.15)",
  border: "1px solid rgba(155,142,196,0.2)",
};
const ARROW_STYLE = { borderRight: "7px solid #F3EFE8" };
const ICON_STYLE = { background: "#E8E0F5", border: "3px solid #9B8EC4" };
const TIMELINE_LINE = "#9B8EC4";

const ExperienceCard = ({ experience, index }) => {
  const cardRef = useRef(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { el.style.opacity = 1; return; }

    gsap.fromTo(el,
      { opacity: 0, x: isLeft ? -80 : 80, y: 20 },
      {
        opacity: 1, x: 0, y: 0, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      }
    );
    return () => {
      ScrollTrigger.getAll().filter(st => st.vars.trigger === el).forEach(st => st.kill());
    };
  }, [isLeft]);

  return (
    <div ref={cardRef} style={{ opacity: 0 }}>
      <VerticalTimelineElement
        contentStyle={CARD_STYLE}
        contentArrowStyle={ARROW_STYLE}
        date={<span className="text-lavender-deep font-semibold">{experience.date}</span>}
        iconStyle={ICON_STYLE}
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
        <ul className="mt-4 list-disc ml-5 space-y-2.5">
          {experience.points.map((point, index) => (
            <li
              key={`exp-point-${index}`}
              className="text-secondary text-[14px] pl-1 leading-relaxed"
            >
              {point}
            </li>
          ))}
        </ul>
      </VerticalTimelineElement>
    </div>
  );
};

const Experience = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} text-center`}>My Journey</p>
      <h2 className={`${styles.sectionHeadText} text-center`}>Work Experience.</h2>
    </motion.div>
    <div className="mt-16 flex flex-col">
      <VerticalTimeline lineColor={TIMELINE_LINE}>
        {experiences.map((experience, index) => (
          <ExperienceCard key={`experience-${index}`} experience={experience} index={index} />
        ))}
      </VerticalTimeline>
    </div>
  </>
);

export default SectionWrapper(Experience, "work");
