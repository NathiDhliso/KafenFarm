# Fusion Starter

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

---

## AI System Prompt Guidelines

### Mandatory Documentation References

**CRITICAL**: All AI assistants working on this project MUST reference and adhere to the following system documentation before making any changes:

1. **Design System**: `DESIGN_SYSTEM.md` - Contains comprehensive UI/UX guidelines, component specifications, styling rules, and brand standards
2. **Technical Guidelines**: `AGENTS.md` (this file) - Contains development patterns, architecture decisions, and implementation standards

### AI Interaction Protocol

#### Before Every Task
AI assistants MUST:
1. **Read the relevant sections** of both `DESIGN_SYSTEM.md` and `AGENTS.md`
2. **Verify alignment** with existing patterns and standards
3. **Reference specific sections** when making decisions
4. **Explain deviations** if any standards cannot be followed

#### Documentation Adherence Checklist
- [ ] Have I reviewed the Design System for UI/styling requirements?
- [ ] Have I checked AGENTS.md for technical implementation patterns?
- [ ] Am I following the established component architecture?
- [ ] Am I using the correct color palette and design tokens?
- [ ] Am I following the established file structure conventions?
- [ ] Am I implementing proper error handling as specified?
- [ ] Am I following the performance guidelines?
- [ ] Am I using the correct testing patterns?

#### Required References Format
When implementing features, AI assistants must explicitly reference documentation:
```
Following DESIGN_SYSTEM.md Section X.Y: [specific guideline]
Implementing per AGENTS.md pattern: [specific pattern]
```

#### Automated Reminder System
AI assistants should include these validation prompts in their workflow:

**🔍 SYSTEM CHECK**: Before proceeding, have you:
- ✅ Reviewed DESIGN_SYSTEM.md for applicable guidelines?
- ✅ Checked AGENTS.md for technical patterns?
- ✅ Validated against AI_VALIDATION_CHECKLIST.md?

**📋 IMPLEMENTATION REMINDER**: During development:
- 🎨 Use only defined colors from the palette
- 📐 Follow spacing and typography scales
- 🧩 Match component specifications exactly
- ♿ Include accessibility requirements
- ⚡ Meet performance standards

**✅ COMPLETION VALIDATION**: Before finishing:
- 🔍 Cross-reference with documentation
- 🧪 Run validation checklist
- 📊 Verify performance impact
- 🎯 Confirm accessibility compliance

#### Validation Requirements
Before completing any task, AI assistants must:
1. Cross-reference implementation with both documentation files
2. Ensure consistency with existing codebase patterns
3. Validate that all design tokens and components are used correctly
4. Confirm adherence to performance and accessibility standards

### System Documentation Structure

#### DESIGN_SYSTEM.md Contains:
- Brand identity and color palettes
- Typography and spacing systems
- Component specifications and usage
- Accessibility requirements
- Performance standards
- Print and media guidelines

#### AGENTS.md Contains:
- Technical architecture patterns
- Development workflows
- Testing strategies
- Deployment configurations
- Code organization standards
- Security guidelines

### Enforcement Mechanisms

#### Automated Checks
AI assistants should validate:
- Color usage against defined palette
- Component usage against specifications
- File structure against conventions
- Code patterns against established standards

#### Manual Verification
Before task completion, verify:
- Visual consistency with design system
- Code quality against technical standards
- Performance impact within budgets
- Accessibility compliance

### Common Violations to Avoid

#### Design System Violations:
- Using colors not in the defined palette
- Ignoring spacing and typography scales
- Creating components that don't follow specifications
- Missing accessibility attributes

#### Technical Standard Violations:
- Not following established file structure
- Ignoring error handling patterns
- Missing proper TypeScript types
- Not implementing proper testing

### Documentation Updates

When modifying either documentation file:
1. Update this checklist if new standards are added
2. Ensure all AI interactions reference the latest version
3. Validate that existing implementations still comply
4. Update any automated validation rules

While the starter comes with a express server, only create endpoint when strictly neccesary, for example to encapsulate logic that must leave in the server, such as private keys handling, or certain DB operations, db...

## Tech Stack

