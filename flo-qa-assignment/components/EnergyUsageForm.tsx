'use client';

import { useEffect, useState } from 'react';
import { EnergyUsageFormData } from '../app/types';
import EnergyUsageStepOne from './EnergyUsageStepOne';
import EnergyUsageStepTwo from './EnergyUsageStepTwo';
import { useRouter } from 'next/navigation';
import PATHS from '../app/paths';
import { validateEnergyUsageForm } from './helpers/validateEnergyUsageForm';
import EnergyUsageService from '../app/services/EnergyUsageService';
import { Box, Heading } from '@chakra-ui/react';
import ErrorBox from './ErrorBox';

const EnergyUsageForm = () => {
  const energyUsageService = new EnergyUsageService();
  const router = useRouter();
  useEffect(() => {
    // Check if a token is already stored
    const storedToken = sessionStorage.getItem('authToken');
    if (!storedToken) {
      router.push(PATHS.LOGIN);
    }
  }, [router]);

  // State to track the current step of the flow
  const [step, setStep] = useState(1);
  // State to store form data across steps
  const [formData, setFormData] = useState<EnergyUsageFormData>({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleNextStep = () => {
    setErrorMessage('');
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setErrorMessage('');
    setStep(step - 1);
  };

  // Handles form data changes across steps
  const handleFormDataChange = (data: { [key: string]: string }) => {
    setFormData({ ...formData, ...data });
  };

  const handleFormError = (error: Error) => {
    setErrorMessage(`Invalid form data: ${error.message}`);
  };

  const handleFormSubmit = () => {
    const formDataWithTime: EnergyUsageFormData = {
      ...formData,
      timestamp: new Date().toISOString(),
      unit: 'kWh',
    };

    try {
      validateEnergyUsageForm(formDataWithTime);
    } catch (error) {
      handleFormError(error as Error);
      return;
    }

    try {
      energyUsageService.submitNewRecord(formDataWithTime).then(() => {
        // Redirect to dashboard after successful submit
        router.push(PATHS.DASHBOARD);
      });
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Unexpected error occurred');
      }
    }
  };

  return (
    <Box w='100vw' px={'20%'}>
      <Heading mb={4}>Energy Consumption</Heading>
      {errorMessage && <ErrorBox message={errorMessage} />}

      {/* Remains mounted between steps, to maintain state of input */}
      <EnergyUsageStepOne
        formData={formData}
        onNext={handleNextStep}
        onChange={handleFormDataChange}
        onError={handleFormError}
        show={step === 1}
      />

      {/* Unmounts when user is not on second step */}
      {step === 2 && (
        <EnergyUsageStepTwo
          formData={formData}
          onNext={handleFormSubmit}
          onChange={handleFormDataChange}
          onPrevious={handlePreviousStep}
        />
      )}
    </Box>
  );
};

export default EnergyUsageForm;
