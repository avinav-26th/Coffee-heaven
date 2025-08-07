import AboutUs from "@/components/AboutUs";
import Carousel from "@/components/Carousel";
import Gallery from "@/components/GalleryCarousel";
import OurMenu from "@/components/OurMenu";


export default function Home() {
  
  return (
    <div className="flex flex-col relative w-full bg-[#fffbf0]">
      <div id="home" className="min-h-screen w-full pt-[66px]">
        <Carousel />
      </div>
      <div id="menu" className="min-h-screen w-full pt-16">
        <OurMenu />
      </div>
      <div id="about" className="min-h-screen w-full pt-16">
        <AboutUs />
      </div>
      <div id="gallery" className="min-h-screen w-full pt-16">
        <Gallery />
      </div>
    </div>
  );
}
