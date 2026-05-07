import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useBooking } from "../context/BookingContext";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const FIELDS = [
  { id: "from_name",  label: "Your Name",           type: "text",  required: true,  placeholder: "Jane Smith" },
  { id: "from_email", label: "Email Address",        type: "email", required: true,  placeholder: "jane@company.com" },
  { id: "phone",      label: "Phone Number",         type: "tel",   required: false, placeholder: "+1 (555) 000-0000" },
  { id: "company",    label: "Business / Company",   type: "text",  required: true,  placeholder: "Smith & Co." },
];

const validate = (data) => {
  const errs = {};
  if (!data.from_name?.trim())  errs.from_name  = "Name is required";
  if (!data.from_email?.trim()) errs.from_email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.from_email)) errs.from_email = "Enter a valid email";
  if (!data.company?.trim())    errs.company    = "Company name is required";
  if (!data.message?.trim())    errs.message    = "Please describe what you need";
  return errs;
};

const InputField = ({ id, label, type, required, placeholder, error, disabled }) => (
  <div>
    <label htmlFor={id} className="block text-[13px] font-semibold mb-1.5" style={{ color: "#283618" }}>
      {label}{" "}
      {!required && <span style={{ color: "#7a7060", fontWeight: 400 }}>(optional)</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-4 py-3 rounded-xl text-[15px] outline-none transition-all disabled:opacity-50"
      style={{
        background: "#f5efc8",
        border: `1.5px solid ${error ? "#ef4444" : "rgba(221,161,94,0.45)"}`,
        color: "#283618",
      }}
      onFocus={e => { e.target.style.borderColor = "#606c38"; e.target.style.boxShadow = "0 0 0 3px rgba(96,108,56,0.15)"; }}
      onBlur={e  => { e.target.style.borderColor = error ? "#ef4444" : "rgba(221,161,94,0.45)"; e.target.style.boxShadow = "none"; }}
    />
    {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}
  </div>
);

const BookingModal = () => {
  const { isOpen, close } = useBooking();
  const formRef  = useRef(null);
  const firstRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) { setStatus("idle"); setErrors({}); return; }
    const timer = setTimeout(() => firstRef.current?.focus(), 120);
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(timer); window.removeEventListener("keydown", onKey); };
  }, [isOpen, close]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formRef.current));
    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    setErrors({});
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
            className="fixed inset-0 z-[200]"
            style={{ background: "rgba(40,54,24,0.45)", backdropFilter: "blur(6px)" }}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.90, y: 28 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.95,  y: 12 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed inset-0 z-[201] flex items-end xs:items-center justify-center p-0 xs:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl xs:rounded-3xl"
              style={{
                background: "#fefae0",
                boxShadow: "0 32px 80px rgba(40,54,24,0.28), 0 0 0 1px rgba(96,108,56,0.12)",
              }}
            >
              {/* Close */}
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[20px] leading-none transition-colors z-10"
                style={{ background: "rgba(96,108,56,0.1)", color: "#283618" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(96,108,56,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(96,108,56,0.1)"}
              >
                ×
              </button>

              <div className="p-7 sm:p-10">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 flex flex-col items-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                      style={{ background: "rgba(96,108,56,0.15)" }}
                    >
                      <span style={{ color: "#606c38", fontSize: "28px" }}>✓</span>
                    </motion.div>
                    <h3 className="font-bold text-[22px] mb-2" style={{ color: "#283618" }}>Message sent!</h3>
                    <p className="text-[15px] leading-relaxed max-w-xs" style={{ color: "#7a7060" }}>
                      I'll be in touch within 24 hours. Check your spam folder just in case.
                    </p>
                    <button
                      onClick={close}
                      className="mt-7 px-8 py-3 rounded-full font-semibold text-[15px] text-white transition-colors"
                      style={{ background: "#606c38" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#283618"}
                      onMouseLeave={e => e.currentTarget.style.background = "#606c38"}
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-7">
                      <p
                        className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2 border-l-2 pl-3"
                        style={{ color: "#bc6c25", borderColor: "#bc6c25" }}
                      >
                        Free · No commitment
                      </p>
                      <h2
                        id="modal-title"
                        className="font-bold text-[26px] sm:text-[30px] leading-tight"
                        style={{ color: "#283618" }}
                      >
                        Let's talk about your project.
                      </h2>
                      <p className="text-[14px] mt-2 leading-relaxed" style={{ color: "#7a7060" }}>
                        Fill this in and I'll reply within 24 hours to schedule our free 15-minute call.
                      </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                      {FIELDS.map(({ id, label, type, required, placeholder }, i) => (
                        <InputField
                          key={id}
                          id={id}
                          label={label}
                          type={type}
                          required={required}
                          placeholder={placeholder}
                          error={errors[id]}
                          disabled={status === "sending"}
                          ref={i === 0 ? firstRef : undefined}
                        />
                      ))}

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-[13px] font-semibold mb-1.5"
                          style={{ color: "#283618" }}
                        >
                          Reason for Contact
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          disabled={status === "sending"}
                          placeholder="Describe what you need — new website, redesign, landing page, etc."
                          className="w-full px-4 py-3 rounded-xl text-[15px] outline-none resize-none transition-all disabled:opacity-50"
                          style={{
                            background: "#f5efc8",
                            border: `1.5px solid ${errors.message ? "#ef4444" : "rgba(221,161,94,0.45)"}`,
                            color: "#283618",
                          }}
                          onFocus={e => { e.target.style.borderColor = "#606c38"; e.target.style.boxShadow = "0 0 0 3px rgba(96,108,56,0.15)"; }}
                          onBlur={e  => { e.target.style.borderColor = errors.message ? "#ef4444" : "rgba(221,161,94,0.45)"; e.target.style.boxShadow = "none"; }}
                        />
                        {errors.message && <p className="text-red-500 text-[12px] mt-1">{errors.message}</p>}
                      </div>

                      {status === "error" && (
                        <p
                          className="text-[13px] rounded-xl px-4 py-3"
                          style={{ color: "#b91c1c", background: "rgba(239,68,68,0.08)" }}
                        >
                          Something went wrong. Email me directly at{" "}
                          <a href="mailto:harrygillfdk50@gmail.com" className="underline">
                            harrygillfdk50@gmail.com
                          </a>
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        whileTap={{ scale: 0.97 }}
                        className="mt-1 w-full py-4 rounded-2xl font-semibold text-[16px] text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: "#606c38",
                          boxShadow: "0 8px 30px rgba(96,108,56,0.35)",
                        }}
                        onMouseEnter={e => { if (status !== "sending") e.currentTarget.style.background = "#283618"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#606c38"; }}
                      >
                        {status === "sending" ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Sending…
                          </span>
                        ) : "Send Message →"}
                      </motion.button>

                      <p className="text-center text-[12px]" style={{ color: "#7a7060" }}>
                        Prefer email?{" "}
                        <a href="mailto:harrygillfdk50@gmail.com" className="hover:underline" style={{ color: "#606c38" }}>
                          harrygillfdk50@gmail.com
                        </a>
                        {" · "}
                        <a href="tel:+14372501904" className="hover:underline" style={{ color: "#606c38" }}>
                          +1 437 250 1904
                        </a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
