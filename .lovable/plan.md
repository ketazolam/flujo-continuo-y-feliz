

## Plan: New Typography (Sora + Clash Display style via Space Grotesk) & Enhanced Animations

### 1. Typography Upgrade: Sora + Space Grotesk

Replacing Inter with **Sora** — a geometric, clean sans-serif that feels more modern and sporty. Keeping **Space Grotesk** for headings since it pairs excellently with Sora and already works well.

**Files:**
- `src/index.css` — Update Google Fonts import to load `Sora` instead of `Inter`
- `tailwind.config.ts` — Change `inter` font family to `Sora`
- `src/index.css` utility — Rename `.font-inter` to `.font-sora`
- **All components** referencing `font-inter` updated to `font-sora`

### 2. Animation Improvements

Enhance animations across all sections for a more polished, fluid feel:

**Hero (`shape-landing-hero.tsx`)**:
- Add a subtle scale-up on the title (from 0.9 to 1)
- Add a gentle continuous glow pulse on the CTA button
- Geometric shapes: faster initial entrance, more varied float speeds

**Noticias (`Noticias.tsx`)**:
- Featured card: add a subtle `scale: 0.98 → 1` on entrance
- Grid cards: stagger with `0.1s` delay + add `whileHover` slight lift (`y: -4, scale: 1.02`)

**Fechas (`Fechas.tsx`)**:
- Change entrance from `x: -20` to a combination of `opacity + y: 20` (smoother)
- Add `whileHover` scale effect on fixture cards
- Add a pulsing "LIVE" dot indicator for today's matches

**Estadisticas (`Estadisticas.tsx`)**:
- Add animated number counting effect using framer-motion `useMotionValue` + `useTransform` for the stat values
- Cards get `whileHover` lift effect

**Cronicas (`Cronicas.tsx`)**:
- Add `whileHover` card lift with shadow increase
- Tag pills get a subtle shimmer/glow

**Galeria (`Galeria.tsx`)**:
- Add `whileHover` zoom effect on gallery items

**Global**:
- All section header animations get a slight `scale` component (0.95 → 1) alongside the existing `y` translation for more impact
- Add `transition-shadow` to all card hover states for depth

### 3. Files Changed

| File | Changes |
|------|---------|
| `src/index.css` | Sora font import, utility class rename |
| `tailwind.config.ts` | `sora` font family |
| `src/components/ui/shape-landing-hero.tsx` | Title scale animation, CTA glow, faster shapes |
| `src/components/landing/Noticias.tsx` | Hover lifts, featured scale entrance |
| `src/components/landing/Fechas.tsx` | Smoother entrance, hover effects |
| `src/components/landing/Estadisticas.tsx` | Animated counters, hover lifts |
| `src/components/landing/Cronicas.tsx` | Hover lift + shadow |
| `src/components/landing/Galeria.tsx` | Hover zoom |
| `src/components/landing/Contacto.tsx` | Font update |
| `src/components/landing/Footer.tsx` | Font update |
| `src/components/landing/Navbar.tsx` | Font update |
| `src/components/landing/Tienda.tsx` | Font update |
| `src/components/ui/pricing.tsx` | Font update |
| All admin components | Font update |

