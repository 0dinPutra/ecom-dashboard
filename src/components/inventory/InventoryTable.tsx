import { Minus, Package, Plus } from 'lucide-react';
import type { Product } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { getStockStatus } from '../../utils/helpers';
import StockStatusBadge from './StockStatusBadge';

interface InventoryTableProps {
  products: Product[];
  onAdjustStock: (product: Product, adjustment: number) => void;
}

function InventoryTable({ products, onAdjustStock }: InventoryTableProps) {
  if (products.length === 0) {
    return (
      <div className="dashboard-card flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f3ef] text-[#858b82]">
          <Package size={25} />
        </div>
        <h3 className="font-heading text-base font-bold text-[#20241f]">
          No inventory found
        </h3>
        <p className="mt-1.5 max-w-xs text-sm text-[#858b82]">
          Try changing your search or stock status filter to find products.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e9ece6] px-5 py-4 sm:px-6">
        <div>
          <h3 className="font-heading text-base font-bold text-[#20241f]">
            Stock overview
          </h3>
          <p className="mt-0.5 text-xs text-[#858b82]">
            Monitor and adjust your product inventory
          </p>
        </div>
        <span className="rounded-full bg-[#f1f3ef] px-3 py-1 text-xs font-semibold text-[#687064]">
          {products.length} products
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="bg-[#fafbf9] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#92988e]">
              <th className="px-6 py-3.5">Product</th>
              <th className="px-4 py-3.5">Category</th>
              <th className="px-4 py-3.5">Available</th>
              <th className="px-4 py-3.5">Stock value</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Adjust stock</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eef0eb]">
            {products.map((product) => {
              const status = getStockStatus(product.stock, 10);
              const stockValue = product.stock * product.cost;

              return (
                <tr
                  key={product.id}
                  className="group transition-colors hover:bg-[#fafbf8]"
                >
                  <td className="px-6 py-4">
                    <div className="flex min-w-[220px] items-center gap-3">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#edf0e9] bg-[#f4f5f1]">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#292e27]">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-[#92988e]">
                          {product.sku}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-[#737b70]">
                    {product.category}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`font-heading text-sm font-bold ${
                        product.stock <= 10
                          ? 'text-[#d18c32]'
                          : 'text-[#292e27]'
                      }`}
                    >
                      {formatNumber(product.stock)}
                    </span>
                    <span className="ml-1 text-xs text-[#a0a69d]">units</span>
                  </td>

                  <td className="px-4 py-4 text-sm font-medium text-[#555e52]">
                    {formatCurrency(stockValue)}
                  </td>

                  <td className="px-4 py-4">
                    <StockStatusBadge status={status} />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        title="Remove 1 unit"
                        aria-label={`Remove one unit from ${product.name}`}
                        disabled={product.stock <= 0}
                        onClick={() => onAdjustStock(product, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e7eae3] text-[#737b70] hover:border-[#d8ddd2] hover:bg-[#f1f3ef] disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        <Minus size={14} />
                      </button>

                      <button
                        type="button"
                        title="Add 1 unit"
                        aria-label={`Add one unit to ${product.name}`}
                        onClick={() => onAdjustStock(product, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#dce8cb] bg-[#f3f8eb] text-[#628c38] hover:border-[#b9d58f] hover:bg-[#eaf4dd]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e9ece6] px-6 py-3.5">
        <p className="text-xs text-[#92988e]">
          Stock adjustments update your product inventory immediately.
        </p>
        <div className="flex items-center gap-4 text-xs text-[#858b82]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#83b95c]" />
            Healthy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#e7ad53]" />
            Attention
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#df7770]" />
            Empty
          </span>
        </div>
      </div>
    </div>
  );
}

export default InventoryTable;