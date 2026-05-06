import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  html,
  css,
  reactjs,
  figma,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

const services = [
  {
    title: "UI Design",
    icon: web,
    description: "Interfaces that look premium on day one — and hold up across every screen size.",
  },
  {
    title: "UX Design",
    icon: mobile,
    description: "Every click, scroll, and decision point designed so users get where they're going without friction.",
  },
  {
    title: "Web Development",
    icon: backend,
    description: "React and Tailwind builds that load fast, scale cleanly, and hand off without headaches.",
  },
  {
    title: "Brand & Visual Design",
    icon: creator,
    description: "Visual systems that travel — from your website to your social to your business card, without losing coherence.",
  },
];

const technologies = [
  { name: "Figma", icon: figma, category: "design" },
  { name: "Adobe XD", icon: figma, category: "design" },
  { name: "Photoshop", icon: figma, category: "design" },
  { name: "Framer", icon: figma, category: "design" },
  { name: "Sketch", icon: figma, category: "design" },
  { name: "HTML & CSS", icon: html, category: "dev" },
  { name: "JavaScript", icon: javascript, category: "dev" },
  { name: "React", icon: reactjs, category: "dev" },
  { name: "Tailwind CSS", icon: css, category: "dev" },
  { name: "Responsive Design", icon: mobile, category: "dev" },
  { name: "Prototyping", icon: creator, category: "dev" },
  { name: "User Research", icon: backend, category: "dev" },
];

const experiences = [
  {
    title: "Freelance UI/UX Designer",
    company_name: "Self-Employed · Canada",
    icon: creator,
    iconBg: "#E8E0F5",
    date: "2022 – Present",
    points: [
      "Delivered end-to-end website projects for restaurants, independent retailers, and early-stage startups — from first brief to live site.",
      "Managing end-to-end projects from initial brief to final handoff — including wireframes, prototypes, and responsive builds.",
      "Building ongoing client relationships with clear communication and timely delivery.",
      "Specialising in making complex ideas simple and beautiful for non-technical clients.",
    ],
  },
  {
    title: "Junior Front-End Designer",
    company_name: "Pixel & Co. Agency",
    icon: web,
    iconBg: "#E8E0F5",
    date: "2021 – 2022",
    points: [
      "Built and styled web interfaces from Figma designs for a range of agency clients.",
      "Collaborated with developers and clients to deliver responsive, on-brand websites on schedule.",
      "Gained hands-on experience with React, Tailwind CSS, and client-facing design reviews.",
      "Contributed to 12+ live client projects across retail, hospitality, and tech industries.",
    ],
  },
  {
    title: "Design Intern",
    company_name: "Bright Studio",
    icon: mobile,
    iconBg: "#E8E0F5",
    date: "2020 – 2021",
    points: [
      "Assisted senior designers with UI mockups, wireframes, and brand asset production.",
      "Worked on visual identity and web design projects for local businesses and non-profits.",
      "Developed a strong foundation in design principles, typography, and colour theory.",
      "Delivered polished assets on tight deadlines in a fast-paced studio environment.",
    ],
  },
];

const testimonials = [
  {
    testimonial: "Harry completely transformed our restaurant's online presence. Bookings went up and customers keep complimenting how easy the website is to use.",
    name: "Marco Rossi",
    designation: "Owner",
    company: "Saffron Kitchen",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    testimonial: "Working with Harry was seamless from start to finish. He listened to what we needed and delivered something even better than we imagined.",
    name: "Priya Sharma",
    designation: "Founder",
    company: "Velour Studio",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    testimonial: "Harry asked the right questions from day one. The page he built communicated our product in under ten seconds — which was exactly the brief.",
    name: "James Liu",
    designation: "CEO",
    company: "Groundwork",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const projects = [
  {
    name: "Saffron Kitchen",
    description:
      "A warm, elegant website for a fine-dining restaurant — designed to showcase the menu, atmosphere, and reservation experience in a way that makes guests excited before they even arrive.",
    tags: [
      { name: "UI Design", color: "lavender-text-gradient" },
      { name: "Web Design", color: "blue-text-gradient" },
      { name: "Figma", color: "pink-text-gradient" },
    ],
    gradient: "linear-gradient(135deg, #c8a882 0%, #8B5E3C 100%)",
    source_code_link: "https://github.com/",
  },
  {
    name: "Velour Studio",
    description:
      "A minimal, fashion-forward online store for an independent clothing brand — focused on clean product presentation, smooth browsing, and a checkout experience that feels effortless.",
    tags: [
      { name: "E-commerce", color: "lavender-text-gradient" },
      { name: "UX Design", color: "blue-text-gradient" },
      { name: "Branding", color: "pink-text-gradient" },
    ],
    gradient: "linear-gradient(135deg, #d4b8c7 0%, #8B5572 100%)",
    source_code_link: "https://github.com/",
  },
  {
    name: "Groundwork",
    description:
      "A bold, conversion-focused landing page for an early-stage startup — designed to communicate their product's value in seconds and turn visitors into sign-ups.",
    tags: [
      { name: "Landing Page", color: "lavender-text-gradient" },
      { name: "UX Design", color: "blue-text-gradient" },
      { name: "Startup", color: "pink-text-gradient" },
    ],
    gradient: "linear-gradient(135deg, #9B8EC4 0%, #6B5B95 100%)",
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
