'use client';

import { Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PATHS from '../app/paths';
import InputWithLabel from './InputWithLabel';
import ErrorBox from './ErrorBox';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check if a token is already stored
    const storedToken = sessionStorage.getItem('authToken');
    if (storedToken) {
      router.push(PATHS.HOME);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        sessionStorage.setItem('authToken', data.token);
        router.push(PATHS.HOME);
      } else {
        setError('Something went wrong!');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} as='form' onSubmit={handleLogin}>
      {error && <ErrorBox message={error} />}

      <VStack my={8} w={'full'} gap={6}>
        <InputWithLabel
          label='Username'
          isRequired
          name='username'
          onChange={(e) => setUsername(e.target.value)}
        />

        <InputWithLabel
          label='Password'
          isRequired
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </VStack>

      <Button
        type='submit'
        colorScheme='yellow'
        width='full'
        isLoading={loading}
        loadingText='Logging in...'
      >
        {'Login'}
      </Button>
    </VStack>
  );
};

export default LoginForm;
