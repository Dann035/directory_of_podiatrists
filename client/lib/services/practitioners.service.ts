/**
 * Practitioners service
 */

import { apiRequest } from '../api-client';
import { Practitioner } from '../types';

export interface SearchParams {
  q?: string;
  city?: string;
  postalCode?: string;
  service?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  verified?: boolean;
  page?: number;
  perPage?: number;
}

export interface SearchResponse {
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
  data: Practitioner[];
}

export interface PractitionerDetail extends Practitioner {
  services: Array<{
    id: string;
    title: string;
    description?: string;
    price?: number;
    durationMinutes?: number;
  }>;
  reviews: Array<{
    id: string;
    rating: number;
    comment?: string;
    createdAt: string;
    user?: {
      name: string;
    };
  }>;
  _count: {
    reviews: number;
  };
}

export const practitionersService = {
  /**
   * Search practitioners
   */
  async search(params: SearchParams = {}): Promise<SearchResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/practitioners${queryString ? `?${queryString}` : ''}`;

    return apiRequest<SearchResponse>(endpoint, {
      method: 'GET',
    });
  },

  /**
   * Get practitioner by slug
   */
  async getBySlug(slug: string): Promise<PractitionerDetail> {
    return apiRequest<PractitionerDetail>(`/practitioners/${slug}`, {
      method: 'GET',
    });
  },

  /**
   * Get featured practitioners (first 5)
   */
  async getFeatured(): Promise<Practitioner[]> {
    const response = await this.search({ perPage: 5, verified: true });
    return response.data;
  },
};

