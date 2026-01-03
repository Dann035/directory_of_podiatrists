import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders and responds to input', () => {
    const handle = jest.fn();
    render(<SearchBar value="" onChange={handle} />);
    const input = screen.getByPlaceholderText(/Ej. Juan Pérez/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'Madrid' } });
    expect(handle).toHaveBeenCalled();
  });
});
