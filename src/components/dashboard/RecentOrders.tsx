import { ArrowRight, ShoppingBag } from 'lucide-react';

import { useDashboardStore } from '../../store/dashboardStore';
import { formatCurrency, formatDate } from '../../utils/formatters';

import type { OrderStatus } from '../../types';

const statusStyles: Record<OrderStatus, string> = {
Completed: 'bg-[#EAF5EA] text-[#319568]',
Processing: 'bg-[#EEF0FA] text-[#747CC2]',
Shipped: 'bg-[#EAF3F2] text-[#4C9186]',
Pending: 'bg-[#FFF4E5] text-[#C48B35]',
Cancelled: 'bg-[#FCECEB] text-[#D46D68]',
Refunded: 'bg-[#F1EFF8] text-[#8877B6]',
};

function RecentOrders() {
const orders = useDashboardStore((state) => state.orders);

const recentOrders = [...orders]
.sort(
(a, b) =>
new Date(b.date).getTime() - new Date(a.date).getTime(),
)
.slice(0, 5);

return (
<section className="dashboard-card min-w-0 overflow-hidden">
<div className="flex items-center justify-between gap-3 border-b border-border px-5 py-5 sm:px-6">
<div>
<div className="flex items-center gap-2">
<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FCEFEA] text-[#D58A68]">
<ShoppingBag size={16} />
</div>
<p className="text-[11px] font-semibold text-muted">
Recent orders
</p>
</div>

      <h2 className="mt-3 font-heading text-[17px] font-extrabold tracking-[-0.5px] text-foreground">
        Latest transactions
      </h2>
    </div>

    <span className="rounded-lg bg-background px-3 py-2 text-[9px] font-semibold text-muted">
      {orders.length} orders
    </span>
  </div>

  {/* Desktop table */}
  <div className="hidden overflow-x-auto md:block">
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-border bg-background/60">
          <th className="px-6 py-3 text-[9px] font-semibold uppercase tracking-wider text-muted">
            Order
          </th>
          <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-wider text-muted">
            Customer
          </th>
          <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-wider text-muted">
            Date
          </th>
          <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-wider text-muted">
            Amount
          </th>
          <th className="px-6 py-3 text-[9px] font-semibold uppercase tracking-wider text-muted">
            Status
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-border">
        {recentOrders.map((order) => (
          <tr
            key={order.id}
            className="transition-colors hover:bg-background/70"
          >
            <td className="whitespace-nowrap px-6 py-4 text-[10px] font-bold text-foreground">
              #{order.id}
            </td>

            <td className="px-4 py-4">
              <div className="flex min-w-[130px] items-center gap-2.5">
                <img
                  src={order.customerAvatar}
                  alt={order.customerName}
                  loading="lazy"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold text-foreground">
                    {order.customerName}
                  </p>
                  <p className="mt-0.5 truncate text-[9px] text-muted">
                    {order.customerEmail}
                  </p>
                </div>
              </div>
            </td>

            <td className="whitespace-nowrap px-4 py-4 text-[10px] text-muted">
              {formatDate(order.date)}
            </td>

            <td className="whitespace-nowrap px-4 py-4 text-[10px] font-bold text-foreground">
              {formatCurrency(order.total)}
            </td>

            <td className="whitespace-nowrap px-6 py-4">
              <span
                className={`inline-flex rounded-md px-2.5 py-1.5 text-[9px] font-semibold ${statusStyles[order.status]}`}
              >
                {order.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile order cards */}
  <div className="divide-y divide-border md:hidden">
    {recentOrders.map((order) => (
      <div key={order.id} className="flex items-center gap-3 px-5 py-4">
        <img
          src={order.customerAvatar}
          alt={order.customerName}
          loading="lazy"
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-semibold text-foreground">
            {order.customerName}
          </p>
          <p className="mt-1 text-[9px] text-muted">
            #{order.id} · {formatDate(order.date)}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[10px] font-bold text-foreground">
            {formatCurrency(order.total)}
          </p>
          <span
            className={`mt-1 inline-flex rounded-md px-2 py-1 text-[8px] font-semibold ${statusStyles[order.status]}`}
          >
            {order.status}
          </span>
        </div>
      </div>
    ))}
  </div>

  <div className="border-t border-border px-5 py-3.5 sm:px-6">
    <a
      href="/orders"
      className="inline-flex items-center gap-2 text-[10px] font-semibold text-foreground transition-colors hover:text-[#729E35]"
    >
      View all orders
      <ArrowRight size={13} />
    </a>
  </div>
</section>

);
}

export default RecentOrders;