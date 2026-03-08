

## Plan: Replace Hero with Geometric Shape Hero

Replace the current static Hero with the animated `HeroGeometric` component, adapted for the sports theme.

### Files to Create/Edit

1. **Create `src/components/ui/shape-landing-hero.tsx`**
   - Copy the provided `HeroGeometric` and `ElegantShape` components
   - Remove `"use client"` directive
   - Adapt gradient colors to use green theme (`from-emerald-500/[0.08]` instead of `from-white/[0.08]`)
   - Dependencies already installed: `framer-motion`, `lucide-react`

2. **Edit `src/components/landing/Hero.tsx`**
   - Import and render `HeroGeometric` with sports-themed props:
     - `badge`: "PORTAL DEPORTIVO · FÚTBOL JUVENIL"
     - `title1`: "SEMILLERO"
     - `title2`: "DE CAMPEONES"
   - Add the subtitle text and "Explorar contenido" CTA button below the component, or extend the component props to accept custom description and button
   - Keep the bottom fade gradient

### Approach
Rather than modifying the `HeroGeometric` internals heavily, I'll extend it with optional `description` and `ctaText`/`ctaHref` props so the subtitle and button from the current hero are preserved. The geometric shapes will use green-tinted gradients to match the theme.

