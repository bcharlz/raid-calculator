'use client';

import React from 'react';

interface AdPlaceholderProps {
  format: 'banner' | 'rectangle' | 'skyscraper' | 'mobile-banner' | 'square';
  className?: string;
}

const adFormats = {
  banner: { width: '728px', height: '90px', name: 'Leaderboard' },
  rectangle: { width: '300px', height: '250px', name: 'Medium Rectangle' },
  skyscraper: { width: '160px', height: '600px', name: 'Wide Skyscraper' },
  'mobile-banner': { width: '320px', height: '50px', name: 'Mobile Banner' },
  square: { width: '250px', height: '250px', name: 'Square' }
};

export default function AdPlaceholder({ format, className = '' }: AdPlaceholderProps) {
  const adConfig = adFormats[format];
  
  return (
    <div className={`ad-placeholder ${className}`}>
      {/* Google AdSense Label */}
      <div className="text-xs text-gray-400 mb-1 text-left">
        <span className="bg-gray-100 px-1 rounded text-gray-500">Ads by Google</span>
      </div>
      
      {/* Ad Container with Google styling */}
      <div 
        className="border border-gray-200 bg-white rounded-sm shadow-sm overflow-hidden relative"
        style={{ 
          width: adConfig.width, 
          height: adConfig.height,
          maxWidth: '100%'
        }}
      >
        {/* Realistic ad content */}
        <div className="h-full flex flex-col justify-center items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
          {format === 'banner' || format === 'mobile-banner' ? (
            <div className="flex items-center space-x-4 w-full">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">💾</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm truncate">Enterprise Storage Solutions</h3>
                <p className="text-xs text-gray-600 truncate">Professional RAID & NAS Systems</p>
                <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded mt-1">Ad</span>
              </div>
            </div>
          ) : format === 'skyscraper' ? (
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-500 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">🖥️</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Server Hardware</h3>
                <p className="text-xs text-gray-600 mt-1">Professional Grade</p>
                <p className="text-xs text-gray-600">RAID Controllers</p>
              </div>
              <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600">
                Learn More
              </button>
              <div className="text-xs text-gray-400">Sponsored</div>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-indigo-500 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">High-Performance SSDs</h3>
                <p className="text-xs text-gray-600 mt-1">Enterprise NVMe Drives</p>
                <p className="text-xs text-green-600 font-medium">Up to 50% Off</p>
              </div>
              <button className="bg-orange-500 text-white text-xs px-4 py-2 rounded hover:bg-orange-600">
                Shop Now
              </button>
              <div className="absolute top-1 right-1">
                <span className="bg-yellow-400 text-black text-xs px-1 rounded font-medium">Ad</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Google AdSense attribution */}
        <div className="absolute bottom-0 right-0 bg-white bg-opacity-90 px-1 text-xs text-gray-400">
          <span className="text-blue-600">AdChoices</span>
        </div>
      </div>
      
      {/* Ad format info (for development) */}
      <div className="text-xs text-gray-400 mt-1 text-center">
        {adConfig.name} ({adConfig.width} × {adConfig.height})
      </div>
    </div>
  );
}