- **PNPM**: Prefer pnpm
- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx                # App entry point and with SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example of how to share api interfaces
```

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `client/pages/Index.tsx` represents the home page.
- Routes are defined in `client/App.tsx` using the `react-router-dom` import
- Route files are located in the `client/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme and design tokens**: Configure in `client/global.css` 
- **UI components**: Pre-built library in `client/components/ui/`
- **Utility**: `cn()` function combines `clsx` + `tailwind-merge` for conditional classes

```typescript
// cn utility usage
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes
- `GET /api/ping` - Simple ping api
- `GET /api/demo` - Demo endpoint  

### Shared Types
Import consistent types in both client and server:
```typescript
import { DemoResponse } from '@shared/api';
```

Path aliases:
- `@shared/*` - Shared folder
- `@/*` - Client folder

## Development Commands

```bash
pnpm dev        # Start dev server (client + server)
pnpm build      # Production build
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test          # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `client/global.css` and `tailwind.config.ts` and add new tailwind colors.

### New API Route
1. **Optional**: Create a shared interface in `shared/api.ts`:
```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Create a new route handler in `server/routes/my-route.ts`:
```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: 'Hello from my endpoint!'
  };
  res.json(response);
};
```

3. Register the route in `server/index.ts`:
```typescript
import { handleMyRoute } from "./routes/my-route";

// Add to the createServer function:
app.get("/api/my-endpoint", handleMyRoute);
```

4. Use in React components with type safety:
```typescript
import { MyRouteResponse } from '@shared/api'; // Optional: for type safety

const response = await fetch('/api/my-endpoint');
const data: MyRouteResponse = await response.json();
```

### New Page Route
1. Create component in `client/pages/MyPage.tsx`
2. Add route in `client/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- **Standard**: `pnpm build`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud Deployment**: Use Vercel or other cloud providers for easy deployment.

## Error Handling Guidelines

### Client-Side Error Handling
```typescript
// API Error Handling Pattern
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    // Handle error appropriately (show toast, set error state, etc.)
    throw error; // Re-throw if component needs to handle it
  }
};

// Form Validation with Zod
import { z } from 'zod';

const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactForm = z.infer<typeof ContactFormSchema>;
```

### Server-Side Error Handling
```typescript
// Express Error Middleware
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation failed', details: err.message });
  }
  
  res.status(500).json({ error: 'Internal server error' });
};

// Use in server/index.ts
app.use(errorHandler);
```

## State Management Patterns

### React State Management
```typescript
// useState for local component state
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<DataType[]>([]);

// useReducer for complex state logic
interface State {
  data: DataType[];
  loading: boolean;
  error: string | null;
}

type Action = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: DataType[] }
  | { type: 'FETCH_ERROR'; payload: string };

const dataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
```

### Context for Global State
```typescript
// contexts/AppContext.tsx
interface AppContextType {
  user: User | null;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
```

## Data Fetching Patterns

### Custom Hooks for Data Fetching
```typescript
// hooks/useApi.ts
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>(url: string) => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error: error.message });
      }
    };

    fetchData();
  }, [url]);

  return state;
};

// Usage in components
const MyComponent = () => {
  const { data, loading, error } = useApi<DataType[]>('/api/data');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return <EmptyState />;
  
  return <DataList data={data} />;
};
```

## Form Handling Patterns

### Controlled Forms with Validation
```typescript
// components/ContactForm.tsx
import { useState } from 'react';
import { z } from 'zod';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate with Zod
      ContactFormSchema.parse(formData);
      setErrors({});
      
      setSubmitting(true);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      // Success handling
      setFormData({ name: '', email: '', message: '' });
      // Show success toast
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        className={cn("input", errors.name && "input-error")}
      />
      {errors.name && <span className="error-text">{errors.name}</span>}
      {/* Other fields... */}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
```

## Testing Guidelines

### Component Testing with Vitest
```typescript
// __tests__/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactForm from '../components/ContactForm';

describe('ContactForm', () => {
  it('validates required fields', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true })
    });

    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello world!' } });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object));
    });
  });
});
```

### API Testing
```typescript
// __tests__/api.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createServer } from '../server';

