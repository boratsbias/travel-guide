/**
 * Configuration file for API keys and settings
 */
const CONFIG = {
  // OpenWeatherMap API key
  // Get your API key from: https://openweathermap.org/api
  WEATHER_API_KEY: "your_openweathermap_api_key",

  // OpenCage Geocoding API key (for location search)
  // Get your API key from: https://opencagedata.com/
  GEOCODING_API_KEY: "your_opencage_api_key",

  // Unsplash API key (for destination images)
  // Get your API key from: https://unsplash.com/developers
  UNSPLASH_API_KEY: "your_unsplash_api_key",

  // Default settings
  DEFAULT_LOCATION: "Paris, France",
  CURRENCY: "INR",

  // Cost estimator settings
  DAILY_COSTS: {
    budget: {
      accommodation: 4000,
      food: 2400,
      activities: 1600,
      transport: 800,
    },
    standard: {
      accommodation: 12000,
      food: 4800,
      activities: 3200,
      transport: 1600,
    },
    luxury: {
      accommodation: 28000,
      food: 9600,
      activities: 8000,
      transport: 4000,
    },
  },

  // Weather icons mapping
  WEATHER_ICONS: {
    "01d": "fas fa-sun", // clear sky day
    "01n": "fas fa-moon", // clear sky night
    "02d": "fas fa-cloud-sun", // few clouds day
    "02n": "fas fa-cloud-moon", // few clouds night
    "03d": "fas fa-cloud", // scattered clouds
    "03n": "fas fa-cloud",
    "04d": "fas fa-cloud", // broken clouds
    "04n": "fas fa-cloud",
    "09d": "fas fa-cloud-showers-heavy", // shower rain
    "09n": "fas fa-cloud-showers-heavy",
    "10d": "fas fa-cloud-rain", // rain day
    "10n": "fas fa-cloud-rain", // rain night
    "11d": "fas fa-bolt", // thunderstorm
    "11n": "fas fa-bolt",
    "13d": "fas fa-snowflake", // snow
    "13n": "fas fa-snowflake",
    "50d": "fas fa-smog", // mist
    "50n": "fas fa-smog",
  },

  // Sample attractions for demo
  SAMPLE_ATTRACTIONS: {
    Paris: [
      {
        name: "Eiffel Tower",
        description: "Iconic iron tower offering city views.",
        image: "/src/images/eiffel-tower.avif",
        rating: 4.7,
        price: "₹2100",
      },
      {
        name: "Louvre Museum",
        description: "World's largest art museum & historic monument.",
        image: "/src/images/louvre-museum.avif",
        rating: 4.8,
        price: "₹1400",
      },
      {
        name: "Notre-Dame Cathedral",
        description: "Medieval Catholic cathedral with gargoyles.",
        image: "/src/images/notre-dame-cathedral.avif",
        rating: 4.6,
        price: "Free",
      },
      {
        name: "Montmartre",
        description: "Artsy hilltop area with Sacré-Cœur Basilica.",
        image: "/src/images/montmartre.avif",
        rating: 4.5,
        price: "Free",
      },
      {
        name: "Seine River Cruise",
        description: "Scenic boat tour of Paris landmarks.",
        image: "/src/images/seine-river.avif",
        rating: 4.4,
        price: "₹1200",
      },
      {
        name: "Champs-Élysées",
        description: "Famous avenue with shops & Arc de Triomphe.",
        image: "/src/images/champs.avif",
        rating: 4.3,
        price: "Free",
      },
    ],
    "New York": [
      {
        name: "Statue of Liberty",
        description: "Iconic copper statue representing freedom.",
        image: "/src/images/statue-of-liberty.avif",
        rating: 4.7,
        price: "₹1900",
      },
      {
        name: "Central Park",
        description: "Urban park spanning 843 acres.",
        image: "/src/images/central-park.avif",
        rating: 4.8,
        price: "Free",
      },
      {
        name: "Empire State Building",
        description: "Iconic 102-story Art Deco skyscraper.",
        image: "/src/images/empire-state.avif",
        rating: 4.6,
        price: "₹3500",
      },
      {
        name: "Times Square",
        description:
          "Bustling intersection famous for bright lights & Broadway theaters.",
        image: "/src/images/times-square.avif",
        rating: 4.5,
        price: "Free",
      },
      {
        name: "Metropolitan Museum of Art",
        description: "One of world's largest art museums.",
        image: "/src/images/museum.avif",
        rating: 4.8,
        price: "₹2000",
      },
      {
        name: "Brooklyn Bridge",
        description: "Historic bridge connecting Manhattan & Brooklyn.",
        image: "/src/images/brooklyn-bridge.avif",
        rating: 4.7,
        price: "Free",
      },
    ],
    Tokyo: [
      {
        name: "Tokyo Skytree",
        description: "Tallest tower in Japan with observation decks.",
        image: "/src/images/tokyo-skytree.avif",
        rating: 4.5,
        price: "₹1400",
      },
      {
        name: "Senso-ji Temple",
        description: "Ancient Buddhist temple in Asakusa.",
        image: "/src/images/senso.avif",
        rating: 4.7,
        price: "Free",
      },
      {
        name: "Shibuya Crossing",
        description: "Famous busy intersection in Shibuya.",
        image: "/src/images/shibuya.avif",
        rating: 4.6,
        price: "Free",
      },
      {
        name: "Meiji Shrine",
        description: "Shinto shrine dedicated to Emperor Meiji.",
        image: "/src/images/meiji.avif",
        rating: 4.7,
        price: "Free",
      },
      {
        name: "Tokyo Disneyland",
        description: "Theme park with rides & Disney characters.",
        image: "/src/images/tokyo-disneyland.avif",
        rating: 4.8,
        price: "₹6500",
      },
      {
        name: "Tsukiji Outer Market",
        description: "Famous food market with fresh seafood.",
        image: "/src/images/tsukiji.avif",
        rating: 4.5,
        price: "Free",
      },
    ],
  },

  // Sample travel tips for destinations
  SAMPLE_TRAVEL_TIPS: {
    Paris: [
      "The Paris Museum Pass gives you access to over 50 museums and monuments.",
      "Try to visit the Eiffel Tower early in the morning to avoid crowds.",
      "Many museums in Paris are free on the first Sunday of each month.",
      "Learn a few basic French phrases - locals appreciate the effort.",
    ],
    "New York": [
      "The MetroCard is your best option for getting around the city.",
      "Visit popular attractions early in the morning or on weekdays to avoid crowds.",
      "Many museums have 'pay what you wish' days or hours.",
      "Central Park offers free guided tours on weekends.",
    ],
    Tokyo: [
      "Get a Suica or Pasmo card for easy travel on public transportation.",
      "Most restaurants have realistic food displays (sampuru) in their windows.",
      "Tipping is not customary in Japan and might even cause confusion.",
      "The best time to view cherry blossoms is late March to early April.",
    ],
  },
};
