/**
 * Vendor preset configurations for popular NAS and storage systems
 * Pre-configured RAID setups for Synology, QNAP, ZFS, and generic systems
 */

import { VendorPreset, RaidConfiguration } from './raid-schemas';

export const VENDOR_PRESETS: VendorPreset[] = [
  // Synology Presets
  {
    id: 'synology-raid5-8x12tb',
    vendor: 'Synology',
    name: 'DS1821+ RAID 5 Setup',
    description: '8×12TB drives in RAID 5 for balanced capacity and protection',
    popular: true,
    tags: ['home-office', 'media-server', 'backup'],
    configuration: {
      raidLevel: '5',
      configuration: {
        diskCount: 8,
        diskSize: 12,
        mediaType: 'HDD',
      },
      name: 'Synology RAID 5 8×12TB',
      description: 'Popular configuration for Synology DS1821+ and similar 8-bay units',
    },
  },
  {
    id: 'synology-raid6-6x18tb',
    vendor: 'Synology',
    name: 'DS1621+ RAID 6 Setup',
    description: '6×18TB drives in RAID 6 for maximum protection',
    popular: true,
    tags: ['business', 'critical-data', 'high-capacity'],
    configuration: {
      raidLevel: '6',
      configuration: {
        diskCount: 6,
        diskSize: 18,
        mediaType: 'HDD',
      },
      name: 'Synology RAID 6 6×18TB',
      description: 'High-capacity setup with dual parity protection',
    },
  },
  {
    id: 'synology-ssd-raid10-4x4tb',
    vendor: 'Synology',
    name: 'DS920+ SSD RAID 10',
    description: '4×4TB SSDs in RAID 10 for high performance',
    popular: false,
    tags: ['performance', 'ssd', 'small-business'],
    configuration: {
      raidLevel: '10',
      configuration: {
        diskCount: 4,
        diskSize: 4,
        mediaType: 'SSD',
      },
      name: 'Synology SSD RAID 10 4×4TB',
      description: 'High-performance SSD configuration for demanding workloads',
    },
  },

  // QNAP Presets
  {
    id: 'qnap-raid6-8x18tb',
    vendor: 'QNAP',
    name: 'TS-832PX RAID 6 Setup',
    description: '8×18TB drives in RAID 6 for enterprise reliability',
    popular: true,
    tags: ['enterprise', 'high-capacity', 'reliability'],
    configuration: {
      raidLevel: '6',
      configuration: {
        diskCount: 8,
        diskSize: 18,
        mediaType: 'HDD',
      },
      name: 'QNAP RAID 6 8×18TB',
      description: 'Enterprise-grade setup with maximum capacity and dual fault tolerance',
    },
  },
  {
    id: 'qnap-raid5-4x12tb',
    vendor: 'QNAP',
    name: 'TS-464 RAID 5 Setup',
    description: '4×12TB drives in RAID 5 for home/small office',
    popular: true,
    tags: ['home-office', 'cost-effective', 'balanced'],
    configuration: {
      raidLevel: '5',
      configuration: {
        diskCount: 4,
        diskSize: 12,
        mediaType: 'HDD',
      },
      name: 'QNAP RAID 5 4×12TB',
      description: 'Cost-effective setup for home and small office use',
    },
  },
  {
    id: 'qnap-raid10-6x8tb',
    vendor: 'QNAP',
    name: 'TS-664 RAID 10 Setup',
    description: '6×8TB drives in RAID 10 for balanced performance',
    popular: false,
    tags: ['performance', 'balanced', 'mid-range'],
    configuration: {
      raidLevel: '10',
      configuration: {
        diskCount: 6,
        diskSize: 8,
        mediaType: 'HDD',
      },
      name: 'QNAP RAID 10 6×8TB',
      description: 'Balanced performance and capacity for mixed workloads',
    },
  },

  // ZFS Presets
  {
    id: 'zfs-raidz2-8x16tb',
    vendor: 'ZFS',
    name: 'ZFS RAIDZ2 Pool',
    description: '8×16TB drives in RAIDZ2 (equivalent to RAID 6)',
    popular: true,
    tags: ['zfs', 'enterprise', 'data-integrity'],
    configuration: {
      raidLevel: '6', // RAIDZ2 is similar to RAID 6
      configuration: {
        diskCount: 8,
        diskSize: 16,
        mediaType: 'HDD',
      },
      name: 'ZFS RAIDZ2 8×16TB',
      description: 'ZFS RAIDZ2 configuration with excellent data integrity features',
    },
  },
  {
    id: 'zfs-mirror-4x12tb',
    vendor: 'ZFS',
    name: 'ZFS Mirrored Pool',
    description: '4×12TB drives in mirrored pairs (RAID 10 equivalent)',
    popular: true,
    tags: ['zfs', 'performance', 'reliability'],
    configuration: {
      raidLevel: '10',
      configuration: {
        diskCount: 4,
        diskSize: 12,
        mediaType: 'HDD',
      },
      name: 'ZFS Mirror 4×12TB',
      description: 'ZFS mirrored vdevs for high performance and reliability',
    },
  },
  {
    id: 'zfs-raidz1-6x10tb',
    vendor: 'ZFS',
    name: 'ZFS RAIDZ1 Pool',
    description: '6×10TB drives in RAIDZ1 (equivalent to RAID 5)',
    popular: false,
    tags: ['zfs', 'cost-effective', 'home-lab'],
    configuration: {
      raidLevel: '5', // RAIDZ1 is similar to RAID 5
      configuration: {
        diskCount: 6,
        diskSize: 10,
        mediaType: 'HDD',
      },
      name: 'ZFS RAIDZ1 6×10TB',
      description: 'Cost-effective ZFS configuration for home lab environments',
    },
  },

  // Generic/Common Presets
  {
    id: 'generic-raid1-2x4tb',
    vendor: 'Generic',
    name: 'Basic RAID 1 Mirror',
    description: '2×4TB drives in RAID 1 for simple redundancy',
    popular: true,
    tags: ['basic', 'simple', 'entry-level'],
    configuration: {
      raidLevel: '1',
      configuration: {
        diskCount: 2,
        diskSize: 4,
        mediaType: 'HDD',
      },
      name: 'Basic RAID 1 2×4TB',
      description: 'Simple two-drive mirror for basic redundancy',
    },
  },
  {
    id: 'generic-raid0-4x2tb',
    vendor: 'Generic',
    name: 'Performance RAID 0',
    description: '4×2TB drives in RAID 0 for maximum performance',
    popular: false,
    tags: ['performance', 'no-redundancy', 'temporary'],
    configuration: {
      raidLevel: '0',
      configuration: {
        diskCount: 4,
        diskSize: 2,
        mediaType: 'SSD',
      },
      name: 'Performance RAID 0 4×2TB SSD',
      description: 'High-performance configuration with no fault tolerance',
    },
  },
  {
    id: 'generic-raid5-5x8tb',
    vendor: 'Generic',
    name: 'Balanced RAID 5',
    description: '5×8TB drives in RAID 5 for good capacity and protection',
    popular: true,
    tags: ['balanced', 'cost-effective', 'general-purpose'],
    configuration: {
      raidLevel: '5',
      configuration: {
        diskCount: 5,
        diskSize: 8,
        mediaType: 'HDD',
      },
      name: 'Balanced RAID 5 5×8TB',
      description: 'Well-balanced configuration for general-purpose storage',
    },
  },
];

