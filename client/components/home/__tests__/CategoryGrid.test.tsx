/**
 * Tests for CategoryGrid component
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryGrid from '../CategoryGrid';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver as any;

describe('CategoryGrid', () => {
  it('renders the section heading', () => {
    render(<CategoryGrid />);
    expect(screen.getByText('Especialidades destacadas')).toBeInTheDocument();
  });

  it('renders all categories', () => {
    render(<CategoryGrid />);
    expect(screen.getByText('Tratamientos de uñas')).toBeInTheDocument();
    expect(screen.getByText('Plantillas y ortopedia')).toBeInTheDocument();
    expect(screen.getByText('Fascitis plantar')).toBeInTheDocument();
    expect(screen.getByText('Pie diabético')).toBeInTheDocument();
  });

  it('renders category descriptions', () => {
    render(<CategoryGrid />);
    expect(screen.getByText(/Uñas encarnadas, hongos/i)).toBeInTheDocument();
    expect(screen.getByText(/Plantillas personalizadas/i)).toBeInTheDocument();
  });

  it('renders links with correct href', () => {
    render(<CategoryGrid />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/search?service=unias');
    expect(links[1]).toHaveAttribute('href', '/search?service=plantillas');
  });

  it('renders the explore all services link', () => {
    render(<CategoryGrid />);
    expect(screen.getByText('Explorar todos los servicios')).toBeInTheDocument();
  });

  it('renders category icons', () => {
    render(<CategoryGrid />);
    expect(screen.getByText('💅')).toBeInTheDocument();
    expect(screen.getByText('👟')).toBeInTheDocument();
    expect(screen.getByText('🦶')).toBeInTheDocument();
    expect(screen.getByText('🩺')).toBeInTheDocument();
  });
});

