/**
 * Tests for API utility functions
 */

import { getApiBase, apiFetch } from '../api';

// Mock fetch
global.fetch = jest.fn();

describe('getApiBase', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns empty string when NEXT_PUBLIC_API_URL is not set', () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    expect(getApiBase()).toBe('');
  });

  it('returns API URL without trailing slash', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com/';
    expect(getApiBase()).toBe('https://api.example.com');
  });

  it('returns API URL as is when no trailing slash', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
    expect(getApiBase()).toBe('https://api.example.com');
  });
});

describe('apiFetch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.NEXT_PUBLIC_API_URL;
  });

  it('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiFetch('/test');
    expect(result).toEqual(mockData);
  });

  it('throws error on failed request', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(apiFetch('/test')).rejects.toThrow('API error 404');
  });

  it('constructs URL with base when NEXT_PUBLIC_API_URL is set', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await apiFetch('/test');
    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/test', {});
  });

  it('uses path as is when no base URL', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await apiFetch('/test');
    expect(global.fetch).toHaveBeenCalledWith('/test', {});
  });

  it('passes fetch options correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const options = { method: 'POST', body: JSON.stringify({ test: true }) };
    await apiFetch('/test', options);
    
    expect(global.fetch).toHaveBeenCalledWith('/test', options);
  });
});

