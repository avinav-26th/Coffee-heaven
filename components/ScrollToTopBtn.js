"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Triangle } from "lucide-react";

const ScrollToTopBtn = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > window.innerHeight / 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: showScrollButton ? 1 : 0,
        scale: showScrollButton ? 1 : 0.8,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed bottom-28 right-6"
    >
      <button
        onClick={scrollToTop}
        className="bg-amber-700 text-white text-center leading-none p-4 rounded-full shadow-xl opacity-25 hover:opacity-35 transition duration-300 flex items-center justify-center te"
      >
        <Triangle className="w-5 h-5 self-center" />
      </button>
    </motion.div>
  );
};

export default ScrollToTopBtn;
