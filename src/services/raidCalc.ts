// src/services/raidCalc.ts - FIXED for downlevel iteration
import type { RaidResults } from '../features/raid/types';

export type MediaType = 'HDD' | 'SSD' | 'NVME';
export type RaidLevel = '0' | '1' | '5' | '6' | '10';

export interface RaidDisk {
  size: number;
  mediaType: MediaType;
  model?: string;
  rpm?: number;
}

export interface RaidConfiguration {
  raidLevel: RaidLevel;
  disks: RaidDisk[];
  uniformSize?: number;
  diskCount?: number;
}

export function calculateRaid(config: RaidConfiguration): RaidResults {
  const { raidLevel, disks, uniformSize, diskCount } = config;
  
  // Handle uniform vs mixed disk configurations
  let actualDisks: RaidDisk[];
  if (disks.length === 0 && uniformSize && diskCount) {
    // Create uniform disks
    actualDisks = Array(diskCount).fill(null).map(() => ({
      size: uniformSize,
      mediaType: 'HDD' as MediaType
    }));
  } else {
    actualDisks = disks;
  }

  if (actualDisks.length === 0) {
    throw new Error('No disks configured');
  }

  // Get unique sizes - FIXED for downlevel iteration
  const sizes: number[] = [];
  actualDisks.forEach(disk => {
    if (!sizes.includes(disk.size)) {
      sizes.push(disk.size);
    }
  });
  const uniqueSizes = sizes;

  // Use smallest disk size for calculations (common RAID behavior)
  const smallestSize = Math.min(...actualDisks.map(d => d.size));
  const totalRawCapacity = actualDisks.length * smallestSize;

  let usableCapacity: number;
  let efficiency: number;
  let faultTolerance: number;
  let parityOverhead: number;
  let description: string;
  const warnings: string[] = [];

  switch (raidLevel) {
    case '0':
      usableCapacity = totalRawCapacity;
      efficiency = 1.0;
      faultTolerance = 0;
      parityOverhead = 0;
      description = `RAID 0 with ${actualDisks.length} disks provides maximum performance but no fault tolerance`;
      if (actualDisks.length < 2) {
        warnings.push('RAID 0 requires at least 2 disks');
      }
      warnings.push('RAID 0 provides no data protection - any disk failure results in total data loss');
      break;

    case '1':
      usableCapacity = totalRawCapacity / 2;
      efficiency = 0.5;
      faultTolerance = Math.floor(actualDisks.length / 2);
      parityOverhead = totalRawCapacity / 2;
      description = `RAID 1 with ${actualDisks.length} disks provides excellent fault tolerance with 50% capacity efficiency`;
      if (actualDisks.length < 2) {
        warnings.push('RAID 1 requires at least 2 disks');
      }
      if (actualDisks.length % 2 !== 0) {
        warnings.push('RAID 1 works best with an even number of disks');
      }
      break;

    case '5':
      usableCapacity = (actualDisks.length - 1) * smallestSize;
      efficiency = (actualDisks.length - 1) / actualDisks.length;
      faultTolerance = 1;
      parityOverhead = smallestSize;
      description = `RAID 5 with ${actualDisks.length} disks provides good balance of capacity, performance, and protection`;
      if (actualDisks.length < 3) {
        warnings.push('RAID 5 requires at least 3 disks');
      }
      if (actualDisks.length > 8) {
        warnings.push('RAID 5 with many disks increases rebuild risk and time');
      }
      break;

    case '6':
      usableCapacity = (actualDisks.length - 2) * smallestSize;
      efficiency = (actualDisks.length - 2) / actualDisks.length;
      faultTolerance = 2;
      parityOverhead = 2 * smallestSize;
      description = `RAID 6 with ${actualDisks.length} disks provides enhanced protection with dual parity`;
      if (actualDisks.length < 4) {
        warnings.push('RAID 6 requires at least 4 disks');
      }
      break;

    case '10':
      usableCapacity = totalRawCapacity / 2;
      efficiency = 0.5;
      faultTolerance = actualDisks.length / 2;
      parityOverhead = totalRawCapacity / 2;
      description = `RAID 10 with ${actualDisks.length} disks combines mirroring and striping for high performance and reliability`;
      if (actualDisks.length < 4) {
        warnings.push('RAID 10 requires at least 4 disks');
      }
      if (actualDisks.length % 2 !== 0) {
        warnings.push('RAID 10 requires an even number of disks');
      }
      break;

    default:
      throw new Error(`Unsupported RAID level: ${raidLevel}`);
  }

  // Add mixed disk size warnings
  if (uniqueSizes.length > 1) {
    const maxSize = Math.max(...uniqueSizes);
    const minSize = Math.min(...uniqueSizes);
    if (maxSize > minSize * 1.5) {
      warnings.push('Mixed disk sizes detected - capacity limited by smallest disk');
    }
  }

  // Calculate stripe size (simplified)
  const stripeSize = raidLevel === '0' || raidLevel === '5' || raidLevel === '6' 
    ? 64 // KB, typical default
    : raidLevel === '10' 
    ? 32 // KB, smaller for RAID 10
    : 0; // No striping for RAID 1

  return {
    description,
    usableCapacity: Math.round(usableCapacity * 1000) / 1000, // Round to 3 decimal places
    totalCapacity: Math.round(totalRawCapacity * 1000) / 1000,
    efficiency: Math.round(efficiency * 10000) / 10000, // Round to 4 decimal places
    faultTolerance,
    parityOverhead: Math.round(parityOverhead * 1000) / 1000,
    stripeSize,
    warnings
  };
}

