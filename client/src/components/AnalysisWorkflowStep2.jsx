import React, { useEffect, useRef } from 'react';

const AnalysisWorkflowStep2 = () => {
  const svgRef = useRef(null);
  
  // Simplified data categories with fewer subcategories
  const dataCategories = [
    {
      name: "Geopolitical Indicators",
      color: "#818cf8", // Indigo
      subcategories: [
        { name: "Military Movement Data", id: "military-movement" },
        { name: "Diplomatic Communications", id: "diplomatic-comms" }
      ]
    },
    {
      name: "Commercial Impact Metrics",
      color: "#60a5fa", // Blue
      subcategories: [
        { name: "Trade Flow Analysis", id: "trade-flow" },
        { name: "Supply Chain Data", id: "supply-chain" }
      ]
    },
    {
      name: "Environmental & Safety Data",
      color: "#93c5fd", // Light Blue
      subcategories: [
        { name: "Typhoon Patterns", id: "typhoon" }
      ]
    }
  ];
  
  // Simplified model definitions with clear data connections
  const models = [
    {
      id: "timeSeries",
      name: "Time Series Forecasting",
      description: "Predicts future shipping delays based on historical patterns",
      confidenceLevel: 78,
      dataConnections: [
        { categoryName: "Geopolitical Indicators", subcategoryId: "military-movement" },
        { categoryName: "Environmental & Safety Data", subcategoryId: "typhoon" }
      ]
    },
    {
      id: "scenarioAnalysis",
      name: "Geopolitical Scenario Analysis",
      description: "Evaluates impact of different tension scenarios on shipping",
      confidenceLevel: 64,
      dataConnections: [
        { categoryName: "Geopolitical Indicators", subcategoryId: "diplomatic-comms" },
        { categoryName: "Commercial Impact Metrics", subcategoryId: "trade-flow" }
      ]
    },
    {
      id: "routeOptimization",
      name: "Route Optimization Model",
      description: "Suggests optimal shipping routes based on risk factors",
      confidenceLevel: 86,
      dataConnections: [
        { categoryName: "Commercial Impact Metrics", subcategoryId: "supply-chain" },
        { categoryName: "Environmental & Safety Data", subcategoryId: "typhoon" }
      ]
    }
  ];
  
  // Helper to get confidence level class
  const getConfidenceLevelClass = (level) => {
    if (level >= 80) return "bg-green-100 text-green-800";
    if (level >= 70) return "bg-blue-100 text-blue-800";
    if (level >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };
  
  // Get the color for a specific data category
  const getCategoryColor = (categoryName) => {
    const category = dataCategories.find(cat => cat.name === categoryName);
    return category ? category.color : "#94a3b8"; // Default gray if not found
  };
  
  // Find subcategory by ID in data categories
  const findSubcategory = (categoryName, subcategoryId) => {
    const category = dataCategories.find(cat => cat.name === categoryName);
    if (!category) return null;
    
    const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
    return subcategory ? subcategory.name : null;
  };
  
  // Helper function to get factor values based on confidence level
  const getFactorValues = (confidenceLevel) => {
    return {
      dataQuality: Math.min(90, Math.floor(confidenceLevel + 7)),
      modelAccuracy: Math.max(60, Math.floor(confidenceLevel - 4)),
      dataCoverage: Math.min(95, Math.floor(confidenceLevel + 3))
    };
  };
  
  // Draw connection lines after component mounts with a delay to ensure rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      drawConnectionLines();
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to draw the connection lines
  const drawConnectionLines = () => {
    if (!svgRef.current) return;
    
    // Clear any existing lines
    const svg = svgRef.current;
    svg.innerHTML = '';
    
    // Get the SVG position for offset calculations
    const svgRect = svg.getBoundingClientRect();
    
    // For each model, draw connections to its data sources
    models.forEach(model => {
      const modelElement = document.getElementById(`model-${model.id}`);
      if (!modelElement) return;
      
      // Draw lines for each data connection
      model.dataConnections.forEach(conn => {
        // Get the specific dot for this connection in the model
        const dotSelector = `#model-${model.id} .connection-${conn.subcategoryId}`;
        const dotElement = document.querySelector(dotSelector);
        if (!dotElement) return;
        
        const dotRect = dotElement.getBoundingClientRect();
        const modelX = dotRect.left - svgRect.left + (dotRect.width / 2);
        const modelY = dotRect.top - svgRect.top + (dotRect.height / 2);
        
        // Find the data subcategory element
        const subcategoryElement = document.getElementById(`sub-${conn.subcategoryId}`);
        if (!subcategoryElement) return;
        
        const subcatRect = subcategoryElement.getBoundingClientRect();
        const subcatX = subcatRect.right - svgRect.left; // Right side of subcategory
        const subcatY = subcatRect.top - svgRect.top + (subcatRect.height / 2);
        
        // Create curved path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Calculate curve control points
        const controlX1 = subcatX + 60;
        const controlY1 = subcatY;
        const controlX2 = modelX - 60;
        const controlY2 = modelY;
        
        const pathData = `
          M ${subcatX} ${subcatY} 
          C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${modelX} ${modelY}
        `;
        
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', getCategoryColor(conn.categoryName));
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-opacity', '0.7');
        
        svg.appendChild(path);
      });
    });
  };
  
  return (
    <div className="bg-white p-6 rounded-lg relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Risk Analysis Models</h2>
      
      {/* SVG Overlay for Connection Lines */}
      <svg 
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
      ></svg>
      
      {/* Data Flow Diagram */}
      <div className="border rounded-lg p-4 bg-white mb-6 relative">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Data Flow Diagram</h3>
        
        <div className="flex">
          <div className="w-2/5 pr-4">
            <h4 className="text-sm font-medium mb-3 text-gray-600">Data Categories</h4>
            
            {dataCategories.map((category, catIndex) => (
              <div 
                key={`cat-${catIndex}`}
                className="mb-5 border rounded-lg overflow-hidden"
                style={{ 
                  borderColor: category.color,
                  backgroundColor: `${category.color}10`
                }}
              >
                <div className="font-medium px-4 py-2 bg-white border-b" style={{ borderColor: category.color }}>
                  {category.name}
                </div>
                
                <div className="px-4 py-2">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <div 
                      key={`sub-${catIndex}-${subIndex}`} 
                      className="flex items-center border-l-2 pl-2 py-3 mb-2 relative"
                      style={{ borderColor: category.color }}
                      id={`sub-${subcategory.id}`}
                    >
                      <span className="text-sm">{subcategory.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="w-3/5 pl-4">
            <h4 className="text-sm font-medium mb-3 text-gray-600">Models</h4>
            
            {models.map((model, modelIndex) => {
              const factors = getFactorValues(model.confidenceLevel);
              
              return (
                <div 
                  key={`model-${modelIndex}`}
                  className="mb-5 border rounded-lg overflow-hidden border-gray-200"
                  id={`model-${model.id}`}
                >
                  <div className="px-4 py-2 flex justify-between items-center bg-white">
                    <h3 className="font-medium">{model.name}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs ${getConfidenceLevelClass(model.confidenceLevel)}`}>
                      Confidence: {model.confidenceLevel}%
                    </div>
                  </div>
                  
                  <div className="px-4 py-2 bg-white">
                    <p className="text-sm text-gray-600 mb-3">{model.description}</p>
                    
                    <div>
                      <h5 className="text-xs font-medium text-gray-500 mb-2">Data Sources</h5>
                      
                      {model.dataConnections.map((conn, connIndex) => {
                        const subcategoryName = findSubcategory(conn.categoryName, conn.subcategoryId);
                        return (
                          <div 
                            key={`source-${modelIndex}-${connIndex}`}
                            className="flex items-center mb-1 text-sm"
                          >
                            <div 
                              className={`w-3 h-3 rounded-full mr-2 connection-${conn.subcategoryId}`}
                              style={{ backgroundColor: getCategoryColor(conn.categoryName) }}
                            ></div>
                            <span className="text-gray-600 mr-1">{conn.categoryName}:</span>
                            <span className="font-medium">{subcategoryName}</span>
                          </div>
                        );
                      })}
                      
                      <h5 className="text-xs font-medium text-gray-500 mt-4 mb-2">Confidence Factors</h5>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            model.confidenceLevel >= 80 ? 'bg-green-500' :
                            model.confidenceLevel >= 70 ? 'bg-blue-500' :
                            model.confidenceLevel >= 60 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${model.confidenceLevel}%` }}
                        ></div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="text-xs">
                          <div>Data Quality: {factors.dataQuality}%</div>
                        </div>
                        <div className="text-xs">
                          <div>Model Accuracy: {factors.modelAccuracy}%</div>
                        </div>
                        <div className="text-xs">
                          <div>Data Coverage: {factors.dataCoverage}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisWorkflowStep2;