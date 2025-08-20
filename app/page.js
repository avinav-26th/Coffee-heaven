// app/page.js
import { Suspense } from 'react';
import AboutUs from "@/components/AboutUs";
import Carousel from "@/components/Carousel";
import Gallery from "@/components/GalleryCarousel";
import MenuClient from "@/components/MenuClient";
import menuCategories from "@/lib/menuData";
import MenuSkeleton from '@/components/MenuSkeleton';

async function MenuDataWrapper() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/reviews/summary`, { cache: 'no-store' });
  const data = await res.json();
  const reviewSummary = data.summary;

  return <MenuClient menuCategories={menuCategories} reviewSummary={reviewSummary} />;
}

export default function Home() {
  return (
    <div className="flex flex-col relative w-full bg-[#fffbf0]">
      <div id="home" className="min-h-screen w-full pt-[66px]">
        <Carousel />
      </div>

      <Suspense fallback={<MenuSkeleton />}>
        <div id="menu" className="min-h-screen w-full pt-16">
          <MenuDataWrapper />
        </div>
      </Suspense>

      <div id="about" className="min-h-screen w-full pt-16">
        <AboutUs />
      </div>
      <div id="gallery" className="min-h-screen w-full pt-16">
        <Gallery />
      </div>
    </div>
  );
}






// import AboutUs from "@/components/AboutUs";
// import Carousel from "@/components/Carousel";
// import Gallery from "@/components/GalleryCarousel";
// import OurMenu from "@/components/OurMenu";


// export default function Home() {
  
//   return (
//     <div className="flex flex-col relative w-full bg-[#fffbf0]">
//       <div id="home" className="min-h-screen w-full pt-[66px]">
//         <Carousel />
//       </div>
//       <div id="menu" className="min-h-screen w-full pt-16">
//         <OurMenu />
//       </div>
//       <div id="about" className="min-h-screen w-full pt-16">
//         <AboutUs />
//       </div>
//       <div id="gallery" className="min-h-screen w-full pt-16">
//         <Gallery />
//       </div>
//     </div>
//   );
// }
