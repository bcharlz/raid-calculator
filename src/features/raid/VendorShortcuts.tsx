'use client';

import presetsData from '@/data/popular-presets.json';
import { usePresetNav } from './hooks/usePresetNav';

type Preset = {
  id: string;
  label: string;
  params: {
    vendor?: string;
    level: '0' | '1' | '5' | '6' | '10';
    drives: number;
    sizeTB: number;
    media: 'hdd' | 'ssd';
  };
};

export default function VendorShortcuts() {
  const go = usePresetNav(presetsData.ui?.anchorTarget || 'calc');
  const presets = (presetsData.presets as Preset[]) ?? [];

  return (
    <section id="vendors" className="space-y-3">
      <h2 className="text-lg font-semibold">
        {presetsData.ui?.sectionTitle || 'Popular Configurations'}
      </h2>
      {presetsData.ui?.sectionDescription && (
        <p className="text-sm text-slate-400">{presetsData.ui.sectionDescription}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.id}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
            onClick={() => go(p.params)}
            aria-label={`Use preset ${p.label}`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </section>
  );
}

