import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

// Mock window.matchMedia not implemented by JSDOM.
// See https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// I suppose that I will need to move this to a common file.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

test('renders', () => {
  render(<App />);
  const sampleMovie = screen.getByText(/Sample Movie/i);
  expect(sampleMovie).toBeInTheDocument();
});