// Helper function to get RAID level recommendations
export function getRaidRecommendations(diskCount: number, primaryUse: 'performance' | 'capacity' | 'protection'): RaidLevel[] {
  const recommendations: RaidLevel[] = [];

  if (diskCount >= 2) {
    if (primaryUse === 'performance') {
      recommendations.push('0');
      if (diskCount >= 4 && diskCount % 2 === 0) {
        recommendations.push('10');
      }
    }
    
    if (primaryUse === 'protection') {
      recommendations.push('1');
      if (diskCount >= 4) {
        recommendations.push('6');
      }
    }
    
    if (primaryUse === 'capacity') {
      if (diskCount >= 3) {
        recommendations.push('5');
      }
      if (diskCount >= 4) {
        recommendations.push('6');
      }
    }
  }

  return recommendations;
}

// Helper function to validate RAID configuration
export function validateRaidConfig(config: RaidConfiguration): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const { raidLevel, disks, uniformSize, diskCount } = config;

  let actualDiskCount = disks.length;
  if (actualDiskCount === 0 && diskCount) {
    actualDiskCount = diskCount;
  }

  if (actualDiskCount === 0) {
    errors.push('No disks configured');
    return { isValid: false, errors };
  }

  switch (raidLevel) {
    case '0':
      if (actualDiskCount < 2) {
        errors.push('RAID 0 requires at least 2 disks');
      }
      break;
    case '1':
      if (actualDiskCount < 2) {
        errors.push('RAID 1 requires at least 2 disks');
      }
      break;
    case '5':
      if (actualDiskCount < 3) {
        errors.push('RAID 5 requires at least 3 disks');
      }
      break;
    case '6':
      if (actualDiskCount < 4) {
        errors.push('RAID 6 requires at least 4 disks');
      }
      break;
    case '10':
      if (actualDiskCount < 4) {
        errors.push('RAID 10 requires at least 4 disks');
      }
      if (actualDiskCount % 2 !== 0) {
        errors.push('RAID 10 requires an even number of disks');
      }
      break;
    default:
      errors.push(`Unsupported RAID level: ${raidLevel}`);
  }

  return { isValid: errors.length === 0, errors };
}