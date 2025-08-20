// components/ReviewPopover.js
"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageSquareText } from 'lucide-react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { formatDistanceToNow } from 'date-fns';

export default function ReviewPopover({ itemName, reviewCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const popoverRef = useRef(null);

  useOnClickOutside(popoverRef, () => setIsOpen(false));

  useEffect(() => {
    if (isOpen) {
      const fetchReviews = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/reviews?item=${encodeURIComponent(itemName)}`);
          if (res.ok) {
            const data = await res.json();
            setReviews(data.reviews);
          }
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchReviews();
    }
  }, [isOpen, itemName]);

  if (reviewCount === 0) {
    return null; // Don't show the icon if there are no reviews
  }

  return (
    <div className="relative" ref={popoverRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="ml-2 text-gray-400 hover:text-amber-700">
        <MessageSquareText size={14} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <div className="p-3 border-b">
            <h3 className="font-semibold text-sm">Reviews for {itemName}</h3>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {isLoading ? (
              <p className="p-3 text-sm text-gray-500">Loading...</p>
            ) : reviews.length > 0 ? (
              <ul className="divide-y">
                {reviews.map((review, index) => (
                  <li key={review._id} className="p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-xs">
                        {review.user?.name || `Guest${String(index + 1).padStart(2, '0')}`}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(review.createdAt))} ago
                      </p>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-3 text-sm text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}