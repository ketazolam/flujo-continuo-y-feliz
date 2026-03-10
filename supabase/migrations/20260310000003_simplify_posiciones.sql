-- Migrate any records with removed positions to 'carrusel'
UPDATE publicidad
SET posicion = 'carrusel'
WHERE posicion NOT IN ('carrusel', 'video-bajo-reproductor', 'articulo-final', 'popup');

-- Replace constraint with simplified list
ALTER TABLE publicidad DROP CONSTRAINT IF EXISTS publicidad_posicion_check;

ALTER TABLE publicidad
  ADD CONSTRAINT publicidad_posicion_check
  CHECK (posicion IN (
    'carrusel',
    'video-bajo-reproductor',
    'articulo-final',
    'popup'
  ));

-- Update default
ALTER TABLE publicidad ALTER COLUMN posicion SET DEFAULT 'carrusel';
