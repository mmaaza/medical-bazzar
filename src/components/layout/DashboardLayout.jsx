import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AccountNavigation from './AccountNavigation';

const DashboardLayout = () => {
  const { currentUser } = useAuth();

  return (
    <div className="md:h-[calc(100vh-88px)] bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-lg px-4 py-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-medium text-sm">
                {currentUser?.name?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex md:overflow-hidden">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-72 flex-shrink-0 bg-white shadow-xl md:h-full">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-medium text-lg">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-0.5">{currentUser?.name || 'User'}</h4>
                  <p className="text-sm text-gray-500 truncate max-w-[180px]">{currentUser?.email}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <AccountNavigation variant="desktop" />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 pb-20 md:pb-8 md:overflow-y-auto">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-top border-t border-gray-200 z-10">
          <AccountNavigation variant="mobile" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;