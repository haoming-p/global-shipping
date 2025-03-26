import React from 'react';
import MapView from '../pages/MapView';

const ShippingCorridorImpact = ({
  riskArea = 'taiwan',
  onDownloadRoutes = () => {},
}) => {
  // Major shipping corridors data for Taiwan
  const corridors = {
    taiwan: [
      {
        id: 'transpacific',
        name: 'TPE', //Transpacific Eastbound (TPE) Lane
        affectedRoutes: 42,
        capacity: '32% of East Asia traffic',
        color: '#ff3333',
      },
      {
        id: 'asiaeurope',
        name: 'FEE', //Far East-Europe (FEE) Lane
        affectedRoutes: 37,
        capacity: '41% of Asia-Europe trade',
        color: '#ff6600',
      },
      {
        id: 'intraasia',
        name: 'AG', //Asia-Gulf (AG) Lane
        affectedRoutes: 68,
        capacity: '35% of oil imports',
        color: '#ffcc00',
      },
      {
        id: 'asiaoceania',
        name: 'NAO', //North Asia-Oceania (NAO) Lane'
        affectedRoutes: 18,
        capacity: '22% of Pacific shipping',
        color: '#33cc33',
      },
    ],
  };

  const currentCorridors = corridors[riskArea] || [];
  const totalRoutesAffected = currentCorridors.reduce(
    (total, corridor) => total + corridor.affectedRoutes,
    0
  );

  const keyRisks = [
    {
      id: 'taiwan',
      name: 'Taiwan Strait Risk Area',
      coordinates: [24.25, 119.5],
      score: 89,
      hasDetailPage: true,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-lg">Main Shipping Lanes Impact</h3>
        <button
          onClick={onDownloadRoutes}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          Download Affected Routes ({totalRoutesAffected})
        </button>
      </div>

      {/* Map with table overlay */}
      <div className="relative h-[600px] w-full rounded-md overflow-hidden border border-gray-200">
        <MapView
          center={[24.25, 119.5]}
          zoom={4}
          focusedRisk="taiwan"
          keyRisks={keyRisks}
        />

        {/* Table overlay on the map */}
        <div className="absolute top-4 right-4 bg-white p-3 rounded-md shadow-md z-[1000] max-w-xs">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-1 border-b">Lanes</th>
                <th className="text-left p-1 border-b">Routes</th>
                <th className="text-left p-1 border-b">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {currentCorridors.map((corridor) => (
                <tr
                  key={corridor.id}
                  className="border-b border-gray-100"
                >
                  <td className="p-1">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: corridor.color }}
                      ></div>
                      <span className="text-xs">{corridor.name.split(' ')[0]}</span>
                    </div>
                  </td>
                  <td className="p-1 text-center text-xs">
                    {corridor.affectedRoutes}
                  </td>
                  <td className="p-1 text-xs">{corridor.capacity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="p-1 text-xs font-medium">
                  Total Routes Affected: {totalRoutesAffected}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShippingCorridorImpact;
