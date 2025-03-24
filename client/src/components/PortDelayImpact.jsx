import React, { useState } from 'react';

const PortDelayImpact = ({ 
  riskArea = "taiwan",
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Port delay data organized by risk area
  const portDelayData = {
    taiwan: [
      // Asian ports
      { name: "Tokyo", country: "Japan", delay: 14, volume: "High", isJapan: true, products: ["Electronics", "Automotive"] },
      { name: "Yokohama", country: "Japan", delay: 13, volume: "High", isJapan: true, products: ["Machinery", "Automotive"] },
      { name: "Osaka", country: "Japan", delay: 12, volume: "Medium", isJapan: true, products: ["Chemical", "Machinery"] },
      { name: "Nagoya", country: "Japan", delay: 15, volume: "High", isJapan: true, products: ["Automotive", "Industrial"] },
      { name: "Kobe", country: "Japan", delay: 11, volume: "Medium", isJapan: true, products: ["Rubber", "Automotive"] },
      { name: "Shanghai", country: "China", delay: 21, volume: "Very High", products: ["Electronics", "Industrial"] },
      { name: "Hong Kong", country: "China", delay: 18, volume: "High", products: ["Electronics", "Consumer"] },
      { name: "Singapore", country: "Singapore", delay: 12, volume: "High", products: ["Electronics", "Chemical"] },
      { name: "Busan", country: "South Korea", delay: 16, volume: "High", products: ["Automotive", "Electronics"] },
      { name: "Kaohsiung", country: "Taiwan", delay: 23, volume: "Very High", products: ["Electronics", "Machinery"] },
      // American ports
      { name: "Los Angeles", country: "USA", delay: 21, volume: "Very High", products: ["Consumer", "Electronics"] },
      { name: "Seattle", country: "USA", delay: 14, volume: "Medium", products: ["Agricultural", "Machinery"] },
      // European ports
      { name: "Rotterdam", country: "Netherlands", delay: 18, volume: "High", products: ["Chemical", "Machinery"] },
      { name: "Hamburg", country: "Germany", delay: 16, volume: "Medium", products: ["Automotive", "Industrial"] },
      // Oceania ports
      { name: "Sydney", country: "Australia", delay: 9, volume: "Low", products: ["Agricultural", "Consumer"] }
    ],
    hormuz: [
      // Selected ports affected by Hormuz
      { name: "Tokyo", country: "Japan", delay: 18, volume: "High", isJapan: true, products: ["Energy", "Industrial"] },
      { name: "Yokohama", country: "Japan", delay: 17, volume: "High", isJapan: true, products: ["Energy", "Chemical"] },
      { name: "Dubai", country: "UAE", delay: 25, volume: "Very High", products: ["Energy", "Consumer"] },
      { name: "Mumbai", country: "India", delay: 21, volume: "High", products: ["Energy", "Industrial"] },
      { name: "Singapore", country: "Singapore", delay: 16, volume: "High", products: ["Energy", "Chemical"] },
      { name: "Rotterdam", country: "Netherlands", delay: 14, volume: "Medium", products: ["Energy", "Chemical"] },
      { name: "Shanghai", country: "China", delay: 15, volume: "High", products: ["Energy", "Industrial"] }
    ],
    suez: [
      // Selected ports affected by Suez
      { name: "Tokyo", country: "Japan", delay: 16, volume: "Medium", isJapan: true, products: ["Machinery", "Consumer"] },
      { name: "Rotterdam", country: "Netherlands", delay: 22, volume: "Very High", products: ["Industrial", "Consumer"] },
      { name: "Hamburg", country: "Germany", delay: 20, volume: "High", products: ["Automotive", "Electronics"] },
      { name: "Piraeus", country: "Greece", delay: 25, volume: "Very High", products: ["Consumer", "Industrial"] },
      { name: "Singapore", country: "Singapore", delay: 18, volume: "High", products: ["Electronics", "Consumer"] },
      { name: "Shanghai", country: "China", delay: 16, volume: "Medium", products: ["Electronics", "Machinery"] }
    ]
  };
  
  // Product categories with icons and impact descriptions
  const productCategories = {
    Electronics: { 
      icon: "🖥️", 
      impact: "Severe disruption to semiconductor and component shipments affecting consumer devices and manufacturing"
    },
    Automotive: { 
      icon: "🚗", 
      impact: "Production delays for Japanese manufacturers due to parts shortages; JIT inventory severely affected"
    },
    Energy: { 
      icon: "⛽", 
      impact: "Fuel price increases and potential rationing with 35% reduction in oil shipments"
    },
    Chemical: { 
      icon: "🧪", 
      impact: "Essential industrial chemical shortages affecting manufacturing across multiple sectors"
    },
    Machinery: { 
      icon: "⚙️", 
      impact: "Extended lead times for industrial equipment and replacement parts"
    },
    Consumer: { 
      icon: "🛒", 
      impact: "Retail product shortages and price increases for imported goods"
    },
    Agricultural: { 
      icon: "🌾", 
      impact: "Food product delays and potential spoilage for perishable goods"
    },
    Industrial: { 
      icon: "🏭", 
      impact: "Manufacturing slowdowns due to component and raw material shortages"
    },
    Rubber: { 
      icon: "🛞", 
      impact: "Shortages affecting tire production and other rubber-dependent industries"
    }
  };
  
  // Get current ports based on selected risk area
  const getCurrentPorts = () => {
    const ports = portDelayData[riskArea] || [];
    
    // If product filter is active, filter by product
    if (selectedProduct) {
      return ports.filter(port => port.products.includes(selectedProduct));
    }
    
    return ports;
  };
  
  const currentPorts = getCurrentPorts();
  
  // Get all unique products from current ports
  const getUniqueProducts = () => {
    const products = new Set();
    currentPorts.forEach(port => {
      port.products.forEach(product => products.add(product));
    });
    return Array.from(products);
  };
  
  const uniqueProducts = getUniqueProducts();
  
  // Calculate average delay
  const averageDelay = currentPorts.length > 0 
    ? Math.round(currentPorts.reduce((sum, port) => sum + port.delay, 0) / currentPorts.length) 
    : 0;
  
  // Function to get color class based on delay
  const getDelayColorClass = (delay) => {
    if (delay >= 20) return "bg-red-100 text-red-800 font-bold";
    if (delay >= 15) return "bg-red-100 text-red-800";
    if (delay >= 10) return "bg-orange-100 text-orange-800";
    return "bg-yellow-100 text-yellow-800";
  };
  
  // Function to get description for volume
  const getVolumeDescription = (volume) => {
    switch(volume) {
      case "Very High": return "Critical impact";
      case "High": return "Major impact";
      case "Medium": return "Moderate impact";
      case "Low": return "Minor impact";
      default: return volume;
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-lg">Port Delay Impact</h3>
        <div className="text-sm">
          <span className="font-medium">Average Delay: </span>
          <span className={`px-1.5 py-0.5 rounded-full text-xs ${getDelayColorClass(averageDelay)}`}>
            {averageDelay} days
          </span>
        </div>
      </div>
      
      {/* Product filter options */}
      <div className="flex flex-wrap gap-1 mb-2">
        <button
          className={`px-2 py-1 text-xs rounded ${selectedProduct === null ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 border border-gray-300'}`}
          onClick={() => setSelectedProduct(null)}
        >
          All Products
        </button>
        {uniqueProducts.map(product => (
          <button
            key={product}
            className={`px-2 py-1 text-xs rounded flex items-center ${selectedProduct === product ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 border border-gray-300'}`}
            onClick={() => setSelectedProduct(product === selectedProduct ? null : product)}
          >
            <span className="mr-1">{productCategories[product]?.icon || ''}</span>
            {product}
          </button>
        ))}
      </div>
      
      {/* Port delay table */}
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden h-[600px]">
        <div className="overflow-auto h-full">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 p-2 text-left">Port</th>
                <th className="border border-gray-200 p-2 text-left">Country</th>
                <th className="border border-gray-200 p-2 text-center">Delay</th>
                <th className="border border-gray-200 p-2 text-left">Impact</th>
              </tr>
            </thead>
            <tbody>
              {currentPorts
                .sort((a, b) => b.delay - a.delay) // Sort by delay (highest first)
                .map((port, index) => (
                <tr key={index} className={port.isJapan ? "bg-blue-50" : ""}>
                  <td className="border border-gray-200 p-2">
                    <div className="font-medium">{port.name}</div>
                  </td>
                  <td className="border border-gray-200 p-2">{port.country}</td>
                  <td className="border border-gray-200 p-2 text-center">
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${getDelayColorClass(port.delay)}`}>
                      {port.delay} days
                    </span>
                  </td>
                  <td className="border border-gray-200 p-2">
                    <div className="flex flex-col">
                      <span>{getVolumeDescription(port.volume)}</span>
                      <div className="flex items-center mt-1">
                        {port.products.map((product, i) => (
                          <div key={i} className="flex items-center mr-2 text-xs">
                            <span className="mr-1">{productCategories[product]?.icon || ''}</span>
                            {product}
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Product impact detail */}
      {selectedProduct && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
          <div className="flex items-center">
            <span className="text-lg mr-2">{productCategories[selectedProduct]?.icon || ''}</span>
            <span className="font-medium">{selectedProduct} Impact:</span>
          </div>
          <p className="mt-1">{productCategories[selectedProduct]?.impact || ''}</p>
        </div>
      )}
    </div>
  );
};

export default PortDelayImpact;