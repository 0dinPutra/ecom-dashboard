import { BarChart3, CalendarDays } from 'lucide-react';

import AnalyticsMetrics from '../components/dashboard/AnalyticsMetrics';
import AnalyticsInsights from '../components/dashboard/AnalyticsInsights';
import RevenueChart from '../components/dashboard/RevenueChart';
import SalesChart from '../components/dashboard/SalesChart';
import TrafficSources from '../components/dashboard/TrafficSources';

function Analytics() {
  const today = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="space-y-6 pb-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#DDEBCB] bg-[#F0F7E8] px-3 py-1.5">
            <BarChart3 size={12} className="text-[#719B3D]" />
            <span className="text-[9px] font-bold uppercase tracking-[1px] text-[#668A3B]">
              Data & performance
            </span>
          </div>

          <h2 className="font-heading text-[26px] font-extrabold tracking-[-1px] text-foreground sm:text-[31px]">
            Analytics
          </h2>

          <p className="mt-2 text-[11px] text-muted">
            Understand your performance and discover what's driving growth.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border border-border bg-white px-3.5 py-3 sm:self-auto">
          <CalendarDays size={14} className="text-muted" />
          <span className="text-[10px] font-semibold text-foreground">
            Updated {today}
          </span>
        </div>
      </section>

      {/* Performance metrics */}
      <section className="space-y-4">
        <div>
          <h3 className="font-heading text-[14px] font-bold text-foreground">
            Key performance indicators
          </h3>
          <p className="mt-1 text-[10px] text-muted">
            A snapshot of your store's overall performance
          </p>
        </div>

        <AnalyticsMetrics />
      </section>

      {/* Revenue chart */}
      <section className="space-y-4">
        <div>
          <h3 className="font-heading text-[14px] font-bold text-foreground">
            Revenue performance
          </h3>
          <p className="mt-1 text-[10px] text-muted">
            Track revenue trends and compare performance over time
          </p>
        </div>

        <RevenueChart />
      </section>

      {/* Sales and traffic */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="min-w-0 xl:col-span-7">
          <SalesChart />
        </div>

        <div className="min-w-0 xl:col-span-5">
          <TrafficSources />
        </div>
      </section>

      {/* Insights */}
      <section className="space-y-4">
        <div>
          <h3 className="font-heading text-[14px] font-bold text-foreground">
            What the numbers are telling you
          </h3>
          <p className="mt-1 text-[10px] text-muted">
            A few useful takeaways from your current store data
          </p>
        </div>

        <AnalyticsInsights />
      </section>
    </div>
  );
}

export default Analytics;