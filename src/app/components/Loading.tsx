import React, { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <CircularProgress size="6rem" color="success" />
    </Box>
  );
};

export default Loading;
