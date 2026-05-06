# Harry Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the adrianhajdin 3D portfolio template into Harry's personal animated UI/UX portfolio with cream/lavender theme, crumbled paper background, GSAP + Framer Motion animations, and full mobile responsiveness.

**Architecture:** Modify existing React + Vite component files in-place. Replace dark theme with cream/lavender theme via Tailwind config + index.css. Add GSAP ScrollTrigger animations alongside existing Framer Motion. Replace all placeholder data in constants/index.js. Repurpose Feedbacks section as Services. Replace Contact form with info cards.

**Tech Stack:** React, Vite, Tailwind CSS, Framer Motion v9, GSAP v3.15 + ScrollTrigger, react-tilt, react-vertical-timeline-component

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `tailwind.config.cjs` | Modify | Add cream/lavender color tokens + responsive breakpoints |
| `src/index.css` | Modify | Paper texture bg, lavender gradients, replace dark theme classes |
| `src/styles.js` | Modify | Update text color classes to match new theme |
| `src/constants/index.js` | Modify | Replace all data with Harry's real content |
| `src/App.jsx` | Modify | Restructure sections, add paper bg wrapper, add Footer |
| `src/components/Navbar.jsx` | Modify | Cream logo, lavender links, backdrop blur on scroll |
| `src/components/Hero.jsx` | Modify | GSAP letter reveal + cycling text + floating orbs + parallax |
| `src/components/About.jsx` | Modify | Harry's bio + animated stat counters |
| `src/components/Feedbacks.jsx` | Modify | Repurpose as Services section (4 service cards) |
| `src/components/Tech.jsx` | Modify | Skill bubbles with lavender styling |
| `src/components/Works.jsx` | Modify | 3 project cards with gradient image placeholders + hover overlay |
| `src/components/Experience.jsx` | Modify | Lavender timeline styling |
| `src/components/Contact.jsx` | Modify | Remove form, show email/phone/location cards |
| `src/components/Footer.jsx` | Create | Minimal footer |
| `src/components/index.js` | Modify | Export Footer |
| `src/utils/motion.js` | Keep | No changes needed |
| `src/hoc/SectionWrapper.jsx` | Keep | No changes needed |

---

## Task 1: Tailwind Theme + Global CSS

**Files:**
- Modify: `tailwind.config.cjs`
- Modify: `src/index.css`

- [ ] **Step 1: Update tailwind.config.cjs with cream/lavender tokens**

Replace the entire file content:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#FAF7F2",
        secondary: "#7A7A7A",
        tertiary: "#F3EFE8",
        lavender: "#9B8EC4",
        "lavender-deep": "#6B5B95",
        "lavender-light": "#E8E0F5",
        "cream-card": "#F3EFE8",
        "text-dark": "#2C2C2C",
        "black-100": "#F0EBE0",
        "black-200": "#EDE6D8",
        "white-100": "#2C2C2C",
      },
      boxShadow: {
        card: "0px 10px 40px -10px rgba(107, 91, 149, 0.2)",
        lavender: "0px 0px 20px rgba(155, 142, 196, 0.4)",
      },
      screens: {
        xs: "375px",
        sm: "390px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      backgroundImage: {
        "hero-pattern": "none",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Replace src/index.css with cream/lavender theme + paper texture**

Replace the entire file:

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  scroll-behavior: smooth;
  color-scheme: light;
}

body {
  background-color: #FAF7F2;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='multiply'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23paper)' opacity='0.08'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 400px 400px;
}

.paper-texture {
  position: relative;
}

.paper-texture::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='overlay' result='blend'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 300px 300px;
  pointer-events: none;
  z-index: 0;
}

.hash-span {
  margin-top: -100px;
  padding-bottom: 100px;
  display: block;
}

