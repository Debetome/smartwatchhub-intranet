'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  useTheme,
  CircularProgress,
} from '@mui/material';

import ErrorBox from '@/app/components/ErrorBox';
import { tokens } from '@/app/theme';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const useStyles = {
  formContainer: {
    borderRadius: '8px',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    height: '90%',
    width: '80%',
    padding: '2rem',
    paddingBottom: '1rem',
    marginTop: '1rem',
    overflowY: 'auto',
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
    backgroundColor: 'none',
    borderRadius: '4px',
    color: '#ffffff',
  },
  inputLabel: {
    color: '#ffffff', // Default color
    '&.Mui-focused': {
      color: '#9BEA19', // Focused color
    },
  },
  imageContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '10px',
    marginBottom: '20px',
    borderRadius: '8px',
    width: '100%',
    height: '180px',
    padding: '10px',
    overflow: 'auto',
  },
  imagePreview: {
    width: '150px',
    height: '150px',
    objectFit: 'cover' as const,
    borderRadius: '8px',
  },
  fileInput: {
    marginTop: '10px',
    marginBottom: '20px',
    color: '#ffffff',
  },
  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
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
  },
};

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  phone?: string;
  picture?: File;
  access?: 'admin' | 'manager' | 'user';
  avatar?: string; // Optional field for avatar image URL
  bio?: string; // Optional field for user biography
  role?: string; // Optional field for user role or position
}

interface UserFormProps {
  user?: User;
}

const UserForm: React.FC<UserFormProps> = ({ user = {} }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [formValues, setFormValues] = useState<User>({
    id: user.id || 0,
    name: user.name || '',
    email: user.email || '',
    password: user.password || '',
    age: user.age || 0,
    phone: user.phone || '',
    picture: user.picture || (null as any), // Adjust as per actual implementation
    access: user.access || 'user',
  });

  const router = useRouter();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setFormValues({
      id: user.id || 0,
      name: user.name || '',
      email: user.email || '',
      password: user.password || '',
      age: user.age || 0,
      phone: user.phone || '',
      picture: user.picture || (null as any), // Adjust as per actual implementation
      access: user.access || 'user',
    });
  }, [user]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormValues({
        ...formValues,
        picture: file,
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const users = localStorage.getItem('users');
      const usersDB = users ? JSON.parse(users) : [];

      const newUser = {
        id: formValues.id,
        ...formValues,
      };

      if (!newUser.id) {
        if (usersDB.some((user: User) => user.email === newUser.email)) {
          setLoading(false);
          setError('El email ingresado ya está registrado.');
          return;
        }

        newUser.id = usersDB.length > 0 ? usersDB.at(-1).id + 1 : 1;
        usersDB.push(newUser);
      } else {
        const index = usersDB.findIndex((user: User) => user.id === newUser.id);
        if (index !== -1) {
          usersDB[index] = newUser;
        }
      }

      const stringified = JSON.stringify(usersDB);
      localStorage.setItem('users', stringified);

      router.push('/dashboard/users');
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocurrió un error inesperado.');
      }
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          ...useStyles.formContainer,
          backgroundColor: `${colors.primary[400]}`,
        }}
        onSubmit={handleSubmit}
      >
        <Typography
          sx={{ marginBottom: '1.5rem', color: `${colors.grey[100]}` }}
          variant="h3"
          gutterBottom
        >
          Autenticación de Usuario
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ width: '60%' }}>
            <TextField
              name="name"
              label="Nombre"
              variant="outlined"
              fullWidth
              value={formValues.name}
              onChange={handleInputChange}
              required
              sx={useStyles.textField}
              InputProps={{
                style: useStyles.input,
              }}
              InputLabelProps={{
                sx: useStyles.inputLabel,
                shrink: !!formValues.name,
              }}
            />
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
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              <TextField
                name="age"
                label="Edad"
                variant="outlined"
                fullWidth
                type="number"
                value={formValues.age}
                onChange={handleInputChange}
                required
                sx={useStyles.textField}
                InputProps={{
                  style: useStyles.input,
                }}
                InputLabelProps={{
                  sx: useStyles.inputLabel,
                  shrink: !!formValues.age,
                }}
              />
              <TextField
                name="phone"
                label="Teléfono"
                variant="outlined"
                fullWidth
                type="tel"
                value={formValues.phone}
                onChange={handleInputChange}
                required
                sx={useStyles.textField}
                InputProps={{
                  style: useStyles.input,
                }}
                InputLabelProps={{
                  sx: useStyles.inputLabel,
                  shrink: !!formValues.phone,
                }}
              />
            </Box>
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
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Box>

          <Box
            sx={{
              width: '30%',
              paddingLeft: '20px',
              borderColor: `${colors.grey[100]}`,
            }}
          >
            <Box sx={useStyles.imageContainer}>
              {formValues.picture && (
                <Image
                  src={`/assets/user.png`}               
                  alt="User Avatar"
                  width={200}
                  height={200}
                  style={useStyles.imagePreview}
                />
              )}
            </Box>
            <Box sx={useStyles.fileInput}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Box>
            <Box sx={useStyles.checkBoxContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="access"
                    checked={formValues.access === 'admin'}
                    onChange={handleInputChange}
                    value="admin"
                  />
                }
                label="Admin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="access"
                    checked={formValues.access === 'manager'}
                    onChange={handleInputChange}
                    value="manager"
                  />
                }
                label="Manager"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="access"
                    checked={formValues.access === 'user'}
                    onChange={handleInputChange}
                    value="user"
                  />
                }
                label="User"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {error && <ErrorBox message={error} />}
    </>
  );
};

export default UserForm;
