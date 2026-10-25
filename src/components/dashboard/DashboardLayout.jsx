import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DemoModeBanner } from '../common/DemoModeBanner';

export const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-warmbg flex flex-col">
      <DemoModeBanner />
      <div className="flex-1 flex">
        <DashboardSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                onOpenMobileSidebar: () => setMobileOpen(true),
              });
            }
            return child;
          })}
        </div>
      </div>
    </div>
  );
};
