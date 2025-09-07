'use client';

import React from 'react';
import AdPlaceholder from './AdPlaceholder';

interface AdBannerProps {
  className?: string;
  format?: 'banner' | 'mobile-banner';
  title?: string;
}

export default function AdBanner({ 
  className = '', 
  format = 'banner',
  title 
}: AdBannerProps) {
  return (
    <div className={`ad-banner-section py-8 ${className}`}>
      {title && (
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {title}
          </span>
        </div>
      )}
      
      <div className="flex justify-center">
        <div className="hidden md:block">
          <AdPlaceholder format="banner" />
        </div>
        <div className="md:hidden">
          <AdPlaceholder format="mobile-banner" />
        </div>
      </div>
    </div>
  );
}

