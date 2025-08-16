/**
 * Converts hectograms to kilograms
 */
export const convertHectogramsToKilograms = (hectograms: number) => {
  const grams = 100 * hectograms;
  return grams / 1000;
};
