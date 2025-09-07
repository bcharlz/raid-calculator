# RAID Calculator

A modern, feature-rich RAID calculator web application built with Next.js, TypeScript, and Tailwind CSS. Calculate RAID capacity, efficiency, and performance estimates for RAID 0, 1, 5, 6, and 10 configurations with vendor presets for Synology, QNAP, and ZFS systems.

![RAID Calculator Screenshot](./public/screenshot.png)

## ✨ Features

### 🧮 Advanced RAID Calculations
- **RAID Levels**: Support for RAID 0, 1, 5, 6, and 10
- **Capacity Analysis**: Usable capacity, efficiency percentage, and overhead calculations
- **Performance Estimates**: IOPS and throughput estimates for different media types
- **Mixed Disk Support**: Configure arrays with different disk sizes
- **Fault Tolerance**: Calculate survivable disk failures

### 🏢 Vendor Presets
- **Synology**: Popular DS series configurations
- **QNAP**: TS series setups for home and enterprise
- **ZFS**: RAIDZ1, RAIDZ2, and mirrored pool configurations
- **Generic**: Common configurations for any system

### 🎨 Premium Design
- **Glassmorphism UI**: Modern frosted glass aesthetic
- **Diagonal Gradient**: Custom background (#f7faff → #e3ecfc → #e7e1fa → #c6cdf6)
- **Responsive Design**: Mobile-first approach with touch support
- **Smooth Animations**: Framer Motion micro-interactions
- **Accessibility**: WCAG compliant with keyboard navigation

### 🔗 Sharing & Integration
- **Shareable Links**: URL-encoded configurations for easy sharing
- **Embeddable Widget**: Iframe-ready for integration into other sites
- **Social Sharing**: Built-in sharing for Twitter, Facebook, LinkedIn
- **Export Options**: PDF generation for reports

### 📊 Data Visualization
- **Interactive Charts**: Recharts-powered capacity and performance visualizations
- **Real-time Updates**: Live calculation updates as you type
- **Comparison Views**: Side-by-side RAID level comparisons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/raid-calculator.git
   cd raid-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components with shadcn/ui patterns
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Validation**: Zod schemas
- **Testing**: Vitest

### Project Structure

```
raid-calculator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with SEO
│   │   └── page.tsx           # Main calculator page
│   ├── components/            # Reusable UI components
│   │   ├── layout/           # Header, footer, navigation
│   │   └── ui/               # Base UI components
│   ├── features/             # Feature-specific components
│   │   └── raid/             # RAID calculator features
│   │       ├── components/   # Calculator form, results, presets
│   │       ├── hooks/        # Custom React hooks
│   │       └── types/        # Feature-specific types
│   ├── services/             # Business logic
│   │   ├── raidCalc.ts      # Core RAID calculations
│   │   ├── iopsEstimator.ts # Performance estimation
│   │   └── urlSerializer.ts # URL parameter handling
│   ├── models/               # Data models and schemas
│   │   ├── raid-schemas.ts  # Zod validation schemas
│   │   └── vendor-presets.ts # Vendor configurations
│   ├── utils/                # Utility functions
│   └── styles/               # Global styles and themes
├── public/                   # Static assets
├── __tests__/               # Test files
└── docs/                    # Documentation
```

## 🧮 RAID Calculation Engine

### Supported RAID Levels

| RAID Level | Min Disks | Fault Tolerance | Capacity Efficiency | Use Case |
|------------|-----------|-----------------|-------------------|----------|
| **RAID 0** | 2 | 0 disks | 100% | High performance, temporary storage |
| **RAID 1** | 2 (even) | n/2 disks | 50% | Critical data, boot drives |
| **RAID 5** | 3 | 1 disk | (n-1)/n × 100% | General storage, file servers |
| **RAID 6** | 4 | 2 disks | (n-2)/n × 100% | Enterprise storage, large arrays |
| **RAID 10** | 4 (even) | n/2 disks | 50% | High-performance databases |

### Performance Modeling

The IOPS estimator uses realistic performance baselines:

**HDD (7200 RPM)**
- Random Read: ~150 IOPS
- Random Write: ~140 IOPS  
- Sequential Read: ~180 MB/s
- Sequential Write: ~160 MB/s

**SSD (SATA)**
- Random Read: ~75,000 IOPS
- Random Write: ~65,000 IOPS
- Sequential Read: ~550 MB/s
- Sequential Write: ~520 MB/s

Performance calculations include RAID-specific multipliers and write amplification factors.

## 🎨 Design System

### Color Palette
```css
/* Gradient Background */
background: linear-gradient(135deg, 
  #f7faff 0%,     /* Almost white blue */
  #e3ecfc 25%,    /* Light icy blue */
  #e7e1fa 50%,    /* Soft lavender */
  #c6cdf6 100%    /* Pale periwinkle */
);

/* Glassmorphism */
.glass {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Display Font**: Satoshi fallback to Inter
- **Fluid Sizing**: CSS clamp() for responsive typography
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Animation Principles
- **Duration**: 180-220ms for micro-interactions
- **Easing**: Custom cubic-bezier curves
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Performance**: GPU-accelerated transforms

## 🔧 Configuration

### Environment Variables
```bash
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: Error Tracking  
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Customization

#### Adding New Vendor Presets
```typescript
// src/models/vendor-presets.ts
export const VENDOR_PRESETS: VendorPreset[] = [
  {
    id: 'custom-preset-id',
    vendor: 'CustomVendor',
    name: 'Custom Configuration',
    description: 'Description of the configuration',
    popular: false,
    tags: ['custom', 'example'],
    configuration: {
      raidLevel: '5',
      configuration: {
        diskCount: 6,
        diskSize: 8,
        mediaType: 'HDD',
      },
    },
  },
  // ... existing presets
];
```

#### Extending RAID Calculations
```typescript
// src/services/raidCalc.ts
export function calculateCustomRaid(config: RaidConfiguration): RaidResults {
  // Implement custom RAID logic
  return {
    usableCapacity: 0,
    totalCapacity: 0,
    efficiency: 0,
    faultTolerance: 0,
    parityOverhead: 0,
    stripeSize: 0,
    description: 'Custom RAID description',
    warnings: [],
  };
}
```

## 📱 API Reference

### Core Functions

#### `calculateRaid(config: RaidConfiguration): RaidResults`
Calculates RAID capacity and efficiency metrics.

```typescript
const results = calculateRaid({
  raidLevel: '5',
  disks: [
    { size: 4, mediaType: 'HDD' },
    { size: 4, mediaType: 'HDD' },
    { size: 4, mediaType: 'HDD' },
    { size: 4, mediaType: 'HDD' },
  ],
});
```

#### `estimateIops(raidLevel, diskCount, mediaType): IopsEstimate`
Estimates performance characteristics.

```typescript
const performance = estimateIops('5', 4, 'HDD');
// Returns: { randomRead: 540, randomWrite: 140, ... }
```

#### `generateShareableLink(config: RaidConfiguration): string`
Creates URL with encoded configuration.

```typescript
const shareUrl = generateShareableLink(config);
// Returns: https://example.com?r=5&c=4&s=4&m=HDD
```

### URL Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `r` | RAID level | `r=5` |
| `c` | Disk count | `c=4` |
| `s` | Disk size (TB) | `s=4` |
| `m` | Media type | `m=HDD` |
| `n` | Configuration name | `n=My%20Setup` |
| `d` | Mixed disks (base64) | `d=NCxIOjQsSDo0LEg=` |

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# UI tests
npm run test:ui
```

### Test Structure
```
__tests__/
├── services/
│   ├── raidCalc.test.ts      # RAID calculation tests
│   └── iopsEstimator.test.ts # Performance estimation tests
├── utils/
│   └── formatters.test.ts    # Utility function tests
└── components/
    └── calculator.test.tsx   # Component tests
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export
```bash
# Generate static files
npm run build
npm run export

# Deploy to any static host
```

## 📊 Performance

### Core Web Vitals
- **LCP**: < 2.5s (First Contentful Paint)
- **FID**: < 100ms (First Input Delay)  
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts with display=swap
- **Bundle Analysis**: Built-in webpack analyzer
- **Lazy Loading**: Components and charts loaded on demand

## 🔒 Security

### Content Security Policy
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options', 
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
];
```

### Data Privacy
- **No Personal Data**: Calculator works entirely client-side
- **No Tracking**: Optional analytics with user consent
- **Secure Sharing**: URL parameters contain only configuration data

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run the test suite (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Style
- **ESLint**: Enforced code style rules
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking
- **Conventional Commits**: Standardized commit messages

### Adding New Features
1. Update the appropriate service in `src/services/`
2. Add TypeScript types in `src/models/`
3. Create UI components in `src/components/` or `src/features/`
4. Add comprehensive tests
5. Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Synology, QNAP, ZFS** - For inspiring the vendor presets
- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Recharts** - For beautiful data visualizations
- **Lucide** - For the icon library

## 📞 Support

- **Documentation**: [docs.raidcalculator.com](https://docs.raidcalculator.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/raid-calculator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/raid-calculator/discussions)
- **Email**: support@raidcalculator.com

---

**⚠️ Important Disclaimer**: RAID is NOT a backup solution. Always implement proper backup strategies following the 3-2-1 rule: 3 copies of your data, on 2 different media types, with 1 copy stored off-site.

