# Iteration 1 Proposals — Depth, Texture & Micro-interactions

---

## JAKE REVIEW

**Role: Rich Texture & Depth (ex-Apple Design)**

### Depth & Texture Gaps Found

**1. Body paper texture is too faint and static (index.css)**
The SVG noise filter on `body` uses `opacity="0.08"` and `.paper-texture::before` uses `opacity="0.06"` — both are nearly invisible on the cream `#FAF7F2` background. Apple material language layers at least two grain passes at different scales and blending modes. Currently there is only one SVG filter pass and it barely reads. The `.paper-texture` pseudo-element also never activates because no component assigns the class to a visible element with a contrasting background, making the whole `.paper-texture` system decorative dead weight.

**2. Cards have flat ambient shadow only (Works.jsx / Feedbacks.jsx)**
`shadow-card` and `.vertical-timeline-element-content` both use a single diffuse shadow: `0 4px 20px rgba(107,91,149,0.15)`. There is no contact shadow (tight, dark, close-offset), no inner top highlight, and no specular edge. The result reads as a flat rectangle glued to the page rather than a lifted physical object.

**3. ServiceCard gradient border has no depth reinforcement (Feedbacks.jsx)**
The `lavender-gradient` border wrapper is 1.5px and fades straight into the cream card interior. There is no inner shadow on the `.bg-cream-card` div. The `.card-torn` clip path is a great detail but is unsupported by any cast shadow — `box-shadow` does not respect clip-path, so the torn edge currently casts nothing.

**4. Hero orbs lack depth layering (Hero.jsx)**
Each `FloatingOrb` uses `blur-3xl` and a flat background color class. There is no specular-core-to-atmosphere gradient inside the orb — they look like uniform blurry blobs rather than atmospheric light sources with bright centres.

**5. Navbar glass surface is underworked (Navbar.jsx)**
The scrolled state uses `shadow-sm` — virtually invisible. There is no `inset 0 1px 0` top-highlight that sells a glass edge. `backdrop-blur-md` is adequate but `backdrop-blur-xl` would read more convincingly as glass at this opacity level.

**6. Hero CTA buttons have no layered depth (Hero.jsx)**
`shadow-lavender` is a single ambient shadow. There is no `inset 0 1px 0 rgba(255,255,255,0.25)` top-highlight to give the pill a tablet/button-depth feel, and no pressed inset shadow on the active state.

---

### Specific CSS Additions

#### A. Double-pass paper grain on body — replace existing `body` rule in index.css

```css
body {
  background-color: #FAF7F2;
  /* Pass 1: coarse grain */
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='multiply'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23paper)' opacity='0.13'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='fine'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeBlend in='SourceGraphic' mode='screen'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23fine)' opacity='0.04'/%3E%3C/svg%3E");
  background-repeat: repeat, repeat;
  background-size: 400px 400px, 200px 200px;
}
```

#### B. Deep layered card shadow utility — add to index.css

```css
.card-deep {
  box-shadow:
    0 1px 2px rgba(107, 91, 149, 0.18),
    0 4px 12px rgba(107, 91, 149, 0.12),
    0 16px 40px rgba(107, 91, 149, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transition: box-shadow 0.3s ease;
}

.card-deep:hover {
  box-shadow:
    0 2px 4px rgba(107, 91, 149, 0.20),
    0 8px 24px rgba(107, 91, 149, 0.16),
    0 28px 60px rgba(107, 91, 149, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}
```

Apply in Works.jsx: replace `shadow-card` with `card-deep` on the Tilt wrapper.

#### C. ServiceCard inset shadow on inner cream panel — add to index.css

```css
.service-card-inner {
  box-shadow:
    inset 0 2px 6px rgba(107, 91, 149, 0.08),
    inset 0 -1px 3px rgba(255, 255, 255, 0.9);
}
```

In Feedbacks.jsx update the inner div className to include `service-card-inner`.

#### D. Torn-edge cast shadow — add to index.css

```css
/* filter: drop-shadow respects clip-path; box-shadow does not */
.card-torn-shadow {
  filter:
    drop-shadow(0 4px 12px rgba(107, 91, 149, 0.18))
    drop-shadow(0 1px 3px rgba(107, 91, 149, 0.25));
}
```

Add `card-torn-shadow` to the outer `motion.div` in Feedbacks.jsx.

#### E. Navbar glass depth — update Navbar.jsx and add to index.css

```jsx
// Replace scrolled className string:
"bg-primary/85 backdrop-blur-xl border-b border-lavender/15 navbar-glass"
```

```css
.navbar-glass {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    0 4px 24px rgba(107, 91, 149, 0.12),
    0 1px 3px rgba(107, 91, 149, 0.10);
}
```

#### F. CTA button tablet-depth highlight — add style prop in Hero.jsx

```jsx
// On the "See My Work" anchor:
style={{
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 1px 3px rgba(107,91,149,0.30), 0 4px 16px rgba(107,91,149,0.20)"
}}
```

#### G. Orb specular-core gradient — replace FloatingOrb in Hero.jsx

```jsx
const FloatingOrb = ({ className }) => (
  <div
    className={`absolute rounded-full pointer-events-none ${className}`}
    style={{
      filter: "blur(60px)",
      background: "radial-gradient(circle at 35% 35%, rgba(155,142,196,0.55) 0%, rgba(155,142,196,0.18) 50%, transparent 75%)",
    }}
  />
);
```

Remove `blur-3xl` from each FloatingOrb className string — blur is now handled in the style prop.

#### H. Icon circle inner shadow — update Feedbacks.jsx

```jsx
// On the icon circle div, replace the shadow-lavender class with an inline style:
style={{
  boxShadow: "0 2px 8px rgba(107,91,149,0.25), inset 0 1px 2px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(107,91,149,0.10)"
}}
```

---

## CARLOS REVIEW

**Role: Micro-interactions & Hover (ex-Stripe Design)**

### Missing Micro-interactions Found

**1. Hero CTA buttons — no press/active state (Hero.jsx)**
Both buttons have `hover:-translate-y-0.5` (2px lift). There is no `active:scale-down`, no shadow collapse on press, no `active:translate-y-0`. Stripe buttons physically depress on click — the user feels the press.

**2. Nav links — underline draw exists but text does not respond (Navbar.jsx)**
The `w-0 group-hover:w-full` underline draw is good but the link text itself does not move. Stripe nav items get a subtle `translateY(-1px)` lift on hover. The active state is colour-only — no weight shift or physicality.

**3. ProjectCard overlay — opacity fade with no directionality (Works.jsx)**
"View Project" text fades in from opacity-0 with no positional movement. It should slide up from below simultaneously with the fade. The card also has no `transition-shadow` so the shadow does not animate on hover despite react-tilt changing the transform.

**4. ServiceCard icon — completely static on hover (Feedbacks.jsx)**
The icon circle has zero hover state — no bounce, no scale, no colour shift. Hover feedback is entirely absent from this component.

**5. Tag pills — no feedback (Works.jsx)**
The `#{tag.name}` spans are static. They should scale up and shift background opacity on hover.

