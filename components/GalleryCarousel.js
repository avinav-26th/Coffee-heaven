"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ImageSlider = () => {
  const images = [
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/veg-starters_oljxtz.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/veg-burgers_nli334.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/veg-pizzas_eljbls.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/non-veg-pizzas_m9mwce.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/veg-sandwiches_kzifus.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494965/hot-beverages_slg38s.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494966/cold-beverages_ecjpx1.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494967/smoothies_jeldl5.jpg",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494967/salads_ro02fr.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/soups_bfpv2w.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494967/toasts_ijaf5g.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494967/non-veg-starters_zdchoc.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494965/breakfast_hnfdxe.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494965/omelettes_idsypn.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494966/non-veg-sandwiches_foylqc.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494966/main-course_d8jihn.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494966/non-veg-burgers_vtxtlh.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494965/pastries_xpp6ia.jpg",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494965/desserts_n1kxbe.png",
    "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494968/waffles_prhayk.png",
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
