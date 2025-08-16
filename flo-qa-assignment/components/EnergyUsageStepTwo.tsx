import { VStack, Button } from '@chakra-ui/react';
import { ChangeEvent, FormEvent } from 'react';
import { EnergyUsageFormData } from '../app/types';
import InputWithLabel from './InputWithLabel';

type Props = {
  formData: EnergyUsageFormData;
  onNext: () => void;
  onPrevious: () => void;
  onChange: (data: { [key: string]: string }) => void;
};

const EnergyUsageStepTwo = ({
  onNext,
  onPrevious,
  onChange,
  formData,
}: Props) => {
  const handleConsumptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      consumption: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handlePrev = () => {
    onPrevious();
  };

  return (
    <VStack spacing={4} as='form' onSubmit={handleSubmit}>
      <InputWithLabel
        label='Consumption'
        rightAddon='kWh'
        name='consumption'
        type='number'
        isRequired
        onChange={handleConsumptionChange}
        value={formData.consumption ?? ''}
      />

      <Button width='full' onClick={handlePrev}>
        Previous
      </Button>

      <Button
        type='submit'
        colorScheme='yellow'
        width='full'
        isDisabled={!formData.consumption?.toString()}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default EnergyUsageStepTwo;