**6. Scroll indicator — no hover response on container (Hero.jsx)**
The dot bounces but the anchor wrapping the mouse outline has no hover state. The border should glow and the dot should intensify colour on hover.

**7. Mobile menu icon — instant swap with no transition (Navbar.jsx)**
The menu/close image changes with no animation. It should rotate as it swaps for a satisfying open/close gesture — standard for mobile nav polish.

**8. Logo — no micro-interaction on hover (Navbar.jsx)**
`Harry.` has zero hover treatment. The period after the name is an ideal candidate for an independent colour transition.

**9. Timeline cards — no hover response (index.css)**
`.vertical-timeline-element-content` has a static box-shadow and no hover state defined. Hovering produces no visual feedback.

---

### Specific CSS / JSX Hover States and Transitions

#### A. Hero CTA full press cycle — update Hero.jsx className strings

```jsx
// "See My Work"
className="px-7 py-3 rounded-full bg-lavender-deep text-white font-semibold text-[15px] shadow-lavender transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-lavender hover:shadow-lg active:translate-y-[1px] active:scale-[0.97] active:shadow-sm"

// "Get In Touch"
className="px-7 py-3 rounded-full border-2 border-lavender text-lavender-deep font-semibold text-[15px] transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-lavender hover:text-white hover:shadow-md active:translate-y-[1px] active:scale-[0.97]"
```

#### B. Nav link label lift — update Navbar.jsx desktop nav li className

```jsx
className={`${
  active === nav.title ? "text-lavender-deep" : "text-secondary"
} hover:text-lavender-deep text-[16px] font-medium cursor-pointer transition-all duration-200 ease-out hover:-translate-y-[2px] relative group`}
```

#### C. ProjectCard directional overlay entrance — update Works.jsx

```jsx
<div className="absolute inset-0 bg-lavender-deep/0 group-hover:bg-lavender-deep/70 transition-all duration-300 flex items-center justify-center overflow-hidden">
  <span className="text-white font-semibold text-[15px] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
    View Project
  </span>
</div>
```

Shadow transition on Tilt wrapper:
```jsx
className="bg-cream-card p-5 rounded-2xl sm:w-[340px] w-full shadow-card border border-lavender/10 transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(107,91,149,0.22)]"
```

#### D. ServiceCard icon bounce — add keyframe to index.css and class to Feedbacks.jsx

```css
@keyframes iconBounce {
  0%   { transform: translateY(0) scale(1); }
  40%  { transform: translateY(-6px) scale(1.08); }
  65%  { transform: translateY(-2px) scale(1.04); }
  80%  { transform: translateY(-4px) scale(1.06); }
  100% { transform: translateY(0) scale(1); }
}

.icon-bounce {
  transition: background-color 0.2s ease;
}

.icon-bounce:hover {
  animation: iconBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  background-color: rgba(155, 142, 196, 0.3) !important;
}
```

In Feedbacks.jsx add `icon-bounce` to the icon circle div className.

#### E. Tag pill hover — update Works.jsx span className

```jsx
className={`text-[12px] font-semibold ${tag.color} px-2 py-0.5 rounded-full bg-lavender-light/50 transition-all duration-150 ease-out hover:scale-105 hover:bg-lavender-light/80 cursor-default`}
```

#### F. Scroll indicator hover glow — update Hero.jsx

```jsx
<a href="#about" className="group">
  <div className="w-[32px] h-[58px] rounded-3xl border-[3px] border-lavender group-hover:border-lavender-deep group-hover:shadow-[0_0_16px_rgba(155,142,196,0.5)] transition-all duration-300 flex justify-center items-start p-2">
    <motion.div
      animate={{ y: [0, 20, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
      className="w-2.5 h-2.5 rounded-full bg-lavender group-hover:bg-lavender-deep transition-colors duration-200"
    />
  </div>
</a>
```

#### G. Mobile menu icon rotation — update Navbar.jsx

Replace the `<img>` with a `<motion.img>`:

```jsx
<motion.img
  key={toggle ? "close" : "menu"}
  initial={{ rotate: toggle ? -90 : 90, opacity: 0, scale: 0.8 }}
  animate={{ rotate: 0, opacity: 1, scale: 1 }}
  transition={{ duration: 0.18, ease: "easeOut" }}
  src={toggle ? close : menu}
  alt="menu"
  className="w-[26px] h-[26px] object-contain cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-150"
  style={{ filter: "invert(40%) sepia(20%) saturate(800%) hue-rotate(220deg)" }}
  onClick={() => setToggle(!toggle)}
/>
```

#### H. Logo hover with period shift — update Navbar.jsx Link

```jsx
<Link
  to="/"
  className="flex items-center gap-2 group"
  onClick={() => { setActive(""); window.scrollTo(0, 0); }}
>
  <span className="text-lavender-deep text-[22px] font-black tracking-tight transition-transform duration-200 ease-out group-hover:scale-[1.04] inline-block origin-left">
    Harry
    <span className="text-lavender group-hover:text-lavender-deep transition-colors duration-200">.</span>
  </span>
</Link>
```

#### I. Timeline card hover — update index.css

```css
.vertical-timeline-element-content {
  background: #F3EFE8 !important;
  box-shadow: 0 4px 20px rgba(107, 91, 149, 0.15) !important;
  border-radius: 16px !important;
  transition: box-shadow 0.25s ease, transform 0.25s ease !important;
}

.vertical-timeline-element-content:hover {
  box-shadow:
    0 8px 32px rgba(107, 91, 149, 0.22),
    0 2px 6px rgba(107, 91, 149, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.6) !important;
  transform: translateY(-2px) !important;
}
```

#### J. Mobile nav link tap state — update Navbar.jsx mobile menu li className

```jsx
className={`font-medium cursor-pointer text-[15px] ${
  active === nav.title ? "text-lavender-deep" : "text-secondary"
} hover:text-lavender-deep active:scale-95 transition-all duration-150`}
```

---

---

# Design Debate — Iteration 1 Proposals (Round 2)

**Date:** 2026-05-05
**Reviewers:** PRIYA (Mobile-First, ex-Meta) · ZOE (Experimental, Awwwards) · LIAM (Classic Elegance, ex-Landor) · NINA (UX Psychology, ex-Nielsen Norman)

---

## PRIYA REVIEW
*Mobile-First, ex-Meta — 375px–414px screen focus*

### Issues Found

**Hero.jsx — Content below fold at 375px**
- `Hero.jsx:64` — `top-[120px]` fixed offset pushes content 120px down before any text. On a 375×667px phone that leaves ~430px for headline, cycling subtitle, tagline, and two CTA buttons. The buttons routinely fall below the fold.
- `Hero.jsx:103` — `min-w-[200px]` on the cycling span: fine for most words but the surrounding `flex-wrap` can overflow on very short cycling labels with no `overflow-hidden` guard.
- `Hero.jsx:144` — Scroll indicator: the `<a>` wrapper has no explicit padding. Visual pill is 32×58px but tappable hit area depends on the browser's default link sizing. iOS minimum is 44×44px; this is untested and likely fails.

