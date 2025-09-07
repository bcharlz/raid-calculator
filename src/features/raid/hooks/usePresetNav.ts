'use client';

import { useCallback } from 'react';
import { applyParamsAndScroll } from '@/utils/url';

export type PresetParams = {
  vendor?: string;
  level: '0' | '1' | '5' | '6' | '10';
  drives: number;
  sizeTB: number;
  media: 'hdd' | 'ssd';
};

export function usePresetNav(anchorId = 'calc') {
  return useCallback((params: PresetParams) => {
    // Map our canonical keys to URLSearchParams keys used by the app
    const query = {
      vendor: params.vendor ?? 'generic',
      level: params.level,
      drives: params.drives,
      size: params.sizeTB,
      media: params.media
    };
    return applyParamsAndScroll(query, anchorId);
  }, [anchorId]);
}

