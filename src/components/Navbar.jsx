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
          ? "navbar-glass border-b border-lavender/10"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => { setActive(""); window.scrollTo(0, 0); }}
        >
          <span className="text-lavender-deep text-[22px] font-black tracking-tight group-hover:text-lavender transition-colors duration-200">
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
          <button
            onClick={() => setToggle(!toggle)}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-xl hover:bg-lavender/10 transition-colors duration-200 -mr-2"
            aria-label={toggle ? "Close menu" : "Open menu"}
          >
            <img
              src={toggle ? close : menu}
              alt=""
              className="w-[22px] h-[22px] object-contain"
              style={{ filter: "invert(40%) sepia(20%) saturate(800%) hue-rotate(220deg)" }}
            />
          </button>
          <motion.div
            initial={false}
            animate={toggle ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -10, pointerEvents: "none" }}
            className="p-6 bg-primary/95 backdrop-blur-md border border-lavender/20 shadow-lavender absolute top-16 right-4 min-w-[160px] z-10 rounded-2xl"
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
