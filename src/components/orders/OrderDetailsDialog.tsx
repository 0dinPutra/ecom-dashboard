import {
  X,
  MapPin,
  CreditCard,
  Package,
  CalendarDays,
  UserRound,
} from 'lucide-react';

import OrderStatusBadge from './OrderStatusBadge';

import { useDashboardStore } from '../../store/dashboardStore';
import {
  formatCurrency,
  formatDate,
  formatOrderId,
} from '../../utils/formatters';

import type { Order, OrderStatus, PaymentStatus } from '../../types';

interface OrderDetailsDialogProps {
  order: Order | null;
  onClose: () => void;
}

const orderStatuses: OrderStatus[] = [
  'Pending',
  'Processing',
  'Shipped',
  'Completed',
  'Cancelled',
  'Refunded',
];

const paymentStatuses: PaymentStatus[] = [
  'Pending',
  'Paid',
  'Failed',
  'Refunded',
];

function OrderDetailsDialog({
  order,
  onClose,
}: OrderDetailsDialogProps) {
  const updateOrderStatus = useDashboardStore(
    (state) => state.updateOrderStatus,
  );
  const updatePaymentStatus = useDashboardStore(
    (state) => state.updatePaymentStatus,
  );

  if (!order) return null;

  const subtotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171B18]/45 p-3 backdrop-blur-[3px] sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-dialog-title"
        className="max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-2xl border border-border bg-white shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[1px] text-muted">
              Order details
            </p>
            <h2
              id="order-dialog-title"
              className="mt-1 font-heading text-[18px] font-extrabold text-foreground"
            >
              {formatOrderId(order.id)}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close order details"
            className="rounded-xl border border-border p-2 text-muted hover:bg-[#F3F4F0] hover:text-foreground"
          >
            <X size={17} />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* Customer information */}
          <div className="rounded-xl border border-border bg-[#FAFBF9] p-4">
            <div className="mb-3 flex items-center gap-2">
              <UserRound size={14} className="text-muted" />
              <h3 className="text-[10px] font-bold text-foreground">
                Customer information
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={order.customerAvatar}
                alt={order.customerName}
                className="h-10 w-10 rounded-full border border-border object-cover"
              />

              <div className="min-w-0">
                <p className="text-[11px] font-bold text-foreground">
                  {order.customerName}
                </p>
                <p className="mt-1 break-all text-[9px] text-muted">
                  {order.customerEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Order metadata */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 text-muted">
                <CalendarDays size={13} />
                <span className="text-[9px] font-medium">Order date</span>
              </div>
              <p className="mt-2 text-[10px] font-semibold text-foreground">
                {formatDate(order.date)}
              </p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 text-muted">
                <CreditCard size={13} />
                <span className="text-[9px] font-medium">Payment method</span>
              </div>
              <p className="mt-2 text-[10px] font-semibold text-foreground">
                {order.paymentMethod}
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Package size={14} className="text-muted" />
              <h3 className="text-[10px] font-bold text-foreground">
                Ordered items ({order.itemCount})
              </h3>
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              {order.items.map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex items-center gap-3 border-b border-border px-3 py-3 last:border-0"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="h-11 w-11 rounded-lg border border-border object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F1F3EF] text-muted">
                      <Package size={16} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-foreground">
                      {item.productName}
                    </p>
                    <p className="mt-1 text-[9px] text-muted">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-[10px] font-semibold text-foreground">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-xl border border-border p-4">
            <div className="mb-2 flex items-center gap-2">
              <MapPin size={14} className="text-muted" />
              <h3 className="text-[10px] font-bold text-foreground">
                Shipping address
              </h3>
            </div>

            <p className="text-[10px] leading-relaxed text-muted">
              {order.shippingAddress}
            </p>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between rounded-xl bg-sidebar px-4 py-4 text-white">
            <div>
              <p className="text-[9px] text-white/60">Order total</p>
              <p className="mt-1 text-[9px] text-white/50">
                Items subtotal: {formatCurrency(subtotal)}
              </p>
            </div>

            <p className="font-heading text-[20px] font-extrabold">
              {formatCurrency(order.total)}
            </p>
          </div>

          {/* Status management */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[9px] font-semibold text-muted">
                Order status
              </span>

              <select
                value={order.status}
                onChange={(event) =>
                  updateOrderStatus(
                    order.id,
                    event.target.value as OrderStatus,
                  )
                }
                className="h-11 w-full rounded-xl border border-border bg-white px-3 text-[10px] font-semibold text-foreground outline-none focus:border-[#B5D88B]"
              >
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <div className="mt-2">
                <OrderStatusBadge status={order.status} />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-[9px] font-semibold text-muted">
                Payment status
              </span>

              <select
                value={order.paymentStatus}
                onChange={(event) =>
                  updatePaymentStatus(
                    order.id,
                    event.target.value as PaymentStatus,
                  )
                }
                className="h-11 w-full rounded-xl border border-border bg-white px-3 text-[10px] font-semibold text-foreground outline-none focus:border-[#B5D88B]"
              >
                {paymentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <div className="mt-2">
                <OrderStatusBadge
                  status={order.paymentStatus}
                  type="payment"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="border-t border-border px-5 py-4 text-right sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-sidebar px-5 py-2.5 text-[10px] font-semibold text-white hover:bg-[#303832]"
          >
            Done
          </button>
        </div>
      </section>
    </div>
  );
}

export default OrderDetailsDialog;