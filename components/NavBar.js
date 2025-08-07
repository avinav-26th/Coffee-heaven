"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, LogIn, UserRound, ChevronDown } from "lucide-react";
import Image from "next/image";
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import the CSS for styling

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


const NavBar = ({ cartItemCount = 0, isLoggedIn = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set opacity change based on scroll position
      setScrolled(currentScrollY > 50);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 right-0 w-full bg-[#fffbf0] shadow-md rounded-b-3xl py-3.5 px-6 flex justify-between items-center z-50 transition-all duration-500 ${
        scrolled ? "opacity-90" : "opacity-100"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <Link href="/#home">
        <div className="flex items-center space-x-3">
          <Image
            src="/images/cafe-logo.png"
            alt="Cafe Logo"
            width={35}
            height={35}
          />
          <h1 className="text-xl font-bold font-mplus">Coffee Heaven</h1>
        </div>
      </Link>
      <ul className="flex space-x-6 text-[17px] items-center">
        <li className="transition-colors duration-300 hover:text-amber-600">
          <Link href="/#menu">Menu</Link>
        </li>
        <li className="transition-colors duration-300 hover:text-amber-600 hover:rounded-3xl hover:shadow-md px-3 py-1.5">
          <Link href="https://www.swiggy.com/" target="_blank">
            Order Now
          </Link>
        </li>

        {/* About Us Dropdown */}
        <li className="relative group transition-colors duration-300 hover:text-amber-600">
          <button className="flex items-center space-x-1">
            <span>About Us</span>
            <ChevronDown
              size={18}
              className="transition-transform duration-300 group-hover:rotate-180"
            />
          </button>
          <ul className="absolute left-0 top-full bg-amber-50 text-amber-800 shadow-lg rounded-2xl w-40 opacity-0 scale-95 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
            <li className="dropdown-transition">
              <Link
                href="/#about"
                className="block px-4 py-2 hover:bg-amber-100 hover:rounded-t-2xl"
              >
                About
              </Link>
            </li>
            <li className="dropdown-transition">
              <Link
                href="/pages/locations"
                className="block px-4 py-2 hover:bg-amber-100"
              >
                Locations
              </Link>
            </li>
            <li className="dropdown-transition">
              <Link
                href="/pages/our_team"
                className="block px-4 py-2 hover:bg-amber-100"
              >
                Our Team
              </Link>
            </li>
            <li className="dropdown-transition">
              <Link
                href="/#gallery"
                className="block px-4 py-2 hover:bg-amber-100 hover:rounded-b-2xl"
                >
                Gallery
              </Link>
            </li>
          </ul>
        </li>

        {/* Contact Dropdown */}
        <li className="relative group transition-colors duration-300 hover:text-amber-600">
          <button className="flex items-center space-x-1">
            <span>Contact</span>
            <ChevronDown
              size={18}
              className="transition-transform duration-300 group-hover:rotate-180"
            />
          </button>
          <ul className="absolute left-0 top-full bg-amber-50 text-amber-800 shadow-lg rounded-2xl w-40 opacity-0 scale-95 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
            <li className="dropdown-transition">
              <Link
                href="/#footer"
                className="block px-4 py-2 hover:bg-amber-100 hover:rounded-t-2xl"
              >
                Contact Us
              </Link>
            </li>
            <li className="dropdown-transition">
              <Link
                href="/pages/careers"
                className="block px-4 py-2 hover:bg-amber-100"
              >
                Careers
              </Link>
            </li>
            <li className="dropdown-transition">
              <Link
                href="/pages/franchise"
                className="block px-4 py-2 hover:bg-amber-100"
              >
                Franchise
              </Link>
            </li>
            <li className="dropdown-transition">
              <Link
                href="/pages/locations"
                className="block px-4 py-2 hover:bg-amber-100 hover:rounded-b-2xl"
              >
                Map
              </Link>
            </li>
          </ul>
        </li>

        {/* Login Icon */}
        <li className="transition-colors duration-300 hover:text-amber-600">
          <Link href="/pages/dummy" className="flex items-center">
            {isLoggedIn ? <UserRound size={24} /> : <LogIn size={24} />}
          </Link>
        </li>

        {/* Cart Icon with Indicator */}
        <li className="relative transition-colors duration-300 hover:text-amber-600">
          <Link href="/pages/dummy" className="flex items-center">
            <ShoppingCart size={24} />
            {cartItemCount >= 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full text-center leading-none">
                {cartItemCount}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
