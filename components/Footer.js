import React from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-[#fff5e0] w-full min-h-[90vh] rounded-t-[50px] px-5 pt-5 flex flex-col justify-between"
    >
      <span className="footer-tagline text-4xl font-bold pl-[160px] pt-10">
        More Than Coffee, A Haven for the Soul
      </span>
      <div className="footer-sections-container-div mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Contact Us Section */}
        <div className="space-y-4 flex flex-col items-start">
          <h2 className="text-xl font-semibold underline decoration-dashed underline-offset-[6px]">
            Contact Us
          </h2>
          <p className="text-lg font-bold">Coffee Heaven</p>
          <a href="tel:+919876543210" className="footer-item cursor-pointer">
            <Phone size={20} />
            <span>+91 98765 43210</span>
          </a>
          <a
            href="mailto:contact%40coffeeheaven.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-item cursor-pointer"
          >
            <Mail size={20} />
            <span>contact@coffeeheaven.com</span>
          </a>
          <Link href="/pages/locations/#locations">
            <div className=" footer-item">
              <MapPin size={20} />
              <span>123 Cafe Street, Bangalore, India</span>
            </div>
          </Link>
          {/* Swinging Opening Hours Board */}
          <div className="flex flex-col items-center">
            {/* Nail */}
            <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
            <div className="bg-transparent text-[#fff5e0] px-6 pb-5 animate-swing flex flex-col items-center">
              {/* Strings */}
              <div className="relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-[115px] bg-gray-700 origin-top rotate-[-50deg]" />
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0.5 h-[115px] bg-gray-700 origin-top rotate-[50deg]" />
              </div>

              {/* Time Board */}
              <div
                className="px-8 py-5 mt-16 bg-amber-950 shadow-lg flex flex-col items-center justify-center text-center rounded-xl border-2 border-gray-700 relative"
                style={{ transformOrigin: "top center" }}
              >
                <div className="flex items-center mb-2">
                  <Clock size={18} className="inline-block mr-2" />
                  <p className="text-lg font-bold">Open: 8 AM - 10 PM</p>
                </div>
                <p className="text-sm ">Closed on Mondays</p>
              </div>
            </div>
          </div>
        </div>

        {/* Useful Links Section */}
        <div className="flex">
          <div className="w-20"></div>
          <div className="space-y-8 flex flex-col items-start">
            <h2 className="text-xl font-semibold underline decoration-dashed underline-offset-[6px]">
              Useful Links
            </h2>
            <ul className="space-y-2 text-lg">
              <li>
                <Link href="/#about" className="footer-item">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pages/locations/#locations" className="footer-item">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/pages/dummy" className="footer-item">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/pages/dummy" className="footer-item">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/dummy" className="footer-item">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/dummy" className="footer-item">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/dummy" className="footer-item">
                  Support & Care
                </Link>
              </li>
              <li>
                <Link href="/pages/dummy" className="footer-item">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Logo Section */}
        <div className="space-y-6 flex flex-col items-center justify-start">
          <Link href="/#home">
            <img
              src="/images/cafe-logo.png"
              alt="Cafe Logo"
              className="w-48 h-48 object-contain"
            />
          </Link>
          <div className="flex justify-center items-center space-x-4">
            <Link href="https://facebook.com" className="hover:text-amber-700">
              <Facebook size={28} />
            </Link>
            <Link href="https://x.com" className="hover:text-amber-700">
              <Twitter size={28} />
            </Link>
            <Link href="https://instagram.com" className="hover:text-amber-700">
              <Instagram size={28} />
            </Link>
            <Link href="https://linkedin.com" className="hover:text-amber-700">
              <Linkedin size={28} />
            </Link>
          </div>
          <button className="common-button">
            <Link href="/pages/locations/#locations">Get Directions</Link>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-center">Copyright &copy; 2025 </p>
        <span className="rounded-full text-[10px] border-[2.5px] border-black mx-4"></span>{" "}
        <p>Coffee Heaven</p>
        <span className="rounded-full text-[10px] border-[2.5px] border-black mx-4"></span>
        <p>Designed by Avico Apps</p>
      </div>
    </footer>
  );
};

export default Footer;
