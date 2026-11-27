import { CalendarDays, CheckCircle2, Sparkles } from 'lucide-react';

import { getGreeting } from '../../utils/helpers';
import { formatDate } from '../../utils/formatters';

function DashboardHeader() {
  return (
    <section className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#DDEBCB] bg-[#F0F7E8] px-3 py-1.5">
          <Sparkles size={12} className="text-[#719B3D]" />
          <span className="text-[9px] font-bold uppercase tracking-[1px] text-[#668A3B]">
            Your business at a glance
          </span>
        </div>

        <h2 className="font-heading text-[25px] font-extrabold tracking-[-1.2px] text-foreground sm:text-[31px]">
          {getGreeting()}, Alex
          <span className="ml-2">✦</span>
        </h2>

        <p className="mt-2 max-w-[460px] text-[11px] leading-relaxed text-muted sm:text-[12px]">
          Here's what's happening with your store today. Let's make it a
          productive one.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-3">
          <CalendarDays size={15} className="text-muted" />
          <span className="text-[10px] font-semibold text-foreground">
            {formatDate(new Date())}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-[#DDEBCB] bg-[#F0F7E8] px-3.5 py-3">
          <CheckCircle2 size={14} className="text-[#319568]" />
          <span className="text-[10px] font-semibold text-[#319568]">
            Store is live
          </span>
        </div>
      </div>
    </section>
  );
}

export default DashboardHeader;