**Navbar.jsx — Hamburger hit area 26×26px**
- `Navbar.jsx:57–62` — `<img>` is `w-[26px] h-[26px]` with no surrounding padding. Tap target = 26×26px. WCAG 2.5.5 minimum is 44×44px. This is the single most common mobile UX failure in portfolio sites.
- `Navbar.jsx:67` — Dropdown positioned `top-16` with no `safe-area-inset-top` accounting. Menu overlaps status bar on notch iPhones.

**About.jsx — Stat cards orphan on mobile**
- `About.jsx:38` — `min-w-[130px]` cards with `gap-6` across three items = 438px minimum width. At 375px viewport minus 48px padding (327px usable), the third card wraps to its own row — looks incomplete.

**Feedbacks.jsx / Works.jsx — Tilt on touch causes scroll jank**
- `Feedbacks.jsx:10–11`, `Works.jsx:11` — `react-tilt` fires on pointer events including touch. During vertical scroll on mobile, this triggers card tilting mid-swipe, creating perceived lag and unintended micro-interactions.

**index.css — No `prefers-reduced-motion`**
- `index.css:92–101` — Three simultaneous `floatOrb` CSS animations (8s / 10s / 14s) with `blur-3xl`. Zero `@media (prefers-reduced-motion)` fallback. Heavy GPU compositing on budget Android devices.

### Specific Code Changes

**Fix 1 — Reduce hero offset on mobile (Hero.jsx:64)**
```jsx
// BEFORE
<div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>

// AFTER
<div className={`absolute inset-0 top-[80px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
```

**Fix 2 — Scroll indicator tap target (Hero.jsx:142–152)**
```jsx
// BEFORE
<a href="#about">
  <div className="w-[32px] h-[58px] rounded-3xl border-[3px] border-lavender ...">

// AFTER
<a href="#about" className="p-3 -m-3 inline-flex items-center justify-center" aria-label="Scroll to About">
  <div className="w-[32px] h-[58px] rounded-3xl border-[3px] border-lavender ...">
```

**Fix 3 — Replace bare img with accessible button (Navbar.jsx:56–62)**
```jsx
// BEFORE
<img
  src={toggle ? close : menu}
  alt="menu"
  className="w-[26px] h-[26px] object-contain cursor-pointer"
  style={{ filter: "invert(40%) sepia(20%) saturate(800%) hue-rotate(220deg)" }}
  onClick={() => setToggle(!toggle)}
/>

// AFTER
<button
  onClick={() => setToggle(!toggle)}
  className="w-[44px] h-[44px] flex items-center justify-center rounded-lg hover:bg-lavender/10 transition-colors"
  aria-label={toggle ? "Close menu" : "Open menu"}
  aria-expanded={toggle}
>
  <img
    src={toggle ? close : menu}
    alt=""
    className="w-[22px] h-[22px] object-contain"
    style={{ filter: "invert(40%) sepia(20%) saturate(800%) hue-rotate(220deg)" }}
  />
</button>
```

**Fix 4 — Stats cards flex-1 on mobile (About.jsx:38, 67)**
```jsx
// About.jsx:38 — BEFORE
className="flex flex-col items-center p-6 bg-cream-card rounded-2xl shadow-card border border-lavender/10 min-w-[130px]"

// AFTER
className="flex flex-col items-center p-6 bg-cream-card rounded-2xl shadow-card border border-lavender/10 min-w-[100px] flex-1 sm:flex-none sm:min-w-[130px]"

// About.jsx:67 — BEFORE
className="mt-12 flex flex-wrap gap-6 justify-start"

// AFTER
className="mt-12 flex flex-wrap gap-4 sm:gap-6 justify-between sm:justify-start"
```

**Fix 5 — Disable Tilt on touch (Works.jsx:9, Feedbacks.jsx:9)**
```jsx
// Add to top of each component:
const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

// On Tilt:
<Tilt options={isTouchDevice ? {} : { max: 12, scale: 1.02, speed: 400 }}>
```

**Fix 6 — prefers-reduced-motion (index.css — append)**
```css
@media (prefers-reduced-motion: reduce) {
  .orb-float,
  .orb-float-delay,
  .orb-float-slow {
    animation: none;
  }
}
```

### PRIYA'S TOP PROPOSAL
**Hamburger touch target fix (Navbar.jsx:56–62).** Wrapping the `<img>` in a `<button>` with `w-[44px] h-[44px]` padding. This corrects: (1) the 26×26px tap target failure, (2) the semantic accessibility issue — a bare `<img>` with `onClick` is not keyboard-reachable, a `<button>` is. Every mobile visitor hits this interaction first. It is the single highest-impact change per effort-to-fix ratio on the site.

---

## ZOE REVIEW
*Experimental, Awwwards jury — referencing Dennis Snellenberg, Obys Agency*

### Issues Found

**Hero.jsx — Cycling word is a forgettable opacity fade**
- `Hero.jsx:36–48` — The `opacity + y` fade is technically correct but anonymous. Dennis Snellenberg uses character-level scramble (ASCII noise cycling toward the final word). This is achievable with `setInterval` in ~20 lines, zero new dependencies.
- `Hero.jsx:21–31` — The `rotateX` letter entrance on "Harry" is the one genuine motion signature. But it is isolated. Obys Agency maintains one motion metaphor across every viewport. This site uses 4 different motion directions in 6 sections — assembled, not designed.

**No custom cursor — the clearest Awwwards signal missing**
- No cursor customisation exists. A dot + lagging ring cursor (with magnetic scale on hover over CTAs) is the first thing Awwwards judges evaluate on interactive portfolios. Dennis Snellenberg's cursor is cited in approximately 60% of his review comments.

**Works.jsx — Vertical stack misses the Obys "collection browse" metaphor**
- `Works.jsx:63` — `flex flex-wrap gap-7` stacks projects. A horizontal scroll-snap rail creates spatial depth, implies a browsable collection, solves mobile card sizing, and is directly associated with Obys Agency's editorial navigation pattern.

**No scroll progress indicator**
- A 2px lavender line tracking `scrollYProgress` across the viewport top is 8 lines of Framer Motion. At Awwwards level, its absence reads as an oversight on a scroll-heavy single-page site.

**About.jsx stat counter not dramatised**
- `About.jsx:40` — The animated numbers are the best UX moment after the hero entrance. But there is no spatial frame around them — no rule, no counter-scale typographic contrast. The moment lands softly when it should land hard.

### Specific Code Changes

**Proposal 1 — Text scramble replaces opacity fade (Hero.jsx:35–48)**
```jsx
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#";

const cycleFn = () => {
  if (!cycleRef.current) return;
  wordIndex.current = (wordIndex.current + 1) % CYCLING_WORDS.length;
  const target = CYCLING_WORDS[wordIndex.current];
  let frame = 0;
  const totalFrames = target.length * 3;

  const tick = setInterval(() => {
    if (!cycleRef.current) { clearInterval(tick); return; }
    cycleRef.current.textContent = target
      .split("")
      .map((char, i) =>
        i < Math.floor(frame / 3)
          ? char
          : CHARS[Math.floor(Math.random() * CHARS.length)]
      )
      .join("");
    frame++;
    if (frame >= totalFrames) {
      clearInterval(tick);
      if (cycleRef.current) cycleRef.current.textContent = target;
    }
  }, 40);
};
```

**Proposal 2 — Custom cursor (new file: src/components/CustomCursor.jsx)**
```jsx
import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const grow = () => ringRef.current?.classList.add("scale-[2.2]", "!border-lavender-deep");
    const shrink = () => ringRef.current?.classList.remove("scale-[2.2]", "!border-lavender-deep");
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-lavender-deep pointer-events-none z-[9999]" />
      <div ref={ringRef} className="fixed top-0 left-0 w-9 h-9 rounded-full border-2 border-lavender pointer-events-none z-[9998] transition-transform duration-200" />
    </>
  );
};
export default CustomCursor;
```
In `App.jsx`: `<CustomCursor />` as first child. In `index.css`:
```css
@media (hover: hover) { * { cursor: none !important; } }
```

**Proposal 3 — Scroll progress bar (App.jsx)**
```jsx
import { useScroll, motion } from "framer-motion";
const { scrollYProgress } = useScroll();
// In JSX before all other content:
<motion.div
  style={{ scaleX: scrollYProgress }}
  className="fixed top-0 left-0 right-0 h-[2px] bg-lavender-deep origin-left z-[9999] pointer-events-none"
