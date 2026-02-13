import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

describe('Navigation Component', () => {
  test('renders navigation header', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    expect(screen.getByText(/Book Publish Forge/i)).toBeInTheDocument();
  });

  test('has menu button', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    const menuButton = screen.getByText(/Menu/i);
    expect(menuButton).toBeInTheDocument();
  });

  test('menu button toggles dropdown', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    const menuButton = screen.getByText(/Menu/i);
    
    // Click to open
    fireEvent.click(menuButton);
    // After click, menu items should be in document
    expect(screen.getByText(/Writing Tools/i)).toBeInTheDocument();
    
    // Click to close
    fireEvent.click(menuButton);
  });
});
