'use client';

import React from 'react';
import AdPlaceholder from './AdPlaceholder';

interface AdSidebarProps {
  className?: string;
  position?: 'left' | 'right';
}

export default function AdSidebar({ className = '', position = 'right' }: AdSidebarProps) {
  return (
    <aside className={`ad-sidebar ${className}`}>
      <div className="sticky top-24 space-y-6">
        {/* Skyscraper Ad */}
        <div className="hidden xl:block">
          <AdPlaceholder format="skyscraper" />
        </div>
        
        {/* Rectangle Ad for smaller screens */}
        <div className="xl:hidden">
          <AdPlaceholder format="rectangle" />
        </div>
        
        {/* Second Rectangle Ad with spacing */}
        <div className="hidden xl:block">
          <AdPlaceholder format="rectangle" />
        </div>
        
        {/* Related Links Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Related Tools</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                SSD vs HDD Calculator
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                Storage Cost Analyzer
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                Backup Strategy Guide
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                NAS Comparison Tool
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

