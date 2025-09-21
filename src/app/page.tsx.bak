'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Share2, Download, ExternalLink } from 'lucide-react';

// Components
import CalculatorFormComponent from '@/features/raid/components/calculator-form';
import ResultsDisplay from '@/features/raid/components/results-display';
import VendorPresets from '@/features/raid/components/vendor-presets';
import VendorShortcuts from '@/features/raid/VendorShortcuts';
import AdSidebar from '@/components/ads/AdSidebar';
import AdBanner from '@/components/ads/AdBanner';

// Services and Models
import { calculateRaid } from '@/services/raidCalc';
import { estimateIops } from '@/services/iopsEstimator';
import { generateShareableLink, parseCurrentUrl, updateUrl } from '@/services/urlSerializer';
import { 
  CalculatorForm as CalculatorFormType, 
  RaidResults, 
  IopsEstimate,
  validateCalculatorForm 
} from '@/models/raid-schemas';

// Import types
import type { 
  CalculationResults
} from '@/features/raid/types';

export default function HomePage() {
  // Form state
  const [form, setForm] = useState<CalculatorFormType>({
    raidLevel: '5',
    diskCount: 4,
    diskSize: 4,
    mediaType: 'HDD',
    useMixedDisks: false,
    mixedDisks: [],
    customRandomReadIops: undefined,
    customSequentialReadMBps: undefined,
  });

  // Results state
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Load configuration from URL on mount
  useEffect(() => {
    const urlConfig = parseCurrentUrl();
    if (urlConfig) {
      try {
        const config = urlConfig.configuration;
        if ('diskCount' in config) {
          setForm({
            raidLevel: urlConfig.raidLevel,
            diskCount: config.diskCount,
            diskSize: config.diskSize,
            mediaType: config.mediaType,
            useMixedDisks: false,
            mixedDisks: [],
          });
        } else {
          setForm({
            raidLevel: urlConfig.raidLevel,
            diskCount: config.disks.length,
            diskSize: config.disks[0]?.size || 1,
            mediaType: config.disks[0]?.mediaType || 'HDD',
            useMixedDisks: true,
            mixedDisks: config.disks,
          });
        }
        setTimeout(() => handleCalculate(), 100);
      } catch (error) {
        console.error('Failed to load configuration from URL:', error);
      }
    }
  }, []);

  // Update URL when form changes
  useEffect(() => {
    if (results) {
      const urlConfig = form.useMixedDisks && form.mixedDisks?.length
        ? {
            raidLevel: form.raidLevel,
            configuration: { disks: form.mixedDisks },
          }
        : {
            raidLevel: form.raidLevel,
            configuration: {
              diskCount: form.diskCount,
              diskSize: form.diskSize,
              mediaType: form.mediaType,
            },
          };
      
      updateUrl(urlConfig);
    }
  }, [form, results]);

  const handleCalculate = useCallback(async () => {
    try {
      setIsCalculating(true);
      
      const validation = validateCalculatorForm(form);
      
      const raidConfig = form.useMixedDisks && form.mixedDisks?.length
        ? {
            raidLevel: form.raidLevel,
            disks: form.mixedDisks,
          }
        : {
            raidLevel: form.raidLevel,
            uniformSize: form.diskSize,
            diskCount: form.diskCount,
            disks: [],
          };

      const raidResults = calculateRaid(raidConfig);
      
      const iopsResults = estimateIops(
        form.raidLevel,
        form.diskCount,
        form.mediaType,
        undefined,
        form.customRandomReadIops,
        form.customSequentialReadMBps
      );

      await new Promise(resolve => setTimeout(resolve, 800));

      setResults({
        raid: raidResults,
        iops: iopsResults,
      });
      
      setShowResults(true);
      
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
      
    } catch (error) {
      console.error('Calculation failed:', error);
    } finally {
      setIsCalculating(false);
    }
  }, [form]);

  const handlePresetSelect = useCallback(async (presetForm: CalculatorFormType) => {
    setForm(presetForm);
    
    setTimeout(async () => {
      try {
        setIsCalculating(true);
        
        const raidConfig = presetForm.useMixedDisks && presetForm.mixedDisks?.length
          ? {
              raidLevel: presetForm.raidLevel,
              disks: presetForm.mixedDisks,
            }
          : {
              raidLevel: presetForm.raidLevel,
              uniformSize: presetForm.diskSize,
              diskCount: presetForm.diskCount,
              disks: [],
            };

        const raidResults = calculateRaid(raidConfig);
        
        const iopsResults = estimateIops(
          presetForm.raidLevel,
          presetForm.diskCount,
          presetForm.mediaType,
          undefined,
          presetForm.customRandomReadIops,
          presetForm.customSequentialReadMBps
        );

        await new Promise(resolve => setTimeout(resolve, 800));

        setResults({
          raid: raidResults,
          iops: iopsResults,
        });
        
        setShowResults(true);
        
        setTimeout(() => {
          document.getElementById('results')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
        
      } catch (error) {
        console.error('Preset calculation failed:', error);
      } finally {
        setIsCalculating(false);
      }
    }, 100);
  }, []);

  const handleShare = useCallback((): void => {
    const config = form.useMixedDisks && form.mixedDisks?.length
      ? {
          raidLevel: form.raidLevel,
          configuration: { disks: form.mixedDisks },
        }
      : {
          raidLevel: form.raidLevel,
          configuration: {
            diskCount: form.diskCount,
            diskSize: form.diskSize,
            mediaType: form.mediaType,
          },
        };
    
    const shareUrl = generateShareableLink(config);
    
    if (navigator.share) {
      navigator.share({
        title: 'RAID Calculator Configuration',
        text: `Check out this RAID ${form.raidLevel} configuration`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  }, [form]);

  const handleExport = useCallback((): void => {
    window.print();
  }, []);

  // Convert IOPS for display
  const convertIopsForDisplay = (iops: any) => ({
    randomRead: iops.randomReadIops,
    randomWrite: iops.randomWriteIops,
    sequentialRead: iops.sequentialReadMBps,
    sequentialWrite: iops.sequentialWriteMBps,
    notes: []
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding pt-32 lg:pt-40">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="heading-1 text-balance mb-6">
                Free <span className="text-gradient">RAID Calculator</span>
              </h1>
              <p className="body-large text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
                Instantly calculate RAID capacity, efficiency, and performance for RAID 0, 1, 5, 6, and 10. 
                Get accurate estimates with vendor presets for Synology, QNAP, and ZFS systems.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calculator className="w-4 h-4 text-primary" />
                <span>Free & Open Source</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Share2 className="w-4 h-4 text-primary" />
                <span>Shareable Links</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <ExternalLink className="w-4 h-4 text-primary" />
                <span>Embeddable Widget</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom">
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {/* Calculator Section */}
            <section id="calc" className="section-padding">
              <CalculatorFormComponent
                value={form}
                onChange={setForm}
                onCalculate={handleCalculate}
                isCalculating={isCalculating}
              />
            </section>

            <AdBanner title="Sponsored" className="border-t border-white/10" />

            {/* Results Section */}
            {showResults && results && (
              <section id="results" className="section-padding">
                <div>
                  <ResultsDisplay
                    raidResults={results.raid}
                    iopsEstimate={convertIopsForDisplay(results.iops)}
                    hasCustomRandomReadIops={!!form.customRandomReadIops}
                    hasCustomSequentialReadMBps={!!form.customSequentialReadMBps}
                    isVisible={showResults}
                  />
                </div>
              </section>
            )}

            <VendorPresets onPresetSelect={handlePresetSelect} />
            <AdBanner className="border-t border-white/10" />

            <section className="section-padding">
              <div className="container-custom">
                <VendorShortcuts />
              </div>
            </section>
          </div>

          <AdSidebar className="xl:w-80 flex-shrink-0" />
        </div>
      </div>

      {/* Additional Results Section */}
      {showResults && results && (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading-2 text-gradient mb-4">
                RAID {form.raidLevel} Results
              </h2>
              <p className="body-large text-muted-foreground">
                Your configuration analysis and performance estimates
              </p>
              
              <div className="flex items-center justify-center space-x-4 mt-6">
                <button
                  onClick={handleShare}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Configuration</span>
                </button>
                <button
                  onClick={handleExport}
                  className="btn-ghost flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section id="how" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              className="heading-2 text-gradient mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How RAID Works
            </motion.h2>
            <motion.p
              className="body-large text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Understanding RAID levels and their trade-offs between capacity, performance, and reliability.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                level: 'RAID 0',
                title: 'Striping',
                description: 'Data is split across multiple disks for maximum performance. No redundancy - any disk failure results in total data loss.',
                pros: ['Maximum performance', 'Full capacity utilization', 'Simple implementation'],
                cons: ['No fault tolerance', 'High failure risk', 'Not suitable for critical data'],
                useCase: 'Temporary storage, video editing, gaming'
              },
              {
                level: 'RAID 1',
                title: 'Mirroring',
                description: 'Data is duplicated across disk pairs. Excellent reliability but only 50% capacity efficiency.',
                pros: ['Excellent fault tolerance', 'Fast read performance', 'Simple recovery'],
                cons: ['50% capacity efficiency', 'Higher cost per TB', 'Write performance penalty'],
                useCase: 'Critical systems, databases, boot drives'
              },
              {
                level: 'RAID 5',
                title: 'Striping + Parity',
                description: 'Data and parity information distributed across all disks. Good balance of capacity, performance, and protection.',
                pros: ['Good capacity efficiency', 'Single disk fault tolerance', 'Balanced performance'],
                cons: ['Write performance penalty', 'Vulnerable during rebuild', 'Complex recovery'],
                useCase: 'File servers, general storage, home NAS'
              },
              {
                level: 'RAID 6',
                title: 'Dual Parity',
                description: 'Similar to RAID 5 but with dual parity for enhanced protection. Can survive two simultaneous disk failures.',
                pros: ['Dual disk fault tolerance', 'Better rebuild safety', 'Good for large arrays'],
                cons: ['Higher write penalty', 'More complex', 'Requires minimum 4 disks'],
                useCase: 'Enterprise storage, large arrays, critical data'
              },
              {
                level: 'RAID 10',
                title: 'Mirrored Stripes',
                description: 'Combines RAID 1 mirroring with RAID 0 striping. High performance and reliability but expensive.',
                pros: ['High performance', 'Excellent fault tolerance', 'Fast rebuild times'],
                cons: ['50% capacity efficiency', 'High cost', 'Requires even disk count'],
                useCase: 'High-performance databases, virtualization'
              }
            ].map((raid, index) => (
              <motion.div
                key={raid.level}
                className="glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <h3 className="heading-4 text-primary mb-2">{raid.level}</h3>
                  <h4 className="font-semibold text-foreground mb-3">{raid.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {raid.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">Advantages</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {raid.pros.map((pro, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-red-600 mb-2">Disadvantages</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {raid.cons.map((con, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <h5 className="font-medium text-foreground mb-2">Best For</h5>
                    <p className="text-sm text-primary">{raid.useCase}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}