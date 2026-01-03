/**
 * Tests for Footer component
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the copyright text with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Directorio de Podólogos`)).toBeInTheDocument();
  });

  it('renders privacy policy link', () => {
    render(<Footer />);
    const privacyLink = screen.getByText('Política de privacidad');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacy');
  });

  it('renders terms link', () => {
    render(<Footer />);
    const termsLink = screen.getByText('Términos');
    expect(termsLink).toBeInTheDocument();
    expect(termsLink.closest('a')).toHaveAttribute('href', '/terms');
  });

  it('has correct section id', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveAttribute('id', 'contact');
  });
});

