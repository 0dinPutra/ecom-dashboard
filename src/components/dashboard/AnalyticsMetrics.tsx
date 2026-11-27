import {
  ArrowDownRight,
  ArrowUpRight,
  ShoppingBag,
  Users,
  Wallet,
  Target,
} from 'lucide-react';

import { dashboardStats } from '../../data/dashboardData';

const metricConfig = [
  {
    id: 'revenue',
    icon: Wallet,
    label: 'Total revenue',
    accent: 'bg-[#EEF5E5] text-[#719B3D]',
  },
  {
    id: 'orders',
    icon: ShoppingBag,
    label: 'Total orders',
    accent: 'bg-[#EEF0FA] text-[#747CC2]',
  },
  {
    id: 'customers',
    icon: Users,
    label: 'Total customers',
    accent: 'bg-[#FCEFEA] text-[#D58A68]',
  },
  {
    id: 'conversion',
    icon: Target,
    label: 'Conversion rate',
    accent: 'bg-[#EAF3F2] text-[#4C9186]',
  },
];

function AnalyticsMetrics() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metricConfig.map((config) => {
        const stat = dashboardStats.find((item) => item.id === config.id);

        if (!stat) return null;

        const Icon = config.icon;
        const isPositive = stat.trend === 'up';

        return (
          <div
            key={config.id}
            className="dashboard-card group p-5 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.accent}`}
              >
                <Icon size={18} strokeWidth={1.8} />
              </div>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold ${
                  isPositive
                    ? 'bg-[#EDF7E9] text-[#389365]'
                    : 'bg-[#FCEFED] text-[#D36D65]'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {Math.abs(stat.change)}%
              </span>
            </div>

            <p className="mt-5 text-[10px] font-medium text-muted">
              {config.label}
            </p>

            <h3 className="mt-1 font-heading text-[25px] font-extrabold tracking-[-1px] text-foreground">
              {stat.formattedValue}
            </h3>

            <p className="mt-2 text-[9px] text-muted">
              {stat.changeLabel}
            </p>
          </div>
        );
      })}
    </section>
  );
}

export default AnalyticsMetrics;