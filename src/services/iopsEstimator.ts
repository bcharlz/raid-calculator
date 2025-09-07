/**
 * IOPS estimation service for RAID configurations
 * Provides rough performance estimates based on RAID level and media type
 */

import { RaidLevel, MediaType } from './raidCalc';

export interface IopsEstimate {
  randomRead: number;
  randomWrite: number;
  sequentialRead: number;
  sequentialWrite: number;
  notes: string[];
}

export interface MediaPerformance {
  randomReadIops: number;
  randomWriteIops: number;
  sequentialReadMBps: number;
  sequentialWriteMBps: number;
}

/**
 * Baseline performance characteristics for different media types
 */
const MEDIA_BASELINES: Record<MediaType, MediaPerformance> = {
  HDD: {
    randomReadIops: 150,      // Typical 7200 RPM HDD
    randomWriteIops: 140,
    sequentialReadMBps: 180,
    sequentialWriteMBps: 160,
  },
  SSD: {
    randomReadIops: 75000,    // Typical SATA SSD
    randomWriteIops: 65000,
    sequentialReadMBps: 550,
    sequentialWriteMBps: 520,
  }
};

/**
 * RAID level performance multipliers and characteristics
 */
interface RaidPerformanceProfile {
  randomReadMultiplier: number;
  randomWriteMultiplier: number;
  sequentialReadMultiplier: number;
  sequentialWriteMultiplier: number;
  writeAmplification: number;
  notes: string[];
}

const RAID_PROFILES: Record<RaidLevel, RaidPerformanceProfile> = {
  '0': {
    randomReadMultiplier: 1.0,    // Scales with disk count
    randomWriteMultiplier: 1.0,   // Scales with disk count
    sequentialReadMultiplier: 1.0, // Scales with disk count
    sequentialWriteMultiplier: 1.0, // Scales with disk count
    writeAmplification: 1.0,
    notes: [
      'Performance scales linearly with disk count',
      'No fault tolerance - any disk failure causes data loss',
      'Best performance for both reads and writes'
    ]
  },
  '1': {
    randomReadMultiplier: 1.8,    // Can read from multiple mirrors
    randomWriteMultiplier: 0.5,   // Must write to all mirrors
    sequentialReadMultiplier: 1.0, // Limited by single disk
    sequentialWriteMultiplier: 0.5, // Must write to all mirrors
    writeAmplification: 2.0,
    notes: [
      'Read performance can benefit from multiple mirrors',
      'Write performance limited by mirroring overhead',
      'Excellent fault tolerance'
    ]
  },
  '5': {
    randomReadMultiplier: 0.9,    // Scales with data disks
    randomWriteMultiplier: 0.25,  // Parity calculation overhead
    sequentialReadMultiplier: 0.9, // Scales with data disks
    sequentialWriteMultiplier: 0.4, // Parity overhead
    writeAmplification: 4.0,      // Read-modify-write cycle
    notes: [
      'Good read performance scaling',
      'Write performance significantly impacted by parity calculations',
      'Small random writes are particularly affected'
    ]
  },
  '6': {
    randomReadMultiplier: 0.85,   // Scales with data disks
    randomWriteMultiplier: 0.2,   // Dual parity overhead
    sequentialReadMultiplier: 0.85, // Scales with data disks
    sequentialWriteMultiplier: 0.35, // Dual parity overhead
    writeAmplification: 6.0,      // More complex parity calculations
    notes: [
      'Similar read performance to RAID 5',
      'Write performance further reduced by dual parity',
      'Higher CPU overhead for parity calculations'
    ]
  },
  '10': {
    randomReadMultiplier: 1.8,    // Can read from multiple mirrors
    randomWriteMultiplier: 0.5,   // Must write to mirrors
    sequentialReadMultiplier: 0.9, // Striping benefit
    sequentialWriteMultiplier: 0.5, // Mirroring overhead
    writeAmplification: 2.0,
    notes: [
      'Combines benefits of RAID 0 and RAID 1',
      'Excellent read performance',
      'Better write performance than RAID 5/6'
    ]
  }
};

/**
 * Estimate IOPS for a RAID configuration
 */
