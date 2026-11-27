import {
  CreditCard,
  Package,
  PackageCheck,
  ShoppingBag,
  Users,
} from 'lucide-react';

import { recentActivities } from '../../data/dashboardData';
import { formatRelativeTime } from '../../utils/formatters';

import type { Activity } from '../../types';

const activityIcons = {
  order: ShoppingBag,
  customer: Users,
  product: Package,
  payment: CreditCard,
  inventory: PackageCheck,
};

const activityColors: Record<Activity['type'], string> = {
  order: 'bg-[#EEF0FA] text-[#747CC2]',
  customer: 'bg-[#FCEFEA] text-[#D58A68]',
  product: 'bg-[#EEF5E5] text-[#628B35]',
  payment: 'bg-[#EAF3F2] text-[#4C9186]',
  inventory: 'bg-[#FFF4E5] text-[#C48B35]',
};

function ActivityFeed() {
  return (
    <section className="dashboard-card min-w-0 overflow-hidden">
      <div className="border-b border-border px-5 py-5">
        <p className="text-[11px] font-semibold text-muted">
          Activity feed
        </p>

        <h2 className="mt-2 font-heading text-[17px] font-extrabold tracking-[-0.5px] text-foreground">
          Recent activity
        </h2>

        <p className="mt-1 text-[9px] text-muted">
          Latest updates from your store
        </p>
      </div>

      <div className="px-5 py-2">
        {recentActivities.slice(0, 6).map((activity, index) => {
          const Icon = activityIcons[activity.type];

          return (
            <div
              key={activity.id}
              className="relative flex gap-3 py-4"
            >
              {index !== Math.min(recentActivities.length, 6) - 1 && (
                <span className="absolute bottom-0 left-[17px] top-[51px] w-px bg-border" />
              )}

              <div
                className={`relative z-10 flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-xl ${
                  activityColors[activity.type]
                }`}
              >
                <Icon size={15} strokeWidth={1.9} />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-[10px] font-semibold leading-relaxed text-foreground">
                  {activity.title}
                </p>

                <p className="mt-1 text-[9px] leading-relaxed text-muted">
                  {activity.description}
                </p>

                <p className="mt-1.5 text-[9px] font-medium text-muted/70">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border px-5 py-3.5">
        <p className="text-[9px] text-muted">
          Showing your latest store activities
        </p>
      </div>
    </section>
  );
}

export default ActivityFeed;