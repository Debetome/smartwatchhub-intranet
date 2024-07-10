'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type SidebarContextType = {
  isSidebar: boolean;
  setIsSidebar: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider!');
  }

  return context;
};

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebar, setIsSidebar] = useState<boolean>(false);

  return (
    <SidebarContext.Provider value={{ isSidebar, setIsSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
