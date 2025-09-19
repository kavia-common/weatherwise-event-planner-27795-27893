import { render, screen } from '@testing-library/react';
import App from './App';

test('renders WeatherWise brand name', () => {
  render(<App />);
  const brand = screen.getByText(/WeatherWise Events/i);
  expect(brand).toBeInTheDocument();
});
