'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/authContext';

const useRequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sign-in'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
};

export default useRequireAuth;
