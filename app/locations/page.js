// app/locations/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { locations } from "@/lib/locationsData";
import dynamic from "next/dynamic";

// Dynamically import the Map component with ssr turned off
const Map = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="w-full h-[90%] bg-gray-200 rounded-2xl animate-pulse" />
});

export default function LocationsPage() {
  // Safe initialization of state
  const [activeLocation, setActiveLocation] = useState(locations && locations.length > 0 ? locations[0].coordinates : [0, 0]);
  const [selectedLocationId, setSelectedLocationId] = useState(locations && locations.length > 0 ? locations[0].id : null);

  if (!locations || locations.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">No locations available.</div>;
  }

  return (
    <div className="bg-[#fffbf0]" id="locations">
      <div className="container mx-auto px-6 pb-6 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* Left: Locations List (Scrollable) */}
          <div className="md:col-span-2 overflow-y-auto pr-4 pb-8 no-scrollbar">
            <h1 className="text-3xl font-bold mb-10 text-start">
              Have a cup of coffee with us at: {locations.length} outlets!
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-8">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className={`${loc.id === selectedLocationId ? "bg-[#fef3c7]" : "bg-[#fff5e0]"} p-6 rounded-3xl shadow-sm flex flex-col items-start gap-2 cursor-pointer transition-colors`}
                  onClick={() => {
                    setActiveLocation(loc.coordinates);
                    setSelectedLocationId(loc.id);
                  }}
                >
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    width={180}
                    height={150}
                    className="rounded-2xl object-cover w-full h-40"
                  />
                  <h2 className="text-lg font-semibold mt-2">{loc.name}</h2>
                  <p className="text-gray-600 text-sm">{loc.address}</p>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <p className="text-gray-800 font-medium text-sm">{loc.contact}</p>
                  </div>
                  <div className="flex gap-8 mt-1 text-md">
                    <Link
                      href={`http://maps.google.com/maps?q=${loc.coordinates[0]},${loc.coordinates[1]}`}
                      className="text-amber-800 hover:text-amber-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Now
                    </Link>
                    <Link
                      href="https://www.swiggy.com/"
                      target="_blank"
                      className="text-amber-800 hover:text-amber-600"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map Section (Fixed on larger screens) */}
          <div className="md:col-span-1 md:sticky top-24 w-full h-96 md:h-[90%] bg-[#fffbf0] py-4 px-5 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-start">
              Coffee Heaven - Locations
            </h2>
            <Map 
              locations={locations}
              activeLocation={activeLocation}
              setActiveLocation={setActiveLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}







// "use client";
// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import Link from "next/link";
// import Image from "next/image";
// import "leaflet.fullscreen";
// import L from "leaflet";
// import { Phone } from "lucide-react";

// const locations = [
//   {
//     id: 1,
//     name: "Connaught Place - Delhi",
//     address: "ABC Street, Connaught Place, Delhi - 110001",
//     contact: "+91 9876543210",
//     image: "/images/delhi-cp.jpg",
//     coordinates: [28.6328, 77.2197],
//   },
//   {
//     id: 2,
//     name: "Bandra - Mumbai",
//     address: "XYZ Lane, Bandra West, Mumbai - 400050",
//     contact: "+91 8765432109",
//     image: "/images/mumbai-bandra.jpg",
//     coordinates: [19.055, 72.8295],
//   },
//   {
//     id: 3,
//     name: "Koramangala - Bangalore",
//     address: "5th Block, Koramangala, Bangalore - 560034",
//     contact: "+91 9988776655",
//     image: "/images/bangalore-koramangala.jpg",
//     coordinates: [12.9352, 77.6245],
//   },
//   {
//     id: 4,
//     name: "Park Street - Kolkata",
//     address: "Park Street, Kolkata - 700016",
//     contact: "+91 8899776655",
//     image: "/images/kolkata-parkstreet.jpg",
//     coordinates: [22.5522, 88.3526],
//   },
//   {
//     id: 5,
//     name: "MG Road - Pune",
//     address: "MG Road, Camp, Pune - 411001",
//     contact: "+91 7766554433",
//     image: "/images/pune-mgroad.jpg",
//     coordinates: [18.5204, 73.8567],
//   },
//   {
//     id: 6,
//     name: "Gomti Nagar - Lucknow",
//     address: "Vibhuti Khand, Gomti Nagar, Lucknow - 226010",
//     contact: "+91 9988771122",
//     image: "/images/lucknow-gomtinagar.jpg",
//     coordinates: [26.855, 81.023],
//   },
//   {
//     id: 7,
//     name: "Banjara Hills - Hyderabad",
//     address: "Road No. 12, Banjara Hills, Hyderabad - 500034",
//     contact: "+91 7777888899",
//     image: "/images/hyderabad-banjara.jpg",
//     coordinates: [17.414, 78.448],
//   },
//   {
//     id: 8,
//     name: "Anna Nagar - Chennai",
//     address: "2nd Avenue, Anna Nagar, Chennai - 600040",
//     contact: "+91 6655443322",
//     image: "/images/chennai-annanagar.jpg",
//     coordinates: [13.0853, 80.21],
//   },
//   {
//     id: 9,
//     name: "Civil Lines - Jaipur",
//     address: "Civil Lines, Ajmer Road, Jaipur - 302006",
//     contact: "+91 8899001122",
//     image: "/images/jaipur-civil.jpg",
//     coordinates: [26.9124, 75.7873],
//   },
//   {
//     id: 10,
//     name: "Sector 18 - Noida",
//     address: "Near Mall of India, Sector 18, Noida - 201301",
//     contact: "+91 9090909090",
//     image: "/images/noida-sector18.jpg",
//     coordinates: [28.5672, 77.321],
//   },
//   {
//     id: 11,
//     name: "Sector 5 - Gurgaon",
//     address: "DLF Cyber City, Sector 5, Gurgaon - 122001",
//     contact: "+91 9212345678",
//     image: "/images/gurgaon-sector5.jpg",
//     coordinates: [28.4744, 77.0804],
//   },
//   {
//     id: 12,
//     name: "Rajouri Garden - Delhi",
//     address: "Main Market, Rajouri Garden, Delhi - 110027",
//     contact: "+91 9811122233",
//     image: "/images/delhi-rajouri.jpg",
//     coordinates: [28.6417, 77.1241],
//   },
// ];

// // Component to update the map center dynamically
// const MapUpdater = ({ coordinates }) => {
//   const map = useMap();
//   useEffect(() => {
//     map.setView(coordinates, 13, { animate: true });
//   }, [coordinates, map]);
//   return null;
// };

// const LocationsPage = () => {
//   const [activeLocation, setActiveLocation] = useState(
//     locations[0].coordinates
//   );
//   const [selectedLocation, setSelectedLocation] = useState(0);

//   const toggleColor = (locId) => {
//     setSelectedLocation(locId);
//   };

//   return (
//     <div className="bg-[#fffbf0]" id="locations">
//       <div className="container mx-auto px-6 pb-6 pt-24">
//         <div className="grid grid-cols-3 gap-6 h-[600px]">
//           {/* Left: Locations List (Scrollable) */}
//           <div className="col-span-2 overflow-y-auto pr-4 pb-8 no-scrollbar">
//             <h1 className="text-3xl font-bold mb-10 text-start">
//               Have a cup of coffee with us at: 12 outlets in 4 cities!
//             </h1>
//             <div className="grid grid-cols-2 gap-x-5 gap-y-8">
//               {locations.map((loc) => (
//                 <div
//                   key={loc.id}
//                   className={`${
//                     loc.id === selectedLocation
//                       ? "bg-[#fef3c7]"
//                       : "bg-[#fff5e0]"
//                   } p-6 rounded-3xl shadow-sm flex flex-col items-start gap-2 cursor-pointer`}
//                   onClick={() => {
//                     setActiveLocation(loc.coordinates);
//                     toggleColor(loc.id);
//                   }}
//                 >
//                   <Image
//                     src={loc.image}
//                     alt={loc.name}
//                     width={180}
//                     height={150}
//                     className="rounded-2xl object-cover"
//                   />
//                   <h2 className="text-lg font-semibold">{loc.name}</h2>
//                   <p className="text-gray-600 text-sm">{loc.address}</p>
//                   <div className="flex items-center gap-2">
//                     <Phone size={16} />
//                     <p className="text-gray-800 font-medium text-sm">
//                       {" "}
//                       {loc.contact}
//                     </p>
//                   </div>
//                   <div className="flex gap-8 mt-1 text-md">
//                     <Link
//                       href={`https://www.google.com/maps/dir/?api=1&destination=${loc.coordinates[0]},${loc.coordinates[1]}`}
//                       className="text-amber-800 hover:text-amber-600"
//                       target="_blank"
//                     >
//                       Visit Now
//                     </Link>
//                     <Link
//                       href="https://www.swiggy.com/"
//                       target="_blank"
//                       className="text-amber-800 hover:text-amber-600"
//                     >
//                       Order Now
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right: Map Section (Fixed) */}
//           <div className="col-span-1 sticky top-0 w-full h-[90%] bg-[#fffbf0] py-4 px-5 rounded-2xl shadow-lg">
//             <h2 className="text-xl font-semibold mb-4 text-start">
//               Coffee Heaven - Locations
//             </h2>
//             <MapContainer
//               center={activeLocation}
//               zoom={13}
//               className="w-full h-[90%] rounded-2xl shadow-sm border-amber-950 border-2"
//               whenCreated={(map) => {
//                 L.control.fullscreen({ position: "topright" }).addTo(map);
//               }}
//             >
//               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//               <MapUpdater coordinates={activeLocation} />
//               {locations.map((loc) => (
//                 <Marker
//                   key={loc.id}
//                   position={loc.coordinates}
//                   eventHandlers={{
//                     click: () => setActiveLocation(loc.coordinates),
//                   }}
//                 >
//                   <Popup>{loc.name}</Popup>
//                 </Marker>
//               ))}
//             </MapContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationsPage;
