import { Box } from '@chakra-ui/react';

type Props = {
  message: string;
};

const ErrorBox = (props: Props) => {
  const { message } = props;
  return (
    <Box
      bg='red.100'
      fontWeight={700}
      p={3}
      borderRadius='md'
      borderWidth={1}
      borderColor='red.300'
      width='full'
      my={4}
    >
      {message}
    </Box>
  );
};

export default ErrorBox;
