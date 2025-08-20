// components/NavActions.js
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, LogIn, UserRound, LogOut } from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import useAuthModal from "@/store/useAuthModal";
import useCartStore from "@/store/useCartStore";
import useEditProfileModal from "@/store/useEditProfileModal";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

export default function NavActions() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const { openModal: openAuthModal } = useAuthModal();
  const { openModal: openEditModal } = useEditProfileModal();
  const { items } = useCartStore();
  const cartItemCount = Object.keys(items).length;
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useOnClickOutside(menuRef, () => setIsProfileMenuOpen(false));

  return (
    <>
      {/* Login Icon / User Menu */}
      {isLoggedIn ? (
        <li className="relative" ref={menuRef}>
          <button
            className="flex items-center p-1 rounded-full hover:ring-2 hover:ring-amber-800 transition-all"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="User Avatar"
                width={28}
                height={28}
                className="rounded-full"
              />
            ) : (
              <UserRound size={24} />
            )}
          </button>
          <ul
            className={`absolute right-5 top-full bg-amber-50 text-amber-800 shadow-lg rounded-xl w-48 transition-all duration-300 ${
              isProfileMenuOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <li className="dropdown-transition">
              <Link
                href="/orders"
                className="block px-4 py-2 hover:bg-amber-100 rounded-t-xl"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                Previous Orders
              </Link>
            </li>
            <li className="dropdown-transition">
              <button
                className="w-full text-left block px-4 py-2 hover:bg-amber-100"
                onClick={() => {
                  openEditModal();
                  setIsProfileMenuOpen(false);
                }}
              >
                Edit Profile
              </button>
            </li>
            <li className="mt-4 border-t border-amber-800 mx-4 h-1 mb-0 pb-0"></li>
            <li className="dropdown-transition flex justify-between items-center hover:bg-amber-100 rounded-b-xl">
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setIsProfileMenuOpen(false);
                }}
                className="w-full text-left block px-4 py-2 rounded-b-xl text-md"
              >
                Sign Out
              </button>
              <LogOut size={20} className="mr-4" />
            </li>
          </ul>
        </li>
      ) : (
        <li className="transition-colors duration-300 hover:text-amber-600">
          <button onClick={openAuthModal} className="flex items-center">
            <LogIn size={24} />
          </button>
        </li>
      )}

      {/* Cart Icon with Indicator */}
      <li className="relative transition-colors duration-300 hover:text-amber-600">
        {isLoggedIn ? (
          <Link href="/cart" className="flex items-center">
            <ShoppingCart size={24} />
          </Link>
        ) : (
          <button onClick={openAuthModal} className="flex items-center">
            <ShoppingCart size={24} />
          </button>
        )}
        {isLoggedIn && cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full text-center leading-none">
            {cartItemCount}
          </span>
        )}
      </li>
    </>
  );
}
