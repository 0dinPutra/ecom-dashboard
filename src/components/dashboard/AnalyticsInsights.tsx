import {
  ArrowUpRight,
  Lightbulb,
  MousePointerClick,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';

import { dashboardStats, trafficSources } from '../../data/dashboardData';

function AnalyticsInsights() {
  const revenue = dashboardStats.find((item) => item.id === 'revenue');
  const conversion = dashboardStats.find((item) => item.id === 'conversion');
  const leadingSource = [...trafficSources].sort(
    (a, b) => b.percentage - a.percentage,
  )[0];

  const insights = [
    {
      icon: TrendingUp,
      title: 'Revenue is moving up',
      description: `Revenue has ${revenue?.change ?? 0}% growth compared with the previous period.`,
      tag: 'Revenue',
      color: 'bg-[#EEF5E5] text-[#719B3D]',
    },
    {
      icon: MousePointerClick,
      title: 'Your traffic leader',
      description: leadingSource
        ? `${leadingSource.name} brings in ${leadingSource.percentage}% of your store traffic.`
        : 'Your traffic sources are ready to review.',
      tag: 'Acquisition',
      color: 'bg-[#EEF0FA] text-[#747CC2]',
    },
    {
      icon: ShoppingCart,
      title: 'Conversion opportunity',
      description: `Your current conversion rate is ${conversion?.formattedValue ?? '—'}. Keep optimizing your product pages and checkout flow.`,
      tag: 'Conversion',
      color: 'bg-[#FCEFEA] text-[#D58A68]',
    },
  ];

  return (
    <section className="dashboard-card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0F7E8] text-[#719B3D]">
          <Lightbulb size={17} />
        </div>

        <div>
          <h2 className="font-heading text-[15px] font-extrabold tracking-[-0.4px] text-foreground">
            Business insights
          </h2>
          <p className="mt-1 text-[9px] text-muted">
            Highlights from your store performance
          </p>
        </div>
      </div>

      <div className="divide-y divide-border">
        {insights.map((insight) => {
          const Icon = insight.icon;

          return (
            <div
              key={insight.tag}
              className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-[#FAFBF8]"
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${insight.color}`}
              >
                <Icon size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[10px] font-bold text-foreground">
                    {insight.title}
                  </h3>

                  <span className="rounded-full bg-[#F3F4F0] px-2 py-0.5 text-[8px] font-semibold text-muted">
                    {insight.tag}
                  </span>
                </div>

                <p className="mt-1.5 text-[9px] leading-relaxed text-muted">
                  {insight.description}
                </p>
              </div>

              <ArrowUpRight
                size={14}
                className="mt-1 shrink-0 text-muted/60"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AnalyticsInsights;