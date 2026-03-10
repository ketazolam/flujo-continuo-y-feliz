-- Add posicion column to publicidad table
ALTER TABLE publicidad
  ADD COLUMN IF NOT EXISTS posicion text NOT NULL DEFAULT 'carrusel'
    CHECK (posicion IN ('carrusel', 'banner_fijo', 'entre_noticias'));
