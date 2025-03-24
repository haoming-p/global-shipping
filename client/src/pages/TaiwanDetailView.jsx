import React, { useState } from "react";
import ShippingCorridorImpact from "../components/ShippingCorridorImpact";
import PortDelayImpact from "../components/PortDelayImpact";
import AnalysisWorkflowStep1 from "../components/AnalysisWorkflowStep1";
import AnalysisWorkflowStep2 from "../components/AnalysisWorkflowStep2";
import AnalysisWorkflowStep3 from "../components/AnalysisWorkflowStep3";

const TaiwanDetailView = ({ returnToMainView }) => {
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [activeStep, setActiveStep] = useState(1);

  // risk
  const keyRisks = [
    {
      title: "Geopolitical Tensions",
      points: [
        "Military tensions increased by 78% in the past quarter",
        "Naval confrontations up 38% year-over-year",
        "Airspace violations reported at 23 incidents this month",
        "Sudden currency devaluation of 15% in regional markets",
      ],
    },
    {
      title: "Commercial Impact",
      points: [
        "Semiconductor shipments delayed up to 14 days - affecting 65% of global advanced chip supply",
        "Critical medical equipment supply chain disrupted - 23% shortfall projected",
        "EV battery component deliveries at risk - impacting Tesla, VW, and Toyota production",
        "Rare earth minerals transport costs increased 128% since last month",
      ],
    },
    {
      title: "Environmental & Safety Concerns",
      points: [
        "Category 5 typhoon expected within 72 hours - historical shipping route directly impacted",
        "Unprecedented coral bleaching affecting navigational depths in key channels",
        "Record-breaking wave heights of 18m reported in East Taiwan channel",
        "Toxic algal bloom expanding at 3.2km² daily in southern approach waters",
      ],
    },
    {
      title: "Abrupt Disruptions",
      points: [
        "Major port cyber attack detected 6 hours ago - all systems currently offline",
        "Regional fuel shortage crisis - bunkering capacity reduced by 76%",
        "Snap regulatory changes at key transshipment hub enacted without notice",
        "Unexpected labor strike affecting 4 major container terminals with no resolution timeline",
      ],
    },
  ];

  // recommendations
  const recommendations = [
    {
      title: "Route Optimization",
      points: [
        "Implement alternative routing via Philippines Sea for semiconductor shipments",
        "Establish priority corridors for medical equipment with 24hr notice activation",
        "Deploy specialized vessels for EV battery components through storm-resilient routes",
        "Implement premium fast-lane services for perishable pharmaceuticals",
      ],
    },
    {
      title: "Risk Mitigation",
      points: [
        "Establish strategic reserves of critical microchips at nearest safe ports",
        "Implement fuel hedging strategy for anticipated 180-day disruption",
        "Deploy hardened communication systems immune to regional cyber threats",
        "Secure alternative currency transaction mechanisms to bypass devaluation issues",
      ],
    },
    {
      title: "Product-Specific Strategies",
      points: [
        "Air freight contingency for TSMC's 3nm chips and Apple display components",
        "Temperature-controlled alternate routing for COVID-19 vaccines and biologics",
        "Stockpile 90-day lithium supply for battery manufacturing in safe locations",
        "Implement military-grade tracking for rare earth shipments with high risk profiles",
      ],
    },
    {
      title: "Emergency Response",
      points: [
        "Activate typhoon contingency plan Alpha with 48-hour vessel repositioning",
        "Deploy emergency communications satellite uplink for affected vessels",
        "Establish temporary floating fuel depot to address regional shortage",
        "Prepare evacuation protocols for specialized cargo requiring temperature control",
      ],
    },
  ];

  // download routes excel
  const handleDownloadRoutes = () => {
    alert("Downloading detailed route impact Excel spreadsheet");
  };

  return (
    <div className="h-screen flex flex-col overflow-auto">
      {/* header */}
      <div className="bg-red-700 text-white py-2 px-4 flex items-center">
        <button
          onClick={returnToMainView}
          className="bg-white text-red-700 py-1 px-2 rounded border-none mr-3 cursor-pointer">
          &lt;
        </button>
        <div className="flex gap-6 items-center w-full">
          <h1 className="text-xl font-bold mr-4">
            Taiwan Strait Risk Analysis
          </h1>
          <p className="text-xs">Last updated: {currentDate}</p>
        </div>
      </div>

      {/* Top section - Risks and Recommendations */}
      <div className="p-4 bg-gray-50">
        {/* Download button */}
        <div className="flex gap-6 items-center mb-3">
          <h2 className="text-lg font-bold">
            Taiwan Strait Risk Analysis and Strategic Recommendations
          </h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm cursor-pointer flex items-center"
            onClick={() => alert("Downloading full report")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            Download Full Report
          </button>
        </div>

        <div className="flex">
          {/* Left - Risks */}
          <div className="w-1/2 pr-3">
            <div className="bg-white p-4 rounded shadow h-full">
              <h2 className="text-lg font-bold mb-3">
                Key Risk Factors: EXTREME (89/100)
              </h2>

              <div className="space-y-3">
                {keyRisks.map((risk, index) => (
                  <div key={index} className="mb-3">
                    <h4 className="font-bold border-l-4 border-red-600 pl-2">
                      {risk.title}
                    </h4>
                    <ul className="list-disc ml-6 mt-1 text-sm">
                      {risk.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Recommendations */}
          <div className="w-1/2 pl-3">
            <div className="bg-white p-4 rounded shadow h-full">
              <h2 className="text-lg font-bold mb-3">Major Recommendations</h2>

              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="mb-3">
                    <h4 className="font-bold border-l-4 border-blue-600 pl-2">
                      {rec.title}
                    </h4>
                    <ul className="list-disc ml-6 mt-1 text-sm">
                      {rec.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle section - Maps */}
      <div className="p-4 bg-gray-50">
        <div className="flex gap-6 items-center mb-3">
          <h2 className="text-lg font-bold">Shipping Impact Analysis</h2>
        </div>

        <div className="flex">
          {/* Left - Shipping Corridor Impact */}
          <div className="w-1/2 pr-3">
            <div className="bg-white p-4 rounded shadow h-full">
              <ShippingCorridorImpact
                riskArea="taiwan"
                onDownloadRoutes={handleDownloadRoutes}
              />
            </div>
          </div>

          {/* Right - Port Delay Impact */}
          <div className="w-1/2 pl-3">
            <div className="bg-white p-4 rounded shadow h-full">
              <PortDelayImpact riskArea="taiwan" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section - Steps */}
      <div className="p-4 bg-gray-50 flex-1">
        <h2 className="text-lg font-bold mb-3">Analysis Workflow</h2>

        {/* Progress steps */}
        <div className="flex mb-4">
          {[
            { num: 1, title: "Data" },
            { num: 2, title: "Model" },
            { num: 3, title: "Report" },
          ].map((step) => (
            <div key={step.num} className="flex-1 relative">
              <div
                className={`h-2 ${
                  step.num < activeStep
                    ? "bg-blue-500"
                    : step.num === activeStep
                    ? "bg-blue-300"
                    : "bg-gray-200"
                }`}></div>
              <div
                className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step.num < activeStep
                    ? "bg-blue-500 text-white"
                    : step.num === activeStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}>
                {step.num}
              </div>
              <div className="text-center mt-4 text-sm">{step.title}</div>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-white p-4 rounded shadow">
          {activeStep === 1 && <AnalysisWorkflowStep1 />}
          {activeStep === 2 && <AnalysisWorkflowStep2 />}
          {activeStep === 3 && <AnalysisWorkflowStep3 />}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-4">
          <button
            className={`py-2 px-4 rounded ${
              activeStep > 1
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-100 text-gray-400"
            }`}
            disabled={activeStep === 1}
            onClick={() => activeStep > 1 && setActiveStep((prev) => prev - 1)}>
            Previous
          </button>

          <button
            className={`py-2 px-4 rounded ${
              activeStep < 4
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            disabled={activeStep === 4}
            onClick={() => activeStep < 4 && setActiveStep((prev) => prev + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaiwanDetailView;
