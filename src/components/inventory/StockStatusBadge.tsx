import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import type { StockStatus } from '../../types';

interface StockStatusBadgeProps {
  status: StockStatus;
}

const statusConfig: Record<
  StockStatus,
  { className: string; icon: typeof CheckCircle2 }
> = {
  'In stock': {
    className: 'bg-[#edf7e6] text-[#548b35]',
    icon: CheckCircle2,
  },
  'Low stock': {
    className: 'bg-[#fff5e5] text-[#c48728]',
    icon: AlertCircle,
  },
  'Out of stock': {
    className: 'bg-[#fff0ef] text-[#d35f58]',
    icon: XCircle,
  },
};

function StockStatusBadge({ status }: StockStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      <Icon size={13} strokeWidth={2.2} />
      {status}
    </span>
  );
}

export default StockStatusBadge;