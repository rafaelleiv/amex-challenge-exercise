// You may edit this file, add new files to support this file,
// and/or add new dependencies to the project as you see fit.
// However, you must not change the surface API presented from this file,
// and you should not need to change any other files in the project to complete the challenge

import { useEffect, useState } from 'react';
import { Data } from '../application/validation';
import axios from 'axios';

type UseCachingFetch = (url: string) => {
  isLoading: boolean;
  data: Data | null;
  error: Error | null;
};

/**
 * An in-memory cache to store fetched data.
 */
const cache: Record<string, Data> = {};

/**
 * 1. Implement a caching fetch hook. The hook should return an object with the following properties:
 * - isLoading: a boolean that is true when the fetch is in progress and false otherwise
 * - data: the data returned from the fetch, or null if the fetch has not completed
 * - error: an error object if the fetch fails, or null if the fetch is successful
 *
 * This hook is called three times on the client:
 *  - 1 in App.tsx
 *  - 2 in Person.tsx
 *  - 3 in Name.tsx
 *
 * Acceptance Criteria:
 * 1. The application at /appWithoutSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should only see 1 network request in the browser's network tab when visiting the /appWithoutSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */

/**
 * Custom hook to fetch data with caching.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns UseCachingFetch - An object containing isLoading, data, and error properties.
 */
export const useCachingFetch: UseCachingFetch = (url: string) => {
  const [data, setData] = useState<Data | null>(() => {
    // Return cached data immediately if available
    return cache[url] || null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If data is already cached and assigned above, no need to re-fetch
    if (data) return;

    // If not cached, perform the fetch
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        cache[url] = response.data; // Store the fetched data in the cache
        setData(response.data);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading, error };
};

/**
 * 2. Implement a preloading caching fetch function. The function should fetch the data.
 *
 * This function will be called once on the server before any rendering occurs.
 *
 * Any subsequent call to useCachingFetch should result in the returned data being available immediately.
 * Meaning that the page should be completely serverside rendered on /appWithSSRData
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript disabled, you should see a list of people.
 * 2. You have not changed any code outside of this file to achieve this.
 * 3. This file passes a type-check.
 *
 */

/**
 * Preloads data into the cache by fetching it from the given URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<void>} - A promise that resolves when the data is fetched and cached.
 */
export const preloadCachingFetch = async (url: string): Promise<void> => {
  // If data is already cached, no need to preload again
  if (cache[url]) return;

  try {
    const response = await axios.get<Data>(url);
    cache[url] = response.data; // Store the fetched data in the cache
  } catch (error) {
    console.error(`Error preloading data for URL ${url}:`, error);
    throw error; // Re-throw the error if needed for logging purposes
  }
};

/**
 * 3.1 Implement a serializeCache function that serializes the cache to a string.
 * 3.2 Implement an initializeCache function that initializes the cache from a serialized cache string.
 *
 * Together, these two functions will help the framework transfer your cache to the browser.
 *
 * The framework will call `serializeCache` on the server to serialize the cache to a string and inject it into the dom.
 * The framework will then call `initializeCache` on the browser with the serialized cache string to initialize the cache.
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should not see any network calls to the people API when visiting the /appWithSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */

/**
 * Serializes the cache to a JSON string.
 *
 * @returns {string} - The serialized cache.
 */
export const serializeCache = (): string => {
  try {
    return JSON.stringify(cache);
  } catch (error) {
    console.error('Error serializing cache:', error);
    return '{}';
  }
};

/**
 * Initializes the cache from a serialized cache string.
 *
 * @param {string} serializedCache - The serialized cache string.
 */
export const initializeCache = (serializedCache: string): void => {
  try {
    const parsedCache = JSON.parse(serializedCache) as Record<string, Data>;
    Object.assign(cache, parsedCache);
  } catch (error) {
    console.error('Error initializing cache:', error);
  }
};

/**
 * Wipes the cache by deleting all its entries.
 */
export const wipeCache = (): void => {
  Object.keys(cache).forEach((key) => delete cache[key]);
};