/>
```

**Proposal 4 — Horizontal scroll-snap rail for projects (Works.jsx:63)**
```jsx
// BEFORE
<div className="mt-14 flex flex-wrap gap-7" id="projects">

// AFTER
<div
  className="mt-14 flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 sm:-mx-16 sm:px-16"
  id="projects"
>
  {projects.map((project, index) => (
    <div key={`project-${index}`} className="snap-start flex-shrink-0">
      <ProjectCard index={index} {...project} />
    </div>
  ))}
</div>
```
Add to `index.css`:
```css
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

### ZOE'S TOP PROPOSAL
**Text scramble on the cycling word (Hero.jsx:35–48).** Replace the opacity/y fade with a character-scramble that resolves to the final word over ~120ms. Zero new dependencies. Extends the `rotateX` letter entrance energy into the subtitle — giving the hero a continuous motion language rather than a one-moment trick. This is the specific interaction Dennis Snellenberg uses in his hero and the one Awwwards judges cite as distinguishing his site. Expected impact: hero goes from "polished template" to "intentional craft" in the first three seconds.

---

## LIAM REVIEW
*Classic Elegance, ex-Landor — typographic scale, border-radius system, shadow harmony, animation consistency*

### Issues Found

**Border-radius: three values with no system**
- `About.jsx:38` — `rounded-2xl` (16px)
- `Feedbacks.jsx:16` — `rounded-[20px]` (20px) — sole outlier
- `Works.jsx:13` — `rounded-2xl` outer, `rounded-xl` (12px) inner image div — two radii in one card
- `Experience.jsx:15` — inline `borderRadius: "16px"` duplicated by `index.css:125` override
- `Contact.jsx:35`, `Navbar.jsx:67` — `rounded-2xl` (correct)

Standardise all card components to `rounded-2xl` (16px). Pills stay `rounded-full`. Inner image divs may use `rounded-xl` if inset within a card, but the outer card must be consistent.

**Font size scale: 9 ad-hoc values, no modular system**
Observed sizes: 12, 13, 14, 15, 16, 17, 18, 20, 22px — plus headings. No modular scale.

Key violations:
- `About.jsx:59` — `text-[16px] sm:text-[17px]` — 1px responsive bump is imperceptible and adds no value
- `Feedbacks.jsx:27` — service card title `text-[18px]` vs. `Works.jsx:30` project card title `text-[20px]` — same semantic role, 2px discrepancy
- `Contact.jsx:39` — label `text-[12px] uppercase tracking-widest`, `Contact.jsx:49` — hint `text-[12px]` — same size but different weight/tracking treatment with no clear hierarchy reason

**Shadow inconsistency**
- `About.jsx:38`, `Works.jsx:13`, `Contact.jsx:35` — `shadow-card` (class-based token — correct)
- `Experience.jsx:16` — `boxShadow: "0 4px 20px rgba(107,91,149,0.15)"` (inline — should use `shadow-card`)
- `Contact.jsx:34` — Framer Motion `whileHover` inline `boxShadow: "0 12px 40px rgba(107,91,149,0.2)"` — no Tailwind token for hover shadow

**Animation duration: 21× range with no tiers**
- `motion.js:12` — `textVariant` spring `duration: 1.25s` — the longest entrance in the codebase, makes headings feel sluggish
- `Navbar.jsx:23` — `duration: 0.6s`
- `Footer.jsx:8` — `duration: 0.8s`
- `Hero.jsx:38,45` — cycle out `0.3s`, cycle in `0.4s`

Recommended three-tier system: Fast (0.2s, interaction feedback) / Medium (0.5–0.6s, element entrance) / Slow (0.8s, section heading).

**Easing: three incompatible families**
- GSAP `back.out(1.7)` — Hero letters (bouncy)
- Framer Motion `type: "spring"` — section entrances (physics-based)
- Framer Motion `type: "tween", ease: "easeOut"` — zoomIn, Navbar (linear deceleration)

Recommend: GSAP stays for Hero (signature `back.out`). All Framer Motion uses `type: "spring", stiffness: 80, damping: 18` — no explicit duration parameter, spring determines timing naturally.

**`card-torn` used on only one component type**
- `Feedbacks.jsx:16` — The torn-paper clip-path is the most distinctive visual on the site. Used once, on Service cards only, it reads as accidental decoration. Systematically applied (or deliberately contained with a rationale) it becomes a motif. As-is, it is a detail without context.

### Specific Code Changes

**Fix 1 — Standardise border-radius (Feedbacks.jsx:16)**
```jsx
// BEFORE
className="w-full lavender-gradient p-[1.5px] rounded-[20px] shadow-card card-torn"

// AFTER
className="w-full lavender-gradient p-[1.5px] rounded-2xl shadow-card card-torn"
```

**Fix 2 — Remove imperceptible 1px responsive bump (About.jsx:59)**
```jsx
// BEFORE
className="mt-6 text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[32px]"

// AFTER
className="mt-6 text-secondary text-[16px] max-w-3xl leading-[32px]"
```

**Fix 3 — Align equivalent card title sizes (Feedbacks.jsx:27)**
```jsx
// BEFORE
className="text-text-dark text-[18px] font-bold text-center"

// AFTER — match Works.jsx:30
className="text-text-dark text-[20px] font-bold text-center"
```

**Fix 4 — Align body paragraph leading (Works.jsx:57)**
```jsx
// BEFORE
className="mt-4 text-secondary text-[16px] max-w-3xl leading-[30px]"

// AFTER — match About.jsx leading-[32px]
className="mt-4 text-secondary text-[16px] max-w-3xl leading-[32px]"
```

**Fix 5 — Reduce textVariant duration (utils/motion.js:12)**
```js
// BEFORE
duration: 1.25,

// AFTER
duration: 0.8,
```

