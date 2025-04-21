/**
 * Itinerary Module
 * Handles the travel itinerary functionality
 */

const ItineraryModule = (() => {
  // Default itinerary data
  let itineraryData = [];
  const DEFAULT_DAYS = 3;
  
  /**
   * Initialize the itinerary
   */
  const initializeItinerary = () => {
    // Check if itinerary is already initialized
    if (itineraryData.length > 0) {
      return;
    }
    
    // Create default days
    for (let i = 0; i < DEFAULT_DAYS; i++) {
      addDay();
    }
    
    // Render the itinerary
    renderItinerary();
    
    // Set up event listeners
    document.getElementById('add-day-btn').addEventListener('click', () => {
      addDay();
      renderItinerary();
    });
    
    document.getElementById('save-itinerary-btn').addEventListener('click', saveItinerary);
  };
  
  /**
   * Add a new day to the itinerary
   * @returns {Object} - The newly created day
   */
  const addDay = () => {
    const dayNumber = itineraryData.length + 1;
    const newDay = {
      id: `day-${Date.now()}-${dayNumber}`,
      title: `Day ${dayNumber}`,
      activities: []
    };
    
    itineraryData.push(newDay);
    return newDay;
  };
  
  /**
   * Render the itinerary UI
   */
  const renderItinerary = () => {
    const container = document.getElementById('itinerary-container');
    container.innerHTML = '';
    
    // Create elements for each day
    itineraryData.forEach((day, index) => {
      const dayElement = createDayElement(day, index);
      container.appendChild(dayElement);
    });
    
    // Initialize sortable for each activities container
    itineraryData.forEach(day => {
      const activitiesEl = document.getElementById(`activities-${day.id}`);
      
      // Initialize Sortable.js
      if (activitiesEl) {
        new Sortable(activitiesEl, {
          group: 'itinerary-activities',
          animation: 150,
          ghostClass: 'itinerary-item-dragging',
          onEnd: (evt) => {
            // Get the day IDs
            const fromDayId = evt.from.dataset.dayId;
            const toDayId = evt.to.dataset.dayId;
            
            // Get the activity data
            const activityId = evt.item.dataset.activityId;
            
            // If moved within the same day
            if (fromDayId === toDayId) {
              // Reorder activities in the day
              reorderActivities(fromDayId, Array.from(evt.to.children).map(el => el.dataset.activityId));
            } else {
              // Move activity to another day
              moveActivity(activityId, fromDayId, toDayId, evt.newIndex);
            }
          }
        });
      }
    });
  };
  
  /**
   * Create a DOM element for a day
   * @param {Object} day - Day data
   * @param {number} index - Day index
   * @returns {HTMLElement} - The day element
   */
  const createDayElement = (day, index) => {
    const dayElement = document.createElement('div');
    dayElement.className = 'itinerary-day';
    dayElement.id = `day-${day.id}`;
    
    // Create day header
    const header = document.createElement('div');
    header.className = 'itinerary-day-header d-flex justify-content-between align-items-center';
    header.innerHTML = `
      <div>
        <span class="day-title">${day.title}</span>
        <span class="badge bg-primary ms-2">${day.activities.length} activities</span>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-danger remove-day-btn" data-day-id="${day.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    
    // Create activities container
    const activitiesContainer = document.createElement('div');
    activitiesContainer.className = 'itinerary-activities';
    activitiesContainer.id = `activities-${day.id}`;
    activitiesContainer.dataset.dayId = day.id;
    
    // Add activities to container
    day.activities.forEach(activity => {
      const activityElement = createActivityElement(activity);
      activitiesContainer.appendChild(activityElement);
    });
    
    // Add empty state if no activities
    if (day.activities.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'text-center text-muted py-4';
      emptyState.innerHTML = `
        <i class="fas fa-calendar-plus mb-2" style="font-size: 2rem;"></i>
        <p>Drag activities here or click "Add to Itinerary" from attractions</p>
      `;
      activitiesContainer.appendChild(emptyState);
    }
    
    // Assemble the day element
    dayElement.appendChild(header);
    dayElement.appendChild(activitiesContainer);
    
    // Add event listener for remove button
    setTimeout(() => {
      const removeBtn = dayElement.querySelector('.remove-day-btn');
      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          if (itineraryData.length > 1) {
            removeDay(day.id);
            renderItinerary();
          } else {
            alert('You must have at least one day in your itinerary.');
          }
        });
      }
    }, 0);
    
    return dayElement;
  };
  
  /**
   * Create an activity element
   * @param {Object} activity - Activity data
   * @returns {HTMLElement} - Activity element
   */
  const createActivityElement = (activity) => {
    const activityElement = document.createElement('div');
    activityElement.className = 'itinerary-item';
    activityElement.dataset.activityId = activity.id;
    
    activityElement.innerHTML = `
      <div class="itinerary-item-time">${activity.time || '10:00 AM'}</div>
      <div class="itinerary-item-details">
        <div class="fw-bold">${activity.name}</div>
        <div class="small text-muted">${activity.price || 'Free'}</div>
      </div>
      <div class="itinerary-item-actions">
        <button class="edit-time-btn" title="Edit time">
          <i class="fas fa-clock"></i>
        </button>
        <button class="remove-activity-btn" title="Remove activity">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    // Add event listeners
    setTimeout(() => {
      const editTimeBtn = activityElement.querySelector('.edit-time-btn');
      const removeBtn = activityElement.querySelector('.remove-activity-btn');
      
      editTimeBtn.addEventListener('click', () => {
        const newTime = prompt('Enter a new time for this activity:', activity.time || '10:00 AM');
        if (newTime) {
          updateActivityTime(activity.id, newTime);
        }
      });
      
      removeBtn.addEventListener('click', () => {
        removeActivity(activity.id);
      });
    }, 0);
    
    return activityElement;
  };
  
  /**
   * Add an attraction to the itinerary
   * @param {Object} attraction - Attraction data
   */
  const addAttractionToItinerary = (attraction) => {
    // If itinerary is empty, initialize it
    if (itineraryData.length === 0) {
      initializeItinerary();
    }
    
    // Create activity from attraction
    const activity = {
      id: `activity-${Date.now()}`,
      name: attraction.name,
      description: attraction.description,
      price: attraction.price,
      time: generateRandomTime(),
      type: 'attraction',
      attractionId: attraction.id
    };
    
    // Add to the first day by default
    if (itineraryData.length > 0) {
      itineraryData[0].activities.push(activity);
      renderItinerary();
      
      // Show a success message
      showToast(`Added ${attraction.name} to Day 1`);
    }
  };
  
  /**
   * Show a toast message
   * @param {string} message - Message to display
   */
  const showToast = (message) => {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = `toast-${Date.now()}`;
    const toastEl = document.createElement('div');
    toastEl.className = 'toast show';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.id = toastId;
    
    toastEl.innerHTML = `
      <div class="toast-header">
        <strong class="me-auto">Itinerary Updated</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;
    
    // Add to container
    toastContainer.appendChild(toastEl);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toastEl.remove();
    }, 3000);
  };
  
  /**
   * Generate a random time for activities
   * @returns {string} - Time string in format "HH:MM AM/PM"
   */
  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * (12 - 9 + 1)) + 9; // 9 AM to 5 PM
    const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    const ampm = hours < 12 ? 'AM' : 'PM';
    
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };
  
  /**
   * Remove a day from the itinerary
   * @param {string} dayId - Day ID to remove
   */
  const removeDay = (dayId) => {
    itineraryData = itineraryData.filter(day => day.id !== dayId);
    
    // Rename days to maintain sequence
    itineraryData.forEach((day, index) => {
      day.title = `Day ${index + 1}`;
    });
  };
  
  /**
   * Remove an activity from the itinerary
   * @param {string} activityId - Activity ID to remove
   */
  const removeActivity = (activityId) => {
    // Find the day containing this activity
    itineraryData.forEach(day => {
      const activityIndex = day.activities.findIndex(a => a.id === activityId);
      if (activityIndex !== -1) {
        day.activities.splice(activityIndex, 1);
      }
    });
    
    renderItinerary();
  };
  
  /**
   * Update an activity's time
   * @param {string} activityId - Activity ID
   * @param {string} newTime - New time value
   */
  const updateActivityTime = (activityId, newTime) => {
    // Find the activity and update its time
    itineraryData.forEach(day => {
      const activity = day.activities.find(a => a.id === activityId);
      if (activity) {
        activity.time = newTime;
      }
    });
    
    renderItinerary();
  };
  
  /**
   * Reorder activities within a day
   * @param {string} dayId - Day ID
   * @param {Array} activityIds - Array of activity IDs in the new order
   */
  const reorderActivities = (dayId, activityIds) => {
    // Find the day
    const day = itineraryData.find(d => d.id === dayId);
    if (!day) return;
    
    // Create a new activities array with the new order
    const newActivities = [];
    activityIds.forEach(activityId => {
      const activity = day.activities.find(a => a.id === activityId);
      if (activity) {
        newActivities.push(activity);
      }
    });
    
    // Update the day's activities
    day.activities = newActivities;
  };
  
  /**
   * Move an activity from one day to another
   * @param {string} activityId - Activity ID
   * @param {string} fromDayId - Source day ID
   * @param {string} toDayId - Target day ID
   * @param {number} newIndex - Position in the target day
   */
  const moveActivity = (activityId, fromDayId, toDayId, newIndex) => {
    // Find source and target days
    const fromDay = itineraryData.find(d => d.id === fromDayId);
    const toDay = itineraryData.find(d => d.id === toDayId);
    
    if (!fromDay || !toDay) return;
    
    // Find the activity in the source day
    const activityIndex = fromDay.activities.findIndex(a => a.id === activityId);
    if (activityIndex === -1) return;
    
    // Remove from source day
    const activity = fromDay.activities.splice(activityIndex, 1)[0];
    
    // Add to target day at the specified index
    toDay.activities.splice(newIndex, 0, activity);
  };
  
  /**
   * Save the itinerary
   */
  const saveItinerary = () => {
    try {
      // Save to localStorage
      localStorage.setItem('travelItinerary', JSON.stringify(itineraryData));
      
      // Get destination data for the saved itinerary
      const destination = DestinationService.getCurrentDestination();
      if (destination) {
        localStorage.setItem('travelDestination', JSON.stringify({
          name: destination.name,
          country: destination.country,
          saveDate: new Date().toISOString()
        }));
      }
      
      showToast('Itinerary saved successfully! ✅');
    } catch (error) {
      console.error('Error saving itinerary:', error);
      alert('There was an error saving your itinerary. Please try again.');
    }
  };
  
  /**
   * Load the saved itinerary
   * @returns {boolean} - True if itinerary was loaded, false otherwise
   */
  const loadSavedItinerary = () => {
    try {
      const savedItinerary = localStorage.getItem('travelItinerary');
      if (savedItinerary) {
        itineraryData = JSON.parse(savedItinerary);
        return true;
      }
    } catch (error) {
      console.error('Error loading saved itinerary:', error);
    }
    return false;
  };
  
  // Public API
  return {
    initializeItinerary,
    addAttractionToItinerary,
    loadSavedItinerary,
    renderItinerary
  };
})();