'use client';

import React from "react";
import { Box, IconButton, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '@/app/theme';
import { mockDataProducts } from '@/app/data/mockData';
import { useTheme } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '@/app/components/Loading';

import { Product as ProductType } from '@/app/data/mockData';
import Header from '@/app/components/Header';
import { usePageLoading } from '@/app/contexts/pageLoadingContext';

interface Product {
  id: number;
  name: string;
  brand: string;
  units: number;
  price: number;
  rating: number;
  color: string;
}

const Inventory: NextPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { isLoading, setIsLoading } = usePageLoading();

  useEffect(() => {
    // Simulate fetching products from localStorage or API
    const insertData = async () => {
      if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(mockDataProducts));
      }
      setProducts(JSON.parse(localStorage.getItem('products') || '[]'));
    };
    insertData();
  }, []);

  const handleDeleteItem = useCallback(
    (productId: number) => {
      const newProducts = products.filter(
        (product) => product.id !== productId,
      );
      setProducts(newProducts);
      localStorage.setItem('products', JSON.stringify(newProducts));
    },
    [products],
  );

  const navigateToCreate = () => {
    setIsLoading(true);
    router.push(`/dashboard/inventory/create`);
  }

  const navigateToEdit = (productId: number) => {
    setIsLoading(true);
    router.push(`/dashboard/inventory/edit/${productId}`);
  };

  const changeUnits = async (id: number, amount: number) => {    
    const productsData = localStorage.getItem('products');
    const productsDB = JSON.parse(productsData as string);

    const product = products.find((item) => item.id === id);
    const newProducts = products.filter((item) => item.id !== id);
    const newProductsDB = productsDB.filter(
      (item: ProductType) => item.id !== id,
    );

    if (!product || product?.units + amount < 0) return;

    product.units += amount;
    newProducts.push(product);
    newProductsDB.push(product);

    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProductsDB));
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3 },
    {
      field: 'name',
      headerName: 'Modelo',
      flex: 1.2,
      cellClassName: 'name-column--cell',
    },
    { field: 'brand', headerName: 'Marca', flex: 0.6 },
    {
      field: 'price',
      headerName: 'Precio',
      flex: 0.6,
      renderCell: (params: { row: Product }) => (
        <Typography color={colors.greenAccent[500]}>
          S/.{params.row.price}
        </Typography>
      ),
    },
    {
      field: 'units',
      headerName: 'Unidades disponibles',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    { field: 'rating', headerName: 'Rating', flex: 0.6 },
    { field: 'color', headerName: 'Color', flex: 0.5 },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1.2,
      renderCell: ({ row }: { row: Product }) => (
        <>
          <IconButton
            onClick={() => navigateToEdit(row.id)}
            sx={{
              backgroundColor: '#6870fa',
              '&:hover': {
                backgroundColor: '#4E55BD',
              },
              width: '40px',
              height: '40px',
            }}
          >
            <EditIcon
              sx={{
                fontSize: '20px',
                color: '#ffffff',
                fontWeight: 'bold',
              }}
            />
          </IconButton>

          <IconButton
            onClick={() => handleDeleteItem(row.id)}
            sx={{
              backgroundColor: '#FF4C4C',
              '&:hover': {
                backgroundColor: '#CF3E3E',
              },
              width: '40px',
              height: '40px',
              marginLeft: '0.5rem',
            }}
          >
            <DeleteIcon
              sx={{
                fontSize: '20px',
                color: '#ffffff',
                fontWeight: 'bold',
              }}
            />
          </IconButton>

          <IconButton
            onClick={() => changeUnits(row.id, 1)}
            sx={{
              backgroundColor: `${colors.primary[500]}`,
              '&:hover': {
                backgroundColor: `${colors.primary[600]}`,
              },
              width: '40px',
              height: '40px',
              marginLeft: '0.5rem',
            }}
          >
            <AddIcon
              sx={{
                fontSize: '20px',
                color: '#ffffff',
                fontWeight: 'bold',
              }}
            />
          </IconButton>
          <IconButton
            onClick={() => changeUnits(row.id, -1)}
            sx={{
              backgroundColor: `${colors.primary[500]}`,
              '&:hover': {
                backgroundColor: `${colors.primary[600]}`,
              },
              width: '40px',
              height: '40px',
              marginLeft: '0.5rem',
            }}
          >
            <RemoveIcon
              sx={{
                fontSize: '20px',
                color: '#ffffff',
                fontWeight: 'bold',
              }}
            />
          </IconButton>
        </>
      ),
    },
  ];

  if (products.length === 0 || isLoading) return <Loading/>

  return (
    <>
      <Box m="20px">
        <Box sx={{ display: 'flex' }}>
          <Header title="INVENTARIO" subtitle="Lista de productos" />
          <IconButton
            onClick={() => navigateToCreate()}
            sx={{
              marginLeft: 'auto',
              backgroundColor: '#9BEA19',
              '&:hover': {
                backgroundColor: '#82C715',
              },
              width: '56px',
              height: '56px',
            }}
          >
            <AddIcon
              sx={{
                fontSize: '32px',
                color: '#ffffff',
                fontWeight: 'bold',
              }}
            />
          </IconButton>
        </Box>
        <Box
          m="-10px 0 0 0"
          height="70vh"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.blueAccent[700],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.blueAccent[700],
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid rows={products} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default Inventory;
