import React from "react";
import { motion } from "framer-motion";

const Footer = () => (
  <footer className="py-12 px-8 bg-primary border-t border-lavender/10">
    <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
      {/* Logo */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-lavender-deep font-black text-[20px] tracking-tight"
      >
        Harry<span className="text-lavender">.</span>
      </motion.span>

      {/* Email CTA */}
      <motion.a
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        href="mailto:harrygillfdk50@gmail.com"
        className="px-6 py-2.5 rounded-full border-2 border-lavender text-lavender-deep font-semibold text-[14px] hover:bg-lavender hover:text-white transition-all duration-300"
      >
        harrygillfdk50@gmail.com
      </motion.a>

      {/* Nav links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-8"
      >
        {["About", "Work", "Projects", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-secondary text-[13px] hover:text-lavender-deep transition-colors"
          >
            {item}
          </a>
        ))}
      </motion.div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-secondary/60 text-[12px]"
      >
        Designed &amp; Built by Harry &copy; {new Date().getFullYear()} · Canada
      </motion.p>
    </div>
  </footer>
);

export default Footer;
