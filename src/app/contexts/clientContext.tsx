'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ColorModeContext, useMode } from '../theme';
import { SidebarProvider } from '../contexts/sideBarContext';

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SidebarProvider>{children}</SidebarProvider>
        <CssBaseline />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
