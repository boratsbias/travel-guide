/**
 * API Service module
 * Handles all external API requests
 */

const ApiService = (() => {
  /**
   * Search for locations using OpenCage Geocoding API
   * @param {string} query - The search query
   * @returns {Promise} - Promise with search results
   */
  const searchLocations = async (query) => {
    try {
      // For demo purposes, return sample data
      if (!query) return [];
      
      // In a real app, you would make an API call like this:
      // const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${CONFIG.GEOCODING_API_KEY}&limit=5`;
      // const response = await fetch(url);
      // const data = await response.json();
      // return data.results;
      
      // Sample data for demonstration
      return [
        { 
          formatted: "Paris, France",
          geometry: { lat: 48.8566, lng: 2.3522 },
          components: { country: "France" }
        },
        { 
          formatted: "New York, USA",
          geometry: { lat: 40.7128, lng: -74.0060 },
          components: { country: "United States" }
        },
        { 
          formatted: "Tokyo, Japan",
          geometry: { lat: 35.6762, lng: 139.6503 },
          components: { country: "Japan" }
        },
        { 
          formatted: "London, United Kingdom",
          geometry: { lat: 51.5074, lng: -0.1278 },
          components: { country: "United Kingdom" }
        },
        { 
          formatted: "Sydney, Australia",
          geometry: { lat: -33.8688, lng: 151.2093 },
          components: { country: "Australia" }
        }
      ].filter(item => 
        item.formatted.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching locations:", error);
      return [];
    }
  };

  /**
   * Get weather data for a location using OpenWeatherMap API
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @returns {Promise} - Promise with weather data
   */
  const getWeatherData = async (lat, lng) => {
    try {
      // For demo purposes, return sample data
      // In a real app, you would make an API call like this:
      // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${CONFIG.WEATHER_API_KEY}`;
      // const response = await fetch(url);
      // return await response.json();
      
      // Generate sample weather data
      const days = [];
      const now = new Date();
      const tempBase = 20 + Math.random() * 10;
      
      for (let i = 0; i < 5; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i);
        
        // Randomize temperature slightly for each day
        const temp = Math.round(tempBase + (Math.random() * 6 - 3));
        
        // Randomly select a weather condition
        const conditions = ["01d", "02d", "03d", "04d", "10d"];
        const weatherCode = conditions[Math.floor(Math.random() * conditions.length)];
        
        days.push({
          date: date,
          temp: temp,
          weather: {
            icon: weatherCode,
            description: getWeatherDescription(weatherCode)
          }
        });
      }
      
      return { days };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return { days: [] };
    }
  };

  /**
   * Get a description for a weather icon code
   * @param {string} iconCode - Weather icon code
   * @returns {string} - Weather description
   */
  const getWeatherDescription = (iconCode) => {
    const descriptions = {
      "01d": "Sunny",
      "01n": "Clear",
      "02d": "Partly cloudy",
      "02n": "Partly cloudy",
      "03d": "Cloudy",
      "03n": "Cloudy",
      "04d": "Overcast",
      "04n": "Overcast",
      "09d": "Showers",
      "09n": "Showers",
      "10d": "Rain",
      "10n": "Rain",
      "11d": "Thunderstorm",
      "11n": "Thunderstorm",
      "13d": "Snow",
      "13n": "Snow",
      "50d": "Fog",
      "50n": "Fog"
    };
    
    return descriptions[iconCode] || "Unknown";
  };

  /**
   * Get attractions for a destination
   * @param {string} destination - Destination name
   * @returns {Promise} - Promise with attractions data
   */
  const getAttractions = async (destination) => {
    try {
      // For demonstration purposes, use the sample data from CONFIG
      // Extract the city name from the full destination (e.g., "Paris, France" -> "Paris")
      const city = destination.split(',')[0].trim();
      
      // Look for exact matches in the sample data
      if (CONFIG.SAMPLE_ATTRACTIONS[city]) {
        return CONFIG.SAMPLE_ATTRACTIONS[city];
      }
      
      // If not found, return the first one as a fallback (Paris)
      return CONFIG.SAMPLE_ATTRACTIONS["Paris"];
      
      // In a real app, you would use a Places API like:
      // const url = `https://api.example.com/places?location=${encodeURIComponent(destination)}&key=${CONFIG.PLACES_API_KEY}`;
      // const response = await fetch(url);
      // return await response.json();
    } catch (error) {
      console.error("Error fetching attractions:", error);
      return [];
    }
  };

  /**
   * Get travel tips for a destination
   * @param {string} destination - Destination name
   * @returns {Promise} - Promise with travel tips
   */
  const getTravelTips = async (destination) => {
    try {
      // For demonstration purposes, use the sample data from CONFIG
      const city = destination.split(',')[0].trim();
      
      // Look for exact matches in the sample data
      if (CONFIG.SAMPLE_TRAVEL_TIPS[city]) {
        return CONFIG.SAMPLE_TRAVEL_TIPS[city];
      }
      
      // If not found, return the first one as a fallback (Paris)
      return CONFIG.SAMPLE_TRAVEL_TIPS["Paris"];
    } catch (error) {
      console.error("Error fetching travel tips:", error);
      return [];
    }
  };

  /**
   * Get the destination image
   * @param {string} destination - Destination name
   * @returns {Promise<string>} - Promise with image URL
   */
  const getDestinationImage = async (destination) => {
    try {
      // In a real app, you would use Unsplash API:
      // const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(destination)}&client_id=${CONFIG.UNSPLASH_API_KEY}&per_page=1`;
      // const response = await fetch(url);
      // const data = await response.json();
      // return data.results[0]?.urls?.regular;
      
      // For demo, return a generic image from Unsplash
      return `https://source.unsplash.com/800x600/?${encodeURIComponent(destination)}`;
    } catch (error) {
      console.error("Error fetching destination image:", error);
      return "https://source.unsplash.com/800x600/?travel";
    }
  };

  // Public API
  return {
    searchLocations,
    getWeatherData,
    getAttractions,
    getTravelTips,
    getDestinationImage
  };
})();