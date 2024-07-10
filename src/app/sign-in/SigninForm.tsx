'use client';

import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';

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
  },
};

const SigninForm: FC = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // Handle form submission
    console.log('Form Submitted', formValues);
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        sx={useStyles.formContainer}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
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
          label="Password"
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
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>
    </Container>
  );
};

export default SigninForm;
