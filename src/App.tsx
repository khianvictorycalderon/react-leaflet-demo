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

import {
  TILE_URL_LIGHT,
  TILE_URL_DARK,
  TILE_ATTRIBUTION,
} from "./leaflet";

type Theme = "light" | "dark";

function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => clearTimeout(timer);
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
      setPosition(e.latlng);
    },

    contextmenu() {
      setPosition(null);
    },
  });

  return null;
}

export default function App() {
  const [position, setPosition] = useState<LatLng | null>(null);

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "dark" ? "dark" : "light";
  });

  const defaultPosition: [number, number] = [13.9411, 121.6236];

  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark",
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light",
    );
  };

  const tileUrl =
    theme === "light" ? TILE_URL_LIGHT : TILE_URL_DARK;

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-100 px-4 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
      <div className="mb-4 flex w-full max-w-[600px] items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Vite React + Tailwind CSS
          </h1>

          <p className="text-gray-600 italic dark:text-gray-400">
            Leaflet Click Demo
          </p>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      <div className="h-[400px] w-[600px] max-w-full overflow-hidden rounded-lg shadow-lg">
        <MapContainer
          center={defaultPosition}
          zoom={14}
          className="h-full w-full"
        >
          <ResizeMap />

          <TileLayer
            key={theme}
            attribution={TILE_ATTRIBUTION}
            url={tileUrl}
          />

          <MapClickHandler setPosition={setPosition} />

          {position && (
            <Marker position={position}>
              <Popup>
                <strong>Pinned Location 📍</strong>
                <br />
                Lat: {position.lat.toFixed(6)}
                <br />
                Lng: {position.lng.toFixed(6)}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Left-click to pin a location • Right-click to remove
      </p>
    </div>
  );
}