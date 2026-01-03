/**
 * Tests for TestimonialsSection component
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestimonialsSection from '../TestimonialsSection';

describe('TestimonialsSection', () => {
  it('renders the section heading', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('Testimonios')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('Lo que dicen nuestros pacientes')).toBeInTheDocument();
  });

  it('renders testimonial cards', () => {
    render(<TestimonialsSection />);
    expect(screen.getAllByText(/Laura, Madrid/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Carlos, Barcelona/i).length).toBeGreaterThan(0);
  });

  it('renders testimonial text', () => {
    render(<TestimonialsSection />);
    const testimonialText = screen.getAllByText(/Encontré un podólogo excelente/i);
    expect(testimonialText.length).toBeGreaterThan(0);
  });

  it('renders rating stars', () => {
    render(<TestimonialsSection />);
    const stars = screen.getAllByText('★');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('renders verified badge', () => {
    render(<TestimonialsSection />);
    const badges = screen.getAllByText('Cliente verificado');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('renders footer note', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText(/reseñas son de pacientes verificados/i)).toBeInTheDocument();
  });

  it('has infinite scroll animation styles', () => {
    const { container } = render(<TestimonialsSection />);
    const animatedElement = container.querySelector('.animate-scroll');
    expect(animatedElement).toBeInTheDocument();
  });
});

