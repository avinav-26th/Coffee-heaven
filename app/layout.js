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
