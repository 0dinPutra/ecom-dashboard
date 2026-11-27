import { ArrowUpRight, Package } from 'lucide-react';

import { topProducts } from '../../data/dashboardData';
import { formatCurrency, formatNumber } from '../../utils/formatters';

function TopProducts() {
return (
<section className="dashboard-card min-w-0 overflow-hidden">
<div className="flex items-center justify-between gap-3 border-b border-border px-5 py-5 sm:px-6">
<div>
<div className="flex items-center gap-2">
<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF5E5] text-[#628B35]">
<Package size={16} />
</div>
<p className="text-[11px] font-semibold text-muted">
Top products
</p>
</div>

      <h2 className="mt-3 font-heading text-[17px] font-extrabold tracking-[-0.5px] text-foreground">
        Best sellers
      </h2>
    </div>

    <span className="rounded-lg bg-background px-3 py-2 text-[9px] font-semibold text-muted">
      By revenue
    </span>
  </div>

  <div className="divide-y divide-border">
    {topProducts.map((product, index) => (
      <div
        key={product.id}
        className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-background/70 sm:px-6"
      >
        <span className="w-4 shrink-0 text-[10px] font-bold text-muted/60">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-background">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold text-foreground">
            {product.name}
          </p>
          <p className="mt-1 truncate text-[9px] text-muted">
            {product.category}
          </p>

          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
            <div
              className="h-full rounded-full bg-[#B6E66A] transition-all duration-500"
              style={{
                width: `${Math.min(Math.max(product.percentage, 0), 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[11px] font-bold text-foreground">
            {formatCurrency(product.revenue)}
          </p>
          <p className="mt-1 text-[9px] text-muted">
            {formatNumber(product.unitsSold)} sold
          </p>
        </div>

        <ArrowUpRight
          size={14}
          className="hidden shrink-0 text-muted/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block"
        />
      </div>
    ))}
  </div>

  <div className="border-t border-border px-5 py-3.5 sm:px-6">
    <p className="text-[9px] text-muted">
      Product performance · Sample dashboard data
    </p>
  </div>
</section>

);
}

export default TopProducts;