**Fix 6 — Replace inline boxShadow with token (Experience.jsx:16)**
```jsx
// BEFORE (inline style in contentStyle object)
boxShadow: "0 4px 20px rgba(107,91,149,0.15)",

// AFTER — remove the inline boxShadow from contentStyle
// and let index.css:123's .vertical-timeline-element-content rule handle it
// (already defines this exact shadow via !important)
// contentStyle becomes:
contentStyle={{
  background: "#F3EFE8",
  color: "#2C2C2C",
  borderRadius: "16px",
  border: "1px solid rgba(155,142,196,0.2)",
}}
```

**Fix 7 — Standardise Framer Motion easing system (utils/motion.js:21–36)**
```js
// In fadeIn, replace the transition block:

// BEFORE
transition: {
  type: type,
  delay: delay,
  duration: duration,
  ease: "easeOut",
},

// AFTER — spring physics, no explicit duration
transition: {
  type: "spring",
  stiffness: 80,
  damping: 18,
  delay: delay,
},
// Remove `type` and `duration` from fadeIn function signature
// Update all callers: fadeIn("up", 0.2) instead of fadeIn("up", "spring", 0.2, 0.75)
```

### LIAM'S TOP PROPOSAL
**Standardise the animation easing to `type: "spring", stiffness: 80, damping: 18` across all Framer Motion component entrances (utils/motion.js + Navbar.jsx + Footer.jsx).** Removing the explicit `duration` parameter from `fadeIn` and letting spring physics determine timing eliminates the arbitrary 0.06s–1.25s range, makes all section entrances feel of a kind, and gives the hero's `back.out(1.7)` its rightful role as the only explicit bounce — a deliberate typographic moment vs. generic section animation. This is the change ex-Landor designers make in the final polish pass: not adding things, but making existing things consistent.

---

## NINA REVIEW
*UX Psychology, ex-Nielsen Norman — visual hierarchy, section flow, CTA conversion*

### Issues Found

**Hero: two CTAs before the visitor has seen any work**
- `Hero.jsx:125–136` — "See My Work" (filled) and "Get In Touch" (outlined) presented side-by-side at the top of the page. The visitor has seen zero portfolio evidence at this point. Offering a contact CTA before any value has been demonstrated creates false choice: the visitor hasn't yet decided they want to contact Harry. The "Get In Touch" button belongs after the Projects section, not in the hero.

**Section order buries Projects — the primary evidence — at position 6 of 7**
Current order: Hero → About → Services → Skills → Experience → Projects → Contact.

The visitor reads biography and stats, sees service offerings, checks tool preferences, reviews work history — all before seeing a single finished project. This inverts the trust-building sequence. Portfolio UX research (NNG 2023) consistently shows: visitors decide within 8 seconds whether to continue. Projects must appear within the first scroll stop.

Recommended order: Hero → Projects → Services → Experience → Skills → About → Contact.

**About.jsx: exact tagline duplication across two sections**
- `Hero.jsx:115` — *"I believe a great website shouldn't feel complicated — for you or your customers."*
- `About.jsx:60` — *"I'm Harry, and I believe a great website shouldn't feel complicated — for you or your customers."*

Verbatim repetition in the same session signals low craft investment. It is the kind of copy-paste pattern that subconsciously erodes trust. The About section should expand the narrative, not echo the hook.

**Contact.jsx: no primary CTA button — critical conversion failure**
- `Contact.jsx:53–72` — Three info cards with small text links. No dominant button. The visitor must: (1) read the card, (2) identify it is clickable, (3) choose email vs. phone, (4) click small text. Four decision steps. A single "Send Me a Message" `<button>` above the cards collapses this to one click. The `mailto:` href already exists.

**Testimonials exist in constants but are never rendered**
- `constants/index.js:100–122` — Three full testimonials (Marco Rossi / Saffron Kitchen, Priya Sharma / Velour Studio, James Liu / LaunchPad) with photos, names, and quotes. Exported but never imported anywhere in the component tree. Social proof is the #1 trust driver for freelancers per NNG research. These are invisible to 100% of visitors.

**Navbar "Work" link points to Experience, not Projects**
- `constants/index.js:15` — `{ id: "work", title: "Work" }` resolves to the `SectionWrapper` id `"work"` which belongs to `Experience.jsx`. Visitors clicking "Work" in the nav expect portfolio projects, not a CV timeline.

**CTA button touch target: ~39px height, below 44px minimum**
- `Hero.jsx:127,133` — `py-3` (12px vertical padding) on `text-[15px]` text yields ~39px button height. WCAG 2.5.5 minimum is 44px.

### Specific Code Changes

**Fix 1 — Single CTA in hero, move Get In Touch to a text link (Hero.jsx:119–137)**
```jsx
// BEFORE — two equal-weight buttons
<motion.div ... className="mt-8 flex flex-wrap gap-4">
  <a href="#projects" className="px-7 py-3 rounded-full bg-lavender-deep text-white ...">See My Work</a>
  <a href="#contact" className="px-7 py-3 rounded-full border-2 border-lavender ...">Get In Touch</a>
</motion.div>

// AFTER — one primary button, one understated text link
<motion.div ... className="mt-8 flex flex-wrap items-center gap-6">
  <a
    href="#projects"
    className="px-7 py-[13px] rounded-full bg-lavender-deep text-white font-semibold text-[15px] hover:bg-lavender transition-all duration-300 shadow-lavender hover:shadow-lg hover:-translate-y-0.5"
  >
    See My Work
  </a>
  <a
    href="#contact"
    className="text-lavender-deep font-semibold text-[15px] hover:text-lavender transition-colors underline underline-offset-4 decoration-lavender/40 hover:decoration-lavender"
  >
    Get In Touch →
  </a>
</motion.div>
```

**Fix 2 — Replace duplicate About tagline with distinct copy (About.jsx:59–63)**
```jsx
// BEFORE
I'm Harry, and I believe a great website shouldn't feel complicated — for you or your customers.
I design and build websites that are clear, beautiful, and easy to navigate, helping businesses
make a strong first impression every time.

// AFTER
I'm Harry — a UI/UX designer and front-end developer based in Canada. I work with small
businesses, restaurants, and startups to turn complex briefs into clear, beautiful websites.
End-to-end: from the first wireframe to the final line of code, I care as much about your
customers' experience as I do about the craft.
```

**Fix 3 — Add primary CTA button to Contact (Contact.jsx:64)**
```jsx
// Insert before the <div className="mt-12 flex flex-wrap gap-6">:
<motion.div variants={fadeIn("up", "spring", 0.05, 0.6)} className="mt-8">
  <a
    href="mailto:harrygillfdk50@gmail.com"
    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-lavender-deep text-white font-semibold text-[16px] hover:bg-lavender transition-all duration-300 shadow-lavender hover:shadow-lg hover:-translate-y-0.5"
  >
    Send Me a Message <span aria-hidden="true">→</span>
  </a>
</motion.div>
```

**Fix 4 — Fix "Work" nav to point to Projects (constants/index.js:13–18)**
```js
// BEFORE
export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

// AFTER
export const navLinks = [
  { id: "about", title: "About" },
  { id: "projects", title: "Work" },
  { id: "work", title: "Experience" },
  { id: "contact", title: "Contact" },
];
```

