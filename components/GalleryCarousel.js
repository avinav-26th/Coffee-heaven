"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ImageSlider = () => {
  const images = [
    "/images/menu-categories-dp/hot-beverages.png",
    "/images/menu-categories-dp/cold-beverages.png",
    "/images/menu-categories-dp/smoothies.png",
    "/images/menu-categories-dp/soups.png",
    "/images/menu-categories-dp/salads.png",
    "/images/menu-categories-dp/breakfast.png",
    "/images/menu-categories-dp/toasts.png",
    "/images/menu-categories-dp/veg-starters.png",
    "/images/menu-categories-dp/non-veg-starters.png",
    "/images/menu-categories-dp/omelettes.png",
    "/images/menu-categories-dp/veg-sandwiches.png",
    "/images/menu-categories-dp/non-veg-sandwiches.png",
    "/images/menu-categories-dp/veg-pizzas.png",
    "/images/menu-categories-dp/non-veg-pizzas.png",
    "/images/menu-categories-dp/veg-burgers.png",
    "/images/menu-categories-dp/non-veg-burgers.png",
    "/images/menu-categories-dp/main-course.png",
    "/images/menu-categories-dp/pastries.png",
    "/images/menu-categories-dp/desserts.png",
    "/images/menu-categories-dp/waffles.png",
  ];

  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [centerIndex]);

  const handleNext = () => {
    setCenterIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleBack = () => {
    setCenterIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const getPosition = (index) => {
    const offset = (index - centerIndex + images.length) % images.length;
    if (offset === 0) return "center";
    if (offset === 1) return "right1";
    if (offset === 2) return "right";
    if (offset === images.length - 1) return "left1";
    if (offset === images.length - 2) return "left";
    return "hidden";
  };

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5, filter: "blur(0px)", opacity: 1 },
    left1: {
      x: "-50%",
      scale: 0.92,
      zIndex: 3,
      filter: "blur(2px)",
      opacity: 0.85,
    },
    left: {
      x: "-90%",
      scale: 0.88,
      zIndex: 2,
      filter: "blur(3px)",
      opacity: 0.75,
    },
    right: {
      x: "90%",
      scale: 0.88,
      zIndex: 2,
      filter: "blur(3px)",
      opacity: 0.75,
    },
    right1: {
      x: "50%",
      scale: 0.92,
      zIndex: 3,
      filter: "blur(2px)",
      opacity: 0.85,
    },
    hidden: { scale: 0, opacity: 0, zIndex: 0 },
  };

  return (
    <div className="flex items-center flex-col justify-between bg-[#fffbf0] h-screen overflow-hidden relative">
      {images.map((image, index) => {
        const position = getPosition(index);
        return (
          <motion.div
            key={index}
            className="absolute rounded-2xl overflow-hidden shadow-lg"
            initial="hidden"
            animate={position}
            variants={imageVariants}
            transition={{ duration: 0.6 }}
            style={{
              height: "75%",
              aspectRatio: "1 / 1", // Makes it square
              zIndex: 10,
            }}
          >
            <img
              src={image}
              alt={`carousel-${index}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ImageSlider;
