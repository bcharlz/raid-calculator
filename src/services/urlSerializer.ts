/**
 * URL serialization service for shareable RAID calculator links
 * Handles encoding/decoding calculator state to/from URL parameters
 */

import { RaidLevel, MediaType, RaidConfiguration, UrlParams, RaidDisk } from '@/models/raid-schemas';

/**
 * Serialize RAID configuration to URL parameters
 */
export function serializeToUrl(config: RaidConfiguration, baseUrl?: string): string {
  const params = new URLSearchParams();
  
  // Add RAID level
  params.set('r', config.raidLevel);
  
  // Handle configuration type
  if ('diskCount' in config.configuration) {
    // Uniform disk configuration
    params.set('c', config.configuration.diskCount.toString());
    params.set('s', config.configuration.diskSize.toString());
    params.set('m', config.configuration.mediaType);
  } else {
    // Mixed disk configuration
    const encodedDisks = encodeMixedDisks(config.configuration.disks);
    params.set('d', encodedDisks);
  }
  
  // Add optional name
  if (config.name) {
    params.set('n', config.name);
  }
  
  const url = baseUrl || window?.location?.origin || '';
  return `${url}?${params.toString()}`;
}

/**
 * Deserialize URL parameters to RAID configuration
 */
export function deserializeFromUrl(url: string | URLSearchParams): RaidConfiguration | null {
  try {
    const params = typeof url === 'string' 
      ? new URLSearchParams(url.split('?')[1] || '') 
      : url;
    
    const raidLevel = params.get('r') as RaidLevel;
    if (!raidLevel || !['0', '1', '5', '6', '10'].includes(raidLevel)) {
      return null;
    }
    
    // Check for mixed disk configuration
    const encodedDisks = params.get('d');
    if (encodedDisks) {
      const disks = decodeMixedDisks(encodedDisks);
      if (!disks || disks.length === 0) {
        return null;
      }
      
      return {
        raidLevel,
        configuration: { disks },
        name: params.get('n') || undefined,
      };
    }
    
    // Uniform disk configuration
    const diskCount = parseInt(params.get('c') || '0');
    const diskSize = parseFloat(params.get('s') || '0');
    const mediaType = params.get('m') as MediaType;
    
    if (!diskCount || !diskSize || !mediaType || !['HDD', 'SSD'].includes(mediaType)) {
      return null;
    }
    
    return {
      raidLevel,
      configuration: {
        diskCount,
        diskSize,
        mediaType,
      },
      name: params.get('n') || undefined,
    };
  } catch (error) {
    console.error('Failed to deserialize URL parameters:', error);
    return null;
  }
}

/**
 * Encode mixed disk configuration to compact string
 */
function encodeMixedDisks(disks: RaidDisk[]): string {
  try {
    // Format: size1:type1,size2:type2,size3:type3
    // Use H for HDD, S for SSD to keep it compact
    const encoded = disks.map(disk => {
      const type = disk.mediaType === 'HDD' ? 'H' : 'S';
      return `${disk.size}:${type}`;
    }).join(',');
    
    // Base64 encode to handle special characters
    return btoa(encoded);
  } catch (error) {
    console.error('Failed to encode mixed disks:', error);
    return '';
  }
}

/**
 * Decode mixed disk configuration from compact string
 */
function decodeMixedDisks(encoded: string): RaidDisk[] | null {
  try {
    // Decode from base64
    const decoded = atob(encoded);
    
    // Parse format: size1:type1,size2:type2,size3:type3
    const diskStrings = decoded.split(',');
    const disks: RaidDisk[] = [];
    
    for (const diskString of diskStrings) {
      const [sizeStr, typeStr] = diskString.split(':');
      const size = parseFloat(sizeStr);
      const mediaType = typeStr === 'H' ? 'HDD' : 'SSD';
      
      if (isNaN(size) || size <= 0 || !['H', 'S'].includes(typeStr)) {
        return null;
      }
      
      disks.push({ size, mediaType });
    }
    
    return disks.length > 0 ? disks : null;
  } catch (error) {
    console.error('Failed to decode mixed disks:', error);
    return null;
  }
}

/**
 * Generate shareable link with current configuration
 */
export function generateShareableLink(config: RaidConfiguration): string {
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}${window.location.pathname}`
    : '';
  
  return serializeToUrl(config, baseUrl);
}

/**
 * Generate embeddable widget code
 */
export function generateEmbedCode(config: RaidConfiguration, options?: {
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
}): string {
  const { width = 800, height = 600, theme = 'light' } = options || {};
  
  const shareUrl = generateShareableLink(config);
  const embedUrl = `${shareUrl}&embed=true&theme=${theme}`;
  
  return `<iframe 
  src="${embedUrl}" 
  width="${width}" 
  height="${height}" 
  frameborder="0" 
  style="border: 1px solid #e2e8f0; border-radius: 8px;"
  title="RAID Calculator">
</iframe>`;
}

/**
 * Parse current URL parameters
 */
export function parseCurrentUrl(): RaidConfiguration | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return deserializeFromUrl(window.location.search);
}

/**
 * Update URL without page reload
 */
export function updateUrl(config: RaidConfiguration, replace = false): void {
  if (typeof window === 'undefined' || !window.history) {
    return;
  }
  
  const url = serializeToUrl(config, '');
  const method = replace ? 'replaceState' : 'pushState';
  
  window.history[method](null, '', url);
}

/**
 * Generate social sharing URLs
 */
export function generateSocialUrls(config: RaidConfiguration): {
  twitter: string;
  facebook: string;
  linkedin: string;
  reddit: string;
} {
  const shareUrl = generateShareableLink(config);
  const title = `RAID ${config.raidLevel} Calculator Results`;
  const description = `Check out this RAID configuration: ${config.name || 'Custom Setup'}`;
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`${title} - ${description}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
  };
}

/**
 * Validate URL parameters
 */
export function validateUrlParams(params: URLSearchParams): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  const raidLevel = params.get('r');
  if (raidLevel && !['0', '1', '5', '6', '10'].includes(raidLevel)) {
    errors.push('Invalid RAID level');
  }
  
  const diskCount = params.get('c');
  if (diskCount) {
    const count = parseInt(diskCount);
    if (isNaN(count) || count < 2 || count > 24) {
      errors.push('Invalid disk count');
    }
  }
  
  const diskSize = params.get('s');
  if (diskSize) {
    const size = parseFloat(diskSize);
    if (isNaN(size) || size <= 0 || size > 100) {
      errors.push('Invalid disk size');
    }
  }
  
  const mediaType = params.get('m');
  if (mediaType && !['HDD', 'SSD'].includes(mediaType)) {
    errors.push('Invalid media type');
  }
  
  const encodedDisks = params.get('d');
  if (encodedDisks) {
    const disks = decodeMixedDisks(encodedDisks);
    if (!disks) {
      errors.push('Invalid disk configuration');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

