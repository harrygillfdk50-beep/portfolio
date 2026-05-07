import React from "react";
import { motion } from "framer-motion";
import { useBooking } from "../context/BookingContext";

const footerLinks = [
  { label: "About",   href: "#about"   },
  { label: "Work",    href: "#work"    },
  { label: "Skills",  href: "#skills"  },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const { open: openBooking } = useBooking();

  return (
    <footer className="py-12 px-6 sm:px-16 bg-primary border-t border-lavender/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-7">

        {/* Nav links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-x-7 gap-y-3"
        >
          {footerLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-secondary text-[13px] hover:text-lavender-deep transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </motion.div>

        {/* Book a call CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          onClick={openBooking}
          className="px-6 py-2.5 rounded-full bg-lavender-deep text-white font-semibold text-[14px] hover:bg-lavender-mid transition-all duration-200 shadow-[0_4px_16px_rgba(96,108,56,0.28)]"
        >
          Book a Free Call →
        </motion.button>

        {/* Email */}
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          href="mailto:harrygillfdk50@gmail.com"
          className="text-lavender-deep text-[13px] hover:underline break-all text-center"
        >
          harrygillfdk50@gmail.com
        </motion.a>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-secondary/60 text-[12px] text-center"
        >
          Designed &amp; Built by Harry &copy; {new Date().getFullYear()} · Canada
        </motion.p>

      </div>
    </footer>
  );
};

export default Footer;
