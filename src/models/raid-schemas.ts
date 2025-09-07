/**
 * Zod schemas and TypeScript types for RAID calculator
 * Provides validation and type safety for all RAID-related data
 */

import { z } from 'zod';

// Base enums and constants
export const RaidLevelSchema = z.enum(['0', '1', '5', '6', '10']);
export const MediaTypeSchema = z.enum(['HDD', 'SSD']);

export type RaidLevel = z.infer<typeof RaidLevelSchema>;
export type MediaType = z.infer<typeof MediaTypeSchema>;

// Disk configuration schemas
export const RaidDiskSchema = z.object({
  size: z.number().min(0.1).max(100), // 0.1TB to 100TB
  mediaType: MediaTypeSchema,
  model: z.string().optional(),
  rpm: z.number().optional(), // For HDDs
});

export const UniformDiskConfigSchema = z.object({
  diskCount: z.number().int().min(2).max(24),
  diskSize: z.number().min(0.1).max(100),
  mediaType: MediaTypeSchema,
});

export const MixedDiskConfigSchema = z.object({
  disks: z.array(RaidDiskSchema).min(2).max(24),
});

export const RaidConfigurationSchema = z.object({
  raidLevel: RaidLevelSchema,
  configuration: z.union([UniformDiskConfigSchema, MixedDiskConfigSchema]),
  name: z.string().optional(),
  description: z.string().optional(),
});

// Results schemas
export const RaidResultsSchema = z.object({
  usableCapacity: z.number(),
  totalCapacity: z.number(),
  efficiency: z.number().min(0).max(100),
  faultTolerance: z.number().int().min(0),
  parityOverhead: z.number(),
  stripeSize: z.number().int(),
  description: z.string(),
  warnings: z.array(z.string()),
});

export const IopsEstimateSchema = z.object({
  randomRead: z.number(),
  randomWrite: z.number(),
  sequentialRead: z.number(),
  sequentialWrite: z.number(),
  notes: z.array(z.string()),
});

export const CalculationResultsSchema = z.object({
  raid: RaidResultsSchema,
  performance: IopsEstimateSchema,
  timestamp: z.date(),
  configurationHash: z.string(),
});

// URL parameter schemas for sharing
export const UrlParamsSchema = z.object({
  r: RaidLevelSchema.optional(), // raid level
  c: z.string().optional(),      // disk count
  s: z.string().optional(),      // disk size
  m: MediaTypeSchema.optional(), // media type
  n: z.string().optional(),      // configuration name
  d: z.string().optional(),      // custom disks (encoded)
});

// Vendor preset schemas
export const VendorPresetSchema = z.object({
  id: z.string(),
  vendor: z.enum(['Synology', 'QNAP', 'ZFS', 'Generic']),
  name: z.string(),
  description: z.string(),
  configuration: RaidConfigurationSchema,
  popular: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

// Form validation schemas
export const CalculatorFormSchema = z.object({
  raidLevel: RaidLevelSchema,
  diskCount: z.number().int().min(2).max(24),
  diskSize: z.number().min(0.1).max(100),
  mediaType: MediaTypeSchema,
  mixedDisks: z.array(RaidDiskSchema).optional(),
  useMixedDisks: z.boolean().default(false),
  // Custom performance values (optional)
  customRandomReadIops: z.number().min(1).max(1000000).optional(),
  customSequentialReadMBps: z.number().min(0.1).max(10000).optional(),
});

// Export types
export type RaidDisk = z.infer<typeof RaidDiskSchema>;
export type UniformDiskConfig = z.infer<typeof UniformDiskConfigSchema>;
export type MixedDiskConfig = z.infer<typeof MixedDiskConfigSchema>;
export type RaidConfiguration = z.infer<typeof RaidConfigurationSchema>;
export type RaidResults = z.infer<typeof RaidResultsSchema>;
export type IopsEstimate = z.infer<typeof IopsEstimateSchema>;
export type CalculationResults = z.infer<typeof CalculationResultsSchema>;
export type UrlParams = z.infer<typeof UrlParamsSchema>;
export type VendorPreset = z.infer<typeof VendorPresetSchema>;
export type CalculatorForm = z.infer<typeof CalculatorFormSchema>;

// Validation helpers
export function validateRaidConfiguration(config: unknown): RaidConfiguration {
  return RaidConfigurationSchema.parse(config);
}

export function validateCalculatorForm(form: unknown): CalculatorForm {
  return CalculatorFormSchema.parse(form);
}

export function validateUrlParams(params: unknown): UrlParams {
  return UrlParamsSchema.parse(params);
}

// Type guards
export function isUniformConfig(config: UniformDiskConfig | MixedDiskConfig): config is UniformDiskConfig {
  return 'diskCount' in config;
}

export function isMixedConfig(config: UniformDiskConfig | MixedDiskConfig): config is MixedDiskConfig {
  return 'disks' in config;
}

// Constants for validation
export const RAID_LEVEL_NAMES: Record<RaidLevel, string> = {
  '0': 'RAID 0 (Striping)',
  '1': 'RAID 1 (Mirroring)',
  '5': 'RAID 5 (Striping + Parity)',
  '6': 'RAID 6 (Striping + Dual Parity)',
  '10': 'RAID 10 (Mirrored Stripes)',
};

export const MEDIA_TYPE_NAMES: Record<MediaType, string> = {
  'HDD': 'Hard Disk Drive',
  'SSD': 'Solid State Drive',
};

export const MIN_DISKS_FOR_RAID: Record<RaidLevel, number> = {
  '0': 2,
  '1': 2,
  '5': 3,
  '6': 4,
  '10': 4,
};

export const MAX_RECOMMENDED_DISKS: Record<RaidLevel, number> = {
  '0': 24,
  '1': 24,
  '5': 16, // Performance degrades with too many disks
  '6': 24,
  '10': 24,
};

// Error messages
export const VALIDATION_ERRORS = {
  INVALID_RAID_LEVEL: 'Invalid RAID level selected',
  INSUFFICIENT_DISKS: 'Insufficient number of disks for selected RAID level',
  INVALID_DISK_SIZE: 'Disk size must be between 0.1TB and 100TB',
  INVALID_DISK_COUNT: 'Disk count must be between 2 and 24',
  MIXED_DISKS_REQUIRED: 'At least 2 disks required for mixed configuration',
  RAID_1_EVEN_DISKS: 'RAID 1 requires an even number of disks',
  RAID_10_EVEN_DISKS: 'RAID 10 requires an even number of disks',
  RAID_10_MIN_DISKS: 'RAID 10 requires at least 4 disks',
} as const;

