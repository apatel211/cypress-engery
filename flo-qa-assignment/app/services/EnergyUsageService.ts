import { generateRandomId } from '../../components/helpers/randomId';
import { EnergyUsage, EnergyUsageFormData, EnergyUsageRecord } from '../types';

class EnergyUsageService {
  async getRecords(): Promise<EnergyUsage> {
    try {
      const response = await fetch(`api/usage`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to retrieve energy usage records`);
    }
  }

  async submitNewRecord(data: EnergyUsageFormData): Promise<EnergyUsage> {
    const id = generateRandomId();
    const record: EnergyUsageRecord = {
      ...data,
      id,
    };

    try {
      const response = await fetch(`api/usage`, {
        method: 'POST',
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to submit energy usage record`);
    }
  }
}

export default EnergyUsageService;
