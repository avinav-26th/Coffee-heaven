// components/ReviewModal.js
"use client";

import useReviewModal from '@/store/useReviewModal';
import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReviewModal() {
  const { isOpen, closeModal, item } = useReviewModal();
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/reviews/comment', { // A new endpoint for comments
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: item.name, comment }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      toast.success('Your review has been added!');
      handleClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setComment('');
    closeModal();
  };

  if (!isOpen || !item) return null;

  return (
    <div onClick={handleClose} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={handleClose} className="absolute top-4 right-4"><X /></button>
        <h2 className="text-2xl font-bold text-center mb-4">Write a Review</h2>
        <p className="text-center text-gray-600 mb-6">for <span className="font-semibold">{item.name}</span></p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full p-2 border rounded-md"
          />
          <button type="submit" disabled={isLoading} className="w-full mt-4 bg-amber-800 text-white py-2 rounded-md">
            {isLoading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}