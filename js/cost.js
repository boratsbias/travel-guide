/**
 * Cost Estimator Module
 * Handles the travel cost estimation functionality
 */

const CostEstimatorModule = (() => {
  /**
   * Initialize the cost estimator
   */
  const init = () => {
    // Add event listener to the calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', calculateEstimate);
    }
  };
  
  /**
   * Calculate cost estimate based on user inputs
   */
  const calculateEstimate = () => {
    // Get input values
    const duration = Number(document.getElementById('duration').value) || 7;
    const travelStyle = document.getElementById('travel-style').value || 'standard';
    
    // Get the current destination
    const destination = DestinationService.getCurrentDestination();
    if (!destination) {
      showEstimate('Please select a destination first.');
      return;
    }
    
    // Get costs from config
    const costs = CONFIG.DAILY_COSTS[travelStyle];
    if (!costs) {
      showEstimate('Invalid travel style selected.');
      return;
    }
    
    // Calculate the total costs
    const accommodationCost = costs.accommodation * duration;
    const foodCost = costs.food * duration;
    const activitiesCost = costs.activities * duration;
    const transportCost = costs.transport * duration;
    
    // Apply destination-specific modifiers
    const modifier = getDestinationCostModifier(destination.name);
    
    // Calculate total with modifier
    const totalCost = Math.round((accommodationCost + foodCost + activitiesCost + transportCost) * modifier);
    
    // Show the breakdown
    const result = `
      <h5 class="mb-3">Estimated Cost: ₹${totalCost}</h5>
      <div class="small">
        <div class="d-flex justify-content-between mb-1">
          <span>Accommodation:</span>
          <span>₹${Math.round(accommodationCost * modifier)}</span>
        </div>
        <div class="d-flex justify-content-between mb-1">
          <span>Food & Drinks:</span>
          <span>₹${Math.round(foodCost * modifier)}</span>
        </div>
        <div class="d-flex justify-content-between mb-1">
          <span>Activities & Attractions:</span>
          <span>₹${Math.round(activitiesCost * modifier)}</span>
        </div>
        <div class="d-flex justify-content-between mb-1">
          <span>Local Transportation:</span>
          <span>₹${Math.round(transportCost * modifier)}</span>
        </div>
      </div>
      <div class="mt-2 small text-muted">
        *Estimate doesn't include flights to/from ${destination.name}.
      </div>
    `;
    
    showEstimate(result);
  };
  
  /**
   * Show the cost estimate in the UI
   * @param {string} content - HTML content to display
   */
  const showEstimate = (content) => {
    const resultContainer = document.getElementById('cost-result');
    resultContainer.innerHTML = content;
    
    // Add an animation
    resultContainer.classList.add('animate-fade-in');
    setTimeout(() => {
      resultContainer.classList.remove('animate-fade-in');
    }, 1000);
  };
  
  /**
   * Get cost modifier based on destination
   * @param {string} destination - Destination name
   * @returns {number} - Cost modifier value
   */
  const getDestinationCostModifier = (destination) => {
    // Extract city from destination
    const city = destination.split(',')[0].trim().toLowerCase();
    
    // Define city-specific cost modifiers
    const modifiers = {
      'paris': 1.25,
      'london': 1.3,
      'new york': 1.4,
      'tokyo': 1.2,
      'bangkok': 0.7,
      'bali': 0.65,
      'rome': 1.15,
      'sydney': 1.25,
      'barcelona': 1.1,
      'amsterdam': 1.2,
      'berlin': 1.05,
      'hong kong': 1.3,
      'singapore': 1.25,
      'dubai': 1.4,
      'istanbul': 0.85,
      'cape town': 0.9,
      'mexico city': 0.75,
      'rio de janeiro': 0.8,
      'moscow': 1.1,
      'mumbai': 0.6
    };
    
    // Return modifier if city exists, or default to 1
    return modifiers[city] || 1;
  };
  
  // Public API
  return {
    init,
    calculateEstimate
  };
})();