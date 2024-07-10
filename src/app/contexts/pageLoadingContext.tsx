'use client';

import { usePathname } from 'next/navigation';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type pageLoadingContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const pageLoadingContext = createContext<pageLoadingContextType | undefined>(
  undefined,
);

export const usePageLoading = () => {
  const context = useContext(pageLoadingContext);
  if (!context) {
    throw new Error('usePageLoading must be used within a SidebarProvider!');
  }

  return context;
};

export const PageLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsLoading(false);
  }, [pathName]);

  return (
    <pageLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </pageLoadingContext.Provider>
  );
};
