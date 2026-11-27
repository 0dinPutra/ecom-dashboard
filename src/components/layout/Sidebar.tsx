import { NavLink } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Users,
  Warehouse,
  X,
} from 'lucide-react';

import { useDashboardStore } from '../../store/dashboardStore';

const navigationGroups = [
  {
    label: 'WORKSPACE',
    items: [
      {
        label: 'Overview',
        path: '/overview',
        icon: LayoutDashboard,
      },
      {
        label: 'Analytics',
        path: '/analytics',
        icon: BarChart3,
      },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      {
        label: 'Products',
        path: '/products',
        icon: Package,
      },
      {
        label: 'Orders',
        path: '/orders',
        icon: ShoppingBag,
        badge: '12',
      },
      {
        label: 'Customers',
        path: '/customers',
        icon: Users,
      },
      {
        label: 'Inventory',
        path: '/inventory',
        icon: Warehouse,
      },
    ],
  },
];

function Sidebar() {
  const {
    sidebarCollapsed,
    toggleSidebar,
    mobileNavOpen,
    setMobileNavOpen,
  } = useDashboardStore();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-[252px] flex-col border-r border-white/[0.06] bg-sidebar text-white transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'lg:w-[88px]' : 'lg:w-[252px]'
      } ${
        mobileNavOpen
          ? 'translate-x-0'
          : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand */}
      <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/[0.07] px-6">
        <NavLink
          to="/overview"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setMobileNavOpen(false)}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-sidebar">
            <ShoppingBag size={19} strokeWidth={2.5} />
          </div>

          <div
            className={`min-w-0 transition-all duration-200 ${
              sidebarCollapsed ? 'lg:hidden' : ''
            }`}
          >
            <p className="font-heading text-[17px] font-extrabold tracking-[-0.7px]">
              commerce<span className="text-accent">.</span>
            </p>
            <p className="mt-[-2px] text-[10px] font-medium tracking-[1.8px] text-sidebar-muted">
              ADMIN PANEL
            </p>
          </div>
        </NavLink>

        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
          className="rounded-lg p-2 text-sidebar-muted transition-colors hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X size={18} />
        </button>

        <button
          type="button"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={toggleSidebar}
          className="hidden rounded-lg p-2 text-sidebar-muted transition-colors hover:bg-white/10 hover:text-white lg:block"
        >
          {sidebarCollapsed ? (
            <ChevronRight size={17} />
          ) : (
            <ChevronLeft size={17} />
          )}
        </button>
      </div>

      {/* Store profile */}
      <div
        className={`mx-4 mt-6 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.045] p-3 ${
          sidebarCollapsed ? 'lg:justify-center lg:px-2' : ''
        }`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#303A30] text-accent">
          <Activity size={17} />
        </div>

        <div
          className={`min-w-0 flex-1 ${
            sidebarCollapsed ? 'lg:hidden' : ''
          }`}
        >
          <p className="truncate text-[12px] font-semibold text-white">
            Studio Market
          </p>
          <p className="mt-0.5 text-[10px] text-sidebar-muted">
            Premium Store
          </p>
        </div>

        <span
          className={`h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(197,243,107,0.6)] ${
            sidebarCollapsed ? 'lg:hidden' : ''
          }`}
        />
      </div>

      {/* Navigation */}
      <nav className="custom-scrollbar flex-1 overflow-y-auto px-4 pb-5 pt-7">
        {navigationGroups.map((group) => (
          <div key={group.label} className="mb-8">
            <p
              className={`mb-3 px-3 text-[9px] font-bold tracking-[1.7px] text-sidebar-muted/70 ${
                sidebarCollapsed ? 'lg:hidden' : ''
              }`}
            >
              {group.label}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    title={sidebarCollapsed ? item.label : undefined}
                    onClick={() => setMobileNavOpen(false)}
                    className={({ isActive }) =>
                      `group relative flex h-11 items-center gap-3 rounded-xl px-3 text-[12px] font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-accent font-semibold text-sidebar shadow-[0_4px_14px_rgba(197,243,107,0.12)]'
                          : 'text-sidebar-muted hover:bg-white/[0.07] hover:text-white'
                      } ${
                        sidebarCollapsed ? 'lg:justify-center lg:px-0' : ''
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2.3 : 1.8}
                          className="shrink-0"
                        />

                        <span
                          className={`flex-1 truncate ${
                            sidebarCollapsed ? 'lg:hidden' : ''
                          }`}
                        >
                          {item.label}
                        </span>

                        {'badge' in item && item.badge && (
                          <span
                            className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${
                              isActive
                                ? 'bg-sidebar/10 text-sidebar'
                                : 'bg-white/10 text-sidebar-muted'
                            } ${sidebarCollapsed ? 'lg:hidden' : ''}`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {isActive && (
                          <span className="absolute right-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-l-full bg-sidebar lg:hidden" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mb-3">
          <p
            className={`mb-3 px-3 text-[9px] font-bold tracking-[1.7px] text-sidebar-muted/70 ${
              sidebarCollapsed ? 'lg:hidden' : ''
            }`}
          >
            PREFERENCES
          </p>

          <NavLink
            to="/settings"
            title={sidebarCollapsed ? 'Settings' : undefined}
            onClick={() => setMobileNavOpen(false)}
            className={({ isActive }) =>
              `flex h-11 items-center gap-3 rounded-xl px-3 text-[12px] font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent font-semibold text-sidebar'
                  : 'text-sidebar-muted hover:bg-white/[0.07] hover:text-white'
              } ${
                sidebarCollapsed ? 'lg:justify-center lg:px-0' : ''
              }`
            }
          >
            <Settings size={18} strokeWidth={1.8} />
            <span className={sidebarCollapsed ? 'lg:hidden' : ''}>
              Settings
            </span>
          </NavLink>
        </div>
      </nav>

      {/* Help card */}
      <div
        className={`shrink-0 border-t border-white/[0.07] p-4 ${
          sidebarCollapsed ? 'lg:px-3' : ''
        }`}
      >
        <div
          className={`rounded-xl bg-[#222923] p-3 ${
            sidebarCollapsed ? 'lg:hidden' : ''
          }`}
        >
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <CircleHelp size={15} />
            </div>
            <span className="text-[11px] font-semibold text-white">
              Need a hand?
            </span>
          </div>

          <p className="mb-3 text-[10px] leading-relaxed text-sidebar-muted">
            Explore the dashboard and discover what's possible.
          </p>

          <button
            type="button"
            onClick={() => {
              window.alert('Help center is a demo feature.');
            }}
            className="w-full rounded-lg border border-white/10 py-2 text-[10px] font-semibold text-white transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
          >
            Visit help center
          </button>
        </div>

        <div
          className={`mt-3 flex items-center gap-2 px-2 text-[9px] text-sidebar-muted/60 ${
            sidebarCollapsed ? 'lg:justify-center' : ''
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className={sidebarCollapsed ? 'lg:hidden' : ''}>
            All systems operational
          </span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;