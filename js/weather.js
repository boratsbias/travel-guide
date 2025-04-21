/**
 * Weather Module
 * Handles displaying weather information
 */

const WeatherModule = (() => {
  /**
   * Display weather information
   * @param {Object} weatherData - Weather data object
   */
  const displayWeather = (weatherData) => {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = '';
    
    if (!weatherData || !weatherData.days || weatherData.days.length === 0) {
      weatherContainer.innerHTML = '<p>Weather data not available</p>';
      return;
    }
    
    // Display each day's weather
    weatherData.days.forEach(day => {
      const weatherCard = createWeatherCard(day);
      weatherContainer.appendChild(weatherCard);
    });
  };
  
  /**
   * Create a weather card for a single day
   * @param {Object} dayData - Weather data for one day
   * @returns {HTMLElement} - Weather card element
   */
  const createWeatherCard = (dayData) => {
    const card = document.createElement('div');
    card.className = 'weather-card';
    
    // Format date
    const date = dayData.date;
    const formattedDate = formatDate(date);
    
    // Get weather icon
    const iconClass = CONFIG.WEATHER_ICONS[dayData.weather.icon] || 'fas fa-cloud';
    
    card.innerHTML = `
      <div class="weather-icon">
        <i class="${iconClass}"></i>
      </div>
      <div class="weather-date">${formattedDate}</div>
      <div class="weather-temp">${dayData.temp}°C</div>
      <div class="weather-desc">${dayData.weather.description}</div>
    `;
    
    return card;
  };
  
  /**
   * Format a date object to display weekday and day
   * @param {Date|string} date - Date object or string
   * @returns {string} - Formatted date string
   */
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}`;
  };
  
  // Public API
  return {
    displayWeather
  };
})();