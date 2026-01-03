/**
 * Tests for HomeHeader component
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeHeader from '../HomeHeader';

describe('HomeHeader', () => {
  it('renders the site title', () => {
    render(<HomeHeader />);
    expect(screen.getByText('Directorio de Podólogos')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<HomeHeader />);
    expect(screen.getByText('Reserva cita con podólogos verificados')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<HomeHeader />);
    expect(screen.getByText('Buscar podólogo')).toBeInTheDocument();
    expect(screen.getByText('Cómo funciona')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('navigation links have correct href', () => {
    render(<HomeHeader />);
    const searchLink = screen.getByText('Buscar podólogo').closest('a');
    expect(searchLink).toHaveAttribute('href', '/search');
    
    const howLink = screen.getByText('Cómo funciona').closest('a');
    expect(howLink).toHaveAttribute('href', '#how');
    
    const contactLink = screen.getByText('Contacto').closest('a');
    expect(contactLink).toHaveAttribute('href', '#contact');
  });

  it('title links to home page', () => {
    render(<HomeHeader />);
    const titleLink = screen.getByText('Directorio de Podólogos').closest('a');
    expect(titleLink).toHaveAttribute('href', '/');
  });
});

