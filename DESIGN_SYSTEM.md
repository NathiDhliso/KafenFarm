# The Ekhaya Escape System — Design System (Kafen Farm)

This document provides the foundational guidelines for building the Kafen Farm website. Adhere to these rules to ensure a consistent, beautiful, and user-friendly experience that reflects the brand's core philosophy: welcoming, elegant, and natural.

---

## AI Assistant Requirements

### Critical Documentation Adherence

**MANDATORY**: All AI assistants working on this project must strictly follow this design system. This document is the single source of truth for:

- **Visual Design**: Colors, typography, spacing, and layout
- **Component Specifications**: Usage patterns, props, and styling
- **Brand Standards**: Voice, tone, and visual identity
- **Accessibility Requirements**: WCAG compliance and inclusive design
- **Performance Standards**: Core Web Vitals and optimization guidelines

### Before Making Any Changes

AI assistants MUST:
1. **Reference this document** for all UI/UX decisions
2. **Use only defined colors** from the color palette sections
3. **Follow component specifications** exactly as documented
4. **Maintain consistency** with established patterns
5. **Validate accessibility** against documented requirements

### Required Documentation Cross-Reference

When implementing features, always reference:
- **DESIGN_SYSTEM.md** (this file) for visual and UX standards
- **AGENTS.md** for technical implementation patterns
- Both files must be consulted before making any changes

### Validation Checklist for AI Assistants

Before completing any task involving UI/UX:
- [ ] Colors used are from the defined palette
- [ ] Typography follows the established scale
- [ ] Spacing uses the defined system
- [ ] Components match documented specifications
- [ ] Accessibility requirements are met
- [ ] Performance guidelines are followed
- [ ] Brand voice and tone are maintained

### Automated Validation Reminders

AI assistants should use these prompts throughout their workflow:

**🎨 DESIGN VALIDATION**: 
- Am I using colors from the defined palette only?
- Does typography follow the established hierarchy?
- Are spacing values from the design token system?
- Do components match the documented specifications?

**♿ ACCESSIBILITY CHECK**:
- Are ARIA labels and roles properly implemented?
- Is keyboard navigation fully supported?
- Does color contrast meet WCAG standards?
- Are semantic HTML elements used correctly?

**⚡ PERFORMANCE VALIDATION**:
- Are images optimized and properly sized?
- Is lazy loading implemented where appropriate?
- Are Core Web Vitals within target ranges?
- Is the bundle size within defined limits?

**📱 RESPONSIVE DESIGN**:
- Does the design work across all breakpoints?
- Are touch targets appropriately sized?
- Is content readable on all screen sizes?
- Are interactions optimized for mobile?

---

## 20. Performance Metrics & Budgets

### Core Web Vitals Targets

#### Performance Budgets
```markdown
### Critical Performance Metrics
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8s
- **Speed Index**: < 3.0s

### Resource Budgets
- **Total Bundle Size**: < 250KB (gzipped)
- **CSS Bundle**: < 50KB (minified)
- **JavaScript per Route**: < 100KB (gzipped)
- **Critical CSS**: < 14KB (above-the-fold)
- **Images per Page**: < 500KB total
- **Web Fonts**: < 100KB total
```

#### Performance Monitoring Setup
```typescript
// utils/performance.ts
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  
  static getInstance(): PerformanceMonitor {
    if (!this.instance) {
      this.instance = new PerformanceMonitor();
    }
    return this.instance;
  }

  // Core Web Vitals measurement
  measureCoreWebVitals() {
    // First Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          this.reportMetric('FCP', entry.startTime);
        }
      });
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.reportMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.reportMetric('FID', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.reportMetric('CLS', clsValue);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private reportMetric(name: string, value: number) {
    // Send to analytics service
    console.log(`Performance Metric - ${name}: ${value}ms`);
    
    // Optional: Send to monitoring service
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: Math.round(value),
      });
    }
  }
}
```

### Bundle Size Optimization

#### Webpack Bundle Analysis
```javascript
// webpack.config.js - Bundle analysis setup
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    // Only in development
    process.env.ANALYZE && new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: true,
    }),
  ].filter(Boolean),
  
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          maxSize: 100000, // 100KB limit
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          maxSize: 50000, // 50KB limit
        }
      }
    }
  }
};
```

#### Vite Bundle Optimization
```typescript
// vite.config.ts - Performance optimizations
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // Bundle analyzer
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
    }),
  ],
  
  build: {
    // Bundle size limits
    chunkSizeWarningLimit: 100, // 100KB warning
    
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-button'],
          'utils-vendor': ['date-fns', 'clsx'],
        }
      }
    },
    
    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      }
    }
  }
});
```

### Image Optimization Guidelines

#### Responsive Image Strategy
```css
/* Responsive image loading */
.responsive-image {
  width: 100%;
  height: auto;
  
  /* Lazy loading with intersection observer */
  opacity: 0;
  transition: opacity 0.3s ease;
}

.responsive-image.loaded {
  opacity: 1;
}

/* Image size optimization */
.hero-image {
  /* Mobile: 375px width */
  background-image: url('/images/hero-375w.webp');
  
  /* Tablet: 768px width */
  @media (min-width: 768px) {
    background-image: url('/images/hero-768w.webp');
  }
  
  /* Desktop: 1200px width */
  @media (min-width: 1200px) {
    background-image: url('/images/hero-1200w.webp');
  }
  
  /* High DPI displays */
  @media (-webkit-min-device-pixel-ratio: 2) {
    background-image: url('/images/hero-1200w@2x.webp');
  }
}
```

#### Image Component with Performance
```typescript
// components/OptimizedImage.tsx
import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  priority = false,
  className = '',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate srcSet for different sizes
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [375, 768, 1200, 1920];
    return sizes
      .map(size => `${baseSrc.replace('.', `-${size}w.`)} ${size}w`)
      .join(', ');
  };

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      srcSet={isInView ? generateSrcSet(src) : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      className={`
        transition-opacity duration-300
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
    />
  );
}
```

### CSS Performance Optimization

#### Critical CSS Strategy
```css
/* Critical CSS - Above the fold styles */
/* Inline in <head> for fastest rendering */

/* Essential layout */
body {
  font-family: 'Nunito Sans', system-ui, sans-serif;
  line-height: 1.6;
  color: rgb(var(--jozi-night));
  background: rgb(var(--winter-grass));
}

/* Navigation (always visible) */
.nav-primary {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgb(var(--winter-grass));
  border-bottom: 1px solid rgb(var(--acacia-leaf) / 0.2);
}

/* Hero section (above fold) */
.hero {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Primary button (critical CTA) */
.button-primary {
  background: rgb(var(--lawley-clay));
  color: rgb(var(--winter-grass));
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.2s ease;
}
```

#### CSS Loading Strategy
```html
<!-- Critical CSS inline -->
<style>
  /* Critical styles here */
</style>

<!-- Non-critical CSS with preload -->
<link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles/main.css"></noscript>

<!-- Font preloading -->
<link rel="preload" href="/fonts/nunito-sans-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/cormorant-garamond-bold.woff2" as="font" type="font/woff2" crossorigin>
```

### JavaScript Performance Patterns

#### Code Splitting Strategy
```typescript
// Route-based code splitting
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const Activities = lazy(() => import('./pages/Activities'));
const Contact = lazy(() => import('./pages/Contact'));
const EventPlan = lazy(() => import('./pages/EventPlan'));

// Loading component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/event-plan" element={<EventPlan />} />
      </Routes>
    </Suspense>
  );
}
```

#### Component-level Optimization
```typescript
// Memoization for expensive components
import { memo, useMemo, useCallback } from 'react';

interface ActivityCardProps {
  activity: Activity;
  onSelect: (id: string) => void;
}

export const ActivityCard = memo(({ activity, onSelect }: ActivityCardProps) => {
  // Memoize expensive calculations
  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(activity.price);
  }, [activity.price]);

  // Memoize event handlers
  const handleSelect = useCallback(() => {
    onSelect(activity.id);
  }, [activity.id, onSelect]);

  return (
    <div className="activity-card" onClick={handleSelect}>
      <h3>{activity.name}</h3>
      <p>{formattedPrice}</p>
    </div>
  );
});
```

### Performance Monitoring Dashboard

#### Performance Metrics Component
```typescript
// components/PerformanceMetrics.tsx (Development only)
import { useEffect, useState } from 'react';

interface Metrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  bundleSize: number;
}

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<Partial<Metrics>>({});

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const monitor = PerformanceMonitor.getInstance();
    monitor.measureCoreWebVitals();

    // Get bundle size info
    fetch('/api/bundle-stats')
      .then(res => res.json())
      .then(data => {
        setMetrics(prev => ({ ...prev, bundleSize: data.size }));
      });
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm">
      <h4 className="font-bold mb-2">Performance Metrics</h4>
      <div className="space-y-1">
        <div>FCP: {metrics.fcp?.toFixed(0)}ms</div>
        <div>LCP: {metrics.lcp?.toFixed(0)}ms</div>
        <div>FID: {metrics.fid?.toFixed(0)}ms</div>
        <div>CLS: {metrics.cls?.toFixed(3)}</div>
        <div>Bundle: {(metrics.bundleSize / 1024)?.toFixed(1)}KB</div>
      </div>
    </div>
  );
}
```

## 21. Form Validation Patterns

### Real-time Validation States

#### Validation State Classes
```css
/* Base input styling */
.form-input {
  padding: 12px 16px;
  border: 2px solid rgb(var(--acacia-leaf) / 0.3);
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: rgb(var(--winter-grass));
  color: rgb(var(--jozi-night));
}

/* Focus state */
.form-input:focus {
  outline: none;
  border-color: rgb(var(--lawley-clay));
  box-shadow: 0 0 0 3px rgb(var(--lawley-clay) / 0.1);
}

/* Validation states */
.form-input--validating {
  border-color: rgb(var(--highveld-sun));
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23E8A13A' stroke-width='2'%3E%3Cpath d='M21 12a9 9 0 11-6.219-8.56'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
}

.form-input--success {
  border-color: rgb(var(--acacia-leaf));
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2310B981' stroke-width='2'%3E%3Cpath d='M20 6L9 17l-5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
}

.form-input--error {
  border-color: #DC2626;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23DC2626' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='15' y1='9' x2='9' y2='15'/%3E%3Cline x1='9' y1='9' x2='15' y2='15'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
}

/* Disabled state */
.form-input:disabled {
  background-color: rgb(var(--acacia-leaf) / 0.1);
  border-color: rgb(var(--acacia-leaf) / 0.2);
  color: rgb(var(--jozi-night) / 0.5);
  cursor: not-allowed;
}
```

#### Validation Message Components
```css
/* Message base styles */
.field-message {
  font-size: 14px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Helper text (neutral) */
.field-hint {
  color: rgb(var(--jozi-night) / 0.7);
}

/* Warning (non-blocking) */
.field-warning {
  color: rgb(var(--highveld-sun));
}

.field-warning::before {
  content: "⚠️";
  font-size: 12px;
}

/* Success feedback */
.field-success {
  color: #10B981;
}

.field-success::before {
  content: "✓";
  font-weight: bold;
}

/* Error messages */
.field-error {
  color: #DC2626;
}

.field-error::before {
  content: "✕";
  font-weight: bold;
}

/* Loading/validating state */
.field-validating {
  color: rgb(var(--highveld-sun));
}

.field-validating::before {
  content: "";
  width: 12px;
  height: 12px;
  border: 2px solid rgb(var(--highveld-sun));
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### React Form Validation Hook

#### useFormValidation Hook
```typescript
// hooks/useFormValidation.ts
import { useState, useCallback, useRef } from 'react';

export type ValidationRule<T = any> = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | null;
  asyncValidator?: (value: T) => Promise<string | null>;
};

export type FieldState = {
  value: any;
  error: string | null;
  isValidating: boolean;
  isValid: boolean;
  isTouched: boolean;
  isDirty: boolean;
};

export type FormState<T> = {
  [K in keyof T]: FieldState;
};

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Partial<Record<keyof T, ValidationRule>>
) {
  const [formState, setFormState] = useState<FormState<T>>(() => {
    const state = {} as FormState<T>;
    Object.keys(initialValues).forEach((key) => {
      state[key as keyof T] = {
        value: initialValues[key],
        error: null,
        isValidating: false,
        isValid: true,
        isTouched: false,
        isDirty: false,
      };
    });
    return state;
  });

  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  const validateField = useCallback(async (
    fieldName: keyof T,
    value: any,
    immediate = false
  ) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    // Clear existing timeout
    if (timeoutRefs.current[fieldName as string]) {
      clearTimeout(timeoutRefs.current[fieldName as string]);
    }

    // Set validating state
    setFormState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        isValidating: true,
      }
    }));

    const validate = async () => {
      let error: string | null = null;

      // Required validation
      if (rules.required && (!value || value.toString().trim() === '')) {
        error = 'This field is required';
      }

      // Length validations
      if (!error && rules.minLength && value.length < rules.minLength) {
        error = `Minimum ${rules.minLength} characters required`;
      }

      if (!error && rules.maxLength && value.length > rules.maxLength) {
        error = `Maximum ${rules.maxLength} characters allowed`;
      }

      // Pattern validation
      if (!error && rules.pattern && !rules.pattern.test(value)) {
        error = 'Invalid format';
      }

      // Custom validation
      if (!error && rules.custom) {
        error = rules.custom(value);
      }

      // Async validation
      if (!error && rules.asyncValidator) {
        try {
          error = await rules.asyncValidator(value);
        } catch (e) {
          error = 'Validation failed';
        }
      }

      // Update field state
      setFormState(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          error,
          isValid: !error,
          isValidating: false,
        }
      }));

      return error;
    };

    if (immediate) {
      return validate();
    } else {
      // Debounce validation
      timeoutRefs.current[fieldName as string] = setTimeout(validate, 300);
    }
  }, [validationRules]);

  const setFieldValue = useCallback((fieldName: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        isDirty: value !== initialValues[fieldName],
        isTouched: true,
      }
    }));

    // Trigger validation
    validateField(fieldName, value);
  }, [initialValues, validateField]);

  const setFieldTouched = useCallback((fieldName: keyof T) => {
    setFormState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        isTouched: true,
      }
    }));

    // Validate immediately when field loses focus
    validateField(fieldName, formState[fieldName].value, true);
  }, [formState, validateField]);

  const validateForm = useCallback(async () => {
    const validationPromises = Object.keys(formState).map(async (fieldName) => {
      const field = formState[fieldName as keyof T];
      return validateField(fieldName as keyof T, field.value, true);
    });

    const results = await Promise.all(validationPromises);
    return results.every(result => result === null);
  }, [formState, validateField]);

  const resetForm = useCallback(() => {
    setFormState(() => {
      const state = {} as FormState<T>;
      Object.keys(initialValues).forEach((key) => {
        state[key as keyof T] = {
          value: initialValues[key],
          error: null,
          isValidating: false,
          isValid: true,
          isTouched: false,
          isDirty: false,
        };
      });
      return state;
    });
  }, [initialValues]);

  const getFieldProps = useCallback((fieldName: keyof T) => {
    const field = formState[fieldName];
    return {
      value: field.value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(fieldName, e.target.value);
      },
      onBlur: () => setFieldTouched(fieldName),
      'aria-invalid': field.error ? 'true' : 'false',
      'aria-describedby': field.error ? `${String(fieldName)}-error` : undefined,
    };
  }, [formState, setFieldValue, setFieldTouched]);

  const isFormValid = Object.values(formState).every(field => field.isValid);
  const isFormDirty = Object.values(formState).some(field => field.isDirty);
  const isFormValidating = Object.values(formState).some(field => field.isValidating);

  return {
    formState,
    setFieldValue,
    setFieldTouched,
    validateField,
    validateForm,
    resetForm,
    getFieldProps,
    isFormValid,
    isFormDirty,
    isFormValidating,
  };
}
```

### Form Field Components

#### Enhanced Input Component
```typescript
// components/FormField.tsx
import React from 'react';
import { FieldState } from '../hooks/useFormValidation';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  fieldState: FieldState;
  getFieldProps: (name: string) => any;
  hint?: string;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  fieldState,
  getFieldProps,
  hint,
  required = false,
  className = '',
}: FormFieldProps) {
  const getInputClassName = () => {
    let baseClass = 'form-input w-full';
    
    if (fieldState.isValidating) {
      baseClass += ' form-input--validating';
    } else if (fieldState.error && fieldState.isTouched) {
      baseClass += ' form-input--error';
    } else if (fieldState.isValid && fieldState.isTouched && fieldState.value) {
      baseClass += ' form-input--success';
    }
    
    return baseClass;
  };

  const getMessageComponent = () => {
    if (fieldState.isValidating) {
      return (
        <div className="field-message field-validating">
          Validating...
        </div>
      );
    }

    if (fieldState.error && fieldState.isTouched) {
      return (
        <div 
          className="field-message field-error"
          id={`${name}-error`}
          role="alert"
        >
          {fieldState.error}
        </div>
      );
    }

    if (fieldState.isValid && fieldState.isTouched && fieldState.value) {
      return (
        <div className="field-message field-success">
          Looks good!
        </div>
      );
    }

    if (hint) {
      return (
        <div className="field-message field-hint">
          {hint}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`form-field ${className}`}>
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-jozi-night mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={getInputClassName()}
        {...getFieldProps(name)}
      />
      
      {getMessageComponent()}
    </div>
  );
}
```

### Advanced Validation Patterns

#### Email Validation with Domain Check
```typescript
// utils/validators.ts
export const emailValidator = {
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  asyncValidator: async (email: string): Promise<string | null> => {
    if (!email) return null;
    
    // Check for common typos in domains
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (domain) {
      // Check for typos like "gmial.com" -> "gmail.com"
      const suggestion = findClosestDomain(domain, commonDomains);
      if (suggestion && suggestion !== domain) {
        return `Did you mean ${email.replace(domain, suggestion)}?`;
      }
    }
    
    return null;
  }
};

function findClosestDomain(input: string, domains: string[]): string | null {
  let minDistance = Infinity;
  let closest = null;
  
  for (const domain of domains) {
    const distance = levenshteinDistance(input, domain);
    if (distance < minDistance && distance <= 2) {
      minDistance = distance;
      closest = domain;
    }
  }
  
  return closest;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  
  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[b.length][a.length];
}
```

#### Phone Number Validation
```typescript
export const phoneValidator = {
  pattern: /^(\+27|0)[0-9]{9}$/,
  custom: (phone: string): string | null => {
    if (!phone) return null;
    
    // Remove spaces and dashes
    const cleaned = phone.replace(/[\s-]/g, '');
    
    // South African phone number validation
    if (cleaned.startsWith('+27')) {
      if (cleaned.length !== 12) {
        return 'Phone number should be 12 digits with +27';
      }
    } else if (cleaned.startsWith('0')) {
      if (cleaned.length !== 10) {
        return 'Phone number should be 10 digits starting with 0';
      }
    } else {
      return 'Phone number should start with +27 or 0';
    }
    
    return null;
  }
};
```

### Form Validation Examples

#### Contact Form Implementation
```typescript
// components/ContactForm.tsx
import React from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { FormField } from './FormField';
import { emailValidator, phoneValidator } from '../utils/validators';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactForm() {
  const {
    formState,
    getFieldProps,
    validateForm,
    resetForm,
    isFormValid,
    isFormValidating,
  } = useFormValidation<ContactFormData>(
    {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    {
      name: {
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      email: {
        required: true,
        ...emailValidator,
      },
      phone: {
        required: true,
        ...phoneValidator,
      },
      message: {
        required: true,
        minLength: 10,
        maxLength: 500,
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (isValid) {
      // Submit form data
      console.log('Form submitted:', formState);
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Full Name"
        name="name"
        fieldState={formState.name}
        getFieldProps={getFieldProps}
        required
        hint="Enter your first and last name"
      />

      <FormField
        label="Email Address"
        name="email"
        type="email"
        fieldState={formState.email}
        getFieldProps={getFieldProps}
        required
        hint="We'll use this to send you a confirmation"
      />

      <FormField
        label="Phone Number"
        name="phone"
        type="tel"
        fieldState={formState.phone}
        getFieldProps={getFieldProps}
        required
        hint="Format: +27 or 0 followed by 9 digits"
      />

      <FormField
        label="Message"
        name="message"
        fieldState={formState.message}
        getFieldProps={getFieldProps}
        required
        hint="Tell us about your event or inquiry"
      />

      <button
        type="submit"
        disabled={!isFormValid || isFormValidating}
        className={`
          w-full py-3 px-6 rounded-lg font-semibold transition-all
          ${isFormValid && !isFormValidating
            ? 'bg-lawley-clay text-winter-grass hover:bg-lawley-clay/90'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        {isFormValidating ? 'Validating...' : 'Send Message'}
      </button>
    </form>
  );
}
```

## 22. Touch & Gesture Guidelines

### Touch Target Specifications

#### Minimum Touch Target Sizes
```css
/* Touch target base requirements */
.touch-target {
  /* iOS Human Interface Guidelines: 44x44pt minimum */
  min-width: 44px;
  min-height: 44px;
  
  /* Android Material Design: 48x48dp minimum */
  /* For web, use 48px as safe minimum */
  min-width: 48px;
  min-height: 48px;
  
  /* Ensure adequate spacing between targets */
  margin: 4px;
}

/* Button touch targets */
.button {
  min-height: 48px;
  padding: 12px 24px;
  
  /* Ensure touch area even with smaller visual appearance */
  position: relative;
}

.button::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  min-width: 48px;
  min-height: 48px;
  /* Invisible but touchable area */
}

