import { VStack, Button, Text, Select } from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { EnergyUsageFormData } from '../app/types';
import InputWithLabel from './InputWithLabel';
import { nmiPrefixes, validateNMI } from './helpers/validateNMI';

type Props = {
  show: boolean;
  formData: EnergyUsageFormData;
  onNext: () => void;
  onChange: (data: { [key: string]: string }) => void;
  onError: (err: Error) => void;
};

const EnergyUsageStepOne = ({
  onNext,
  onChange,
  onError,
  show = true,
}: Props) => {
  const [nmiPrefix, setNMIPrefix] = useState('');
  const [nmiSuffix, setNMISuffix] = useState('');
  const nmi = `${nmiPrefix}${nmiSuffix}`;

  const handleNmiPrefixChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNMIPrefix(e.target.value);
  };

  const handleNmiSuffixChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNMISuffix(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      validateNMI(nmi);
    } catch (error) {
      onError(error as Error);
      return;
    }

    onChange({
      nmi,
    });

    console.log('nmi', `${nmiPrefix}${nmiSuffix}`);
    onNext();
  };

  return (
    <VStack
      spacing={4}
      as='form'
      onSubmit={handleSubmit}
      display={show ? 'flex' : 'none'}
    >
      <VStack my={8} w={'full'} gap={6}>
        <VStack w={'full'} alignItems={'start'}>
          <Text aria-label='NMI Prefix'>NMI Prefix</Text>
          <Select
            placeholder='Select prefix'
            isRequired
            value={nmiPrefix}
            onChange={handleNmiPrefixChange}
          >
            {nmiPrefixes.map((prefix) => (
              <option key={prefix} value={prefix}>
                {prefix}
              </option>
            ))}
          </Select>
        </VStack>

        <InputWithLabel
          label='NMI Suffix'
          isRequired
          name='nmiSuffix'
          type='number'
          minLength={7}
          maxLength={8}
          onChange={handleNmiSuffixChange}
          value={nmiSuffix ?? ''}
          helperText='NMI suffix has to be between 7-8 digits'
        />
      </VStack>

      <Button
        type='submit'
        colorScheme='yellow'
        width='full'
        isDisabled={!nmiPrefix && !nmiSuffix}
      >
        Next
      </Button>
    </VStack>
  );
};

export default EnergyUsageStepOne;
