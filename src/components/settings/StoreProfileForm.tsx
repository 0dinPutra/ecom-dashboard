import { useState, type FormEvent } from 'react';
import { Check, Store } from 'lucide-react';

interface StoreProfile {
  name: string;
  email: string;
  phone: string;
  website: string;
  currency: string;
  timezone: string;
}

const initialProfile: StoreProfile = {
  name: 'Northstar Studio',
  email: 'hello@northstar.store',
  phone: '+91 98765 43210',
  website: 'https://northstar.store',
  currency: 'INR',
  timezone: 'Asia/Kolkata',
};

const inputClassName =
  'mt-2 h-11 w-full rounded-xl border border-[#e6eae2] bg-[#fafbf9] px-3.5 text-sm text-[#30362d] outline-none transition-all focus:border-[#b9d58f] focus:bg-white focus:ring-2 focus:ring-[#c5f36b]/20';

function StoreProfileForm() {
  const [profile, setProfile] = useState<StoreProfile>(initialProfile);
  const [saved, setSaved] = useState(false);

  const updateField = (field: keyof StoreProfile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col gap-4 rounded-xl border border-[#edf0e9] bg-[#fafbf8] p-4 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#202820] text-[#c5f36b]">
          <Store size={25} strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-bold text-[#252a23]">
            Store identity
          </p>
          <p className="mt-1 text-xs text-[#858b82]">
            Manage the basic information displayed across your store.
          </p>
        </div>

        <span className="w-fit rounded-full bg-[#edf7e6] px-3 py-1 text-[11px] font-semibold text-[#548b35]">
          Demo store
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block text-xs font-semibold text-[#596153]">
          Store name
          <input
            required
            value={profile.name}
            onChange={(event) => updateField('name', event.target.value)}
            className={inputClassName}
            placeholder="Your store name"
          />
        </label>

        <label className="block text-xs font-semibold text-[#596153]">
          Contact email
          <input
            required
            type="email"
            value={profile.email}
            onChange={(event) => updateField('email', event.target.value)}
            className={inputClassName}
            placeholder="hello@example.com"
          />
        </label>

        <label className="block text-xs font-semibold text-[#596153]">
          Phone number
          <input
            value={profile.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className={inputClassName}
            placeholder="+91 00000 00000"
          />
        </label>

        <label className="block text-xs font-semibold text-[#596153]">
          Store website
          <input
            type="url"
            value={profile.website}
            onChange={(event) => updateField('website', event.target.value)}
            className={inputClassName}
            placeholder="https://example.com"
          />
        </label>

        <label className="block text-xs font-semibold text-[#596153]">
          Store currency
          <select
            value={profile.currency}
            onChange={(event) => updateField('currency', event.target.value)}
            className={inputClassName}
          >
            <option value="INR">INR — Indian Rupee (₹)</option>
            <option value="USD">USD — US Dollar ($)</option>
            <option value="EUR">EUR — Euro (€)</option>
            <option value="GBP">GBP — British Pound (£)</option>
          </select>
        </label>

        <label className="block text-xs font-semibold text-[#596153]">
          Time zone
          <select
            value={profile.timezone}
            onChange={(event) => updateField('timezone', event.target.value)}
            className={inputClassName}
          >
            <option value="Asia/Kolkata">India Standard Time (IST)</option>
            <option value="Europe/London">London (GMT)</option>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="Asia/Dubai">Gulf Standard Time (GST)</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#edf0e9] pt-5">
        <p className="text-xs text-[#92988e]">
          Changes are stored in this demo form only.
        </p>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#548b35]">
              <Check size={14} />
              Saved
            </span>
          )}

          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#202820] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#303b2d]"
          >
            Save changes
          </button>
        </div>
      </div>
    </form>
  );
}

export default StoreProfileForm;