/* Icon button touch targets */
.icon-button {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  /* Icon inside should be smaller */
}

.icon-button svg {
  width: 24px;
  height: 24px;
}

/* Link touch targets */
.touch-link {
  display: inline-block;
  min-height: 48px;
  padding: 12px 8px;
  
  /* For text links, ensure adequate line height */
  line-height: 1.5;
}
```

#### Touch Target Spacing
```css
/* Spacing between interactive elements */
.touch-grid {
  display: grid;
  gap: 8px; /* Minimum 8px between touch targets */
}

/* Navigation items */
.nav-item {
  margin: 0 4px;
  min-height: 48px;
  display: flex;
  align-items: center;
}

/* Form elements spacing */
.form-group {
  margin-bottom: 16px; /* Extra space for form fields */
}

.form-group .form-input {
  min-height: 48px;
}

/* Card action spacing */
.card-actions {
  display: flex;
  gap: 12px;
  padding: 16px;
}

.card-actions .button {
  flex: 1;
  min-height: 48px;
}
```

### Gesture Patterns

#### Swipe Gestures
```css
/* Horizontal swipe containers */
.swipe-container {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.swipe-container::-webkit-scrollbar {
  display: none;
}

/* Swipe items */
.swipe-item {
  scroll-snap-align: start;
  flex-shrink: 0;
}

/* Activity carousel */
.activity-carousel {
  display: flex;
  gap: 16px;
  padding: 0 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.activity-card {
  width: 280px;
  flex-shrink: 0;
  scroll-snap-align: start;
}

/* Swipe indicators */
.swipe-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.swipe-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgb(var(--acacia-leaf) / 0.3);
  transition: background-color 0.2s ease;
}

.swipe-indicator.active {
  background: rgb(var(--lawley-clay));
}
```

#### Pull-to-Refresh Pattern
```css
/* Pull-to-refresh container */
.pull-refresh-container {
  position: relative;
  overflow: hidden;
}

.pull-refresh-indicator {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: top 0.3s ease;
}

.pull-refresh-indicator.visible {
  top: 20px;
}

.pull-refresh-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgb(var(--acacia-leaf) / 0.3);
  border-top-color: rgb(var(--lawley-clay));
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

#### Long Press Interactions
```css
/* Long press feedback */
.long-press-target {
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.long-press-target::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgb(var(--lawley-clay) / 0.1);
  border-radius: inherit;
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.2s ease;
  pointer-events: none;
}

.long-press-target.long-pressing::after {
  opacity: 1;
  transform: scale(1);
}

/* Context menu positioning */
.context-menu {
  position: fixed;
  background: rgb(var(--winter-grass));
  border: 1px solid rgb(var(--acacia-leaf) / 0.2);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(var(--jozi-night) / 0.15);
  z-index: 1000;
  min-width: 200px;
}

.context-menu-item {
  padding: 12px 16px;
  min-height: 48px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.context-menu-item:hover {
  background: rgb(var(--acacia-leaf) / 0.1);
}
```

### React Touch Gesture Hooks

#### useSwipeGesture Hook
```typescript
// hooks/useSwipeGesture.ts
import { useRef, useCallback, TouchEvent } from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventDefaultTouchmoveEvent?: boolean;
}

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  preventDefaultTouchmoveEvent = false,
}: SwipeGestureOptions) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (preventDefaultTouchmoveEvent) {
      e.preventDefault();
    }
  }, [preventDefaultTouchmoveEvent]);

  const onTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return;

    touchEnd.current = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchStart.current.x - touchEnd.current.x;
    const deltaY = touchStart.current.y - touchEnd.current.y;

    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const isVerticalSwipe = Math.abs(deltaY) > Math.abs(deltaX);

    if (isHorizontalSwipe) {
      if (deltaX > threshold && onSwipeLeft) {
        onSwipeLeft();
      } else if (deltaX < -threshold && onSwipeRight) {
        onSwipeRight();
      }
    }

    if (isVerticalSwipe) {
      if (deltaY > threshold && onSwipeUp) {
        onSwipeUp();
      } else if (deltaY < -threshold && onSwipeDown) {
        onSwipeDown();
      }
    }
  }, [threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
```

#### useLongPress Hook
```typescript
// hooks/useLongPress.ts
import { useCallback, useRef, MouseEvent, TouchEvent } from 'react';

interface LongPressOptions {
  onLongPress: (event: MouseEvent | TouchEvent) => void;
  onLongPressStart?: () => void;
  onLongPressEnd?: () => void;
  delay?: number;
  shouldPreventDefault?: boolean;
}

export function useLongPress({
  onLongPress,
  onLongPressStart,
  onLongPressEnd,
  delay = 500,
  shouldPreventDefault = true,
}: LongPressOptions) {
  const timeout = useRef<NodeJS.Timeout>();
  const target = useRef<EventTarget>();

  const start = useCallback((event: MouseEvent | TouchEvent) => {
    if (shouldPreventDefault && event.target) {
      event.target.addEventListener('touchend', preventDefault, { passive: false });
      event.target.addEventListener('touchmove', preventDefault, { passive: false });
    }

    target.current = event.target;
    onLongPressStart?.();

    timeout.current = setTimeout(() => {
      onLongPress(event);
    }, delay);
  }, [onLongPress, onLongPressStart, delay, shouldPreventDefault]);

  const clear = useCallback((event: MouseEvent | TouchEvent, shouldTriggerClick = true) => {
    timeout.current && clearTimeout(timeout.current);
    onLongPressEnd?.();

    if (shouldPreventDefault && target.current) {
      target.current.removeEventListener('touchend', preventDefault);
      target.current.removeEventListener('touchmove', preventDefault);
    }
  }, [onLongPressEnd, shouldPreventDefault]);

  return {
    onMouseDown: (e: MouseEvent) => start(e),
    onTouchStart: (e: TouchEvent) => start(e),
    onMouseUp: (e: MouseEvent) => clear(e),
    onMouseLeave: (e: MouseEvent) => clear(e, false),
    onTouchEnd: (e: TouchEvent) => clear(e),
  };
}

const preventDefault = (event: Event) => {
  if (!isTouchEvent(event)) return;
  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

const isTouchEvent = (event: Event): event is TouchEvent => {
  return 'touches' in event;
};
```

### Mobile-Specific Components

#### SwipeableCard Component
```typescript
// components/SwipeableCard.tsx
import React, { useState } from 'react';
import { useSwipeGesture } from '../hooks/useSwipeGesture';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  className?: string;
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  className = '',
}: SwipeableCardProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const swipeGesture = useSwipeGesture({
    onSwipeLeft: () => {
      if (onSwipeLeft) {
        setIsAnimating(true);
        setSwipeOffset(-100);
        setTimeout(() => {
          onSwipeLeft();
          setSwipeOffset(0);
          setIsAnimating(false);
        }, 300);
      }
    },
    onSwipeRight: () => {
      if (onSwipeRight) {
        setIsAnimating(true);
        setSwipeOffset(100);
        setTimeout(() => {
          onSwipeRight();
          setSwipeOffset(0);
          setIsAnimating(false);
        }, 300);
      }
    },
    threshold: 80,
  });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Left action (revealed on right swipe) */}
      {leftAction && (
        <div className="absolute left-0 top-0 bottom-0 w-20 flex items-center justify-center bg-green-500">
          {leftAction}
        </div>
      )}

      {/* Right action (revealed on left swipe) */}
      {rightAction && (
        <div className="absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center bg-red-500">
          {rightAction}
        </div>
      )}

      {/* Main card content */}
      <div
        className={`
          transform transition-transform
          ${isAnimating ? 'duration-300 ease-out' : 'duration-150 ease-out'}
        `}
        style={{
          transform: `translateX(${swipeOffset}%)`,
        }}
        {...swipeGesture}
      >
        {children}
      </div>
    </div>
  );
}
```

#### TouchFriendlyButton Component
```typescript
// components/TouchFriendlyButton.tsx
import React from 'react';
import { useLongPress } from '../hooks/useLongPress';

interface TouchFriendlyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onLongPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function TouchFriendlyButton({
  children,
  onClick,
  onLongPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: TouchFriendlyButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const longPressProps = useLongPress({
    onLongPress: () => onLongPress?.(),
    onLongPressStart: () => setIsPressed(true),
    onLongPressEnd: () => setIsPressed(false),
    delay: 500,
  });

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'min-h-[40px] px-3 py-2 text-sm';
      case 'lg':
        return 'min-h-[56px] px-8 py-4 text-lg';
      default:
        return 'min-h-[48px] px-6 py-3';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-transparent border-2 border-lawley-clay text-lawley-clay hover:bg-lawley-clay hover:text-winter-grass';
      case 'ghost':
        return 'bg-transparent text-lawley-clay hover:bg-lawley-clay/10';
      default:
        return 'bg-lawley-clay text-winter-grass hover:bg-lawley-clay/90';
    }
  };

  return (
    <button
      className={`
        relative font-semibold rounded-lg transition-all duration-200
        touch-manipulation select-none
        ${getSizeClasses()}
        ${getVariantClasses()}
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...(onLongPress ? longPressProps : {})}
    >
      {children}
    </button>
  );
}
```

### Pinch-to-Zoom Implementation

#### Image Gallery with Zoom
```typescript
// components/ZoomableImage.tsx
import React, { useState, useRef, useCallback } from 'react';

interface ZoomableImageProps {
  src: string;
  alt: string;
  maxZoom?: number;
  className?: string;
}

export function ZoomableImage({
  src,
  alt,
  maxZoom = 3,
  className = '',
}: ZoomableImageProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const lastTouchDistance = useRef<number>(0);

  const getTouchDistance = (touches: TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setIsZooming(true);
      lastTouchDistance.current = getTouchDistance(e.touches);
      e.preventDefault();
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && isZooming) {
      const currentDistance = getTouchDistance(e.touches);
      const scaleChange = currentDistance / lastTouchDistance.current;
      
      setScale(prevScale => {
        const newScale = prevScale * scaleChange;
        return Math.min(Math.max(newScale, 1), maxZoom);
      });
      
      lastTouchDistance.current = currentDistance;
      e.preventDefault();
    }
  }, [isZooming, maxZoom]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      setIsZooming(false);
    }
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  }, [scale]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-200 touch-manipulation"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        draggable={false}
      />
    </div>
  );
}
```

### Accessibility for Touch Interfaces

#### Focus Management for Touch
```css
/* Focus indicators for touch interfaces */
.touch-focus {
  outline: none;
  position: relative;
}

.touch-focus::after {
  content: '';
  position: absolute;
  inset: -2px;
  border: 2px solid rgb(var(--lawley-clay));
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

/* Show focus on keyboard navigation */
.touch-focus:focus-visible::after {
  opacity: 1;
}

/* Touch feedback */
.touch-feedback {
  position: relative;
  overflow: hidden;
}

.touch-feedback::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgb(var(--lawley-clay) / 0.1);
  border-radius: inherit;
  transform: scale(0);
  transition: transform 0.2s ease;
  pointer-events: none;
}

.touch-feedback:active::before {
  transform: scale(1);
}
```

## 23. Content Strategy Guidelines

### Content Hierarchy & Structure

#### Headline Guidelines
```markdown
### Hero Headlines
- **Length**: 4-8 words maximum
- **Purpose**: Emotional hook and immediate value
- **Tone**: Aspirational, benefit-focused
- **Examples**:
  - ✅ "Your Perfect Escape Awaits"
  - ✅ "Unforgettable Moments Begin Here"
  - ❌ "Welcome to Kafen Farm Event Venue and Hospitality Services"

### Subheadings
- **Length**: 10-15 words maximum
- **Purpose**: Value proposition and supporting details
- **Structure**: [Benefit] + [Context] + [Action]
- **Examples**:
  - ✅ "Celebrate life's special moments in our stunning countryside setting"
  - ✅ "From intimate gatherings to grand celebrations, we create magic"
  - ❌ "We offer comprehensive event planning services with various packages"

### Body Paragraphs
- **Length**: 3-4 sentences maximum per paragraph
- **Structure**: Hook → Benefit → Proof → Action
- **Reading Level**: Grade 8-10 (accessible to all audiences)
- **Tone**: Warm, personal, confident
```

#### Content Hierarchy CSS Classes
```css
/* Content hierarchy styling */
.content-hero {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  color: rgb(var(--lawley-clay));
  margin-bottom: 1rem;
}

.content-subheading {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 600;
  line-height: 1.3;
  color: rgb(var(--jozi-night));
  margin-bottom: 1.5rem;
}

.content-body {
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgb(var(--jozi-night) / 0.8);
  margin-bottom: 1.5rem;
}

.content-body p {
  margin-bottom: 1rem;
}

.content-body p:last-child {
  margin-bottom: 0;
}

/* Reading flow optimization */
.content-container {
  max-width: 65ch; /* Optimal reading width */
  margin: 0 auto;
}

.content-wide {
  max-width: 80ch; /* For less dense content */
}

.content-narrow {
  max-width: 50ch; /* For dense or technical content */
}
```

### Call-to-Action (CTA) Guidelines

#### CTA Copy Standards
```markdown
### Primary CTAs
- **Length**: 2-4 words maximum
- **Structure**: [Action Verb] + [Benefit/Object]
- **Tone**: Urgent but not pushy
- **Examples**:
  - ✅ "Book Now"
  - ✅ "Start Planning"
  - ✅ "Get Quote"
  - ❌ "Click Here to Begin Your Booking Process"

### Secondary CTAs
- **Length**: 3-5 words maximum
- **Purpose**: Lower commitment exploration
- **Examples**:
  - ✅ "View Gallery"
  - ✅ "Learn More"
  - ✅ "See Packages"
  - ❌ "Click to View Our Complete Gallery"

### CTA Hierarchy
1. **Primary**: Main conversion goal (Book, Reserve, Contact)
2. **Secondary**: Information gathering (Learn, View, Explore)
3. **Tertiary**: Social proof (Reviews, Testimonials, Stories)
```

#### CTA Implementation
```css
/* CTA button hierarchy */
.cta-primary {
  background: rgb(var(--lawley-clay));
  color: rgb(var(--winter-grass));
  font-weight: 600;
  font-size: 1.125rem;
  padding: 16px 32px;
  border-radius: 8px;
  transition: all 0.2s ease;
  text-transform: none; /* Preserve natural casing */
}

.cta-primary:hover {
  background: rgb(var(--lawley-clay) / 0.9);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgb(var(--lawley-clay) / 0.3);
}

