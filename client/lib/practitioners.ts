/**
 * Functions for fetching practitioner data
 */

import { Practitioner } from './types';
import { getApiBase } from './api';

const FEATURED_LIMIT = 5;

/**
 * Fetches featured practitioners from the API
 * @returns Array of featured practitioners (max 5)
 */
export async function fetchFeaturedPractitioners(): Promise<Practitioner[]> {
  try {
    const baseUrl = getApiBase();
    const apiUrl = baseUrl 
      ? `${baseUrl}/practitioners`
      : '/api/practitioners';
    
    const res = await fetch(apiUrl, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch practitioners: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    
    // Handle both array responses and object with data property
    const practitioners = Array.isArray(data) 
      ? data 
      : Array.isArray(data?.data) 
        ? data.data 
        : [];

    return practitioners.slice(0, FEATURED_LIMIT);
  } catch (error) {
    console.error('Error fetching featured practitioners:', error);
    return [];
  }
}

