'use client';

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { mockTransactions, Transaction } from '@/app/data/mockData';
import { usePageLoading } from '@/app/contexts/pageLoadingContext';
import { tokens } from '@/app/theme';

import Header from '@/app/components/Header';
import Loading from '@/app/components/Loading';

const Sales = () => {
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
      headerName: 'Unidades vendidas',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Correo de Usuario',
      flex: 1,
    },
    {
      field: 'cost',
      headerName: 'Costo Total',
      flex: 1,
      renderCell: ({ row }: { row: Transaction }) => (
        <Typography color={colors.greenAccent[500]}>S/.{row.cost}</Typography>
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
    },
  ];

  if (isLoading) return <Loading/>

  return (
    <Box m="20px">
      <Header title="VENTAS" subtitle="Lista de ventas realizadas" />
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

export default Sales;
