'use client';

import React from 'react';
import useRequireAuth from '@/app/hooks/useRequireAuth';
import Redirect from '@/app/components/Redirect';

const Home: React.FC = () => {
  const isAuthenticated = useRequireAuth();

  return isAuthenticated ? (
    <Redirect to="/dashboard" />
  ) : (
    <Redirect to="/sign-in" />
  );
};

export default Home;
