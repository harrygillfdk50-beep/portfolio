import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const contactItems = [
  {
    icon: "✉️",
    label: "Email",
    value: "harrygillfdk50@gmail.com",
    href: "mailto:harrygillfdk50@gmail.com",
    hint: "Send me an email anytime",
  },
  {
    icon: "💬",
    label: "Phone",
    value: "+1 437 250 1904",
    href: "sms:+14372501904",
    hint: "Messages only please",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Canada",
    href: null,
    hint: "Available for remote work worldwide",
  },
];

const ContactCard = ({ icon, label, value, href, hint, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.75)}
    whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(107,91,149,0.2)" }}
    className="flex flex-col items-center p-8 bg-cream-card rounded-2xl border border-lavender/15 shadow-card min-w-[220px] flex-1 transition-shadow duration-300"
  >
    <span className="text-[40px] mb-4">{icon}</span>
    <p className="text-lavender font-semibold text-[12px] uppercase tracking-widest mb-1">{label}</p>
    {href ? (
      <a
        href={href}
        className="text-text-dark font-bold text-[16px] hover:text-lavender-deep transition-colors text-center break-all"
      >
        {value}
      </a>
    ) : (
      <p className="text-text-dark font-bold text-[16px] text-center">{value}</p>
    )}
    <p className="text-secondary text-[12px] mt-2 text-center">{hint}</p>
  </motion.div>
);

const Contact = () => (
  <div className="xl:mt-12">
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Get In Touch</p>
      <h2 className={styles.sectionHeadText}>Let's Work Together.</h2>
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-4 text-secondary text-[16px] max-w-2xl leading-relaxed"
    >
      Have a project in mind? Send me a message and let's talk about how I can help your business look its best online.
    </motion.p>

    <div className="mt-12 flex flex-wrap gap-6">
      {contactItems.map((item, index) => (
        <ContactCard key={item.label} index={index} {...item} />
      ))}
    </div>
  </div>
);

export default SectionWrapper(Contact, "contact");