.cta-secondary {
  background: transparent;
  color: rgb(var(--lawley-clay));
  border: 2px solid rgb(var(--lawley-clay));
  font-weight: 500;
  font-size: 1rem;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.cta-secondary:hover {
  background: rgb(var(--lawley-clay));
  color: rgb(var(--winter-grass));
}

.cta-tertiary {
  background: transparent;
  color: rgb(var(--jozi-night));
  font-weight: 500;
  font-size: 0.875rem;
  padding: 8px 16px;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 0.2s ease;
}

.cta-tertiary:hover {
  color: rgb(var(--lawley-clay));
}
```

### Image Content Guidelines

#### Alt Text Formula
```markdown
### Alt Text Structure
**Formula**: [Object/Scene] + [Action/State] + [Context/Setting]

### Examples
- ✅ "Bride and groom dancing under fairy lights in garden pavilion"
- ✅ "Wedding guests enjoying dinner at long wooden tables outdoors"
- ✅ "Rustic ceremony arch decorated with white flowers and greenery"
- ❌ "Wedding photo"
- ❌ "IMG_1234"

### Alt Text Guidelines
- **Length**: 10-25 words
- **Tone**: Descriptive, not promotional
- **Include**: People, actions, setting, mood
- **Exclude**: "Image of", "Photo of", promotional language
```

#### Image File Naming Convention
```markdown
### File Naming Structure
**Format**: [category]-[description]-[context].[extension]

### Examples
- ✅ `wedding-ceremony-garden-pavilion.jpg`
- ✅ `corporate-event-conference-setup.jpg`
- ✅ `venue-exterior-sunset-view.jpg`
- ❌ `DSC_1234.jpg`
- ❌ `image1.png`

### Categories
- `venue-` (facility photos)
- `wedding-` (wedding events)
- `corporate-` (business events)
- `social-` (parties, celebrations)
- `food-` (catering, dining)
- `accommodation-` (lodging facilities)
```

### SEO & Meta Content Standards

#### Page Title Guidelines
```markdown
### Title Structure
**Format**: [Primary Keyword] | [Secondary Keyword] | [Brand]
**Length**: 50-60 characters (including spaces)

### Examples
- ✅ "Wedding Venue Johannesburg | Kafen Farm Events"
- ✅ "Corporate Retreats | Conference Venue | Kafen Farm"
- ✅ "Event Planning Services | Kafen Farm Hospitality"
- ❌ "Welcome to Kafen Farm - Your Premier Event Destination"

### Title Optimization
- **Primary keyword**: First 3-5 words
- **Location**: Include city/region when relevant
- **Brand**: Always include at the end
- **Avoid**: Keyword stuffing, special characters
```

#### Meta Description Guidelines
```markdown
### Meta Description Structure
**Length**: 150-160 characters (including spaces)
**Format**: [Hook] + [Benefit] + [Location] + [CTA]

### Examples
- ✅ "Create unforgettable memories at Kafen Farm's stunning countryside venue. Perfect for weddings, corporate events & celebrations. Book your tour today!"
- ✅ "Escape to luxury at Kafen Farm. Premium event venue & accommodation in Johannesburg's countryside. Tailored packages available. Contact us now!"

### Meta Description Guidelines
- **Hook**: First 20-30 characters grab attention
- **Benefits**: What makes you unique
- **Location**: Geographic relevance
- **CTA**: Clear next step
- **Avoid**: Duplicate descriptions, keyword stuffing
```

#### Heading Structure Guidelines
```markdown
### Heading Hierarchy Rules
- **H1**: One per page, primary keyword focus
- **H2**: Section headers, secondary keywords
- **H3**: Subsection headers, long-tail keywords
- **H4-H6**: Supporting structure, avoid keyword stuffing

### Example Structure
```html
<h1>Wedding Venue Johannesburg - Kafen Farm</h1>
  <h2>Stunning Outdoor Wedding Ceremonies</h2>
    <h3>Garden Pavilion Ceremonies</h3>
    <h3>Lakeside Wedding Options</h3>
  <h2>Reception Venues & Dining</h2>
    <h3>Indoor Reception Halls</h3>
    <h3>Outdoor Dining Spaces</h3>
  <h2>Wedding Packages & Pricing</h2>
```
```

### Content Tone & Voice Guidelines

#### Brand Voice Characteristics
```markdown
### Primary Traits
1. **Warm**: Personal, welcoming, approachable
2. **Confident**: Knowledgeable, professional, reliable
3. **Aspirational**: Inspiring, uplifting, dream-focused
4. **Authentic**: Genuine, honest, transparent

### Voice Examples
- ✅ "We'd love to help you create something magical"
- ✅ "Your celebration deserves a setting as special as the moment"
- ✅ "Let's bring your vision to life in our countryside paradise"
- ❌ "Our facility provides comprehensive event solutions"
- ❌ "We are the leading provider of hospitality services"

### Tone Variations by Context
- **Homepage**: Inspiring, welcoming
- **Service Pages**: Informative, confident
- **Booking Pages**: Encouraging, supportive
- **Contact Pages**: Helpful, accessible
- **Blog Posts**: Educational, engaging
```

#### Writing Style Guidelines
```css
/* Typography for different content types */
.content-inspirational {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.25rem;
  color: rgb(var(--lawley-clay));
  text-align: center;
  margin: 2rem 0;
}

.content-informational {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.6;
  color: rgb(var(--jozi-night));
}

.content-testimonial {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-style: italic;
  color: rgb(var(--jozi-night) / 0.8);
  border-left: 4px solid rgb(var(--lawley-clay));
  padding-left: 1.5rem;
  margin: 1.5rem 0;
}

.content-highlight {
  background: rgb(var(--highveld-sun) / 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid rgb(var(--highveld-sun));
}
```

### Content Performance Metrics

#### Content Success Indicators
```markdown
### Engagement Metrics
- **Time on Page**: Target 2+ minutes for key pages
- **Scroll Depth**: 70%+ for long-form content
- **Click-through Rate**: 3%+ for CTAs
- **Bounce Rate**: <60% for landing pages

### Conversion Metrics
- **Inquiry Rate**: 2-5% of page visitors
- **Quote Requests**: 1-3% of page visitors
- **Booking Rate**: 10-20% of inquiries
- **Return Visitors**: 20%+ for blog content

### Content Quality Indicators
- **Reading Level**: Grade 8-10 (Flesch-Kincaid)
- **Keyword Density**: 1-2% for primary keywords
- **Internal Links**: 2-4 per 1000 words
- **External Links**: 1-2 per 1000 words (high authority)
```

#### Content Optimization Checklist
```typescript
// Content validation utility
interface ContentValidation {
  title: {
    length: number; // 50-60 characters
    hasKeyword: boolean;
    hasBrand: boolean;
  };
  metaDescription: {
    length: number; // 150-160 characters
    hasCTA: boolean;
    hasLocation: boolean;
  };
  headings: {
    hasH1: boolean;
    h1Count: number; // Should be 1
    hasH2: boolean;
    hierarchyValid: boolean;
  };
  content: {
    wordCount: number;
    readingLevel: number; // Grade level
    keywordDensity: number; // Percentage
    hasImages: boolean;
    altTextComplete: boolean;
  };
}

export function validateContent(content: string, metadata: any): ContentValidation {
  // Implementation would analyze content structure
  // and return validation results
  return {
    title: {
      length: metadata.title?.length || 0,
      hasKeyword: checkKeywordPresence(metadata.title),
      hasBrand: metadata.title?.includes('Kafen Farm') || false,
    },
    metaDescription: {
      length: metadata.description?.length || 0,
      hasCTA: checkCTAPresence(metadata.description),
      hasLocation: checkLocationPresence(metadata.description),
    },
    headings: analyzeHeadingStructure(content),
    content: analyzeContentQuality(content),
  };
}
```

## 24. Notification & Alert Hierarchy

### Notification Priority Levels

#### 1. System Critical (Blocks UI)
```markdown
### Characteristics
- **Purpose**: Server errors, data loss risk, security breaches
- **Behavior**: Modal overlay, blocks all interaction
- **Duration**: Until user acknowledges or issue resolves
- **Examples**: 
  - Payment processing failure
  - Server connection lost
  - Data corruption detected
  - Security breach alert
```

```css
/* System Critical Notifications */
.notification-critical {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(var(--jozi-night) / 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.notification-critical-content {
  background: rgb(var(--winter-grass));
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 40px rgb(var(--jozi-night) / 0.3);
  border: 2px solid #DC2626; /* Red border for critical */
}

.notification-critical-icon {
  width: 48px;
  height: 48px;
  background: #DC2626;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
}

.notification-critical-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #DC2626;
  text-align: center;
  margin-bottom: 0.5rem;
}

.notification-critical-message {
  color: rgb(var(--jozi-night));
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.notification-critical-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}
```

#### 2. User Critical (Modal)
```markdown
### Characteristics
- **Purpose**: Destructive actions, payment errors, booking conflicts
- **Behavior**: Modal dialog, requires user decision
- **Duration**: Until user responds
- **Examples**:
  - Delete booking confirmation
  - Payment card declined
  - Double booking detected
  - Account suspension notice
```

```css
/* User Critical Notifications */
.notification-user-critical {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(var(--jozi-night) / 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-user-critical-content {
  background: rgb(var(--winter-grass));
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 350px;
  width: 90%;
  box-shadow: 0 12px 24px rgb(var(--jozi-night) / 0.2);
  border: 1px solid #F59E0B; /* Amber border for warnings */
}

.notification-user-critical-icon {
  width: 40px;
  height: 40px;
  background: #F59E0B;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
}

.notification-user-critical-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(var(--jozi-night));
  text-align: center;
  margin-bottom: 0.5rem;
}

.notification-user-critical-message {
  color: rgb(var(--jozi-night) / 0.8);
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
}

.notification-user-critical-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.notification-user-critical-actions .button-primary {
  flex: 1;
  font-size: 0.875rem;
  padding: 8px 16px;
}

.notification-user-critical-actions .button-secondary {
  flex: 1;
  font-size: 0.875rem;
  padding: 8px 16px;
}
```

#### 3. Important (Toast)
```markdown
### Characteristics
- **Purpose**: Success confirmations, warnings, important updates
- **Behavior**: Toast notification, auto-dismiss after 5-8 seconds
- **Duration**: 5-8 seconds or until dismissed
- **Examples**:
  - Booking confirmed successfully
  - Profile updated
  - New message received
  - Maintenance scheduled
```

```css
/* Important Toast Notifications */
.notification-toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  width: 100%;
}

.notification-toast {
  background: rgb(var(--winter-grass));
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 8px 16px rgb(var(--jozi-night) / 0.15);
  border-left: 4px solid;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: slideInRight 0.3s ease-out;
  position: relative;
}

.notification-toast.success {
  border-left-color: #10B981;
}

.notification-toast.warning {
  border-left-color: #F59E0B;
}

.notification-toast.error {
  border-left-color: #DC2626;
}

.notification-toast.info {
  border-left-color: rgb(var(--lawley-clay));
}

.notification-toast-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.notification-toast-content {
  flex: 1;
}

.notification-toast-title {
  font-weight: 600;
  color: rgb(var(--jozi-night));
  margin-bottom: 4px;
  font-size: 0.875rem;
}

.notification-toast-message {
  color: rgb(var(--jozi-night) / 0.8);
  font-size: 0.8125rem;
  line-height: 1.4;
}

.notification-toast-close {
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  color: rgb(var(--jozi-night) / 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.notification-toast-close:hover {
  background: rgb(var(--jozi-night) / 0.1);
  color: rgb(var(--jozi-night));
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-toast.dismissing {
  animation: slideOutRight 0.3s ease-in forwards;
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
```

#### 4. Informational (Inline)
```markdown
### Characteristics
- **Purpose**: Tips, updates, guidance, helpful information
- **Behavior**: Inline with content, persistent until dismissed
- **Duration**: Persistent or auto-dismiss after 10+ seconds
- **Examples**:
  - Form completion tips
  - Feature announcements
  - Helpful guidance
  - Process explanations
```

```css
/* Informational Inline Notifications */
.notification-inline {
  background: rgb(var(--acacia-leaf) / 0.1);
  border: 1px solid rgb(var(--acacia-leaf) / 0.2);
  border-radius: 6px;
  padding: 12px 16px;
  margin: 16px 0;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.notification-inline.tip {
  background: rgb(var(--highveld-sun) / 0.1);
  border-color: rgb(var(--highveld-sun) / 0.3);
}

.notification-inline.info {
  background: rgb(var(--lawley-clay) / 0.1);
  border-color: rgb(var(--lawley-clay) / 0.2);
}

.notification-inline.update {
  background: rgb(var(--acacia-leaf) / 0.1);
  border-color: rgb(var(--acacia-leaf) / 0.2);
}

.notification-inline-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.notification-inline-content {
  flex: 1;
}

.notification-inline-title {
  font-weight: 600;
  color: rgb(var(--jozi-night));
  margin-bottom: 4px;
  font-size: 0.875rem;
}

.notification-inline-message {
  color: rgb(var(--jozi-night) / 0.8);
  font-size: 0.8125rem;
  line-height: 1.4;
}

.notification-inline-dismiss {
  width: 18px;
  height: 18px;
  background: none;
  border: none;
  color: rgb(var(--jozi-night) / 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.notification-inline-dismiss:hover {
  background: rgb(var(--jozi-night) / 0.1);
  color: rgb(var(--jozi-night) / 0.6);
}
```

#### 5. Passive (Badge/Dot)
```markdown
### Characteristics
- **Purpose**: New features, unread items, status indicators
- **Behavior**: Small visual indicator, no interruption
- **Duration**: Persistent until interaction
- **Examples**:
  - Unread message count
  - New feature available
  - Status updates
  - Activity indicators
```

```css
/* Passive Badge Notifications */
.notification-badge {
  position: relative;
  display: inline-block;
}

.notification-badge::after {
  content: attr(data-count);
  position: absolute;
  top: -8px;
  right: -8px;
  background: #DC2626;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  box-shadow: 0 2px 4px rgb(var(--jozi-night) / 0.2);
}

.notification-badge.no-count::after {
  content: '';
  width: 8px;
  height: 8px;
  min-width: 8px;
  top: -4px;
  right: -4px;
  border-radius: 50%;
}

.notification-dot {
  width: 6px;
  height: 6px;
  background: #DC2626;
  border-radius: 50%;
  display: inline-block;
  margin-left: 6px;
  animation: pulse 2s infinite;
}

.notification-dot.new-feature {
  background: rgb(var(--highveld-sun));
}

.notification-dot.update {
  background: rgb(var(--lawley-clay));
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

/* Status indicators */
.notification-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  color: rgb(var(--jozi-night) / 0.7);
}

.notification-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.notification-status-dot.online {
  background: #10B981;
}

.notification-status-dot.busy {
  background: #F59E0B;
}

.notification-status-dot.offline {
  background: rgb(var(--jozi-night) / 0.3);
}
```

### React Notification System

#### Notification Context & Hook
```typescript
// contexts/NotificationContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export type NotificationPriority = 'critical' | 'user-critical' | 'important' | 'informational' | 'passive';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  duration?: number;
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'primary' | 'secondary';
  }>;
  dismissible?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      dismissible: notification.dismissible ?? true,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-dismiss based on priority
    if (notification.priority === 'important' && notification.duration !== 0) {
      const duration = notification.duration || 6000;
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
```

#### Notification Manager Component
```typescript
// components/NotificationManager.tsx
import React from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { CriticalNotification } from './CriticalNotification';
import { UserCriticalNotification } from './UserCriticalNotification';
import { ToastNotification } from './ToastNotification';

export function NotificationManager() {
  const { notifications } = useNotifications();

  const criticalNotifications = notifications.filter(n => n.priority === 'critical');
  const userCriticalNotifications = notifications.filter(n => n.priority === 'user-critical');
  const importantNotifications = notifications.filter(n => n.priority === 'important');

  return (
    <>
      {/* System Critical - Highest priority, blocks everything */}
      {criticalNotifications.map(notification => (
        <CriticalNotification key={notification.id} notification={notification} />
      ))}

      {/* User Critical - Modal dialogs */}
      {userCriticalNotifications.map(notification => (
        <UserCriticalNotification key={notification.id} notification={notification} />
      ))}

      {/* Important - Toast notifications */}
      <div className="notification-toast-container">
        {importantNotifications.map(notification => (
          <ToastNotification key={notification.id} notification={notification} />
        ))}
      </div>
    </>
  );
}
```

#### Usage Examples
```typescript
// Example usage in components
import { useNotifications } from '../contexts/NotificationContext';

export function BookingForm() {
  const { addNotification } = useNotifications();

  const handleSubmit = async (formData: BookingData) => {
    try {
      await submitBooking(formData);
      
      // Success notification
      addNotification({
        type: 'success',
        priority: 'important',
        title: 'Booking Confirmed!',
        message: 'Your reservation has been successfully submitted. We\'ll contact you within 24 hours.',
        duration: 8000,
      });
    } catch (error) {
      if (error.code === 'PAYMENT_FAILED') {
        // User critical - requires action
        addNotification({
          type: 'error',
          priority: 'user-critical',
          title: 'Payment Failed',
          message: 'Your payment could not be processed. Please check your card details and try again.',
          actions: [
            {
              label: 'Retry Payment',
              action: () => retryPayment(),
              variant: 'primary',
            },
            {
              label: 'Change Card',
              action: () => openPaymentModal(),
              variant: 'secondary',
            },
          ],
        });
      } else if (error.code === 'SERVER_ERROR') {
        // System critical - blocks UI
        addNotification({
          type: 'error',
          priority: 'critical',
          title: 'System Error',
          message: 'We\'re experiencing technical difficulties. Please try again in a few minutes.',
          actions: [
            {
              label: 'Retry',
              action: () => window.location.reload(),
              variant: 'primary',
            },
          ],
        });
      } else {
        // Standard error toast
        addNotification({
          type: 'error',
          priority: 'important',
          title: 'Booking Failed',
          message: 'Something went wrong. Please try again or contact support.',
          duration: 6000,
        });
      }
    }
  };

  return (
    // Form JSX
  );
}
```

### Notification Best Practices

#### Implementation Guidelines
```markdown
### Priority Selection Rules
1. **Critical**: Only for system failures that prevent core functionality
2. **User Critical**: For actions that require immediate user decision
3. **Important**: For feedback on user actions and important updates
4. **Informational**: For helpful tips and non-urgent information
5. **Passive**: For status indicators and optional information

### Content Guidelines
- **Title**: 2-5 words, action-oriented
- **Message**: 10-25 words, clear and specific
- **Actions**: Maximum 2 buttons, clear labels
- **Tone**: Helpful, not alarming (except for genuine emergencies)

### Accessibility Requirements
- **Screen Reader**: All notifications announced
- **Keyboard**: Dismissible via Escape key
- **Focus Management**: Trap focus in critical modals
- **Color**: Don't rely solely on color for meaning
- **Timing**: Respect user's motion preferences
```

## 25. Internationalization (i18n) Readiness

### Text Expansion Guidelines

#### Layout Flexibility
```markdown
### Text Expansion Rules
- **German/Dutch**: Allow 30-35% expansion from English
- **French/Spanish**: Allow 20-25% expansion from English
- **Arabic/Hebrew**: Allow 20-30% expansion from English
- **Asian Languages**: Allow 10-15% contraction from English
- **Compound Languages**: German compounds can be 50%+ longer

### Design Considerations
- Use flexible layouts (flexbox, grid) over fixed widths
- Avoid truncation for critical information
- Test with longest expected translations
- Consider multi-line fallbacks for buttons/labels
```

```css
/* Flexible Text Containers */
.text-expandable {
  min-width: 0; /* Allow flex items to shrink */
  word-wrap: break-word;
  hyphens: auto;
  overflow-wrap: break-word;
}

/* Button text expansion */
.button-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px; /* Fallback for very long translations */
}

@media (max-width: 768px) {
  .button-text {
    white-space: normal; /* Allow wrapping on mobile */
    max-width: none;
    line-height: 1.2;
  }
}

/* Form label expansion */
.form-label {
  display: block;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  word-break: break-word;
}

/* Navigation item expansion */
.nav-item {
  padding: 0.75rem 1rem;
  min-height: 44px; /* Maintain touch target */
  display: flex;
  align-items: center;
  text-align: center;
}

.nav-item-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1024px) {
  .nav-item-text {
    white-space: normal;
    line-height: 1.2;
  }
}
```

### RTL (Right-to-Left) Support

#### Logical Properties Implementation
```css
/* Use logical properties instead of directional ones */
:root {
  --spacing-inline-start: 1rem;
  --spacing-inline-end: 1rem;
  --border-inline-start: 1px solid rgb(var(--jozi-night) / 0.2);
}

/* Replace left/right with logical properties */
.container {
  margin-inline-start: auto;
  margin-inline-end: auto;
  padding-inline: var(--spacing-inline-start) var(--spacing-inline-end);
}

.sidebar {
  border-inline-end: var(--border-inline-start);
  padding-inline-end: 1.5rem;
}

.card {
  margin-inline-end: 1rem;
  text-align: start; /* Use 'start' instead of 'left' */
}

/* Icon positioning for RTL */
.icon-start {
  margin-inline-end: 0.5rem;
}

.icon-end {
  margin-inline-start: 0.5rem;
}

/* Form field icons */
.input-with-icon {
  position: relative;
}

.input-icon-start {
  position: absolute;
  inset-inline-start: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.input-icon-end {
  position: absolute;
  inset-inline-end: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.input-with-icon input {
  padding-inline-start: 40px;
  padding-inline-end: 12px;
}

.input-with-icon.icon-end input {
  padding-inline-start: 12px;
  padding-inline-end: 40px;
}
```

#### RTL-Specific Styles
```css
/* RTL direction styles */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .logo {
  transform: scaleX(-1); /* Flip logo if needed */
}

[dir="rtl"] .arrow-right::before {
  content: "←"; /* Flip arrow directions */
}

[dir="ltr"] .arrow-right::before {
  content: "→";
}

/* RTL-aware animations */
@keyframes slideInStart {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInEnd {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

[dir="ltr"] .slide-in-start {
  animation: slideInStart 0.3s ease-out;
}

[dir="rtl"] .slide-in-start {
  animation: slideInEnd 0.3s ease-out;
}
```

### Number & Date Formatting

#### Locale-Aware Formatting Utilities
```typescript
// utils/formatters.ts
export interface LocaleConfig {
  locale: string;
  currency: string;
  dateFormat: 'short' | 'medium' | 'long' | 'full';
  numberFormat: 'decimal' | 'currency' | 'percent';
}

export class LocaleFormatter {
  private locale: string;
  private currency: string;

  constructor(config: LocaleConfig) {
    this.locale = config.locale;
    this.currency = config.currency;
  }

  // Number formatting
  formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    }).format(value);
  }

  // Currency formatting
  formatCurrency(amount: number, currencyCode?: string): string {
    const currency = currencyCode || this.currency;
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
    }).format(amount);
  }

  // Always show currency code for clarity
  formatCurrencyWithCode(amount: number, currencyCode?: string): string {
    const currency = currencyCode || this.currency;
    const formatted = this.formatCurrency(amount, currency);
    return `${formatted} ${currency}`;
  }

  // Date formatting
  formatDate(date: Date, style: 'short' | 'medium' | 'long' | 'full' = 'medium'): string {
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: style,
    }).format(date);
  }

  // Time formatting
  formatTime(date: Date, includeSeconds: boolean = false): string {
    return new Intl.DateTimeFormat(this.locale, {
      timeStyle: includeSeconds ? 'medium' : 'short',
    }).format(date);
  }

  // Relative time formatting
  formatRelativeTime(date: Date): string {
    const rtf = new Intl.RelativeTimeFormat(this.locale, { numeric: 'auto' });
    const now = new Date();
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
    
    if (Math.abs(diffInSeconds) < 60) {
      return rtf.format(diffInSeconds, 'second');
    } else if (Math.abs(diffInSeconds) < 3600) {
      return rtf.format(Math.floor(diffInSeconds / 60), 'minute');
    } else if (Math.abs(diffInSeconds) < 86400) {
      return rtf.format(Math.floor(diffInSeconds / 3600), 'hour');
    } else {
      return rtf.format(Math.floor(diffInSeconds / 86400), 'day');
    }
  }

  // Phone number formatting (basic)
  formatPhoneNumber(phoneNumber: string, countryCode: string = 'ZA'): string {
    // This is a simplified example - use a proper library like libphonenumber-js
    if (countryCode === 'ZA' && phoneNumber.startsWith('0')) {
      return `+27 ${phoneNumber.slice(1)}`;
    }
    return phoneNumber;
  }
}

// Usage examples
const saFormatter = new LocaleFormatter({
  locale: 'en-ZA',
  currency: 'ZAR',
  dateFormat: 'medium',
  numberFormat: 'decimal',
});

const usFormatter = new LocaleFormatter({
  locale: 'en-US',
  currency: 'USD',
  dateFormat: 'medium',
  numberFormat: 'decimal',
});

// Examples:
// saFormatter.formatCurrency(1500) → "R 1,500.00"
// usFormatter.formatCurrency(1500) → "$1,500.00"
// saFormatter.formatCurrencyWithCode(1500) → "R 1,500.00 ZAR"
// saFormatter.formatNumber(1234.56) → "1,234.56"
// saFormatter.formatDate(new Date()) → "15 Jan 2024"
```

### React i18n Integration

#### Internationalization Hook
```typescript
// hooks/useI18n.ts
import { useContext, createContext } from 'react';
import { LocaleFormatter } from '../utils/formatters';

export interface I18nContextType {
  locale: string;
  direction: 'ltr' | 'rtl';
  formatter: LocaleFormatter;
  t: (key: string, params?: Record<string, any>) => string;
  changeLocale: (locale: string) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Translation function with interpolation
export function createTranslationFunction(translations: Record<string, string>) {
  return function t(key: string, params?: Record<string, any>): string {
    let translation = translations[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(
          new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'),
          String(value)
        );
      });
    }
    
    return translation;
  };
}
```

#### Responsive Text Component
```typescript
// components/ResponsiveText.tsx
import React from 'react';
import { useI18n } from '../hooks/useI18n';

interface ResponsiveTextProps {
  children: string;
  maxLength?: number;
  truncate?: boolean;
  className?: string;
}

export function ResponsiveText({ 
  children, 
  maxLength = 50, 
  truncate = false,
  className = '' 
}: ResponsiveTextProps) {
  const { direction } = useI18n();
  
  const shouldTruncate = truncate && children.length > maxLength;
  const displayText = shouldTruncate 
    ? `${children.slice(0, maxLength)}...` 
    : children;

  return (
    <span 
      className={`responsive-text ${className}`}
      dir={direction}
      title={shouldTruncate ? children : undefined}
    >
      {displayText}
    </span>
  );
}
```

### Locale-Specific Configurations

#### Supported Locales Configuration
```typescript
// config/locales.ts
export interface LocaleConfig {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  currency: string;
  dateFormat: string;
  numberFormat: {
    decimal: string;
    thousands: string;
  };
  phoneFormat: string;
}

export const SUPPORTED_LOCALES: Record<string, LocaleConfig> = {
  'en-ZA': {
    code: 'en-ZA',
    name: 'English (South Africa)',
    nativeName: 'English',
    direction: 'ltr',
    currency: 'ZAR',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimal: '.',
      thousands: ',',
    },
    phoneFormat: '+27 XX XXX XXXX',
  },
  'af-ZA': {
    code: 'af-ZA',
    name: 'Afrikaans (South Africa)',
    nativeName: 'Afrikaans',
    direction: 'ltr',
    currency: 'ZAR',
    dateFormat: 'YYYY/MM/DD',
    numberFormat: {
      decimal: ',',
      thousands: ' ',
    },
    phoneFormat: '+27 XX XXX XXXX',
  },
  'en-US': {
    code: 'en-US',
    name: 'English (United States)',
    nativeName: 'English',
    direction: 'ltr',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: {
      decimal: '.',
      thousands: ',',
    },
    phoneFormat: '+1 (XXX) XXX-XXXX',
  },
  'ar-SA': {
    code: 'ar-SA',
    name: 'Arabic (Saudi Arabia)',
    nativeName: 'العربية',
    direction: 'rtl',
    currency: 'SAR',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimal: '.',
      thousands: ',',
    },
    phoneFormat: '+966 XX XXX XXXX',
  },
};

export const DEFAULT_LOCALE = 'en-ZA';

export function getLocaleConfig(locale: string): LocaleConfig {
  return SUPPORTED_LOCALES[locale] || SUPPORTED_LOCALES[DEFAULT_LOCALE];
}
```

### Content Translation Guidelines

#### Translation Keys Structure
```typescript
// types/translations.ts
export interface TranslationKeys {
  // Navigation
  'nav.home': string;
  'nav.activities': string;
  'nav.accommodation': string;
  'nav.contact': string;
  'nav.book-now': string;

  // Common actions
  'action.submit': string;
  'action.cancel': string;
  'action.save': string;
  'action.delete': string;
  'action.edit': string;
  'action.view-more': string;

  // Form labels
  'form.name': string;
  'form.email': string;
  'form.phone': string;
  'form.message': string;
  'form.date': string;
  'form.guests': string;

  // Validation messages
  'validation.required': string;
  'validation.email-invalid': string;
  'validation.phone-invalid': string;
  'validation.date-past': string;

  // Booking flow
  'booking.title': string;
  'booking.select-activity': string;
  'booking.select-date': string;
  'booking.guest-details': string;
  'booking.confirmation': string;
  'booking.success': string;

  // Error messages
  'error.network': string;
  'error.server': string;
  'error.not-found': string;
  'error.unauthorized': string;

  // Success messages
  'success.booking-submitted': string;
  'success.contact-sent': string;
  'success.profile-updated': string;
}

// Example translations
export const EN_ZA_TRANSLATIONS: TranslationKeys = {
  'nav.home': 'Home',
  'nav.activities': 'Activities',
  'nav.accommodation': 'Accommodation',
  'nav.contact': 'Contact',
  'nav.book-now': 'Book Now',
  
  'action.submit': 'Submit',
  'action.cancel': 'Cancel',
  'action.save': 'Save',
  'action.delete': 'Delete',
  'action.edit': 'Edit',
  'action.view-more': 'View More',
  
  'form.name': 'Full Name',
  'form.email': 'Email Address',
  'form.phone': 'Phone Number',
  'form.message': 'Message',
  'form.date': 'Date',
  'form.guests': 'Number of Guests',
  
  'validation.required': 'This field is required',
  'validation.email-invalid': 'Please enter a valid email address',
  'validation.phone-invalid': 'Please enter a valid phone number',
  'validation.date-past': 'Please select a future date',
  
  'booking.title': 'Book Your Experience',
  'booking.select-activity': 'Select Activity',
  'booking.select-date': 'Choose Date & Time',
  'booking.guest-details': 'Guest Information',
  'booking.confirmation': 'Confirm Booking',
  'booking.success': 'Booking Confirmed!',
  
  'error.network': 'Network error. Please check your connection.',
  'error.server': 'Server error. Please try again later.',
  'error.not-found': 'The requested page was not found.',
  'error.unauthorized': 'You are not authorized to access this page.',
  
  'success.booking-submitted': 'Your booking has been submitted successfully.',
  'success.contact-sent': 'Your message has been sent. We\'ll respond within 24 hours.',
  'success.profile-updated': 'Your profile has been updated successfully.',
};
```

### Accessibility & i18n Integration

#### Screen Reader Support
```css
/* Language-specific screen reader text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Language direction announcements */
[dir="rtl"] .sr-only::before {
  content: "Right to left text: ";
}

[dir="ltr"] .sr-only::before {
  content: "Left to right text: ";
}

/* Language-specific focus indicators */
[lang="ar"] :focus,
[lang="he"] :focus {
  outline-offset: 3px; /* Larger offset for RTL languages */
}
```

#### ARIA Labels for i18n
```typescript
// components/AccessibleButton.tsx
import React from 'react';
import { useI18n } from '../hooks/useI18n';

interface AccessibleButtonProps {
  children: React.ReactNode;
  ariaLabelKey: string;
  onClick: () => void;
  disabled?: boolean;
}

export function AccessibleButton({ 
  children, 
  ariaLabelKey, 
  onClick, 
  disabled = false 
}: AccessibleButtonProps) {
  const { t, direction } = useI18n();
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={t(ariaLabelKey)}
      dir={direction}
      className="accessible-button"
    >
      {children}
    </button>
  );
}
```

### Testing i18n Implementation

#### i18n Testing Utilities
```typescript
// utils/i18n-testing.ts
export function testTextExpansion(
  element: HTMLElement, 
  originalText: string, 
  expandedText: string
): boolean {
  // Test if element can accommodate expanded text
  const originalWidth = element.offsetWidth;
  element.textContent = expandedText;
  const expandedWidth = element.offsetWidth;
  element.textContent = originalText; // Restore
  
  return expandedWidth <= originalWidth * 1.5; // Allow 50% expansion
}

export function testRTLLayout(container: HTMLElement): boolean {
  // Test if layout works correctly in RTL
  const originalDir = container.dir;
  container.dir = 'rtl';
  
  // Check for layout issues (overlapping elements, etc.)
  const elements = container.querySelectorAll('*');
  let hasIssues = false;
  
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.width < 0 || rect.height < 0) {
      hasIssues = true;
    }
  });
  
  container.dir = originalDir; // Restore
  return !hasIssues;
}

