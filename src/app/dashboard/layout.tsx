import React, { ReactNode } from 'react';
import { PageLoadingProvider } from '../contexts/pageLoadingContext';

import Sidebar from '../components/SideBar';
import Topbar from '../components/TopBar';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <PageLoadingProvider>
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          {children}
        </main>
      </div>
    </PageLoadingProvider>
  );
}
