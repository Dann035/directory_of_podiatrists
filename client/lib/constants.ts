/**
 * Static data constants for the home page
 */

import { Category, Testimonial, Benefit } from './types';

export const CATEGORIES: Category[] = [
  { 
    key: 'uñas', 
    title: 'Tratamientos de uñas', 
    slug: 'unias',
    icon: '💅',
    description: 'Uñas encarnadas, hongos y cuidado general',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    key: 'plantillas', 
    title: 'Plantillas y ortopedia', 
    slug: 'plantillas',
    icon: '👟',
    description: 'Plantillas personalizadas y corrección postural',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    key: 'fascitis', 
    title: 'Fascitis plantar', 
    slug: 'fascitis',
    icon: '🦶',
    description: 'Tratamiento del dolor en la planta del pie',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    key: 'diabetes', 
    title: 'Pie diabético', 
    slug: 'diabetes',
    icon: '🩺',
    description: 'Cuidado especializado para pacientes diabéticos',
    color: 'from-orange-500 to-red-500'
  },
];

export const BENEFITS: Benefit[] = [
  {
    title: 'Profesionales verificados',
    description: 'Todos nuestros podólogos están certificados y verificados',
    icon: '✓',
    details: [
      'Verificación de licencia profesional',
      'Revisión de credenciales académicas',
      'Validación de experiencia práctica',
      'Actualización continua de certificaciones',
    ],
  },
  {
    title: 'Reseñas reales de pacientes',
    description: 'Opiniones auténticas de pacientes verificados',
    icon: '★',
    details: [
      'Sistema de reseñas verificadas',
      'Calificaciones detalladas por servicio',
      'Comentarios moderados y auténticos',
      'Transparencia total en valoraciones',
    ],
  },
  {
    title: 'Reserva fácil y rápida',
    description: 'Agenda tu cita en menos de 2 minutos',
    icon: '⚡',
    details: [
      'Proceso de reserva simplificado',
      'Confirmación instantánea por email',
      'Recordatorios automáticos de cita',
      'Reprogramación flexible y sin cargos',
    ],
  },
  {
    title: 'Soporte y atención garantizada',
    description: 'Estamos aquí para ayudarte en todo momento',
    icon: '🛡️',
    details: [
      'Atención al cliente 24/7',
      'Garantía de satisfacción',
      'Resolución rápida de incidencias',
      'Protección de datos personales',
    ],
  },
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
  {
    author: 'Pedro, Madrid',
    text: 'La plataforma es muy fácil de usar. Encontré un podólogo excelente cerca de casa y pude reservar una cita en minutos.',
    rating: 4.9,
  }
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

