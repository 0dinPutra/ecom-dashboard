import { useState } from 'react';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Globe2, MousePointer2 } from 'lucide-react';

import { trafficSources } from '../../data/dashboardData';
import { formatCompactNumber } from '../../utils/formatters';

interface TrafficTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload?: {
      name: string;
      visitors: number;
      percentage: number;
      color: string;
    };
  }>;
}

function TrafficTooltip({ active, payload }: TrafficTooltipProps) {
  if (!active || !payload?.length) return null;

  const source = payload[0]?.payload;

  if (!source) return null;

  return (
    <div className="rounded-xl border border-border bg-white p-3 shadow-lg">
      <p className="text-[11px] font-semibold text-foreground">
        {source.name}
      </p>
      <p className="mt-1 text-[10px] text-muted">
        {formatCompactNumber(source.visitors)} visitors
      </p>
      <p className="mt-1 text-[11px] font-bold text-foreground">
        {source.percentage}%
      </p>
    </div>
  );
}

function TrafficSources() {
  const [activeSource, setActiveSource] = useState<string | null>(null);

  const totalVisitors = trafficSources.reduce(
    (sum, source) => sum + source.visitors,
    0,
  );

  return (
    <section className="dashboard-card min-w-0 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF3F2] text-[#4C9186]">
              <Globe2 size={16} />
            </div>
            <p className="text-[11px] font-semibold text-muted">
              Traffic sources
            </p>
          </div>

          <h2 className="mt-4 font-heading text-[25px] font-extrabold tracking-[-1px] text-foreground">
            {formatCompactNumber(totalVisitors)}
          </h2>

          <p className="mt-1 text-[10px] text-muted">
            Total visitors by channel
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background text-muted">
          <MousePointer2 size={16} />
        </div>
      </div>

      <div className="relative mx-auto mt-5 h-[205px] w-full max-w-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={trafficSources}
              dataKey="visitors"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={91}
              paddingAngle={4}
              stroke="none"
              onMouseEnter={(data) => setActiveSource(data.id)}
              onMouseLeave={() => setActiveSource(null)}
              animationDuration={900}
            >
              {trafficSources.map((source) => (
                <Cell
                  key={source.id}
                  fill={source.color}
                  opacity={
                    activeSource && activeSource !== source.id ? 0.4 : 1
                  }
                />
              ))}
            </Pie>

            <Tooltip content={<TrafficTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-medium text-muted">
            Total traffic
          </span>
          <span className="mt-1 font-heading text-[23px] font-extrabold tracking-[-1px] text-foreground">
            {formatCompactNumber(totalVisitors)}
          </span>
          <span className="mt-0.5 text-[9px] text-muted">
            Visitors
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        {trafficSources.map((source) => (
          <button
            key={source.id}
            type="button"
            onMouseEnter={() => setActiveSource(source.id)}
            onMouseLeave={() => setActiveSource(null)}
            onFocus={() => setActiveSource(source.id)}
            onBlur={() => setActiveSource(null)}
            className="flex w-full items-center justify-between gap-3 rounded-lg text-left transition-opacity hover:opacity-75"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: source.color }}
              />
              <span className="truncate text-[10px] font-medium text-foreground">
                {source.name}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span className="text-[10px] text-muted">
                {formatCompactNumber(source.visitors)}
              </span>
              <span className="w-9 text-right text-[10px] font-bold text-foreground">
                {source.percentage}%
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default TrafficSources;