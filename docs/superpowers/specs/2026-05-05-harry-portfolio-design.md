# Harry Portfolio — Design Spec
**Date:** 2026-05-05
**Status:** Approved by user

---

## Overview

A fully animated, mobile-first personal portfolio for Harry — a UI/UX Designer and Front-End Developer based in Canada. Built on top of adrianhajdin/project_3D_developer_portfolio (React + Vite + Three.js + Framer Motion + Tailwind CSS + GSAP). The design merges three approaches: soft studio aesthetics, bold editorial typography, and minimal ink restraint.

Target audience: Non-technical clients (restaurants, clothing brands, startups). Language and copy must be jargon-free, warm, and outcome-focused.

---

## Personal Info

| Field | Value |
|-------|-------|
| Name | Harry |
| Title | UI/UX Designer & Front-End Developer |
| Email | harrygillfdk50@gmail.com |
| Phone | 4372501904 (messages only) |
| Location | Canada |
| Social media | None |

---

## Bio (About Section)

> "I'm Harry, and I believe a great website shouldn't feel complicated — for you or your customers. I design and build websites that are clear, beautiful, and easy to navigate, helping businesses make a strong first impression every time."

---

## Color Palette

| Role | Hex |
|------|-----|
| Background | `#FAF7F2` (warm cream) |
| Primary accent | `#9B8EC4` (lavender) |
| Deep accent | `#6B5B95` (deep lavender) |
| Text | `#2C2C2C` (near black) |
| Subtext | `#7A7A7A` (grey) |
| Card surface | `#F3EFE8` (cream card) |

---

## Background

A CSS SVG crumpled/crumbled paper texture tiled across the **entire page** — applied to the root `body` and every section. No breaks between sections. Achieved via an inline SVG `feTurbulence` filter or a repeating CSS background-image with a paper grain pattern. Subtle, not distracting.

---

## Sections

### 1. Navbar
- Transparent background on top, cream + blur (`backdrop-filter`) on scroll
- Logo: "Harry." in deep lavender, bold
- Links: About, Work, Contact — lavender underline slide-in on hover
- Mobile: hamburger menu with slide-down drawer
- Framer Motion: fade-in on load

### 2. Hero
- Full viewport height
- **Animations (layered):**
  - GSAP: Letter-by-letter reveal of "Hi, I'm Harry" on load
  - GSAP: Cycling subtitle — words rotate through: "UI Designer", "UX Designer", "Front-End Developer", "Problem Solver"
  - Framer Motion: 3–4 floating lavender blurred orbs drifting slowly in background
  - CSS: Crumpled paper parallax shift on mouse move
  - Scroll indicator: animated bouncing chevron/arrow
- CTA buttons: "See My Work" (lavender filled) + "Get In Touch" (outlined)

### 3. About
- Bio text (Version 3, see above)
- 3 animated stat counters on scroll: "3+ Years Experience", "20+ Projects Delivered", "15+ Happy Clients"
- Framer Motion: text and stats fade + slide up on scroll entry

### 4. Services
- 4 service cards:
  1. UI Design — "Beautiful interfaces your users will love"
  2. UX Design — "Experiences that are easy and enjoyable to use"
  3. Web Development — "Clean, fast websites built to perform"
  4. Brand & Visual Design — "A consistent look that makes your brand memorable"
- Each card: lavender icon, cream card bg (`#F3EFE8`), paper-torn bottom edge (CSS clip-path)
- Hover: tilt effect (react-tilt) + lavender glow shadow
- Framer Motion: stagger fade-in on scroll

### 5. Skills
- Two groups: Design Tools + Development
- **Design Tools:** Figma, Adobe XD, Adobe Photoshop, Framer, Sketch
- **Development:** HTML & CSS, JavaScript, React, Tailwind CSS, Responsive Design, Prototyping & Wireframing, User Research
- Display as animated floating skill bubbles or pill badges with lavender bg
- GSAP: skills animate in with a stagger bounce on scroll

### 6. Projects (3 cards)

**Project 1 — "Saffron Kitchen"**
- Type: Restaurant website
- Description: "A warm, elegant website for a fine-dining restaurant — designed to showcase the menu, atmosphere, and reservation experience in a way that makes guests excited before they even arrive."
- Tags: UI Design, Web Design, Figma
- Stack: React, Tailwind CSS

