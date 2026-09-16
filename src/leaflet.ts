import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet's default marker icons when using Vite.
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// CARTO API key
const leafletApiKey = import.meta.env.VITE_LEAFLET_API_KEY?.trim();

const tileKeyQuery = leafletApiKey
  ? `?key=${encodeURIComponent(leafletApiKey)}`
  : "";

// Light map
export const TILE_URL_LIGHT =
  `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png${tileKeyQuery}`;

// Dark map
export const TILE_URL_DARK =
  `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png${tileKeyQuery}`;

// Attribution
export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';