/**
 * Generate a random string of 9 characters
 */
export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
