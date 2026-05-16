import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { skills } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";

const SkillPill = ({ name, icon, index, delay }) => (
  <motion.div
    variants={fadeIn("up", "spring", delay + index * 0.07, 0.5)}
    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-200 group cursor-default"
    style={{
      background: "rgba(128,14,19,0.06)",
      border: "1.5px solid rgba(128,14,19,0.18)",
    }}
    whileHover={{
      background: "rgba(128,14,19,0.13)",
      borderColor: "rgba(128,14,19,0.35)",
      y: -2,
    }}
  >
    <img
      src={icon}
      alt={name}
      className="w-5 h-5 object-contain flex-shrink-0"
      style={{ filter: "saturate(0.7) brightness(0.85)" }}
    />
    <span className="text-[13px] font-semibold text-lavender-mid whitespace-nowrap">
      {name}
    </span>
  </motion.div>
);

const Skills = () => (
  <>
    <div className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute -top-6 left-0 font-black text-lavender/5 leading-none select-none pointer-events-none uppercase"
        style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)", letterSpacing: "-0.04em", whiteSpace: "nowrap" }}
      >
        TOOLS
      </span>
      <motion.div variants={textVariant()} className="relative z-10">
        <p className={styles.sectionSubText}>What I work with</p>
        <h2 className={styles.sectionHeadText}>Skills & Tools.</h2>
      </motion.div>
    </div>

    <div className="mt-10 flex flex-col gap-10">

      {/* Design */}
      <div>
        <motion.p
          variants={fadeIn("", "", 0.05, 0.6)}
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent mb-4 border-l-2 border-accent pl-3"
        >
          Design
        </motion.p>
        <div className="flex flex-wrap gap-3">
          {skills.design.map((skill, i) => (
            <SkillPill key={skill.name} {...skill} index={i} delay={0.1} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px" style={{ background: "rgba(128,14,19,0.12)" }} />

      {/* Development */}
      <div>
        <motion.p
          variants={fadeIn("", "", 0.05, 0.6)}
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent mb-4 border-l-2 border-accent pl-3"
        >
          Development
        </motion.p>
        <div className="flex flex-wrap gap-3">
          {skills.development.map((skill, i) => (
            <SkillPill key={skill.name} {...skill} index={i} delay={0.2} />
          ))}
        </div>
      </div>

    </div>
  </>
);

export default SectionWrapper(Skills, "skills");
