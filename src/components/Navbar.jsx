import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { useBooking } from "../context/BookingContext";

const MenuIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
    <rect x="0" y="0"  width="22" height="2" rx="1" fill="currentColor" />
    <rect x="0" y="7"  width="16" height="2" rx="1" fill="currentColor" />
    <rect x="0" y="14" width="22" height="2" rx="1" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Tab = ({ children, navId, setPosition, setActive }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      onClick={() => setActive(children)}
      className="relative z-10 block cursor-pointer px-4 py-2 text-[13px] font-medium uppercase tracking-wide text-white mix-blend-difference"
    >
      <a href={`#${navId}`}>{children}</a>
    </li>
  );
};

const SlidingCursor = ({ position }) => (
  <motion.li
    animate={position}
    className="absolute z-0 top-1 h-[calc(100%-8px)] rounded-full bg-lavender-deep pointer-events-none"
  />
);

const Navbar = () => {
  const [active, setActive]     = useState("");
  const [toggle, setToggle]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const { open: openBooking }   = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = navLinks
      .map(n => document.getElementById(n.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (!visible.length) return;
        const top = visible.reduce((a, b) =>
          a.intersectionRatio > b.intersectionRatio ? a : b
        );
        const match = navLinks.find(n => n.id === top.target.id);
        if (match) setActive(match.title);
      },
      { threshold: 0.4, rootMargin: "-80px 0px -20% 0px" }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-300 ${
        scrolled ? "navbar-glass border-b border-lavender/10" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-center items-center max-w-7xl mx-auto gap-4">

        {/* Desktop — sliding pill nav */}
        <ul
          className="relative hidden sm:flex w-fit rounded-full border-2 border-lavender-deep bg-primary/80 backdrop-blur-sm p-1 items-center list-none"
          onMouseLeave={() => setPosition(pv => ({ ...pv, opacity: 0 }))}
        >
          {navLinks.map((nav) => (
            <Tab
              key={nav.id}
              navId={nav.id}
              setPosition={setPosition}
              setActive={setActive}
            >
              {nav.title}
            </Tab>
          ))}
          <SlidingCursor position={position} />
        </ul>

        {/* Book a Call — desktop */}
        <button
          onClick={openBooking}
          className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-lavender-deep text-white text-[13px] font-semibold tracking-wide shadow-[0_4px_16px_rgba(128,14,19,0.28)] hover:bg-lavender-mid hover:shadow-[0_6px_22px_rgba(128,14,19,0.38)] hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 transition-all duration-200"
        >
          Book a Call →
        </button>

        {/* Mobile — hamburger on LEFT */}
        <div className="sm:hidden flex w-full justify-start items-center">
          <button
            onClick={() => setToggle(!toggle)}
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-xl text-lavender-deep hover:bg-lavender/10 transition-colors duration-200"
          >
            {toggle ? <CloseIcon /> : <MenuIcon />}
          </button>

          <AnimatePresence>
            {toggle && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0, y: -6,  scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-[68px] left-4 min-w-[190px] z-10 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(37,9,2,0.97)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(128,14,19,0.12)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.16)",
                }}
              >
                <ul className="list-none flex flex-col px-4 pt-4 pb-3 gap-1">
                  {navLinks.map((nav, i) => (
                    <motion.li
                      key={nav.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0  }}
                      exit={{    opacity: 0, x: -6  }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <a
                        href={`#${nav.id}`}
                        onClick={() => { setToggle(false); setActive(nav.title); }}
                        aria-current={active === nav.title ? "page" : undefined}
                        className={`flex items-center justify-start min-h-[44px] px-3 rounded-xl text-[15px] font-medium transition-all duration-150 ${
                          active === nav.title
                            ? "text-lavender-deep bg-[rgba(128,14,19,0.08)]"
                            : "text-secondary hover:text-lavender-deep hover:bg-[rgba(128,14,19,0.05)]"
                        }`}
                      >
                        {nav.title}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => { setToggle(false); openBooking(); }}
                    className="w-full py-3 rounded-xl bg-lavender-deep text-white text-[14px] font-semibold hover:bg-lavender-mid transition-colors duration-200 shadow-[0_4px_14px_rgba(128,14,19,0.25)]"
                  >
                    Book a Call →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;
