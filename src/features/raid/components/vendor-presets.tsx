'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, 
  Filter, 
  Star, 
  HardDrive, 
  Zap,
  Shield,
  TrendingUp,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { VendorPreset, CalculatorForm } from '@/models/raid-schemas';
import { VENDOR_PRESETS, getPopularPresets, getAvailableVendors, getAvailableTags } from '@/models/vendor-presets';

interface VendorPresetsProps {
  onPresetSelect: (form: CalculatorForm) => void;
}

export default function VendorPresets({ onPresetSelect }: VendorPresetsProps) {
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [showAllPresets, setShowAllPresets] = useState(false);

  const vendors = useMemo(() => getAvailableVendors(), []);
  const tags = useMemo(() => getAvailableTags(), []);
  const popularPresets = useMemo(() => getPopularPresets(), []);

  const filteredPresets = useMemo(() => {
    let presets = showAllPresets ? VENDOR_PRESETS : popularPresets;
    
    if (selectedVendor !== 'all') {
      presets = presets.filter(preset => preset.vendor === selectedVendor);
    }
    
    if (selectedTag !== 'all') {
      presets = presets.filter(preset => preset.tags.includes(selectedTag));
    }
    
    return presets;
  }, [selectedVendor, selectedTag, showAllPresets, popularPresets]);

  const handlePresetClick = (preset: VendorPreset) => {
    const config = preset.configuration.configuration;
    
    if ('diskCount' in config) {
      // Uniform disk configuration
      onPresetSelect({
        raidLevel: preset.configuration.raidLevel,
        diskCount: config.diskCount,
        diskSize: config.diskSize,
        mediaType: config.mediaType,
        useMixedDisks: false,
        mixedDisks: [],
      });
    } else {
      // Mixed disk configuration
      onPresetSelect({
        raidLevel: preset.configuration.raidLevel,
        diskCount: config.disks.length,
        diskSize: config.disks[0]?.size || 1,
        mediaType: config.disks[0]?.mediaType || 'HDD',
        useMixedDisks: true,
        mixedDisks: config.disks,
      });
    }
  };

  const getVendorIcon = (vendor: string) => {
    switch (vendor) {
      case 'Synology':
        return <Server className="w-5 h-5 text-blue-500" />;
      case 'QNAP':
        return <Server className="w-5 h-5 text-orange-500" />;
      case 'ZFS':
        return <Shield className="w-5 h-5 text-green-500" />;
      default:
        return <HardDrive className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTagIcon = (tag: string) => {
    if (tag.includes('performance')) return <Zap className="w-4 h-4" />;
    if (tag.includes('enterprise') || tag.includes('business')) return <Shield className="w-4 h-4" />;
    if (tag.includes('home')) return <HardDrive className="w-4 h-4" />;
    return <TrendingUp className="w-4 h-4" />;
  };

  return (
    <motion.section
      id="vendors"
      className="section-padding"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2
            className="heading-2 text-gradient mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Popular Configurations
          </motion.h2>
          <motion.p
            className="body-large text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Quick-start with proven RAID configurations from leading NAS vendors and storage systems.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          className="glass-card mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Vendor Filter */}
              <div className="relative">
                <select
                  value={selectedVendor}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                  className="form-select pr-10 min-w-32"
                >
                  <option value="all">All Vendors</option>
                  {vendors.map(vendor => (
                    <option key={vendor} value={vendor}>{vendor}</option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div className="relative">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="form-select pr-10 min-w-32"
                >
                  <option value="all">All Categories</option>
                  {tags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Show All Toggle */}
              <button
                onClick={() => setShowAllPresets(!showAllPresets)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  showAllPresets
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-glass-white text-muted-foreground hover:text-foreground'
                }`}
              >
                {showAllPresets ? 'Popular Only' : 'Show All'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPresets.map((preset, index) => (
              <motion.div
                key={preset.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card hover:bg-white/10 cursor-pointer group transition-all duration-300 hover:scale-105"
                onClick={() => handlePresetClick(preset)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getVendorIcon(preset.vendor)}
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {preset.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{preset.vendor}</p>
                    </div>
                  </div>
                  
                  {preset.popular && (
                    <div className="flex items-center space-x-1 bg-yellow-500/20 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Popular</span>
                    </div>
                  )}
                </div>

                {/* Configuration Summary */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">RAID Level:</span>
                    <div className="font-semibold text-primary">
                      RAID {preset.configuration.raidLevel}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Disks:</span>
                    <div className="font-semibold">
                      {'diskCount' in preset.configuration.configuration
                        ? `${preset.configuration.configuration.diskCount}×${preset.configuration.configuration.diskSize}TB`
                        : `${preset.configuration.configuration.disks.length} mixed`
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Media:</span>
                    <div className="font-semibold">
                      {'diskCount' in preset.configuration.configuration
                        ? preset.configuration.configuration.mediaType
                        : 'Mixed'
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Use Case:</span>
                    <div className="font-semibold capitalize">
                      {preset.tags[0]?.replace('-', ' ') || 'General'}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {preset.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {preset.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 bg-glass-white px-2 py-1 rounded-full text-xs text-muted-foreground"
                    >
                      {getTagIcon(tag)}
                      <span className="capitalize">{tag.replace('-', ' ')}</span>
                    </span>
                  ))}
                </div>

                {/* Action */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-muted-foreground">
                    Click to configure
                  </span>
                  <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredPresets.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <HardDrive className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No presets found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or browse all available configurations.
            </p>
            <button
              onClick={() => {
                setSelectedVendor('all');
                setSelectedTag('all');
                setShowAllPresets(true);
              }}
              className="btn-primary mt-4"
            >
              Show All Presets
            </button>
          </motion.div>
        )}

        {/* Quick Links */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground mb-4">
            Need help choosing? Check out our vendor-specific guides:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {vendors.map(vendor => (
              <button
                key={vendor}
                onClick={() => {
                  setSelectedVendor(vendor);
                  setSelectedTag('all');
                }}
                className="btn-ghost flex items-center space-x-2"
              >
                {getVendorIcon(vendor)}
                <span>{vendor} Guide</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

