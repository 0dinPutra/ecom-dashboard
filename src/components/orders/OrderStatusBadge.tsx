import type { OrderStatus, PaymentStatus } from '../../types';

interface OrderStatusBadgeProps {
  status: OrderStatus | PaymentStatus;
  type?: 'order' | 'payment';
}

const orderStyles: Record<OrderStatus, string> = {
  Completed: 'bg-[#EDF7E9] text-[#389365] border-[#DCEED6]',
  Processing: 'bg-[#EEF0FA] text-[#747CC2] border-[#E0E2F3]',
  Shipped: 'bg-[#EAF3F2] text-[#4C9186] border-[#D8EAE6]',
  Pending: 'bg-[#FFF5E8] text-[#C18A3E] border-[#F4E7D1]',
  Cancelled: 'bg-[#FCEFED] text-[#D36D65] border-[#F5DEDA]',
  Refunded: 'bg-[#F1F2F0] text-[#858B82] border-[#E7E9E5]',
};

const paymentStyles: Record<PaymentStatus, string> = {
  Paid: 'bg-[#EDF7E9] text-[#389365] border-[#DCEED6]',
  Pending: 'bg-[#FFF5E8] text-[#C18A3E] border-[#F4E7D1]',
  Failed: 'bg-[#FCEFED] text-[#D36D65] border-[#F5DEDA]',
  Refunded: 'bg-[#F1F2F0] text-[#858B82] border-[#E7E9E5]',
};

function OrderStatusBadge({
  status,
  type = 'order',
}: OrderStatusBadgeProps) {
  const styles =
    type === 'payment'
      ? paymentStyles[status as PaymentStatus]
      : orderStyles[status as OrderStatus];

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[9px] font-semibold ${styles}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default OrderStatusBadge;