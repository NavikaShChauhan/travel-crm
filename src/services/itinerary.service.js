import { MOCK_ITINERARY } from '../modules/itinerary/data/itinerary.mock';

/**
 * itinerary.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "itinerary" domain.
 * Integrates with localStorage to mock backend behavior in planning mode,
 * maintaining MERN-readiness.
 */

const STORAGE_KEY = 'voyage_itineraries';

const getStoredItineraries = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ITINERARY));
    return MOCK_ITINERARY;
  }
  try {
    const parsed = JSON.parse(stored);
    // If the stored data is the old 3-item list, reset it to the new 8-item dataset
    if (parsed.length === 3 && parsed[0].id === 'ITIN-2026-0001' && parsed[0].name.includes('Maldives')) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ITINERARY));
      return MOCK_ITINERARY;
    }
    return parsed;
  } catch (e) {
    return MOCK_ITINERARY;
  }
};

const saveStoredItineraries = (itineraries) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(itineraries));
};

export const getAll = async (params = {}) => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  let list = getStoredItineraries();
  
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    list = list.filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.customerName.toLowerCase().includes(searchLower) ||
        item.destination.toLowerCase().includes(searchLower) ||
        item.id.toLowerCase().includes(searchLower)
    );
  }
  
  if (params.type && params.type !== 'All') {
    list = list.filter((item) => item.type.toLowerCase() === params.type.toLowerCase());
  }

  if (params.status && params.status !== 'All') {
    list = list.filter((item) => item.status.toLowerCase() === params.status.toLowerCase());
  }
  
  return list;
};

export const getById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const list = getStoredItineraries();
  const found = list.find((item) => item.id === id);
  if (!found) throw new Error(`Itinerary ${id} not found`);
  return found;
};

export const create = async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const list = getStoredItineraries();
  
  const newItin = {
    ...payload,
    createdAt: new Date().toISOString(),
  };
  
  list.unshift(newItin);
  saveStoredItineraries(list);
  return newItin;
};

export const update = async (id, payload) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const list = getStoredItineraries();
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) throw new Error(`Itinerary ${id} not found`);
  
  const updatedItin = {
    ...list[index],
    ...payload,
    updatedAt: new Date().toISOString(),
  };
  
  list[index] = updatedItin;
  saveStoredItineraries(list);
  return updatedItin;
};

export const remove = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  let list = getStoredItineraries();
  list = list.filter((item) => item.id !== id);
  saveStoredItineraries(list);
  return { success: true };
};
