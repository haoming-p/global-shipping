import React, { useState } from 'react';

const AnalysisWorkflowStep1 = ({ onDataChange }) => {
  // Data structure with categories and subcategories
  const [dataStructure, setDataStructure] = useState([
    {
      name: "Geopolitical Indicators",
      description: "Military tensions, diplomatic relations, and regional conflicts",
      selected: true,
      subcategories: [
        {
          name: "Military Movement Data",
          description: "Defense Intelligence Agency Reports (14 files)",
          selected: true
        },
        {
          name: "Diplomatic Communications",
          description: "Regional Diplomatic Correspondence (36 files)",
          selected: true
        },
        {
          name: "Satellite Intelligence",
          description: "Satellite Imagery Analysis (8 files)",
          selected: true
        },
        {
          name: "Regulatory Alerts",
          description: "Regulatory Change Notifications (22 files)",
          selected: true
        }
      ]
    },
    {
      name: "Commercial Impact Metrics",
      description: "Supply chain disruptions, market indicators, and economic trends",
      selected: true,
      subcategories: [
        {
          name: "Trade Flow Analysis",
          description: "Global Trade Databases (45 files)",
          selected: true
        },
        {
          name: "Semiconductor Industry",
          description: "Semiconductor Industry Reports (27 files)",
          selected: true
        },
        {
          name: "Supply Chain Data",
          description: "Supply Chain Logistics Tracking (33 files)",
          selected: true
        },
        {
          name: "Port Operations Status",
          description: "Real-time Port Operational Metrics (18 files)",
          selected: true
        },
        {
          name: "Labor Relations Monitoring",
          description: "Labor Dispute & Strike Alerts (12 files)",
          selected: true
        }
      ]
    },
    {
      name: "Environmental & Safety Data",
      description: "Weather patterns, maritime conditions, and ecological indicators",
      selected: true,
      subcategories: [
        {
          name: "Typhoon Patterns",
          description: "Oceanic Weather Monitoring Systems (16 files)",
          selected: true
        },
        {
          name: "Maritime Safety",
          description: "Maritime Safety Databases (21 files)",
          selected: true
        },
        {
          name: "Environmental Hazards",
          description: "Ecological Disruption Reports (9 files)",
          selected: true
        }
      ]
    },
    {
      name: "Cybersecurity & Infrastructure",
      description: "Digital threats, system vulnerabilities, and critical infrastructure status",
      selected: true,
      subcategories: [
        {
          name: "Cyber Threat Intelligence",
          description: "Real-time Cyber Attack Monitoring (27 files)",
          selected: true
        },
        {
          name: "Port IT Systems Status",
          description: "Port Technology Infrastructure Monitoring (15 files)",
          selected: true
        },
        {
          name: "Fuel & Energy Availability",
          description: "Regional Bunkering & Energy Reports (24 files)",
          selected: true
        }
      ]
    }
  ]);

  const [dataModified, setDataModified] = useState(false);

  // Toggle category selection
  const toggleCategory = (categoryIndex) => {
    const updatedData = [...dataStructure];
    const newSelectedState = !updatedData[categoryIndex].selected;
    
    // Update category
    updatedData[categoryIndex].selected = newSelectedState;
    
    // Update all subcategories to match
    updatedData[categoryIndex].subcategories.forEach(subcategory => {
      subcategory.selected = newSelectedState;
    });
    
    setDataStructure(updatedData);
    setDataModified(true);
    
    // Notify parent component
    if (onDataChange) {
      onDataChange(true);
    }
  };

  // Toggle subcategory selection
  const toggleSubcategory = (categoryIndex, subcategoryIndex) => {
    const updatedData = [...dataStructure];
    updatedData[categoryIndex].subcategories[subcategoryIndex].selected = 
      !updatedData[categoryIndex].subcategories[subcategoryIndex].selected;
    
    // Check if all subcategories are selected
    const allSubcategoriesSelected = updatedData[categoryIndex].subcategories.every(
      sub => sub.selected
    );
    
    // Update category selection based on subcategories
    updatedData[categoryIndex].selected = allSubcategoriesSelected;
    
    setDataStructure(updatedData);
    setDataModified(true);
    
    // Notify parent component
    if (onDataChange) {
      onDataChange(true);
    }
  };

  // Handle download of data source list
  const handleDownloadSourceList = () => {
    alert("Downloading data source list Excel file");
    // In a real implementation, this would generate and download a detailed Excel file
  };

  // Handle upload of modified data source list
  const handleUploadSourceList = () => {
    alert("Upload functionality would open a file dialog here");
    // In a real implementation, this would open a file picker
  };

  // Count selected subcategories
  const countSelectedSubcategories = () => {
    return dataStructure.reduce((total, category) => {
      return total + category.subcategories.filter(sub => sub.selected).length;
    }, 0);
  };

  // Count total subcategories
  const countTotalSubcategories = () => {
    return dataStructure.reduce((total, category) => {
      return total + category.subcategories.length;
    }, 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Data Sources & Categories</h2>
          <p className="text-sm text-gray-600 mt-1">
            {countSelectedSubcategories()} of {countTotalSubcategories()} data categories selected
            {dataModified && " • Modified"}
          </p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleUploadSourceList}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Additional data
          </button>
          <button 
            onClick={handleDownloadSourceList}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center group relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Download Source List
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity w-64 text-center">
              To modify individual files, download source list, edit in Excel, and upload the modified file.
            </div>
          </button>
        </div>
      </div>

      {dataModified && (
        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Data source selections have been modified. This will affect risk analysis models and route recommendations.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category / Subcategory
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataStructure.map((category, categoryIndex) => (
              <React.Fragment key={`category-${categoryIndex}`}>
                {/* Category Row */}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={category.selected}
                      onChange={() => toggleCategory(categoryIndex)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{category.description}</div>
                  </td>
                </tr>
                
                {/* Subcategory Rows */}
                {category.subcategories.map((subcategory, subcategoryIndex) => (
                  <tr 
                    key={`subcategory-${categoryIndex}-${subcategoryIndex}`}
                    className={!subcategory.selected ? 'bg-gray-100' : ''}
                  >
                    <td className="px-6 py-4 whitespace-nowrap pl-12">
                      <input
                        type="checkbox"
                        checked={subcategory.selected}
                        onChange={() => toggleSubcategory(categoryIndex, subcategoryIndex)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap pl-12">
                      <div className="text-sm text-gray-900">{subcategory.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{subcategory.description}</div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalysisWorkflowStep1;