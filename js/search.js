/**
 * Search module
 * Handles destination search functionality
 */

const SearchModule = (() => {
  // DOM elements
  const searchInput = document.getElementById('destination-search');
  const searchButton = document.getElementById('search-btn');
  const suggestionsContainer = document.getElementById('search-suggestions');
  const loadingIndicator = document.getElementById('loading-indicator');
  
  // Current state
  let currentTimeout = null;
  let selectedLocation = null;
  
  /**
   * Initialize the search module
   */
  const init = () => {
    // Add event listeners
    searchInput.addEventListener('input', handleSearchInput);
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
    
    // Click outside to close suggestions
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        hideSuggestions();
      }
    });
  };
  
  /**
   * Handle search input with debounce
   */
  const handleSearchInput = () => {
    const query = searchInput.value.trim();
    
    // Clear previous timeout
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    
    // Set a new timeout for debounce
    currentTimeout = setTimeout(() => {
      if (query.length >= 2) {
        fetchSuggestions(query);
      } else {
        hideSuggestions();
      }
    }, 300);
  };
  
  /**
   * Fetch location suggestions based on query
   * @param {string} query - The search query
   */
  const fetchSuggestions = async (query) => {
    try {
      const results = await ApiService.searchLocations(query);
      displaySuggestions(results);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  
  /**
   * Display location suggestions
   * @param {Array} results - The location results
   */
  const displaySuggestions = (results) => {
    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';
    
    if (results.length === 0) {
      hideSuggestions();
      return;
    }
    
    // Create suggestion items
    results.forEach(location => {
      const item = document.createElement('div');
      item.className = 'search-suggestion-item';
      item.textContent = location.formatted;
      
      // Add click event to select location
      item.addEventListener('click', () => {
        selectLocation(location);
      });
      
      suggestionsContainer.appendChild(item);
    });
    
    // Show suggestions container
    suggestionsContainer.style.display = 'block';
  };
  
  /**
   * Hide suggestions container
   */
  const hideSuggestions = () => {
    suggestionsContainer.style.display = 'none';
  };
  
  /**
   * Select a location from suggestions
   * @param {Object} location - The selected location
   */
  const selectLocation = (location) => {
    searchInput.value = location.formatted;
    selectedLocation = location;
    hideSuggestions();
  };
  
  /**
   * Handle search button click
   */
  const handleSearch = async () => {
    const query = searchInput.value.trim();
    
    if (!query) {
      return;
    }
    
    // Show loading indicator
    loadingIndicator.classList.remove('d-none');
    
    try {
      // If no location was selected from suggestions, search for it
      if (!selectedLocation) {
        const results = await ApiService.searchLocations(query);
        if (results.length > 0) {
          selectedLocation = results[0];
        } else {
          alert('Location not found. Please try again.');
          loadingIndicator.classList.add('d-none');
          return;
        }
      }
      
      // Fetch destination data
      await DestinationService.loadDestination(selectedLocation);
      
      // Show destination and itinerary sections
      document.getElementById('destination-overview').classList.remove('d-none');
      document.getElementById('itinerary').classList.remove('d-none');
      
      // Scroll to destination section
      document.getElementById('destination-overview').scrollIntoView({ 
        behavior: 'smooth' 
      });
      
      // Reset selectedLocation for next search
      selectedLocation = null;
    } catch (error) {
      console.error('Error searching destination:', error);
      alert('An error occurred while searching. Please try again.');
    } finally {
      // Hide loading indicator
      loadingIndicator.classList.add('d-none');
    }
  };
  
  // Public API
  return {
    init
  };
})();

/**
 * Destination Service
 * Handles loading and displaying destination data
 */
const DestinationService = (() => {
  // Current destination data
  let currentDestination = null;
  
  /**
   * Load destination data
   * @param {Object} location - The location object
   */
  const loadDestination = async (location) => {
    try {
      currentDestination = {
        name: location.formatted,
        coordinates: location.geometry,
        country: location.components.country
      };
      
      // Fetch all necessary data in parallel
      const [weather, attractions, travelTips, destinationImage] = await Promise.all([
        ApiService.getWeatherData(location.geometry.lat, location.geometry.lng),
        ApiService.getAttractions(location.formatted),
        ApiService.getTravelTips(location.formatted),
        ApiService.getDestinationImage(location.formatted)
      ]);
      
      // Store all data
      currentDestination.weather = weather;
      currentDestination.attractions = attractions;
      currentDestination.travelTips = travelTips;
      currentDestination.image = destinationImage;
      
      // Display all sections
      displayDestinationHeader();
      WeatherModule.displayWeather(weather);
      AttractionsModule.displayAttractions(attractions);
      displayTravelTips(travelTips);
      
      // Initialize itinerary if not already done
      ItineraryModule.initializeItinerary();
      
      return currentDestination;
    } catch (error) {
      console.error('Error loading destination:', error);
      throw error;
    }
  };
  
  /**
   * Display destination header
   */
  const displayDestinationHeader = () => {
    const headerContainer = document.getElementById('destination-header');
    headerContainer.innerHTML = `
      <div class="destination-header">
        <img src="${currentDestination.image}" alt="${currentDestination.name}" class="destination-image">
        <div class="destination-info">
          <h2>${currentDestination.name}</h2>
          <div class="badges mb-2">
            <span class="badge badge-info">Popular Destination</span>
            <span class="badge badge-info">${getCurrentSeason()}</span>
          </div>
          <p class="text-muted">Coordinates: ${currentDestination.coordinates.lat.toFixed(2)}, ${currentDestination.coordinates.lng.toFixed(2)}</p>
        </div>
      </div>
    `;
  };
  
  /**
   * Display travel tips
   * @param {Array} tips - Array of travel tips
   */
  const displayTravelTips = (tips) => {
    const tipsContainer = document.getElementById('travel-tips');
    tipsContainer.innerHTML = '';
    
    tips.forEach(tip => {
      const tipElement = document.createElement('div');
      tipElement.className = 'travel-tip';
      tipElement.innerHTML = `
        <div class="travel-tip-icon">
          <i class="fas fa-lightbulb"></i>
        </div>
        <div class="travel-tip-text">${tip}</div>
      `;
      tipsContainer.appendChild(tipElement);
    });
  };
  
  /**
   * Get current season based on month
   * @returns {string} Current season
   */
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Autumn';
    return 'Winter';
  };
  
  /**
   * Get current destination
   * @returns {Object} Current destination
   */
  const getCurrentDestination = () => {
    return currentDestination;
  };
  
  // Public API
  return {
    loadDestination,
    getCurrentDestination
  };
})();