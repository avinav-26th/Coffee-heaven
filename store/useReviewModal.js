// store/useReviewModal.js
import { create } from 'zustand';

const useReviewModal = create((set) => ({
  isOpen: false,
  item: null, // To store which item is being reviewed
  openModal: (item) => set({ isOpen: true, item: item }),
  closeModal: () => set({ isOpen: false, item: null }),
}));

export default useReviewModal;