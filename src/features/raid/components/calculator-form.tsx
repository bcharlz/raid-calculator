'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  Settings, 
  HardDrive,
  Zap,
  ChevronDown,
  Info
} from 'lucide-react';
import { 
  RaidLevel, 
  MediaType, 
  CalculatorForm,
  RaidDisk,
  RAID_LEVEL_NAMES,
  MEDIA_TYPE_NAMES,
  MIN_DISKS_FOR_RAID
} from '@/models/raid-schemas';

interface CalculatorFormProps {
  value: CalculatorForm;
  onChange: (form: CalculatorForm) => void;
  onCalculate: () => void;
  isCalculating?: boolean;
}

export default function CalculatorFormComponent({ 
  value, 
  onChange, 
  onCalculate,
  isCalculating = false 
}: CalculatorFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFieldChange = useCallback((field: keyof CalculatorForm, newValue: any) => {
    const updatedForm = { ...value, [field]: newValue };
    
    // Auto-adjust disk count for RAID level requirements
    if (field === 'raidLevel') {
      const minDisks = MIN_DISKS_FOR_RAID[newValue as RaidLevel];
      if (updatedForm.diskCount < minDisks) {
        updatedForm.diskCount = minDisks;
      }
      
      // Ensure even number for RAID 1 and 10
      if ((newValue === '1' || newValue === '10') && updatedForm.diskCount % 2 !== 0) {
        updatedForm.diskCount += 1;
      }
    }
    
    onChange(updatedForm);
  }, [value, onChange]);

  const handleMixedDiskChange = useCallback((index: number, disk: RaidDisk) => {
    const newMixedDisks = [...(value.mixedDisks || [])];
    newMixedDisks[index] = disk;
    handleFieldChange('mixedDisks', newMixedDisks);
  }, [value.mixedDisks, handleFieldChange]);

  const addMixedDisk = useCallback(() => {
    const newDisk: RaidDisk = { size: 1, mediaType: 'HDD' };
    const newMixedDisks = [...(value.mixedDisks || []), newDisk];
    handleFieldChange('mixedDisks', newMixedDisks);
  }, [value.mixedDisks, handleFieldChange]);

  const removeMixedDisk = useCallback((index: number) => {
    const newMixedDisks = (value.mixedDisks || []).filter((_, i) => i !== index);
    handleFieldChange('mixedDisks', newMixedDisks);
  }, [value.mixedDisks, handleFieldChange]);

  const resetForm = useCallback(() => {
    onChange({
      raidLevel: '5',
      diskCount: 4,
      diskSize: 4,
      mediaType: 'HDD',
      useMixedDisks: false,
      mixedDisks: [],
    });
  }, [onChange]);

  const raidLevels: { value: RaidLevel; label: string; description: string }[] = [
    { value: '0', label: 'RAID 0', description: 'Striping - Max performance, no redundancy' },
    { value: '1', label: 'RAID 1', description: 'Mirroring - 50% capacity, excellent redundancy' },
    { value: '5', label: 'RAID 5', description: 'Striping + Parity - Good balance' },
    { value: '6', label: 'RAID 6', description: 'Dual Parity - Maximum protection' },
    { value: '10', label: 'RAID 10', description: 'Mirrored Stripes - High performance + redundancy' },
  ];

  const mediaTypes: { value: MediaType; label: string; icon: React.ReactNode }[] = [
    { value: 'HDD', label: 'Hard Disk Drive', icon: <HardDrive className="w-4 h-4" /> },
    { value: 'SSD', label: 'Solid State Drive', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <motion.div
      className="glass-card space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="heading-3 text-gradient">RAID Configuration</h2>
        <button
          onClick={resetForm}
          className="btn-ghost p-2"
          title="Reset form"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RAID Level Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            RAID Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
            {raidLevels.map((raid) => (
              <motion.button
                key={raid.value}
                onClick={() => handleFieldChange('raidLevel', raid.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  value.raidLevel === raid.value
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-glass-border bg-glass-white hover:border-primary/50 hover:bg-primary/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-semibold text-foreground">{raid.label}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {raid.description}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Disk Configuration */}
        <div className="space-y-6">
          {/* Uniform vs Mixed Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleFieldChange('useMixedDisks', false)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                !value.useMixedDisks
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-glass-white text-muted-foreground hover:text-foreground'
              }`}
            >
              Uniform Disks
            </button>
            <button
              onClick={() => handleFieldChange('useMixedDisks', true)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                value.useMixedDisks
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-glass-white text-muted-foreground hover:text-foreground'
              }`}
            >
              Mixed Sizes
            </button>
          </div>

          {/* Uniform Disk Configuration */}
          {!value.useMixedDisks && (
            <div className="space-y-4">
              {/* Disk Count */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Number of Disks
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleFieldChange('diskCount', Math.max(2, value.diskCount - 1))}
                    className="btn-ghost p-2"
                    disabled={value.diskCount <= MIN_DISKS_FOR_RAID[value.raidLevel]}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min={MIN_DISKS_FOR_RAID[value.raidLevel]}
                    max="24"
                    value={value.diskCount}
                    onChange={(e) => handleFieldChange('diskCount', parseInt(e.target.value) || 2)}
                    className="form-input text-center w-20"
                  />
                  <button
                    onClick={() => handleFieldChange('diskCount', Math.min(24, value.diskCount + 1))}
                    className="btn-ghost p-2"
                    disabled={value.diskCount >= 24}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Min: {MIN_DISKS_FOR_RAID[value.raidLevel]} disks for RAID {value.raidLevel}
                </p>
              </div>

              {/* Disk Size */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Disk Size (TB)
                </label>
                <input
                  type="number"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={value.diskSize}
                  onChange={(e) => handleFieldChange('diskSize', parseFloat(e.target.value) || 1)}
                  className="form-input w-full"
                  placeholder="4.0"
                />
              </div>

              {/* Media Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Media Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {mediaTypes.map((media) => (
                    <button
                      key={media.value}
                      onClick={() => handleFieldChange('mediaType', media.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2 ${
                        value.mediaType === media.value
                          ? 'border-primary bg-primary/10'
                          : 'border-glass-border bg-glass-white hover:border-primary/50'
                      }`}
                    >
                      {media.icon}
                      <span className="font-medium">{media.value}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mixed Disk Configuration */}
          {value.useMixedDisks && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Disk Configuration
                </label>
                <button
                  onClick={addMixedDisk}
                  className="btn-ghost p-2"
                  title="Add disk"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <AnimatePresence>
                {(value.mixedDisks || []).map((disk, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center space-x-3 p-3 glass rounded-lg"
                  >
                    <span className="text-sm font-medium w-8">#{index + 1}</span>
                    <input
                      type="number"
                      min="0.1"
                      max="100"
                      step="0.1"
                      value={disk.size}
                      onChange={(e) => handleMixedDiskChange(index, {
                        ...disk,
                        size: parseFloat(e.target.value) || 1
                      })}
                      className="form-input flex-1"
                      placeholder="Size (TB)"
                    />
                    <select
                      value={disk.mediaType}
                      onChange={(e) => handleMixedDiskChange(index, {
                        ...disk,
                        mediaType: e.target.value as MediaType
                      })}
                      className="form-select w-20"
                    >
                      <option value="HDD">HDD</option>
                      <option value="SSD">SSD</option>
                    </select>
                    <button
                      onClick={() => removeMixedDisk(index)}
                      className="btn-ghost p-2 text-red-500 hover:text-red-600"
                      disabled={(value.mixedDisks || []).length <= 2}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {(value.mixedDisks || []).length < 2 && (
                <p className="text-sm text-muted-foreground">
                  Add at least 2 disks to configure mixed sizes
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Custom Performance Values (Optional) */}
      <div className="glass p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Custom Performance Values
          </h3>
          <span className="text-xs text-muted-foreground bg-glass-white px-2 py-1 rounded">
            Optional
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          If you know your disk's specific performance characteristics, enter them here. 
          Otherwise, we'll estimate based on the media type.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Custom Random Read IOPS */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Random Read IOPS
            </label>
            <input
              type="number"
              min="1"
              max="1000000"
              step="1"
              value={value.customRandomReadIops || ''}
              onChange={(e) => handleFieldChange('customRandomReadIops', 
                e.target.value ? parseFloat(e.target.value) : undefined)}
              className="form-input w-full"
              placeholder="e.g., 150 (HDD) or 75000 (SSD)"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty to use estimated values
            </p>
          </div>

          {/* Custom Sequential Read MB/s */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Sequential Read MB/s
            </label>
            <input
              type="number"
              min="0.1"
              max="10000"
              step="0.1"
              value={value.customSequentialReadMBps || ''}
              onChange={(e) => handleFieldChange('customSequentialReadMBps', 
                e.target.value ? parseFloat(e.target.value) : undefined)}
              className="form-input w-full"
              placeholder="e.g., 180 (HDD) or 550 (SSD)"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty to use estimated values
            </p>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="flex items-center justify-center pt-4">
        <motion.button
          onClick={onCalculate}
          disabled={isCalculating}
          className="btn-primary px-8 py-4 text-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCalculating ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Calculating...</span>
            </div>
          ) : (
            'Calculate RAID Configuration'
          )}
        </motion.button>
      </div>

      {/* Info Panel */}
      <div className="glass-subtle rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>RAID {value.raidLevel}</strong> requires a minimum of{' '}
              <strong>{MIN_DISKS_FOR_RAID[value.raidLevel]} disks</strong>.
            </p>
            <p>
              {value.raidLevel === '0' && 'No fault tolerance - any disk failure results in data loss.'}
              {value.raidLevel === '1' && 'Can survive failure of up to half the disks.'}
              {value.raidLevel === '5' && 'Can survive failure of 1 disk.'}
              {value.raidLevel === '6' && 'Can survive failure of up to 2 disks.'}
              {value.raidLevel === '10' && 'Can survive multiple disk failures if not in the same mirror.'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

