

# Plan: Lightbox funcional + Responsive optimization

## Problema actual
1. **Lightbox de galería**: El Dialog tiene `[&>button]:hidden` que oculta el botón de cierre default, pero el lightbox debería funcionar. El problema probable es que el `DialogContent` tiene estilos de posicionamiento fijo (`max-w-lg`, grid layout) que interfieren con el contenido de pantalla completa. Además, el dialog default agrega su propio botón X encima del custom.
2. **Noticias con imágenes**: Las noticias con imagen no tienen lightbox — al hacer click no pasa nada.
3. **Responsive**: Varios componentes necesitan ajustes para mobile (textos grandes, espaciados, grids).

## Cambios a realizar

### 1. Galeria.tsx — Fix lightbox completo
- Reemplazar el `Dialog` de Radix por un portal manual (`createPortal`) con overlay full-screen para evitar conflictos con los estilos default del DialogContent.
- Overlay negro semi-transparente con `fixed inset-0 z-[100]`.
- Imagen centrada con `max-w-[90vw] max-h-[85vh] object-contain`.
- Navegación con flechas y cierre con X y click en overlay.
- Soporte keyboard: Escape para cerrar, flechas para navegar.
- En mobile: botones de navegación más grandes, swipe-friendly.

### 2. Noticias.tsx — Agregar lightbox para imágenes de noticias
- Al hacer click en una noticia con imagen, abrir un lightbox similar mostrando la imagen en grande con título y descripción.

### 3. Responsive optimizations (todos los componentes landing)
- **Navbar**: Ya responsive con hamburger menu — OK.
- **Hero**: Reducir tamaño de título en mobile (`text-4xl` en vez de `text-6xl`), ajustar padding.
- **QuienesSomos**: Grid `grid-cols-1` en mobile ya funciona — OK.
- **Galeria**: Grid `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` para mejor vista en phones pequeños.
- **Estadísticas**: Grid `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`.
- **Fechas**: Ya responsive con flex-col — reducir padding en mobile.
- **Noticias**: Featured article height más chico en mobile, grid `grid-cols-1 sm:grid-cols-2`.
- **Tienda/Contacto**: Ajustar spacing `py-16 md:py-28`.
- **Secciones generales**: Reducir `py-28` a `py-16 md:py-28` en mobile para menos scroll vacío.

### Archivos a modificar
- `src/components/landing/Galeria.tsx` — Lightbox con portal, responsive grid
- `src/components/landing/Noticias.tsx` — Lightbox para imágenes, responsive
- `src/components/landing/Hero.tsx` — Nada (hero component es externo)
- `src/components/ui/shape-landing-hero.tsx` — Responsive title sizes
- `src/components/landing/QuienesSomos.tsx` — Spacing responsive
- `src/components/landing/Estadisticas.tsx` — Spacing + grid responsive
- `src/components/landing/Fechas.tsx` — Spacing responsive
- `src/components/landing/Tienda.tsx` — Spacing responsive
- `src/components/landing/Contacto.tsx` — Spacing responsive
- `src/components/landing/Footer.tsx` — Minor adjustments

