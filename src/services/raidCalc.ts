/**
 * Core RAID calculation service
 * Handles capacity, efficiency, fault tolerance calculations for RAID 0/1/5/6/10
 */

export type RaidLevel = '0' | '1' | '5' | '6' | '10';
export type MediaType = 'HDD' | 'SSD';

export interface RaidDisk {
  size: number; // Size in TB
  mediaType: MediaType;
}

export interface RaidConfiguration {
  disks: RaidDisk[];
  raidLevel: RaidLevel;
  uniformSize?: number; // For uniform disk setups
  diskCount?: number; // For uniform disk setups
}

export interface RaidResults {
  usableCapacity: number; // TB
  totalCapacity: number; // TB
  efficiency: number; // Percentage (0-100)
  faultTolerance: number; // Number of disks that can fail
  parityOverhead: number; // TB
  stripeSize: number; // Number of data disks
  description: string;
  warnings: string[];
}

/**
 * Calculate RAID configuration results
 */
export function calculateRaid(config: RaidConfiguration): RaidResults {
  const { raidLevel } = config;
  
  // Determine disk configuration
  const disks = config.disks.length > 0 
    ? config.disks 
    : Array(config.diskCount || 0).fill({ 
        size: config.uniformSize || 0, 
        mediaType: 'HDD' as MediaType 
      });

  if (disks.length === 0) {
    throw new Error('No disks specified');
  }

  const totalCapacity = disks.reduce((sum, disk) => sum + disk.size, 0);
  const diskCount = disks.length;
  const warnings: string[] = [];

  // Validate minimum disk requirements
  validateMinimumDisks(raidLevel, diskCount);

  // Check for mixed disk sizes
  const uniqueSizes = [...new Set(disks.map(d => d.size))];
  if (uniqueSizes.length > 1) {
    warnings.push('Mixed disk sizes detected. Calculations based on smallest disk size.');
  }

  // Use smallest disk size for calculations (RAID limitation)
  const effectiveDiskSize = Math.min(...disks.map(d => d.size));
  const effectiveTotalCapacity = effectiveDiskSize * diskCount;

  let results: RaidResults;

  switch (raidLevel) {
    case '0':
      results = calculateRaid0(diskCount, effectiveDiskSize, effectiveTotalCapacity);
      break;
    case '1':
      results = calculateRaid1(diskCount, effectiveDiskSize, effectiveTotalCapacity);
      break;
    case '5':
      results = calculateRaid5(diskCount, effectiveDiskSize, effectiveTotalCapacity);
      break;
    case '6':
      results = calculateRaid6(diskCount, effectiveDiskSize, effectiveTotalCapacity);
      break;
    case '10':
      results = calculateRaid10(diskCount, effectiveDiskSize, effectiveTotalCapacity);
      break;
    default:
      throw new Error(`Unsupported RAID level: ${raidLevel}`);
  }

  results.warnings = warnings;
  results.totalCapacity = totalCapacity;

  return results;
}

/**
 * RAID 0 - Striping (no redundancy)
 */
function calculateRaid0(diskCount: number, diskSize: number, totalCapacity: number): RaidResults {
  return {
    usableCapacity: totalCapacity,
    totalCapacity,
    efficiency: 100,
    faultTolerance: 0,
    parityOverhead: 0,
    stripeSize: diskCount,
    description: 'RAID 0 provides maximum performance and capacity but no fault tolerance. Any disk failure results in total data loss.',
    warnings: []
  };
}

/**
 * RAID 1 - Mirroring
 */
function calculateRaid1(diskCount: number, diskSize: number, totalCapacity: number): RaidResults {
  if (diskCount % 2 !== 0) {
    throw new Error('RAID 1 requires an even number of disks');
  }

  const usableCapacity = totalCapacity / 2;
  
  return {
    usableCapacity,
    totalCapacity,
    efficiency: 50,
    faultTolerance: diskCount / 2,
    parityOverhead: usableCapacity,
    stripeSize: 1,
    description: 'RAID 1 mirrors data across disk pairs, providing excellent fault tolerance at 50% capacity efficiency.',
    warnings: []
  };
}

