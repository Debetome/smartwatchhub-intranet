import React, { FC } from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ErrorBoxProps {
  message: string;
}

const ErrorBox: FC<ErrorBoxProps> = ({ message }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorBox;
