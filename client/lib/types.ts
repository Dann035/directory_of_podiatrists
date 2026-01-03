/**
 * Type definitions for the application
 */

export interface Practitioner {
  id: string;
  nombre: string;
  ciudad?: string;
  direccion?: string;
  telefono?: string;
  especialidades?: string[];
  // Support for English field names as fallback
  name?: string;
  city?: string;
  address?: string;
  phone?: string;
  specialties?: string[];
}

export interface Category {
  key: string;
  title: string;
  slug: string;
}

export interface Testimonial {
  author: string;
  text: string;
  rating: number;
}

