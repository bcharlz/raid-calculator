// src/features/raid/hooks/useUrlSerializer.ts
import { useCallback } from 'react';
import type { 
  UseUrlSerializerReturn 
} from '../types';
import { 
  generateShareableLink, 
  updateUrl 
} from '../../../services/urlSerializer';

// Temporary parseConfigFromUrl function until the service is fixed
const parseConfigFromUrl = (url?: string): any | null => {
  try {
    const urlToUse = url || window.location.href;
    const urlObj = new URL(urlToUse);
    const params = urlObj.searchParams;
    
    if (!params.has('r')) return null;
    
    return {
      raidLevel: params.get('r'),
      configuration: {
        diskCount: parseInt(params.get('c') || '4'),
        diskSize: parseInt(params.get('s') || '4'),
        mediaType: params.get('m') || 'HDD'
      }
    };
  } catch {
    return null;
  }
};

export function useUrlSerializer(): UseUrlSerializerReturn {
  const generateLink = useCallback((config: any): string => {
    return generateShareableLink(config);
  }, []);

  const parseConfig = useCallback((url?: string): any | null => {
    return parseConfigFromUrl(url);
  }, []);

  const updateCurrentUrl = useCallback((config: any): void => {
    updateUrl(config);
  }, []);

  return {
    generateShareableLink: generateLink,
    parseConfigFromUrl: parseConfig,
    updateUrl: updateCurrentUrl
  };
}