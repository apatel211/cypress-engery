import useSWR from 'swr';
import { EnergyUsage } from '../types';

const useEnergyUsage = (fetcher: () => Promise<EnergyUsage>) => {
  const { data, isLoading, error } = useSWR<EnergyUsage>(
    'energyUsage',
    fetcher,
    {
      onError: (err) => {
        console.error('Unexpected err when fetching energy usage', err);
      },
    }
  );

  return {
    data,
    isLoading,
    error,
  };
};

export default useEnergyUsage;
