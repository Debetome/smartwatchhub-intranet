'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

const useStyles = {
  formContainer: {
    borderRadius: '8px',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '90%',
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
    border: '2px solid #ffffff',
    borderRadius: '8px',
    width: '100%',
    height: '180px',
    padding: '10px',
    overflow: 'auto',
  },
  imagePreview: {
    width: '50%',
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

export type Product = {
  id?: number;
  name?: string;
  brand?: string;
  os?: string;
  price?: string;
  discount?: string;
  rating?: string;
  units?: string;
  color?: string;
  heart?: boolean;
  gps?: boolean;
  water?: boolean;
  images?: string[];
  screenType?: string; // Added
  batteryLife?: string; // Added
  waterResistant?: boolean; // Added
  touchScreen?: boolean; // Added
  bluetooth?: boolean; // Added
};

interface ProductFormProps {
  product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ product = {} }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [formValues, setFormValues] = useState<Product>({
    name: product.name || '',
    brand: product.brand || '',
    os: product.os || '',
    price: product.price || '',
    discount: product.discount || '',
    rating: product.rating || '',
    units: product.units || '',
    color: product.color || '',
    screenType: product.screenType || '',
    batteryLife: product.batteryLife?.split(' ')[0] || '',
    heart: product.heart || false,
    gps: product.gps || false,
    water: product.water || false,
    waterResistant: product.waterResistant || false,
    touchScreen: product.touchScreen || false,
    bluetooth: product.bluetooth || false,
  });

  const [imagesPreview, setImagesPreview] = useState<string[]>(
    product.images || [],
  );

  const router = useRouter();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setFormValues({
      name: product.name || '',
      brand: product.brand || '',
      os: product.os || '',
      price: product.price || '',
      discount: product.discount || '',
      rating: product.rating || '',
      units: product.units || '',
      color: product.color || '',
      screenType: product.screenType || '',
      batteryLife: product.batteryLife?.split(' ')[0] || '',
      heart: product.heart || false,
      gps: product.gps || false,
      water: product.water || false,
      waterResistant: product.waterResistant || false,
      touchScreen: product.touchScreen || false,
      bluetooth: product.bluetooth || false,
    });
  }, [product]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const allowedFiles = files.slice(0, 5 - formValues.images!.length); // Limit to 5 images

    const updatedImages = allowedFiles.map((file) => URL.createObjectURL(file));

    setImagesPreview([...imagesPreview, ...updatedImages]);
    setFormValues({
      ...formValues,
      images: [
        ...(formValues.images as string[]),
        ...allowedFiles.map((file) => file.name),
      ],
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const products = localStorage.getItem('products');
      const productsDB = products ? JSON.parse(products) : [];

      const newProduct = {
        id: product.id,
        ...formValues,
        batteryLife: [formValues.batteryLife, 'días'].join(' '),
      };

      if (!newProduct.id) {
        if (productsDB.some((item: Product) => item.name === newProduct.name)) {
          setLoading(false);
          setError('No se admiten nombres repetidos');
          return;
        }

        newProduct.id = productsDB.length > 0 ? productsDB.at(-1).id + 1 : 1;
        productsDB.push(newProduct);
      } else {
        const index = productsDB.findIndex(
          (item: Product) => item.id === newProduct.id,
        );
        if (index !== -1) {
          productsDB[index] = newProduct;
        }
      }

      const stringified = JSON.stringify(productsDB);
      localStorage.setItem('products', stringified);

      router.push('/dashboard/inventory');
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
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
        Formulario de producto
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '50%' }}>
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
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <TextField
              name="price"
              label="Precio (S/.)"
              variant="outlined"
              fullWidth
              type="number"
              value={formValues.price}
              onChange={handleInputChange}
              required
              sx={useStyles.textField}
              InputProps={{
                style: useStyles.input,
              }}
              InputLabelProps={{
                sx: useStyles.inputLabel,
                shrink: !!formValues.price,
              }}
            />
            <TextField
              name="units"
              label="Unidades disponibles"
              variant="outlined"
              fullWidth
              type="number"
              value={formValues.units}
              onChange={handleInputChange}
              required
              sx={useStyles.textField}
              InputProps={{
                style: useStyles.input,
              }}
              InputLabelProps={{
                sx: useStyles.inputLabel,
                shrink: !!formValues.units,
              }}
            />
          </Box>
          <TextField
            name="brand"
            label="Marca"
            variant="outlined"
            fullWidth
            value={formValues.brand}
            onChange={handleInputChange}
            required
            sx={useStyles.textField}
            InputProps={{
              style: useStyles.input,
            }}
            InputLabelProps={{
              sx: useStyles.inputLabel,
              shrink: !!formValues.brand,
            }}
          />
          <TextField
            name="os"
            label="Sistema Operativo"
            variant="outlined"
            fullWidth
            value={formValues.os}
            onChange={handleInputChange}
            required
            sx={useStyles.textField}
            InputProps={{
              style: useStyles.input,
            }}
            InputLabelProps={{
              sx: useStyles.inputLabel,
              shrink: !!formValues.os,
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <TextField
              name="rating"
              label="Rating"
              variant="outlined"
              fullWidth
              type="number"
              value={formValues.rating}
              onChange={handleInputChange}
              required
              sx={useStyles.textField}
              InputProps={{
                style: useStyles.input,
              }}
              InputLabelProps={{
                sx: useStyles.inputLabel,
                shrink: !!formValues.rating,
              }}
            />
            <TextField
              name="color"
              label="Color"
              variant="outlined"
              fullWidth
              value={formValues.color}
              onChange={handleInputChange}
              required
              sx={useStyles.textField}
              InputProps={{
                style: useStyles.input,
              }}
              InputLabelProps={{
                sx: useStyles.inputLabel,
                shrink: !!formValues.color,
              }}
            />
          </Box>
          <TextField
            name="screenType"
            label="Tipo de pantalla"
            variant="outlined"
            fullWidth
            value={formValues.screenType}
            onChange={handleInputChange}
            required
            sx={useStyles.textField}
            InputProps={{
              style: useStyles.input,
            }}
            InputLabelProps={{
              sx: useStyles.inputLabel,
              shrink: !!formValues.screenType,
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <TextField
              name="discount"
              label="Descuento"
              variant="outlined"
              fullWidth
              value={formValues.discount}
              onChange={handleInputChange}
              required
              sx={useStyles.textField}
              InputProps={{
                style: useStyles.input,
              }}
              InputLabelProps={{
                sx: useStyles.inputLabel,
                shrink: !!formValues.discount,
              }}
            />
            <TextField
              name="batteryLife"
              label="Duración de la batería (días)"
              variant="outlined"
              fullWidth
              type="number"
              value={formValues.batteryLife}
              onChange={handleInputChange}
              required
              sx={useStyles.textField}
              InputProps={{
                style: useStyles.input,
              }}
              InputLabelProps={{
                sx: useStyles.inputLabel,
                shrink: !!formValues.batteryLife,
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            paddingLeft: '20px',
            borderColor: `${colors.grey[100]}`,
          }}
        >
          <Box sx={useStyles.imageContainer}>
            {imagesPreview.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={80}
                height={80}
                alt={`Image ${index + 1}`}
                style={useStyles.imagePreview}
              />
            ))}
          </Box>
          <Box sx={useStyles.fileInput}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </Box>
          <Box sx={useStyles.checkBoxContainer}>
            <FormControlLabel
              control={
                <Checkbox
                  name="waterResistant"
                  checked={formValues.waterResistant}
                  onChange={handleInputChange}
                />
              }
              label="Es resistente al agua"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="touchScreen"
                  checked={formValues.touchScreen}
                  onChange={handleInputChange}
                />
              }
              label="Con pantalla táctil"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="gps"
                  checked={formValues.gps}
                  onChange={handleInputChange}
                />
              }
              label="Con GPS"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="bluetooth"
                  checked={formValues.bluetooth}
                  onChange={handleInputChange}
                />
              }
              label="Con Bluetooth"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={useStyles.submitButton}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </Box>
      {error && <ErrorBox message={error} />}
    </Box>
  );
};

export default ProductForm;
