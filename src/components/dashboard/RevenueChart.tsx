import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

import { revenueData } from '../../data/dashboardData';
import { useDashboardStore } from '../../store/dashboardStore';
import {
  formatCompactNumber,
  formatCurrency,
} from '../../utils/formatters';

import type { RevenueDataPoint } from '../../types';

const dateRangeOptions = [
  { label: '7 days', value: '7d' },
  { label: '30 days', value: '30d' },
  { label: '90 days', value: '90d' },
  { label: '12 months', value: '12m' },
] as const;

interface RevenueTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
    color?: string;
    payload?: RevenueDataPoint;
  }>;
  label?: string;
}

function RevenueTooltip({
  active,
  payload,
  label,
}: RevenueTooltipProps) {
  if (!active || !payload?.length) return null;

  const currentRevenue =
    payload.find((item) => item.dataKey === 'revenue')?.value ?? 0;

  const previousRevenue =
    payload.find((item) => item.dataKey === 'previousRevenue')?.value ?? 0;

  return (
    <div className="min-w-[175px] rounded-xl border border-border bg-white p-3 shadow-[0_8px_30px_rgba(20,30,20,0.12)]">
      <p className="mb-3 text-[10px] font-medium text-muted">
        {label}
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#9BCB55]" />
            <span className="text-[10px] text-muted">This period</span>
          </div>
          <span className="text-[11px] font-bold text-foreground">
            {formatCurrency(currentRevenue)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#C8D0C1]" />
            <span className="text-[10px] text-muted">Previous</span>
          </div>
          <span className="text-[11px] font-semibold text-muted">
            {formatCurrency(previousRevenue)}
          </span>
        </div>
      </div>
    </div>
  );
}

function RevenueChart() {
  const { dateRange, setDateRange } = useDashboardStore();

  const chartData = useMemo(() => {
    switch (dateRange) {
      case '7d':
        return revenueData.slice(-7);
      case '30d':
        return revenueData.slice(-30);
      case '90d':
      case '12m':
        // The mock dataset contains 30 daily entries.
        // Keep the available sample visible instead of inventing data.
        return revenueData;
      default:
        return revenueData;
    }
  }, [dateRange]);

  const totalRevenue = chartData.reduce(
    (total, point) => total + point.revenue,
    0,
  );

  const previousRevenue = chartData.reduce(
    (total, point) => total + point.previousRevenue,
    0,
  );

  const percentageChange =
    previousRevenue === 0
      ? 0
      : ((totalRevenue - previousRevenue) / previousRevenue) * 100;

  const isPositive = percentageChange >= 0;

  return (
    <section className="dashboard-card min-w-0 overflow-hidden p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF5E5] text-[#628B35]">
              <TrendingUp size={16} />
            </div>

            <p className="text-[11px] font-semibold text-muted">
              Revenue overview
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-end gap-3">
            <h2 className="font-heading text-[25px] font-extrabold tracking-[-1px] text-foreground sm:text-[30px]">
              {formatCurrency(totalRevenue)}
            </h2>

            <span
              className={`mb-1 inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-[10px] font-bold ${
                isPositive
                  ? 'bg-[#EAF5EA] text-[#319568]'
                  : 'bg-[#FCECEB] text-[#D46D68]'
              }`}
            >
              <ArrowUpRight
                size={12}
                className={!isPositive ? 'rotate-90' : ''}
              />
              {Math.abs(percentageChange).toFixed(1)}%
            </span>
          </div>

          <p className="mt-1 text-[10px] text-muted">
            Compared with the previous period
          </p>
        </div>

        {/* Date selector */}
        <div className="flex flex-wrap items-center gap-1 rounded-xl bg-background p-1">
          {dateRangeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setDateRange(option.value)}
              aria-pressed={dateRange === option.value}
              className={`rounded-lg px-2.5 py-2 text-[9px] font-semibold transition-all sm:px-3 sm:text-[10px] ${
                dateRange === option.value
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="mt-7 h-[250px] w-full sm:h-[290px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 8, right: 5, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#A8D94E"
                    stopOpacity={0.28}
                  />
                  <stop
                    offset="95%"
                    stopColor="#A8D94E"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#EEF0EB"
                strokeDasharray="4 5"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#969C92',
                  fontSize: 10,
                }}
                tickMargin={12}
                minTickGap={24}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#969C92',
                  fontSize: 10,
                }}
                tickFormatter={(value: number) =>
                  formatCompactNumber(value)
                }
                tickMargin={10}
                width={48}
              />

              <Tooltip
                content={<RevenueTooltip />}
                cursor={{
                  stroke: '#C5F36B',
                  strokeWidth: 1,
                  strokeDasharray: '4 4',
                }}
              />

              <Area
                type="monotone"
                dataKey="previousRevenue"
                stroke="#C8D0C1"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="none"
                activeDot={{
                  r: 4,
                  stroke: '#C8D0C1',
                  strokeWidth: 2,
                  fill: '#FFFFFF',
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8DBB3F"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                activeDot={{
                  r: 5,
                  stroke: '#FFFFFF',
                  strokeWidth: 2,
                  fill: '#8DBB3F',
                }}
                animationDuration={900}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-[12px] text-muted">
            No revenue data available.
          </div>
        )}
      </div>

      {/* Chart legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#9BCB55]" />
            <span className="text-[10px] text-muted">
              Current period
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C8D0C1]" />
            <span className="text-[10px] text-muted">
              Previous period
            </span>
          </div>
        </div>

        <span className="text-[9px] text-muted">
          Sample dashboard data
        </span>
      </div>
    </section>
  );
}

export default RevenueChart;