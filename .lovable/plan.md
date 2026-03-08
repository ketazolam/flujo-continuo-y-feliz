

## Plan: Integrate Pricing Component into Tienda

Replace the current product card grid in the Tienda section with an adapted version of the provided Pricing component, styled to match the sports shop theme.

### Adaptations Required

The provided component is Next.js-based and uses several external deps. Key changes:
- Replace `Link` (next/link) with `<a>` or react-router `Link`
- Replace `useMediaQuery` with existing `useIsMobile` hook
- Remove `"use client"` directives
- Adapt the 3 plans to represent the 3 product categories: **Fotos**, **Videos**, **Packs**

### New Dependencies to Install
- `framer-motion` — animations
- `canvas-confetti` — confetti effect on toggle
- `@number-flow/react` — animated number transitions

(Already installed: lucide-react, @radix-ui/react-slot, class-variance-authority, @radix-ui/react-label, @radix-ui/react-switch)

### Files to Create/Edit

1. **Create `src/hooks/use-media-query.tsx`** — simple `useMediaQuery` hook wrapping `window.matchMedia`

2. **Create `src/components/ui/pricing.tsx`** — Adapted pricing component:
   - Remove `"use client"`, replace `Link` with `<a>` tags
   - Use the existing shadcn button, label, switch components
   - Keep framer-motion animations, confetti, NumberFlow

3. **Edit `src/components/landing/Tienda.tsx`** — Replace the current card grid with the `Pricing` component:
   - 3 plans mapped to shop categories:
     - **Fotos** (Individual): $5.000 / $4.000 yearly equivalent
     - **Videos** (Highlights): $12.000 / $10.000
     - **Packs** (Completo): $45.000 / $36.000
   - Toggle switches between "Por evento" / "Paquete mensual"
   - "Comprar" buttons link to WhatsApp
   - Videos plan marked as `isPopular`
   - Keep the section header and Spanish copy

### Plan Data Structure

```typescript
const plans = [
  {
    name: "FOTOS",
    price: "8000",
    yearlyPrice: "6000",
    period: "por evento",
    features: ["Alta resolución", "Descarga digital", "45+ fotos por partido", "Retoque profesional", "Entrega en 24h"],
    description: "Fotos profesionales de cada partido",
    buttonText: "Comprar por WhatsApp",
    href: "https://wa.me/573000000000",
    isPopular: false,
  },
  // ... Videos (isPopular: true), Packs
];
```

### Visual Result
The Tienda section will show 3 pricing-style cards with animated price transitions, a monthly/event toggle with confetti, feature checkmarks, and WhatsApp purchase buttons — all in the existing dark green theme.

