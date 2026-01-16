/**
 * Generates a unique product ID with a specified prefix
 * Format: PREFIX-TIMESTAMP-RANDOM
 * Example: PROD-1709123456789-ABC123
 */
export const generateUniqueProductId = (prefix: string = 'PROD'): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${randomStr}`;
};

/**
 * Validates if a product ID is in the correct format
 */
export const isValidProductId = (id: string): boolean => {
  const pattern = /^[A-Z]+-\d+-[A-Z0-9]+$/;
  return pattern.test(id);
};

/**
 * Extracts the timestamp from a product ID
 */
export const getProductTimestamp = (id: string): number | null => {
  if (!isValidProductId(id)) return null;
  const [, timestamp] = id.split('-');
  return parseInt(timestamp, 10);
}; 