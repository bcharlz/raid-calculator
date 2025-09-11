// src/utils/interface-adapters.ts
// Helper functions to bridge interface differences between components

import type { IopsEstimate } from '../features/raid/types';

// Convert service IopsEstimate to component expected format
export function adaptIopsEstimateForDisplay(serviceIops: IopsEstimate): any {
  return {
    randomRead: serviceIops.randomReadIops,
    randomWrite: serviceIops.randomWriteIops,
    sequentialRead: serviceIops.sequentialReadMBps,
    sequentialWrite: serviceIops.sequentialWriteMBps,
    notes: [] // Add empty notes array if expected by component
  };
}

// Convert component format back to service format
export function adaptDisplayIopsToService(displayIops: any): IopsEstimate {
  return {
    randomReadIops: displayIops.randomRead || displayIops.randomReadIops || 0,
    randomWriteIops: displayIops.randomWrite || displayIops.randomWriteIops || 0,
    sequentialReadMBps: displayIops.sequentialRead || displayIops.sequentialReadMBps || 0,
    sequentialWriteMBps: displayIops.sequentialWrite || displayIops.sequentialWriteMBps || 0
  };
}

// Helper to determine the actual interface needed by ResultsDisplay
export function createDisplayCompatibleIops(iops: IopsEstimate): any {
  // Try both formats to see which one the component expects
  return {
    // Service format (what we have)
    randomReadIops: iops.randomReadIops,
    randomWriteIops: iops.randomWriteIops,
    sequentialReadMBps: iops.sequentialReadMBps,
    sequentialWriteMBps: iops.sequentialWriteMBps,
    
    // Component format (what it might expect)
    randomRead: iops.randomReadIops,
    randomWrite: iops.randomWriteIops,
    sequentialRead: iops.sequentialReadMBps,
    sequentialWrite: iops.sequentialWriteMBps,
    notes: []
  };
}