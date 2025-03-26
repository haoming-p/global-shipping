import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import MapView from "./pages/MapView";
import TaiwanDetailView from "./pages/TaiwanDetailView";
import "./App.css";

function App() {
  // State
  const [mapCenter, setMapCenter] = useState([20.0, 120.0]);
  const [mapZoom, setMapZoom] = useState(2);
  const [focusedRisk, setFocusedRisk] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  // Define regular locations (copied from MapView)
  const regularLocations = [
    // Major ports
    { name: "Singapore", lat: 1.3521, lon: 103.8198, risk: 45, size: "major" },
    { name: "Rotterdam", lat: 51.9244, lon: 4.4777, risk: 32, size: "major" },
    { name: "Panama Canal", lat: 9.08, lon: -79.68 + 360, risk: 34, size: "major" },
    { name: "Strait of Malacca", lat: 2.5, lon: 101.0, risk: 39, size: "major" },
    { name: "Los Angeles", lat: 33.7701, lon: -118.1937 + 360, risk: 41, size: "major" },
    { name: "Shanghai", lat: 31.2304, lon: 121.4737, risk: 36, size: "major" },

    // Minor ports
    { name: "Tokyo Bay", lat: 35.509, lon: 139.7842, risk: 34, size: "minor" },
    { name: "Hong Kong", lat: 22.3193, lon: 114.1694, risk: 22, size: "minor" },
    { name: "Busan", lat: 35.1333, lon: 129.05, risk: 38, size: "minor" },
    { name: "Sydney", lat: -33.8523, lon: 151.1782, risk: 22, size: "minor" },
    { name: "New York", lat: 40.6643, lon: -74.097 + 360, risk: 45, size: "minor" },
    { name: "Mumbai", lat: 18.9548, lon: 72.8288, risk: 47, size: "minor" },
    { name: "Dubai", lat: 25.2048, lon: 55.2708, risk: 42, size: "minor" },
    { name: "Jakarta", lat: -6.2088, lon: 106.8456, risk: 33, size: "minor" },
    { name: "Manila", lat: 14.5995, lon: 120.9842, risk: 39, size: "minor" },
    { name: "Vancouver", lat: 49.2827, lon: -123.1207 + 360, risk: 28, size: "minor" },
    { name: "Santos", lat: -23.9608, lon: -46.3222 + 360, risk: 37, size: "minor" },
    { name: "Lagos", lat: 6.455, lon: 3.3841, risk: 21, size: "minor" },
    { name: "Piraeus", lat: 37.9422, lon: 23.6483, risk: 31, size: "minor" },
    { name: "Melbourne", lat: -37.8136, lon: 144.9631, risk: 24, size: "minor" },
  ];

  // Key risk data
  const keyRisks = [
    {
      id: "taiwan",
      name: "Taiwan Strait",
      level: "Critical",
      score: 89,
      color: "red",
      coordinates: [24.25, 119.5],
      affectedRoutes: 4,
      details: [
        "Military tensions increased by 78% in the past quarter, with 23 airspace violations this month",
        "Semiconductor shipments delayed up to 14 days, affecting 65% of global advanced chip supply",
        "Major port cyber attack detected 6 hours ago",
        "Category 5 typhoon expected within 72 hours, threatening key shipping routes",
      ],
      hasDetailPage: true,
    },
    {
      id: "hormuz",
      name: "Strait of Hormuz",
      level: "Elevated",
      score: 67,
      color: "yellow",
      coordinates: [26.5, 56.25],
      affectedRoutes: 3,
      details: [
        "Oil shipping disruption threats rising",
        "43% of global petroleum shipping affected",
        "Regional tensions impacting shipping schedules",
      ],
      hasDetailPage: false,
    },
    {
      id: "suez",
      name: "Suez Canal",
      level: "Elevated",
      score: 58,
      color: "yellow",
      coordinates: [30.0, 32.5795],
      affectedRoutes: 2,
      details: [
        "Capacity constraints affecting transit times",
        "Alternative route adds 14 days to shipping",
        "Weather-related delays increased 22%",
      ],
      hasDetailPage: false,
    },
  ];

  // Filter regular locations based on search query
  const filteredLocations = regularLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset map view
  const resetView = () => {
    setMapCenter([20.0, 120.0]);
    setMapZoom(3);
    setFocusedRisk(null);
  };

  // Focus on specific risk
  const handleRiskFocus = (risk) => {
    setFocusedRisk(risk.id);
    setMapCenter(risk.coordinates);
    setMapZoom(4);
  };

  // Handle location click from the search results
  const handleLocationClick = (location) => {
    setMapCenter([location.lat, location.lon]);
    setMapZoom(5);
    setFocusedRisk(null); // Clear any focused risk
  };

  // Handle opening detail view
  const openDetailView = (riskId) => {
    console.log("Opening detail view for:", riskId);
    if (riskId === "taiwan") {
      // Set state directly without delay
      setShowDetailView(true);
    }
  };

  // Return to main view
  const returnToMainView = () => {
    setShowDetailView(false);
  };

  // Use console log to verify the state
  console.log("Current state - showDetailView:", showDetailView);

  // If detail view is active, show that instead of the main dashboard
  if (showDetailView) {
    console.log("Rendering TaiwanDetailView component");
    return <TaiwanDetailView returnToMainView={returnToMainView} />;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">
          Global Maritime Risk Dashboard Demo
        </h1>
        <p className="text-sm">Last updated: {currentDate}</p>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Key Risk Areas</h2>
            <button
              onClick={resetView}
              className="py-1 px-2 bg-gray-200 text-gray-700 text-sm rounded border border-gray-300 hover:bg-gray-300 transition-colors cursor-pointer">
              Reset
            </button>
          </div>

          {/* Key risk */}
          <div className="space-y-3 mb-6">
            {keyRisks.map((risk) => (
              <div
                key={risk.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  focusedRisk === risk.id
                    ? "bg-blue-100 border-l-4 border-blue-500"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => handleRiskFocus(risk)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{risk.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      risk.level === "Critical"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {risk.level}
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Risk Score: {risk.score}/100
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Affected trade lanes : {risk.affectedRoutes}
                </div>

                {focusedRisk === risk.id && (
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <ul className="text-sm space-y-1">
                      {risk.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {!risk.hasDetailPage && (
                      <div className="mt-3 py-1.5 px-3 bg-gray-200 text-gray-500 text-sm rounded text-center">
                        Detailed Analysis(Coming Soon)
                      </div>
                    )}

                    {risk.hasDetailPage && (
                      <div
                        className="mt-3 py-1.5 px-3 bg-blue-800 text-white text-sm rounded text-center cursor-pointer hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event from bubbling up
                          openDetailView(risk.id);
                        }}>
                        Detailed Analysis
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* All Areas with Search Bar - NEW SECTION */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">All Areas</h2>
            
            {/* Search input */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              )}
            </div>

            {/* Search results */}
            <div className="max-h-48 overflow-y-auto">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location, index) => (
                  <div
                    key={`loc-${index}`}
                    onClick={() => handleLocationClick(location)}
                    className="p-2.5 bg-white mb-2 rounded-md cursor-pointer hover:bg-gray-50 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-sm">{location.name}</div>
                      <div 
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          location.risk >= 50
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                        {location.risk}/100
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {location.size === "major" ? "Major Port" : "Regional Port"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2 text-center text-gray-500 text-sm">
                  {searchQuery ? "No locations found" : "Type to search locations"}
                </div>
              )}
            </div>
          </div>

          {/* Prototype */}
          <hr className="my-4 border-gray-300" />
          <div className="mt-4 text-xs text-gray-500">
            Prototype - For demonstration purposes
          </div>
        </div>

        {/* Map area */}
        <div className="flex-1 relative">
          <MapView
            center={mapCenter}
            zoom={mapZoom}
            focusedRisk={focusedRisk}
            keyRisks={keyRisks}
            onLocationClick={(location) => {
              console.log("Location clicked in MapView:", location);
              if (location.isKeyRisk) {
                const clickedRisk = keyRisks.find(
                  (r) => r.id === location.keyRiskId
                );
                if (!clickedRisk) return;
                // Expand the card
                handleRiskFocus(clickedRisk);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;