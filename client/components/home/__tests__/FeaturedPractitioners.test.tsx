/**
 * Tests for FeaturedPractitioners component
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeaturedPractitioners from '../FeaturedPractitioners';
import { Practitioner } from '@/lib/types';

const mockPractitioners: Practitioner[] = [
  {
    id: '1',
    nombre: 'Dr. Juan Pérez',
    especialidades: ['Uñas', 'Biomecánica'],
  },
  {
    id: '2',
    nombre: 'Dra. María Gómez',
    especialidades: ['Ortopedia'],
  },
];

describe('FeaturedPractitioners', () => {
  it('renders the section heading', () => {
    render(<FeaturedPractitioners practitioners={mockPractitioners} />);
    expect(screen.getByText('Profesionales destacados')).toBeInTheDocument();
  });

  it('renders practitioner names', () => {
    render(<FeaturedPractitioners practitioners={mockPractitioners} />);
    expect(screen.getByText('Dr. Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('Dra. María Gómez')).toBeInTheDocument();
  });

  it('renders practitioner specialties', () => {
    render(<FeaturedPractitioners practitioners={mockPractitioners} />);
    expect(screen.getByText('Uñas, Biomecánica')).toBeInTheDocument();
    expect(screen.getByText('Ortopedia')).toBeInTheDocument();
  });

  it('renders profile links', () => {
    render(<FeaturedPractitioners practitioners={mockPractitioners} />);
    const links = screen.getAllByText('Ver perfil');
    expect(links).toHaveLength(2);
    expect(links[0].closest('a')).toHaveAttribute('href', '/practitioners/1');
  });

  it('renders contact buttons', () => {
    render(<FeaturedPractitioners practitioners={mockPractitioners} />);
    const buttons = screen.getAllByText('Contactar');
    expect(buttons).toHaveLength(2);
  });

  it('shows empty state when no practitioners', () => {
    render(<FeaturedPractitioners practitioners={[]} />);
    expect(screen.getByText('No hay profesionales destacados por ahora.')).toBeInTheDocument();
  });

  it('handles practitioners with English field names', () => {
    const englishPractitioner: Practitioner[] = [
      {
        id: '3',
        name: 'Dr. John Doe',
        specialties: ['Podiatry'],
      },
    ];
    render(<FeaturedPractitioners practitioners={englishPractitioner} />);
    expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
    expect(screen.getByText('Podiatry')).toBeInTheDocument();
  });
});

