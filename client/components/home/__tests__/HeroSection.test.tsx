/**
 * Tests for HeroSection component
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '../HeroSection';

describe('HeroSection', () => {
  it('renders the main heading', () => {
    render(<HeroSection />);
    expect(screen.getByText('Reserva cita con podólogos verificados')).toBeInTheDocument();
  });

  it('renders the search form with inputs', () => {
    render(<HeroSection />);
    expect(screen.getByLabelText('Ciudad o dirección')).toBeInTheDocument();
    expect(screen.getByLabelText('Especialidad')).toBeInTheDocument();
  });

  it('renders the search button', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('renders trust features', () => {
    render(<HeroSection />);
    expect(screen.getByText('Confianza y seguridad')).toBeInTheDocument();
    expect(screen.getByText('Profesionales verificados')).toBeInTheDocument();
    expect(screen.getByText('Reseñas reales')).toBeInTheDocument();
  });

  it('form has correct action attribute', () => {
    render(<HeroSection />);
    const form = screen.getByRole('button', { name: /buscar/i }).closest('form');
    expect(form).toHaveAttribute('action', '/search');
  });
});