/**
 * Get presets by vendor
 */
export function getPresetsByVendor(vendor: string): VendorPreset[] {
  return VENDOR_PRESETS.filter(preset => preset.vendor === vendor);
}

/**
 * Get popular presets
 */
export function getPopularPresets(): VendorPreset[] {
  return VENDOR_PRESETS.filter(preset => preset.popular);
}

/**
 * Get presets by tag
 */
export function getPresetsByTag(tag: string): VendorPreset[] {
  return VENDOR_PRESETS.filter(preset => preset.tags.includes(tag));
}

/**
 * Get preset by ID
 */
export function getPresetById(id: string): VendorPreset | undefined {
  return VENDOR_PRESETS.find(preset => preset.id === id);
}

/**
 * Get all available vendors
 */
export function getAvailableVendors(): string[] {
  return [...new Set(VENDOR_PRESETS.map(preset => preset.vendor))];
}

/**
 * Get all available tags
 */
export function getAvailableTags(): string[] {
  const allTags = VENDOR_PRESETS.flatMap(preset => preset.tags);
  return [...new Set(allTags)].sort();
}

/**
 * Search presets by name or description
 */
export function searchPresets(query: string): VendorPreset[] {
  const lowercaseQuery = query.toLowerCase();
  return VENDOR_PRESETS.filter(preset => 
    preset.name.toLowerCase().includes(lowercaseQuery) ||
    preset.description.toLowerCase().includes(lowercaseQuery) ||
    preset.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

