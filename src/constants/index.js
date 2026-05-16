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
  tailwind,
  typescript,
  git,
  shopify,
} from "../assets";

export const navLinks = [
  { id: "about",   title: "About"  },
  { id: "work",    title: "Work"   },
  { id: "skills",  title: "Skills" },
  { id: "contact", title: "Contact"},
];

export const skills = {
  design: [
    { name: "Figma",          icon: figma    },
    { name: "UI Design",      icon: web      },
    { name: "UX Design",      icon: mobile   },
    { name: "Brand Identity", icon: creator  },
  ],
  development: [
    { name: "React",        icon: reactjs    },
    { name: "JavaScript",   icon: javascript },
    { name: "HTML5",        icon: html       },
    { name: "CSS3",         icon: css        },
    { name: "Tailwind CSS", icon: tailwind   },
    { name: "TypeScript",   icon: typescript },
    { name: "Git",          icon: git        },
    { name: "Shopify",      icon: shopify    },
  ],
};

const services = [
  {
    title: "UI Design",
    icon: web,
    description: "Interfaces that look premium on day one — and hold up across every screen size.",
  },
  {
    title: "UX Design",
    icon: mobile,
    description: "Your visitors always know what to do next — whether that's booking a table, making a purchase, or getting in touch.",
  },
  {
    title: "Web Development",
    icon: backend,
    description: "A website that loads in a blink, works perfectly on every phone, and never needs babysitting.",
  },
  {
    title: "Brand & Visual Design",
    icon: creator,
    description: "Visual systems that travel — from your website to your social to your business card, without losing coherence.",
  },
];


const experiences = [
  {
    title: "AI Automation Builder & UX Designer",
    company_name: "Self-Employed · Canada",
    icon: creator,
    date: "2022 – Present",
    points: [
      "Build AI automations for small businesses — lead-capture systems, customer follow-up flows, and tools that respond on every channel within seconds.",
      "Design and build websites that look the part and actually bring in customers — restaurants, shops, independent brands.",
      "Manage every step — from the first conversation to the day it goes live — so clients never have to chase anyone down.",
      "Clients across hospitality, retail, and professional services — see the work below.",
    ],
  },
  {
    title: "Junior Front-End Designer",
    company_name: "Pixel & Co. Agency",
    icon: web,
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
    date: "2020 – 2021",
    points: [
      "Assisted senior designers with UI mockups, wireframes, and brand asset production.",
      "Worked on visual identity and web design projects for local businesses and non-profits.",
      "Sharpened core skills in typography, colour theory, and visual hierarchy — the fundamentals that still show up in every project.",
      "Delivered polished assets on tight deadlines in a fast-paced studio environment.",
    ],
  },
];

const testimonials = [
  {
    context: "The problem: an outdated site and almost no online bookings",
    testimonial: "Our old website looked like it was built in 2009 — I was embarrassed to hand out our business card. Harry transformed our online presence completely. Online reservations roughly doubled in the first month, and customers keep complimenting how easy the site is to use.",
    name: "Marco Rossi",
    designation: "Owner",
    company: "Saffron Kitchen",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%237260A0'/%3E%3Ctext x='50' y='56' font-family='Arial' font-size='32' font-weight='bold' fill='white' text-anchor='middle'%3EMR%3C/text%3E%3C/svg%3E",
  },
  {
    context: "The problem: a broken store losing sales every day",
    testimonial: "I was nervous about redesigning the whole store — our old site was losing us sales and I didn't know where to start. Harry made it simple. We went from concept to a full working site in three weeks, and our checkout abandonment dropped noticeably in the first month.",
    name: "Priya Sharma",
    designation: "Founder",
    company: "Velour Studio",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23A090CC'/%3E%3Ctext x='50' y='56' font-family='Arial' font-size='32' font-weight='bold' fill='white' text-anchor='middle'%3EPS%3C/text%3E%3C/svg%3E",
  },
  {
    context: "The problem: a product no one could explain after reading the page",
    testimonial: "Our previous page confused everyone we showed it to — we had a good product but couldn't explain it. Harry asked the right questions from day one. The page he built explains what we do in under ten seconds — strangers get it immediately, which was the whole point.",
    name: "James Liu",
    designation: "CEO",
    company: "Groundwork",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%239B8EC4'/%3E%3Ctext x='50' y='56' font-family='Arial' font-size='32' font-weight='bold' fill='white' text-anchor='middle'%3EJL%3C/text%3E%3C/svg%3E",
  },
];

