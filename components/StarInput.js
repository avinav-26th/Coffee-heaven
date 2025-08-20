// components/StarInput.js
"use client";

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StarInput({ item, existingRating }) {
  const [rating, setRating] = useState(existingRating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setRating(existingRating || 0);
  }, [existingRating]);

  const handleSetRating = async (newRating) => {
    setRating(newRating);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: item.name, rating: newRating }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        // If a review already exists, it might return a 409, which is fine
        // We can handle specific update logic if needed, but for now this is okay
        if(res.status !== 409) throw new Error(data.message);
      }
      
      toast.success(`You rated ${item.name} ${newRating} stars!`);
    } catch (error) {
      toast.error(error.message);
      setRating(existingRating || 0); // Revert on error
    }
  };

  return (
    <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          className={`cursor-pointer transition-colors ${
            hoverRating >= star || rating >= star
              ? 'text-yellow-500 fill-yellow-500'
              : 'text-gray-300'
          }`}
          onMouseEnter={() => setHoverRating(star)}
          onClick={() => handleSetRating(star)}
        />
      ))}
    </div>
  );
}