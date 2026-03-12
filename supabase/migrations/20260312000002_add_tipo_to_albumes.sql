-- Add tipo column to albumes to differentiate photo albums from video albums
ALTER TABLE albumes ADD COLUMN IF NOT EXISTS tipo text NOT NULL DEFAULT 'fotos' CHECK (tipo IN ('fotos', 'videos'));