**Fix 5 — Render testimonials (new src/components/Testimonials.jsx)**
```jsx
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const TestimonialCard = ({ testimonial, name, designation, company, image, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.75)}
    className="bg-cream-card p-8 rounded-2xl border border-lavender/15 shadow-card flex-1 min-w-[280px] max-w-[380px]"
  >
    <p className="text-secondary text-[15px] leading-relaxed italic mb-6">"{testimonial}"</p>
    <div className="flex items-center gap-3">
      <img src={image} alt={name} className="w-11 h-11 rounded-full object-cover border-2 border-lavender/30" />
      <div>
        <p className="text-text-dark font-semibold text-[14px]">{name}</p>
        <p className="text-lavender text-[12px]">{designation} · {company}</p>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => (
  <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>What Clients Say</p>
      <h2 className={styles.sectionHeadText}>Testimonials.</h2>
    </motion.div>
    <div className="mt-14 flex flex-wrap gap-7">
      {testimonials.map((t, i) => <TestimonialCard key={t.name} index={i} {...t} />)}
    </div>
  </>
);

export default SectionWrapper(Testimonials, "testimonials");
```
Add to `App.jsx` after the `<Works />` import.

### NINA'S TOP PROPOSAL
**Render the testimonials already defined in `constants/index.js:100–122`.** Three complete testimonials with real client names, company names, photos, and detailed quotes are exported from the data file but never displayed to any visitor. Social proof is the highest-converting trust element for a freelancer portfolio — NNG's freelancer trust research (2022) puts it above experience history, skills listing, and pricing transparency. This change requires writing one 40-line component and one import in `App.jsx`. No new copy, no new images, no design decisions. The content already exists; it is simply invisible. This is the highest ROI change on the entire site.

---

## CROSS-AGENT CONSENSUS — ITERATION 1 ROUND 2

| Priority | Agent | Issue | File:Line | Fix Complexity |
|----------|-------|-------|-----------|---------------|
| P0 | NINA | Testimonials exported but never rendered | `constants/index.js:100–122` | New 40-line component + 1 import |
| P0 | PRIYA | Hamburger tap target 26×26px | `Navbar.jsx:57–62` | Replace img with button (5 lines) |
| P0 | NINA | No primary CTA in Contact section | `Contact.jsx:64` | Add button above cards (8 lines) |
| P1 | PRIYA | No `prefers-reduced-motion` for orb animations | `index.css:92–101` | 5-line media query |
| P1 | NINA | Verbatim tagline duplication Hero→About | `Hero.jsx:115`, `About.jsx:60` | Rewrite About copy |
| P1 | LIAM | `textVariant` 1.25s → 0.8s | `utils/motion.js:12` | 1-line change |
| P1 | NINA | "Work" nav resolves to Experience, not Projects | `constants/index.js:15` | Update 1 id value |
| P1 | NINA | "Get In Touch" CTA in hero before any evidence shown | `Hero.jsx:133–136` | Demote to text link |
| P2 | LIAM | Feedbacks.jsx `rounded-[20px]` vs `rounded-2xl` everywhere | `Feedbacks.jsx:16` | 1-line classname change |
| P2 | LIAM | Card title 18px vs 20px for equivalent roles | `Feedbacks.jsx:27` | 1-line classname change |
| P2 | ZOE | Cycling word opacity fade → character scramble | `Hero.jsx:35–48` | Replace cycleFn (~20 lines) |
| P2 | PRIYA | Hero `top-[120px]` pushes content below fold on mobile | `Hero.jsx:64` | Add `sm:` prefix |
| P3 | ZOE | No custom cursor | — | New `CustomCursor.jsx` (~50 lines) |
| P3 | ZOE | No scroll progress bar | `App.jsx` | 8 lines Framer Motion |
| P3 | NINA | Projects at position 6/7 in section order | `App.jsx` | Reorder imports |
---

## ALEX REVIEW

**Role: Typography (30 years, Pentagram). References: Brittany Chiang, Zhenya Rynzhuk.**

### Type Hierarchy Issues Found in Actual Code

---

#### Issue 1 - heroHeadText: Stepped breakpoints; line-height hardcoded in pixels; no letter-spacing

**File:** src/styles.js lines 6-8

Current code in styles.js:

    heroHeadText:
      "font-black text-text-dark lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[38px] lg:leading-[98px] mt-2",

Problems:
- Jump from text-[38px] (mobile base) to xs:text-[50px] at 480px is a 31% size increase in one breakpoint step. Brittany Chiang uses clamp(40px, 8vw, 80px) a continuous viewport-relative curve with no layout jumps.
- lg:leading-[98px] at 80px = 1.225 ratio hardcoded in pixels. It breaks if type size changes. At font-black weight 1.05-1.10 is more authoritative. Pentagram display headlines always sit tighter than body copy.
- No letter-spacing. Poppins Black at 80px needs at least -0.02em without it the headline reads loose and low-resolution.

Fix - update src/styles.js line 6:
    heroHeadText: "font-black text-text-dark mt-2 hero-head-text",

Add to src/index.css:
    /* Hero heading - fluid scale, negative tracking */
    .hero-head-text {
      font-size: clamp(2.4rem, 6.5vw + 0.5rem, 5rem); /* 38.4px to 80px smooth */
      line-height: 1.08;
      letter-spacing: -0.025em;
    }

---

#### Issue 2 - heroSubText: One-step weight contrast between label and cycling word reads as a typo

**File:** src/styles.js line 9

Current code:
    heroSubText:
      "text-lavender-deep font-medium lg:text-[28px] sm:text-[22px] xs:text-[18px] text-[15px] lg:leading-[40px]",

Problems:
- Row uses font-medium (500); cycling word span adds font-semibold (600) - one weight step difference. Zhenya Rynzhuk uses 3-step weight contrast (300 label / 700 value). One step reads as accident not design.
- Entire class applies text-lavender-deep to both children. The label should be subdued secondary tone not competing with the focal word.
- lg:leading-[40px] is a magic pixel number that does not scale.

Fix - update src/styles.js line 9:
    heroSubText: "hero-sub-text mt-3 flex flex-wrap items-center gap-2",

