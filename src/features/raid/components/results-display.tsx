'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  HardDrive, 
  Shield, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Info,
  BarChart3
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RaidResults, IopsEstimate } from '@/models/raid-schemas';

interface ResultsDisplayProps {
  raidResults: RaidResults;
  iopsEstimate: IopsEstimate;
  isVisible?: boolean;
  hasCustomRandomReadIops?: boolean;
  hasCustomSequentialReadMBps?: boolean;
}

export default function ResultsDisplay({ 
  raidResults, 
  iopsEstimate, 
  isVisible = true,
  hasCustomRandomReadIops = false,
  hasCustomSequentialReadMBps = false
}: ResultsDisplayProps) {
  // Prepare chart data
  const capacityData = useMemo(() => [
    { name: 'Usable', value: raidResults.usableCapacity, color: '#3b82f6' },
    { name: 'Parity/Mirror', value: raidResults.parityOverhead, color: '#ef4444' },
  ], [raidResults]);

  const performanceData = useMemo(() => [
    { name: 'Random Read', value: iopsEstimate.randomRead, type: 'IOPS' },
    { name: 'Random Write', value: iopsEstimate.randomWrite, type: 'IOPS' },
    { name: 'Sequential Read', value: iopsEstimate.sequentialRead, type: 'MB/s' },
    { name: 'Sequential Write', value: iopsEstimate.sequentialWrite, type: 'MB/s' },
  ], [iopsEstimate]);

  const formatNumber = (num: number, decimals = 1): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(decimals)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(decimals)}K`;
    }
    return num.toFixed(decimals);
  };

  const formatCapacity = (tb: number): string => {
    if (tb >= 1000) {
      return `${(tb / 1000).toFixed(1)} PB`;
    }
    return `${tb.toFixed(1)} TB`;
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className="metric-card"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <HardDrive className="w-8 h-8 text-primary mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">
            {formatCapacity(raidResults.usableCapacity)}
          </div>
          <div className="text-sm text-muted-foreground">Usable Capacity</div>
          <div className="text-xs text-primary mt-1">
            {raidResults.efficiency.toFixed(1)}% efficient
          </div>
        </motion.div>

        <motion.div
          className="metric-card"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">
            {raidResults.faultTolerance}
          </div>
          <div className="text-sm text-muted-foreground">Disk Failures</div>
          <div className="text-xs text-green-500 mt-1">
            Can survive
          </div>
        </motion.div>

        <motion.div
          className="metric-card"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">
            {formatNumber(iopsEstimate.randomRead)}
          </div>
          <div className="text-sm text-muted-foreground">Random Read IOPS</div>
          <div className="text-xs text-yellow-500 mt-1">
            {hasCustomRandomReadIops ? 'Custom' : 'Estimated'}
          </div>
        </motion.div>

        <motion.div
          className="metric-card"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
          <div className="text-2xl font-bold text-foreground mb-1">
            {formatNumber(iopsEstimate.sequentialRead)}
          </div>
          <div className="text-sm text-muted-foreground">Sequential Read MB/s</div>
          <div className="text-xs text-purple-500 mt-1">
            {hasCustomSequentialReadMBps ? 'Custom' : 'Peak throughput'}
          </div>
        </motion.div>
      </div>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Capacity Breakdown */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="heading-4 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary" />
            Capacity Breakdown
          </h3>
          
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={capacityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {capacityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [formatCapacity(value), 'Capacity']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Usable Space</span>
              </div>
              <span className="font-semibold">{formatCapacity(raidResults.usableCapacity)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Overhead</span>
              </div>
              <span className="font-semibold">{formatCapacity(raidResults.parityOverhead)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-2">
              <span className="text-sm font-medium">Total Raw Capacity</span>
              <span className="font-bold">{formatCapacity(raidResults.totalCapacity)}</span>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="heading-4 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-primary" />
            Performance Estimates
          </h3>
          
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip 
                  formatter={(value: number, name: string, props: any) => [
                    `${formatNumber(value)} ${props.payload.type}`,
                    name
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Random Read</div>
              <div className="font-semibold">{formatNumber(iopsEstimate.randomRead)} IOPS</div>
            </div>
            <div>
              <div className="text-muted-foreground">Random Write</div>
              <div className="font-semibold">{formatNumber(iopsEstimate.randomWrite)} IOPS</div>
            </div>
            <div>
              <div className="text-muted-foreground">Sequential Read</div>
              <div className="font-semibold">{formatNumber(iopsEstimate.sequentialRead)} MB/s</div>
            </div>
            <div>
              <div className="text-muted-foreground">Sequential Write</div>
              <div className="font-semibold">{formatNumber(iopsEstimate.sequentialWrite)} MB/s</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Configuration Details */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="heading-4 mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-primary" />
          Configuration Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Capacity</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Efficiency:</span>
                <span className="font-medium">{raidResults.efficiency.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stripe Size:</span>
                <span className="font-medium">{raidResults.stripeSize} disks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overhead:</span>
                <span className="font-medium">{formatCapacity(raidResults.parityOverhead)}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Reliability</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fault Tolerance:</span>
                <span className="font-medium">{raidResults.faultTolerance} disk(s)</span>
              </div>
              <div className="flex items-center space-x-2">
                {raidResults.faultTolerance > 0 ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
                <span className="text-muted-foreground">
                  {raidResults.faultTolerance > 0 ? 'Protected' : 'No Protection'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Performance Notes</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              {iopsEstimate.notes.slice(0, 3).map((note, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 p-4 glass-subtle rounded-lg">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {raidResults.description}
          </p>
        </div>

        {/* Warnings */}
        {raidResults.warnings.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-600 mb-2">Warnings</h4>
                <ul className="space-y-1 text-sm text-yellow-600">
                  {raidResults.warnings.map((warning, index) => (
                    <li key={index}>• {warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

