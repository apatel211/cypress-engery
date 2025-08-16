'use client';

import { Box, Flex, Heading } from '@chakra-ui/react';
import { LoginForm } from '../../components';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PATHS from '../paths';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if a token is already stored
    const storedToken = sessionStorage.getItem('authToken');
    if (storedToken) {
      router.push(PATHS.HOME);
    }
  }, [router]);

  return (
    <Box
      background='#00B189'
      position='relative'
      minHeight='100vh'
      minWidth='100vw'
      overflow='hidden'
    >
      <Flex direction='column' align='center' justify='center' height='100vh'>
        <Box
          w={580}
          mx='auto'
          pt={12}
          pb={20}
          px={20}
          zIndex={2}
          borderRadius={8}
          background='white'
        >
          <Heading
            fontSize={'3xl'}
            fontWeight={700}
            textAlign={'center'}
            mb={4}
          >
            {'Login'}
          </Heading>

          <LoginForm />
        </Box>
      </Flex>
    </Box>
  );
};

export default Page;
