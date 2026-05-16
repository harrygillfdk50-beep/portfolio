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

const TimelineSpine = ({ containerRef }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const length = container.offsetHeight;
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 2,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [containerRef]);

  return (
    <svg
      aria-hidden="true"
      className="absolute top-0 pointer-events-none timeline-spine"
      style={{ width: 4, height: "100%", zIndex: 0 }}
    >
      <path
        ref={pathRef}
        d="M 2 0 L 2 10000"
        stroke="#800e13"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

const CARD_STYLE = {
  background: "var(--color-cream-card)",
  color: "var(--color-text-dark, #f5e7e8)",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(128,14,19,0.15)",
  border: "1px solid rgba(128,14,19,0.18)",
};
const ARROW_STYLE = { borderRight: "7px solid var(--color-cream-card)" };
const ICON_STYLE = { background: "var(--color-lavender-light)", border: "3px solid var(--color-lavender-mid)" };

const ExperienceCard = ({ experience, index }) => {
  const cardRef = useRef(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, x: isLeft ? -80 : 80 });

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, x: 0 });
      return;
    }

    const tween = gsap.fromTo(el,
      { opacity: 0, x: isLeft ? -80 : 80, y: 20 },
      {
        opacity: 1, x: 0, y: 0, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isLeft]);

  return (
    <div ref={cardRef}>
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
          <p className="text-lavender-deep text-[14px] font-semibold mt-1">
            {experience.company_name}
          </p>
        </div>
        <ul className="mt-4 list-disc ml-5 space-y-2.5">
          {experience.points.map((point, index) => (
            <li
              key={`exp-point-${index}`}
              className="text-secondary text-[14px] pl-1 leading-[1.7]"
            >
              {point}
            </li>
          ))}
        </ul>
      </VerticalTimelineElement>
    </div>
  );
};

const Experience = () => {
  const timelineContainerRef = useRef(null);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>Track Record</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Work Experience.</h2>
      </motion.div>
      <div ref={timelineContainerRef} className="relative mt-12">
        <TimelineSpine containerRef={timelineContainerRef} />
        <VerticalTimeline lineColor="transparent">
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} index={index} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
