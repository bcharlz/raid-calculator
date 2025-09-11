// src/services/iopsEstimator.ts - FIXED VERSION
import type { RaidLevel, MediaType } from '../features/raid/types';

export interface IopsEstimate {
  randomReadIops: number;
  randomWriteIops: number;
  sequentialReadMBps: number;
  sequentialWriteMBps: number;
}

interface MediaPerformance {
  randomReadIops: number;
  randomWriteIops: number;
  sequentialReadMBps: number;
  sequentialWriteMBps: number;
}

// FIXED: Added NVME baseline
const MEDIA_BASELINES: Record<MediaType, MediaPerformance> = {
  HDD: {
    randomReadIops: 150,
    randomWriteIops: 140,
    sequentialReadMBps: 180,
    sequentialWriteMBps: 160
  },
  SSD: {
    randomReadIops: 75000,
    randomWriteIops: 65000,
    sequentialReadMBps: 550,
    sequentialWriteMBps: 520
  },
  NVME: {
    randomReadIops: 500000,
    randomWriteIops: 450000,
    sequentialReadMBps: 3500,
    sequentialWriteMBps: 3000
  }
};

const RAID_MULTIPLIERS = {
  '0': { readMultiplier: 1.0, writeMultiplier: 1.0 },
  '1': { readMultiplier: 1.0, writeMultiplier: 0.5 },
  '5': { readMultiplier: 0.9, writeMultiplier: 0.25 },
  '6': { readMultiplier: 0.9, writeMultiplier: 0.2 },
  '10': { readMultiplier: 1.0, writeMultiplier: 0.5 }
};

export function estimateIops(
  raidLevel: RaidLevel,
  diskCount: number,
  mediaType: MediaType,
  dataDisks?: number,
  customRandomReadIops?: number,
  customSequentialReadMBps?: number
): IopsEstimate {
  const baseline = MEDIA_BASELINES[mediaType];
  const multipliers = RAID_MULTIPLIERS[raidLevel];
  
  if (!baseline || !multipliers) {
    throw new Error(`Unsupported configuration: RAID ${raidLevel} with ${mediaType}`);
  }

  // Calculate effective disk count for performance
  let effectiveDiskCount = diskCount;
  switch (raidLevel) {
    case '1':
    case '10':
      effectiveDiskCount = diskCount / 2; // Only half the disks store unique data
      break;
    case '5':
      effectiveDiskCount = diskCount - 1; // One disk for parity
      break;
    case '6':
      effectiveDiskCount = diskCount - 2; // Two disks for parity
      break;
    default:
      effectiveDiskCount = diskCount;
  }

  // Calculate base IOPS
  const baseRandomReadIops = customRandomReadIops || baseline.randomReadIops;
  const baseSequentialReadMBps = customSequentialReadMBps || baseline.sequentialReadMBps;

  const randomReadIops = Math.round(
    baseRandomReadIops * effectiveDiskCount * multipliers.readMultiplier
  );

  const randomWriteIops = Math.round(
    baseline.randomWriteIops * effectiveDiskCount * multipliers.writeMultiplier
  );

  const sequentialReadMBps = Math.round(
    baseSequentialReadMBps * effectiveDiskCount * multipliers.readMultiplier
  );

  const sequentialWriteMBps = Math.round(
    baseline.sequentialWriteMBps * effectiveDiskCount * multipliers.writeMultiplier
  );

  return {
    randomReadIops,
    randomWriteIops,
    sequentialReadMBps,
    sequentialWriteMBps
  };
}

// Helper function to get media type recommendations
export function getMediaTypeRecommendation(useCase: 'general' | 'performance' | 'capacity'): MediaType {
  switch (useCase) {
    case 'performance':
      return 'NVME';
    case 'general':
      return 'SSD';
    case 'capacity':
      return 'HDD';
    default:
      return 'SSD';
  }
}

// Helper function to format IOPS values
export function formatIopsValue(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}