// Pseudo-localization for testing
export function pseudoLocalize(text: string): string {
  // Add brackets and extend text to simulate translation
  const extended = text.replace(/[a-zA-Z]/g, (char) => {
    return char + 'ø';
  });
  return `[${extended}]`;
}
```

## 26. Data Visualization Patterns

### Chart Color Palette

#### Primary Data Colors
```css
/* Chart color palette using design system tokens */
:root {
  /* Primary chart colors */
  --chart-primary: var(--lawley-clay);      /* Main data series */
  --chart-secondary: var(--highveld-sun);   /* Secondary data series */
  --chart-tertiary: var(--acacia-leaf);     /* Tertiary data series */
  --chart-quaternary: var(--winter-grass);  /* Additional data series */
  
  /* Extended palette for multiple series */
  --chart-1: hsl(20, 35%, 55%);   /* Lawley Clay */
  --chart-2: hsl(45, 85%, 60%);   /* Highveld Sun */
  --chart-3: hsl(120, 40%, 45%);  /* Acacia Leaf */
  --chart-4: hsl(240, 15%, 25%);  /* Winter Grass */
  --chart-5: hsl(20, 25%, 70%);   /* Lighter Lawley Clay */
  --chart-6: hsl(45, 65%, 75%);   /* Lighter Highveld Sun */
  --chart-7: hsl(120, 30%, 65%);  /* Lighter Acacia Leaf */
  --chart-8: hsl(240, 10%, 45%);  /* Lighter Winter Grass */
  
  /* Semantic data colors */
  --data-positive: #10B981;       /* Success/Growth */
  --data-negative: #DC2626;       /* Loss/Decline */
  --data-neutral: var(--jozi-night); /* Neutral/Baseline */
  --data-warning: #F59E0B;        /* Caution/Alert */
  --data-info: #3B82F6;           /* Information */
  
  /* Chart backgrounds and grids */
  --chart-background: rgb(var(--winter-grass));
  --chart-grid: rgb(var(--jozi-night) / 0.1);
  --chart-axis: rgb(var(--jozi-night) / 0.3);
  --chart-text: rgb(var(--jozi-night));
  --chart-text-muted: rgb(var(--jozi-night) / 0.6);
}

/* Dark mode chart colors */
@media (prefers-color-scheme: dark) {
  :root {
    --chart-background: rgb(var(--jozi-night));
    --chart-grid: rgb(var(--winter-grass) / 0.1);
    --chart-axis: rgb(var(--winter-grass) / 0.3);
    --chart-text: rgb(var(--winter-grass));
    --chart-text-muted: rgb(var(--winter-grass) / 0.6);
  }
}
```

#### Accessibility-Compliant Chart Colors
```css
/* High contrast chart colors for accessibility */
:root {
  --chart-accessible-1: #1f77b4;  /* Blue */
  --chart-accessible-2: #ff7f0e;  /* Orange */
  --chart-accessible-3: #2ca02c;  /* Green */
  --chart-accessible-4: #d62728;  /* Red */
  --chart-accessible-5: #9467bd;  /* Purple */
  --chart-accessible-6: #8c564b;  /* Brown */
  --chart-accessible-7: #e377c2;  /* Pink */
  --chart-accessible-8: #7f7f7f;  /* Gray */
}

