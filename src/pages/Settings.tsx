import { useState } from 'react';
import {
  Bell,
  Check,
  CreditCard,
  Database,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Store,
  TriangleAlert,
} from 'lucide-react';

import SettingsSection from '../components/settings/SettingsSection';
import StoreProfileForm from '../components/settings/StoreProfileForm';
import { useDashboardStore } from '../store/dashboardStore';

interface Preference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const initialPreferences: Preference[] = [
  {
    id: 'orders',
    title: 'Order updates',
    description: 'Get notified when a new order is placed.',
    enabled: true,
  },
  {
    id: 'inventory',
    title: 'Low stock alerts',
    description: 'Receive alerts when products need replenishment.',
    enabled: true,
  },
  {
    id: 'customers',
    title: 'New customers',
    description: 'Get notified when someone joins your customer list.',
    enabled: false,
  },
  {
    id: 'reports',
    title: 'Weekly performance report',
    description: 'Receive a weekly summary of your store performance.',
    enabled: true,
  },
];

function Settings() {
  const resetDemoData = useDashboardStore((state) => state.resetDemoData);
  const [preferences, setPreferences] =
    useState<Preference[]>(initialPreferences);
  const [preferencesSaved, setPreferencesSaved] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const togglePreference = (id: string) => {
    setPreferences((current) =>
      current.map((preference) =>
        preference.id === id
          ? { ...preference, enabled: !preference.enabled }
          : preference,
      ),
    );
    setPreferencesSaved(false);
  };

  const handleReset = () => {
    resetDemoData();
    setPreferences(initialPreferences);
    setPreferencesSaved(false);
    setShowResetConfirmation(false);
    setResetComplete(true);
  };

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-6 pb-10">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8b9385]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#a8d94e]" />
          Workspace
        </div>

        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-[#20241f] sm:text-[30px]">
          Settings
        </h1>

        <p className="mt-1.5 text-sm text-[#858b82]">
          Customize your store preferences and manage your workspace.
        </p>
      </div>

      <SettingsSection
        title="Store profile"
        description="Your store details, contact information and regional preferences."
        icon={<Store size={19} />}
      >
        <StoreProfileForm />
      </SettingsSection>

      <SettingsSection
        title="Notifications"
        description="Choose which store activities you want to be notified about."
        icon={<Bell size={19} />}
      >
        <div className="divide-y divide-[#edf0e9]">
          {preferences.map((preference) => (
            <div
              key={preference.id}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#343a31]">
                  {preference.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#858b82]">
                  {preference.description}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={preference.enabled}
                aria-label={`Toggle ${preference.title}`}
                onClick={() => togglePreference(preference.id)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  preference.enabled ? 'bg-[#a8d94e]' : 'bg-[#d9ded5]'
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    preference.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-3 border-t border-[#edf0e9] pt-5">
          {preferencesSaved && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#548b35]">
              <Check size={14} />
              Preferences saved
            </span>
          )}

          <button
            type="button"
            onClick={() => setPreferencesSaved(true)}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#202820] px-5 text-sm font-semibold text-white hover:bg-[#303b2d]"
          >
            Save preferences
          </button>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Workspace preferences"
        description="A quick overview of the demo workspace configuration."
        icon={<SlidersHorizontal size={19} />}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-[#edf0e9] bg-[#fafbf8] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5e4] text-[#719a48]">
              <CreditCard size={19} />
            </div>
            <div>
              <p className="text-xs text-[#858b82]">Default currency</p>
              <p className="mt-1 text-sm font-semibold text-[#343a31]">
                Indian Rupee (INR)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[#edf0e9] bg-[#fafbf8] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5e4] text-[#719a48]">
              <ShieldCheck size={19} />
            </div>
            <div>
              <p className="text-xs text-[#858b82]">Workspace access</p>
              <p className="mt-1 text-sm font-semibold text-[#343a31]">
                Demo administrator
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#92988e]">
          This frontend demo uses local sample data. Authentication, payment
          processing and server-side settings are not connected.
        </p>
      </SettingsSection>

      <SettingsSection
        title="Demo data"
        description="Restore the original sample products, orders and customers."
        icon={<Database size={19} />}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[#343a31]">
              Reset workspace data
            </p>
            <p className="mt-1 max-w-lg text-xs leading-relaxed text-[#858b82]">
              This restores the original demo data and resets inventory
              adjustments and order changes made during this session.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setResetComplete(false);
              setShowResetConfirmation(true);
            }}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#e8d8d5] bg-white px-4 text-sm font-semibold text-[#bd625b] hover:border-[#d9aaa4] hover:bg-[#fff8f7]"
          >
            <RotateCcw size={15} />
            Reset demo data
          </button>
        </div>

        {resetComplete && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#dcebd0] bg-[#f3f8ee] px-4 py-3 text-xs font-medium text-[#548b35]">
            <Check size={15} />
            Demo data has been restored successfully.
          </div>
        )}

        {showResetConfirmation && (
          <div className="mt-5 rounded-xl border border-[#f0dfc7] bg-[#fffaf2] p-4">
            <div className="flex items-start gap-3">
              <TriangleAlert
                size={19}
                className="mt-0.5 shrink-0 text-[#c58b3e]"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#51452f]">
                  Are you sure you want to reset?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#8d826b]">
                  Your current demo changes will be replaced with the original
                  sample data. This action cannot be undone.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="h-9 rounded-lg bg-[#bd625b] px-4 text-xs font-semibold text-white hover:bg-[#a94f49]"
                  >
                    Yes, reset data
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirmation(false)}
                    className="h-9 rounded-lg border border-[#e8dfd1] bg-white px-4 text-xs font-semibold text-[#746b5c] hover:bg-[#faf6ef]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </SettingsSection>
    </div>
  );
}

export default Settings;