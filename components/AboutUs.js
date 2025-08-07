"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="py-16 px-6 bg-[#fff5e0] rounded-[2.5rem] mx-[5.5rem] shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left Side - Image */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/cafe-bg-carousel/bg-0.png"
            alt="Cafe Image"
            width={600}
            height={700}
            className="rounded-3xl shadow-lg"
          />
        </motion.div>

        {/* Right Side - Text Content */}
        <motion.div
          className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <div className="mb-4">
            <Image
              src="/images/cafe-logo.png"
              alt="Cafe Logo"
              width={100}
              height={100}
            />
          </div>

          {/* Tagline */}
          <h2 className="text-3xl font-bold text-gray-800">
            Where Art, Food & Coffee Meet
          </h2>

          {/* Description */}
          <p className="mt-4 text-gray-700 font-semibold">
            Coffee Heaven, located in the heart of the city, is a place where
            rich aromas, great food, and a warm ambiance come together. We’ve
            created a cozy yet vibrant space that’s perfect for coffee lovers,
            food enthusiasts, and anyone looking to unwind. Whether you’re here
            for a perfectly brewed cup of coffee, a delicious meal, or just a
            moment of peace, Coffee Heaven is the perfect escape.
          </p>

          {/* Location */}
          <div className="mt-8">
            <h3 className="text-[19px] font-semibold text-gray-700 mb-2">
              Location:
            </h3>
            <p className="text-gray-600 text-[17px] font-[550]">
              Coffee Heaven <br />
              12th Main Road <br />
              Koramangala 4th Block, <br />
              Bangalore, Karnataka 560034, IN
            </p>
          </div>

          {/* Explore Menu Button */}
          <Link href="#menu">
            <button className="common-button">
              <span>Explore Menu</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