export function estimateIops(
  raidLevel: RaidLevel,
  diskCount: number,
  mediaType: MediaType,
  dataDisks?: number,
  customRandomReadIops?: number,
  customSequentialReadMBps?: number
): IopsEstimate {
  const baseline = MEDIA_BASELINES[mediaType];
  const profile = RAID_PROFILES[raidLevel];
  
  // Calculate effective disk count for performance scaling
  const effectiveDataDisks = dataDisks || getDataDiskCount(raidLevel, diskCount);
  
  // Use custom values if provided, otherwise use baseline
  const baseRandomRead = customRandomReadIops || baseline.randomReadIops;
  const baseRandomWrite = baseline.randomWriteIops;
  const baseSeqRead = customSequentialReadMBps || baseline.sequentialReadMBps;
  const baseSeqWrite = baseline.sequentialWriteMBps;
  
  // Apply RAID-specific multipliers
  let randomRead = baseRandomRead * profile.randomReadMultiplier;
  let randomWrite = baseRandomWrite * profile.randomWriteMultiplier;
  let sequentialRead = baseSeqRead * profile.sequentialReadMultiplier;
  let sequentialWrite = baseSeqWrite * profile.sequentialWriteMultiplier;
  
  // Scale by effective disk count for striping benefits
  if (raidLevel === '0' || raidLevel === '5' || raidLevel === '6') {
    randomRead *= effectiveDataDisks;
    sequentialRead *= effectiveDataDisks;
  }
  
  if (raidLevel === '0') {
    randomWrite *= diskCount;
    sequentialWrite *= diskCount;
  }
  
  // RAID 10 scaling
  if (raidLevel === '10') {
    const stripeCount = diskCount / 2;
    randomRead *= stripeCount * 0.9; // Slight overhead
    sequentialRead *= stripeCount * 0.9;
  }
  
  // Apply media-specific adjustments
  const notes = [...profile.notes];
  
  if (mediaType === 'HDD') {
    notes.push('HDD performance varies significantly with workload patterns');
    notes.push('Sequential workloads perform much better than random');
  } else {
    notes.push('SSD performance more consistent across workload types');
    if (profile.writeAmplification > 2) {
      notes.push('High write amplification may impact SSD lifespan');
    }
  }
  
  return {
    randomRead: Math.round(randomRead),
    randomWrite: Math.round(randomWrite),
    sequentialRead: Math.round(sequentialRead),
    sequentialWrite: Math.round(sequentialWrite),
    notes
  };
}

/**
 * Get the number of data disks for a RAID level
 */
function getDataDiskCount(raidLevel: RaidLevel, totalDisks: number): number {
  switch (raidLevel) {
    case '0':
      return totalDisks;
    case '1':
      return totalDisks / 2;
    case '5':
      return totalDisks - 1;
    case '6':
      return totalDisks - 2;
    case '10':
      return totalDisks / 2;
    default:
      return totalDisks;
  }
}

/**
 * Get performance comparison between RAID levels
 */
export function compareRaidPerformance(
  diskCount: number,
  mediaType: MediaType
): Record<RaidLevel, IopsEstimate> {
  const results: Partial<Record<RaidLevel, IopsEstimate>> = {};
  
  // Only include valid RAID levels for the disk count
  const validLevels = getValidRaidLevels(diskCount);
  
  for (const level of validLevels) {
    try {
      results[level] = estimateIops(level, diskCount, mediaType);
    } catch (error) {
      // Skip invalid configurations
    }
  }
  
  return results as Record<RaidLevel, IopsEstimate>;
}

/**
 * Get valid RAID levels for a given disk count
 */
function getValidRaidLevels(diskCount: number): RaidLevel[] {
  const levels: RaidLevel[] = [];
  
  if (diskCount >= 2) levels.push('0');
  if (diskCount >= 2 && diskCount % 2 === 0) levels.push('1');
  if (diskCount >= 3) levels.push('5');
  if (diskCount >= 4) levels.push('6');
  if (diskCount >= 4 && diskCount % 2 === 0) levels.push('10');
  
  return levels;
}

/**
 * Get performance recommendations based on workload
 */
export function getPerformanceRecommendations(
  workloadType: 'database' | 'fileserver' | 'backup' | 'virtualization',
  diskCount: number,
  mediaType: MediaType
): { recommended: RaidLevel[]; notes: string[] } {
  const notes: string[] = [];
  let recommended: RaidLevel[] = [];
  
  switch (workloadType) {
    case 'database':
      recommended = ['10', '1', '5'];
      notes.push('Database workloads benefit from low write latency');
      notes.push('RAID 10 provides best balance of performance and reliability');
      if (mediaType === 'SSD') {
        notes.push('SSDs significantly improve database performance');
      }
      break;
      
    case 'fileserver':
      recommended = ['5', '6', '10'];
      notes.push('File servers typically have mixed read/write patterns');
      notes.push('RAID 5 offers good balance for most file serving workloads');
      break;
      
    case 'backup':
      recommended = ['6', '5'];
      notes.push('Backup systems prioritize capacity and reliability');
      notes.push('Write performance is less critical for backup workloads');
      break;
      
    case 'virtualization':
      recommended = ['10', '5'];
      notes.push('VMs generate mixed I/O patterns with burst activity');
      notes.push('Low latency is important for VM responsiveness');
      if (mediaType === 'SSD') {
        notes.push('SSDs highly recommended for virtualization');
      }
      break;
  }
  
  // Filter by available disk count
  const validLevels = getValidRaidLevels(diskCount);
  recommended = recommended.filter(level => validLevels.includes(level));
  
  return { recommended, notes };
}

