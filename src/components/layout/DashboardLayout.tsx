import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNavigation from './MobileNavigation';

import { useDashboardStore } from '../../store/dashboardStore';

function DashboardLayout() {
  const location = useLocation();

  const {
    sidebarCollapsed,
    mobileNavOpen,
    setMobileNavOpen,
  } = useDashboardStore();

  // Close mobile navigation whenever the route changes.
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, setMobileNavOpen]);

  // Close mobile navigation when switching to desktop width.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setMobileNavOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />

      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <div
        className={`min-h-screen transition-[margin] duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:ml-[88px]' : 'lg:ml-[252px]'
        }`}
      >
        <Topbar />

        <main className="min-h-[calc(100vh-var(--topbar-height))] px-[var(--page-padding)] py-7">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
}

export default DashboardLayout;