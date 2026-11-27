import { useMemo, useState } from 'react';

import {
  ArrowDownToLine,
  Plus,
  Search,
  SlidersHorizontal,
  Package,
  Layers3,
  AlertTriangle,
  Archive,
} from 'lucide-react';

import ProductTable from '../components/products/ProductTable';

import { useDashboardStore } from '../store/dashboardStore';
import { productsData, productCategories } from '../data/productsData';
import { downloadCsv, filterBySearch } from '../utils/helpers';
import { formatCurrency, formatNumber } from '../utils/formatters';

import type { Product, ProductStatus } from '../types';

type ProductFilter = 'All' | ProductStatus;

function Products() {
  const products = useDashboardStore((state) => state.products);
  const addProduct = useDashboardStore((state) => state.addProduct);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [selectedStatus, setSelectedStatus] = useState<ProductFilter>('All');

  const filteredProducts = useMemo(() => {
    let result = filterBySearch(
      products,
      searchTerm,
      (product) =>
        `${product.name} ${product.sku} ${product.category}`.toLowerCase(),
    );

    if (selectedCategory !== 'All categories') {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (selectedStatus !== 'All') {
      result = result.filter(
        (product) => product.status === selectedStatus,
      );
    }

    return result;
  }, [products, searchTerm, selectedCategory, selectedStatus]);

  const totalProducts = products.length;
  const activeProducts = products.filter(
    (product) => product.status === 'Active',
  ).length;
  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= 10,
  ).length;
  const archivedProducts = products.filter(
    (product) => product.status === 'Archived',
  ).length;

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: `PRD-${Date.now()}`,
      name: 'New demo product',
      sku: `SKU-${Date.now().toString().slice(-6)}`,
      category: 'Accessories',
      price: 1499,
      cost: 850,
      stock: 25,
      sold: 0,
      status: 'Draft',
      image:
        productsData[0]?.image ??
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      createdAt: new Date().toISOString(),
      description: 'New product added to the demo catalogue.',
    };

    addProduct(newProduct);
    setSearchTerm('');
    setSelectedCategory('All categories');
    setSelectedStatus('All');
  };

  const handleExport = () => {
    const rows = filteredProducts.map((product) => ({
      Name: product.name,
      SKU: product.sku,
      Category: product.category,
      Price: product.price,
      Cost: product.cost,
      Stock: product.stock,
      Sold: product.sold,
      Status: product.status,
    }));

    downloadCsv('products-catalogue.csv', rows);
  };

  const summaryCards = [
    {
      label: 'Total products',
      value: formatNumber(totalProducts),
      icon: Package,
      style: 'bg-[#EEF0FA] text-[#747CC2]',
    },
    {
      label: 'Active products',
      value: formatNumber(activeProducts),
      icon: Layers3,
      style: 'bg-[#EEF5E5] text-[#719B3D]',
    },
    {
      label: 'Low stock',
      value: formatNumber(lowStockProducts),
      icon: AlertTriangle,
      style: 'bg-[#FFF4E5] text-[#C48B35]',
    },
    {
      label: 'Archived',
      value: formatNumber(archivedProducts),
      icon: Archive,
      style: 'bg-[#F1F2F0] text-[#858B82]',
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#DDEBCB] bg-[#F0F7E8] px-3 py-1.5">
            <Package size={12} className="text-[#719B3D]" />
            <span className="text-[9px] font-bold uppercase tracking-[1px] text-[#668A3B]">
              Store catalogue
            </span>
          </div>

          <h2 className="font-heading text-[26px] font-extrabold tracking-[-1px] text-foreground sm:text-[31px]">
            Products
          </h2>

          <p className="mt-2 text-[11px] text-muted">
            Manage your catalogue, pricing, stock, and product visibility.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-3 text-[10px] font-semibold text-foreground hover:bg-[#F7F8F6]"
          >
            <ArrowDownToLine size={14} />
            Export
          </button>

          <button
            type="button"
            onClick={handleAddProduct}
            className="inline-flex items-center gap-2 rounded-xl bg-sidebar px-4 py-3 text-[10px] font-semibold text-white hover:bg-[#303832]"
          >
            <Plus size={14} />
            Add product
          </button>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="dashboard-card flex items-center gap-3 p-4 sm:p-5"
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
                <h3 className="mt-1 font-heading text-[21px] font-extrabold tracking-[-0.7px] text-foreground">
                  {card.value}
                </h3>
              </div>
            </div>
          );
        })}
      </section>

      {/* Catalogue filters */}
      <section className="dashboard-card p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-muted" />
          <h3 className="text-[11px] font-bold text-foreground">
            Find a product
          </h3>
          <span className="ml-auto text-[9px] text-muted">
            {filteredProducts.length} results
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative md:col-span-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, SKU, category..."
              className="h-11 w-full rounded-xl border border-border bg-[#FAFBF9] pl-10 pr-3 text-[10px] outline-none transition focus:border-[#B5D88B] focus:bg-white"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="h-11 w-full rounded-xl border border-border bg-[#FAFBF9] px-3 text-[10px] font-medium text-foreground outline-none focus:border-[#B5D88B]"
          >
            <option value="All categories">All categories</option>
            {productCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(event.target.value as ProductFilter)
            }
            className="h-11 w-full rounded-xl border border-border bg-[#FAFBF9] px-3 text-[10px] font-medium text-foreground outline-none focus:border-[#B5D88B]"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </section>

      {/* Product table */}
      <ProductTable products={filteredProducts} />

      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <p className="text-[9px] text-muted">
          Product prices shown in INR · Demo catalogue
        </p>

        <p className="text-[9px] font-medium text-muted">
          Catalogue value:{' '}
          <span className="text-foreground">
            {formatCurrency(
              products.reduce(
                (total, product) => total + product.price * product.stock,
                0,
              ),
            )}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Products;