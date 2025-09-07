import presetsData from '@/data/popular-presets.json';

export default function PopularLinks() {
  const presets = (presetsData.presets as any[]) ?? [];
  return (
    <nav aria-label="Popular RAID links" className="mt-2 text-sm text-slate-400">
      <ul className="flex flex-wrap gap-3">
        {presets.slice(0, 6).map((p) => {
          const href = `/#calc?vendor=${p.params.vendor ?? 'generic'}&level=${p.params.level}&drives=${p.params.drives}&size=${p.params.sizeTB}TB&media=${p.params.media}`;
          return (
            <li key={p.id}>
              <a href={href} className="underline underline-offset-4 hover:text-slate-200">
                {p.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

