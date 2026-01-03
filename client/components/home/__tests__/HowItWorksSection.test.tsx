/**
 * Tests for HowItWorksSection component
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HowItWorksSection from '../HowItWorksSection';

describe('HowItWorksSection', () => {
  it('renders the section heading', () => {
    render(<HowItWorksSection />);
    expect(screen.getByText('Cómo funciona')).toBeInTheDocument();
  });

  it('renders all steps', () => {
    render(<HowItWorksSection />);
    expect(screen.getByText(/Busca por ciudad o especialidad/i)).toBeInTheDocument();
    expect(screen.getByText(/Revisa el perfil del profesional/i)).toBeInTheDocument();
    expect(screen.getByText(/Reserva una cita en minutos/i)).toBeInTheDocument();
  });

  it('renders steps as ordered list', () => {
    const { container } = render(<HowItWorksSection />);
    const orderedList = container.querySelector('ol');
    expect(orderedList).toBeInTheDocument();
  });

  it('has correct section id', () => {
    const { container } = render(<HowItWorksSection />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'how');
  });
});

