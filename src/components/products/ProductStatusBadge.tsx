import type { ProductStatus } from '../../types';

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

const statusStyles: Record<ProductStatus, string> = {
  Active: 'bg-[#EDF7E9] text-[#389365] border-[#DCEED6]',
  Draft: 'bg-[#FFF5E8] text-[#C18A3E] border-[#F4E7D1]',
  Archived: 'bg-[#F1F2F0] text-[#858B82] border-[#E7E9E5]',
};

function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default ProductStatusBadge;