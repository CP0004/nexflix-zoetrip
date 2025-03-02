/**
 * A simple caching system for responses from the API
 */

interface CacheItem<T> {
  value: T;
  timestamp: number;
  expiry: number; // The time in milliseconds until the stored item expires
}

class APICache {
  private cache: Map<string, CacheItem<any>> = new Map();
  
  /**
   * Get a value from the cache
   * @param key The cache key
   * @returns The cached value or undefined if it doesn't exist or has expired
   */
  get<T>(key: string): T | undefined {
    const item = this.cache.get(key);
    if (!item) return undefined;
    
    // Check if the stored item is expired
    if (Date.now() - item.timestamp > item.expiry) {
      this.cache.delete(key);
      return undefined;
    }
    
    return item.value as T;
  }
  
  /**
   * Store a value in the cache
   * @param key The cache key
   * @param value The value to store
   * @param expiry The expiry time in milliseconds (default: 5 minutes)
   */
  set<T>(key: string, value: T, expiry: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      expiry
    });
  }
  
  /**
   * Remove an item from the cache
   * @param key The key of the item to remove
   */
  delete(key: string): void {
    this.cache.delete(key);
  }
  
  /**
   * Clean up expired items
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Create and export a single instance of the cache
export const apiCache = new APICache();

/**
 * Helper function to get data from the cache or fetch from an external source
 * @param key The cache key
 * @param fetchFunction The function to fetch data if it's not cached
 * @param expiry The expiry time
 * @returns The data from the cache or the function
 */
export async function getFromCacheOrFetch<T>(
  key: string,
  fetchFunction: () => Promise<T>,
  expiry?: number
): Promise<T> {
  // Try to get the data from the cache
  const cachedData = apiCache.get<T>(key);
  if (cachedData !== undefined) {
    return cachedData;
  }
  
  // If the data is not cached, fetch it from the source
  const data = await fetchFunction();
  
  // Store the data in the cache
  apiCache.set(key, data, expiry);
  
  return data;
} 