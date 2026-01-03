/**
 * Tests for practitioners utility functions
 */

import { fetchFeaturedPractitioners } from '../practitioners';

// Mock fetch
global.fetch = jest.fn();

describe('fetchFeaturedPractitioners', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and returns practitioners', async () => {
    const mockPractitioners = [
      { id: '1', nombre: 'Dr. Juan', especialidades: ['Uñas'] },
      { id: '2', nombre: 'Dra. María', especialidades: ['Ortopedia'] },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPractitioners,
    });

    const result = await fetchFeaturedPractitioners();
    expect(result).toEqual(mockPractitioners);
  });

  it('returns empty array on fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const result = await fetchFeaturedPractitioners();
    expect(result).toEqual([]);
  });

  it('returns empty array when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const result = await fetchFeaturedPractitioners();
    expect(result).toEqual([]);
  });

  it('limits results to 5 practitioners', async () => {
    const mockPractitioners = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      nombre: `Dr. ${i}`,
      especialidades: ['Test'],
    }));

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPractitioners,
    });

    const result = await fetchFeaturedPractitioners();
    expect(result).toHaveLength(5);
  });

  it('handles response with data property', async () => {
    const mockPractitioners = [
      { id: '1', nombre: 'Dr. Juan', especialidades: ['Uñas'] },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockPractitioners }),
    });

    const result = await fetchFeaturedPractitioners();
    expect(result).toEqual(mockPractitioners);
  });

  it('returns empty array for non-array response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Not an array' }),
    });

    const result = await fetchFeaturedPractitioners();
    expect(result).toEqual([]);
  });
});

