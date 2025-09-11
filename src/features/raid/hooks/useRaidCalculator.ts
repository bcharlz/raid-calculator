// src/features/raid/hooks/useRaidCalculator.ts
import { useState, useCallback } from 'react';
import type { 
  RaidConfiguration, 
  CalculationResults, 
  UseRaidCalculatorReturn,
  RaidResults,
  IopsEstimate 
} from '../types';
import { calculateRaid } from '../../../services/raidCalc';
import { estimateIops } from '../../../services/iopsEstimator';

export function useRaidCalculator(): UseRaidCalculatorReturn {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(async (config: RaidConfiguration) => {
    try {
      setIsCalculating(true);
      setError(null);

      // Calculate RAID results - convert config to match service expectations
      const serviceConfig = {
        raidLevel: config.raidLevel,
        disks: config.disks,
        uniformSize: config.uniformSize,
        diskCount: config.diskCount
      };
      
      const raidResults: RaidResults = calculateRaid(serviceConfig);
      
      // Calculate IOPS estimates - fix function call
      const iopsResults: IopsEstimate = estimateIops(
        config.raidLevel,
        config.diskCount || config.disks.length,
        config.mediaType || config.disks[0]?.mediaType || 'HDD'
      );

      const calculationResults: CalculationResults = {
        raid: raidResults,
        iops: iopsResults
      };

      setResults(calculationResults);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Calculation failed';
      setError(errorMessage);
      console.error('RAID calculation error:', err);
    } finally {
      setIsCalculating(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults(null);
    setError(null);
    setIsCalculating(false);
  }, []);

  return {
    results,
    isCalculating,
    error,
    calculate,
    reset
  };
}