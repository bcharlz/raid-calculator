'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  AlertTriangle, 
  Github, 
  Twitter, 
  Mail,
  ExternalLink,
  Heart
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Calculator', href: '#calc' },
      { label: 'Presets', href: '#vendors' },
      { label: 'How it Works', href: '#how' },
      { label: 'FAQ', href: '#faq' },
    ],
    resources: [
      { label: 'RAID Levels Guide', href: '/raid-levels-guide' },
      { label: 'Performance Tips', href: '/performance-tips' },
      { label: 'Best Practices', href: '/best-practices' },
      { label: 'Troubleshooting', href: '/troubleshooting' },
    ],
    vendors: [
      { label: 'Synology', href: 'https://synology.com', external: true },
      { label: 'QNAP', href: 'https://qnap.com', external: true },
      { label: 'ZFS', href: 'https://openzfs.org', external: true },
      { label: 'FreeNAS', href: 'https://freenas.org', external: true },
    ],
  };

  const socialLinks = [
    { 
      label: 'GitHub', 
      href: 'https://github.com', 
      icon: Github,
      color: 'hover:text-gray-900'
    },
    { 
      label: 'Twitter', 
      href: 'https://twitter.com', 
      icon: Twitter,
      color: 'hover:text-blue-400'
    },
    { 
      label: 'Email', 
      href: 'mailto:hello@raidcalculator.com', 
      icon: Mail,
      color: 'hover:text-green-500'
    },
  ];

  return (
    <footer className="relative mt-24">
      {/* RAID is not backup banner */}
      <motion.div
        className="glass-card border-l-4 border-l-yellow-500 mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom">
          <div className="flex items-start space-x-4 py-6">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                Important: RAID is NOT a Backup Solution
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                RAID provides redundancy and performance benefits, but it does not protect against 
                data corruption, accidental deletion, malware, or catastrophic failures. Always 
                implement a proper backup strategy following the 3-2-1 rule: 3 copies of your data, 
                on 2 different media types, with 1 copy stored off-site.
              </p>
              <Link 
                href="/best-practices" 
                className="inline-flex items-center mt-3 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                Learn about backup strategies
                <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main footer content */}
      <div className="glass border-t border-white/10">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <Calculator className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="font-display font-bold text-xl text-gradient">
                    RAID Calculator
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Capacity & Performance
                  </p>
                </div>
              </Link>
              
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                Free, open-source RAID calculator for estimating capacity, efficiency, 
                and performance across RAID 0, 1, 5, 6, and 10 configurations.
              </p>

              {/* Social links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground ${social.color} transition-all duration-200 hover:scale-110`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Product links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vendor links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Vendors</h3>
              <ul className="space-y-3">
                {footerLinks.vendors.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 ml-1" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {currentYear} RAID Calculator</span>
              <span>•</span>
              <Link 
                href="/privacy" 
                className="hover:text-foreground transition-colors duration-200"
              >
                Privacy
              </Link>
              <span>•</span>
              <Link 
                href="/terms" 
                className="hover:text-foreground transition-colors duration-200"
              >
                Terms
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for the storage community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

