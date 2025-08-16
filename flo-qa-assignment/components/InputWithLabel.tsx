import {
  Input,
  InputGroup,
  InputProps,
  InputRightAddon,
  Text,
  VStack,
} from '@chakra-ui/react';

type Props = {
  label: string;
  helperText?: string;
  rightAddon?: string;
} & InputProps;

const InputWithLabel = (props: Props) => {
  const { label, rightAddon, helperText, ...inputProps } = props;

  return (
    <VStack w={'full'} alignItems={'start'}>
      <Text aria-label={label}>{label}</Text>
      <InputGroup>
        <Input background='transparent' {...inputProps} />
        {rightAddon && <InputRightAddon>{rightAddon}</InputRightAddon>}
      </InputGroup>
      {helperText && (
        <Text fontSize='xs' color='gray' alignSelf={'start'}>
          NMI Suffix has to be between 7-8 digits
        </Text>
      )}
    </VStack>
  );
};

export default InputWithLabel;
