import React from 'react';
import { Box } from '@mui/material';
import ProductForm from '../ProductForm';

const Create = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '85vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ProductForm product={{}} />
    </Box>
  );
};

export default Create;
