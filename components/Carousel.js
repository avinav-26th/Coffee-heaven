"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

const images = [
  "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494969/bg-0_ipmnjk.jpg",
  "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494969/bg-1_vcu72b.png",
  "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494969/bg-2_jqadrc.jpg",
  "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494970/bg-3_u3t4t0.jpg",
  "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494969/bg-4_ycs3tz.png",
  "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494970/bg-5_tqmtdj.png",
  "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494970/bg-6_i7ekpc.png",
  "https://res.cloudinary.com/daxydcpj0/image/upload/v1755494970/bg-7_filstf.png",
];

const rating = 4.4;

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [isClient, setIsClient] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
    if (emblaApi) {
      emblaApi.on("select", () =>
        setSelectedIndex(emblaApi.selectedScrollSnap())
      );
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!isClient) return null;

  return (
    <div className="relative w-full mx-auto transition-smooth">
      {/* Carousel images */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div className="flex-none w-full min-w-full" key={index}>
              <Image
                src={src}
                alt={`Slide ${index}`}
                width={1920}
                height={1080}
                priority
                className="w-full max-h-screen object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Google Star Rating Box */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-7 py-4 rounded-full flex items-center space-x-2 text-black">
        <p className="text-xl font-">Google: </p>
        {[...Array(5)].map((_, index) => {
          const fillPercentage = Math.min(Math.max(rating - index, 0), 1);
          return (
            <div key={index} className="relative w-6 h-6">
              <div className="absolute w-full h-full text-gray-500">
                <Star size={24} fill="gray" />
              </div>
              <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden text-yellow-300"
                style={{
                  clipPath: `inset(0 ${(1 - fillPercentage) * 100}% 0 0)`,
                }}
              >
                <Star size={24} fill="yellow"/>
              </div>
            </div>
          );
        })}
        <span className="text-lg font-medium">({rating.toFixed(1)})</span>
      </div>

      {/* Overlay text */}
      <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h1 className="text-5xl font-bold drop-shadow-lg">
          Welcome to Our Coffee Shop
        </h1>
        <p className="text-2xl mt-3 drop-shadow-md">
          Enjoy the finest coffee experience
        </p>
        <button className=" bg-black text-gray-200 text-xl font-bold py-2.5 px-6 rounded-full mt-6 hover:transform hover:scale-95 transition-all">
          <Link href="#menu">Explore Menu</Link>
        </button>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full shadow-md hover:bg-gray-900 hover:bg-opacity-30"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-opacity-30 bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-900 hover:bg-opacity-30"
      >
        <ChevronRight size={28} />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black bg-opacity-45 px-3 py-2 rounded-full">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? "bg-gray-100"
                : "bg-gray-500 bg-opacity-60"
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
