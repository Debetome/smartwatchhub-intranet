'use client';

import React from 'react';
import { Box, useTheme, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { mockTransactions, Transaction } from '@/app/data/mockData';
import { usePageLoading } from '@/app/contexts/pageLoadingContext';
import { tokens } from '@/app/theme';

import Header from '@/app/components/Header';
import Loading from '@/app/components/Loading';

const Orders = () => {
  const { isLoading } = usePageLoading();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'user',
      headerName: 'Nombre de Usuario',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'amount',
      headerName: 'Unidades Pedidas',
      flex: 0.8,
    },
    {
      field: 'email',
      headerName: 'Correo de Usuario',
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (_: any) => {
        return (
          <>
            <Button
              sx={{
                backgroundColor: '#FF4C4C',
                '&:hover': {
                  backgroundColor: '#CF3E3E', // Darker shade for hover effect
                },
                width: '40px', // Adjust width as needed
                height: '40px', // Adjust height as needed
                marginLeft: '0.5rem',
                fontWeight: '500',
              }}
            >
              Cancelar
            </Button>
          </>
        );
      },
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <Box m="20px">
      <Header title="PEDIDOS" subtitle="Lista de pedidos pendientes" />
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
        }}
      >
        <DataGrid rows={mockTransactions} columns={columns} />
      </Box>
    </Box>
  );
};

export default Orders;
