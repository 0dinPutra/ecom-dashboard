import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowDownToLine,
  Boxes,
  CircleDollarSign,
  Package,
  Search,
  TrendingDown,
} from 'lucide-react';

import InventoryTable from '../components/inventory/InventoryTable';
import { useDashboardStore } from '../store/dashboardStore';
import type { StockStatus } from '../types';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { downloadCsv, getStockStatus } from '../utils/helpers';

type StockFilter = 'All' | StockStatus;

const stockFilters: StockFilter[] = [
  'All',
  'In stock',
  'Low stock',
  'Out of stock',
];

function Inventory() {
  const products = useDashboardStore((state) => state.products);
  const updateProduct = useDashboardStore((state) => state.updateProduct);

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<StockFilter>('All');

  const inventoryStats = useMemo(() => {
    const totalUnits = products.reduce(
      (total, product) => total + product.stock,
      0,
    );

    const lowStock = products.filter(
      (product) => getStockStatus(product.stock, 10) === 'Low stock',
    ).length;

    const outOfStock = products.filter(
      (product) => product.stock === 0,
    ).length;

    const inventoryValue = products.reduce(
      (total, product) => total + product.stock * product.cost,
      0,
    );

    return {
      totalProducts: products.length,
      totalUnits,
      lowStock,
      outOfStock,
      inventoryValue,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesStatus =
        activeFilter === 'All' ||
        getStockStatus(product.stock, 10) === activeFilter;

      return matchesSearch && matchesStatus;
    });
  }, [products, search, activeFilter]);

  const handleAdjustStock = (
    product: (typeof products)[number],
    adjustment: number,
  ) => {
    updateProduct(product.id, {
      stock: Math.max(0, product.stock + adjustment),
    });
  };

  const handleExport = () => {
    downloadCsv(
      'inventory-report',
      filteredProducts.map((product) => ({
        Product: product.name,
        SKU: product.sku,
        Category: product.category,
        Available: product.stock,
        'Reorder Level': 10,
        'Stock Status': getStockStatus(product.stock, 10),
        'Unit Cost': product.cost,
        'Stock Value': product.stock * product.cost,
      })),
    );
  };

  const summaryCards = [
    {
      label: 'Total products',
      value: formatNumber(inventoryStats.totalProducts),
      helper: 'Products tracked',
      icon: Package,
      iconClass: 'bg-[#f0f3ed] text-[#697765]',
    },
    {
      label: 'Total units',
      value: formatNumber(inventoryStats.totalUnits),
      helper: 'Units available',
      icon: Boxes,
      iconClass: 'bg-[#edf5e4] text-[#719a48]',
    },
    {
      label: 'Low stock alerts',
      value: formatNumber(inventoryStats.lowStock),
      helper: 'Need replenishment',
      icon: AlertTriangle,
      iconClass: 'bg-[#fff4e3] text-[#d39a3e]',
    },
    {
      label: 'Out of stock',
      value: formatNumber(inventoryStats.outOfStock),
      helper: 'Currently unavailable',
      icon: TrendingDown,
      iconClass: 'bg-[#fff0ef] text-[#d66c65]',
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8b9385]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a8d94e]" />
            Store management
          </div>
          <h1 className="font-heading text-2xl font-extrabold tracking-tight text-[#20241f] sm:text-[30px]">
            Inventory
          </h1>
          <p className="mt-1.5 text-sm text-[#858b82]">
            Keep track of your stock levels and stay ahead of replenishment.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          disabled={filteredProducts.length === 0}
          className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-[#e3e8de] bg-white px-4 text-sm font-semibold text-[#4d5848] shadow-sm hover:border-[#cbd7bd] hover:bg-[#f8faf5] disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
        >
          <ArrowDownToLine size={16} />
          Export report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="dashboard-card flex items-center gap-4 p-5"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
              >
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#858b82]">
                  {card.label}
                </p>
                <p className="mt-1 font-heading text-[23px] font-extrabold leading-tight text-[#252a23]">
                  {card.value}
                </p>
                <p className="mt-1 text-[11px] text-[#a0a69d]">
                  {card.helper}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="dashboard-card flex items-center gap-4 p-5 sm:p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5e9] text-[#719a48]">
            <CircleDollarSign size={23} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#858b82]">
              Total inventory cost value
            </p>
            <p className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-[#252a23]">
              {formatCurrency(inventoryStats.inventoryValue)}
            </p>
            <p className="mt-1 text-xs text-[#92988e]">
              Based on current available units and product cost.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#e9e5d8] bg-[#fbfaf5] p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5edda] text-[#b58b42]">
            <AlertTriangle size={19} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#514a39]">
              Stock health check
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#8d826b]">
              {inventoryStats.lowStock + inventoryStats.outOfStock > 0
                ? `${inventoryStats.lowStock + inventoryStats.outOfStock} products need your attention. Review low and unavailable stock below.`
                : 'All products are currently above the low-stock threshold.'}
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-[340px]">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aa196]"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search product, SKU or category..."
              className="h-11 w-full rounded-xl border border-[#e9ece6] bg-[#fafbf9] pl-10 pr-4 text-sm outline-none transition-all placeholder:text-[#a0a69d] focus:border-[#b9d58f] focus:bg-white focus:ring-2 focus:ring-[#c5f36b]/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {stockFilters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#202820] text-white shadow-sm'
                      : 'border border-[#e9ece6] bg-white text-[#777f73] hover:bg-[#f5f7f2]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <InventoryTable
        products={filteredProducts}
        onAdjustStock={handleAdjustStock}
      />
    </div>
  );
}

export default Inventory;