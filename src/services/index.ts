// src/services/index.ts
// Barrel exports for all services - FIXED VERSION

export { calculateRaid } from './raidCalc';
export { estimateIops } from './iopsEstimator';
export { 
  generateShareableLink, 
  // parseConfigFromUrl,  // Remove this until the function exists
  updateUrl 
} from './urlSerializer';

// Re-export types
export type {
  RaidConfiguration,
  RaidResults,
  IopsEstimate,
  SerializedConfig
} from '../features/raid/types';