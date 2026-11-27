import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  ChevronDown,
  Command,
  LogOut,
  Menu,
  PackageCheck,
  Search,
  Settings,
  ShoppingCart,
  UserRound,
  X,
} from 'lucide-react';

import { useDashboardStore } from '../../store/dashboardStore';

const pageTitles: Record<string, string> = {
  '/overview': 'Overview',
  '/analytics': 'Analytics',
  '/products': 'Products',
  '/orders': 'Orders',
  '/customers': 'Customers',
  '/inventory': 'Inventory',
  '/settings': 'Settings',
};

const notifications = [
  {
    id: 1,
    title: 'New order received',
    description: 'Order #ORD-2847 has been placed.',
    time: '5 minutes ago',
    icon: ShoppingCart,
  },
  {
    id: 2,
    title: 'Stock running low',
    description: 'Minimalist Chair has only 4 units left.',
    time: '28 minutes ago',
    icon: PackageCheck,
  },
  {
    id: 3,
    title: 'Order successfully shipped',
    description: 'Order #ORD-2841 is on its way.',
    time: '1 hour ago',
    icon: CheckCheck,
  },
];

function Topbar() {
  const location = useLocation();

  const [searchValue, setSearchValue] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    mobileNavOpen,
    setMobileNavOpen,
    notificationPanelOpen,
    setNotificationPanelOpen,
  } = useDashboardStore();

  const currentPage = pageTitles[location.pathname] ?? 'Overview';

  const toggleNotifications = () => {
    setNotificationPanelOpen(!notificationPanelOpen);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen((current) => !current);
    setNotificationPanelOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-[var(--topbar-height)] items-center justify-between border-b border-border bg-white/90 px-[var(--page-padding)] backdrop-blur-xl">
      {/* Left section */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:bg-surface-soft lg:hidden"
        >
          {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="min-w-0">
          <div className="mb-0.5 hidden items-center gap-2 text-[10px] font-medium text-muted sm:flex">
            <span>Workspace</span>
            <span className="text-border">/</span>
            <span className="text-foreground">{currentPage}</span>
          </div>

          <h1 className="truncate font-heading text-[17px] font-bold tracking-[-0.6px] text-foreground sm:text-[19px]">
            {currentPage}
          </h1>
        </div>
      </div>

      {/* Right section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="relative hidden w-[210px] md:block xl:w-[260px]">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search anything..."
            aria-label="Search dashboard"
            className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-16 text-[11px] outline-none transition-all placeholder:text-muted/80 focus:border-accent-dark focus:bg-white focus:ring-2 focus:ring-accent/20"
          />

          {searchValue ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchValue('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
            >
              <X size={14} />
            </button>
          ) : (
            <span className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-border bg-white px-1.5 py-1 text-[9px] font-medium text-muted">
              <Command size={10} />
              K
            </span>
          )}
        </div>

        {/* Mobile search */}
        <button
          type="button"
          aria-label="Search"
          onClick={() => {
            window.alert('Search is available in the expanded dashboard view.');
          }}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-soft hover:text-foreground md:hidden"
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={notificationPanelOpen}
            onClick={toggleNotifications}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
              notificationPanelOpen
                ? 'border-accent-dark/40 bg-accent/20 text-foreground'
                : 'border-border bg-white text-muted hover:bg-surface-soft hover:text-foreground'
            }`}
          >
            <Bell size={17} strokeWidth={1.8} />
            <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full border-2 border-white bg-[#E87968]" />
          </button>

          {notificationPanelOpen && (
            <div className="absolute right-0 top-[calc(100%+14px)] z-50 w-[min(340px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-border bg-white shadow-[0_16px_50px_rgba(20,30,20,0.14)]">
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <div>
                  <h3 className="font-heading text-[14px] font-bold">
                    Notifications
                  </h3>
                  <p className="mt-0.5 text-[10px] text-muted">
                    You have 3 recent updates
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close notifications"
                  onClick={() => setNotificationPanelOpen(false)}
                  className="rounded-lg p-1.5 text-muted hover:bg-surface-soft hover:text-foreground"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="divide-y divide-border">
                {notifications.map((notification) => {
                  const Icon = notification.icon;

                  return (
                    <div
                      key={notification.id}
                      className="flex gap-3 px-4 py-3.5 transition-colors hover:bg-background"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-foreground">
                        <Icon size={16} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-foreground">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-[10px] leading-relaxed text-muted">
                          {notification.description}
                        </p>
                        <p className="mt-1.5 text-[9px] text-muted/80">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setNotificationPanelOpen(false)}
                className="w-full border-t border-border px-4 py-3 text-center text-[10px] font-semibold text-foreground transition-colors hover:bg-background"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        <div className="mx-0.5 hidden h-8 w-px bg-border sm:block" />

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
            onClick={toggleProfile}
            className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-surface-soft"
          >
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Alex Morgan"
              className="h-8 w-8 rounded-xl object-cover"
            />

            <div className="hidden text-left sm:block">
              <p className="text-[11px] font-semibold text-foreground">
                Alex Morgan
              </p>
              <p className="mt-0.5 text-[9px] text-muted">
                Store Admin
              </p>
            </div>

            <ChevronDown
              size={14}
              className={`hidden text-muted transition-transform sm:block ${
                profileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-[210px] overflow-hidden rounded-2xl border border-border bg-white p-1.5 shadow-[0_16px_50px_rgba(20,30,20,0.14)]">
              <div className="border-b border-border px-3 py-3">
                <p className="text-[11px] font-semibold text-foreground">
                  Alex Morgan
                </p>
                <p className="mt-1 truncate text-[10px] text-muted">
                  alex@studiomarket.com
                </p>
              </div>

              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[11px] text-foreground transition-colors hover:bg-background"
              >
                <UserRound size={15} className="text-muted" />
                My profile
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  window.location.href = '/settings';
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[11px] text-foreground transition-colors hover:bg-background"
              >
                <Settings size={15} className="text-muted" />
                Settings
              </button>

              <div className="my-1 border-t border-border" />

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  window.alert('Sign out is a demo feature.');
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[11px] font-medium text-danger transition-colors hover:bg-danger/5"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;