import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, description, tags, gradient }) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.2, 0.75)}>
    <Tilt
      options={{ max: 12, scale: 1.02, speed: 400 }}
      className="bg-cream-card p-5 rounded-2xl sm:w-[340px] w-full shadow-card border border-lavender/10"
    >
      <div
        className="relative w-full h-[200px] rounded-xl overflow-hidden group cursor-pointer"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 bg-lavender-deep/0 group-hover:bg-lavender-deep/70 transition-all duration-300 flex items-center justify-center">
          <span className="text-white font-semibold text-[15px] opacity-0 group-hover:opacity-100 transition-all duration-300">
            View Project
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-white/90 font-bold text-[18px] drop-shadow-lg">{name}</span>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-text-dark font-bold text-[20px]">{name}</h3>
        <p className="mt-2 text-secondary text-[13px] leading-relaxed">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={`${name}-${tag.name}`}
            className={`text-[12px] font-semibold ${tag.color} px-2 py-0.5 rounded-full bg-lavender-light/50`}
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </Tilt>
  </motion.div>
);

const Works = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>My Work</p>
      <h2 className={styles.sectionHeadText}>Projects.</h2>
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-4 text-secondary text-[16px] max-w-3xl leading-[30px]"
    >
      Here are a few projects I've designed and built for real clients — each one crafted to be
      beautiful, easy to use, and built to make a strong impression.
    </motion.p>

    <div className="mt-14 flex flex-wrap gap-7" id="projects">
      {projects.map((project, index) => (
        <ProjectCard key={`project-${index}`} index={index} {...project} />
      ))}
    </div>
  </>
);

export default SectionWrapper(Works, "projects");
