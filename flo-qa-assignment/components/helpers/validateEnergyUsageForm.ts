import { EnergyUsageFormData } from '../../app/types';
import { validateNMI } from './validateNMI';

/**
 * Validates a possibly undefined string or number as a non-negative number
 */
const validateNumber = (value?: string | number) => {
  if (!value) {
    return false;
  }
  const num = Number(value.toString());
  return !isNaN(num) && num >= 0;
};

/**
 * Validates form data in energy usage. All fields must be present and valid.
 * Throws error on invalid form value.
 */
export const validateEnergyUsageForm = (formData: EnergyUsageFormData) => {
  const { nmi, consumption, timestamp, unit } = formData;
  if (!validateNMI(nmi)) {
    throw new Error('Invalid NMI');
  }

  if (!unit) {
    throw new Error('Unit is required but is missing.');
  }

  if (!timestamp) {
    throw new Error('Timestamp is required but is missing.');
  }

  if (!validateNumber(consumption)) {
    throw new Error(
      'Invalid consumption - value has to be a non-negative number'
    );
  }

  return true;
};
