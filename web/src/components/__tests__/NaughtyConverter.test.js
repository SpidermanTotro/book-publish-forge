import { render, screen, fireEvent } from '@testing-library/react';
import NaughtyConverter from '../NaughtyConverter';

describe('NaughtyConverter Component', () => {
  test('detects normal content', () => {
    const setMode = jest.fn();
    const onConvert = jest.fn();
    
    render(
      <NaughtyConverter 
        doc="This is a simple story about friendship." 
        setMode={setMode} 
        mode="normal"
        onConvert={onConvert}
      />
    );
    
    expect(screen.getByText(/Book Forge/i)).toBeInTheDocument();
  });

  test('detects erotic content', () => {
    const setMode = jest.fn();
    const onConvert = jest.fn();
    
    render(
      <NaughtyConverter 
        doc="The passion between them was intense." 
        setMode={setMode} 
        mode="erotic"
        onConvert={onConvert}
      />
    );
    
    expect(screen.getByText(/Erotic Forge/i)).toBeInTheDocument();
  });

  test('has conversion buttons', () => {
    const setMode = jest.fn();
    const onConvert = jest.fn();
    
    render(
      <NaughtyConverter 
        doc="Test content" 
        setMode={setMode} 
        mode="normal"
        onConvert={onConvert}
      />
    );
    
    expect(screen.getByText(/Convert to Naughty/i)).toBeInTheDocument();
    expect(screen.getByText(/Convert to Non-Naughty/i)).toBeInTheDocument();
  });

  test('converts text when button clicked', () => {
    const setMode = jest.fn();
    const onConvert = jest.fn();
    
    render(
      <NaughtyConverter 
        doc="She smiled at him." 
        setMode={setMode} 
        mode="normal"
        onConvert={onConvert}
      />
    );
    
    const convertButton = screen.getByText(/Convert to Naughty/i);
    fireEvent.click(convertButton);
    
    expect(onConvert).toHaveBeenCalledWith('naughtify', expect.any(String));
  });
});
