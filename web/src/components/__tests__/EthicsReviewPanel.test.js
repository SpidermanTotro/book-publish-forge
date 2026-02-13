import { render, screen } from '@testing-library/react';
import EthicsReviewPanel from '../EthicsReviewPanel';

describe('EthicsReviewPanel Component', () => {
  test('renders without content', () => {
    render(<EthicsReviewPanel content="" onProceed={() => {}} />);
    expect(screen.getByText(/Ethics & Respect Review/i)).toBeInTheDocument();
  });

  test('shows success when no issues found', () => {
    render(<EthicsReviewPanel content="This is clean content" onProceed={() => {}} />);
    expect(screen.getByText(/No problems detected/i)).toBeInTheDocument();
  });

  test('detects privacy violations', () => {
    render(<EthicsReviewPanel content="The paparazzi chased the celebrity" onProceed={() => {}} />);
    expect(screen.getByText(/privacy violation/i)).toBeInTheDocument();
  });

  test('detects objectifying language', () => {
    render(<EthicsReviewPanel content="She was just an object to degrade" onProceed={() => {}} />);
    expect(screen.getByText(/Objectifying/i)).toBeInTheDocument();
  });

  test('detects fake claims', () => {
    render(<EthicsReviewPanel content="This is a fake story and misleading hoax" onProceed={() => {}} />);
    expect(screen.getByText(/Factually questionable/i)).toBeInTheDocument();
  });

  test('has publish button when clean', () => {
    render(<EthicsReviewPanel content="Nice clean story" onProceed={() => {}} />);
    expect(screen.getByText(/Publish with Respect/i)).toBeInTheDocument();
  });
});
