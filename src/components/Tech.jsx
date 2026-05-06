import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const SkillPill = ({ name, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.05, 0.5)}
    whileHover={{ scale: 1.08, y: -4 }}
    className="px-5 py-2.5 rounded-full bg-lavender-light border border-lavender/30 text-lavender-deep text-[14px] font-semibold cursor-default shadow-sm hover:shadow-lavender hover:bg-lavender hover:text-white transition-colors duration-200"
  >
    {name}
  </motion.div>
);

const Tech = () => {
  const designSkills = technologies.filter((t) => t.category === "design");
  const devSkills = technologies.filter((t) => t.category === "dev");

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I Work With</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <div className="mt-10">
        <p className="text-lavender-deep font-semibold text-[15px] mb-4 uppercase tracking-wider">
          Design Tools
        </p>
        <div className="flex flex-wrap gap-3 mb-10">
          {designSkills.map((skill, index) => (
            <SkillPill key={skill.name} name={skill.name} index={index} />
          ))}
        </div>

        <p className="text-lavender-deep font-semibold text-[15px] mb-4 uppercase tracking-wider">
          Development
        </p>
        <div className="flex flex-wrap gap-3">
          {devSkills.map((skill, index) => (
            <SkillPill key={skill.name} name={skill.name} index={index + 5} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
