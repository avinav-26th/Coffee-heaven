// components/Map.js
"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default icon issue with Leaflet and Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to update the map center dynamically
const MapUpdater = ({ coordinates }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coordinates, 13, { animate: true });
  }, [coordinates, map]);
  return null;
};

export default function Map({ locations, activeLocation, setActiveLocation }) {
  // Dynamically import Fullscreen control only on the client-side
  useEffect(() => {
    import('leaflet.fullscreen').then(L => {
      // This part of the code will only run in the browser
    });
  }, []);

  return (
    <MapContainer
      center={activeLocation}
      zoom={13}
      className="w-full h-[90%] rounded-2xl shadow-sm border-amber-950 border-2"
      fullscreenControl={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapUpdater coordinates={activeLocation} />
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={loc.coordinates}
          eventHandlers={{
            click: () => setActiveLocation(loc.coordinates),
          }}
        >
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}