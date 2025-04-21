/**
 * Attractions Module
 * Handles displaying attraction information
 */

const AttractionsModule = (() => {
  /**
   * Display attractions for a destination
   * @param {Array} attractions - Array of attraction objects
   */
  const displayAttractions = (attractions) => {
    const container = document.getElementById('attractions-container');
    container.innerHTML = '';
    
    if (!attractions || attractions.length === 0) {
      container.innerHTML = '<p>No attractions found for this destination.</p>';
      return;
    }
    
    // Display each attraction
    attractions.forEach((attraction, index) => {
      const attractionCard = createAttractionCard(attraction, index);
      container.appendChild(attractionCard);
    });
    
    // Add animation to cards
    setTimeout(() => {
      document.querySelectorAll('.attraction-card').forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('show');
        }, index * 100);
      });
    }, 100);
  };
  
  /**
   * Create an attraction card
   * @param {Object} attraction - Attraction data object
   * @param {number} index - Index for animation delay
   * @returns {HTMLElement} - Attraction card element
   */
  const createAttractionCard = (attraction, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    const card = document.createElement('div');
    card.className = 'card attraction-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Generate star rating HTML
    const stars = generateStarRating(attraction.rating);
    
    card.innerHTML = `
      <img src="${attraction.image}" class="card-img-top" alt="${attraction.name}">
      <div class="card-body">
        <h5 class="card-title">${attraction.name}</h5>
        <div class="d-flex justify-content-between mb-2">
          <div class="ratings">
            ${stars}
          </div>
          <div class="price">${attraction.price}</div>
        </div>
        <p class="card-text">${attraction.description}</p>
        <div class="d-flex justify-content-between">
          <button class="btn btn-sm btn-outline-primary add-to-itinerary" data-attraction='${JSON.stringify(attraction)}'>
            <i class="fas fa-plus"></i> Add to Itinerary
          </button>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="fas fa-info-circle"></i> Details
          </button>
        </div>
      </div>
    `;
    
    // Add event listener for "Add to Itinerary" button
    setTimeout(() => {
      const addButton = card.querySelector('.add-to-itinerary');
      addButton.addEventListener('click', () => {
        const attractionData = JSON.parse(addButton.dataset.attraction);
        ItineraryModule.addAttractionToItinerary(attractionData);
      });
    }, 0);
    
    col.appendChild(card);
    return col;
  };
  
  /**
   * Generate HTML for star rating
   * @param {number} rating - Rating value (0-5)
   * @returns {string} - HTML for star rating
   */
  const generateStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHtml = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fas fa-star text-warning"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
      starsHtml += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += '<i class="far fa-star text-warning"></i>';
    }
    
    return starsHtml;
  };
  
  // Public API
  return {
    displayAttractions
  };
})();