import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../application/App';
import { preloadCachingFetch, useCachingFetch } from '../../caching-fetch-library/cachingFetch';

// Mock the custom hook and its response
jest.mock('../../caching-fetch-library/cachingFetch', () => ({
  useCachingFetch: jest.fn(),
  preloadCachingFetch: jest.fn(),
}));

// Define a reusable mock response
const mockResponse = {
  data: [
    {
      email: 'test@example.com',
      first: 'John',
      last: 'Doe',
      address: '123 Main St',
      created: '2021-01-01',
      balance: '1000',
    },
  ],
  isLoading: false,
  error: null,
};

beforeEach(() => {
  jest.clearAllMocks(); // Clear mocks to ensure clean state between tests
  (useCachingFetch as jest.Mock).mockReturnValue(mockResponse);
});

/**
 * Test to check if the welcome message is rendered.
 */
test('renders the welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to the People Directory/i);
  expect(welcomeElement).toBeInTheDocument();
});

/**
 * Test to check if a person is rendered.
 */
test('renders a person', () => {
  render(<App />);
  const personElement = screen.getByText(/John Doe/i);
  expect(personElement).toBeInTheDocument();
});

/**
 * Test to check if the loading state is displayed.
 */
test('displays loading state', () => {
  (useCachingFetch as jest.Mock).mockReturnValue({
    data: null,
    isLoading: true,
    error: null,
  });
  render(<App />);
  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});

/**
 * Test to check if the error message is displayed.
 */
test('displays error message', () => {
  (useCachingFetch as jest.Mock).mockReturnValue({
    data: null,
    isLoading: false,
    error: new Error('Failed to fetch data'),
  });
  render(<App />);
  const errorElement = screen.getByText(/Error: Failed to fetch data/i);
  expect(errorElement).toBeInTheDocument();
});

/**
 * Test to check if server data is preloaded correctly.
 */
test('preloads server data', async () => {
  // Mock `preloadCachingFetch` to simulate the server-side preloading behavior
  const preloadMock = (preloadCachingFetch as jest.Mock).mockResolvedValue(undefined);

  if (typeof App.preLoadServerData === 'function') {
    await App.preLoadServerData();

    // Ensure `preloadCachingFetch` is called with the correct URL
    expect(preloadMock).toHaveBeenCalledWith(
      'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole&seed=123'
    );
    expect(preloadMock).toHaveBeenCalledTimes(1);
  } else {
    throw new Error('preLoadServerData is not a function');
  }
});
