'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PATHS from './paths';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    if (!storedToken) {
      router.push(PATHS.LOGIN);
    } else {
      router.push(PATHS.HOME);
    }
  }, [router]);

  return <></>;
}
