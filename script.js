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
    
