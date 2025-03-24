import React from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Map controller component to handle center and zoom changes
function MapController({ center, zoom }) {
  const map = useMap();

  React.useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

const MapView = ({
  onLocationClick,
  center = [20, 120],
  zoom = 3,
  focusedRisk = null,
  keyRisks = [],
}) => {
  // Shipping routes - only shown when a risk is focused (following sea paths)
  const shippingRoutes = {
    taiwan: [
      {
        name: "East Asia-US Route",
        path: [
          [24.25, 119.5], // Taiwan Strait
          [22.3193, 124.1694], // East of Taiwan
          [28.509, 135.7842], // Pacific waypoint
          [35.509, 139.7842], // South of Japan
          [35.0, 160.0], // Mid-Pacific waypoint
          [38.0, 180.0], // International Date Line
          [40.0, 200.0], // North Pacific
          [38.0, 220.0], // North Pacific approaching US
          [33.7701, -118.1937 + 360], // Los Angeles (adjusted to right side)
        ],
        color: "#FF0000", // Red
        affectedVolume: "32% of East Asia traffic",
        relatedPoints: ["Taiwan Strait", "Tokyo Bay", "Los Angeles"],
      },
      {
        name: "Taiwan-Europe Route",
        path: [
          [24.25, 119.5], // Taiwan Strait
          [21.0, 118.0], // South of Taiwan
          [18.0, 114.0], // South China Sea
          [12.0, 110.0], // Vietnam coast (south)
          [8.0, 106.0], // Vietnam coast (further south)
          [5.0, 104.0], // Approaching Singapore
          [1.3521, 103.8198], // Singapore
          [0.8, 102.5], // Malacca Strait
          [0.0, 100.0], // Malacca Strait (west)
          [-2.0, 97.0], // South of Sumatra
          [-5.0, 90.0], // Indian Ocean
          [-2.0, 80.0], // Indian Ocean (north)
          [5.0, 75.0], // Indian Ocean approaching Arabian Sea
          [10.0, 70.0], // Arabian Sea
          [12.0, 60.0], // Arabian Sea west
          [12.0, 50.0], // Gulf of Aden approach
          [12.5, 45.0], // Gulf of Aden
          [15.0, 42.0], // Red Sea (south)
          [20.0, 38.0], // Red Sea (mid)
          [25.0, 35.0], // Red Sea (north)
          [30.0, 32.5795], // Suez Canal
          [31.5, 30.0], // Northern Egypt coast
          [33.0, 28.0], // Mediterranean Sea approaching Egypt
          [35.0, 25.0], // Mediterranean approaching Crete
          [36.0, 20.0], // Mediterranean Sea east of Sicily
          [38.0, 15.0], // Mediterranean Sea (central)
          [39.0, 10.0], // Tyrrhenian Sea
          [40.0, 6.0], // Western Mediterranean
          [39.5, 3.0], // Balearic Sea
          [38.0, 0.0], // Spanish Mediterranean coast
          [37.0, -3.0], // South of Spain
          [36.0, -5.0], // Gibraltar Strait
          [36.0, -6.0], // Exiting Gibraltar
          [36.0, -8.0], // South Portugal
          [39.0, -10.0], // Portugal coast
          [43.0, -9.0], // Northwest Spain coast
          [44.0, -3.0], // Bay of Biscay
          [48.0, -5.0], // Bay of Biscay
          [50.0, -2.0], // English Channel approach
          [50.0, 2.0], // English Channel
          [51.9244, 4.4777], // Rotterdam
        ],
        color: "#00BFFF", // Deep Sky Blue
        affectedVolume: "41% of Asia-Europe trade",
        relatedPoints: [
          "Taiwan Strait",
          "Singapore",
          "Suez Canal",
          "Rotterdam",
        ],
      },
      {
        name: "Taiwan-Middle East Route",
        path: [
          [24.25, 119.5], // Taiwan Strait
          [21.0, 118.0], // South of Taiwan
          [18.0, 114.0], // South China Sea
          [12.0, 110.0], // Vietnam coast (south)
          [8.0, 106.0], // Vietnam coast (further south)
          [5.0, 104.0], // Approaching Singapore
          [1.3521, 103.8198], // Singapore
          [0.8, 102.5], // Malacca Strait
          [0.0, 100.0], // Malacca Strait (west)
          [-2.0, 97.0], // South of Sumatra
          [-5.0, 90.0], // Indian Ocean
          [-2.0, 80.0], // Indian Ocean (north)
          [5.0, 75.0], // Indian Ocean approaching Arabian Sea
          [10.0, 70.0], // Arabian Sea
          [15.0, 65.0], // Arabian Sea north
          [18.0, 62.0], // Arabian Sea (northwest)
          [20.0, 60.0], // Approaching Hormuz
          [22.5, 59.5], // Oman coast
          [24.5, 58.0], // UAE coast approach
          [26.5, 56.25], // Strait of Hormuz
        ],
        color: "#9932CC", // Dark Orchid
        affectedVolume: "35% of oil imports",
        relatedPoints: ["Taiwan Strait", "Singapore", "Strait of Hormuz"],
      },
      {
        name: "Taiwan-Australia Route",
        path: [
          [24.25, 119.5], // Taiwan Strait
          [21.0, 118.0], // South of Taiwan
          [18.0, 114.0], // South China Sea
          [12.0, 110.0], // Vietnam coast (south)
          [8.0, 106.0], // Vietnam coast (further south)
          [5.0, 104.0], // Approaching Singapore
          [1.3521, 103.8198], // Singapore
          [0.0, 104.5], // South of Singapore
          [-3.0, 105.0], // Java Sea
          [-6.0, 108.0], // Java Sea
          [-6.5, 114.0], // Bali Sea
          [-10.5, 120.0], // Flores Sea
          [-10.5, 122.0], // Banda Sea
          [-12.0, 135.0], // Arafura Sea
          [-11.0, 143.0], // Gulf of Carpentaria (north)
          [-16.0, 146.0], // Coral Sea
          [-20.0, 152.0], // East coast waters
          [-25.0, 153.5], // East coast waters
          [-30.0, 154.0], // East coast of Australia
          [-33.0, 152.0], // Approaching Sydney
          [-33.8523, 151.1782], // Sydney
        ],
        color: "#32CD32", // Lime Green
        affectedVolume: "22% of Pacific shipping",
        relatedPoints: ["Taiwan Strait", "Singapore", "Sydney"],
      },
    ],
    hormuz: [
      {
        name: "Middle East-Asia Route",
        path: [
          [26.5, 56.25], // Strait of Hormuz
          [25.0, 59.0], // Gulf of Oman
          [22.0, 64.0], // Arabian Sea
          [18.0, 70.0], // Northern Arabian Sea
          [12.0, 75.0], // Western Indian Ocean
          [8.0, 78.0], // Southern India coast
          [6.0, 82.0], // Sri Lanka (north)
          [5.0, 88.0], // Bay of Bengal
          [5.0, 95.0], // Approaching Indonesia waters
          [6.0, 96.0], // West of Sumatra
          [0.8, 102.5], // Malacca Strait
          [1.3521, 103.8198], // Singapore
          [5.0, 107.0], // South China Sea
          [10.0, 112.0], // South China Sea
          [15.0, 115.0], // Approaching Taiwan
          [20.0, 118.0], // Approaching Taiwan Strait
          [24.25, 119.5], // Taiwan Strait
        ],
        color: "#FF7F00", // Orange
        affectedVolume: "65% of Asia oil imports",
        relatedPoints: ["Strait of Hormuz", "Singapore", "Taiwan Strait"],
      },
      {
        name: "Middle East-Europe Route",
        path: [
          [26.5, 56.25], // Strait of Hormuz
          [20, 62],
          [16.5, 58.25], // Strait of Hormuz
          [15.5, 54.5], // Persian Gulf
          [14.5, 52.5], // UAE coast
          [13.5, 50.0], // Saudi coast
          [13.0, 47.0], // Open water south of Saudi
          [12.0, 44.0], // Open water approaching Red Sea
          [15.0, 42.0], // Red Sea entrance
          [20.0, 38.5], // Red Sea
          [24.0, 36.5], // Red Sea
          [26.0, 35.0], // Northern Red Sea
          [28.0, 33.5], // Gulf of Suez
          [30.0, 32.5795], // Suez Canal
          [31.5, 30.0], // Northern Egypt coast
          [33.0, 28.0], // Mediterranean Sea approaching Egypt
          [35.0, 25.0], // Mediterranean approaching Crete
          [36.0, 20.0], // Mediterranean Sea east of Sicily
          [38.0, 15.0], // Mediterranean Sea (central)
          [39.0, 10.0], // Tyrrhenian Sea
          [40.0, 6.0], // Western Mediterranean
          [39.5, 3.0], // Balearic Sea
          [38.0, 0.0], // Spanish Mediterranean coast
          [37.0, -3.0], // South of Spain
          [36.0, -5.0], // Gibraltar Strait
          [36.0, -6.0], // Exiting Gibraltar
          [36.0, -8.0], // South Portugal
          [39.0, -10.0], // Portugal coast
          [43.0, -9.0], // Northwest Spain coast
          [44.0, -3.0], // Bay of Biscay
          [48.0, -5.0], // Bay of Biscay
          [50.0, -2.0], // English Channel approach
          [50.0, 2.0], // English Channel
          [51.9244, 4.4777], // Rotterdam
        ],
        color: "#4169E1", // Royal Blue
        affectedVolume: "43% of European oil imports",
        relatedPoints: ["Strait of Hormuz", "Suez Canal", "Rotterdam"],
      },
      {
        name: "Gulf-India Route",
        path: [
          [26.5, 56.25], // Strait of Hormuz
          [25.0, 59.0], // Gulf of Oman
          [24.0, 62.0], // Arabian Sea
          [23.0, 65.0], // Arabian Sea approaching India
          [21.0, 68.0], // Northwestern Indian coast
          [20.0, 70.0], // Approaching Mumbai
          [18.9548, 72.8288], // Mumbai
        ],
        color: "#FF1493", // Deep Pink
        affectedVolume: "52% of India's oil imports",
        relatedPoints: ["Strait of Hormuz", "Mumbai"],
      },
    ],
    suez: [
      {
        name: "Europe-Asia Route",
        path: [
          [51.9244, 4.4777], // Rotterdam
          [50.0, 2.0], // English Channel
          [48.0, 0.0], // English Channel exit
          [46.0, -5.0], // Bay of Biscay
          [43.0, -9.0], // Northwest Spain coast
          [39.0, -10.0], // Portugal coast
          [36.0, -8.0], // South Portugal
          [36.0, -6.0], // Approaching Gibraltar
          [36.0, -5.0], // Gibraltar Strait
          [36.5, -2.0], // Mediterranean (southwest)
          [38.0, 0.0], // Spanish Mediterranean coast
          [39.5, 3.0], // Balearic Sea
          [40.0, 6.0], // Western Mediterranean
          [39.0, 10.0], // Tyrrhenian Sea
          [38.0, 15.0], // Mediterranean Sea (central)
          [36.0, 20.0], // Mediterranean Sea east of Sicily
          [35.0, 25.0], // Mediterranean approaching Crete
          [33.0, 28.0], // Mediterranean approaching Egypt
          [31.5, 30.0], // Northern Egypt coast
          [30.0, 32.5795], // Suez Canal
          [27.0, 34.0], // Red Sea (north)
          [24.0, 36.0], // Red Sea
          [20.0, 38.0], // Red Sea (central)
          [15.0, 41.0], // Red Sea (south)
          [12.5, 45.0], // Gulf of Aden (west)
          [12.0, 50.0], // Gulf of Aden (east)
          [10.0, 55.0], // Arabian Sea (west)
          [8.0, 65.0], // Arabian Sea
          [5.0, 75.0], // Indian Ocean
          [0.0, 85.0], // Indian Ocean (east)
          [-2.0, 95.0], // Approaching Indonesia
          [0.0, 100.0], // Approaching Singapore
          [0.8, 102.5], // Malacca Strait
          [1.3521, 103.8198], // Singapore
          [5.0, 107.0], // South China Sea
          [10.0, 113.0], // South China Sea (north)
          [15.0, 116.0], // Approaching Taiwan
          [20.0, 118.0], // Approaching Taiwan Strait
          [24.25, 119.5], // Taiwan Strait
        ],
        color: "#1E90FF", // Dodger Blue
        affectedVolume: "37% of container shipping",
        relatedPoints: [
          "Rotterdam",
          "Suez Canal",
          "Singapore",
          "Taiwan Strait",
        ],
      },
      {
        name: "Europe-Middle East Route",
        path: [
          [51.9244, 4.4777], // Rotterdam
          [50.0, 2.0], // English Channel
          [48.0, 0.0], // English Channel exit
          [46.0, -5.0], // Bay of Biscay
          [43.0, -9.0], // Northwest Spain coast
          [39.0, -10.0], // Portugal coast
          [36.0, -8.0], // South Portugal
          [36.0, -6.0], // Approaching Gibraltar
          [36.0, -5.0], // Gibraltar Strait
          [36.5, -2.0], // Mediterranean (southwest)
          [38.0, 0.0], // Spanish Mediterranean coast
          [39.5, 3.0], // Balearic Sea
          [40.0, 6.0], // Western Mediterranean
          [39.0, 10.0], // Tyrrhenian Sea
          [38.0, 15.0], // Mediterranean Sea (central)
          [36.0, 20.0], // Mediterranean Sea east of Sicily
          [35.0, 25.0], // Mediterranean approaching Crete
          [33.0, 28.0], // Mediterranean approaching Egypt
          [31.5, 30.0], // Northern Egypt coast
          [30.0, 32.5795], // Suez Canal
          [28.0, 33.5], // Gulf of Suez
          [26.0, 35.0], // Northern Red Sea
          [24.0, 36.5], // Red Sea
          [22.0, 38.5], // Red Sea
          [18.0, 41.0], // Southern Red Sea
          [14.0, 42.5], // Bab-el-Mandeb Strait
          [12.5, 45.0], // Gulf of Aden (west)
          [14.0, 50.0], // Gulf of Aden (east)
          [14.0, 50.0], // Arabian Sea (southwest)
          [20.0, 59.0], // Approaching Hormuz
          [22.0, 60.0], // Approaching Hormuz
          [24.5, 58.0], // UAE coast
          [26.5, 56.25], // Strait of Hormuz
        ],
        color: "#9400D3", // Dark Violet
        affectedVolume: "45% of Mediterranean shipping",
        relatedPoints: ["Rotterdam", "Suez Canal", "Strait of Hormuz"],
      },
    ],
  };

  // Define non-key risk locations - adding locations for right side routes
  const regularLocations = [
    // Major ports
    { name: "Singapore", lat: 1.3521, lon: 103.8198, risk: 45, size: "major" },
    { name: "Rotterdam", lat: 51.9244, lon: 4.4777, risk: 32, size: "major" },
    {
      name: "Panama Canal",
      lat: 9.08,
      lon: -79.68 + 360,
      risk: 34,
      size: "major",
    }, // Right side
    {
      name: "Strait of Malacca",
      lat: 2.5,
      lon: 101.0,
      risk: 39,
      size: "major",
    },
    {
      name: "Los Angeles",
      lat: 33.7701,
      lon: -118.1937 + 360,
      risk: 41,
      size: "major",
    }, // Right side
    { name: "Shanghai", lat: 31.2304, lon: 121.4737, risk: 36, size: "major" },

    // Minor ports
    { name: "Tokyo Bay", lat: 35.509, lon: 139.7842, risk: 34, size: "minor" },
    { name: "Hong Kong", lat: 22.3193, lon: 114.1694, risk: 22, size: "minor" },
    { name: "Busan", lat: 35.1333, lon: 129.05, risk: 38, size: "minor" },
    { name: "Sydney", lat: -33.8523, lon: 151.1782, risk: 22, size: "minor" },
    {
      name: "New York",
      lat: 40.6643,
      lon: -74.097 + 360,
      risk: 45,
      size: "minor",
    }, // Right side
    { name: "Mumbai", lat: 18.9548, lon: 72.8288, risk: 47, size: "minor" },
    { name: "Dubai", lat: 25.2048, lon: 55.2708, risk: 42, size: "minor" },
    { name: "Jakarta", lat: -6.2088, lon: 106.8456, risk: 33, size: "minor" },
    { name: "Manila", lat: 14.5995, lon: 120.9842, risk: 39, size: "minor" },
    {
      name: "Vancouver",
      lat: 49.2827,
      lon: -123.1207 + 360,
      risk: 28,
      size: "minor",
    }, // Right side
    {
      name: "Santos",
      lat: -23.9608,
      lon: -46.3222 + 360,
      risk: 37,
      size: "minor",
    }, // Right side
    { name: "Lagos", lat: 6.455, lon: 3.3841, risk: 21, size: "minor" },
    { name: "Piraeus", lat: 37.9422, lon: 23.6483, risk: 31, size: "minor" },
    {
      name: "Melbourne",
      lat: -37.8136,
      lon: 144.9631,
      risk: 24,
      size: "minor",
    },
  ];

  // Hard-coded color mapping for key risk areas
  const getKeyRiskColor = (riskId) => {
    switch (riskId) {
      case "taiwan":
        return "#FF0000"; // Red
      case "hormuz":
        return "#FFFF00"; // Yellow
      case "suez":
        return "#FFFF00"; // Yellow
      default:
        return "#00FF00"; // Default green
    }
  };

  // Pre-process key risk locations with fixed colors
  const keyRiskLocations = keyRisks.map((risk) => ({
    name: risk.name,
    lat: risk.coordinates[0],
    lon: risk.coordinates[1],
    risk: risk.score,
    size: "major",
    isKeyRisk: true,
    keyRiskId: risk.id,
    hasDetailPage: risk.hasDetailPage,
    // Always use our hard-coded colors
    color: getKeyRiskColor(risk.id),
  }));

  // Get active routes for the current focused risk
  const getActiveRoutes = () => {
    if (!focusedRisk) return [];

    // Get routes for this risk
    const routes = shippingRoutes[focusedRisk] || [];

    // Limit the number of routes shown to simplified counts
    const routeLimits = {
      taiwan: 4,
      hormuz: 3,
      suez: 2,
    };

    const limit = routeLimits[focusedRisk] || routes.length;
    return routes.slice(0, limit);
  };

  // Get active routes using the new function
  const activeRoutes = getActiveRoutes();

  // Get related point names from active routes
  const getRelatedPointNames = () => {
    const pointNames = new Set();

    activeRoutes.forEach((route) => {
      route.relatedPoints.forEach((point) => {
        pointNames.add(point);
      });
    });

    return Array.from(pointNames);
  };

  // Get visible regular locations (non-key risks)
  const visibleRegularLocations = !focusedRisk
    ? regularLocations
    : regularLocations.filter((loc) =>
        getRelatedPointNames().includes(loc.name)
      );

  // Function to handle location click
  const handleLocationClick = (location) => {
    console.log("Location clicked:", location.name);
    if (onLocationClick) {
      onLocationClick(location);
    }
  };

  // Get marker size with simplified logic
  const getMarkerSize = (location) => {
    if (location.isKeyRisk) {
      return location.keyRiskId === "taiwan" ? 22 : 18;
    }
    return location.size === "major" ? 12 : 8;
  };

  // Helper function to adjust route to avoid going across the map seam
  // and generate smooth lines for ship routes WITHOUT RANDOM VARIATIONS
  const getAdjustedRoutePath = (path) => {
    // Make a deep copy to avoid modifying the original
    const adjustedPath = path.map((point) => [...point]);

    // Create a smooth path with more points between each segment
    const smoothPath = [];

    for (let i = 0; i < adjustedPath.length - 1; i++) {
      const [lat1, lon1] = adjustedPath[i];
      const [lat2, lon2] = adjustedPath[i + 1];

      // Add the starting point
      smoothPath.push([lat1, lon1]);

      // Add intermediate points for a smoother curve - NO RANDOM VARIATION
      const points = 4; // More intermediate points for smoother curves
      for (let j = 1; j < points; j++) {
        const ratio = j / points;

        // Linear interpolation for latitude and longitude
        const lat = lat1 + ratio * (lat2 - lat1);
        const lon = lon1 + ratio * (lon2 - lon1);

        // No random variation to ensure routes don't cross land
        smoothPath.push([lat, lon]);
      }
    }

    // Add the final point
    smoothPath.push(adjustedPath[adjustedPath.length - 1]);

    return smoothPath;
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        minZoom={2}
        maxZoom={10}
        worldCopyJump={true}
        maxBoundsViscosity={1.0}
        maxBounds={[
          [-90, -360],
          [90, 360],
        ]}>
        <MapController center={center} zoom={zoom} />

        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          noWrap={false}
        />

        {/* Draw shipping routes when a risk is focused */}
        {activeRoutes.map((route, index) => (
          <Polyline
            key={`route-${index}`}
            positions={getAdjustedRoutePath(route.path)}
            color={route.color}
            weight={3}
            opacity={0.8}
            dashArray="5, 10"
            smoothFactor={1}
            pathOptions={{
              className: "route-path",
              interactive: true,
            }}>
            <Tooltip
              sticky={true}
              direction="auto"
              offset={[0, -10]}
              opacity={0.9}
              permanent={false}
              className="route-tooltip">
              <div className="p-2">
                <strong className="text-lg">{route.name}</strong>
                <br />
                <span className="text-sm">
                  Affected Volume: {route.affectedVolume}
                </span>
              </div>
            </Tooltip>
          </Polyline>
        ))}

        {/* Draw regular (non-key risk) location markers */}
        {visibleRegularLocations.map((location, index) => (
          <CircleMarker
            key={`reg-${index}`}
            center={[location.lat, location.lon]}
            radius={getMarkerSize(location)}
            fillColor={location.risk >= 50 ? "#FFFF00" : "#00FF00"}
            stroke={true}
            color="#000000"
            weight={0.3}
            fillOpacity={0.9}
            eventHandlers={{
              click: () => handleLocationClick(location),
            }}>
            <Tooltip>
              <div>
                <strong>{location.name}</strong>
                <br />
                Risk Level: {location.risk}/100
              </div>
            </Tooltip>
          </CircleMarker>
        ))}

        {/* Draw key risk markers SEPARATELY to ensure proper colors */}
        {keyRiskLocations.map((location, index) => (
          <CircleMarker
            key={`key-${index}`}
            center={[location.lat, location.lon]}
            radius={getMarkerSize(location)}
            fillColor={location.color}
            stroke={true}
            color="#000000"
            weight={0.5}
            fillOpacity={0.9}
            eventHandlers={{
              click: () => handleLocationClick(location),
            }}>
            <Tooltip>
              <div>
                <strong>{location.name}</strong>
                <br />
                Risk Level: {location.risk}/100
                <div>
                  <strong>Key Risk Area</strong>
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}

        {/* Add highlight circle around focused risk */}
        {keyRiskLocations
          .filter((loc) => loc.keyRiskId === focusedRisk)
          .map((location, index) => (
            <CircleMarker
              key={`highlight-${index}`}
              center={[location.lat, location.lon]}
              radius={30}
              fillColor="rgba(255, 87, 51, 0.2)"
              color="#FF5733"
              weight={1}
              opacity={0.7}
              fillOpacity={0.5}
              eventHandlers={{
                click: () => handleLocationClick(location),
              }}
            />
          ))}
      </MapContainer>

      {/* Legend overlay */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md z-[1000]">
        <h3 className="font-semibold text-sm mb-2">Risk Legend</h3>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <span className="text-xs">Critical Risk (80-100)</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-yellow-300 mr-2"></div>
          <span className="text-xs">Elevated Risk (50-79)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span className="text-xs">Normal Risk (0-49)</span>
        </div>
      </div>

      {/* Route count when a risk is focused */}
      {focusedRisk && (
        <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md z-[1000]">
          <h3 className="font-semibold text-sm mb-2">
            {keyRisks.find((r) => r.id === focusedRisk)?.name} Impact
          </h3>
          <div className="text-xs">
            Showing {activeRoutes.length} affected shipping corridors
          </div>
        </div>
      )}

      {/* Add custom CSS for enhanced route hover detection */}
      <style jsx>{`
        /* Increase the hover area for polylines */
        :global(.route-path) {
          cursor: pointer;
          stroke-linecap: round;
          stroke-width: 50px !important;
          pointer-events: stroke;
        }

        /* Style for the tooltip */
        :global(.route-tooltip) {
          border-radius: 4px;
          border-width: 2px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default MapView;
