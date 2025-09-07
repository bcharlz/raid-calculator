'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, Menu, X, Github, Share2 } from 'lucide-react';

interface HeaderProps {
  onShareClick?: () => void;
}

export default function Header({ onShareClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#calc', label: 'Calculator' },
    { href: '#vendors', label: 'Presets' },
    { href: '#how', label: 'How it Works' },
    { href: '#faq', label: 'FAQ' },
    { href: '#resources', label: 'Resources' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass backdrop-blur-xl shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
            aria-label="RAID Calculator Home"
          >
            <div className="relative">
              <Calculator className="w-8 h-8 text-primary transition-transform duration-200 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-xl text-gradient">
                RAID Calculator
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Capacity & Performance
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/5 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Share Button */}
            {onShareClick && (
              <button
                onClick={onShareClick}
                className="btn-ghost p-2 lg:px-4 lg:py-2"
                aria-label="Share calculator"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden lg:inline ml-2">Share</span>
              </button>
            )}

            {/* GitHub Link */}
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost p-2 lg:px-4 lg:py-2"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
              <span className="hidden lg:inline ml-2">GitHub</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden btn-ghost p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
          }`}
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <nav className="py-4 space-y-2 border-t border-white/10">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ 
                  duration: 0.2, 
                  delay: isMobileMenuOpen ? index * 0.05 : 0 
                }}
              >
                <Link
                  href={item.href}
                  className="block px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/5 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* Scroll Shadow */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
    </motion.header>
  );
}

