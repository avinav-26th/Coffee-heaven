"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

// Lazy load modals
const AuthModal = dynamic(() => import('@/components/AuthModal'), { ssr: false });
const EditProfileModal = dynamic(() => import('@/components/EditProfileModal'), { ssr: false });
const ReviewModal = dynamic(() => import('@/components/ReviewModal'), { ssr: false });

export default function Providers({ children }) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SessionProvider>
        {children}
      
      {/* Rendering the modals here */}
      <AuthModal />
      <EditProfileModal />
      <ReviewModal />
      </SessionProvider>
    </>
  );
}