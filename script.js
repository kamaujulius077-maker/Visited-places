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

