// components/NavBar.js
import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import NavActions from "./NavActions"; // Import the new client component

// Note: No "use client" here. This is now a Server Component.
// The scroll effects have been removed to make this a pure server component.
// A more advanced implementation might use a client component wrapper for scroll effects if needed.
const NavBar = () => {
  return (
    <nav
      className={`fixed top-0 right-0 w-full bg-[#fffbf0] shadow-md rounded-b-3xl py-3.5 px-6 flex justify-between items-center z-50 transition-all duration-500 opacity-95`}
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
                href="/locations"
                className="block px-4 py-2 hover:bg-amber-100"
              >
                Locations
              </Link>
            </li>
            <li className="dropdown-transition">
              <Link
                href="/our_team"
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
                href="/careers"
                className="block px-4 py-2 hover:bg-amber-100"
              >
                Careers
              </Link>
            </li>
            <li className="dropdown-transition">
              <Link
                href="/franchise"
                className="block px-4 py-2 hover:bg-amber-100"
              >
                Franchise
              </Link>
            </li>
            <li className="dropdown-transition">
              <Link
                href="/locations"
                className="block px-4 py-2 hover:bg-amber-100 hover:rounded-b-2xl"
              >
                Map
              </Link>
            </li>
          </ul>
        </li>

        {/* The interactive parts are now in their own component */}
        <NavActions />
      </ul>
    </nav>
  );
};

export default NavBar;

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { ShoppingCart, LogIn, UserRound, ChevronDown, LogOut } from "lucide-react";
// import Image from "next/image";
// import { useSession, signOut } from "next-auth/react";
// import Router from "next/router";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css"; // Import the CSS for styling
// import useAuthModal from "@/store/useAuthModal";
// import useCartStore from "@/store/useCartStore";
// import useEditProfileModal from "@/store/useEditProfileModal";
// import { useOnClickOutside } from "@/hooks/useOnClickOutside";

// Router.events.on("routeChangeStart", () => NProgress.start());
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

// const NavBar = () => {
//   const { data: session, status } = useSession();
//   const isLoggedIn = status === "authenticated";
//   console.log("NAVBAR SESSION STATUS:", status);
//   const [scrolled, setScrolled] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);
//   const { openModal } = useAuthModal();
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const { openModal: openEditModal } = useEditProfileModal();

//   const menuRef = useRef(null);
//   // Call the hook to close the menu when clicking outside
//   useOnClickOutside(menuRef, () => setIsProfileMenuOpen(false));

//   const { items } = useCartStore();
//   const cartItemCount = Object.keys(items).length;

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       // Set opacity change based on scroll position
//       setScrolled(currentScrollY > 50);

//       // Hide navbar when scrolling down, show when scrolling up
//       if (currentScrollY > lastScrollY && currentScrollY > 50) {
//         setIsVisible(false);
//       } else {
//         setIsVisible(true);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [lastScrollY]);

//   return (
//     <nav
//       className={`fixed top-0 right-0 w-full bg-[#fffbf0] shadow-md rounded-b-3xl py-3.5 px-6 flex justify-between items-center z-50 transition-all duration-500 ${
//         scrolled ? "opacity-90" : "opacity-100"
//       } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
//     >
//       <Link href="/#home">
//         <div className="flex items-center space-x-3">
//           <Image
//             src="/images/cafe-logo.png"
//             alt="Cafe Logo"
//             width={35}
//             height={35}
//           />
//           <h1 className="text-xl font-bold font-mplus">Coffee Heaven</h1>
//         </div>
//       </Link>
//       <ul className="flex space-x-6 text-[17px] items-center">
//         <li className="transition-colors duration-300 hover:text-amber-600">
//           <Link href="/#menu">Menu</Link>
//         </li>
//         <li className="transition-colors duration-300 hover:text-amber-600 hover:rounded-3xl hover:shadow-md px-3 py-1.5">
//           <Link href="https://www.swiggy.com/" target="_blank">
//             Order Now
//           </Link>
//         </li>

//         {/* About Us Dropdown */}
//         <li className="relative group transition-colors duration-300 hover:text-amber-600">
//           <button className="flex items-center space-x-1">
//             <span>About Us</span>
//             <ChevronDown
//               size={18}
//               className="transition-transform duration-300 group-hover:rotate-180"
//             />
//           </button>
//           <ul className="absolute left-0 top-full bg-amber-50 text-amber-800 shadow-lg rounded-2xl w-40 opacity-0 scale-95 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
//             <li className="dropdown-transition">
//               <Link
//                 href="/#about"
//                 className="block px-4 py-2 hover:bg-amber-100 hover:rounded-t-2xl"
//               >
//                 About
//               </Link>
//             </li>
//             <li className="dropdown-transition">
//               <Link
//                 href="/locations"
//                 className="block px-4 py-2 hover:bg-amber-100"
//               >
//                 Locations
//               </Link>
//             </li>
//             <li className="dropdown-transition">
//               <Link
//                 href="/our_team"
//                 className="block px-4 py-2 hover:bg-amber-100"
//               >
//                 Our Team
//               </Link>
//             </li>
//             <li className="dropdown-transition">
//               <Link
//                 href="/#gallery"
//                 className="block px-4 py-2 hover:bg-amber-100 hover:rounded-b-2xl"
//               >
//                 Gallery
//               </Link>
//             </li>
//           </ul>
//         </li>