.lavender-gradient {
  background: linear-gradient(135deg, #9B8EC4 0%, #6B5B95 100%);
}

.lavender-gradient-light {
  background: linear-gradient(135deg, #E8E0F5 0%, #d4c8f0 100%);
}

.cream-gradient {
  background: linear-gradient(135deg, #FAF7F2 0%, #F3EFE8 100%);
}

.lavender-text-gradient {
  background: linear-gradient(to top, #6B5B95, #9B8EC4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.green-text-gradient {
  background: linear-gradient(to top, #6B5B95, #9B8EC4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.blue-text-gradient {
  background: linear-gradient(to top, #6B5B95, #c4b8e8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pink-text-gradient {
  background: linear-gradient(to top, #9B8EC4, #E8E0F5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.violet-gradient {
  background: linear-gradient(-90deg, #9B8EC4 0%, rgba(155, 142, 196, 0) 100%);
}

.black-gradient {
  background: linear-gradient(to right, #9B8EC4, #6B5B95);
}

/* Orb floating animation */
@keyframes floatOrb {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(-10px) translateX(-15px); }
  75% { transform: translateY(-25px) translateX(5px); }
}

.orb-float {
  animation: floatOrb 8s ease-in-out infinite;
}

.orb-float-delay {
  animation: floatOrb 10s ease-in-out 2s infinite;
}

.orb-float-slow {
  animation: floatOrb 14s ease-in-out 4s infinite;
}

/* Card paper-torn bottom edge */
.card-torn {
  clip-path: polygon(
    0 0, 100% 0, 100% 92%,
    97% 96%, 94% 93%, 91% 97%,
    88% 94%, 85% 98%, 82% 95%,
    79% 99%, 76% 96%, 73% 100%,
    70% 97%, 67% 100%, 64% 96%,
    61% 99%, 58% 95%, 55% 98%,
    52% 94%, 49% 97%, 46% 93%,
    43% 96%, 40% 92%, 37% 96%,
    34% 93%, 31% 97%, 28% 94%,
    25% 98%, 22% 95%, 19% 99%,
    16% 96%, 13% 100%, 10% 97%,
    7% 100%, 4% 96%, 1% 99%, 0 96%
  );
}

/* Vertical timeline lavender override */
.vertical-timeline-element-content {
  background: #F3EFE8 !important;
  box-shadow: 0 4px 20px rgba(107, 91, 149, 0.15) !important;
  border-radius: 16px !important;
}

.vertical-timeline-element-content-arrow {
  border-right: 7px solid #F3EFE8 !important;
}

.vertical-timeline::before {
  background: linear-gradient(to bottom, #9B8EC4, #6B5B95) !important;
}

.vertical-timeline-element-icon {
  box-shadow: 0 0 0 4px #9B8EC4, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05) !important;
}

/* Canvas loader */
.canvas-loader {
  font-size: 10px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: mulShdSpin 1.1s infinite ease;
  transform: translateZ(0);
}

@keyframes mulShdSpin {
  0%, 100% {
    box-shadow: 0em -2.6em 0em 0em #9B8EC4,
      1.8em -1.8em 0 0em rgba(155,142,196, 0.2),
      2.5em 0em 0 0em rgba(155,142,196, 0.2),
      1.75em 1.75em 0 0em rgba(155,142,196, 0.2),
      0em 2.5em 0 0em rgba(155,142,196, 0.2),
      -1.8em 1.8em 0 0em rgba(155,142,196, 0.2),
      -2.6em 0em 0 0em rgba(155,142,196, 0.5),
      -1.8em -1.8em 0 0em rgba(155,142,196, 0.7);
  }
  12.5% { box-shadow: 0em -2.6em 0em 0em rgba(155,142,196, 0.7), 1.8em -1.8em 0 0em #9B8EC4, 2.5em 0em 0 0em rgba(155,142,196, 0.2), 1.75em 1.75em 0 0em rgba(155,142,196, 0.2), 0em 2.5em 0 0em rgba(155,142,196, 0.2), -1.8em 1.8em 0 0em rgba(155,142,196, 0.2), -2.6em 0em 0 0em rgba(155,142,196, 0.2), -1.8em -1.8em 0 0em rgba(155,142,196, 0.5); }
  25% { box-shadow: 0em -2.6em 0em 0em rgba(155,142,196, 0.5), 1.8em -1.8em 0 0em rgba(155,142,196, 0.7), 2.5em 0em 0 0em #9B8EC4, 1.75em 1.75em 0 0em rgba(155,142,196, 0.2), 0em 2.5em 0 0em rgba(155,142,196, 0.2), -1.8em 1.8em 0 0em rgba(155,142,196, 0.2), -2.6em 0em 0 0em rgba(155,142,196, 0.2), -1.8em -1.8em 0 0em rgba(155,142,196, 0.2); }
  37.5% { box-shadow: 0em -2.6em 0em 0em rgba(155,142,196, 0.2), 1.8em -1.8em 0 0em rgba(155,142,196, 0.5), 2.5em 0em 0 0em rgba(155,142,196, 0.7), 1.75em 1.75em 0 0em #9B8EC4, 0em 2.5em 0 0em rgba(155,142,196, 0.2), -1.8em 1.8em 0 0em rgba(155,142,196, 0.2), -2.6em 0em 0 0em rgba(155,142,196, 0.2), -1.8em -1.8em 0 0em rgba(155,142,196, 0.2); }
  50% { box-shadow: 0em -2.6em 0em 0em rgba(155,142,196, 0.2), 1.8em -1.8em 0 0em rgba(155,142,196, 0.2), 2.5em 0em 0 0em rgba(155,142,196, 0.5), 1.75em 1.75em 0 0em rgba(155,142,196, 0.7), 0em 2.5em 0 0em #9B8EC4, -1.8em 1.8em 0 0em rgba(155,142,196, 0.2), -2.6em 0em 0 0em rgba(155,142,196, 0.2), -1.8em -1.8em 0 0em rgba(155,142,196, 0.2); }
  62.5% { box-shadow: 0em -2.6em 0em 0em rgba(155,142,196, 0.2), 1.8em -1.8em 0 0em rgba(155,142,196, 0.2), 2.5em 0em 0 0em rgba(155,142,196, 0.2), 1.75em 1.75em 0 0em rgba(155,142,196, 0.5), 0em 2.5em 0 0em rgba(155,142,196, 0.7), -1.8em 1.8em 0 0em #9B8EC4, -2.6em 0em 0 0em rgba(155,142,196, 0.2), -1.8em -1.8em 0 0em rgba(155,142,196, 0.2); }
  75% { box-shadow: 0em -2.6em 0em 0em rgba(155,142,196, 0.2), 1.8em -1.8em 0 0em rgba(155,142,196, 0.2), 2.5em 0em 0 0em rgba(155,142,196, 0.2), 1.75em 1.75em 0 0em rgba(155,142,196, 0.2), 0em 2.5em 0 0em rgba(155,142,196, 0.5), -1.8em 1.8em 0 0em rgba(155,142,196, 0.7), -2.6em 0em 0 0em #9B8EC4, -1.8em -1.8em 0 0em rgba(155,142,196, 0.2); }
  87.5% { box-shadow: 0em -2.6em 0em 0em rgba(155,142,196, 0.2), 1.8em -1.8em 0 0em rgba(155,142,196, 0.2), 2.5em 0em 0 0em rgba(155,142,196, 0.2), 1.75em 1.75em 0 0em rgba(155,142,196, 0.2), 0em 2.5em 0 0em rgba(155,142,196, 0.2), -1.8em 1.8em 0 0em rgba(155,142,196, 0.5), -2.6em 0em 0 0em rgba(155,142,196, 0.7), -1.8em -1.8em 0 0em #9B8EC4; }
}
```

- [ ] **Step 3: Update src/styles.js**

Replace entire file:

```js
const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",

  heroHeadText:
    "font-black text-text-dark lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[38px] lg:leading-[98px] mt-2",
  heroSubText:
    "text-lavender-deep font-medium lg:text-[28px] sm:text-[22px] xs:text-[18px] text-[15px] lg:leading-[40px]",

  sectionHeadText:
    "text-text-dark font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText:
    "sm:text-[18px] text-[14px] text-lavender uppercase tracking-wider font-semibold",
};

export { styles };
```

- [ ] **Step 4: Verify dev server still runs**

Run: `npm run dev` in `d:/websites/portfolio`
Open browser at `http://localhost:5173` — page should show with a light/cream background instead of dark. Text may look wrong — that's expected until we update components.

- [ ] **Step 5: Commit**

```bash
cd d:/websites/portfolio
git init
git add tailwind.config.cjs src/index.css src/styles.js
git commit -m "feat: apply cream/lavender theme + paper texture foundation"
```

---

## Task 2: Update Constants (Harry's Real Data)

**Files:**
- Modify: `src/constants/index.js`

- [ ] **Step 1: Replace entire constants/index.js**

```js
import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  figma,
  git,
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
    description: "Beautiful interfaces your users will love",
  },
  {
    title: "UX Design",
    icon: mobile,
    description: "Experiences that are easy and enjoyable to use",
  },
  {
    title: "Web Development",
    icon: backend,
    description: "Clean, fast websites built to perform",
  },
  {
    title: "Brand & Visual Design",
    icon: creator,
    description: "A consistent look that makes your brand memorable",
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
      "Designing websites and digital experiences for small businesses, restaurants, and startups across North America.",
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
    testimonial: "Harry built our startup landing page in record time. Clean, professional, and exactly the first impression we needed to attract investors.",
    name: "James Liu",
    designation: "CEO",
    company: "LaunchPad",
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
    name: "LaunchPad",
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
```

- [ ] **Step 2: Commit**

```bash
cd d:/websites/portfolio
git add src/constants/index.js
git commit -m "feat: add Harry's real portfolio data — projects, experience, bio"
```

---

## Task 3: Navbar

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Replace Navbar.jsx**

```jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-primary/90 backdrop-blur-md shadow-sm border-b border-lavender/10"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => { setActive(""); window.scrollTo(0, 0); }}
        >
          <span className="text-lavender-deep text-[22px] font-black tracking-tight">
            Harry<span className="text-lavender">.</span>
          </span>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-lavender-deep" : "text-secondary"
              } hover:text-lavender-deep text-[16px] font-medium cursor-pointer transition-colors duration-200 relative group`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-lavender group-hover:w-full transition-all duration-300" />
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[26px] h-[26px] object-contain cursor-pointer"
            style={{ filter: "invert(40%) sepia(20%) saturate(800%) hue-rotate(220deg)" }}
            onClick={() => setToggle(!toggle)}
          />
          <motion.div
            initial={false}
            animate={toggle ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            className={`${!toggle ? "pointer-events-none" : ""} p-6 bg-primary/95 backdrop-blur-md border border-lavender/20 shadow-lavender absolute top-16 right-4 min-w-[160px] z-10 rounded-2xl`}
          >
            <ul className="list-none flex flex-col gap-5">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[15px] ${
                    active === nav.title ? "text-lavender-deep" : "text-secondary"
                  } hover:text-lavender-deep transition-colors`}
                  onClick={() => { setToggle(false); setActive(nav.title); }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
```

- [ ] **Step 2: Verify navbar looks correct**

Open `http://localhost:5173` — should see "Harry." in deep lavender, nav links in grey, underline hover effect working, mobile menu icon visible on small screens.

- [ ] **Step 3: Commit**

```bash
cd d:/websites/portfolio
git add src/components/Navbar.jsx
git commit -m "feat: cream/lavender navbar with scroll blur and animated entry"
```

---

## Task 4: Hero Section

**Files:**
- Modify: `src/components/Hero.jsx`

- [ ] **Step 1: Replace Hero.jsx with fully animated hero**

```jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { styles } from "../styles";

const CYCLING_WORDS = ["UI Designer", "UX Designer", "Front-End Developer", "Problem Solver"];

const FloatingOrb = ({ className, style }) => (
  <div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    style={style}
  />
);

const Hero = () => {
  const nameRef = useRef(null);
  const cycleRef = useRef(null);
  const wordIndex = useRef(0);

  useEffect(() => {
    // GSAP: letter-by-letter name reveal
    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll(".letter");
      gsap.fromTo(
        letters,
        { opacity: 0, y: 60, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.06,
          stagger: 0.06,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );
    }

    // GSAP: cycling subtitle words
    const cycleFn = () => {
      if (!cycleRef.current) return;
      wordIndex.current = (wordIndex.current + 1) % CYCLING_WORDS.length;
      gsap.to(cycleRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          if (cycleRef.current) {
            cycleRef.current.textContent = CYCLING_WORDS[wordIndex.current];
            gsap.to(cycleRef.current, { opacity: 1, y: 0, duration: 0.4 });
          }
        },
      });
    };

    const interval = setInterval(cycleFn, 2200);
    return () => clearInterval(interval);
  }, []);

  const nameText = "Hi, I'm Harry";

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Floating orbs */}
      <FloatingOrb
        className="orb-float w-[400px] h-[400px] bg-lavender/20 top-[-80px] right-[-100px]"
        style={{}}
      />
      <FloatingOrb
        className="orb-float-delay w-[300px] h-[300px] bg-lavender-deep/15 bottom-[100px] left-[-80px]"
        style={{}}
      />
      <FloatingOrb
        className="orb-float-slow w-[200px] h-[200px] bg-lavender/25 top-[200px] left-[40%]"
        style={{}}
      />
      <FloatingOrb
        className="orb-float w-[150px] h-[150px] bg-lavender-deep/20 bottom-[200px] right-[20%]"
        style={{}}
      />

      {/* Main content */}
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* Lavender line accent */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-lavender" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* Text content */}
        <div className="z-10">
          {/* Name with letter-by-letter reveal */}
          <h1
            ref={nameRef}
            className={`${styles.heroHeadText}`}
            style={{ perspective: "600px" }}
          >
            {nameText.split("").map((char, i) => (
              <span
                key={i}
                className="letter inline-block"
                style={{
                  color: char === "H" && i === nameText.indexOf("H", 7)
                    ? "#6B5B95"
                    : "#2C2C2C",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </h1>

          {/* Cycling subtitle */}
          <div className={`${styles.heroSubText} mt-3 flex items-center gap-3`}>
            <span className="text-secondary">I'm a</span>
            <span
              ref={cycleRef}
              className="text-lavender-deep font-semibold min-w-[220px] inline-block"
            >
              {CYCLING_WORDS[0]}
            </span>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-4 text-secondary text-[15px] sm:text-[17px] max-w-[500px] leading-relaxed"
          >
            I'm Harry, and I believe a great website shouldn't feel complicated — for you or your customers.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-7 py-3 rounded-full bg-lavender-deep text-white font-semibold text-[15px] hover:bg-lavender transition-all duration-300 shadow-lavender hover:shadow-lg hover:-translate-y-0.5"
            >
              See My Work
            </a>
            <a
              href="#contact"
              className="px-7 py-3 rounded-full border-2 border-lavender text-lavender-deep font-semibold text-[15px] hover:bg-lavender hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-8 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-[32px] h-[58px] rounded-3xl border-[3px] border-lavender flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-2.5 h-2.5 rounded-full bg-lavender"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Verify hero animations**

Open `http://localhost:5173` — should see:
- "Hi, I'm Harry" letters appearing one by one
- "UI Designer" cycling to next words every 2.2s
- 4 blurred lavender orbs floating
- Two CTA buttons
- Bouncing scroll indicator in lavender

- [ ] **Step 3: Commit**

```bash
cd d:/websites/portfolio
git add src/components/Hero.jsx
git commit -m "feat: animated hero — GSAP letter reveal, cycling text, floating orbs"
```

---

## Task 5: About Section

**Files:**
- Modify: `src/components/About.jsx`

- [ ] **Step 1: Replace About.jsx**

```jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Happy Clients" },
];

const StatCounter = ({ value, suffix, label }) => {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    gsap.fromTo(
      { val: 0 },
      {
        val: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: function () {
          el.textContent = Math.round(this.targets()[0].val) + suffix;
        },
      }
    );
  }, [value, suffix]);

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.3, 0.8)}
      className="flex flex-col items-center p-6 bg-cream-card rounded-2xl shadow-card border border-lavender/10 min-w-[130px]"
    >
      <span
        ref={numRef}
        className="text-[42px] font-black text-lavender-deep leading-none"
      >
        0{suffix}
      </span>
      <span className="text-secondary text-[13px] mt-2 text-center font-medium">{label}</span>
    </motion.div>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Who I Am</p>
        <h2 className={styles.sectionHeadText}>About Me.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[32px]"
      >
        I'm Harry, and I believe a great website shouldn't feel complicated — for you or your customers.
        I design and build websites that are clear, beautiful, and easy to navigate, helping businesses
        make a strong first impression every time.
      </motion.p>

      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.8)}
        className="mt-12 flex flex-wrap gap-6 justify-start"
      >
        {stats.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(About, "about");
```

- [ ] **Step 2: Commit**

```bash
cd d:/websites/portfolio
git add src/components/About.jsx
git commit -m "feat: about section with bio and GSAP scroll counter animations"
```

---

## Task 6: Services Section (repurpose Feedbacks)

**Files:**
- Modify: `src/components/Feedbacks.jsx`

- [ ] **Step 1: Replace Feedbacks.jsx entirely as Services**

```jsx
import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon, description }) => (
  <Tilt
    options={{ max: 15, scale: 1.02, speed: 400 }}
    className="xs:w-[240px] w-full"
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.15, 0.75)}
      className="w-full lavender-gradient p-[1.5px] rounded-[20px] shadow-card card-torn"
    >
      <div className="bg-cream-card rounded-[20px] py-8 px-8 min-h-[260px] flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-lavender-light flex items-center justify-center shadow-lavender">
          <img src={icon} alt={title} className="w-7 h-7 object-contain" style={{ filter: "invert(35%) sepia(30%) saturate(600%) hue-rotate(225deg)" }} />
        </div>
        <h3 className="text-text-dark text-[18px] font-bold text-center">{title}</h3>
        <p className="text-secondary text-[13px] text-center leading-relaxed">{description}</p>
      </div>
    </motion.div>
  </Tilt>
);

const Services = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I Offer</p>
        <h2 className={styles.sectionHeadText}>Services.</h2>
      </motion.div>

      <div className="mt-14 flex flex-wrap gap-8 justify-center sm:justify-start">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Services, "services");
```

- [ ] **Step 2: Commit**

```bash
cd d:/websites/portfolio
git add src/components/Feedbacks.jsx
git commit -m "feat: services section with paper-torn card edges and tilt hover"
```

---

## Task 7: Skills Section

**Files:**
- Modify: `src/components/Tech.jsx`

- [ ] **Step 1: Replace Tech.jsx with skill bubbles**

```jsx
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
        <p className="text-lavender-deep font-semibold text-[15px] mb-4 uppercase tracking-wider">Design Tools</p>
        <div className="flex flex-wrap gap-3 mb-10">
          {designSkills.map((skill, index) => (
            <SkillPill key={skill.name} name={skill.name} index={index} />
          ))}
        </div>

        <p className="text-lavender-deep font-semibold text-[15px] mb-4 uppercase tracking-wider">Development</p>
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
```

- [ ] **Step 2: Commit**

```bash
cd d:/websites/portfolio
git add src/components/Tech.jsx
git commit -m "feat: skills section with animated lavender pill badges"
```

---

## Task 8: Projects Section

**Files:**
- Modify: `src/components/Works.jsx`

- [ ] **Step 1: Replace Works.jsx**

```jsx
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
      {/* Gradient image placeholder */}
      <div
        className="relative w-full h-[200px] rounded-xl overflow-hidden group cursor-pointer"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 bg-lavender-deep/0 group-hover:bg-lavender-deep/70 transition-all duration-300 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="text-white font-semibold text-[15px] opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            View Project
          </motion.span>
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
```

- [ ] **Step 2: Commit**

```bash
cd d:/websites/portfolio
git add src/components/Works.jsx
git commit -m "feat: projects section with gradient placeholders and hover overlay"
```

---

## Task 9: Experience Timeline

**Files:**
- Modify: `src/components/Experience.jsx`

- [ ] **Step 1: Replace Experience.jsx with lavender timeline**

```jsx
import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "#F3EFE8",
      color: "#2C2C2C",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(107,91,149,0.15)",
      border: "1px solid rgba(155,142,196,0.2)",
    }}
    contentArrowStyle={{ borderRight: "7px solid #F3EFE8" }}
    date={<span className="text-lavender-deep font-semibold">{experience.date}</span>}
    iconStyle={{ background: "#E8E0F5", border: "3px solid #9B8EC4" }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[55%] h-[55%] object-contain"
          style={{ filter: "invert(35%) sepia(30%) saturate(600%) hue-rotate(225deg)" }}
        />
      </div>
    }
  >
    <div>
      <h3 className="text-text-dark text-[20px] font-bold">{experience.title}</h3>
      <p className="text-lavender-deep text-[14px] font-semibold mt-1" style={{ margin: "4px 0 0" }}>
        {experience.company_name}
      </p>
    </div>
    <ul className="mt-4 list-disc ml-5 space-y-2">
      {experience.points.map((point, index) => (
        <li key={`exp-point-${index}`} className="text-secondary text-[13px] pl-1 tracking-wide leading-relaxed">
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} text-center`}>My Journey</p>
      <h2 className={`${styles.sectionHeadText} text-center`}>Work Experience.</h2>
    </motion.div>
    <div className="mt-16 flex flex-col">
      <VerticalTimeline lineColor="#9B8EC4">
        {experiences.map((experience, index) => (
          <ExperienceCard key={`experience-${index}`} experience={experience} />
        ))}
      </VerticalTimeline>
    </div>
  </>
);

export default SectionWrapper(Experience, "work");
```

- [ ] **Step 2: Commit**

```bash
cd d:/websites/portfolio
git add src/components/Experience.jsx
git commit -m "feat: experience timeline with lavender connector and cream cards"
```

---

## Task 10: Contact Section

**Files:**
- Modify: `src/components/Contact.jsx`

- [ ] **Step 1: Replace Contact.jsx with info cards (no form)**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
cd d:/websites/portfolio
git add src/components/Contact.jsx
git commit -m "feat: contact section with email/phone/location cards, no form"
```

---

## Task 11: Footer

**Files:**
- Create: `src/components/Footer.jsx`
- Modify: `src/components/index.js`

- [ ] **Step 1: Create src/components/Footer.jsx**

```jsx
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
        Designed & Built by Harry &copy; {new Date().getFullYear()}
      </p>
      <p className="text-lavender text-[12px] font-medium">Canada</p>
    </div>
  </motion.footer>
);

export default Footer;
```

- [ ] **Step 2: Add Footer export to src/components/index.js**

Read current index.js first, then add the Footer export line:

```js
// Add this line to the existing exports:
export { default as Footer } from './Footer';
```

- [ ] **Step 3: Commit**

```bash
cd d:/websites/portfolio
git add src/components/Footer.jsx src/components/index.js
git commit -m "feat: minimal cream footer with Harry branding"
```

---

## Task 12: App.jsx — Wire Everything Together

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace App.jsx**

```jsx
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Footer,
  Hero,
  Navbar,
  Tech,
  Works,
} from "./components";

const App = () => (
  <BrowserRouter>
    <div className="relative z-0 bg-primary min-h-screen">
      {/* Navbar + Hero */}
      <div className="relative">
        <Navbar />
        <Hero />
      </div>

      {/* About */}
      <About />

      {/* Services (repurposed Feedbacks) */}
      <Feedbacks />

      {/* Skills */}
      <Tech />

      {/* Projects */}
      <Works />

      {/* Experience */}
      <Experience />

      {/* Contact */}
      <div className="relative z-0">
        <Contact />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
```

- [ ] **Step 2: Verify all sections render in correct order**

Open `http://localhost:5173` and scroll through:
- Navbar (Harry. logo, lavender links)
- Hero (letter reveal, floating orbs, CTA buttons)
- About (bio, 3 stat counters)
- Services (4 tilt cards with torn edges)
- Skills (lavender pill badges in 2 groups)
- Projects (3 gradient cards with hover overlay)
- Experience (vertical timeline, lavender connector)
- Contact (3 info cards)
- Footer ("Harry." + copyright)

- [ ] **Step 3: Commit**

```bash
cd d:/websites/portfolio
git add src/App.jsx
git commit -m "feat: wire all sections in final layout order"
```

---

## Task 13: Responsive Polish

**Files:**
- Modify: `src/components/Hero.jsx` (mobile text sizing)
- Modify: `src/index.css` (mobile-specific adjustments)

- [ ] **Step 1: Add mobile-specific CSS to index.css**

Append to the end of `src/index.css`:

```css
/* Mobile responsive tweaks */
@media (max-width: 390px) {
  .orb-float { width: 250px; height: 250px; }
  .orb-float-delay { width: 180px; height: 180px; }
}

@media (max-width: 375px) {
  .card-torn { clip-path: none; border-radius: 20px; }
}

/* Ensure vertical timeline is mobile-friendly */
@media (max-width: 768px) {
  .vertical-timeline-element-content {
    padding: 1.2em !important;
  }
}

/* Prevent orb overflow on small screens */
@media (max-width: 414px) {
  section { overflow-x: hidden; }
}
```

- [ ] **Step 2: Test on mobile sizes**

In browser DevTools, test at these widths and verify no horizontal scroll, text readable, cards not overflowing:
- 375px (iPhone SE)
- 390px (iPhone 14)
- 414px (iPhone Plus)
- 768px (iPad)

- [ ] **Step 3: Final commit**

```bash
cd d:/websites/portfolio
git add src/index.css
git commit -m "feat: mobile responsive adjustments for all phone sizes"
```

---

## Task 14: Final Verification

- [ ] **Step 1: Run dev server and do full scroll-through**

```bash
cd d:/websites/portfolio
npm run dev
```

Open `http://localhost:5173`. Check each section:
- [ ] Navbar: "Harry." logo visible, links work, blur on scroll, mobile hamburger works
- [ ] Hero: Letters animate in, words cycle, orbs float, CTA buttons work
- [ ] About: Bio readable, counters count up on scroll
- [ ] Services: 4 cards with torn edges, tilt on hover
- [ ] Skills: Pill badges in 2 groups, hover colour change
- [ ] Projects: 3 gradient cards, hover overlay works
- [ ] Experience: Timeline with lavender line and cream cards
- [ ] Contact: 3 cards, email/phone links work
- [ ] Footer: Copyright + "Harry." branding

- [ ] **Step 2: Run build to catch errors**

```bash
cd d:/websites/portfolio
npm run build 2>&1
```

Expected: build succeeds with no errors. Warnings about peer deps are acceptable.

- [ ] **Step 3: Final commit tag**

```bash
cd d:/websites/portfolio
git add -A
git commit -m "feat: complete Harry portfolio — cream/lavender theme, all sections, fully responsive"
```
