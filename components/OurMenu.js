"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import menuCategories from "../lib/menuData";

export default function MenuSection() {
  const [showAll, setShowAll] = useState(false);

  // Show only the first 5 categories initially
  const visibleCategories = showAll
    ? menuCategories
    : menuCategories.slice(0, 4);

  return (
    <div className="w-full max-w-6xl mx-auto py-10 space-y-10">
      <p className="text-5xl font-bold text-center">Our Menu</p>
      {visibleCategories.map((category, index) => (
        <CategoryCard key={category.name} category={category} index={index} />
      ))}

      {/* Show More / Show Less Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setShowAll(!showAll)}
          className="common-button"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

// Separate Component for Each Category (Fixes Hook Order Issue)
function CategoryCard({ category, index }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-start gap-6 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Image Box */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={
          inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }
        }
        transition={{ duration: 0.5 }}
        className="h-[33rem] w-[38rem] relative overflow-hidden rounded-3xl shadow-lg"
      >
        <div className="absolute top-5 left-5 bg-[#fffbf0] opacity-80 px-6 py-2.5 rounded-full z-10 font-semibold">
          {category.name}
        </div>
        <Image
          src={category.image}
          alt={category.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-3xl"
        />
      </motion.div>

      {/* Dish List */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={
          inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }
        }
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full md:w-[60%] p-10 bg-[#fff5e0] rounded-3xl shadow-md"
      >
        <h2 className="text-[28px] font-bold mb-7">{category.name}</h2>
        <ul className="space-y-6">
          {category.items.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <div className="flex flex-col justify-center pr-10">
                <span className="font-semibold text-xl mb-1">{item.name}</span>
                <p className="text-gray-800 text-base">{item.description}</p>
              </div>
              <span className="text-amber-950 font-bold text-lg">
                {item.price}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
