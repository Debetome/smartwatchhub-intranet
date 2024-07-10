'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataTeam, TeamMember } from '../../data/mockData';
import { usePageLoading } from '@/app/contexts/pageLoadingContext';

import Header from '@/app/components/Header';
import Button from '@mui/material/Button';
import Loading from '@/app/components/Loading';

interface UsersProps {
  // Define any props if needed
}

const Users: React.FC<UsersProps> = () => {
  const { isLoading } = usePageLoading();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'age',
      headerName: 'Edad',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    { field: 'phone', headerName: 'Número de teléfono', flex: 1 },
    { field: 'email', headerName: 'Correo de Usuario', flex: 1 },
    {
      field: 'accessLevel',
      headerName: 'Acciones',
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <Button
            sx={{
              backgroundColor: '#6870fa',
              color: '#fff',
              '&:hover': { backgroundColor: '#4E55BD' },
              width: '40px',
              height: '40px',
              fontWeight: '500',
            }}
          >
            Edit
          </Button>

          <Button
            sx={{
              backgroundColor: '#FF4C4C',
              '&:hover': { backgroundColor: '#CF3E3E' },
              width: '40px',
              height: '40px',
              marginLeft: '0.5rem',
              fontWeight: '500',
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (isLoading) return <Loading/>

  return (
    <Box m="20px">
      <Header title="USUARIOS" subtitle="Administración de usuarios" />
      <Box
        m="-10px 0 0 0"
        height="70vh"
        sx={{
          '& .MuiDataGrid-root': { border: 'none' },
          '& .MuiDataGrid-cell': { borderBottom: 'none' },
          '& .name-column--cell': { color: colors.greenAccent[300] },
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
        <DataGrid rows={mockDataTeam as TeamMember[]} columns={columns} />
      </Box>
    </Box>
  );
};

export default Users;
