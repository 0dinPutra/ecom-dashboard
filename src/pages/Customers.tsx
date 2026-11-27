import { useMemo, useState } from 'react';

import {
  ArrowDownToLine,
  Users,
  UserCheck,
  UserPlus,
  Wallet,
  Search,
  SlidersHorizontal,
  Eye,
  Mail,
  ShoppingBag,
} from 'lucide-react';

import CustomerStatusBadge from '../components/customers/CustomerStatusBadge';
import CustomerDetailsDialog from '../components/customers/CustomerDetailsDialog';

import { useDashboardStore } from '../store/dashboardStore';
import { downloadCsv, filterBySearch } from '../utils/helpers';
import {
  formatCurrency,
  formatDate,
  formatNumber,
} from '../utils/formatters';

import type { Customer, CustomerStatus } from '../types';

type CustomerFilter = 'All' | CustomerStatus;

function Customers() {
  const customers = useDashboardStore((state) => state.customers);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] =
    useState<CustomerFilter>('All');
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const filteredCustomers = useMemo(() => {
    let result = filterBySearch(
      customers,
      searchTerm,
      (customer) =>
        `${customer.name} ${customer.email} ${customer.phone} ${customer.location}`.toLowerCase(),
    );

    if (selectedStatus !== 'All') {
      result = result.filter(
        (customer) => customer.status === selectedStatus,
      );
    }

    return [...result].sort(
      (a, b) => b.totalSpent - a.totalSpent,
    );
  }, [customers, searchTerm, selectedStatus]);

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === 'Active',
  ).length;

  const newCustomers = customers.filter(
    (customer) => customer.status === 'New',
  ).length;

  const totalRevenue = customers.reduce(
    (total, customer) => total + customer.totalSpent,
    0,
  );

  const totalOrders = customers.reduce(
    (total, customer) => total + customer.orders,
    0,
  );

  const averageCustomerValue =
    totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

  const summaryCards = [
    {
      label: 'Total customers',
      value: formatNumber(totalCustomers),
      icon: Users,
      style: 'bg-[#EEF0FA] text-[#747CC2]',
    },
    {
      label: 'Active customers',
      value: formatNumber(activeCustomers),
      icon: UserCheck,
      style: 'bg-[#EEF5E5] text-[#719B3D]',
    },
    {
      label: 'New customers',
      value: formatNumber(newCustomers),
      icon: UserPlus,
      style: 'bg-[#EAF3F2] text-[#4C9186]',
    },
    {
      label: 'Average customer value',
      value: formatCurrency(averageCustomerValue),
      icon: Wallet,
      style: 'bg-[#FFF4E5] text-[#C48B35]',
    },
  ];

  const handleExport = () => {
    const rows = filteredCustomers.map((customer) => ({
      Name: customer.name,
      Email: customer.email,
      Phone: customer.phone,
      Location: customer.location,
      Orders: customer.orders,
      TotalSpent: customer.totalSpent,
      LastOrder: customer.lastOrder,
      JoinedAt: customer.joinedAt,
      Status: customer.status,
    }));

    downloadCsv('customers-report.csv', rows);
  };

  const statusOptions: CustomerFilter[] = [
    'All',
    'Active',
    'New',
    'Inactive',
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#DDEBCB] bg-[#F0F7E8] px-3 py-1.5">
            <Users size={12} className="text-[#719B3D]" />
            <span className="text-[9px] font-bold uppercase tracking-[1px] text-[#668A3B]">
              Customer relationships
            </span>
          </div>

          <h2 className="font-heading text-[26px] font-extrabold tracking-[-1px] text-foreground sm:text-[31px]">
            Customers
          </h2>

          <p className="mt-2 text-[11px] text-muted">
            Understand your customers and build stronger relationships.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-border bg-white px-3.5 py-3 text-[10px] font-semibold text-foreground hover:bg-[#F7F8F6] sm:self-auto"
        >
          <ArrowDownToLine size={14} />
          Export customers
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

      {/* Customer insights */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="dashboard-card flex items-center justify-between gap-4 p-5">
          <div>
            <p className="text-[9px] font-medium text-muted">
              Customer lifetime spending
            </p>
            <h3 className="mt-2 font-heading text-[24px] font-extrabold tracking-[-0.8px] text-foreground">
              {formatCurrency(totalRevenue)}
            </h3>
            <p className="mt-1 text-[9px] text-muted">
              Combined spending across customer profiles
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF5E5] text-[#719B3D]">
            <Wallet size={19} />
          </div>
        </div>

        <div className="dashboard-card flex items-center justify-between gap-4 p-5">
          <div>
            <p className="text-[9px] font-medium text-muted">
              Total customer orders
            </p>
            <h3 className="mt-2 font-heading text-[24px] font-extrabold tracking-[-0.8px] text-foreground">
              {formatNumber(totalOrders)}
            </h3>
            <p className="mt-1 text-[9px] text-muted">
              {formatNumber(customers.length)} customer profiles in your store
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF0FA] text-[#747CC2]">
            <ShoppingBag size={19} />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="dashboard-card p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-muted" />
          <h3 className="text-[11px] font-bold text-foreground">
            Find a customer
          </h3>
          <span className="ml-auto text-[9px] text-muted">
            {filteredCustomers.length} results
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
              placeholder="Search name, email, phone, location..."
              className="h-11 w-full rounded-xl border border-border bg-[#FAFBF9] pl-10 pr-3 text-[10px] outline-none focus:border-[#B5D88B] focus:bg-white"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(event.target.value as CustomerFilter)
            }
            className="h-11 w-full rounded-xl border border-border bg-[#FAFBF9] px-3 text-[10px] font-medium text-foreground outline-none focus:border-[#B5D88B]"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === 'All' ? 'All customer statuses' : status}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Customer directory */}
      <section className="dashboard-card min-w-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h3 className="font-heading text-[13px] font-bold text-foreground">
              Customer directory
            </h3>
            <p className="mt-1 text-[9px] text-muted">
              Your customer profiles and purchase history
            </p>
          </div>

          <span className="rounded-lg bg-[#F3F4F0] px-2.5 py-1.5 text-[9px] font-semibold text-muted">
            {filteredCustomers.length} customers
          </span>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F3EF] text-muted">
              <Users size={23} />
            </div>

            <h3 className="mt-4 font-heading text-[14px] font-bold text-foreground">
              No customers found
            </h3>

            <p className="mt-2 text-[10px] text-muted">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-[#FAFBF9]">
                  {[
                    'Customer',
                    'Location',
                    'Orders',
                    'Total spent',
                    'Last order',
                    'Status',
                    'Profile',
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
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-border last:border-0 hover:bg-[#FAFBF9]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          loading="lazy"
                          className="h-9 w-9 rounded-full border border-border object-cover"
                        />

                        <div className="min-w-0">
                          <p className="max-w-[160px] truncate text-[10px] font-semibold text-foreground">
                            {customer.name}
                          </p>

                          <p className="mt-1 flex max-w-[160px] items-center gap-1 truncate text-[8px] text-muted">
                            <Mail size={10} className="shrink-0" />
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-[9px] text-muted">
                      {customer.location}
                    </td>

                    <td className="px-4 py-4 text-[10px] font-semibold text-foreground">
                      {formatNumber(customer.orders)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-[10px] font-bold text-foreground">
                      {formatCurrency(customer.totalSpent)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-[9px] text-muted">
                      {formatDate(customer.lastOrder)}
                    </td>

                    <td className="px-4 py-4">
                      <CustomerStatusBadge status={customer.status} />
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(customer)}
                        aria-label={`View ${customer.name}`}
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
            Showing {filteredCustomers.length} of {customers.length} customers
          </p>
        </div>
      </section>

      <p className="px-1 text-[9px] text-muted">
        Customer information is sample data for this frontend demo.
      </p>

      <CustomerDetailsDialog
        customer={
          selectedCustomer
            ? customers.find(
                (customer) => customer.id === selectedCustomer.id,
              ) ?? null
            : null
        }
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}

export default Customers;