'use client';

import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '@/app/theme';
import { mockTransactions } from '@/app/data/mockData';

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';

import { usePageLoading } from '@/app/contexts/pageLoadingContext';
import Header from '@/app/components/Header';
import LineChart from '@/app/components/LineChart';
import StatBox from '@/app/components/StatBox';
import Loading from '@/app/components/Loading';

const Dashboard = () => {
  const { isLoading } = usePageLoading();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (isLoading) return <Loading />;

  return (
    <Box m="20px" mb="-2px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header 
          title="DASHBOARD" 
          subtitle="Bienvenido al dashboard de SmartwatchHub" 
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: '10px' }} />
            Descargar Reportes
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mt="-10px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={{ xs: 'span 12', md: 'span 3' }}
          bgcolor={colors.primary[400]} // Use bgcolor instead of backgroundColor
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Ventas Obtenidas"
            progress={0.5}
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{ xs: 'span 12', md: 'span 3' }}
          bgcolor={colors.primary[400]} // Use bgcolor instead of backgroundColor
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="Nuevos Clientes"
            progress={0.3}
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{ xs: 'span 12', md: 'span 3' }}
          bgcolor={colors.primary[400]} // Use bgcolor instead of backgroundColor
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Trafico Recibido"
            progress={0.8}
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn={{ xs: 'span 12', md: 'span 8' }}
          gridRow={{ xs: 'span 2', md: 'span 2' }}
          bgcolor={colors.primary[400]} // Use bgcolor instead of backgroundColor
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Ingresos Generados
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: '26px', color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn={{ xs: 'span 12', md: 'span 4' }}
          gridRow={{ xs: 'span 2', md: 'span 2' }}
          bgcolor={colors.primary[400]} // Use bgcolor instead of backgroundColor
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            color={colors.grey[100]}
            p="15px"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Transferencias Recientes
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                bgcolor={colors.greenAccent[500]} // Use bgcolor instead of backgroundColor
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
