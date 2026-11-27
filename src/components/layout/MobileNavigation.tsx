import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
} from 'lucide-react';

import { useDashboardStore } from '../../store/dashboardStore';

const mobileItems = [
  {
    label: 'Home',
    path: '/overview',
    icon: LayoutDashboard,
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
  },
  {
    label: 'Products',
    path: '/products',
    icon: Package,
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: ShoppingBag,
  },
  {
    label: 'Customers',
    path: '/customers',
    icon: Users,
  },
];

function MobileNavigation() {
  const { setMobileNavOpen } = useDashboardStore();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto flex max-w-[520px] items-center justify-around">
        {mobileItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileNavOpen(false)}
              className={({ isActive }) =>
                `relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 transition-colors ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted hover:text-foreground'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute -top-2 h-[3px] w-6 rounded-b-full bg-accent-dark" />
                  )}

                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2.4 : 1.8}
                  />

                  <span
                    className={`truncate text-[9px] ${
                      isActive ? 'font-bold' : 'font-medium'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNavigation;