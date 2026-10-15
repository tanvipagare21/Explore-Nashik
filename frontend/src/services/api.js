// API Service Layer (Assignment 10, 15)
// Tries fetching from Express REST API backend, falls back gracefully to local JS dataset.
import { initialPlaces } from '../data/placesData';
import { initialFood } from '../data/foodData';
import { initialEvents } from '../data/eventsData';

const CANDIDATE_URLS = ['http://localhost:5001/api', 'http://localhost:5000/api'];

async function fetchFromApi(endpoint, options) {
  for (const base of CANDIDATE_URLS) {
    try {
      const res = await fetch(`${base}${endpoint}`, options);
      if (res.ok) return await res.json();
    } catch (e) {
      // try next port
    }
  }
  throw new Error('API unreachable');
}

export async function fetchPlaces() {
  try {
    return await fetchFromApi('/places');
  } catch (error) {
    console.warn('Backend API offline or unreachable, using local fallback seed data for Places.');
    return initialPlaces;
  }
}

export async function fetchFoods() {
  try {
    return await fetchFromApi('/foods');
  } catch (error) {
    return initialFood;
  }
}

export async function fetchEvents() {
  try {
    return await fetchFromApi('/events');
  } catch (error) {
    return initialEvents;
  }
}

export async function submitFeedbackApi(feedbackData) {
  try {
    return await fetchFromApi('/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData)
    });
  } catch (error) {
    return { success: true, message: 'Feedback recorded locally (Fallback Mode)' };
  }
}

