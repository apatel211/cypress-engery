'use client';

import { VStack, Heading, Button, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PATHS from '../../paths';
import useEnergyUsage from '../../hooks/useEnergyUsage';
import EnergyUsageService from '../../services/EnergyUsageService';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { ErrorBox, EnergyUsageTable } from '../../../components';

const Dashboard = () => {
  const energyUsageService = new EnergyUsageService();
  const {
    data: energyUsageData,
    isLoading,
    error,
  } = useEnergyUsage(() => energyUsageService.getRecords());
  const router = useRouter();

  useEffect(() => {
    // Check if a token is already stored
    const storedToken = sessionStorage.getItem('authToken');
    if (!storedToken) {
      router.push(PATHS.LOGIN);
    }
  }, [router]);

  return (
    <VStack maxH='100vh' p={4}>
      <Heading mb={4}>Dashboard</Heading>

      {error && <ErrorBox message={error.message} />}

      {isLoading ? (
        <Spinner />
      ) : (
        <EnergyUsageTable
          caption='Recent energy usage'
          data={energyUsageData}
        />
      )}

      {/* Floating button to redirect to add a new energy usage record */}
      <Button
        leftIcon={<PlusSquareIcon />}
        position='absolute'
        top={20}
        right={8}
        onClick={() => router.push(PATHS.ENTER_USAGE)}
      >
        Energy usage
      </Button>
    </VStack>
  );
};

export default Dashboard;
