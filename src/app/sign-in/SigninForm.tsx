'use client';

import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';

import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/authContext';
import ErrorBox from '@/app/components/ErrorBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = {
  formContainer: {
    backgroundColor: '#2C3036',
    padding: '2rem',
    borderRadius: '8px',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  userIcon: {
    fontSize: '6rem',
    color: '#9BEA19',
    marginBottom: '0.5rem',
  },
  textField: {
    marginBottom: '20px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#555',
      },
      '&:hover fieldset': {
        borderColor: '#9BEA19',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#9BEA19',
      },
    },
  },
  input: {
    backgroundColor: '#2C3036',
    borderRadius: '4px',
    color: '#ffffff',
  },
  inputLabel: {
    color: '#ffffff', // Default color
    '&.Mui-focused': {
      color: '#9BEA19', // Focused color
    },
  },
  submitButton: {
    backgroundColor: '#9BEA19',
    '&:hover': {
      backgroundColor: '#82C715',
    },
    color: '#000',
    fontWeight: '600',
    fontSize: '15px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
  },
};

const SigninForm: FC = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      console.log('Form Submitted', formValues);

      setTimeout(() => {
        setLoading(false);
        login();
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
        console.log(error.message);
      } else {
        setError('Unexpected error when signing in! ...');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      {error && <ErrorBox message={error} />}
      <Box
        component="form"
        sx={useStyles.formContainer}
        onSubmit={handleSubmit}
      >
        <Box sx={useStyles.headerContainer}>
          <AccountCircleIcon sx={useStyles.userIcon} />
          <Typography variant="h4" gutterBottom>
            Autenticación de Usuario
          </Typography>
        </Box>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={formValues.email}
          onChange={handleInputChange}
          required
          sx={useStyles.textField}
          InputProps={{
            style: useStyles.input,
          }}
          InputLabelProps={{
            sx: useStyles.inputLabel,
            shrink: !!formValues.email,
          }}
        />
        <TextField
          name="password"
          label="Contraseña"
          variant="outlined"
          fullWidth
          type="password"
          value={formValues.password}
          onChange={handleInputChange}
          required
          sx={useStyles.textField}
          InputProps={{
            style: useStyles.input,
          }}
          InputLabelProps={{
            sx: useStyles.inputLabel,
            shrink: !!formValues.password,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={useStyles.submitButton}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
        </Button>
      </Box>
    </Container>
  );
};

export default SigninForm;
