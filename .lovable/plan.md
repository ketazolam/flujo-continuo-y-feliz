

# Plan: Mejoras integrales para Semillero de Campeones

Este es un plan completo para transformar el sitio de estático a dinámico, con imágenes reales, autenticación segura y mejor diseño.

---

## Fase 1: Configurar Lovable Cloud (base de todo)

Activar Lovable Cloud para tener base de datos, storage y autenticación. Esto es prerequisito para las demás mejoras.

- Crear las tablas necesarias:
  - `noticias` (id, titulo, tag, descripcion, fecha, imagen_url, tiempo_lectura, categoria)
  - `galeria` (id, titulo, tipo, imagen_url, created_at)
  - `estadisticas` (id, categoria, label, value, suffix)
  - `fechas` (id, fecha, dia, hora, local, visitante, categoria, sede, en_vivo)
  - `quienes_somos` (id, titulo, descripcion, icono)
- Crear bucket de storage `imagenes` (público) para fotos de galería, noticias, etc.
- Habilitar RLS en todas las tablas: lectura pública, escritura solo autenticados.

## Fase 2: Autenticación real del admin

Reemplazar el login hardcodeado por autenticación con Supabase Auth.

- Crear tabla `user_roles` con enum `app_role` (admin, user) y función `has_role()` security definer.
- Modificar `AdminLogin.tsx` para usar `supabase.auth.signInWithPassword()`.
- Proteger el panel admin verificando rol desde la base de datos.
- Agregar logout real con `supabase.auth.signOut()`.

## Fase 3: Subida de imágenes

Permitir cargar imágenes reales desde el panel admin.

- En `GaleriaPanel.tsx`: agregar input de archivo que suba al bucket `imagenes` y guarde la URL en la tabla `galeria`.
- En `NoticiasPanel.tsx`: agregar campo de imagen destacada.
- Los componentes de la landing (`Galeria.tsx`, `Noticias.tsx`) mostrarán las imágenes reales usando la URL pública del storage.

## Fase 4: Datos dinámicos (landing conectada al admin)

Reemplazar los datos hardcodeados por consultas a Supabase.

- Cada sección de la landing hace `select` a su tabla correspondiente.
- El admin panel hace `insert`, `update`, `delete` sobre esas tablas.
- Usar `@tanstack/react-query` (ya instalado) para fetching y cache.

## Fase 5: Mejoras de diseño visual

- Reemplazar emojis del navbar y footer por iconos de Lucide (ya instalado).
- Mejorar cards de galería para mostrar imágenes reales con overlay de texto.
- Mejorar la card de noticias destacada con imagen de fondo.
- Refinar hover effects y transiciones.

---

## Orden de implementación

1. Lovable Cloud + tablas + storage bucket
2. Autenticación + roles
3. Admin CRUD conectado a Supabase
4. Landing dinámico con datos reales
5. Pulido visual

Este es un proyecto grande que haremos paso a paso. Empezamos configurando Lovable Cloud.

