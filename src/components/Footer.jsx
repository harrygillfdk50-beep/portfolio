import React from "react";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="w-full py-8 px-6 border-t border-lavender/15 bg-primary/60 backdrop-blur-sm"
  >
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-lavender-deep font-black text-[20px] tracking-tight">
        Harry<span className="text-lavender">.</span>
      </span>
      <p className="text-secondary text-[13px] text-center">
        Designed &amp; Built by Harry &copy; {new Date().getFullYear()}
      </p>
      <p className="text-lavender text-[12px] font-medium">Canada</p>
    </div>
  </motion.footer>
);

export default Footer;
