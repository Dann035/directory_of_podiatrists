/**
 * Practitioners utility functions
 * Uses the new practitioners service for API calls
 */

import { practitionersService } from './services/practitioners.service';
import { Practitioner } from './types';

/**
 * Fetches featured practitioners from the API
 * @returns Array of featured practitioners (max 5)
 */
export async function fetchFeaturedPractitioners(): Promise<Practitioner[]> {
  try {
    return await practitionersService.getFeatured();
  } catch (error) {
    console.error('Error fetching featured practitioners:', error);
    return [];
  }
}

