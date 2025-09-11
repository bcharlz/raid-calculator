// src/features/raid/types/index.ts

// RAID levels supported by the calculator and presets.
export type RaidLevel = '0' | '1' | '5' | '6' | '10';

// Media types supported across the app.
// Include NVME to match DiskConfig definitions used in presets and adapters.
export type MediaType = 'HDD' | 'SSD' | 'NVME';

// A single disk description for mixed configurations or detailed displays.
export interface DiskConfig {
  size: number; // Size in TB (use the same unit across the app).
  mediaType: MediaType;
  model?: string;
  rpm?: number; // Optional for HDDs.
}

// Uniform configuration: N disks of the same size and media type.
export interface UniformConfiguration {
  diskCount: number;
  diskSize: number; // Size in TB.
  mediaType: MediaType;
}

// Mixed configuration: explicit list of disks.
export interface MixedConfiguration {
  disks: DiskConfig[];
}

// The core preset configuration used throughout the app.
export interface PresetConfiguration {
  raidLevel: RaidLevel;
  // Exactly one of these branches is present at runtime.
  configuration: UniformConfiguration | MixedConfiguration;

  // Some UIs store display helpers alongside the config.
  // These are optional to remain backward compatible.
  name?: string;
  description?: string;

  // Optional helper for UIs that want both normalized and raw views.
  mixedDisks?: DiskConfig[];
}

// A vendor-provided preset shown in the presets gallery.
export interface VendorPreset {
  id: string;
  vendor: string;
  name: string;
  description?: string;
  popular?: boolean;
  tags: string[];
  configuration: PresetConfiguration;
}

// If some components work with an adapted, normalized shape,
// they can use this alias. It mirrors PresetConfiguration.
export type AdaptedPreset = PresetConfiguration;

// Type guards for narrowing between uniform and mixed configurations.
export function isMixedConfiguration(
  cfg: UniformConfiguration | MixedConfiguration
): cfg is MixedConfiguration {
  return (cfg as MixedConfiguration).disks !== undefined;
}

export function isUniformConfiguration(
  cfg: UniformConfiguration | MixedConfiguration
): cfg is UniformConfiguration {
  return (cfg as UniformConfiguration).diskCount !== undefined;
}
