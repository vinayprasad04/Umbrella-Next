import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardSidebar from '@/components/DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: 'dashboard' | 'my-goal';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentPage }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc]">
       <Header dashboard={true} />

      <main className="flex lg:flex flex-1 w-full gap-0 relative overflow-hidden">
        <DashboardSidebar currentPage={currentPage} />

        {/* Content area - only this part will change when navigating */}
        <div className="flex-1 flex  w-full absolute lg:relative inset-0 lg:inset-auto overflow-auto">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
