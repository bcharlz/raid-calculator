# RAID Calculator - File Tree Structure

```
raid-calculator/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── vitest.config.ts
├── components.json
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── manifest.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── accordion.tsx
│   │   │   └── badge.tsx
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── navigation.tsx
│   │   └── common/
│   │       ├── loading-spinner.tsx
│   │       └── error-boundary.tsx
│   ├── config/
│   │   ├── seo.ts
│   │   ├── theme.ts
│   │   └── constants.ts
│   ├── features/
│   │   └── raid/
│   │       ├── components/
│   │       │   ├── calculator-form.tsx
│   │       │   ├── results-display.tsx
│   │       │   ├── vendor-presets.tsx
│   │       │   ├── how-it-works.tsx
│   │       │   ├── faq-section.tsx
│   │       │   └── share-embed.tsx
│   │       ├── hooks/
│   │       │   ├── use-raid-calculator.ts
│   │       │   └── use-url-params.ts
│   │       └── types/
│   │           └── raid.ts
│   ├── services/
│   │   ├── raidCalc.ts
│   │   ├── iopsEstimator.ts
│   │   └── urlSerializer.ts
│   ├── models/
│   │   ├── raid-schemas.ts
│   │   └── vendor-presets.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   └── styles/
│       └── globals.css
└── __tests__/
    ├── services/
    │   ├── raidCalc.test.ts
    │   └── iopsEstimator.test.ts
    └── utils/
        └── formatters.test.ts
```

## File Responsibilities

### Core Services (`/src/services/`)
- `raidCalc.ts`: Pure RAID calculation functions (capacity, efficiency, fault tolerance)
- `iopsEstimator.ts`: IOPS estimation models for different RAID levels and media types
- `urlSerializer.ts`: URL parameter serialization for shareable links

### Models & Types (`/src/models/`)
- `raid-schemas.ts`: Zod schemas for validation and TypeScript types
- `vendor-presets.ts`: Pre-configured RAID setups for popular vendors

### Features (`/src/features/raid/`)
- `calculator-form.tsx`: Input controls for RAID configuration
- `results-display.tsx`: Calculated results with charts and metrics
- `vendor-presets.tsx`: Quick preset buttons for common configurations
- `how-it-works.tsx`: Educational content about RAID levels
- `faq-section.tsx`: Frequently asked questions with JSON-LD
- `share-embed.tsx`: Shareable links and embeddable widget code

### UI Components (`/src/components/`)
- `ui/`: shadcn/ui components (button, card, input, etc.)
- `layout/`: Header, footer, and navigation components
- `common/`: Reusable utility components

### Configuration (`/src/config/`)
- `seo.ts`: SEO metadata and structured data
- `theme.ts`: Design system tokens and Tailwind extensions
- `constants.ts`: Application-wide constants

### Utilities (`/src/utils/`)
- `formatters.ts`: Number formatting, unit conversion
- `validators.ts`: Input validation helpers
- `constants.ts`: Shared constants and enums

### Tests (`/__tests__/`)
- Unit tests for services and utilities
- Vitest configuration for fast testing