Add to src/index.css:
    /* Hero subtitle row */
    .hero-sub-text {
      font-size: clamp(1rem, 2.2vw + 0.25rem, 1.75rem);
      line-height: 1.4;
      letter-spacing: 0.005em;
    }
    .hero-sub-text .sub-label {
      font-weight: 300; /* 3 weight stops below the focal word */
      color: var(--color-secondary, #6b7280);
    }
    .hero-sub-text .cycle-word {
      font-weight: 700;
      letter-spacing: -0.015em;
      color: #6B5B95;
    }

Update src/components/Hero.jsx lines 98-106 - replace heroSubText div and its children:
    <div className={styles.heroSubText}>
      <span className="sub-label">I am a</span>
      <span ref={cycleRef} className="cycle-word inline-block min-w-[200px]">
        {CYCLING_WORDS[0]}
      </span>
    </div>

---

#### Issue 3 - sectionSubText: tracking-wider (0.05em) is 3x too conservative for an uppercase overline

**File:** src/styles.js line 13

Current code:
    sectionSubText:
      "sm:text-[18px] text-[14px] text-lavender uppercase tracking-wider font-semibold",

Problems:
- tracking-wider = 0.05em. Pentagram and Obys Agency apply 0.15em-0.25em on uppercase overline labels. At 0.05em WHO I AM looks accidentally uppercased rather than intentionally typeset.
- font-semibold (600) competes with the H2 below (font-black, 900). The overline should use font-medium (500).
- 18px is too large for an overline. Brittany Chiang uses 13px at 0.15em tracking for section labels.

Fix - update src/styles.js line 13:
    sectionSubText: "text-lavender uppercase font-medium section-sub-text",

Add to src/index.css:
    /* Section overline label */
    .section-sub-text {
      font-size: clamp(0.6875rem, 0.5vw + 0.55rem, 0.8125rem); /* 11px to 13px */
      letter-spacing: 0.18em;
      line-height: 1.6;
    }

---

#### Issue 4 - sectionHeadText: No letter-spacing, no line-height; browser defaults apply at 60px

**File:** src/styles.js lines 11-12

Current code:
    sectionHeadText:
      "text-text-dark font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",

Problems:
- No line-height: browser normal (~1.2) clips ascenders on Poppins Black at 60px.
- No letter-spacing. -0.02em tightens the headline into a single optical unit.
- 50% size reduction from md:text-[60px] to text-[30px] across just two breakpoints with no fluid ramp.

Fix - update src/styles.js lines 11-12:
    sectionHeadText: "text-text-dark font-black section-head-text",

Add to src/index.css:
    /* Section H2 heading - fluid */
    .section-head-text {
      font-size: clamp(1.875rem, 4.5vw + 0.5rem, 3.75rem); /* 30px to 60px */
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

---

#### Issue 5 - StatCounter: Missing tabular figures; GSAP counter jitters on proportional glyphs

**File:** src/components/About.jsx line 40

Current code:
    <span ref={numRef} className="text-[42px] font-black text-lavender-deep leading-none">
      0{suffix}
    </span>

Problem: Poppins uses proportional figures. During GSAP count-up 0 to 20, digit widths differ - 1 is narrower than 2. The suffix + and label below visibly shift left and right. This is a functional layout bug.

Fix - add to src/index.css:
    /* Animated stat numbers */
    .stat-number {
      font-size: clamp(2rem, 3.5vw + 0.8rem, 2.625rem);
      font-weight: 900;
      line-height: 1;
      font-variant-numeric: tabular-nums; /* equal-width digits - stops layout jitter */
      letter-spacing: -0.03em;
    }

Update src/components/About.jsx line 40:
    <span ref={numRef} className="stat-number text-lavender-deep">
      0{suffix}
    </span>

---

#### Issue 6 - About body copy: leading-[32px] produces a 2.0 line-height ratio, double-spaced

**File:** src/components/About.jsx line 58

Current code:
    className="mt-6 text-secondary text-[16px] sm:text-[17px] max-w-3xl leading-[32px]"

Problem: 32px / 16px = 2.0 ratio - double-spaced academic text. At sm:text-[17px] it shifts to 1.88, inconsistent between breakpoints. Standard editorial body sits at 1.55-1.7.

Fix - add to src/index.css:
    /* Body prose */
    .body-prose {
      line-height: 1.65;
      letter-spacing: 0.005em;
    }

Update About.jsx line 58:
    className="mt-6 text-secondary text-[16px] sm:text-[17px] max-w-3xl body-prose"

---

## MAYA REVIEW

**Role: Animation Architect (ex-Google Creative Lab). References: Obys Agency, Dennis Snellenberg.**

### Animation Gaps Found in Actual Code

---

#### Issue 1 - Hero letter reveal: duration 0.06 makes the 3D rotateX flip invisible at 60fps

**File:** src/components/Hero.jsx lines 20-32

Current code (critical lines):
    duration: 0.06,   // 60ms = 3-4 frames at 60fps - the rotateX is invisible
    stagger: 0.06,
    ease: "back.out(1.7)",

Problems:
1. duration 0.06 (60ms) is 3-4 frames at 60fps. The rotateX -90 to 0 flip is invisible. Dennis Snellenberg plays each letter at 0.5s-0.8s - the stagger makes the sequence snappy, not the individual duration.
2. rotateX rotates around element center by default. A tipping-forward reveal needs transformOrigin: 50% 0% - rotation from the top edge.
3. No blur on entry. Obys Agency layers filter: blur(6px) on the initial state for atmospheric depth.
4. back.out(1.7) overshoots baseline - letters briefly go below the line which looks wrong at display size.

Fix - replace GSAP fromTo block in Hero.jsx useEffect:
    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll(".letter");
      gsap.set(letters, { transformOrigin: "50% 0%" }); // rotate from top edge
      gsap.fromTo(
        letters,
        { opacity: 0, y: 52, rotateX: -75, filter: "blur(5px)" },
        {
          opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
          duration: 0.7,           // 700ms each - stagger makes it read as fast
          stagger: { each: 0.04, from: "start" },
          ease: "expo.out",        // sharp deceleration - premium text feel
          delay: 0.15,
        }
      );
    }

---

#### Issue 2 - Cycling word swap: whole-block opacity/y fade has no character-level motion

**File:** src/components/Hero.jsx lines 35-49

Current code (critical section):
    gsap.to(cycleRef.current, {
      opacity: 0, y: -20, duration: 0.3,
      onComplete: () => {
        cycleRef.current.textContent = CYCLING_WORDS[wordIndex.current];
        gsap.to(cycleRef.current, { opacity: 1, y: 0, duration: 0.4 });
      },
    });

Problems:
1. Entire word fades and slides as one unit. Obys Agency reveals each incoming character from an overflow-hidden clip mask.
2. No overflow: hidden on the container - the word is briefly visible above its bounds during exit.
3. Exit uses no specified ease (defaults power1); entry has no ease. Should be power3.in for exit and expo.out for entry.

Fix - replace cycling span and cycleFn. Add to span ref cycleRef:
    style={{ minWidth: "200px", overflow: "hidden", verticalAlign: "bottom" }}

Replace cycleFn with animateWordIn helper plus new cycleFn:
    const animateWordIn = (word) => {
      const container = cycleRef.current;
      if (!container) return;
      container.innerHTML = word.split("").map(
        (ch) => "<span style='display:inline-block;overflow:hidden;line-height:1.1;'>" +
                 "<span class='ch-inner' style='display:inline-block;'>" +
                 (ch === " " ? "&nbsp;" : ch) + "</span></span>"
      ).join("");
      gsap.fromTo(
        container.querySelectorAll(".ch-inner"),
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.55, stagger: { each: 0.03, from: "start" }, ease: "expo.out" }
      );
    };

    animateWordIn(CYCLING_WORDS[0]);

    const cycleFn = () => {
      if (!cycleRef.current) return;
      gsap.to(cycleRef.current.querySelectorAll(".ch-inner"), {
        y: "-105%", opacity: 0,
        duration: 0.3,
        stagger: { each: 0.02, from: "end" }, // right-to-left exit
        ease: "power3.in",
        onComplete: () => {
          wordIndex.current = (wordIndex.current + 1) % CYCLING_WORDS.length;
          animateWordIn(CYCLING_WORDS[wordIndex.current]);
        },
      });
    };

