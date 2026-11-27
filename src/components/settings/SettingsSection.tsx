import type { ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

function SettingsSection({
  title,
  description,
  icon,
  children,
  className = '',
}: SettingsSectionProps) {
  return (
    <section className={`dashboard-card overflow-hidden ${className}`}>
      <div className="flex items-start gap-3 border-b border-[#e9ece6] px-5 py-5 sm:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4e9] text-[#72964e]">
          {icon}
        </div>

        <div className="min-w-0">
          <h2 className="font-heading text-base font-bold text-[#252a23]">
            {title}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[#858b82]">
            {description}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

export default SettingsSection;