import React from 'react';
import { Box } from '@mui/material';
import UserForm from '../UserForm';

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
      <UserForm user={{}} />
    </Box>
  );
};

export default Create;
