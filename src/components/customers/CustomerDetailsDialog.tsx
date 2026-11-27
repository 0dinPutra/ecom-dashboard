import {
  X,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShoppingBag,
  Wallet,
  UserRound,
} from 'lucide-react';

import CustomerStatusBadge from './CustomerStatusBadge';

import {
  formatCurrency,
  formatDate,
  formatNumber,
} from '../../utils/formatters';

import type { Customer } from '../../types';

interface CustomerDetailsDialogProps {
  customer: Customer | null;
  onClose: () => void;
}

function CustomerDetailsDialog({
  customer,
  onClose,
}: CustomerDetailsDialogProps) {
  if (!customer) return null;

  const averageOrderValue =
    customer.orders > 0 ? customer.totalSpent / customer.orders : 0;

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
        aria-labelledby="customer-dialog-title"
        className="max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-2xl border border-border bg-white shadow-2xl"
      >
        {/* Dialog header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-white px-5 py-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[1px] text-muted">
              Customer profile
            </p>
            <h2
              id="customer-dialog-title"
              className="mt-1 font-heading text-[17px] font-extrabold text-foreground"
            >
              Customer details
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close customer details"
            className="rounded-xl border border-border p-2 text-muted hover:bg-[#F3F4F0] hover:text-foreground"
          >
            <X size={17} />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Profile */}
          <div className="flex flex-col items-center rounded-xl border border-border bg-[#FAFBF9] px-4 py-6 text-center">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="h-[76px] w-[76px] rounded-full border-4 border-white object-cover shadow-sm"
            />

            <h3 className="mt-3 font-heading text-[17px] font-extrabold text-foreground">
              {customer.name}
            </h3>

            <p className="mt-1 text-[10px] text-muted">
              Customer since {formatDate(customer.joinedAt)}
            </p>

            <div className="mt-3">
              <CustomerStatusBadge status={customer.status} />
            </div>
          </div>

          {/* Contact information */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <UserRound size={14} className="text-muted" />
              <h3 className="text-[10px] font-bold text-foreground">
                Contact information
              </h3>
            </div>

            <div className="space-y-3 rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <Mail size={14} className="shrink-0 text-muted" />
                <div className="min-w-0">
                  <p className="text-[8px] text-muted">Email address</p>
                  <p className="mt-0.5 break-all text-[10px] font-medium text-foreground">
                    {customer.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={14} className="shrink-0 text-muted" />
                <div>
                  <p className="text-[8px] text-muted">Phone number</p>
                  <p className="mt-0.5 text-[10px] font-medium text-foreground">
                    {customer.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={14} className="shrink-0 text-muted" />
                <div>
                  <p className="text-[8px] text-muted">Location</p>
                  <p className="mt-0.5 text-[10px] font-medium text-foreground">
                    {customer.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Spending overview */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Wallet size={14} className="text-muted" />
              <h3 className="text-[10px] font-bold text-foreground">
                Customer overview
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border p-4">
                <ShoppingBag size={15} className="text-[#747CC2]" />
                <p className="mt-3 text-[9px] text-muted">Total orders</p>
                <p className="mt-1 font-heading text-[20px] font-extrabold text-foreground">
                  {formatNumber(customer.orders)}
                </p>
              </div>

              <div className="rounded-xl border border-border p-4">
                <Wallet size={15} className="text-[#719B3D]" />
                <p className="mt-3 text-[9px] text-muted">Total spent</p>
                <p className="mt-1 font-heading text-[18px] font-extrabold text-foreground">
                  {formatCurrency(customer.totalSpent)}
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-border p-4">
              <p className="text-[9px] text-muted">Average order value</p>
              <p className="mt-1 font-heading text-[18px] font-extrabold text-foreground">
                {formatCurrency(averageOrderValue)}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-[#F7F8F6] p-3.5">
              <div className="flex items-center gap-2 text-muted">
                <CalendarDays size={13} />
                <span className="text-[9px]">Joined store</span>
              </div>
              <p className="mt-2 text-[10px] font-semibold text-foreground">
                {formatDate(customer.joinedAt)}
              </p>
            </div>

            <div className="rounded-xl bg-[#F7F8F6] p-3.5">
              <div className="flex items-center gap-2 text-muted">
                <ShoppingBag size={13} />
                <span className="text-[9px]">Last order</span>
              </div>
              <p className="mt-2 text-[10px] font-semibold text-foreground">
                {formatDate(customer.lastOrder)}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border px-5 py-4 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-sidebar px-5 py-2.5 text-[10px] font-semibold text-white hover:bg-[#303832]"
          >
            Close profile
          </button>
        </div>
      </section>
    </div>
  );
}

export default CustomerDetailsDialog;