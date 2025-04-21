/**
 * Main Application Module
 * Initializes and coordinates all modules
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initializeApp();
  
  // Reveal animations on scroll
  initializeScrollAnimations();
});

/**
 * Initialize the application
 */
function initializeApp() {
  // Initialize search functionality
  SearchModule.init();
  
  // Initialize cost estimator
  CostEstimatorModule.init();
  
  // Try to load saved itinerary
  const hasSavedItinerary = ItineraryModule.loadSavedItinerary();
  if (hasSavedItinerary) {
    ItineraryModule.renderItinerary();
    document.getElementById('itinerary').classList.remove('d-none');
  }
  
  // Check URL parameters for preset destination
  const urlParams = new URLSearchParams(window.location.search);
  const destination = urlParams.get('destination');
  
  if (destination) {
    // Set the search input and trigger search
    document.getElementById('destination-search').value = destination;
    document.getElementById('search-btn').click();
  }
  
  // Add listener for navbar scrolling effects
  window.addEventListener('scroll', handleNavbarScroll);
  
  // Add resize listener for responsive adjustments
  window.addEventListener('resize', handleWindowResize);
}

/**
 * Initialize scroll animations
 */
function initializeScrollAnimations() {
  // Add the 'reveal' class to elements that should animate on scroll
  document.querySelectorAll('.card').forEach(card => {
    card.classList.add('reveal');
  });
  
  // Function to check if element is in viewport and add active class
  function checkReveal() {
    const elements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementPosition < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  // Check on scroll
  window.addEventListener('scroll', checkReveal);
  
  // Check once on load
  checkReveal();
}

/**
 * Handle navbar appearance on scroll
 */
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-sm');
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
  } else {
    navbar.classList.remove('shadow-sm');
    navbar.style.background = 'white';
  }
}

/**
 * Handle window resize events
 */
function handleWindowResize() {
  // Adjust UI elements for different screen sizes
  const windowWidth = window.innerWidth;
  
  if (windowWidth < 768) {
    // Mobile adjustments
    document.querySelectorAll('.weather-card').forEach(card => {
      card.style.minWidth = '90px';
    });
  } else {
    // Desktop adjustments
    document.querySelectorAll('.weather-card').forEach(card => {
      card.style.minWidth = '120px';
    });
  }
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
  // Create error toast
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
  
  const toast = document.createElement('div');
  toast.className = 'toast show';
  toast.role = 'alert';
  toast.ariaLive = 'assertive';
  toast.ariaAtomic = 'true';
  
  toast.innerHTML = `
    <div class="toast-header bg-danger text-white">
      <strong class="me-auto">Error</strong>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  `;
  
  toastContainer.appendChild(toast);
  document.body.appendChild(toastContainer);
  
  // Remove after 5 seconds
  setTimeout(() => {
    toastContainer.remove();
  }, 5000);
}