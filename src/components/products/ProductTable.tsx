import { MoreHorizontal, Package, Trash2 } from 'lucide-react';

import ProductStatusBadge from './ProductStatusBadge';

import { formatCurrency, formatNumber } from '../../utils/formatters';
import { useDashboardStore } from '../../store/dashboardStore';

import type { Product } from '../../types';

interface ProductTableProps {
  products: Product[];
}

function ProductTable({ products }: ProductTableProps) {
  const updateProduct = useDashboardStore((state) => state.updateProduct);
  const deleteProduct = useDashboardStore((state) => state.deleteProduct);

  const handleStatusChange = (product: Product) => {
    const nextStatus = product.status === 'Active' ? 'Draft' : 'Active';

    updateProduct(product.id, { status: nextStatus });
  };

  const handleDelete = (product: Product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );

    if (confirmed) {
      deleteProduct(product.id);
    }
  };

  if (products.length === 0) {
    return (
      <div className="dashboard-card flex flex-col items-center justify-center px-5 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F3EF] text-muted">
          <Package size={23} />
        </div>

        <h3 className="mt-4 font-heading text-[14px] font-bold text-foreground">
          No products found
        </h3>

        <p className="mt-2 max-w-[280px] text-[10px] leading-relaxed text-muted">
          Try changing your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-card min-w-0 overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="font-heading text-[13px] font-bold text-foreground">
            All products
          </h3>
          <p className="mt-1 text-[9px] text-muted">
            {products.length} products displayed
          </p>
        </div>

        <span className="rounded-lg bg-[#F3F4F0] px-2.5 py-1.5 text-[9px] font-semibold text-muted">
          Product catalogue
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-[#FAFBF9]">
              <th className="px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.7px] text-muted">
                Product
              </th>
              <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.7px] text-muted">
                Category
              </th>
              <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.7px] text-muted">
                Price
              </th>
              <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.7px] text-muted">
                Stock
              </th>
              <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.7px] text-muted">
                Sold
              </th>
              <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.7px] text-muted">
                Status
              </th>
              <th className="px-5 py-3 text-right text-[9px] font-semibold uppercase tracking-[0.7px] text-muted">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-border last:border-0 hover:bg-[#FAFBF9]"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-10 w-10 rounded-xl border border-border bg-[#F5F6F3] object-cover"
                    />

                    <div className="min-w-0">
                      <p className="max-w-[190px] truncate text-[10px] font-semibold text-foreground">
                        {product.name}
                      </p>
                      <p className="mt-1 text-[9px] text-muted">
                        {product.sku}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3.5 text-[10px] text-muted">
                  {product.category}
                </td>

                <td className="px-4 py-3.5 text-[10px] font-semibold text-foreground">
                  {formatCurrency(product.price)}
                </td>

                <td className="px-4 py-3.5">
                  <span
                    className={`text-[10px] font-semibold ${
                      product.stock <= 0
                        ? 'text-[#D36D65]'
                        : product.stock <= 10
                          ? 'text-[#C18A3E]'
                          : 'text-foreground'
                    }`}
                  >
                    {formatNumber(product.stock)}
                  </span>
                  <p className="mt-1 text-[8px] text-muted">units</p>
                </td>

                <td className="px-4 py-3.5 text-[10px] text-muted">
                  {formatNumber(product.sold)}
                </td>

                <td className="px-4 py-3.5">
                  <ProductStatusBadge status={product.status} />
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(product)}
                      title={
                        product.status === 'Active'
                          ? 'Move to draft'
                          : 'Activate product'
                      }
                      disabled={product.status === 'Archived'}
                      className="rounded-lg p-2 text-muted hover:bg-[#F0F7E8] hover:text-[#668A3B] disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      title="Delete product"
                      className="rounded-lg p-2 text-muted hover:bg-[#FCEFED] hover:text-[#D36D65]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border px-5 py-3">
        <p className="text-[9px] text-muted">
          Showing {products.length} matching products
        </p>
      </div>
    </div>
  );
}

export default ProductTable;