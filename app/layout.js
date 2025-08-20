// app/layout.js
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppFloatingBtn";
import ScrollToTopBtn from "@/components/ScrollToTopBtn";
import Providers from "@/components/Providers";
import CartInitializer from '@/components/CartInitializer';

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mplus",
});

export const metadata = {
  title: "Coffee Heaven",
  description: "Made with love by Avii",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth font-mplus">
      <body className={`${mPlusRounded.variable} antialiased`}>
        <Providers>
          <CartInitializer />
          <NavBar />
          {children}
          <Footer />
          <ScrollToTopBtn />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}



// // app/layout.js
// import { M_PLUS_Rounded_1c } from "next/font/google";
// import "./globals.css";
// import NavBar from "@/components/NavBar";
// import Footer from "@/components/Footer";
// import WhatsAppButton from "@/components/WhatsAppFloatingBtn";
// import ScrollToTopBtn from "@/components/ScrollToTopBtn";
// import Providers from "@/components/Providers";
// import CartInitializer from '@/components/CartInitializer';
// import dynamic from "next/dynamic"; // <-- Import dynamic

// // Lazy load the modals. ssr: false means they will only be rendered on the client side.
// const AuthModal = dynamic(() => import('@/components/AuthModal'), { ssr: false });
// const EditProfileModal = dynamic(() => import('@/components/EditProfileModal'), { ssr: false });
// const ReviewModal = dynamic(() => import('@/components/ReviewModal'), { ssr: false });

// const mPlusRounded = M_PLUS_Rounded_1c({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   variable: "--font-mplus",
// });

// export const metadata = {
//   title: "Coffee Heaven",
//   description: "Made with love by Avii",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className="scroll-smooth font-mplus">
//       <body className={`${mPlusRounded.variable} antialiased`}>
//         <Providers>
//           <CartInitializer />
//           <NavBar />
//           <AuthModal />
//           <EditProfileModal />
//           <ReviewModal />
//           {children}
//           <Footer />
//           <ScrollToTopBtn />
//           <WhatsAppButton />
//         </Providers>
//       </body>
//     </html>
//   );
// }




// import { M_PLUS_Rounded_1c } from "next/font/google";
// import "./globals.css";
// import NavBar from "@/components/NavBar";
// import Footer from "@/components/Footer";
// import WhatsAppButton from "@/components/WhatsAppFloatingBtn";
// import ScrollToTopBtn from "@/components/ScrollToTopBtn";
// import AuthModal from "@/components/AuthModal";
// import Providers from "@/components/Providers";
// import EditProfileModal from "@/components/EditProfileModal";
// import CartInitializer from '@/components/CartInitializer';
// import ReviewModal from "@/components/ReviewModal";

// const mPlusRounded = M_PLUS_Rounded_1c({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   variable: "--font-mplus",
// });

// export const metadata = {
//   title: "Coffee Heaven",
//   description: "Made with love by Avii",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className="scroll-smooth font-mplus">
//       <body className={`${mPlusRounded.variable} antialiased`}>
//         <Providers>
//           <CartInitializer />
//           <NavBar />
//           <AuthModal />
//           <EditProfileModal />
//           <ReviewModal />
//           {children}
//           <Footer />
//           <ScrollToTopBtn />
//           <WhatsAppButton />
//         </Providers>
//       </body>
//     </html>
//   );
// }



