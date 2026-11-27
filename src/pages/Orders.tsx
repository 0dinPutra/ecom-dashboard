import { useMemo, useState } from 'react';

import {
  ArrowDownToLine,
  CalendarDays,
  Search,
  ShoppingBag,
  Wallet,
  Clock3,
  PackageCheck,
  SlidersHorizontal,
  Eye,
} from 'lucide-react';

import OrderStatusBadge from '../components/orders/OrderStatusBadge';
import OrderDetailsDialog from '../components/orders/OrderDetailsDialog';

import { useDashboardStore } from '../store/dashboardStore';
import { downloadCsv, filterBySearch } from '../utils/helpers';
import { formatCurrency, formatDate, formatNumber, formatOrderId } from '../utils/formatters';

import type { Order, OrderStatus } from '../types';

type OrderFilter = 'All' | OrderStatus;

function Orders() {
  const orders = useDashboardStore((state) => state.orders);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<OrderFilter>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    let result = filterBySearch(
      orders,
      searchTerm,
      (order) =>
        `${order.id} ${order.customerName} ${order.customerEmail}`.toLowerCase(),
    );

    if (selectedStatus !== 'All') {
      result = result.filter((order) => order.status === selectedStatus);
    }

    return [...result].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [orders, searchTerm, selectedStatus]);

  const totalRevenue = orders.reduce(
    (total, order) =>
      order.paymentStatus === 'Paid' ? total + order.total : total,
    0,
  );

  const pendingOrders = orders.filter(
    (order) => order.status === 'Pending',
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === 'Processing',
  ).length;

  const summaryCards = [
    {
      label: 'Total orders',
      value: formatNumber(orders.length),
      icon: ShoppingBag,
      style: 'bg-[#EEF0FA] text-[#747CC2]',
    },
    {
      label: 'Paid revenue',
      value: formatCurrency(totalRevenue),
      icon: Wallet,
      style: 'bg-[#EEF5E5] text-[#719B3D]',
    },
    {
      label: 'Pending orders',
      value: formatNumber(pendingOrders),
      icon: Clock3,
      style: 'bg-[#FFF4E5] text-[#C48B35]',
    },
    {
      label: 'Processing',
      value: formatNumber(processingOrders),
      icon: PackageCheck,
      style: 'bg-[#EAF3F2] text-[#4C9186]',
    },
  ];

  const handleExport = () => {
    const rows = filteredOrders.map((order) => ({
      Order: order.id,
      Customer: order.customerName,
      Email: order.customerEmail,
      Date: order.date,
      Items: order.itemCount,
      Total: order.total,
      Status: order.status,
      Payment: order.paymentStatus,
      Method: order.paymentMethod,
    }));

    downloadCsv('orders-report.csv', rows);
  };

  const statusOptions: OrderFilter[] = [
    'All',
    'Pending',
    'Processing',
    'Shipped',
    'Completed',
    'Cancelled',
    'Refunded',
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#DDEBCB] bg-[#F0F7E8] px-3 py-1.5">
            <ShoppingBag size={12} className="text-[#719B3D]" />
            <span className="text-[9px] font-bold uppercase tracking-[1px] text-[#668A3B]">
              Order management
            </span>
          </div>

          <h2 className="font-heading text-[26px] font-extrabold tracking-[-1px] text-foreground sm:text-[31px]">
            Orders
          </h2>

          <p className="mt-2 text-[11px] text-muted">
            Track orders, review payments, and manage fulfilment.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-border bg-white px-3.5 py-3 text-[10px] font-semibold text-foreground hover:bg-[#F7F8F6] sm:self-auto"
        >
          <ArrowDownToLine size={14} />
          Export orders
        </button>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="dashboard-card flex min-w-0 items-center gap-3 p-4 sm:p-5"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.style}`}
              >
                <Icon size={17} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[9px] font-medium text-muted">
                  {card.label}
                </p>
                <h3 className="mt-1 truncate font-heading text-[19px] font-extrabold tracking-[-0.6px] text-foreground sm:text-[21px]">
                  {card.value}
                </h3>
              </div>
            </div>
          );
        })}
      </section>

      {/* Filters */}
      <section className="dashboard-card p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-muted" />
          <h3 className="text-[11px] font-bold text-foreground">
            Find an order
          </h3>
          <span className="ml-auto text-[9px] text-muted">
            {filteredOrders.length} results
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search order ID, customer, email..."
              className="h-11 w-full rounded-xl border border-border bg-[#FAFBF9] pl-10 pr-3 text-[10px] outline-none focus:border-[#B5D88B] focus:bg-white"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(event.target.value as OrderFilter)
            }
            className="h-11 w-full rounded-xl border border-border bg-[#FAFBF9] px-3 text-[10px] font-medium text-foreground outline-none focus:border-[#B5D88B]"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === 'All' ? 'All order statuses' : status}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Orders table */}
      <section className="dashboard-card min-w-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h3 className="font-heading text-[13px] font-bold text-foreground">
              All orders
            </h3>
            <p className="mt-1 text-[9px] text-muted">
              Review and manage customer purchases
            </p>
          </div>

          <span className="rounded-lg bg-[#F3F4F0] px-2.5 py-1.5 text-[9px] font-semibold text-muted">
            {filteredOrders.length} orders
          </span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F3EF] text-muted">
              <ShoppingBag size={23} />
            </div>

            <h3 className="mt-4 font-heading text-[14px] font-bold text-foreground">
              No orders found
            </h3>

            <p className="mt-2 text-[10px] text-muted">
              Try adjusting your search or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-[#FAFBF9]">
                  {[
                    'Order',
                    'Customer',
                    'Date',
                    'Items',
                    'Total',
                    'Order status',
                    'Payment',
                    'Details',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.7px] text-muted first:pl-5 last:pr-5"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-[#FAFBF9]"
                  >
                    <td className="whitespace-nowrap px-5 py-4">
                      <p className="text-[10px] font-bold text-foreground">
                        {formatOrderId(order.id)}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={order.customerAvatar}
                          alt={order.customerName}
                          loading="lazy"
                          className="h-8 w-8 rounded-full border border-border object-cover"
                        />

                        <div className="min-w-0">
                          <p className="max-w-[130px] truncate text-[10px] font-semibold text-foreground">
                            {order.customerName}
                          </p>
                          <p className="mt-1 max-w-[130px] truncate text-[8px] text-muted">
                            {order.customerEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center gap-1.5 text-[9px] text-muted">
                        <CalendarDays size={12} />
                        {formatDate(order.date)}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-[10px] text-muted">
                      {order.itemCount}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-[10px] font-bold text-foreground">
                      {formatCurrency(order.total)}
                    </td>

                    <td className="px-4 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>

                    <td className="px-4 py-4">
                      <OrderStatusBadge
                        status={order.paymentStatus}
                        type="payment"
                      />
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        aria-label={`View ${formatOrderId(order.id)}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-2 text-[9px] font-semibold text-foreground hover:border-[#DDEBCB] hover:bg-[#F0F7E8] hover:text-[#668A3B]"
                      >
                        <Eye size={12} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="border-t border-border px-5 py-3">
          <p className="text-[9px] text-muted">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        </div>
      </section>

      <p className="px-1 text-[9px] text-muted">
        Order information is sample data for this frontend demo.
      </p>

      <OrderDetailsDialog
        order={
          selectedOrder
            ? orders.find((order) => order.id === selectedOrder.id) ?? null
            : null
        }
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

export default Orders;