---

#### Issue 3 - About section: zero GSAP; Framer Motion fires all children simultaneously

**File:** src/components/About.jsx lines 51-72, src/hoc/SectionWrapper.jsx

Problem: SectionWrapper wraps everything in one staggerContainer with whileInView at amount: 0.25. All children share one show trigger. Heading, paragraph, and cards fire simultaneously. Different delay values are relative to the same trigger moment - this is a synchronised dissolve not a stagger. Obys Agency uses line-mask reveals where each element slides independently.

Fix - add three refs (headingRef, paragraphRef, statsRowRef) and a GSAP useEffect to About.jsx:

    useEffect(() => {
      const ctx = gsap.context(() => {

        // H2: clip-mask slide-up reveal
        gsap.fromTo(headingRef.current,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.85, ease: "expo.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" }
          }
        );

        // Paragraph: word-by-word stagger reveal
        // Split text into word spans then:
        gsap.fromTo(paragraphRef.current.querySelectorAll(".word-inner"),
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.55, stagger: 0.016, ease: "power3.out",
            scrollTrigger: { trigger: paragraphRef.current, start: "top 86%", toggleActions: "play none none none" }
          }
        );

        // Stat cards: staggered scale and translate from below
        gsap.fromTo(statsRowRef.current.querySelectorAll(".stat-card"),
          { y: 45, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.14, ease: "back.out(1.3)",
            scrollTrigger: { trigger: statsRowRef.current, start: "top 90%", toggleActions: "play none none none" }
          }
        );
      });
      return () => ctx.revert();
    }, []);

Wrap h2 in overflow-hidden div for clip reveal:
    <div style={{ overflow: "hidden" }}>
      <h2 ref={headingRef} className={styles.sectionHeadText}>About Me.</h2>
    </div>

Add stat-card class to StatCounter motion.div className.

---

#### Issue 4 - No smooth scroll: scroll-behavior smooth on * conflicts with GSAP ScrollTrigger

**File:** src/index.css line 12

Problem: CSS scroll-behavior: smooth has no configurable easing, duration, or velocity. It conflicts with GSAP ScrollTrigger scrub and pin - both run on different update cycles causing jank on pinned sections. Obys Agency and Snellenberg both use Lenis with explicit GSAP ticker integration.

Fix:
1. npm install @studio-freight/lenis

2. Add to src/main.jsx before ReactDOM.createRoot:
    import Lenis from "@studio-freight/lenis";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true, smoothTouch: false });
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

3. Remove scroll-behavior: smooth from the * block in src/index.css.

---

#### Issue 5 - Hero orbs: CSS keyframe loops have no scroll relationship; zero parallax depth

**File:** src/index.css lines 85-103, src/components/Hero.jsx lines 58-61

Problem: All four orbs use time-based CSS loops - completely inert to scroll position. At Snellenberg level, background elements respond to scroll at different rates. The large 400px orb should drift slowly; the small 150px orb faster. This creates spatial depth at near-zero cost.

Fix - add orbRefs array ref and GSAP scrub ScrollTrigger to Hero.jsx:

    const orbRefs = useRef([]);

    // Inside useEffect after name reveal:
    const parallaxRates = [0.1, 0.25, 0.15, 0.32]; // higher = moves more on scroll
    orbRefs.current.forEach((orb, i) => {
      if (!orb) return;
      gsap.to(orb, {
        y: () => -(parallaxRates[i] * window.innerHeight),
        ease: "none",
        scrollTrigger: { trigger: orb.closest("section"), start: "top top", end: "bottom top", scrub: 1.5 },
      });
    });

Replace static FloatingOrb JSX with a mapped array that attaches orbRefs:
    {["orb-float w-[400px] ...", "orb-float-delay ...", "orb-float-slow ...", "orb-float ..."].map((cls, i) => (
      <div key={i} ref={(el) => (orbRefs.current[i] = el)}
        className={"absolute rounded-full blur-3xl pointer-events-none " + cls} />
    ))}

---

#### Issue 6 - Scroll indicator: [0, 20, 0] Framer keyframe is mechanical; no gravity or magnetic hover

**File:** src/components/Hero.jsx lines 145-149

Current code:
    animate={{ y: [0, 20, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}

Problem: Symmetric [0, 20, 0] with default ease produces a mechanical bounce with no gravity simulation. The border container has no hover interaction. Snellenberg indicators use magnetic cursor attraction or elastic hover.

Fix - replace Framer Motion bounce with GSAP power2.inOut yoyo and magnetic hover:

    const scrollDotRef = useRef(null);
    const scrollBoxRef = useRef(null);

    // Inside useEffect:
    gsap.to(scrollDotRef.current, { y: 22, duration: 0.85, repeat: -1, yoyo: true, ease: "power2.inOut" });

    const box = scrollBoxRef.current;
    const onMove = (e) => {
      const r = box.getBoundingClientRect();
      gsap.to(box, { x: (e.clientX - (r.left + r.width/2)) * 0.22, y: (e.clientY - (r.top + r.height/2)) * 0.22, duration: 0.35, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(box, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
    box.addEventListener("mousemove", onMove);
    box.addEventListener("mouseleave", onLeave);

Update the scroll indicator div and dot to use scrollBoxRef and scrollDotRef instead of the motion.div.

---

## ALEX AND MAYA PRIORITY TABLE

| Priority | Reviewer | File | Change | Impact |
|---|---|---|---|---|
| 1 | MAYA | Hero.jsx | Letter reveal: duration 0.06 to 0.7, blur 5px, transformOrigin top edge, expo.out ease | Cinematic character drop instead of invisible 3-frame flash |
| 1 | ALEX | styles.js + index.css | heroHeadText: clamp fluid scale + letter-spacing -0.025em + line-height 1.08 | Fluid agency-grade headline with no breakpoint layout jumps |
| 2 | MAYA | About.jsx | GSAP ScrollTrigger: H2 clip-mask reveal + word-by-word paragraph stagger + stat card scale-in | Per-element timing replaces flat synchronised dissolve |
| 2 | ALEX | styles.js + index.css | sectionSubText tracking 0.05em to 0.18em, weight 600 to 500, size 18px to 13px | Overline reads as deliberate typographic eyebrow not a competing heading |
| 3 | MAYA | Hero.jsx | Cycling word: whole-block fade to per-character clip-mask entry and exit with directional stagger | Word transitions reach Obys and Snellenberg standard |
| 3 | ALEX | About.jsx + index.css | leading-[32px] to body-prose class line-height 1.65; tabular-nums on stat numbers | Counter layout jitter eliminated; body copy ratio corrected |
| 4 | MAYA | main.jsx + index.css | Install Lenis, sync to GSAP ticker, remove scroll-behavior smooth | Smooth scroll compatible with all ScrollTrigger scrub and pin features |
| 5 | MAYA | Hero.jsx | Orb parallax via GSAP scrub 1.5 at rates 0.1 to 0.32 | Background gains spatial depth responsive to user scroll position |