**Project 2 — "Velour Studio"**
- Type: Clothing brand e-commerce
- Description: "A minimal, fashion-forward online store for an independent clothing brand — focused on clean product presentation, smooth browsing, and a checkout experience that feels effortless."
- Tags: E-commerce, UX Design, Branding
- Stack: Next.js, Tailwind CSS

**Project 3 — "LaunchPad"**
- Type: SaaS startup landing page
- Description: "A bold, conversion-focused landing page for an early-stage startup — designed to communicate their product's value in seconds and turn visitors into sign-ups."
- Tags: Landing Page, UX Design, Startup
- Stack: React, Framer Motion

- Cards: image placeholder (gradient), hover zoom overlay with view button
- Framer Motion: slide-up stagger on scroll

### 7. Experience (Timeline)

**Entry 1 — Freelance UI/UX Designer** *(2022 – Present)*
- Self-employed, Canada
- Designing websites and digital experiences for small businesses, restaurants, and startups across North America
- Key work: brand identity, responsive web design, prototyping, client presentations

**Entry 2 — Junior Front-End Designer, Pixel & Co. Agency** *(2021 – 2022)*
- Built and styled web interfaces from Figma designs
- Collaborated with developers and clients to deliver responsive, on-brand websites
- Gained experience in React, Tailwind CSS, and client-facing design reviews

**Entry 3 — Design Intern, Bright Studio** *(2020 – 2021)*
- Assisted senior designers with UI mockups, wireframes, and brand assets
- Worked on projects for local businesses and non-profits

- Layout: vertical timeline, lavender dot + connector line
- GSAP ScrollTrigger: line draws down as user scrolls

### 8. Contact
- Heading: "Let's Work Together"
- Subtext: "Have a project in mind? Send me a message and let's talk."
- Display: Email card + Phone card (messages only) + Location card (Canada)
- NO social media links
- NO contact form (keep it simple)
- Framer Motion: cards fade + scale in on scroll

### 9. Footer
- "Designed & Built by Harry © 2026"
- Minimal, cream background, centered
- Lavender "Harry." logo mark

---

## Animation Summary

| Tool | Used For |
|------|----------|
| GSAP | Hero text reveal, cycling subtitle, scroll-triggered timeline line draw, stat counters, skill stagger |
| Framer Motion | Floating orbs, card tilts, section fade-ins, navbar load, project card hovers |
| CSS | Paper texture parallax, hover states, navbar blur, paper-torn card edges |

---

## Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| 375px | iPhone SE, small Androids |
| 390px | iPhone 14/15 |
| 414px | iPhone Plus sizes |
| 768px | Tablets |
| 1024px | Small laptops |
| 1280px+ | Desktops |

Mobile-first: all base styles written for mobile, then scaled up with `sm:`, `md:`, `lg:`, `xl:` Tailwind prefixes.

---

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion `v9.1.7`
- GSAP `v3.15.0` + ScrollTrigger plugin
- Three.js + @react-three/fiber (retained from base repo for 3D orbs if needed)
- react-tilt (existing, for card hover effects)

---

## Files to Modify

| File | Change |
|------|--------|
| `src/index.css` | Cream/lavender theme, paper texture, gradient overrides |
| `src/styles.js` | Update all color class strings |
| `src/constants/index.js` | Replace all placeholder data with Harry's real data |
| `tailwind.config.cjs` | Add cream/lavender custom colors |
| `src/components/Hero.jsx` | Full rebuild with GSAP + orbs + cycling text |
| `src/components/Navbar.jsx` | Scroll blur, lavender branding |
| `src/components/About.jsx` | Bio + animated counters |
| `src/components/Tech.jsx` | Skill bubbles/pills |
| `src/components/Works.jsx` | 3 new project cards |
| `src/components/Experience.jsx` | Timeline with GSAP line draw |
| `src/components/Contact.jsx` | Email/phone/location cards, no form |
| `src/components/Feedbacks.jsx` | Repurpose as Services section |
| `src/App.jsx` | Section order + paper bg wrapper |
