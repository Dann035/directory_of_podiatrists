import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsList from '../ResultsList';

describe('ResultsList', () => {
  it('shows no results message', () => {
    render(<ResultsList items={[]} />);
    expect(screen.getByText(/No se encontraron resultados/i)).toBeInTheDocument();
  });

  it('renders items', () => {
    const items = [{ id: '1', nombre: 'Dr A', ciudad: 'X' }];
    render(<ResultsList items={items} />);
    expect(screen.getByText(/Dr A/)).toBeInTheDocument();
  });
});