describe('API Endpoints', () => {
  const app = createServer();

  it('GET /api/ping returns pong', async () => {
    const response = await request(app)
      .get('/api/ping')
      .expect(200);
    
    expect(response.body).toEqual({ message: 'pong' });
  });

  it('POST /api/contact validates input', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({ name: '', email: 'invalid', message: '' })
      .expect(400);
    
    expect(response.body.error).toBe('Validation failed');
  });
});
```

## Performance Considerations

### Code Splitting and Lazy Loading
```typescript
// Lazy load pages
import { lazy, Suspense } from 'react';

const Activities = lazy(() => import('./pages/Activities'));
const EventPlan = lazy(() => import('./pages/EventPlan'));

// In App.tsx
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/activities" element={<Activities />} />
    <Route path="/event-plan" element={<EventPlan />} />
  </Routes>
</Suspense>
```

### Memoization Patterns
```typescript
// useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return data.reduce((acc, item) => acc + item.value, 0);
}, [data]);

// useCallback for event handlers
const handleClick = useCallback((id: string) => {
  setSelectedId(id);
}, []);

// React.memo for component optimization
const ExpensiveComponent = React.memo(({ data }: { data: DataType[] }) => {
  return <div>{/* Render data */}</div>;
});
```

### Image Optimization
```typescript
// Lazy loading images
const LazyImage = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className="relative">
      {!loaded && <div className="skeleton-loader" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn("transition-opacity", loaded ? "opacity-100" : "opacity-0")}
        {...props}
      />
    </div>
  );
};
```

## Security Guidelines

### Input Sanitization
```typescript
// Server-side validation with Zod
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(1).max(100).regex(/^[a-zA-Z\s]+$/, 'Name contains invalid characters'),
  email: z.string().email().max(255),
  message: z.string().min(10).max(1000)
});

// Sanitize HTML content
import DOMPurify from 'isomorphic-dompurify';

const sanitizeHtml = (html: string) => {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ['b', 'i', 'em', 'strong'] });
};
```

### Environment Variables
```typescript
// Validate environment variables at startup
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(32)
});

const env = envSchema.parse(process.env);
```

### CORS Configuration
```typescript
// server/index.ts
import cors from 'cors';

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:8080'],
  credentials: true
};

app.use(cors(corsOptions));
```

## Environment Configuration

### Environment Variables Setup
```bash
# .env.example
NODE_ENV=development
PORT=8080
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-super-secret-jwt-key-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Configuration Management
```typescript
// config/index.ts
interface Config {
  port: number;
  nodeEnv: string;
  database: {
    url: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export const config: Config = {
  port: Number(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || 'sqlite:./dev.db'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-for-dev',
    expiresIn: '7d'
  }
};
```

## Code Organization Best Practices

### File Structure Conventions
```
client/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form-specific components
│   ├── layout/          # Layout components (Header, Footer)
│   └── features/        # Feature-specific components
├── hooks/               # Custom React hooks
├── contexts/            # React contexts
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── constants/           # Application constants

server/
├── routes/              # API route handlers
├── middleware/          # Express middleware
├── services/            # Business logic
├── models/              # Data models
└── utils/               # Server utilities
```

### Component Organization
```typescript
// components/features/ContactSection/index.ts
export { ContactSection } from './ContactSection';
export type { ContactSectionProps } from './types';

// components/features/ContactSection/ContactSection.tsx
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';
import type { ContactSectionProps } from './types';

export const ContactSection = ({ variant }: ContactSectionProps) => {
  return (
    <section className="contact-section">
      <ContactInfo />
      <ContactForm />
    </section>
  );
};
```

## Deployment Specifics

### Production Build Optimization
```json
// package.json scripts
{
  "scripts": {
    "build": "tsc && vite build",
    "build:analyze": "vite build --mode analyze",
    "preview": "vite preview",
    "start": "node dist/server/index.js",
    "docker:build": "docker build -t kafen-farm .",
    "docker:run": "docker run -p 8080:8080 kafen-farm"
  }
}
```

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 8080
CMD ["npm", "start"]
```

### Vercel Deployment
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ]
}
```

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces
- Robust error handling and validation at all layers
- Performance optimized with code splitting and lazy loading
- Security-first approach with input validation and sanitization
- Comprehensive testing strategy with Vitest
- Scalable code organization patterns

