export function buildParams(params: Record<string, string | number>) {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => p.set(k, String(v)));
  return `${location.pathname}?${p.toString()}#calc`;
}

export function applyParamsAndScroll(params: Record<string, string | number>, anchorId = 'calc') {
  const url = buildParams(params);
  history.replaceState(null, '', url);
  const el = document.getElementById(anchorId);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return url;
}

