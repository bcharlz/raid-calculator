// src/utils/preset.adapter.ts
import type { VendorPreset, DiskConfig, PresetConfiguration, PresetConfiguration as PC } from '../features/raid/types';

/**
 * Normalize a VendorPreset into a DiskConfig[] regardless of which
 * configuration branch the preset used (uniform or mixed).
 */
export function getDisksFromPreset(preset: VendorPreset): DiskConfig[] {
  const cfg = preset.configuration.configuration;

  // Type guard for mixed configuration
  if ('disks' in cfg && Array.isArray(cfg.disks)) {
    // ensure explicit typing for each disk
    return cfg.disks.map<DiskConfig>(d => ({
      size: d.size,
      mediaType: d.mediaType,
      model: d.model,
      rpm: d.rpm
    }));
  }

  // Otherwise it's the uniform configuration { diskCount, diskSize, mediaType }
  const uniform = cfg as { diskCount: number; diskSize: number; mediaType: string };
  const count = Math.max(0, uniform.diskCount || 0);
  const size = uniform.diskSize || 0;
  const mediaType = uniform.mediaType as DiskConfig['mediaType'];

  return Array.from({ length: count }, () => ({ size, mediaType }));
}

/**
 * Convert a VendorPreset to a "component-friendly" shape where
 * the configuration is normalized to either uniform or mixed disks.
 *
 * This mirrors what your UI expects when it uses preset.configuration.disks
 * or the uniform shape.
 */
export function adaptPresetForComponent(preset: VendorPreset) {
  const disks = getDisksFromPreset(preset);

  // if no disks, return a conservative uniform config (0 count)
  if (disks.length === 0) {
    return {
      raidLevel: preset.configuration.raidLevel,
      configuration: {
        diskCount: 0,
        diskSize: 0,
        mediaType: 'HDD' as DiskConfig['mediaType'] // safe default
      },
      name: preset.name,
      description: preset.description
    };
  }

  const first = disks[0];
  const isUniform = disks.every((disk: DiskConfig) =>
    disk.size === first.size && disk.mediaType === first.mediaType
  );

  if (isUniform) {
    return {
      raidLevel: preset.configuration.raidLevel,
      configuration: {
        diskCount: disks.length,
        diskSize: first.size,
        mediaType: first.mediaType
      },
      name: preset.name,
      description: preset.description
    };
  }

  // mixed disks
  return {
    raidLevel: preset.configuration.raidLevel,
    configuration: {
      disks
    },
    name: preset.name,
    description: preset.description,
    mixedDisks: disks // optional helper property if your UI wants it
  };
}