//         {/* Contact Dropdown */}
//         <li className="relative group transition-colors duration-300 hover:text-amber-600">
//           <button className="flex items-center space-x-1">
//             <span>Contact</span>
//             <ChevronDown
//               size={18}
//               className="transition-transform duration-300 group-hover:rotate-180"
//             />
//           </button>
//           <ul className="absolute left-0 top-full bg-amber-50 text-amber-800 shadow-lg rounded-2xl w-40 opacity-0 scale-95 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto">
//             <li className="dropdown-transition">
//               <Link
//                 href="/#footer"
//                 className="block px-4 py-2 hover:bg-amber-100 hover:rounded-t-2xl"
//               >
//                 Contact Us
//               </Link>
//             </li>
//             <li className="dropdown-transition">
//               <Link
//                 href="/careers"
//                 className="block px-4 py-2 hover:bg-amber-100"
//               >
//                 Careers
//               </Link>
//             </li>
//             <li className="dropdown-transition">
//               <Link
//                 href="/franchise"
//                 className="block px-4 py-2 hover:bg-amber-100"
//               >
//                 Franchise
//               </Link>
//             </li>
//             <li className="dropdown-transition">
//               <Link
//                 href="/locations"
//                 className="block px-4 py-2 hover:bg-amber-100 hover:rounded-b-2xl"
//               >
//                 Map
//               </Link>
//             </li>
//           </ul>
//         </li>

//         {/* Login Icon / User Menu */}
//         {isLoggedIn ? (
//           <li className="relative" ref={menuRef}>
//             <button
//               className="flex items-center p-1 rounded-full hover:ring-2 hover:ring-amber-800 transition-all"
//               onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
//             >
//               {session.user?.image ? ( // <-- Check if user has an avatar (NextAuth stores it in `image`)
//                 <Image
//                   src={session.user.image}
//                   alt="User Avatar"
//                   width={28}
//                   height={28}
//                   className="rounded-full"
//                 />
//               ) : (
//                 <UserRound size={24} /> // <-- Fallback to the default icon
//               )}
//             </button>
//             <ul
//               className={`absolute right-5 top-full bg-amber-50 text-amber-800 shadow-lg rounded-xl w-48 transition-all duration-300 ${
//                 isProfileMenuOpen
//                   ? "opacity-100 scale-100 pointer-events-auto"
//                   : "opacity-0 scale-95 pointer-events-none"
//               }`}
//             >
//               <li className="dropdown-transition">
//                 <Link
//                   href="/orders"
//                   className="block px-4 py-2 hover:bg-amber-100 rounded-t-xl"
//                   onClick={() => setIsProfileMenuOpen(false)}
//                 >
//                   Previous Orders
//                 </Link>
//               </li>
//               <li className="dropdown-transition">
//                 <button
//                   className="w-full text-left block px-4 py-2 hover:bg-amber-100"
//                   onClick={openEditModal}
//                 >
//                   Edit Profile
//                 </button>
//               </li>
//               <li className="mt-4 border-t border-amber-800 mx-4 h-1 mb-0 pb-0"></li>
//               <li className="dropdown-transition flex justify-between items-center hover:bg-amber-100 rounded-b-xl">
//                 <button
//                   onClick={() => {
//                     signOut({ callbackUrl: "/" });
//                     setIsProfileMenuOpen(false);
//                   }}
//                   className="w-full text-left block px-4 py-2 rounded-b-xl text-md"
//                 >
//                   Sign Out
//                 </button>
//                 <LogOut size={20} className="mr-4" />
//               </li>
//             </ul>
//           </li>
//         ) : (
//           <li className="transition-colors duration-300 hover:text-amber-600">
//             <button onClick={openModal} className="flex items-center">
//               <LogIn size={24} />
//             </button>
//           </li>
//         )}

//         {/* Cart Icon with Indicator */}
//         <li className="relative transition-colors duration-300 hover:text-amber-600">
//           {isLoggedIn ? (
//             <Link href="/cart" className="flex items-center">
//               <ShoppingCart size={24} />
//             </Link>
//           ) : (
//             <button onClick={openModal} className="flex items-center">
//               <ShoppingCart size={24} />
//             </button>
//           )}
//           {isLoggedIn && cartItemCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full text-center leading-none">
//               {cartItemCount}
//             </span>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;