---

## 12. Decision Trees & Best Practices

### When to Use What: Component Decision Tree

```
Need a UI Component?
├── Is it interactive?
│   ├── Yes → Use Radix UI primitive + custom styling
│   │   ├── Button/Link → Button component
│   │   ├── Form input → Input/Select/Checkbox components
│   │   ├── Modal/Popup → Dialog/Popover components
│   │   └── Navigation → Tabs/Accordion components
│   └── No → Use semantic HTML + Tailwind
│       ├── Text content → <p>, <h1-h6>, <span>
│       ├── Layout → <div>, <section>, <article>
│       └── Media → <img>, <video>, <svg>
```

### State Management Decision Tree

```
Need to manage state?
├── Component-only state?
│   ├── Simple value → useState
│   ├── Complex object → useReducer
│   └── Derived state → useMemo
├── Share between components?
│   ├── Parent-child → Props drilling
│   ├── Sibling components → Lift state up
│   └── Distant components → Context API
└── Server state?
    ├── Simple fetch → useApi hook
    ├── Complex caching → React Query/SWR
    └── Real-time → WebSocket + useEffect
```

### API Route Decision Tree

```
Creating an API endpoint?
├── What HTTP method?
│   ├── GET → Data retrieval (no side effects)
│   ├── POST → Create new resource
│   ├── PUT → Update entire resource
│   ├── PATCH → Update partial resource
│   └── DELETE → Remove resource
├── Need authentication?
│   ├── Yes → Add auth middleware
│   └── No → Public endpoint
└── Need validation?
    ├── Yes → Use Zod schema
    └── No → Basic type checking
```

### Performance Optimization Decision Tree

```
Performance issue?
├── Bundle size too large?
│   ├── Use dynamic imports
│   ├── Implement code splitting
│   └── Tree-shake unused code
├── Slow rendering?
│   ├── Use React.memo
│   ├── Optimize re-renders with useMemo/useCallback
│   └── Implement virtualization for large lists
├── Slow API calls?
│   ├── Add loading states
│   ├── Implement caching
│   └── Use pagination
└── Poor user experience?
    ├── Add skeleton screens
    ├── Implement optimistic updates
    └── Use progressive loading
```

## 13. Common Patterns & Solutions

### Authentication Pattern
```typescript
// client/hooks/useAuth.tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Login failed');
      
      const userData = await response.json();
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Data Fetching with Error Handling Pattern
```typescript
// client/hooks/useApiWithRetry.ts
import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions {
  retries?: number;
  retryDelay?: number;
  enabled?: boolean;
}

export function useApiWithRetry<T>(
  url: string,
  options: UseApiOptions = {}
) {
  const { retries = 3, retryDelay = 1000, enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (attempt = 0): Promise<void> => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      
      if (attempt < retries) {
        setTimeout(() => fetchData(attempt + 1), retryDelay);
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, enabled, retries, retryDelay]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  return { data, error, isLoading, refetch };
}
```

### Form Validation Pattern
```typescript
// client/hooks/useFormValidation.ts
import { useState, useCallback } from 'react';
import { z } from 'zod';

export function useFormValidation<T extends Record<string, any>>(
  schema: z.ZodSchema<T>,
  initialValues: T
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const setTouched = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const validate = useCallback((): boolean => {
    try {
      schema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof T, string>> = {};
        error.errors.forEach(err => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as keyof T] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  }, [values, schema]);

  const handleSubmit = useCallback((onSubmit: (values: T) => void | Promise<void>) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Record<keyof T, boolean>);
      setTouched(allTouched);

      if (validate()) {
        await onSubmit(values);
      }
    };
  }, [values, validate]);

  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validate,
    handleSubmit,
    isValid: Object.keys(errors).length === 0,
  };
}
```

### Error Boundary Pattern
```typescript
// client/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-winter-grass">
          <div className="text-center p-8">
            <h2 className="text-2xl font-serif text-lawley-clay mb-4">
              Something went wrong
            </h2>
            <p className="text-acacia-leaf mb-6">
              We're sorry, but something unexpected happened.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-lawley-clay text-winter-grass px-6 py-3 rounded-pill font-bold hover:bg-lawley-clay/90 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## 14. Troubleshooting Guide

