// components/MenuClient.js
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import useCartStore from "@/store/useCartStore";
import { useSession } from "next-auth/react";
import { Star } from "lucide-react";
import ReviewPopover from "./ReviewPopover";

const StarRating = ({ rating, count, itemName, reviewSummary }) => {
    const commentCount = reviewSummary[itemName]?.commentCount || 0;
    if (!rating || count === 0) {
        return <div className="h-5 mt-1" />;
    }

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1 h-5 mt-1">
            {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} size={14} className="text-yellow-500 fill-yellow-500" />)}
            {halfStar && <Star size={14} className="text-yellow-500" />}
            {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} size={14} className="text-gray-300" />)}
            <span className="text-xs text-gray-600 ml-1">({count})</span>
            <ReviewPopover itemName={itemName} reviewCount={commentCount} />
        </div>
    );
};

function CategoryCard({ category, index, reviewSummary }) {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
    const isEven = index % 2 === 0;
    const { addToCart, items, updateQuantity } = useCartStore();
    const { status } = useSession();

    return (
        <div ref={ref} className={`flex flex-col md:flex-row items-start gap-6 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
            <motion.div initial={{ opacity: 0, x: isEven ? -50 : 50 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }} transition={{ duration: 0.5 }} className="h-[33rem] w-full md:w-[38rem] relative overflow-hidden rounded-3xl shadow-lg">
                <div className="absolute top-5 left-5 bg-[#fffbf0] opacity-80 px-6 py-2.5 rounded-full z-10 font-semibold">
                    {category.name}
                </div>
                <Image src={category.image} alt={category.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover" }} className="rounded-3xl" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: isEven ? 50 : -50 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }} transition={{ duration: 0.5, delay: 0.3 }} className="w-full md:w-[60%] p-10 bg-[#fff5e0] rounded-3xl shadow-md">
                <h2 className="text-[28px] font-bold mb-7">{category.name}</h2>
                <ul className="space-y-6">
                    {category.items.map((item, idx) => {
                        const cartItem = items[item.name];
                        const ratingData = reviewSummary[item.name];
                        return (
                            <li key={idx} className="flex justify-between items-center group">
                                <div className="flex flex-col justify-center pr-10 min-h-[56px]">
                                    <span className="font-semibold text-xl mb-1">{item.name}</span>
                                    <StarRating rating={ratingData?.averageRating} count={ratingData?.reviewCount} itemName={item.name} reviewSummary={reviewSummary} />
                                    <p className="text-gray-800 text-base mt-2">{item.description}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-amber-950 font-bold text-lg mb-2">{item.price}</span>
                                    {cartItem ? (
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => updateQuantity(item.name, cartItem.quantity - 1, status === 'authenticated')} className="bg-amber-800 text-white w-7 h-7 rounded-full">-</button>
                                            <span>{cartItem.quantity}</span>
                                            <button onClick={() => updateQuantity(item.name, cartItem.quantity + 1, status === 'authenticated')} className="bg-amber-800 text-white w-7 h-7 rounded-full">+</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => addToCart(item, status === 'authenticated')} className="bg-amber-800 text-white py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            Add
                                        </button>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </motion.div>
        </div>
    );
}

export default function MenuClient({ menuCategories, reviewSummary }) {
    const [showAll, setShowAll] = useState(false);
    const visibleCategories = showAll ? menuCategories : menuCategories.slice(0, 4);

    return (
        <div id="menu" className="w-full max-w-6xl mx-auto py-10 space-y-10">
            <p className="text-5xl font-bold text-center">Our Menu</p>
            {visibleCategories.map((category, index) => (
                <CategoryCard key={category.name} category={category} index={index} reviewSummary={reviewSummary} />
            ))}
            <div className="flex justify-center mt-6">
                <button onClick={() => setShowAll(!showAll)} className="common-button">
                    {showAll ? "Show Less" : "Show More"}
                </button>
            </div>
        </div>
    );
}