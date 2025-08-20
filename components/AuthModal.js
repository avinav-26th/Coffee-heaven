// components/AuthModal.js
"use client";

import { useState } from "react";
import useAuthModal from "@/store/useAuthModal";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthModal() {
  const { isOpen, closeModal } = useAuthModal();
  const router = useRouter();

  const [step, setStep] = useState("mobile"); // 'mobile' or 'otp'
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to send OTP.");
      }

      setStep("otp"); // Move to the next step
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleVerifyOtp = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError('');

  //   try {
  //     // First, verify the OTP with our custom endpoint
  //     const verifyRes = await fetch('/api/auth/otp/verify', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ mobileNumber, otp }),
  //     });

  //     const verifyData = await verifyRes.json();

  //     if (!verifyRes.ok) {
  //       throw new Error(verifyData.message || 'OTP verification failed.');
  //     }

  //     // If OTP is verified, now sign in with NextAuth using our special provider
  //     toast.success('OTP Verified successfully!');
  //     const signInRes = await signIn('otp-credentials', {
  //       mobileNumber,
  //       redirect: false, // Important: do not redirect the page
  //     });

  //     if (signInRes?.error) {
  //       throw new Error('Login failed. Please try again.');
  //     }

  //     // If sign in is successful, close the modal and check if onboarding is needed
  //     resetForm();
  //     closeModal();

  //     // Check if the user needs to complete their profile (e.g., set a username)
  //     if (!verifyData.user.username) {
  //       // We will create this page next
  //       router.push('/profile/setup');
  //     }

  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // First, verify the OTP with our custom endpoint
      const verifyRes = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber, otp }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(verifyData.message || "OTP verification failed.");
      }

      toast.success("OTP Verified successfully!");

      // If OTP is verified, now sign in with NextAuth
      const signInRes = await signIn("otp-credentials", {
        mobileNumber,
        redirect: false,
      });

      if (signInRes?.error) {
        throw new Error("Login failed. Please try again.");
      }

      // Close the modal first for a better user experience
      closeModal();

      // Now, decide where to send the user
      if (!verifyData.user.username) {
        // New user: Redirect to the setup page
        router.push("/profile/setup");
      } else {
        // Existing user: Refresh the current page to update the UI
        router.refresh();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const resetForm = () => {
    setStep("mobile");
    setMobileNumber("");
    setOtp("");
    setError("");
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {step === "mobile" ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">
              Login or Sign Up
            </h2>
            <form onSubmit={handleSendOtp}>
              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your 10-digit number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-800 text-white py-2 px-4 rounded-md hover:bg-amber-700 disabled:bg-gray-400 transition duration-200"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter the code sent to {mobileNumber}
            </p>
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  One-Time Password
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-800 text-white py-2 px-4 rounded-md hover:bg-amber-700 disabled:bg-gray-400 transition duration-200"
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </button>
            </form>
          </div>
        )}
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
