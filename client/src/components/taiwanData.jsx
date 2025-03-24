export const taiwanData = {
    // Maritime routes from the MapView component
    routes: [
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
        riskFactor: 0.85,
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
          // Simplified path for performance
          [0.0, 100.0], // Malacca Strait (west)
          [-5.0, 90.0], // Indian Ocean
          [5.0, 75.0], // Indian Ocean approaching Arabian Sea
          [12.0, 60.0], // Arabian Sea west
          [12.5, 45.0], // Gulf of Aden
          [20.0, 38.0], // Red Sea (mid)
          [30.0, 32.5795], // Suez Canal
          [36.0, 20.0], // Mediterranean Sea east of Sicily
          [39.0, 10.0], // Tyrrhenian Sea
          [36.0, -5.0], // Gibraltar Strait
          [43.0, -9.0], // Northwest Spain coast
          [50.0, 2.0], // English Channel
          [51.9244, 4.4777], // Rotterdam
        ],
        color: "#00BFFF", // Deep Sky Blue
        affectedVolume: "41% of Asia-Europe trade",
        riskFactor: 0.78,
        relatedPoints: ["Taiwan Strait", "Singapore", "Suez Canal", "Rotterdam"],
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
          [5.0, 75.0], // Indian Ocean approaching Arabian Sea
          [15.0, 65.0], // Arabian Sea north
          [20.0, 60.0], // Approaching Hormuz
          [24.5, 58.0], // UAE coast approach
          [26.5, 56.25], // Strait of Hormuz
        ],
        color: "#9932CC", // Dark Orchid
        affectedVolume: "35% of oil imports",
        riskFactor: 0.72,
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
          [-10.5, 120.0], // Flores Sea
          [-12.0, 135.0], // Arafura Sea
          [-16.0, 146.0], // Coral Sea
          [-25.0, 153.5], // East coast waters
          [-33.8523, 151.1782], // Sydney
        ],
        color: "#32CD32", // Lime Green
        affectedVolume: "22% of Pacific shipping",
        riskFactor: 0.65,
        relatedPoints: ["Taiwan Strait", "Singapore", "Sydney"],
      },
    ],
    
    // Enhanced location data for cluster map
    locations: [
      // Major ports and hotspots
      { name: "Taiwan Strait", lat: 24.2500, lon: 119.5000, risk: 89, type: "hotspot" },
      { name: "Hong Kong Port", lat: 22.3193, lon: 114.1694, risk: 52, type: "infrastructure" },
      { name: "Tokyo Bay", lat: 35.5090, lon: 139.7842, risk: 34, type: "infrastructure" },
      { name: "Busan Port", lat: 35.1333, lon: 129.0500, risk: 38, type: "infrastructure" },
      { name: "Kaohsiung Port", lat: 22.6273, lon: 120.2857, risk: 75, type: "infrastructure" },
      { name: "Shanghai Port", lat: 31.2304, lon: 121.4737, risk: 62, type: "infrastructure" },
      { name: "Singapore", lat: 1.3521, lon: 103.8198, risk: 45, type: "infrastructure" },
      
      // Geopolitical incidents and risk points
      { name: "Military Exercise Zone A", lat: 25.1200, lon: 120.7300, risk: 91, type: "geopolitical" },
      { name: "Military Exercise Zone B", lat: 23.8900, lon: 118.9100, risk: 88, type: "geopolitical" },
      { name: "Naval Patrol Area", lat: 26.1500, lon: 121.8000, risk: 82, type: "geopolitical" },
      { name: "Disputed Territory", lat: 25.7200, lon: 123.4800, risk: 87, type: "geopolitical" },
      { name: "Diplomatic Incident", lat: 23.5600, lon: 117.8900, risk: 74, type: "geopolitical" },
      
      // Weather and environmental factors
      { name: "Weather Disruption", lat: 26.4500, lon: 123.4000, risk: 45, type: "environmental" },
      { name: "Typhoon Path", lat: 21.8800, lon: 124.7700, risk: 60, type: "environmental" },
      { name: "High Wave Area", lat: 27.3300, lon: 122.5500, risk: 55, type: "environmental" },
      { name: "Seasonal Current Change", lat: 22.8500, lon: 125.3000, risk: 42, type: "environmental" },
      
      // Economic factors
      { name: "Trade Restriction Area", lat: 24.7900, lon: 117.3000, risk: 70, type: "economic" },
      { name: "Economic Zone Boundary", lat: 23.9000, lon: 122.0000, risk: 65, type: "economic" },
      { name: "Major Trade Hub", lat: 25.2000, lon: 121.5000, risk: 58, type: "economic" },
      { name: "Supply Chain Disruption", lat: 24.0200, lon: 118.2500, risk: 67, type: "economic" },
      
      // Regulatory changes and checkpoints
      { name: "New Checkpoint", lat: 23.2200, lon: 121.6500, risk: 65, type: "regulatory" },
      { name: "Policy Enforcement Zone", lat: 25.8700, lon: 119.9000, risk: 73, type: "regulatory" },
      { name: "Inspection Area", lat: 22.7500, lon: 119.7800, risk: 68, type: "regulatory" },
      { name: "Regulatory Boundary", lat: 24.6300, lon: 122.3500, risk: 58, type: "regulatory" }
    ],
    
    // Categorized data sources
    dataSources: [
      // Geopolitical data
      { name: "Naval Movement Reports", type: "geopolitical", weight: 0.20, included: true },
      { name: "Military Exercise Bulletins", type: "geopolitical", weight: 0.15, included: true },
      { name: "Diplomatic Status Updates", type: "geopolitical", weight: 0.10, included: true },
      { name: "Defense Intelligence Analysis", type: "geopolitical", weight: 0.12, included: true },
      { name: "Political Risk Assessment", type: "geopolitical", weight: 0.08, included: true },
      
      // Economic indicators
      { name: "Trade Flow Analysis", type: "economic", weight: 0.12, included: true },
      { name: "Freight Rate Indexes", type: "economic", weight: 0.08, included: true },
      { name: "Supply Chain Disruption Metrics", type: "economic", weight: 0.10, included: true },
      { name: "Commodity Price Fluctuations", type: "economic", weight: 0.07, included: true },
      { name: "Insurance Premium Data", type: "economic", weight: 0.06, included: true },
      
      // Regulatory environment
      { name: "Maritime Regulation Changes", type: "regulatory", weight: 0.08, included: true },
      { name: "Customs Policy Updates", type: "regulatory", weight: 0.05, included: true },
      { name: "International Maritime Laws", type: "regulatory", weight: 0.06, included: true },
      { name: "Ship Classification Regulations", type: "regulatory", weight: 0.04, included: true },
      
      // Infrastructure & operations
      { name: "Port Congestion Data", type: "infrastructure", weight: 0.07, included: true },
      { name: "Vessel Tracking Data", type: "infrastructure", weight: 0.10, included: true },
      { name: "Terminal Operation Reports", type: "infrastructure", weight: 0.06, included: false },
      { name: "Shipping Schedule Changes", type: "infrastructure", weight: 0.09, included: true },
      { name: "Vessel Capacity Utilization", type: "infrastructure", weight: 0.05, included: false },
      
      // Environmental factors
      { name: "Weather Forecasts", type: "environmental", weight: 0.05, included: true },
      { name: "Seasonal Pattern Analysis", type: "environmental", weight: 0.05, included: true },
      { name: "Climate Change Impact Studies", type: "environmental", weight: 0.04, included: false },
      { name: "Natural Disaster Records", type: "environmental", weight: 0.06, included: true }
    ],
    
    // Risk factors with weights for analysis
    riskFactors: {
      geopoliticalTension: 0.35,
      economicDisruption: 0.25,
      regulatoryChanges: 0.15,
      infrastructureIssues: 0.15,
      environmentalChallenges: 0.10
    }
  };
  
  export default taiwanData;