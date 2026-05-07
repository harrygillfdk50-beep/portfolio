import { motion, useReducedMotion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) => {
  function HOC() {
    const shouldReduceMotion = useReducedMotion();
    return (
      <motion.section
        variants={shouldReduceMotion ? undefined : staggerContainer()}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  }

  HOC.displayName = `SectionWrapper(${Component.displayName || Component.name || "Component"})`;

  return HOC;
};

export default StarWrapper;
