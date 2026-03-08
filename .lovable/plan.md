

## Plan: Typography Overhaul, Noticias Redesign, Fixture Section & UX Improvements

### 1. Typography Change: Inter + Space Grotesk

**Files:** `src/index.css`, `tailwind.config.ts`

- Replace Google Fonts import: `Outfit` → `Inter`, `Bebas Neue` → `Space Grotesk`
- Update utility classes: `.font-outfit` → `.font-inter`, `.font-bebas` → `.font-space`
- Update tailwind fontFamily config accordingly

**All component files** using `font-bebas` and `font-outfit` will be updated globally:
- `font-bebas` → `font-space font-bold uppercase` (Space Grotesk bold replaces Bebas for headings)
- `font-outfit` on body → `font-inter`
- Files affected: Navbar, Hero (shape-landing-hero), Noticias, Galeria, Estadisticas, Cronicas, Tienda (pricing), Contacto, Footer

### 2. Noticias Section Redesign

**File:** `src/components/landing/Noticias.tsx`

Redesign to feel more like the pricing section — animated cards with framer-motion entrance, more spacing, but lighter:
- Featured article (first) gets a large hero-style card with gradient overlay, taking full width
- Remaining articles render as a horizontal scrollable row of smaller cards (on mobile) / 4-column grid (on desktop)
- Each card gets subtle `motion.div` whileInView entrance animation
- More padding between cards (`gap-8` instead of `gap-6`), section padding increased to `py-28`
- Tags get colored pill badges like the pricing "Popular" badge

### 3. New Section: Próximas Fechas (Fixtures)

**New file:** `src/components/landing/Fechas.tsx`

A new section between Estadísticas and Crónicas showing upcoming match dates:
- Hardcoded fixture data (ready to be replaced with dynamic data later)
- Visual design: horizontal timeline-style cards showing date, teams, category, venue
- Each fixture is a card with: date badge on left, match info in center, category pill on right
- framer-motion staggered entrance
- Sample data: 5-6 upcoming fixtures across Sub-12, Sub-15, Sub-17

**Edit:** `src/pages/Index.tsx` — add `<Fechas />` between Estadísticas and Crónicas, and add "Fechas" to Navbar links

### 4. General UX/Scroll Improvements

- **Increased section spacing**: All sections get `py-28` instead of `py-20` to avoid feeling cramped
- **Smooth scroll-triggered animations**: Add `motion.div` with `whileInView` to section headers across all sections (Galeria, Estadisticas, Cronicas, Contacto)
- **Section dividers**: Add subtle gradient dividers between sections instead of hard `bg-secondary/30` alternating backgrounds
- **Navbar**: Add "Fechas" link

### Summary of Files

| File | Action |
|------|--------|
| `src/index.css` | Replace fonts |
| `tailwind.config.ts` | Update fontFamily |
| `src/components/ui/shape-landing-hero.tsx` | Update font classes |
| `src/components/ui/pricing.tsx` | Update font classes |
| `src/components/landing/Navbar.tsx` | Update fonts + add Fechas link |
| `src/components/landing/Noticias.tsx` | Full redesign with animations |
| `src/components/landing/Galeria.tsx` | Update fonts + add animations + more spacing |
| `src/components/landing/Estadisticas.tsx` | Update fonts + add animations + more spacing |
| `src/components/landing/Cronicas.tsx` | Update fonts + add animations + more spacing |
| `src/components/landing/Fechas.tsx` | **New** — Upcoming fixtures section |
| `src/components/landing/Tienda.tsx` | Update fonts |
| `src/components/landing/Contacto.tsx` | Update fonts + add animations + more spacing |
| `src/components/landing/Footer.tsx` | Update fonts |
| `src/pages/Index.tsx` | Add Fechas component |