const projects = [
  {
    name: "Saffron Kitchen",
    description:
      "Saffron Kitchen needed a website that matched their restaurant — refined, easy to navigate, and built to turn first-time visitors into reservations. The owner had been burned by a previous agency that delivered something generic; we rebuilt from scratch around their actual menu. Online reservations roughly doubled in the first month.",
    tags: [
      { name: "UI Design", color: "lavender-text-gradient" },
      { name: "Web Design", color: "sage-text-gradient" },
      { name: "Figma", color: "sage-gradient-mid" },
    ],
    gradient: "linear-gradient(135deg, #c8a882 0%, #8B5E3C 100%)",
    source_code_link: null,
    overlayLabel: "Case Study on Request →",
  },
  {
    name: "Velour Studio",
    description:
      "An independent clothing brand needed an online store that felt as considered as their clothes. An early version was too sparse — the founder pushed back, and she was right. We added warmth without adding clutter, and cart completions increased noticeably within weeks of launch.",
    tags: [
      { name: "E-commerce", color: "lavender-text-gradient" },
      { name: "UX Design", color: "sage-text-gradient" },
      { name: "Branding", color: "sage-gradient-mid" },
    ],
    gradient: "linear-gradient(135deg, #d4b8c7 0%, #8B5572 100%)",
    source_code_link: null,
    overlayLabel: "Ask About This →",
  },
  {
    name: "Groundwork",
    description:
      "A startup needed one page that explained their product to a stranger in under ten seconds. The first draft tried to say everything — we cut it by half, then half again. Trial signups increased week-over-week from launch, and the founder stopped apologising when he shared the link.",
    tags: [
      { name: "Landing Page", color: "lavender-text-gradient" },
      { name: "UX Design", color: "sage-text-gradient" },
      { name: "Startup", color: "sage-gradient-mid" },
    ],
    gradient: "linear-gradient(135deg, #9B8EC4 0%, #6B5B95 100%)",
    source_code_link: null,
    overlayLabel: "Ask About This →",
  },
];

const aiAutomations = [
  {
    name: "Speed-Lead",
    eyebrow: "Automation · Built with AI",
    tagline: "AI-powered lead capture — built so businesses never lose a customer to a slow follow-up.",
    body:
      "Speed-Lead is an AI automation system that listens across every channel a business uses — website forms, Gmail enquiries, WhatsApp messages — and the moment a lead comes in, it does two things at once: sends a personalized follow-up back to the customer on the same channel they reached out from, and notifies the right salesperson with the full context. The customer feels heard within seconds. The salesperson never misses a hot lead.",
    howItWorks: [
      "A lead comes in from a website form, an email, or a WhatsApp message.",
      "AI reads it, figures out what the customer needs, and sends a personalized reply within seconds.",
      "The right person on the team gets a notification with everything they need to follow up — phone, name, what they asked about, how urgent it is.",
    ],
    tags: ["n8n", "Claude AI", "Multi-channel"],
    status: "Beta · Now onboarding first clients",
    email: "harry@harrygill.dev",
  },
];

const workSamples = [
  {
    name: "Osteria XYZ",
    category: "Italian Fine Dining · Sample",
    description:
      "A multi-page sample site for a fictional three-Michelin-star Italian restaurant. Editorial typography, candlelit motion, dish-by-dish handwritten reveals, working reservation flow. Built mobile-first; deployed with custom domain + SSL.",
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1200&q=85&auto=format&fit=crop",
    tags: [
      { name: "Restaurant", color: "lavender-text-gradient" },
      { name: "Editorial",  color: "sage-text-gradient" },
      { name: "Animations", color: "sage-gradient-mid" },
    ],
    liveUrl: "https://demo.harrygill.dev",
    status: "live",
  },
  {
    name: "Sample Two",
    category: "Coming Soon",
    description:
      "A second showcase piece — in progress. Will demonstrate a different industry, a different palette, and a different motion language. Stay tuned.",
    image: null,
    tags: [
      { name: "In Progress", color: "lavender-text-gradient" },
    ],
    liveUrl: null,
    status: "coming-soon",
  },
  {
    name: "Sample Three",
    category: "Coming Soon",
    description:
      "Third showcase piece — also in progress. Each sample is built end-to-end: design, copy, motion, deploy, custom domain.",
    image: null,
    tags: [
      { name: "In Progress", color: "lavender-text-gradient" },
    ],
    liveUrl: null,
    status: "coming-soon",
  },
];

export { services, experiences, testimonials, projects, workSamples, aiAutomations };
