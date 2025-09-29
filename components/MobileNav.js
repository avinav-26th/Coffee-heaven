"use client";

import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import NavActions from './NavActions';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  useOnClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="md:hidden" ref={menuRef}>
      {/* Hamburger Icon */}
      <button onClick={() => setIsOpen(!isOpen)}>
        <Menu size={28} />
      </button>

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#fffbf0] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>
        <ul className="flex flex-col items-start p-4 space-y-4 text-lg">
          {/* Mobile Menu Links */}
          <li><Link href="/#menu" onClick={() => setIsOpen(false)}>Menu</Link></li>
          <li><Link href="https://www.swiggy.com/" target="_blank" onClick={() => setIsOpen(false)}>Order Now</Link></li>
          <li><Link href="/#about" onClick={() => setIsOpen(false)}>About Us</Link></li>
          <li><Link href="/locations" onClick={() => setIsOpen(false)}>Locations</Link></li>
          <li><Link href="/our_team" onClick={() => setIsOpen(false)}>Our Team</Link></li>
          <li><Link href="/careers" onClick={() => setIsOpen(false)}>Careers</Link></li>
          <li><Link href="/franchise" onClick={() => setIsOpen(false)}>Franchise</Link></li>
          {/* Interactive Actions for mobile */}
          <div className="border-t border-gray-200 w-full pt-4 mt-4">
            <ul className="flex justify-start items-center space-x-6">
                <NavActions />
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
}