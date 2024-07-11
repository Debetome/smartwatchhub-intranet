'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import UserForm, { User as UserFormData } from '../../UserForm';
import Loading from '@/app/components/Loading';
import { Product } from '@/app/data/mockData';

const Edit = () => {
  const [user, setProduct] = useState<UserFormData | null>(null);
  const { userId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const users = localStorage.getItem('users');
    const usersDB: Product[] = users ? JSON.parse(users) : [];

    const foundUser = usersDB.find(
      (item: Product) => item.id === parseInt(userId as string, 10),
    );

    if (!foundUser) {
      router.push('/dashboard/inventory');
      return;
    }

    const formProduct: UserFormData = {
      ...foundUser,
    };

    setProduct(formProduct);
  }, [userId, router]);

  if (!user) return <Loading />;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '85vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UserForm user={user} />
    </Box>
  );
};

export default Edit;
