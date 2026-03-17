
-- Table for highlighted goals (videos)
CREATE TABLE public.goles_destacados (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  video_url TEXT NOT NULL,
  miniatura_url TEXT,
  orden INTEGER NOT NULL DEFAULT 0,
  activo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.goles_destacados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read goles_destacados" ON public.goles_destacados FOR SELECT USING (true);
CREATE POLICY "Admin insert goles_destacados" ON public.goles_destacados FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin update goles_destacados" ON public.goles_destacados FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin delete goles_destacados" ON public.goles_destacados FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Table for highlighted players (images)
CREATE TABLE public.figuras_destacadas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  posicion TEXT,
  equipo TEXT,
  imagen_url TEXT,
  descripcion TEXT,
  orden INTEGER NOT NULL DEFAULT 0,
  activo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.figuras_destacadas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read figuras_destacadas" ON public.figuras_destacadas FOR SELECT USING (true);
CREATE POLICY "Admin insert figuras_destacadas" ON public.figuras_destacadas FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin update figuras_destacadas" ON public.figuras_destacadas FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin delete figuras_destacadas" ON public.figuras_destacadas FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
