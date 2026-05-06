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
    className="group flex flex-col items-center p-8 bg-cream-card rounded-2xl border border-lavender/15 shadow-card min-w-[220px] flex-1 transition-shadow duration-300"
  >
    <span className="text-[40px] mb-4 inline-block group-hover:[animation:iconBounce_0.5s_ease_forwards]">{icon}</span>
    <p className="text-lavender-deep font-semibold text-[12px] uppercase tracking-widest mb-1">{label}</p>
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
      <p className={styles.sectionSubText}>Start A Project</p>
      <h2 className={styles.sectionHeadText}>Let's Work Together.</h2>
    </motion.div>

    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-4 text-secondary text-[16px] max-w-2xl leading-relaxed"
    >
      Whether you have a finished brief or just a rough idea, I'm easy to talk to and quick to respond — usually within 24 hours.
    </motion.p>

    <motion.blockquote
      variants={fadeIn("", "", 0.05, 0.8)}
      className="mb-10 pl-5 border-l-4 border-lavender max-w-xl"
    >
      <p className="text-secondary text-[15px] italic leading-relaxed">
        "Working with Harry was seamless. He understood our brand from the first call and delivered a website that finally matched our quality."
      </p>
      <cite className="mt-3 block text-lavender-deep text-[13px] font-semibold not-italic">
        — Priya Sharma, Founder · Velour Studio
      </cite>
    </motion.blockquote>

    <div className="mt-12 flex flex-wrap gap-6">
      {contactItems.map((item, index) => (
        <ContactCard key={item.label} index={index} {...item} />
      ))}
    </div>
  </div>
);

export default SectionWrapper(Contact, "contact");
