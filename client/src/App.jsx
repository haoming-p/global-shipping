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
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

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
    setMapZoom(4); // 
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
          Global Maritime Risk Analysis Dashboard
        </h1>
        <p className="text-sm">Last updated: {currentDate}</p>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Key Risk Areas</h2>

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
                  Shipping Corridor Impact : {risk.affectedRoutes}
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

          {/* Reset */}
          <button
            onClick={resetView}
            className="w-full py-2 px-3 bg-gray-200 text-gray-700 rounded border border-gray-300 hover:bg-gray-300 transition-colors cursor-pointer">
            Reset Map View
          </button>

          {/* Prototype */}
          <hr className="my-4 border-gray-300" />
          <div className="mt-4 text-xs text-gray-500 text-center">
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
                const clickedRisk = keyRisks.find((r) => r.id === location.keyRiskId);
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
