const placeForm = document.getElementById('placeForm');
const placesList = document.getElementById('placesList');
const emptyState = document.getElementById('empty-state');
const successMessage = document.getElementById('success-message');

// Load from localStorage or start with empty array
let places = JSON.parse(localStorage.getItem('visitedPlaces')) || [];

// Render places when page loads
document.addEventListener('DOMContentLoaded', renderPlaces);

// Handle form submit
placeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    clearErrors();
    
    const formData = new FormData(placeForm);
    
    const placeName = formData.get('placeName').trim();
    const city = formData.get('city').trim();
    const dateVisited = formData.get('dateVisited');
    const landmarks = formData.get('landmarks').trim();
    const season = formData.get('season');
    const rating = formData.get('rating');
    const notes = formData.get('notes').trim();

    // Validation
    let hasError = false;
    if (!placeName) {
        showError('placeName-error', 'Place name is required');
        hasError = true;
    }
    if (!city) {
        showError('city-error', 'City/Country is required');
        hasError = true;
    }
    if (!dateVisited) {
        showError('date-error', 'Date is required');
        hasError = true;
    }
    if (hasError) return;

    // Create new place object
    const newPlace = {
        id: Date.now(),
        placeName,
        city,
        dateVisited,
        landmarks,
        season,
        rating,
        notes
    };

    // Add to array, save, and re-render
    places.unshift(newPlace);
    savePlaces();
    renderPlaces();
    
    // Reset form and show success
    placeForm.reset();
    showSuccess();
});

// Render all places as cards
function renderPlaces() {
    if (places.length === 0) {
        placesList.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    emptyState.style.display = 'none';
    
    placesList.innerHTML = places.map(place => `
        <div class="place-card">
            <div class="place-header">
                <h3>${escapeHTML(place.placeName)}</h3>
                <button class="delete-btn" onclick="deletePlace(${place.id})" aria-label="Delete">×</button>
            </div>
            <p><strong>Location:</strong> ${escapeHTML(place.city)}</p>
            <p><strong>Date:</strong> ${formatDate(place.dateVisited)}</p>
            <p><strong>Season:</strong> ${place.season}</p>
            <p><strong>Rating:</strong> ${'⭐'.repeat(place.rating)} ${place.rating}/5</p>
            ${place.landmarks ? <p><strong>Landmarks:</strong> ${escapeHTML(place.landmarks)}</p> : ''}
            ${place.notes ? <p><strong>Notes:</strong> ${escapeHTML(place.notes)}</p> : ''}
        </div>
    `).join('');
}

// Delete a place by ID
function deletePlace(id) {
    places = places.filter(p => p.id !== id);
    savePlaces();
    renderPlaces();
}

// Save places to localStorage
function savePlaces() {
    localStorage.setItem('visitedPlaces', JSON.stringify(places));
}

// Format date to readable format
function formatDate(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date)) return 'Invalid date';
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Show error message under input
function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }
}

// Clear all error messages
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
}
