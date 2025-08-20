// store/useEditProfileModal.js
import { create } from 'zustand';

const useEditProfileModal = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useEditProfileModal;