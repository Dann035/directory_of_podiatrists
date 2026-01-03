/**
 * Static data constants for the home page
 */

import { Category, Testimonial } from './types';

export const CATEGORIES: Category[] = [
  { key: 'uñas', title: 'Tratamientos uñas', slug: 'unias' },
  { key: 'plantillas', title: 'Plantillas y ortopedia', slug: 'plantillas' },
  { key: 'fascitis', title: 'Fascitis plantar', slug: 'fascitis' },
  { key: 'diabetes', title: 'Cuidado pie diabético', slug: 'diabetes' },
];

export const BENEFITS: string[] = [
  'Profesionales verificados',
  'Reseñas reales de pacientes',
  'Reserva fácil y rápida',
  'Soporte y devolución segura',
];

export const TESTIMONIALS: Testimonial[] = [
  {
    author: 'Laura, Madrid',
    text: 'Encontré un podólogo excelente cerca de casa. Reserva sencilla y atención profesional.',
    rating: 5,
  },
  {
    author: 'Carlos, Barcelona',
    text: 'La ficha del profesional tenía todo lo que necesitaba: horarios y teléfono.',
    rating: 4.5,
  },
  {
    author: 'Ana, Valencia',
    text: 'Excelente servicio. El podólogo fue muy profesional y resolvió mi problema de fascitis plantar rápidamente.',
    rating: 5,
  },
  {
    author: 'Miguel, Sevilla',
    text: 'Muy contento con la atención recibida. La plataforma es fácil de usar y encontré cita el mismo día.',
    rating: 4.8,
  },
  {
    author: 'Sofía, Bilbao',
    text: 'Recomiendo totalmente este directorio. Encontré varios profesionales cerca de mi zona y pude comparar reseñas.',
    rating: 5,
  },
  {
    author: 'Javier, Zaragoza',
    text: 'Proceso de reserva muy sencillo. El profesional me contactó rápidamente y la atención fue impecable.',
    rating: 4.7,
  },
  {
    author: 'Elena, Málaga',
    text: 'Llevaba tiempo buscando un buen podólogo y aquí lo encontré. Las reseñas me ayudaron mucho a decidirme.',
    rating: 5,
  },
];

export const HOW_IT_WORKS_STEPS: string[] = [
  'Busca por ciudad o especialidad.',
  'Revisa el perfil del profesional y sus reseñas.',
  'Reserva una cita en minutos.',
];

export const TRUST_FEATURES: string[] = [
  'Profesionales verificados',
  'Reseñas reales',
  'Reservas confirmadas por email',
];

