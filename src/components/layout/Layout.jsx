import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isAccountRoute = location.pathname.startsWith('/account');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col -mt-0">
        <Outlet />
      </main>
      {!isAccountRoute && <Footer />}
    </div>
  );
};

export default Layout;