/* Pattern fills for colorblind accessibility */
.chart-pattern-1 { fill: url(#diagonal-lines); }
.chart-pattern-2 { fill: url(#dots); }
.chart-pattern-3 { fill: url(#vertical-lines); }
.chart-pattern-4 { fill: url(#horizontal-lines); }
```

### Chart Base Styles

#### Common Chart Container
```css
/* Chart container styles */
.chart-container {
  background: var(--chart-background);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgb(var(--jozi-night) / 0.1);
  margin-bottom: 2rem;
  position: relative;
}

.chart-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--chart-text);
  margin-bottom: 0.5rem;
  text-align: center;
}

.chart-subtitle {
  font-size: 0.875rem;
  color: var(--chart-text-muted);
  text-align: center;
  margin-bottom: 1.5rem;
}

.chart-wrapper {
  position: relative;
  width: 100%;
  height: 400px; /* Default height */
  overflow: hidden;
}

/* Responsive chart sizing */
@media (max-width: 768px) {
  .chart-wrapper {
    height: 300px;
  }
  
  .chart-container {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .chart-wrapper {
    height: 250px;
  }
}
```

#### Chart Legend Styles
```css
/* Chart legend */
.chart-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--chart-grid);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--chart-text);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.legend-pattern {
  width: 12px;
  height: 12px;
  border: 1px solid var(--chart-axis);
  flex-shrink: 0;
}

/* Mobile legend layout */
@media (max-width: 480px) {
  .chart-legend {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
```

### Specific Chart Types

#### Bar Chart Styles
```css
/* Bar chart specific styles */
.bar-chart {
  --bar-spacing: 4px;
  --bar-radius: 2px;
}

.bar-chart .bar {
  fill: var(--chart-primary);
  transition: fill 0.2s ease, opacity 0.2s ease;
}

.bar-chart .bar:hover {
  opacity: 0.8;
  cursor: pointer;
}

.bar-chart .bar-positive {
  fill: var(--data-positive);
}

.bar-chart .bar-negative {
  fill: var(--data-negative);
}

.bar-chart .bar-neutral {
  fill: var(--data-neutral);
}

/* Horizontal bar chart */
.bar-chart-horizontal .bar {
  rx: var(--bar-radius);
  ry: var(--bar-radius);
}

/* Stacked bar chart */
.bar-chart-stacked .bar-segment {
  transition: opacity 0.2s ease;
}

.bar-chart-stacked .bar-segment:hover {
  opacity: 0.8;
}
```

#### Line Chart Styles
```css
/* Line chart specific styles */
.line-chart {
  --line-width: 2px;
  --point-radius: 4px;
}

.line-chart .line {
  fill: none;
  stroke: var(--chart-primary);
  stroke-width: var(--line-width);
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke-width 0.2s ease;
}

.line-chart .line:hover {
  stroke-width: calc(var(--line-width) + 1px);
}

.line-chart .point {
  fill: var(--chart-primary);
  stroke: var(--chart-background);
  stroke-width: 2px;
  r: var(--point-radius);
  transition: r 0.2s ease;
}

.line-chart .point:hover {
  r: calc(var(--point-radius) + 2px);
  cursor: pointer;
}

/* Area chart */
.area-chart .area {
  fill: var(--chart-primary);
  fill-opacity: 0.3;
  stroke: var(--chart-primary);
  stroke-width: var(--line-width);
}

/* Multi-line chart */
.line-chart .line-1 { stroke: var(--chart-1); }
.line-chart .line-2 { stroke: var(--chart-2); }
.line-chart .line-3 { stroke: var(--chart-3); }
.line-chart .line-4 { stroke: var(--chart-4); }

.line-chart .point-1 { fill: var(--chart-1); }
.line-chart .point-2 { fill: var(--chart-2); }
.line-chart .point-3 { fill: var(--chart-3); }
.line-chart .point-4 { fill: var(--chart-4); }
```

#### Pie Chart Styles
```css
/* Pie chart specific styles */
.pie-chart {
  --pie-stroke-width: 1px;
  --pie-hover-scale: 1.05;
}

.pie-chart .slice {
  stroke: var(--chart-background);
  stroke-width: var(--pie-stroke-width);
  transition: transform 0.2s ease;
  transform-origin: center;
}

.pie-chart .slice:hover {
  transform: scale(var(--pie-hover-scale));
  cursor: pointer;
}

/* Donut chart */
.donut-chart .slice {
  stroke-width: calc(var(--pie-stroke-width) * 2);
}

.donut-chart .center-text {
  text-anchor: middle;
  dominant-baseline: middle;
  font-size: 1.5rem;
  font-weight: 600;
  fill: var(--chart-text);
}

.donut-chart .center-label {
  text-anchor: middle;
  dominant-baseline: middle;
  font-size: 0.875rem;
  fill: var(--chart-text-muted);
}
```

### Chart Tooltips

#### Tooltip Styles
```css
/* Chart tooltip */
.chart-tooltip {
  position: absolute;
  background: rgb(var(--jozi-night));
  color: rgb(var(--winter-grass));
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.8125rem;
  line-height: 1.4;
  box-shadow: 0 4px 12px rgb(var(--jozi-night) / 0.3);
  pointer-events: none;
  z-index: 1000;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.chart-tooltip.visible {
  opacity: 1;
  transform: translateY(0);
}

.chart-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: rgb(var(--jozi-night));
}

.tooltip-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.tooltip-value {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tooltip-color {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
```

### React Chart Components

#### Base Chart Component
```typescript
// components/charts/BaseChart.tsx
import React, { useRef, useEffect } from 'react';

export interface ChartProps {
  title?: string;
  subtitle?: string;
  data: any[];
  width?: number;
  height?: number;
  className?: string;
  showLegend?: boolean;
  responsive?: boolean;
}

export function BaseChart({
  title,
  subtitle,
  children,
  className = '',
  showLegend = true,
  responsive = true,
}: ChartProps & { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`chart-container ${className}`} ref={containerRef}>
      {title && <h3 className="chart-title">{title}</h3>}
      {subtitle && <p className="chart-subtitle">{subtitle}</p>}
      
      <div className="chart-wrapper">
        {children}
      </div>
      
      {showLegend && (
        <div className="chart-legend">
          {/* Legend items will be rendered by specific chart components */}
        </div>
      )}
    </div>
  );
}
```

#### Chart Tooltip Hook
```typescript
// hooks/useChartTooltip.ts
import { useState, useCallback, useRef } from 'react';

export interface TooltipData {
  x: number;
  y: number;
  title: string;
  value: string | number;
  color?: string;
  visible: boolean;
}

export function useChartTooltip() {
  const [tooltip, setTooltip] = useState<TooltipData>({
    x: 0,
    y: 0,
    title: '',
    value: '',
    visible: false,
  });
  
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = useCallback((data: Omit<TooltipData, 'visible'>) => {
    setTooltip({ ...data, visible: true });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  const updateTooltipPosition = useCallback((x: number, y: number) => {
    setTooltip(prev => ({ ...prev, x, y }));
  }, []);

  return {
    tooltip,
    tooltipRef,
    showTooltip,
    hideTooltip,
    updateTooltipPosition,
  };
}
```

#### Simple Bar Chart Component
```typescript
// components/charts/BarChart.tsx
import React from 'react';
import { BaseChart, ChartProps } from './BaseChart';
import { useChartTooltip } from '../../hooks/useChartTooltip';

export interface BarChartData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps extends Omit<ChartProps, 'data'> {
  data: BarChartData[];
  orientation?: 'vertical' | 'horizontal';
  showValues?: boolean;
}

export function BarChart({
  data,
  orientation = 'vertical',
  showValues = false,
  ...chartProps
}: BarChartProps) {
  const { tooltip, showTooltip, hideTooltip } = useChartTooltip();
  
  const maxValue = Math.max(...data.map(d => d.value));
  const chartWidth = 400;
  const chartHeight = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  
  const innerWidth = chartWidth - margin.left - margin.right;
  const innerHeight = chartHeight - margin.top - margin.bottom;
  
  const barWidth = innerWidth / data.length * 0.8;
  const barSpacing = innerWidth / data.length * 0.2;

  const handleBarHover = (event: React.MouseEvent, item: BarChartData) => {
    const rect = event.currentTarget.getBoundingClientRect();
    showTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      title: item.label,
      value: item.value.toLocaleString(),
      color: item.color || 'var(--chart-primary)',
    });
  };

  return (
    <BaseChart {...chartProps}>
      <svg width={chartWidth} height={chartHeight} className="bar-chart">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * innerHeight;
            const x = index * (barWidth + barSpacing);
            const y = innerHeight - barHeight;
            
            return (
              <g key={item.label}>
                <rect
                  className="bar"
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={item.color || 'var(--chart-primary)'}
                  onMouseEnter={(e) => handleBarHover(e, item)}
                  onMouseLeave={hideTooltip}
                />
                
                {showValues && (
                  <text
                    x={x + barWidth / 2}
                    y={y - 5}
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--chart-text)"
                  >
                    {item.value}
                  </text>
                )}
                
                <text
                  x={x + barWidth / 2}
                  y={innerHeight + 15}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--chart-text)"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      
      {tooltip.visible && (
        <div
          className="chart-tooltip visible"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          <div className="tooltip-title">{tooltip.title}</div>
          <div className="tooltip-value">
            {tooltip.color && (
              <div 
                className="tooltip-color" 
                style={{ backgroundColor: tooltip.color }}
              />
            )}
            {tooltip.value}
          </div>
        </div>
      )}
    </BaseChart>
  );
}
```

### Data Formatting Utilities

#### Chart Data Formatters
```typescript
// utils/chartFormatters.ts
export class ChartFormatter {
  // Format numbers for chart display
  static formatValue(value: number, type: 'currency' | 'percentage' | 'number' = 'number'): string {
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-ZA', {
          style: 'currency',
          currency: 'ZAR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      
      case 'percentage':
        return new Intl.NumberFormat('en-ZA', {
          style: 'percent',
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(value / 100);
      
      default:
        return new Intl.NumberFormat('en-ZA', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(value);
    }
  }

  // Format dates for chart axes
  static formatDate(date: Date, format: 'short' | 'medium' | 'long' = 'short'): string {
    const options: Intl.DateTimeFormatOptions = {
      short: { month: 'short', day: 'numeric' },
      medium: { month: 'short', day: 'numeric', year: '2-digit' },
      long: { month: 'long', day: 'numeric', year: 'numeric' },
    };

    return new Intl.DateTimeFormat('en-ZA', options[format]).format(date);
  }

  // Generate color palette for multiple data series
  static generateColorPalette(count: number): string[] {
    const baseColors = [
      'var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)',
      'var(--chart-5)', 'var(--chart-6)', 'var(--chart-7)', 'var(--chart-8)',
    ];

    if (count <= baseColors.length) {
      return baseColors.slice(0, count);
    }

    // Generate additional colors if needed
    const colors = [...baseColors];
    for (let i = baseColors.length; i < count; i++) {
      const hue = (i * 137.508) % 360; // Golden angle approximation
      colors.push(`hsl(${hue}, 60%, 50%)`);
    }

    return colors;
  }

  // Calculate chart dimensions based on container
  static calculateDimensions(
    container: HTMLElement,
    aspectRatio: number = 16/9
  ): { width: number; height: number } {
    const containerWidth = container.offsetWidth;
    const maxHeight = window.innerHeight * 0.6; // Max 60% of viewport height
    
    let width = containerWidth - 32; // Account for padding
    let height = width / aspectRatio;
    
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }
    
    return { width: Math.max(width, 300), height: Math.max(height, 200) };
  }
}
```

### Chart Accessibility

#### Accessible Chart Patterns
```css
/* Screen reader accessible chart data */
.chart-data-table {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.chart-container:focus-within .chart-data-table {
  position: static;
  left: auto;
  width: auto;
  height: auto;
  overflow: visible;
  margin-top: 1rem;
  border: 1px solid var(--chart-grid);
  border-radius: 4px;
}

.chart-data-table table {
  width: 100%;
  border-collapse: collapse;
}

.chart-data-table th,
.chart-data-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid var(--chart-grid);
}

.chart-data-table th {
  background: rgb(var(--jozi-night) / 0.05);
  font-weight: 600;
}

/* Focus indicators for interactive chart elements */
.chart-interactive:focus {
  outline: 2px solid var(--lawley-clay);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --chart-1: #000000;
    --chart-2: #ffffff;
    --chart-3: #ff0000;
    --chart-4: #00ff00;
    --chart-grid: #808080;
    --chart-text: #000000;
  }
}
```

#### Accessible Chart Component
```typescript
// components/charts/AccessibleChart.tsx
import React from 'react';

interface AccessibleChartProps {
  title: string;
  description: string;
  data: Array<{ label: string; value: number }>;
  children: React.ReactNode;
}

export function AccessibleChart({ 
  title, 
  description, 
  data, 
  children 
}: AccessibleChartProps) {
  return (
    <div className="chart-container" role="img" aria-labelledby="chart-title" aria-describedby="chart-desc">
      <h3 id="chart-title" className="chart-title">{title}</h3>
      <p id="chart-desc" className="chart-subtitle">{description}</p>
      
      {children}
      
      {/* Screen reader accessible data table */}
      <div className="chart-data-table">
        <table>
          <caption>Data for {title}</caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.label}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

## 27. Component Documentation Format

### Documentation Template Structure

#### Standard Component Documentation
```typescript
/**
 * Component: [ComponentName]
 * 
 * Purpose:
 * Brief description of what this component does and when to use it
 * 
 * Usage Context:
 * - Primary use case (e.g., "Main CTA for booking actions")
 * - Secondary use cases (e.g., "Form submissions, modal confirmations")
 * - When NOT to use (e.g., "Don't use for navigation links")
 * 
 * Props:
 * @param variant - Visual style options (primary|secondary|ghost|danger)
 * @param size - Component size (sm|default|lg|xl)
 * @param loading - Shows loading spinner and disables interaction
 * @param disabled - Disables component and shows disabled state
 * @param fullWidth - Makes component take full width of container
 * @param icon - Optional icon to display (before text)
 * @param iconPosition - Icon placement (left|right) - default: left
 * @param onClick - Click handler function
 * @param children - Button text content
 * 
 * Examples:
 * ```tsx
 * // Primary booking CTA
 * <Button variant="primary" size="lg">
 *   Book Your Experience
 * </Button>
 * 
 * // Secondary action with icon
 * <Button variant="secondary" icon={<DownloadIcon />}>
 *   Download Brochure
 * </Button>
 * 
 * // Loading state
 * <Button variant="primary" loading>
 *   Processing...
 * </Button>
 * 
 * // Disabled state
 * <Button variant="primary" disabled>
 *   Fully Booked
 * </Button>
 * ```
 * 
 * Accessibility:
 * - Keyboard: Enter/Space to activate, Tab to focus
 * - Screen reader: Announces button text and state changes
 * - Focus: Visible focus ring follows design system colors
 * - ARIA: Uses button role, aria-disabled for disabled state
 * - Loading: aria-busy="true" and aria-describedby for loading text
 * 
 * States & Interactions:
 * - Default: Base appearance with hover effects
 * - Hover: Subtle color shift and scale animation
 * - Active: Pressed state with scale down (0.98)
 * - Focus: Visible outline ring for keyboard navigation
 * - Loading: Spinner replaces content, maintains button dimensions
 * - Disabled: Reduced opacity, no interactions, cursor not-allowed
 * 
 * Related Components:
 * - LinkButton: For navigation actions
 * - IconButton: Icon-only variant for compact spaces
 * - FloatingActionButton: For primary mobile actions
 * 
 * Design Tokens Used:
 * - Colors: --lawley-clay, --highveld-sun, --winter-grass
 * - Spacing: --space-sm, --space-md, --space-lg
 * - Typography: --font-weight-medium, --font-size-base
 * - Borders: --border-radius-md
 * - Shadows: --shadow-sm (hover), --shadow-md (active)
 * 
 * Performance Notes:
 * - Uses CSS-in-JS for dynamic styling
 * - Memoized to prevent unnecessary re-renders
 * - Icon components should be imported dynamically if large
 * 
 * Browser Support:
 * - Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
 * - Graceful degradation for older browsers
 * - No JavaScript dependencies for basic functionality
 */
```

### Component Categories & Documentation Standards

#### Form Components Documentation
```typescript
/**
 * Component: FormField
 * Category: Forms & Input
 * 
 * Purpose:
 * Standardized form input with integrated validation, labels, and error handling
 * 
 * Usage Context:
 * - All form inputs across the application
 * - Booking forms, contact forms, user registration
 * - Integrates with useFormValidation hook
 * 
 * Props:
 * @param label - Field label text (required for accessibility)
 * @param name - Field name for form handling (required)
 * @param type - Input type (text|email|tel|password|number|date)
 * @param placeholder - Placeholder text
 * @param required - Marks field as required
 * @param disabled - Disables input
 * @param value - Controlled input value
 * @param onChange - Change handler function
 * @param onBlur - Blur handler for validation
 * @param validation - Validation rules object
 * @param fieldState - Current field validation state
 * @param helpText - Additional help text below input
 * @param autoComplete - Browser autocomplete attribute
 * 
 * Examples:
 * ```tsx
 * // Basic text input
 * <FormField
 *   label="Full Name"
 *   name="fullName"
 *   type="text"
 *   required
 *   placeholder="Enter your full name"
 * />
 * 
 * // Email with validation
 * <FormField
 *   label="Email Address"
 *   name="email"
 *   type="email"
 *   required
 *   validation={{ email: true }}
 *   helpText="We'll use this to send booking confirmations"
 * />
 * 
 * // Phone number with South African format
 * <FormField
 *   label="Phone Number"
 *   name="phone"
 *   type="tel"
 *   validation={{ phone: 'ZA' }}
 *   placeholder="+27 XX XXX XXXX"
 * />
 * ```
 * 
 * Accessibility:
 * - Label: Properly associated with input via htmlFor/id
 * - Required: aria-required="true" and visual indicator
 * - Validation: aria-invalid and aria-describedby for errors
 * - Help text: Connected via aria-describedby
 * - Error messages: Announced by screen readers
 * - Focus: Clear focus indicators and logical tab order
 * 
 * Validation States:
 * - Pristine: Default state, no validation styling
 * - Validating: Shows spinner, yellow border
 * - Valid: Green border, checkmark icon
 * - Invalid: Red border, error message, error icon
 * - Disabled: Reduced opacity, no interactions
 * 
 * Related Components:
 * - FormSelect: Dropdown selection field
 * - FormTextarea: Multi-line text input
 * - FormCheckbox: Checkbox input with label
 * - FormRadioGroup: Radio button group
 * 
 * Hooks Integration:
 * - useFormValidation: For form state management
 * - useFieldValidation: For individual field validation
 * - useFormSubmission: For form submission handling
 */
```

#### Layout Components Documentation
```typescript
/**
 * Component: Container
 * Category: Layout & Structure
 * 
 * Purpose:
 * Responsive container component that provides consistent max-width and padding
 * 
 * Usage Context:
 * - Page-level content wrapping
 * - Section containers within pages
 * - Maintains consistent content width across breakpoints
 * 
 * Props:
 * @param size - Container size (sm|md|lg|xl|full) - default: lg
 * @param padding - Padding variant (none|sm|md|lg) - default: md
 * @param center - Centers container horizontally - default: true
 * @param className - Additional CSS classes
 * @param children - Container content
 * 
 * Examples:
 * ```tsx
 * // Standard page container
 * <Container>
 *   <h1>Page Title</h1>
 *   <p>Page content...</p>
 * </Container>
 * 
 * // Full-width hero section
 * <Container size="full" padding="none">
 *   <HeroSection />
 * </Container>
 * 
 * // Narrow content container
 * <Container size="sm" padding="lg">
 *   <ArticleContent />
 * </Container>
 * ```
 * 
 * Responsive Behavior:
 * - sm: max-width 640px
 * - md: max-width 768px  
 * - lg: max-width 1024px (default)
 * - xl: max-width 1280px
 * - full: 100% width
 * 
 * Accessibility:
 * - Semantic: Uses appropriate HTML elements
 * - Focus: Doesn't interfere with focus management
 * - Screen readers: Transparent to assistive technology
 * 
 * Related Components:
 * - Grid: For complex layouts within containers
 * - Section: Semantic section wrapper
 * - Card: Content cards within containers
 */
```

### Interactive Components Documentation

#### Navigation Components
```typescript
/**
 * Component: NavigationMenu
 * Category: Navigation & Wayfinding
 * 
 * Purpose:
 * Primary site navigation with responsive behavior and accessibility features
 * 
 * Usage Context:
 * - Main site header navigation
 * - Mobile hamburger menu
 * - Supports multi-level navigation
 * 
 * Props:
 * @param items - Navigation items array
 * @param currentPath - Current page path for active states
 * @param variant - Visual variant (horizontal|vertical|mobile)
 * @param showIcons - Display icons with menu items
 * @param onItemClick - Click handler for navigation items
 * @param className - Additional CSS classes
 * 
 * Examples:
 * ```tsx
 * // Main navigation
 * <NavigationMenu
 *   items={[
 *     { label: 'Home', href: '/', icon: <HomeIcon /> },
 *     { label: 'Activities', href: '/activities', icon: <ActivityIcon /> },
 *     { label: 'About', href: '/about', icon: <InfoIcon /> },
 *     { label: 'Contact', href: '/contact', icon: <ContactIcon /> }
 *   ]}
 *   currentPath="/activities"
 *   variant="horizontal"
 *   showIcons={true}
 * />
 * 
 * // Mobile menu
 * <NavigationMenu
 *   items={navigationItems}
 *   variant="mobile"
 *   onItemClick={handleMobileMenuClose}
 * />
 * ```
 * 
 * Accessibility:
 * - Keyboard: Arrow keys for navigation, Enter/Space to activate
 * - Screen reader: Proper ARIA labels and roles
 * - Focus: Visible focus indicators and logical tab order
 * - Mobile: Touch-friendly targets (44px minimum)
 * - ARIA: Uses navigation role, aria-current for active items
 * 
 * States & Interactions:
 * - Default: Base navigation appearance
 * - Hover: Highlight effect on menu items
 * - Active: Current page indicator
 * - Focus: Keyboard focus indicators
 * - Mobile: Collapsible hamburger menu
 * 
 * Related Components:
 * - Breadcrumb: Secondary navigation
 * - Pagination: Content navigation
 * - TabNavigation: Content switching
 */
```

### Data Display Components Documentation

#### Card Components
```typescript
/**
 * Component: ActivityCard
 * Category: Data Display & Content
 * 
 * Purpose:
 * Displays activity information in a card format with image, details, and actions
 * 
 * Usage Context:
 * - Activity listing pages
 * - Featured activities sections
 * - Search results display
 * 
 * Props:
 * @param activity - Activity data object
 * @param variant - Card style (default|featured|compact)
 * @param showPrice - Display pricing information
 * @param showAvailability - Show availability status
 * @param onBookClick - Booking button click handler
 * @param onDetailsClick - Details link click handler
 * @param className - Additional CSS classes
 * 
 * Activity Data Structure:
 * ```typescript
 * interface Activity {
 *   id: string;
 *   title: string;
 *   description: string;
 *   image: string;
 *   imageAlt: string;
 *   price: {
 *     amount: number;
 *     currency: string;
 *     period?: string;
 *   };
 *   duration: string;
 *   capacity: number;
 *   availability: 'available' | 'limited' | 'full';
 *   tags: string[];
 * }
 * ```
 * 
 * Examples:
 * ```tsx
 * // Standard activity card
 * <ActivityCard
 *   activity={wineTestingActivity}
 *   variant="default"
 *   showPrice={true}
 *   showAvailability={true}
 *   onBookClick={handleBooking}
 *   onDetailsClick={handleViewDetails}
 * />
 * 
 * // Featured activity (larger, prominent)
 * <ActivityCard
 *   activity={featuredActivity}
 *   variant="featured"
 *   showPrice={true}
 * />
 * 
 * // Compact card for mobile
 * <ActivityCard
 *   activity={activity}
 *   variant="compact"
 *   showPrice={false}
 * />
 * ```
 * 
 * Accessibility:
 * - Images: Descriptive alt text for activity images
 * - Headings: Proper heading hierarchy (h3 for card titles)
 * - Links: Clear link text and focus indicators
 * - Buttons: Descriptive button text and ARIA labels
 * - Price: Screen reader friendly price formatting
 * 
 * States & Interactions:
 * - Default: Standard card appearance
 * - Hover: Subtle elevation and image zoom
 * - Focus: Focus indicators on interactive elements
 * - Loading: Skeleton loading state
 * - Unavailable: Disabled state with visual indicators
 * 
 * Related Components:
 * - Card: Base card component
 * - ImageGallery: For multiple activity images
 * - PriceDisplay: Standalone price component
 * - AvailabilityBadge: Availability status indicator
 * 
 * Performance:
 * - Images: Lazy loading and responsive images
 * - Memoization: Prevents unnecessary re-renders
 * - Virtual scrolling: For large lists of cards
 */
```

### Documentation Best Practices

#### Component File Structure
```
components/
├── Button/
│   ├── Button.tsx          # Main component
│   ├── Button.test.tsx     # Unit tests
│   ├── Button.stories.tsx  # Storybook stories
│   ├── Button.module.css   # Component styles
│   └── index.ts           # Export file
├── FormField/
│   ├── FormField.tsx
│   ├── FormField.test.tsx
│   ├── FormField.stories.tsx
│   └── index.ts
└── ...
```

#### Documentation Checklist
```markdown
### Component Documentation Checklist

#### Required Sections:
- [ ] Component name and category
- [ ] Clear purpose statement
- [ ] Usage context and when NOT to use
- [ ] Complete props documentation with types
- [ ] Practical usage examples (minimum 3)
- [ ] Accessibility requirements and implementation
- [ ] States and interactions description
- [ ] Related components references

#### Optional Sections:
- [ ] Design tokens used
- [ ] Performance considerations
- [ ] Browser support notes
- [ ] Migration notes (for updates)
- [ ] Advanced usage patterns
- [ ] Customization options

#### Quality Standards:
- [ ] Examples are copy-pasteable and functional
- [ ] Accessibility notes include ARIA attributes
- [ ] Props include default values where applicable
- [ ] Related components are linked/referenced
- [ ] Code examples use TypeScript
- [ ] Examples show different use cases
- [ ] Performance implications are noted
```

#### Storybook Integration
```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
Primary button component for user actions. Supports multiple variants,
sizes, and states. Follows WCAG accessibility guidelines.

## Usage Guidelines
- Use \`primary\` for main actions (booking, submission)
- Use \`secondary\` for supporting actions (cancel, back)
- Use \`ghost\` for subtle actions (close, dismiss)
- Use \`danger\` for destructive actions (delete, remove)

## Accessibility
- Minimum touch target: 44x44px
- Keyboard accessible (Enter/Space)
- Screen reader compatible
- High contrast support
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Button size',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables button interaction',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Primary button story
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Book Your Experience',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary" loading>Processing...</Button>
      <Button variant="secondary" loading>Loading...</Button>
    </div>
  ),
};

// Accessibility demonstration
export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button variant="primary" aria-describedby="booking-help">
        Book Now
      </Button>
      <p id="booking-help" style={{ fontSize: '0.875rem', color: '#666' }}>
        This will start the booking process for your selected activity
      </p>
      
      <Button variant="danger" aria-label="Delete booking for Wine Tasting on March 15th">
        Delete Booking
      </Button>
    </div>
  ),
};
```

## 28. Print Media Styles

### Print-Optimized Layout

#### Base Print Styles
```css
/* Print media query - applies to all print contexts */
@media print {
  /* Reset page margins and setup */
  @page {
    margin: 2cm;
    size: A4;
  }
  
  /* Base document styles */
  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  html, body {
    font-size: 12pt;
    line-height: 1.4;
    color: #000000 !important;
    background: #ffffff !important;
    margin: 0;
    padding: 0;
  }
  
  /* Hide non-essential elements */
  .no-print,
  .print-hidden,
  nav,
  .navigation,
  .sidebar,
  .header-actions,
  .footer-social,
  .cookie-banner,
  .chat-widget,
  .floating-action,
  .back-to-top,
  .mobile-menu-toggle,
  .search-overlay,
  .modal-backdrop,
  .tooltip,
  .dropdown-menu,
  button:not(.print-button),
  .btn:not(.print-btn),
  .cta-button,
  .social-share,
  .video-player,
  .interactive-map,
  .carousel-controls,
  .pagination,
  .filters,
  .sort-controls {
    display: none !important;
  }
  
  /* Show print-specific elements */
  .print-only,
  .print-visible {
    display: block !important;
  }
  
  .print-inline {
    display: inline !important;
  }
}
```

#### Typography for Print
```css
@media print {
  /* Heading styles optimized for print */
  h1 {
    font-size: 24pt;
    font-weight: bold;
    color: #000000 !important;
    margin: 0 0 16pt 0;
    page-break-after: avoid;
  }
  
  h2 {
    font-size: 18pt;
    font-weight: bold;
    color: #000000 !important;
    margin: 20pt 0 12pt 0;
    page-break-after: avoid;
  }
  
  h3 {
    font-size: 14pt;
    font-weight: bold;
    color: #000000 !important;
    margin: 16pt 0 8pt 0;
    page-break-after: avoid;
  }
  
  h4, h5, h6 {
    font-size: 12pt;
    font-weight: bold;
    color: #000000 !important;
    margin: 12pt 0 6pt 0;
    page-break-after: avoid;
  }
  
  /* Body text */
  p {
    font-size: 11pt;
    line-height: 1.4;
    color: #000000 !important;
    margin: 0 0 8pt 0;
    orphans: 3;
    widows: 3;
  }
  
  /* Lists */
  ul, ol {
    margin: 8pt 0;
    padding-left: 20pt;
  }
  
  li {
    font-size: 11pt;
    line-height: 1.4;
    margin-bottom: 4pt;
  }
  
  /* Emphasis */
  strong, b {
    font-weight: bold;
    color: #000000 !important;
  }
  
  em, i {
    font-style: italic;
    color: #000000 !important;
  }
}
```

#### Page Layout and Breaks
```css
@media print {
  /* Page break controls */
  .page-break-before {
    page-break-before: always;
  }
  
  .page-break-after {
    page-break-after: always;
  }
  
  .page-break-inside-avoid {
    page-break-inside: avoid;
  }
  
  .page-break-avoid {
    page-break-before: avoid;
    page-break-after: avoid;
    page-break-inside: avoid;
  }
  
  /* Specific content sections */
  .activity-card,
  .booking-summary,
  .contact-info,
  .pricing-table,
  .terms-section {
    page-break-inside: avoid;
    margin-bottom: 16pt;
  }
  
  /* Headers and footers */
  .print-header {
    position: running(header);
    font-size: 10pt;
    color: #666666 !important;
    border-bottom: 1pt solid #cccccc;
    padding-bottom: 8pt;
    margin-bottom: 16pt;
  }
  
  .print-footer {
    position: running(footer);
    font-size: 9pt;
    color: #666666 !important;
    border-top: 1pt solid #cccccc;
    padding-top: 8pt;
    margin-top: 16pt;
    text-align: center;
  }
  
  @page {
    @top-center {
      content: element(header);
    }
    
    @bottom-center {
      content: element(footer);
    }
  }
}
```

### Print-Specific Components

#### Activity Information for Print
```css
@media print {
  /* Activity cards optimized for print */
  .activity-card {
    border: 1pt solid #cccccc;
    padding: 12pt;
    margin-bottom: 16pt;
    background: #ffffff !important;
    page-break-inside: avoid;
  }
  
  .activity-title {
    font-size: 14pt;
    font-weight: bold;
    color: #000000 !important;
    margin-bottom: 8pt;
  }
  
  .activity-description {
    font-size: 11pt;
    line-height: 1.4;
    color: #000000 !important;
    margin-bottom: 8pt;
  }
  
  .activity-details {
    font-size: 10pt;
    color: #333333 !important;
    margin-bottom: 8pt;
  }
  
  .activity-price {
    font-size: 12pt;
    font-weight: bold;
    color: #000000 !important;
  }
  
  /* Hide interactive elements */
  .activity-card .btn,
  .activity-card .button,
  .activity-card .cta {
    display: none !important;
  }
  
  /* Show print-specific pricing info */
  .activity-card .print-price-note {
    display: block !important;
    font-size: 9pt;
    color: #666666 !important;
    font-style: italic;
    margin-top: 4pt;
  }
}
```

#### Booking Summary for Print
```css
@media print {
  .booking-summary {
    border: 2pt solid #000000;
    padding: 16pt;
    margin: 16pt 0;
    background: #ffffff !important;
    page-break-inside: avoid;
  }
  
  .booking-summary-title {
    font-size: 16pt;
    font-weight: bold;
    color: #000000 !important;
    margin-bottom: 12pt;
    text-align: center;
    border-bottom: 1pt solid #cccccc;
    padding-bottom: 8pt;
  }
  
  .booking-details-grid {
    display: table;
    width: 100%;
    border-collapse: collapse;
  }
  
  .booking-detail-row {
    display: table-row;
  }
  
  .booking-detail-label {
    display: table-cell;
    font-weight: bold;
    padding: 4pt 8pt 4pt 0;
    vertical-align: top;
    width: 30%;
    color: #000000 !important;
  }
  
  .booking-detail-value {
    display: table-cell;
    padding: 4pt 0;
    vertical-align: top;
    color: #000000 !important;
  }
  
  .booking-total {
    border-top: 2pt solid #000000;
    margin-top: 12pt;
    padding-top: 8pt;
    font-size: 14pt;
    font-weight: bold;
    text-align: right;
    color: #000000 !important;
  }
}
```

#### Contact Information for Print
```css
@media print {
  .contact-info {
    border: 1pt solid #cccccc;
    padding: 12pt;
    margin: 16pt 0;
    background: #f9f9f9 !important;
    page-break-inside: avoid;
  }
  
  .contact-info-title {
    font-size: 14pt;
    font-weight: bold;
    color: #000000 !important;
    margin-bottom: 8pt;
  }
  
  .contact-detail {
    font-size: 11pt;
    line-height: 1.6;
    color: #000000 !important;
    margin-bottom: 4pt;
  }
  
  .contact-detail-label {
    font-weight: bold;
    display: inline-block;
    width: 80pt;
  }
  
  /* Convert links to readable text */
  .contact-info a::after {
    content: " (" attr(href) ")";
    font-size: 9pt;
    color: #666666 !important;
  }
  
  .contact-info a[href^="tel:"]::after {
    content: "";
  }
  
  .contact-info a[href^="mailto:"]::after {
    content: " (" attr(href) ")";
  }
}
```

### Print Utilities and Helpers

#### Print-Specific Classes
```css
@media print {
  /* Text alignment */
  .print-text-left { text-align: left !important; }
  .print-text-center { text-align: center !important; }
  .print-text-right { text-align: right !important; }
  
  /* Font sizes */
  .print-text-xs { font-size: 8pt !important; }
  .print-text-sm { font-size: 9pt !important; }
  .print-text-base { font-size: 11pt !important; }
  .print-text-lg { font-size: 12pt !important; }
  .print-text-xl { font-size: 14pt !important; }
  .print-text-2xl { font-size: 16pt !important; }
  
  /* Margins and spacing */
  .print-mt-0 { margin-top: 0 !important; }
  .print-mt-1 { margin-top: 4pt !important; }
  .print-mt-2 { margin-top: 8pt !important; }
  .print-mt-3 { margin-top: 12pt !important; }
  .print-mt-4 { margin-top: 16pt !important; }
  
  .print-mb-0 { margin-bottom: 0 !important; }
  .print-mb-1 { margin-bottom: 4pt !important; }
  .print-mb-2 { margin-bottom: 8pt !important; }
  .print-mb-3 { margin-bottom: 12pt !important; }
  .print-mb-4 { margin-bottom: 16pt !important; }
  
  /* Borders */
  .print-border { border: 1pt solid #cccccc !important; }
  .print-border-t { border-top: 1pt solid #cccccc !important; }
  .print-border-b { border-bottom: 1pt solid #cccccc !important; }
  .print-border-thick { border: 2pt solid #000000 !important; }
  
  /* Background colors (for important sections) */
  .print-bg-light { background: #f9f9f9 !important; }
  .print-bg-white { background: #ffffff !important; }
  
  /* Display utilities */
  .print-block { display: block !important; }
  .print-inline { display: inline !important; }
  .print-inline-block { display: inline-block !important; }
  .print-table { display: table !important; }
  .print-table-row { display: table-row !important; }
  .print-table-cell { display: table-cell !important; }
}
```

#### Print URL Display
```css
@media print {
  /* Show URLs for important links */
  a[href]:not([href^="#"]):not([href^="javascript:"]):not([href^="tel:"]):not(.no-print-url)::after {
    content: " (" attr(href) ")";
    font-size: 9pt;
    color: #666666 !important;
    font-weight: normal;
  }
  
  /* Don't show URLs for internal navigation */
  a[href^="#"]::after,
  a[href^="javascript:"]::after,
  a.internal-link::after,
  a.no-print-url::after {
    content: "";
  }
  
  /* Special handling for email and phone */
  a[href^="mailto:"]::after {
    content: " (Email: " attr(href) ")";
  }
  
  a[href^="tel:"]::after {
    content: " (Phone: " attr(href) ")";
  }
}
```

### Print-Specific React Components

#### Print Button Component
```typescript
// components/PrintButton.tsx
import React from 'react';

interface PrintButtonProps {
  className?: string;
  children?: React.ReactNode;
  printTitle?: string;
}

export function PrintButton({ 
  className = '', 
  children = 'Print Page',
  printTitle 
}: PrintButtonProps) {
  const handlePrint = () => {
    // Set print title if provided
    if (printTitle) {
      const originalTitle = document.title;
      document.title = printTitle;
      
      window.print();
      
      // Restore original title
      document.title = originalTitle;
    } else {
      window.print();
    }
  };

  return (
    <button
      onClick={handlePrint}
      className={`print-button no-print ${className}`}
      type="button"
      aria-label="Print this page"
    >
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        aria-hidden="true"
      >
        <polyline points="6,9 6,2 18,2 18,9" />
        <path d="M6,18H4a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2H20a2,2,0,0,1,2,2v5a2,2,0,0,1-2,2H18" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
      {children}
    </button>
  );
}
```

#### Print-Optimized Layout Component
```typescript
// components/PrintLayout.tsx
import React from 'react';

interface PrintLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

export function PrintLayout({
  title,
  subtitle,
  children,
  showHeader = true,
  showFooter = true,
  headerContent,
  footerContent,
}: PrintLayoutProps) {
  return (
    <div className="print-layout">
      {showHeader && (
        <div className="print-header print-only">
          {headerContent || (
            <>
              <h1 className="print-text-center print-mb-2">{title}</h1>
              {subtitle && (
                <p className="print-text-center print-text-sm print-mb-0">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </div>
      )}
      
      <main className="print-content">
        {children}
      </main>
      
      {showFooter && (
        <div className="print-footer print-only">
          {footerContent || (
            <p className="print-text-xs">
              Printed from Kafen Farm - {new Date().toLocaleDateString('en-ZA')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
```

### Print Optimization Guidelines

#### Content Preparation for Print
```markdown
### Print Content Guidelines

#### Essential Information Priority:
1. **Critical Details**: Contact info, booking details, pricing
2. **Important Content**: Activity descriptions, terms, policies  
3. **Supporting Info**: Additional details, recommendations
4. **Remove**: Interactive elements, navigation, advertisements

#### Text Optimization:
- Use high contrast colors (black text on white background)
- Ensure font sizes are readable (minimum 11pt for body text)
- Avoid light gray text or low contrast combinations
- Use bold text sparingly for emphasis

#### Layout Considerations:
- Design for A4 paper size (210 × 297mm)
- Account for printer margins (typically 2cm on all sides)
- Avoid content that spans across page breaks
- Use page breaks strategically for logical sections

#### Image Handling:
- Convert color images to grayscale if appropriate
- Ensure images are high resolution for print quality
- Provide alt text that makes sense in print context
- Consider removing decorative images to save ink
```

#### Print Testing Checklist
```css
/* Print testing utilities - add to development builds */
@media screen {
  .print-test-mode {
    max-width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    padding: 2cm;
    background: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    font-size: 12pt;
    line-height: 1.4;
  }
  
  .print-test-mode * {
    color: black !important;
    background: white !important;
  }
  
  .print-test-mode .no-print {
    display: none !important;
  }
  
  .print-test-mode .print-only {
    display: block !important;
  }
}
```

#### Print Performance Optimization
```typescript
// utils/printOptimization.ts
export class PrintOptimizer {
  // Prepare page for printing
  static preparePage(): void {
    // Hide non-essential elements
    const elementsToHide = document.querySelectorAll('.no-print');
    elementsToHide.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
    
    // Show print-only elements
    const printElements = document.querySelectorAll('.print-only');
    printElements.forEach(el => {
      (el as HTMLElement).style.display = 'block';
    });
    
    // Optimize images for print
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.dataset.printSrc) {
        img.src = img.dataset.printSrc;
      }
    });
  }
  
  // Restore page after printing
  static restorePage(): void {
    // Restore hidden elements
    const elementsToShow = document.querySelectorAll('.no-print');
    elementsToShow.forEach(el => {
      (el as HTMLElement).style.display = '';
    });
    
    // Hide print-only elements
    const printElements = document.querySelectorAll('.print-only');
    printElements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
  }
  
  // Enhanced print function
  static print(title?: string): void {
    const originalTitle = document.title;
    
    if (title) {
      document.title = title;
    }
    
    this.preparePage();
    
    // Listen for print events
    window.addEventListener('beforeprint', this.preparePage);
    window.addEventListener('afterprint', () => {
      this.restorePage();
      if (title) {
        document.title = originalTitle;
      }
    });
    
    window.print();
  }
}
```

---

## 2. Color Palette

Primary colors and roles. Use colors purposefully to create hierarchy, draw attention, and evoke warmth.

| Swatch | Name | Role | HEX | RGB | Usage |
|---|---:|---|---:|---:|---|
| ● | Lawley Clay | Primary | #A15D43 | 161, 93, 67 | Main CTAs, important headings, section backgrounds, branding elements.
| ● | Winter Grass | Secondary (Background) | #F7F5F2 | 247, 245, 242 | Primary page background to create light, airy space.
| ● | Highveld Sun | Accent | #E8A13A | 232, 161, 58 | Links, hover states, form focus, small highlights. Use sparingly.
| ● | Jozi Night Sky | Neutral (Text) | #313133 | 49, 49, 51 | All primary body copy and main text for readability.
| ● | Acacia Leaf | Neutral (Support) | #4A5D55 | 74, 93, 85 | Secondary text, captions, alternative panels and accents.

Accessibility notes:
- Ensure AA contrast or better for text over backgrounds. When using color overlays on photos, check contrast for legibility.
- Prefer Jozi Night Sky for primary body copy; reserve Lawley Clay for CTAs and important accents.

Token guidance (for dev teams):
- Provide tokens in both hex and HSL where CSS expects HSL variables. Example:
  - --lawley-clay: 17 41% 45%  (H S% L%) -> used as hsl(var(--lawley-clay))
  - --winter-grass: 36 24% 96%
  - --highveld-sun: 36 79% 57%
  - --jozi-night: 240 3% 20%
  - --acacia-leaf: 154 11% 33%

---

## 3. Typography

Typeface pairing:
- Headings: Cormorant Garamond — elegant, characterful serif for headings.
- Body & UI: Nunito Sans — rounded, friendly sans-serif for readable copy and forms.

Type scale (desktop reference):

| Element | Font Family | Weight | Size (px) | Line Height | Usage |
|---|---:|---:|---:|---:|---|
| H1 | Cormorant Garamond | SemiBold | 48 | 1.2 | Hero & main page titles.
| H2 | Cormorant Garamond | Regular | 32 | 1.3 | Major section headings.
| H3 | Nunito Sans | Bold | 18 | 1.4 | Sub-headings, card titles.
| H4 / Label | Nunito Sans | Bold | 16 | 1.5 | Form labels, small titles — ALL CAPS, letter-spacing: 1px.
| Body | Nunito Sans | Regular | 18 | 1.6 | Paragraph text.
| Caption | Nunito Sans | Regular | 14 | 1.5 | Image captions, helper text.

Usage rules:
- Line length: 50–75 characters per line for optimum readability.
- Maintain heading order for accessibility (H1 → H2 → H3 …). Do not skip heading levels.

Web fonts: include Cormorant Garamond and Nunito Sans with appropriate font-weight subsets (400/600/700 as required).

---

## 4. Spacing & Grid System

Base unit: 8px. All spacing should be multiples of 8.

Spacing scale:
- 4px (0.5x): micro spacing.
- 8px (1x): small spacing (icon ↔ text).
- 16px (2x): standard component padding.
- 24px (3x): gaps between related items.
- 32px (4x): medium spacing around components.
- 48px (6x): spacing between distinct content sections.
- 64px (8x): large layout divisions.

Grid & layout:
- Responsive 12-column grid.
- Max content width: 1200px.
- Gutter width: 24px.
- Responsive collapse: 12 → 8 (tablet) → 4 (mobile).

Container rules:
- Center containers horizontally, apply horizontal padding aligned to the spacing scale (e.g., 16–24px on small screens).

### Responsive Design Breakpoints
```css
/* Mobile First Approach */
/* Base styles: 320px+ (mobile) */
.container { padding: 16px; }

/* Small tablets: 640px+ */
@media (min-width: 640px) {
  .container { padding: 24px; max-width: 640px; }
}

/* Tablets: 768px+ */
@media (min-width: 768px) {
  .container { padding: 32px; max-width: 768px; }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .container { padding: 48px; max-width: 1024px; }
}

/* Large desktop: 1280px+ */
@media (min-width: 1280px) {
  .container { padding: 64px; max-width: 1200px; }
}
```

### Grid System Implementation
```css
.grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(12, 1fr);
}

/* Responsive grid adjustments */
@media (max-width: 768px) {
  .grid { grid-template-columns: repeat(8, 1fr); gap: 16px; }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: repeat(4, 1fr); gap: 12px; }
}

/* Grid span utilities */
.col-span-1 { grid-column: span 1; }
.col-span-2 { grid-column: span 2; }
.col-span-3 { grid-column: span 3; }
.col-span-4 { grid-column: span 4; }
.col-span-6 { grid-column: span 6; }
.col-span-8 { grid-column: span 8; }
.col-span-12 { grid-column: span 12; }
```

---

## 16. Decision Trees & Best Practices

### Design Decision Trees

#### Color Selection Decision Tree
```
Choosing a color?
├── Is it for text?
│   ├── Primary content → Jozi Night (#313133)
│   ├── Secondary content → Acacia Leaf (#4A5D52)
│   ├── Accent/links → Lawley Clay (#A67C52)
│   └── On dark backgrounds → Winter Grass (#F7F5F0)
├── Is it for backgrounds?
│   ├── Primary surface → Winter Grass (#F7F5F0)
│   ├── Elevated surface → White (#FFFFFF)
│   ├── Accent surface → Lawley Clay (#A67C52)
│   └── Alert/warning → Highveld Sun (#E6B547)
└── Is it for interactive elements?
    ├── Primary action → Lawley Clay (#A67C52)
    ├── Secondary action → Transparent with Lawley Clay border
    ├── Hover state → Lawley Clay at 90% opacity
    └── Focus state → Highveld Sun ring
```

#### Typography Decision Tree
```
Choosing typography?
├── Is it a heading?
│   ├── Page title (H1) → Cormorant Garamond, 48px, Bold
│   ├── Section title (H2) → Cormorant Garamond, 36px, Bold
│   ├── Subsection (H3) → Cormorant Garamond, 24px, Bold
│   └── Small heading (H4-H6) → Nunito Sans, 18-20px, Bold
├── Is it body text?
│   ├── Primary content → Nunito Sans, 16px, Regular
│   ├── Secondary content → Nunito Sans, 14px, Regular
│   └── Caption/meta → Nunito Sans, 12px, Regular
└── Is it UI text?
    ├── Button labels → Nunito Sans, 16px, Bold
    ├── Form labels → Nunito Sans, 14px, Medium
    ├── Input text → Nunito Sans, 16px, Regular
    └── Navigation → Nunito Sans, 16px, Medium
```

#### Spacing Decision Tree
```
Choosing spacing?
├── Between components?
│   ├── Tight grouping → 8px (space-sm)
│   ├── Related elements → 16px (space-md)
│   ├── Section separation → 32px (space-xl)
│   └── Page sections → 64px (space-3xl)
├── Within components?
│   ├── Button padding → 12px vertical, 24px horizontal
│   ├── Card padding → 24px all sides
│   ├── Form field spacing → 16px between fields
│   └── List item spacing → 8px between items
└── Layout spacing?
    ├── Container margins → 16px mobile, 24px desktop
    ├── Grid gaps → 16px mobile, 24px desktop
    └── Content max-width → 1200px
```

#### Component State Decision Tree
```
Designing component states?
├── Interactive element?
│   ├── Default → Base design system styles
│   ├── Hover → Subtle color/shadow change
│   ├── Active → Pressed appearance (scale/shadow)
│   ├── Focus → Visible focus ring (accessibility)
│   └── Disabled → 60% opacity, no interactions
├── Data-driven element?
│   ├── Loading → Skeleton or spinner
│   ├── Empty → Illustration + helpful message
│   ├── Error → Error icon + retry action
│   └── Success → Confirmation feedback
└── Form element?
    ├── Valid → Subtle success indicator
    ├── Invalid → Red border + error message
    ├── Required → Asterisk or indicator
    └── Optional → Clear labeling
```

### Common Design Patterns

#### Card Pattern Variations
```typescript
// Basic Card Pattern
interface CardPattern {
  elevation: 'flat' | 'raised' | 'floating';
  padding: 'compact' | 'comfortable' | 'spacious';
  border: 'none' | 'subtle' | 'prominent';
  hover: 'none' | 'lift' | 'glow' | 'scale';
}

// Usage Examples:
// Product card: { elevation: 'raised', padding: 'comfortable', border: 'none', hover: 'lift' }
// Info card: { elevation: 'flat', padding: 'spacious', border: 'subtle', hover: 'none' }
// Action card: { elevation: 'floating', padding: 'compact', border: 'none', hover: 'scale' }
```

#### Navigation Pattern Guidelines
```css
/* Primary Navigation */
.nav-primary {
  /* Sticky positioning for easy access */
  position: sticky;
  top: 0;
  z-index: 50;
  
  /* Design system colors */
  background: var(--winter-grass);
  border-bottom: 1px solid var(--acacia-leaf);
  
  /* Typography */
  font-family: var(--font-sans);
  font-weight: 600;
}

/* Breadcrumb Navigation */
.nav-breadcrumb {
  /* Subtle styling to not compete with content */
  color: var(--acacia-leaf);
  font-size: 14px;
  
  /* Separator styling */
  .separator {
    margin: 0 8px;
    opacity: 0.6;
  }
  
  /* Current page styling */
  .current {
    color: var(--jozi-night);
    font-weight: 500;
  }
}

/* Tab Navigation */
.nav-tabs {
  /* Clean, minimal appearance */
  border-bottom: 2px solid var(--winter-grass);
  
  .tab {
    /* Consistent spacing */
    padding: 12px 24px;
    
    /* Active state */
    &.active {
      border-bottom: 2px solid var(--lawley-clay);
      color: var(--lawley-clay);
    }
    
    /* Hover state */
    &:hover:not(.active) {
      background: var(--winter-grass);
    }
  }
}
```

#### Form Pattern Best Practices
```css
/* Form Layout Pattern */
.form-pattern {
  /* Consistent spacing */
  .form-group {
    margin-bottom: 24px;
  }
  
  /* Label styling */
  .form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--jozi-night);
  }
  
  /* Input styling */
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #D1D5DB;
    border-radius: 8px;
    font-size: 16px; /* Prevents zoom on iOS */
    
    /* Focus state */
    &:focus {
      outline: none;
      border-color: var(--lawley-clay);
      box-shadow: 0 0 0 3px var(--lawley-clay-20);
    }
    
    /* Error state */
    &.error {
      border-color: #EF4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }
  
  /* Error message styling */
  .form-error {
    margin-top: 4px;
    font-size: 14px;
    color: #EF4444;
  }
  
  /* Help text styling */
  .form-help {
    margin-top: 4px;
    font-size: 14px;
    color: var(--acacia-leaf);
  }
}
```

### Responsive Design Patterns

#### Mobile-First Breakpoint Strategy
```css
/* Mobile First Approach */
.responsive-pattern {
  /* Base styles (mobile) */
  padding: 16px;
  font-size: 16px;
  
  /* Tablet and up */
  @media (min-width: 768px) {
    padding: 24px;
    font-size: 18px;
  }
  
  /* Desktop and up */
  @media (min-width: 1024px) {
    padding: 32px;
    font-size: 20px;
  }
  
  /* Large desktop */
  @media (min-width: 1280px) {
    padding: 48px;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Grid Responsive Pattern */
.grid-responsive {
  display: grid;
  gap: 16px;
  
  /* Mobile: 1 column */
  grid-template-columns: 1fr;
  
  /* Tablet: 2 columns */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  /* Desktop: 3 columns */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
```

#### Touch-Friendly Design Patterns
```css
/* Touch Target Guidelines */
.touch-friendly {
  /* Minimum 44px touch targets */
  min-height: 44px;
  min-width: 44px;
  
  /* Adequate spacing between touch targets */
  margin: 8px;
  
  /* Clear visual feedback */
  transition: all 0.2s ease;
  
  &:hover, &:focus {
    transform: scale(1.02);
  }
  
  &:active {
    transform: scale(0.98);
  }
}

/* Swipe Gesture Indicators */
.swipeable {
  position: relative;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Scroll indicators */
  &::after {
    content: '';
    position: absolute;
    bottom: 8px;
    right: 16px;
    width: 24px;
    height: 4px;
    background: var(--acacia-leaf);
    border-radius: 2px;
    opacity: 0.5;
  }
}
```

## 17. Troubleshooting Guide

### Common Design Issues

#### Color Contrast Problems
```css
/* Issue: Poor contrast ratios */
/* Solution: Use design system color combinations */

/* ❌ Poor contrast */
.bad-contrast {
  color: #A67C52; /* Lawley Clay */
  background: #E6B547; /* Highveld Sun */
  /* Contrast ratio: 2.1:1 (fails WCAG AA) */
}

/* ✅ Good contrast */
.good-contrast {
  color: #313133; /* Jozi Night */
  background: #F7F5F0; /* Winter Grass */
  /* Contrast ratio: 12.5:1 (passes WCAG AAA) */
}

/* ✅ Alternative good contrast */
.alt-good-contrast {
  color: #F7F5F0; /* Winter Grass */
  background: #A67C52; /* Lawley Clay */
  /* Contrast ratio: 5.8:1 (passes WCAG AA) */
}
```

#### Typography Hierarchy Issues
```css
/* Issue: Unclear hierarchy */
/* Solution: Use consistent scale and weights */

/* ❌ Inconsistent hierarchy */
.bad-hierarchy h1 { font-size: 28px; font-weight: 400; }
.bad-hierarchy h2 { font-size: 32px; font-weight: 600; }
.bad-hierarchy h3 { font-size: 18px; font-weight: 700; }

/* ✅ Clear hierarchy */
.good-hierarchy h1 { 
  font-family: var(--font-serif);
  font-size: 48px; 
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
}
.good-hierarchy h2 { 
  font-family: var(--font-serif);
  font-size: 36px; 
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 16px;
}
.good-hierarchy h3 { 
  font-family: var(--font-serif);
  font-size: 24px; 
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 12px;
}
```

#### Spacing Inconsistencies
```css
/* Issue: Random spacing values */
/* Solution: Use design system spacing scale */

/* ❌ Inconsistent spacing */
.bad-spacing {
  margin: 13px 7px 21px 15px;
  padding: 9px 11px;
}

/* ✅ Consistent spacing using scale */
.good-spacing {
  margin: var(--space-md) var(--space-sm) var(--space-lg) var(--space-md);
  padding: var(--space-sm) var(--space-md);
}

/* ✅ Even better: logical spacing */
.better-spacing {
  margin-block: var(--space-md) var(--space-lg);
  margin-inline: var(--space-sm) var(--space-md);
  padding: var(--space-sm) var(--space-md);
}
```

### Responsive Design Issues

#### Mobile Layout Problems
```css
/* Issue: Desktop-first thinking */
/* Solution: Mobile-first responsive design */

/* ❌ Desktop-first approach */
.desktop-first {
  width: 1200px;
  padding: 48px;
  font-size: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 16px;
    font-size: 16px;
  }
}

/* ✅ Mobile-first approach */
.mobile-first {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  
  @media (min-width: 768px) {
    padding: 24px;
    font-size: 18px;
  }
  
  @media (min-width: 1024px) {
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px;
    font-size: 20px;
  }
}
```

#### Touch Target Issues
```css
/* Issue: Touch targets too small */
/* Solution: Minimum 44px touch targets */

/* ❌ Too small for touch */
.small-touch {
  width: 24px;
  height: 24px;
  padding: 4px;
}

/* ✅ Touch-friendly size */
.touch-friendly {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
  
  /* Visual feedback for touch */
  transition: transform 0.1s ease;
  
  &:active {
    transform: scale(0.95);
  }
}
```

### Accessibility Issues

#### Focus Management Problems
```css
/* Issue: No visible focus indicators */
/* Solution: Clear focus states */

/* ❌ No focus indicator */
.no-focus:focus {
  outline: none;
}

/* ✅ Clear focus indicator */
.clear-focus:focus {
  outline: 2px solid var(--highveld-sun);
  outline-offset: 2px;
}

/* ✅ Custom focus ring */
.custom-focus:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--highveld-sun-20);
  border-color: var(--highveld-sun);
}
```

#### Screen Reader Issues
```html
<!-- Issue: Missing semantic markup -->
<!-- Solution: Proper ARIA labels and semantic HTML -->

<!-- ❌ Poor accessibility -->
<div class="button" onclick="submit()">Submit</div>
<div class="heading">Page Title</div>
<div class="list">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
</div>

<!-- ✅ Good accessibility -->
<button type="submit" aria-describedby="submit-help">
  Submit Form
</button>
<h1>Page Title</h1>
<ul role="list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
<div id="submit-help" class="sr-only">
  This will submit your form data
</div>
```

## 18. Best Practices Summary

### Design System Compliance
- ✅ Always use design tokens instead of hardcoded values
- ✅ Follow the 8px spacing scale consistently
- ✅ Use the defined color palette for all UI elements
- ✅ Implement all component states (hover, focus, active, disabled)
- ✅ Test designs across all defined breakpoints

### Typography Best Practices
- ✅ Use Cormorant Garamond for headings and display text
- ✅ Use Nunito Sans for body text and UI elements
- ✅ Maintain consistent line heights (1.2 for headings, 1.6 for body)
- ✅ Ensure adequate contrast ratios (4.5:1 minimum)
- ✅ Use appropriate font sizes for different screen sizes

### Layout & Spacing
- ✅ Follow mobile-first responsive design principles
- ✅ Use CSS Grid for complex layouts, Flexbox for component layouts
- ✅ Maintain consistent spacing using the design system scale
- ✅ Ensure touch targets are minimum 44px on mobile
- ✅ Use logical properties (margin-block, padding-inline) when possible

### Color Usage
- ✅ Use Lawley Clay for primary actions and accents
- ✅ Use Winter Grass for primary backgrounds
- ✅ Use Jozi Night for primary text content
- ✅ Use Acacia Leaf for secondary text and subtle elements
- ✅ Use Highveld Sun sparingly for highlights and warnings

### Accessibility
- ✅ Provide clear focus indicators for all interactive elements
- ✅ Use semantic HTML elements and ARIA labels appropriately
- ✅ Ensure all content is keyboard navigable
- ✅ Test with screen readers and accessibility tools
- ✅ Maintain proper heading hierarchy (h1 → h2 → h3)

### Performance
- ✅ Optimize images for different screen densities
- ✅ Use CSS transforms for animations (not layout properties)
- ✅ Implement lazy loading for images and heavy content
- ✅ Minimize CSS bundle size by using only necessary utilities
- ✅ Use system fonts as fallbacks for web fonts

### Consistency
- ✅ Document all design decisions and patterns
- ✅ Use consistent naming conventions for classes and components
- ✅ Regularly audit designs for compliance with the system
- ✅ Update the design system when new patterns emerge
- ✅ Communicate changes to the entire team

---

End of design system.

## 5. Component Guidelines

General
- Components should feel tactile and organic. Use softer radii, subtle shadows, and warm, muted overlays.
- Break complex components into smaller reusable pieces.

### Component State Variations

#### Interactive States for All Components
```css
/* Base component states */
.component {
  transition: all 0.2s ease-in-out;
}

/* Hover states */
.component:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(49,49,51,0.12);
}

/* Focus states */
.component:focus {
  outline: 2px solid var(--highveld-sun);
  outline-offset: 2px;
}

/* Active states */
.component:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(49,49,51,0.08);
}

/* Disabled states */
.component:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

### Loading States & Patterns

#### Loading Spinners
```css
.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #F7F5F2;
  border-top: 2px solid #A15D43;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

#### Skeleton Loaders
```css
.skeleton {
  background: linear-gradient(90deg, #F7F5F2 25%, #FDFCFB 50%, #F7F5F2 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text { height: 16px; margin-bottom: 8px; }
.skeleton-title { height: 24px; width: 60%; margin-bottom: 16px; }
.skeleton-image { height: 200px; width: 100%; }
```

#### Progress Indicators
```css
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #F7F5F2;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #A15D43;
  transition: width 0.3s ease;
  border-radius: 4px;
}
```

### Error States & Patterns

#### Error Messages
```css
.error-state {
  padding: 24px;
  background-color: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 8px;
  color: #DC2626;
}

.error-icon {
  color: #DC2626;
  margin-right: 8px;
}

.error-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.error-message {
  font-size: 14px;
  line-height: 1.5;
}
```

#### Form Field Errors
```css
.form-field.error input {
  border-color: #DC2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.field-error {
  color: #DC2626;
  font-size: 14px;
  margin-top: 4px;
  display: flex;
  align-items: center;
}
```

### Empty States

#### Data Empty States
```css
.empty-state {
  text-align: center;
  padding: 64px 24px;
  color: #4A5D55;
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  opacity: 0.5;
}

.empty-state-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #313133;
}

.empty-state-description {
  font-size: 16px;
  margin-bottom: 24px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
```

### Navigation Patterns

#### Breadcrumbs
```css
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4A5D55;
  margin-bottom: 24px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #A7A6A4;
}

.breadcrumb-link {
  color: #A15D43;
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}
```

#### Pagination
```css
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 32px 0;
}

.pagination-button {
  padding: 8px 12px;
  border: 1px solid #D1D1D1;
  background: #F7F5F2;
  color: #313133;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button:hover {
  background: #A15D43;
  color: #F7F5F2;
  border-color: #A15D43;
}

.pagination-button.active {
  background: #A15D43;
  color: #F7F5F2;
  border-color: #A15D43;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### Tab Navigation
```css
.tabs {
  border-bottom: 1px solid #D1D1D1;
  margin-bottom: 24px;
}

.tab-list {
  display: flex;
  gap: 0;
}

.tab-button {
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: #4A5D55;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab-button:hover {
  color: #A15D43;
}

.tab-button.active {
  color: #A15D43;
  border-bottom-color: #A15D43;
}
```

### Modal & Dialog Patterns

#### Modal Overlay
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(49, 49, 51, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Modal Content
```css
.modal-content {
  background: #F7F5F2;
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(49, 49, 51, 0.15);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: #313133;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #4A5D55;
  padding: 4px;
}
```

### Data Display Patterns

#### Data Tables
```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #F7F5F2;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(49,49,51,0.08);
}

.data-table th {
  background: #A15D43;
  color: #F7F5F2;
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table td {
  padding: 16px;
  border-bottom: 1px solid #E5E5E5;
  color: #313133;
}

.data-table tr:hover {
  background: #FDFCFB;
}
```

#### Card Lists
```css
.card-list {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.data-card {
  background: #F7F5F2;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(49,49,51,0.08);
  transition: all 0.2s ease;
}

.data-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(49,49,51,0.12);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #313133;
}

.card-meta {
  font-size: 14px;
  color: #4A5D55;
}
```

### Feedback Patterns

#### Toast Notifications
```css
.toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toast {
  background: #F7F5F2;
  border-radius: 8px;
  padding: 16px 20px;
  box-shadow: 0 8px 24px rgba(49,49,51,0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 300px;
  animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
  from { 
    opacity: 0;
    transform: translateX(100%);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

.toast.success { border-left: 4px solid #10B981; }
.toast.error { border-left: 4px solid #DC2626; }
.toast.warning { border-left: 4px solid #E8A13A; }
.toast.info { border-left: 4px solid #3B82F6; }
```

#### Alert Banners
```css
.alert {
  padding: 16px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.alert.success {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  color: #065F46;
}

.alert.error {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
}

.alert.warning {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
}

.alert.info {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: #1E40AF;
}
```

### Animation Specifications

#### Timing Functions & Durations
```css
:root {
  /* Easing functions */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Duration scale */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  --duration-slower: 500ms;
}
```

#### Micro-interactions
```css
/* Button press animation */
.button {
  transition: all var(--duration-fast) var(--ease-out);
}

.button:active {
  transform: scale(0.98);
}

/* Card hover animation */
.card {
  transition: all var(--duration-normal) var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(49,49,51,0.15);
}

/* Input focus animation */
.input {
  transition: all var(--duration-normal) var(--ease-out);
}

.input:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(232, 161, 58, 0.2);
}
```

#### Page Transitions
```css
/* Fade in animation for page content */
.page-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all var(--duration-slow) var(--ease-out);
}

/* Stagger animation for lists */
.list-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp var(--duration-normal) var(--ease-out) forwards;
}

.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 100ms; }
.list-item:nth-child(3) { animation-delay: 200ms; }
.list-item:nth-child(4) { animation-delay: 300ms; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

Buttons
- Shape: Pill-shaped (border-radius: 100px).
- Padding: 12px vertical × 24px horizontal.
- Typography: Nunito Sans, Bold, 16px.

Primary Button (Enquire / CTA)
- Background: Lawley Clay (#A15D43)
- Text: Winter Grass (#F7F5F2)
- Hover: lighten to #B57155
- Disabled: BG #A7A6A4, text Winter Grass, opacity 60%

Secondary Button (Outlined)
- Default: Transparent background, 1px solid Lawley Clay, text Lawley Clay
- Hover: Fill with Winter Grass (#FDFCFB) or a very light clay tint
- Disabled: Border and text #A7A6A4 @ 60% opacity

Forms (Inputs)
- Background: Winter Grass
- Border: 1px solid #D1D1D1
- Border-radius: 8px
- Padding: 12px × 16px
- Text color: Jozi Night Sky
- Label: Above field, using H4/Label style (ALL CAPS)
- Focus state: Border changes to Highveld Sun (#E8A13A)
- Error state: Border #D93B3B, error text in same color beneath field

Image Cards
- Background panel: Winter Grass
- Border-radius: 12px
- Shadow: 0px 4px 12px rgba(49,49,51,0.08)
- Image: fills top portion, no border
- Content padding: 24px inside text area

Text overlays on images
- Minimal overlay with subtle gradient behind text for readability.
- Keep overlay opacity low; avoid blocking imagery.

---

## 6. Iconography & Illustration

- Use simple line-art illustrations (protea, acacia branch, putt-putt flag, hiking boot) as decorative accents and to create a local, handcrafted feel.
- Color illustrations primarily with Acacia Leaf or Lawley Clay, depending on context.
- Reserve illustrated elements for section dividers, list bullets, and subtle background patterns — they should not dominate content.

---

## 7. Interaction, Motion & Photo Treatment

Motion principles
- Animations should be subtle and meaningful.
- On-scroll: fade-in + gentle upward motion (e.g., 0 → 12px up, 0 → 1 opacity) with 0.5–0.8s easing.
- Images: very slow, subtle zoom (scale up ~1.03–1.06) on hover or when revealed.

Photo treatment
- Edit imagery with a warm, golden-hour filter to maintain consistent warmth.
- Prefer candid photos of people enjoying the space.

Ambient hover
- On gallery images: reveal a short handwritten-style caption in a small overlay (e.g., “Sunset on the West Ridge”). Keep subtle and tasteful.

---

## 8. Accessibility & Semantics

- Use proper semantic HTML: <nav>, <main>, <section>, <header>, <footer>, <form>, <label>, etc.
- Provide descriptive alt text for all meaningful images.
- Ensure interactive elements are keyboard-focusable and provide visible focus states.
- Maintain minimum AA contrast for text. Use tools for verification.
- Use ARIA where appropriate (e.g., ARIA-live regions for notifications). Avoid overusing ARIA when native semantics suffice.

---

## 9. Patterns & Pages (Examples)

Hero / Above the fold
- Large photo with warm overlay.
- H1 (Cormorant Garamond, 48px) headline.
- Short supporting paragraph (Nunito Sans 18px).
- Primary CTA "Plan Your Event" (Lawley Clay pill) and secondary action "Explore Activities" (outlined).

Immediate choices
- Three large cards: Host an Event / Family Day Out / Our Activities. Visual, actionable, and link to relevant pages.

Sticky navigation
- Clean simple nav that shrinks on scroll. Keep Enquire Now visible on the far right.

Plan Your Perfect Day (Day Builder)
- A short, playful form that reads like a story. Selections should reveal curated suggestions below.

Explore / Activities
- Image-heavy pages with operating hours, pricing, what to bring and CTAs top & bottom.

---

## 10. Tokens & Export

Provide design tokens for colors, typography, spacing, radii, and shadows. Example token set (JSON / CSV) should include:
- color.primary: #A15D43
- color.background: #F7F5F2
- color.accent: #E8A13A
- color.text: #313133
- color.support: #4A5D55
- font.family.serif: "Cormorant Garamond"
- font.family.sans: "Nunito Sans"
- radius.pill: 100px
- radius.card: 12px
- shadow.card: 0 4px 12px rgba(49,49,51,0.08)

Note: If you generate CSS variables intended for tailwind hsl() usage, export HSL tokens (e.g. "17 41% 45%") so they can be used as hsl(var(--token)).

---

## 11. Developer Notes

- Keep shared components (Header, Footer, Buttons, Inputs, Cards) in a common components folder and reuse tokens.
- When changing color variables in CSS, use the HSL format if Tailwind is configured to read colors via hsl(var(--...)). Mixing formats (RGB vs HSL) may cause unexpected color shifts.
- Provide a small set of example components and pages (Hero, NavBar, Activities, EventPlan) that follow the system.

---

## 12. Content & Editorial Guidance

Photography: prioritize authenticity — people enjoying the farm, golden-hour light, candid interactions.
Tone of voice: warm, inviting, human. Keep microcopy concise and encouraging (e.g., "Plan your event" vs "Submit a request").

---

## 13. Export to Sheets

To export:
1. Create a CSV with two columns: token_name, token_value.
2. Include color tokens (hex and hsl where relevant), typography tokens, spacing scale, radii and shadows.
3. Import into Google Sheets and format the swatches column using the HEX values for visual reference.

---

## 14. Maintenance & Governance

- Keep this document alongside source in the repository as `DESIGN_SYSTEM.md`.
- When updating tokens, update the token files and global styles concurrently and run visual review.
- For major design changes, open a design PR with screenshots and visual diffs.

---

## 15. Design-to-Code Integration Guide

This section bridges the gap between design specifications and technical implementation, ensuring seamless collaboration between design and development teams.

### Design Token Implementation

#### CSS Custom Properties Setup
```css
/* client/global.css - Design Token Implementation */
:root {
  /* Color tokens (HSL format for Tailwind compatibility) */
  --lawley-clay: 17 41% 45%;
  --winter-grass: 36 24% 96%;
  --highveld-sun: 36 79% 57%;
  --jozi-night: 240 3% 20%;
  --acacia-leaf: 154 11% 33%;

  /* Typography tokens */
  --font-serif: "Cormorant Garamond", serif;
  --font-sans: "Nunito Sans", sans-serif;

  /* Spacing tokens */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Border radius tokens */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 100px;

  /* Shadow tokens */
  --shadow-sm: 0 2px 4px rgba(49,49,51,0.05);
  --shadow-md: 0 4px 12px rgba(49,49,51,0.08);
  --shadow-lg: 0 8px 24px rgba(49,49,51,0.12);
  --shadow-xl: 0 20px 40px rgba(49,49,51,0.15);
}
```

#### Tailwind Configuration Integration
```typescript
// tailwind.config.ts - Token Integration
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./client/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'lawley-clay': 'hsl(var(--lawley-clay) / <alpha-value>)',
        'winter-grass': 'hsl(var(--winter-grass) / <alpha-value>)',
        'highveld-sun': 'hsl(var(--highveld-sun) / <alpha-value>)',
        'jozi-night': 'hsl(var(--jozi-night) / <alpha-value>)',
        'acacia-leaf': 'hsl(var(--acacia-leaf) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'pill': 'var(--radius-pill)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Radix UI Component Styling

#### Button Component Implementation
```typescript
// client/components/ui/Button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles following design system
  "inline-flex items-center justify-center rounded-pill font-sans font-bold text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highveld-sun focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        // Primary button (Lawley Clay)
        primary: "bg-lawley-clay text-winter-grass hover:bg-lawley-clay/90 active:scale-98",
        // Secondary button (Outlined)
        secondary: "border border-lawley-clay text-lawley-clay bg-transparent hover:bg-winter-grass/50",
        // Ghost button
        ghost: "text-lawley-clay hover:bg-winter-grass/50",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
```

#### Input Component Implementation
```typescript
// client/components/ui/Input.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles from design system
          "flex w-full rounded-md border bg-winter-grass px-4 py-3 text-base text-jozi-night placeholder:text-acacia-leaf/60 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-highveld-sun focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Error state
          error 
            ? "border-red-500 focus:ring-red-500/20" 
            : "border-gray-300 hover:border-lawley-clay/50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
```

### Component Library Alignment

#### Design System Component Mapping
```typescript
// client/components/ui/index.ts - Component Export Map
export { Button } from './Button';
export { Input } from './Input';
export { Card, CardHeader, CardContent, CardFooter } from './Card';
export { Badge } from './Badge';
export { Avatar, AvatarImage, AvatarFallback } from './Avatar';
export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './Dialog';
export { Toast, ToastProvider, ToastViewport } from './Toast';
export { Skeleton } from './Skeleton';
export { Progress } from './Progress';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
export { Alert, AlertDescription, AlertTitle } from './Alert';

// Design system utilities
export { cn } from '@/lib/utils';
export type { ButtonProps } from './Button';
export type { InputProps } from './Input';
```

#### Card Component Following Design System
```typescript
// client/components/ui/Card.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Design system card styles
      "rounded-lg bg-winter-grass shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
      className
    )}
    {...props}
  />
));

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
```

### Design System Compliance Checking

#### ESLint Rules for Design System
```json
// .eslintrc.json - Design System Rules
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    // Enforce design system color usage
    "no-restricted-syntax": [
      "error",
      {
        "selector": "Literal[value=/^#[0-9a-fA-F]{3,6}$/]",
        "message": "Use design system color tokens instead of hardcoded hex values"
      }
    ],
    // Enforce spacing scale usage
    "no-restricted-properties": [
      {
        "object": "className",
        "property": "*",
        "message": "Use design system spacing tokens (space-xs, space-sm, etc.) instead of arbitrary values"
      }
    ]
  }
}
```

#### Design System Validation Hook
```typescript
// client/hooks/useDesignSystemValidation.ts
import { useEffect } from 'react';

export const useDesignSystemValidation = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Check for hardcoded colors
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        const backgroundColor = computedStyle.backgroundColor;
        const color = computedStyle.color;
        
        // Warn about non-design-system colors
        if (backgroundColor && !backgroundColor.includes('var(--')) {
          console.warn('Element using non-design-system background color:', el, backgroundColor);
        }
        if (color && !color.includes('var(--')) {
          console.warn('Element using non-design-system text color:', el, color);
        }
      });
    }
  }, []);
};
```

### Implementation Workflow

#### Design-to-Code Process
1. **Design Handoff**: Designer exports tokens and component specifications
2. **Token Sync**: Update CSS custom properties and Tailwind config
3. **Component Implementation**: Build Radix UI components with design system styles
4. **Validation**: Run design system compliance checks
5. **Testing**: Verify visual consistency across breakpoints
6. **Documentation**: Update component documentation with usage examples

#### Component Development Checklist
```typescript
// Component Development Checklist
interface ComponentChecklist {
  // Design System Compliance
  usesDesignTokens: boolean;        // ✓ Uses CSS custom properties
  followsSpacingScale: boolean;     // ✓ Uses 8px spacing scale
  implementsAllStates: boolean;     // ✓ Hover, focus, active, disabled
  
  // Accessibility
  hasProperSemantics: boolean;      // ✓ Semantic HTML elements
  keyboardNavigable: boolean;       // ✓ Tab navigation works
  screenReaderFriendly: boolean;    // ✓ ARIA labels and descriptions
  
  // Responsive Design
  mobileFirst: boolean;             // ✓ Mobile-first CSS approach
  breakpointTested: boolean;        // ✓ Tested across all breakpoints
  touchFriendly: boolean;           // ✓ 44px minimum touch targets
  
  // Performance
  optimizedAnimations: boolean;     // ✓ Uses transform/opacity for animations
  lazyLoadingReady: boolean;        // ✓ Supports lazy loading if applicable
  bundleSizeOptimized: boolean;     // ✓ Tree-shakeable exports
}
```

### Cross-Document Consistency

#### Shared Type Definitions
```typescript
// shared/design-system.ts - Shared Design System Types
export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    support: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  typography: {
    fontFamily: {
      serif: string;
      sans: string;
    };
    fontSize: {
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
  };
}

export interface ComponentVariants {
  button: 'primary' | 'secondary' | 'ghost';
  card: 'default' | 'elevated' | 'outlined';
  input: 'default' | 'error' | 'success';
}
```

#### Documentation Sync Script
```typescript
// scripts/sync-design-docs.ts
import fs from 'fs';
import path from 'path';

interface DesignSystemSync {
  syncTokensFromDesignSystem(): void;
  validateComponentImplementation(): void;
  generateComponentDocs(): void;
}

class DesignSystemSyncer implements DesignSystemSync {
  syncTokensFromDesignSystem() {
    // Read DESIGN_SYSTEM.md
    const designSystemPath = path.join(process.cwd(), 'DESIGN_SYSTEM.md');
    const designSystemContent = fs.readFileSync(designSystemPath, 'utf-8');
    
    // Extract color tokens
    const colorMatches = designSystemContent.match(/\| ● \| (.*?) \| (.*?) \| (#[A-Fa-f0-9]{6})/g);
    
    // Update CSS custom properties
    const cssTokens = colorMatches?.map(match => {
      const [, name, , hex] = match.split('|').map(s => s.trim());
      return `--${name.toLowerCase().replace(/\s+/g, '-')}: ${this.hexToHsl(hex)};`;
    }).join('\n  ');
    
    console.log('Synced design tokens:', cssTokens);
  }
  
  validateComponentImplementation() {
    // Check if all design system components are implemented
    const componentsDir = path.join(process.cwd(), 'client/components/ui');
    const implementedComponents = fs.readdirSync(componentsDir);
    
    console.log('Implemented components:', implementedComponents);
  }
  
  generateComponentDocs() {
    // Generate component documentation from implementations
    console.log('Generating component documentation...');
  }
  
  private hexToHsl(hex: string): string {
    // Convert hex to HSL for Tailwind compatibility
    // Implementation would go here
    return hex; // Placeholder
  }
}

// Usage: npm run sync-design-system
const syncer = new DesignSystemSyncer();
syncer.syncTokensFromDesignSystem();
syncer.validateComponentImplementation();
syncer.generateComponentDocs();
```

---

## 19. Dark Mode Strategy

### Color Token Adaptations

#### Automatic Dark Mode (System Preference)
```css
/* Base light mode tokens (default) */
:root {
  --lawley-clay: 166 124 82;
  --winter-grass: 247 245 240;
  --jozi-night: 49 49 51;
  --acacia-leaf: 74 93 82;
  --highveld-sun: 230 181 71;
  
  /* Semantic color mappings */
  --color-primary: var(--lawley-clay);
  --color-surface: var(--winter-grass);
  --color-text: var(--jozi-night);
  --color-text-secondary: var(--acacia-leaf);
  --color-accent: var(--highveld-sun);
}

/* Dark mode adaptations */
@media (prefers-color-scheme: dark) {
  :root {
    /* Adapted color values for dark mode */
    --lawley-clay: 200 150 110; /* Lighter, more saturated */
    --winter-grass: 28 28 30; /* Dark surface */
    --jozi-night: 245 245 247; /* Light text */
    --acacia-leaf: 142 165 151; /* Muted secondary text */
    --highveld-sun: 255 214 102; /* Brighter accent */
    
    /* Dark mode specific tokens */
    --color-surface-elevated: 44 44 46;
    --color-surface-overlay: 58 58 60;
    --color-border: 72 72 74;
    --color-border-subtle: 58 58 60;
  }
}
```

#### Manual Dark Mode Toggle (Class-based)
```css
/* Light mode (default) */
:root {
  --lawley-clay: 166 124 82;
  --winter-grass: 247 245 240;
  --jozi-night: 49 49 51;
  --acacia-leaf: 74 93 82;
  --highveld-sun: 230 181 71;
}

/* Dark mode override */
.dark {
  --lawley-clay: 200 150 110;
  --winter-grass: 28 28 30;
  --jozi-night: 245 245 247;
  --acacia-leaf: 142 165 151;
  --highveld-sun: 255 214 102;
  
  /* Additional dark mode tokens */
  --color-surface-elevated: 44 44 46;
  --color-surface-overlay: 58 58 60;
  --color-border: 72 72 74;
  --color-shadow: 0 0 0 / 0.3;
}

/* Dark mode component adaptations */
.dark .card {
  background: rgb(var(--color-surface-elevated));
  border-color: rgb(var(--color-border));
}

.dark .button-secondary {
  background: transparent;
  border-color: rgb(var(--lawley-clay));
  color: rgb(var(--lawley-clay));
}

.dark .button-secondary:hover {
  background: rgb(var(--lawley-clay) / 0.1);
}
```

### Dark Mode Implementation Patterns

#### React Hook for Theme Management
```typescript
// hooks/use-theme.ts
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      
      const handler = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    localStorage.setItem('theme', theme);
  }, [theme, resolvedTheme]);

  return { theme, setTheme, resolvedTheme };
}
```

#### Theme Toggle Component
```typescript
// components/ThemeToggle.tsx
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const;

  return (
    <div className="flex rounded-lg border border-border p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            flex items-center gap-2 rounded px-3 py-1.5 text-sm transition-colors
            ${theme === value 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-muted'
            }
          `}
          aria-label={`Switch to ${label} theme`}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
```

### Dark Mode Design Guidelines

#### Color Contrast in Dark Mode
```css
/* Ensure proper contrast ratios in dark mode */
.dark {
  /* Text contrast requirements */
  --text-primary-contrast: 12.5:1; /* AAA compliant */
  --text-secondary-contrast: 7:1; /* AA compliant */
  --interactive-contrast: 4.5:1; /* Minimum for interactive elements */
}

/* Dark mode specific color combinations */
.dark .text-primary { color: rgb(245 245 247); } /* High contrast */
.dark .text-secondary { color: rgb(142 165 151); } /* Medium contrast */
.dark .text-muted { color: rgb(99 99 102); } /* Low contrast for less important text */

/* Interactive elements in dark mode */
.dark .link {
  color: rgb(255 214 102); /* Brighter accent for visibility */
}

.dark .link:hover {
  color: rgb(255 224 130); /* Even brighter on hover */
}
```

#### Image and Media Adaptations
```css
/* Image adaptations for dark mode */
.dark img {
  /* Reduce brightness of images in dark mode */
  filter: brightness(0.9) contrast(1.1);
}

.dark .hero-image {
  /* Specific adjustments for hero images */
  filter: brightness(0.8) contrast(1.2);
}

.dark .logo {
  /* Logo variations for dark mode */
  filter: invert(1) brightness(0.9);
}

/* SVG icon adaptations */
.dark .icon {
  color: rgb(var(--jozi-night)); /* Use adapted text color */
}

.dark .icon-muted {
  color: rgb(var(--acacia-leaf));
  opacity: 0.8;
}
```

#### Shadow and Elevation in Dark Mode
```css
.dark {
  /* Adjusted shadows for dark backgrounds */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4);
}

/* Card elevation in dark mode */
.dark .card {
  box-shadow: var(--shadow-md);
  border: 1px solid rgb(var(--color-border));
}

.dark .card:hover {
  box-shadow: var(--shadow-lg);
}

/* Modal overlays in dark mode */
.dark .modal-overlay {
  background: rgb(0 0 0 / 0.8); /* Darker overlay */
}
```

### Tailwind CSS Dark Mode Configuration

#### Tailwind Config Updates
```javascript
// tailwind.config.ts
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'lawley-clay': {
          DEFAULT: 'rgb(166 124 82)',
          50: 'rgb(248 244 238)',
          100: 'rgb(241 232 220)',
          500: 'rgb(166 124 82)',
          600: 'rgb(149 111 74)',
          900: 'rgb(83 62 41)',
        },
        // Dark mode adaptations will use CSS variables
        primary: 'rgb(var(--lawley-clay) / <alpha-value>)',
        surface: 'rgb(var(--winter-grass) / <alpha-value>)',
        'text-primary': 'rgb(var(--jozi-night) / <alpha-value>)',
        'text-secondary': 'rgb(var(--acacia-leaf) / <alpha-value>)',
      },
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgb(0 0 0 / 0.3)',
        'dark-md': '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
        'dark-lg': '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
      }
    }
  }
}
```

#### Component Dark Mode Classes
```css
/* Utility classes for dark mode */
.dark-mode-transition {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

/* Component-specific dark mode styles */
.button {
  @apply dark-mode-transition;
}

.button-primary {
  @apply bg-primary text-white;
  @apply dark:bg-primary dark:text-surface;
}

.button-secondary {
  @apply bg-transparent border border-primary text-primary;
  @apply dark:border-primary dark:text-primary dark:hover:bg-primary/10;
}

.card {
  @apply bg-surface border border-border shadow-md;
  @apply dark:bg-surface-elevated dark:border-border dark:shadow-dark-md;
}

.input {
  @apply bg-surface border border-border text-text-primary;
  @apply dark:bg-surface-elevated dark:border-border dark:text-text-primary;
  @apply focus:border-primary focus:ring-primary/20;
}
```

---
