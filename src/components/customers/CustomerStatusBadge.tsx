import type { CustomerStatus } from '../../types';

interface CustomerStatusBadgeProps {
  status: CustomerStatus;
}

const statusStyles: Record<CustomerStatus, string> = {
  Active: 'border-[#DCEED6] bg-[#EDF7E9] text-[#389365]',
  Inactive: 'border-[#E7E9E5] bg-[#F1F2F0] text-[#858B82]',
  New: 'border-[#E0E2F3] bg-[#EEF0FA] text-[#747CC2]',
};

function CustomerStatusBadge({ status }: CustomerStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[9px] font-semibold ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default CustomerStatusBadge;