import React, { useState } from 'react';

const AnalysisWorkflowStep3 = ({ dataModified = false }) => {
  // State to demonstrate both the loading and report view
  const [isRegenerating, setIsRegenerating] = useState(false);

  // If data was modified or regenerating, show loading spinner
  if (dataModified || isRegenerating) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-4"></div>
        <h3 className="text-lg font-bold mb-2">Regenerating Analysis</h3>
        <p className="text-gray-600 text-center max-w-md">
          We're recalculating risk factors and optimizing routes based on your selected data sources.
        </p>
      </div>
    );
  }

  // Handle download of the report
  const handleDownloadReport = () => {
    alert("Downloading Taiwan Strait Risk Analysis Report");
    // In a real implementation, this would trigger the actual download
  };

  // Handle regeneration of the report
  const handleRegenerateReport = () => {
    setIsRegenerating(true);
    // In a real implementation, this would trigger the regeneration process
    
    // Simulate regeneration time
    setTimeout(() => {
      setIsRegenerating(false);
    }, 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Taiwan Strait Risk Analysis Report</h2>
      </div>

      <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              The implementation plan is based on current risk analysis using all selected data sources. Changes to data sources will require regeneration of this plan.
            </p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-8 mb-6">
        <div className="flex flex-col items-center justify-center text-center">
          {/* <div className="w-20 h-20 mb-4 text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm0 7h2v2h-2z"/>
            </svg>
          </div> */}
          <h3 className="text-xl font-bold mb-2">Taiwan Strait Risk Analysis - EXTREME RISK (89/100)</h3>
          <p className="text-gray-600 mb-4">Comprehensive analysis of geopolitical, commercial, environmental, and operational risks</p>
          <p className="text-gray-500 mb-6">Last updated: March 24, 2025</p>
          
          <button 
            onClick={handleDownloadReport}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg flex items-center text-lg mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Download Full Report
          </button>
          
          <button 
            onClick={handleRegenerateReport}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisWorkflowStep3;