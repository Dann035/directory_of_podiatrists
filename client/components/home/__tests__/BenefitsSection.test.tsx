/**
 * Tests for BenefitsSection component
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BenefitsSection from '../BenefitsSection';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver as any;

describe('BenefitsSection', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders the section heading', () => {
    render(<BenefitsSection />);
    expect(screen.getByText('Por qué elegirnos')).toBeInTheDocument();
  });

  it('renders all benefit cards', () => {
    render(<BenefitsSection />);
    expect(screen.getByText('Profesionales verificados')).toBeInTheDocument();
    expect(screen.getByText('Reseñas reales de pacientes')).toBeInTheDocument();
    expect(screen.getByText('Reserva fácil y rápida')).toBeInTheDocument();
    expect(screen.getByText('Soporte y atención garantizada')).toBeInTheDocument();
  });

  it('renders benefit descriptions', () => {
    render(<BenefitsSection />);
    expect(screen.getByText(/Todos nuestros podólogos están certificados/i)).toBeInTheDocument();
    expect(screen.getByText(/Opiniones auténticas de pacientes/i)).toBeInTheDocument();
  });

  it('flips card on mouse enter', async () => {
    render(<BenefitsSection />);
    const cards = screen.getAllByText(/Pasa el cursor para ver más/i);
    const firstCard = cards[0].closest('div')?.parentElement?.parentElement;
    
    if (firstCard) {
      fireEvent.mouseEnter(firstCard);
      await waitFor(() => {
        expect(firstCard.querySelector('.backface-hidden')).toBeInTheDocument();
      });
    }
  });

  it('renders benefit details on back of card', () => {
    render(<BenefitsSection />);
    expect(screen.getByText(/Verificación de licencia profesional/i)).toBeInTheDocument();
    expect(screen.getByText(/Sistema de reseñas verificadas/i)).toBeInTheDocument();
  });

  it('renders guarantee badge', () => {
    render(<BenefitsSection />);
    const badges = screen.getAllByText('Garantizado');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('renders footer note', () => {
    render(<BenefitsSection />);
    expect(screen.getByText(/garantía de satisfacción/i)).toBeInTheDocument();
  });
});

