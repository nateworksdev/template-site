# Blue-Collar Business Template

A modern, config-driven website template for local service businesses (tree care, plumbing, HVAC, landscaping, etc.).

## Features

- **Config-driven**: Edit `config/site.config.ts` to customize all content
- **Theme system**: Brand colors mapped to CSS variables
- **Modular sections**: Hero, Services Grid, Reviews, Process, FAQ, CTA, Gallery
- **Mobile-first**: Responsive design with Vaul drawer navigation
- **Smart Service Estimator**: Interactive multi-step form with pricing estimates
- **Built with**: Next.js 16, TypeScript, Tailwind v4, shadcn/ui

## Quick Start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel
```

## Customization

### 1. Site Configuration

Edit `config/site.config.ts` to change:
- Site name, tagline, description
- Brand colors (primary, secondary, accent)
- Contact information
- Services offered
- Page sections and their order

### 2. Theme Colors

Brand colors are defined in `config/site.config.ts`:

```ts
brand: {
  colors: {
    primary: "#2d5016",   // Main brand color
    secondary: "#8b4513", // Optional secondary
    accent: "#f4a460",    // Optional accent
  }
}
```

These are automatically mapped to CSS variables and used throughout the site.

### 3. Adding Services

Add services to the `services` array in `config/site.config.ts`:

```ts
{
  id: "service-id",
  name: "Service Name",
  slug: "service-slug",
  description: "Short description",
  longDescription: "Longer description for detail page",
  featured: true,
  icon: "lucide-icon-name", // See lucide.dev
  image: "https://example.com/image.jpg",
  pricing: {
    type: "quote" | "starting" | "fixed",
    value: 150, // Optional
  }
}
```

### 4. Home Page Sections

Customize sections in `config/site.config.ts` under `pages.home.sections`:

```ts
sections: [
  { type: "hero", variant: "split", data: { ... } },
  { type: "services", variant: "grid", data: { ... } },
  { type: "reviews", variant: "carousel", data: { ... } },
  // ... more sections
]
```

Available sections:
- **Hero** (minimal | split | fullscreen)
- **Services Grid** (grid | cards)
- **Featured Service**
- **Gallery** (masonry | before-after)
- **Reviews** (carousel | grid)
- **Process**
- **FAQ**
- **CTA**

### 5. Service Estimator

The estimator adapts questions based on service type. Edit question sets in `lib/types/estimator.ts`:

```ts
export const defaultEstimatorQuestions: Record<string, EstimatorQuestion[]> = {
  "service-id": [
    {
      id: "question-id",
      question: "What size is the project?",
      type: "radio",
      options: [
        { value: "small", label: "Small", pricingImpact: 0 },
        { value: "large", label: "Large", pricingImpact: 1 },
      ],
    },
  ],
}
```

### 6. Images

Replace placeholder images in `config/site.config.ts` with your own:

```ts
image: "/images/hero.jpg" // Local
// or
image: "https://example.com/hero.jpg" // Remote
```

Add images to `public/images/`.

### 7. Form Submission

The contact form and estimator currently log to console. To connect a backend:

1. **Option A: Vercel Forms** (easiest)
   - Add `action` attribute to forms
   - Enable in Vercel dashboard

2. **Option B: API Route**
   - Create `app/api/contact/route.ts`
   - Handle POST requests
   - Send email via Resend, SendGrid, etc.

3. **Option C: Third-party service**
   - FormSpree, Basin, etc.

### 8. SEO

Update metadata in:
- `app/layout.tsx` (global)
- Individual page files (page-specific)

### 9. Analytics

Add analytics in `app/layout.tsx`:

```tsx
<Script src="https://analytics.example.com/script.js" />
```

## Deployment

### Vercel (Recommended)

```bash
vercel
```

The project is already linked. Just push to GitHub and Vercel will auto-deploy.

### Environment Variables

None required by default. Add as needed for:
- Email service API keys
- Analytics tokens
- CMS integrations

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Mobile Nav**: Vaul (drawer)
- **Icons**: Lucide
- **Deployment**: Vercel

## License

MIT

---

Built with [OpenClaw](https://openclaw.ai) 🦞
