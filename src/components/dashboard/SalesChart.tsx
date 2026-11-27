import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ShoppingCart } from 'lucide-react';

import { salesData } from '../../data/dashboardData';
import { formatCompactNumber, formatCurrency } from '../../utils/formatters';

interface SalesTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
  }>;
  label?: string;
}

function SalesTooltip({ active, payload, label }: SalesTooltipProps) {
  if (!active || !payload?.length) return null;

  const sales = payload.find((item) => item.dataKey === 'sales')?.value ?? 0;
  const orders = payload.find((item) => item.dataKey === 'orders')?.value ?? 0;

  return (
    <div className="rounded-xl border border-border bg-white p-3 shadow-lg">
      <p className="mb-2 text-[10px] font-semibold text-muted">{label}</p>
      <p className="text-[12px] font-bold text-foreground">
        {formatCurrency(sales)}
      </p>
      <p className="mt-1 text-[10px] text-muted">
        {orders} orders
      </p>
    </div>
  );
}

function SalesChart() {
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);

  return (
    <section className="dashboard-card min-w-0 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF0FA] text-[#747CC2]">
              <ShoppingCart size={16} />
            </div>
            <p className="text-[11px] font-semibold text-muted">
              Weekly sales
            </p>
          </div>

          <h2 className="mt-4 font-heading text-[25px] font-extrabold tracking-[-1px] text-foreground">
            {formatCurrency(totalSales)}
          </h2>

          <p className="mt-1 text-[10px] text-muted">
            {totalOrders.toLocaleString('en-IN')} orders this week
          </p>
        </div>

        <span className="rounded-lg border border-border bg-background px-3 py-2 text-[10px] font-semibold text-muted">
          Last 7 days
        </span>
      </div>

      <div className="mt-7 h-[230px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={salesData}
            margin={{ top: 5, right: 0, left: -15, bottom: 0 }}
            barCategoryGap="28%"
          >
            <CartesianGrid
              stroke="#EEF0EB"
              strokeDasharray="4 5"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#969C92', fontSize: 10 }}
              tickMargin={12}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#969C92', fontSize: 10 }}
              tickFormatter={(value: number) => formatCompactNumber(value)}
              width={48}
            />

            <Tooltip
              content={<SalesTooltip />}
              cursor={{ fill: '#F5F7F1' }}
            />

            <Bar
              dataKey="sales"
              fill="#B6E66A"
              radius={[5, 5, 0, 0]}
              maxBarSize={34}
              animationDuration={900}
            />

            <Bar
              dataKey="orders"
              fill="#DCE6CF"
              radius={[5, 5, 0, 0]}
              maxBarSize={34}
              hide
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
        <span className="h-2.5 w-2.5 rounded-sm bg-[#B6E66A]" />
        <span className="text-[10px] text-muted">Sales revenue</span>
      </div>
    </section>
  );
}

export default SalesChart;