// src/models/vendor-presets.ts - CORRECTED FOR NESTED CONFIGURATION STRUCTURE
import type { VendorPreset } from '../features/raid/types';

export const VENDOR_PRESETS: VendorPreset[] = [
  // Synology presets
  {
    id: 'synology-ds220-basic',
    vendor: 'Synology',
    name: 'DS220+ Basic RAID 1',
    description: '2-bay NAS with mirroring for data protection',
    popular: true,
    tags: ['home', 'basic', 'protection'],
    configuration: {
      raidLevel: '1',
      configuration: {
        diskCount: 2,
        diskSize: 4,
        mediaType: 'HDD'
      }
    }
  },
  {
    id: 'synology-ds423-performance',
    vendor: 'Synology',
    name: 'DS423+ Performance RAID 5',
    description: '4-bay NAS with RAID 5 for balanced performance and protection',
    popular: true,
    tags: ['home', 'performance', 'storage'],
    configuration: {
      raidLevel: '5',
      configuration: {
        diskCount: 4,
        diskSize: 8,
        mediaType: 'HDD'
      }
    }
  },
  {
    id: 'synology-ds920-mixed',
    vendor: 'Synology',
    name: 'DS920+ Mixed Drive RAID 5',
    description: '4-bay NAS with mixed drives for optimal performance',
    popular: false,
    tags: ['home', 'mixed', 'performance'],
    configuration: {
      raidLevel: '5',
      configuration: {
        disks: [
          { size: 8, mediaType: 'HDD' },
          { size: 8, mediaType: 'HDD' },
          { size: 4, mediaType: 'SSD' },
          { size: 4, mediaType: 'SSD' }
        ]
      }
    }
  },
  // QNAP presets
  {
    id: 'qnap-ts464-media',
    vendor: 'QNAP',
    name: 'TS-464 Media Server',
    description: '4-bay media server with RAID 5 for large capacity',
    popular: true,
    tags: ['media', 'storage', 'home'],
    configuration: {
      raidLevel: '5',
      configuration: {
        diskCount: 4,
        diskSize: 12,
        mediaType: 'HDD'
      }
    }
  },
  {
    id: 'qnap-ts253d-backup',
    vendor: 'QNAP',
    name: 'TS-253D Backup Solution',
    description: '2-bay backup NAS with RAID 1 protection',
    popular: true,
    tags: ['backup', 'protection', 'small'],
    configuration: {
      raidLevel: '1',
      configuration: {
        diskCount: 2,
        diskSize: 6,
        mediaType: 'HDD'
      }
    }
  },
  // ZFS presets
  {
    id: 'zfs-raidz1-basic',
    vendor: 'ZFS',
    name: 'RAIDZ1 (RAID 5 equivalent)',
    description: 'ZFS RAIDZ1 with 4 drives for balanced performance',
    popular: true,
    tags: ['zfs', 'enterprise', 'reliable'],
    configuration: {
      raidLevel: '5',
      configuration: {
        diskCount: 4,
        diskSize: 6,
        mediaType: 'HDD'
      }
    }
  },
  {
    id: 'zfs-raidz2-enterprise',
    vendor: 'ZFS',
    name: 'RAIDZ2 (RAID 6 equivalent)',
    description: 'ZFS RAIDZ2 with 6 drives for enterprise reliability',
    popular: false,
    tags: ['zfs', 'enterprise', 'reliable', 'large'],
    configuration: {
      raidLevel: '6',
      configuration: {
        diskCount: 6,
        diskSize: 10,
        mediaType: 'HDD'
      }
    }
  },
  // Generic presets
  {
    id: 'generic-performance',
    vendor: 'Generic',
    name: 'High Performance RAID 10',
    description: 'RAID 10 with SSDs for maximum performance',
    popular: false,
    tags: ['performance', 'ssd', 'enterprise'],
    configuration: {
      raidLevel: '10',
      configuration: {
        diskCount: 4,
        diskSize: 2,
        mediaType: 'SSD'
      }
    }
  },
  {
    id: 'generic-capacity',
    vendor: 'Generic',
    name: 'Large Capacity RAID 6',
    description: 'RAID 6 with large HDDs for maximum storage',
    popular: false,
    tags: ['capacity', 'storage', 'enterprise'],
    configuration: {
      raidLevel: '6',
      configuration: {
        diskCount: 8,
        diskSize: 16,
        mediaType: 'HDD'
      }
    }
  },
  {
    id: 'generic-basic',
    vendor: 'Generic',
    name: 'Basic RAID 1 Mirror',
    description: 'Simple 2-drive mirror for basic protection',
    popular: true,
    tags: ['basic', 'simple', 'protection'],
    configuration: {
      raidLevel: '1',
      configuration: {
        diskCount: 2,
        diskSize: 4,
        mediaType: 'HDD'
      }
    }
  }
];

// Get unique vendors - FIXED for downlevel iteration
export function getVendors(): string[] {
  const vendors: string[] = [];
  VENDOR_PRESETS.forEach(preset => {
    if (!vendors.includes(preset.vendor)) {
      vendors.push(preset.vendor);
    }
  });
  return vendors;
}

// FIXED: Export the function that was missing
export function getAvailableVendors(): string[] {
  return getVendors();
}

// Get all available tags - FIXED for downlevel iteration  
export function getAllTags(): string[] {
  const allTags: string[] = [];
  VENDOR_PRESETS.forEach(preset => {
    preset.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });
  return allTags.sort();
}

// FIXED: Export the function that was missing
export function getAvailableTags(): string[] {
  return getAllTags();
}

// Get presets by vendor
export function getPresetsByVendor(vendor: string): VendorPreset[] {
  return VENDOR_PRESETS.filter(preset => preset.vendor === vendor);
}

// Get popular presets
export function getPopularPresets(): VendorPreset[] {
  return VENDOR_PRESETS.filter(preset => preset.popular);
}

// Get preset by ID
export function getPresetById(id: string): VendorPreset | undefined {
  return VENDOR_PRESETS.find(preset => preset.id === id);
}