### Common Issues & Solutions

#### Build Errors

**Issue**: `Module not found: Can't resolve '@/components/ui/Button'`
```bash
# Solution: Check import paths and ensure components exist
# Verify the component is exported from the index file
# client/components/ui/index.ts
export { Button } from './Button';
```

**Issue**: `TypeScript error: Property 'children' does not exist on type`
```typescript
// Solution: Add proper React.FC typing or children prop
interface Props {
  children: React.ReactNode;
}

const Component: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
```

#### Runtime Errors

**Issue**: `Cannot read property 'map' of undefined`
```typescript
// Problem: API data not loaded yet
const items = data?.items || []; // Solution: Use optional chaining + fallback

// Or use loading state
if (isLoading) return <div>Loading...</div>;
if (!data) return <div>No data available</div>;
```

**Issue**: `Hydration mismatch` (if using SSR)
```typescript
// Solution: Ensure server and client render the same content
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null; // Prevent hydration mismatch
```

#### Styling Issues

**Issue**: Tailwind classes not applying
```bash
# Check if class is in content config
# tailwind.config.ts
content: ['./client/**/*.{js,ts,jsx,tsx}']

# Restart dev server after config changes
npm run dev
```

**Issue**: Custom CSS not working
```css
/* Ensure proper CSS import order in main.tsx */
import './index.css'; // Tailwind base styles
import './global.css'; // Custom styles
```

#### API Issues

**Issue**: CORS errors in development
```typescript
// server/index.ts - Add CORS middleware
import cors from 'cors';

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:5173',
  credentials: true,
}));
```

**Issue**: API routes not found
```typescript
// Ensure routes are registered in server/index.ts
import { authRoutes } from './routes/auth';
app.use('/api/auth', authRoutes);

// Check route definitions match request URLs
router.get('/profile', handler); // Matches GET /api/auth/profile
```

### Performance Debugging

#### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check for large dependencies
npm ls --depth=0
```

#### React DevTools Profiler
1. Install React DevTools browser extension
2. Open Profiler tab
3. Record component renders
4. Identify expensive re-renders
5. Optimize with React.memo, useMemo, useCallback

#### Network Performance
```typescript
// Add request timing logs
const startTime = performance.now();
const response = await fetch('/api/data');
const endTime = performance.now();
console.log(`Request took ${endTime - startTime} milliseconds`);
```

### Testing Debugging

#### Component Test Failures
```typescript
// Common issue: Component not rendering
// Solution: Check for missing providers
render(
  <BrowserRouter>
    <AuthProvider>
      <Component />
    </AuthProvider>
  </BrowserRouter>
);
```

#### API Test Failures
```typescript
// Issue: Tests interfering with each other
// Solution: Clean up after each test
afterEach(async () => {
  await request(app).delete('/api/test/cleanup');
});
```

## 15. Best Practices Summary

### Code Organization
- ✅ Use absolute imports with `@/` prefix
- ✅ Group related files in feature folders
- ✅ Keep components small and focused (< 200 lines)
- ✅ Extract custom hooks for reusable logic
- ✅ Use TypeScript interfaces for all data structures

### Performance
- ✅ Implement code splitting for routes
- ✅ Use React.memo for expensive components
- ✅ Optimize images with proper formats and sizes
- ✅ Implement proper loading states
- ✅ Use pagination for large data sets

### Security
- ✅ Validate all inputs with Zod schemas
- ✅ Sanitize user-generated content
- ✅ Use environment variables for secrets
- ✅ Implement proper CORS policies
- ✅ Add rate limiting to API endpoints

### Accessibility
- ✅ Use semantic HTML elements
- ✅ Add proper ARIA labels and descriptions
- ✅ Ensure keyboard navigation works
- ✅ Maintain proper color contrast ratios
- ✅ Test with screen readers

### Testing
- ✅ Write tests for critical user flows
- ✅ Test error states and edge cases
- ✅ Mock external dependencies
- ✅ Use descriptive test names
- ✅ Maintain good test coverage (>80%)

---

## Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Vitest Documentation](https://vitest.dev/)
- [Radix UI Documentation](https://www.radix-ui.com/)

---
