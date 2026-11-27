import { motion } from 'motion/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  ShoppingBag,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

import type { DashboardStat } from '../../types';

interface StatCardProps {
  stat: DashboardStat;
  index?: number;
}

const iconMap: Record<string, LucideIcon> = {
  revenue: Wallet,
  orders: ShoppingBag,
  customers: Users,
  conversion: BarChart3,
};

const iconStyles: Record<string, string> = {
  revenue: 'bg-[#EEF5E5] text-[#628B35]',
  orders: 'bg-[#EEF0FA] text-[#747CC2]',
  customers: 'bg-[#FCEFEA] text-[#D58A68]',
  conversion: 'bg-[#EAF3F2] text-[#4C9186]',
};

function StatCard({ stat, index = 0 }: StatCardProps) {
  const Icon = iconMap[stat.icon.toLowerCase()] ?? BarChart3;

  const isPositive = stat.trend === 'up';
  const isNegative = stat.trend === 'down';
  const isNeutral = stat.trend === 'neutral';

  const TrendIcon = isNegative ? ArrowDownRight : ArrowUpRight;

  const trendStyles = isNeutral
    ? 'bg-surface-soft text-muted'
    : isPositive
      ? 'bg-[#EAF5EA] text-[#319568]'
      : 'bg-[#FCECEB] text-[#D46D68]';

  const formattedChange = `${Math.abs(stat.change).toFixed(1)}%`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: 'easeOut',
      }}
      whileHover={{ y: -3 }}
      className="dashboard-card group relative overflow-hidden p-5 sm:p-6"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-background opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium tracking-[0.1px] text-muted sm:text-[12px]">
            {stat.label}
          </p>

          <h3 className="mt-3 font-heading text-[25px] font-extrabold tracking-[-1.2px] text-foreground sm:text-[29px]">
            {stat.formattedValue}
          </h3>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
            iconStyles[stat.icon.toLowerCase()] ?? 'bg-surface-soft text-foreground'
          }`}
        >
          <Icon size={19} strokeWidth={1.9} />
        </div>
      </div>

      <div className="relative mt-5 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-[10px] font-bold ${trendStyles}`}
        >
          {!isNeutral && <TrendIcon size={12} strokeWidth={2.5} />}
          {isNeutral ? 'No change' : formattedChange}
        </span>

        <span className="text-[10px] text-muted">
          {stat.changeLabel}
        </span>
      </div>

      {stat.description && (
        <p className="relative mt-3 text-[10px] leading-relaxed text-muted/80">
          {stat.description}
        </p>
      )}

      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-dark transition-all duration-300 group-hover:w-full" />
    </motion.article>
  );
}

export default StatCard;