/**
 * RAID 5 - Striping with distributed parity
 */
function calculateRaid5(diskCount: number, diskSize: number, totalCapacity: number): RaidResults {
  const usableCapacity = (diskCount - 1) * diskSize;
  const efficiency = ((diskCount - 1) / diskCount) * 100;
  
  return {
    usableCapacity,
    totalCapacity,
    efficiency: Math.round(efficiency * 100) / 100,
    faultTolerance: 1,
    parityOverhead: diskSize,
    stripeSize: diskCount - 1,
    description: 'RAID 5 distributes parity across all disks, tolerating one disk failure with good capacity efficiency.',
    warnings: []
  };
}

/**
 * RAID 6 - Striping with dual distributed parity
 */
function calculateRaid6(diskCount: number, diskSize: number, totalCapacity: number): RaidResults {
  const usableCapacity = (diskCount - 2) * diskSize;
  const efficiency = ((diskCount - 2) / diskCount) * 100;
  
  return {
    usableCapacity,
    totalCapacity,
    efficiency: Math.round(efficiency * 100) / 100,
    faultTolerance: 2,
    parityOverhead: diskSize * 2,
    stripeSize: diskCount - 2,
    description: 'RAID 6 uses dual parity for enhanced fault tolerance, surviving two simultaneous disk failures.',
    warnings: []
  };
}

/**
 * RAID 10 - Mirrored stripes
 */
function calculateRaid10(diskCount: number, diskSize: number, totalCapacity: number): RaidResults {
  if (diskCount % 2 !== 0) {
    throw new Error('RAID 10 requires an even number of disks');
  }
  
  if (diskCount < 4) {
    throw new Error('RAID 10 requires at least 4 disks');
  }

  const usableCapacity = totalCapacity / 2;
  const maxFailures = Math.floor(diskCount / 2);
  
  return {
    usableCapacity,
    totalCapacity,
    efficiency: 50,
    faultTolerance: maxFailures,
    parityOverhead: usableCapacity,
    stripeSize: diskCount / 2,
    description: 'RAID 10 combines mirroring and striping for high performance and fault tolerance.',
    warnings: []
  };
}

/**
 * Validate minimum disk requirements for each RAID level
 */
function validateMinimumDisks(raidLevel: RaidLevel, diskCount: number): void {
  const minimums: Record<RaidLevel, number> = {
    '0': 2,
    '1': 2,
    '5': 3,
    '6': 4,
    '10': 4
  };

  const required = minimums[raidLevel];
  if (diskCount < required) {
    throw new Error(`RAID ${raidLevel} requires at least ${required} disks, got ${diskCount}`);
  }

  // Additional validations
  if (raidLevel === '1' && diskCount % 2 !== 0) {
    throw new Error('RAID 1 requires an even number of disks');
  }

  if (raidLevel === '10' && diskCount % 2 !== 0) {
    throw new Error('RAID 10 requires an even number of disks');
  }
}

/**
 * Get RAID level recommendations based on use case
 */
export function getRaidRecommendations(diskCount: number, priority: 'performance' | 'capacity' | 'reliability'): RaidLevel[] {
  const recommendations: RaidLevel[] = [];

  switch (priority) {
    case 'performance':
      if (diskCount >= 2) recommendations.push('0');
      if (diskCount >= 4 && diskCount % 2 === 0) recommendations.push('10');
      if (diskCount >= 3) recommendations.push('5');
      break;
      
    case 'capacity':
      if (diskCount >= 3) recommendations.push('5');
      if (diskCount >= 4) recommendations.push('6');
      if (diskCount >= 2) recommendations.push('0');
      break;
      
    case 'reliability':
      if (diskCount >= 4) recommendations.push('6');
      if (diskCount >= 4 && diskCount % 2 === 0) recommendations.push('10');
      if (diskCount >= 2 && diskCount % 2 === 0) recommendations.push('1');
      if (diskCount >= 3) recommendations.push('5');
      break;
  }

  return recommendations;
}

