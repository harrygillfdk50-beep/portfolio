import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const DESIGN_SKILLS = ["Figma", "Adobe XD", "Photoshop", "Framer", "Sketch", "Prototyping", "User Research"];
const DEV_SKILLS = ["HTML & CSS", "JavaScript", "React", "Tailwind CSS", "Responsive Design"];

const SkillPill = ({ name, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.05, 0.5)}
    whileHover={{ scale: 1.08, y: -4 }}
    whileTap={{ scale: 0.93 }}
    role="listitem"
    className="px-5 py-2.5 rounded-full bg-lavender-light border border-lavender/30 text-lavender-deep text-[14px] font-semibold cursor-default shadow-sm hover:shadow-lavender hover:bg-lavender hover:text-white transition-colors duration-200"
  >
    {name}
  </motion.div>
);

const Tech = () => {
  const designSkills = DESIGN_SKILLS;
  const devSkills = DEV_SKILLS;

  return (
    <>
      <div className="relative overflow-hidden mb-6">
        <span
          aria-hidden="true"
          className="absolute -top-4 left-0 text-lavender/5 font-black pointer-events-none select-none whitespace-nowrap leading-none"
          style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)" }}
        >
          SKILLS
        </span>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What I Work With</p>
          <h2 className={styles.sectionHeadText}>Skills.</h2>
        </motion.div>
      </div>

      <p className={`${styles.sectionBodyGap} text-secondary text-[16px] sm:text-[17px] leading-[1.7] mb-10 max-w-2xl`}>
        These are the tools I reach for every day — chosen because they're fast to prototype in, precise in production, and easy to hand off.
      </p>

      <div>
        <p className={`${styles.sectionCategoryLabel} mb-4 mt-8`}>
          Design Tools
        </p>
        <div className="flex flex-wrap gap-3 mb-10" role="list">
          {designSkills.map((skill, index) => (
            <SkillPill key={skill.name} name={skill.name} index={index} />
          ))}
        </div>

        <p className={`${styles.sectionCategoryLabel} mb-4 mt-8`}>
          Development
        </p>
        <div className="flex flex-wrap gap-3" role="list">
          {devSkills.map((skill, index) => (
            <SkillPill key={skill.name} name={skill.name} index={index + 5} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
