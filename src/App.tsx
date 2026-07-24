import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { LatLng } from "leaflet";

function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
}

function MapClickHandler({
  setPosition,
}: {
  setPosition: (position: LatLng | null) => void;
}) {
  useMapEvents({
    click(e) {
      // Left click -> add/move pin
      setPosition(e.latlng);
    },

    contextmenu() {
      // Right click -> remove pin
      setPosition(null);
    },
  });

  return null;
}

export default function App() {
  const [position, setPosition] = useState<LatLng | null>(null);

  const defaultPosition: [number, number] = [13.9411, 121.6236];

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-100">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">
          Vite React + Tailwind CSS
        </h1>
        <p className="italic">Leaflet Click Demo</p>
      </div>

      <div className="h-[400px] w-[600px] overflow-hidden rounded-lg shadow-lg">
        <MapContainer
          center={defaultPosition}
          zoom={14}
          className="h-full w-full"
        >
          <ResizeMap />

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler setPosition={setPosition} />

          {position && (
            <Marker position={position}>
              <Popup>
                Pinned Location 📍
                <br />
                Lat: {position.lat.toFixed(6)}
                <br />
                Lng: {position.lng.toFixed(6)}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}