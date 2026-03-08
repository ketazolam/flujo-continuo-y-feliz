

# Plan: Fecha de publicación + Edición en todos los paneles admin

## 1. Migración de base de datos

Agregar columna `fecha_publicacion` a las tablas que no la tienen:
- `galeria`: agregar `fecha_publicacion timestamptz DEFAULT now()`
- `reportajes`: agregar `fecha_publicacion timestamptz DEFAULT now()`
- `noticias` ya tiene `fecha`, se reutiliza

## 2. Fecha de publicación en formularios admin

### GaleriaPanel.tsx
- Agregar input de fecha en el formulario de creación
- Enviar `fecha_publicacion` en el insert

### ReportajesPanel.tsx
- Agregar input de fecha en el formulario de creación
- Enviar `fecha_publicacion` en el insert

### NoticiasPanel.tsx
- Agregar input de fecha para que el admin elija la fecha (usa `fecha` existente)

## 3. Mostrar fechas en landing

- `Galeria.tsx`: mostrar fecha en overlay del thumbnail
- `Reportajes.tsx`: mostrar fecha en las cards
- `Noticias.tsx`: ya muestra fecha

## 4. Edición inline en TODOS los paneles admin

Patrón consistente: al hacer click en un item del listado, se abre el formulario pre-cargado con los datos actuales. Un estado `editingId` controla si estamos creando o editando. Al guardar, se hace `update` en vez de `insert`.

### Paneles a modificar:
- **GaleriaPanel.tsx** — editar título, tipo, fecha, reemplazar archivo
- **ReportajesPanel.tsx** — editar título, subtítulo, contenido, tag, fecha, media
- **NoticiasPanel.tsx** — editar título, tag, descripción, fecha, imagen
- **TiendaPanel.tsx** — editar nombre, precio, período, features, whatsapp, popular
- **FechasPanel.tsx** — editar fecha, día, hora, local, visitante, categoría, sede
- **EstadisticasPanel.tsx** — editar categoría, label, value, suffix

Cada panel tendrá:
- Botón de editar (ícono lápiz) junto al de eliminar en cada item
- Al clickear editar: se abre el formulario con datos pre-cargados y botón "Actualizar"
- Mutation de update usando `.update().eq("id", editingId)`
- Al cancelar, se limpia el estado y se oculta el form

## Archivos a crear
- Migration SQL (agregar `fecha_publicacion` a galeria y reportajes)

## Archivos a modificar
- `src/components/admin/GaleriaPanel.tsx`
- `src/components/admin/ReportajesPanel.tsx`
- `src/components/admin/NoticiasPanel.tsx`
- `src/components/admin/TiendaPanel.tsx`
- `src/components/admin/FechasPanel.tsx`
- `src/components/admin/EstadisticasPanel.tsx`
- `src/components/landing/Galeria.tsx` — mostrar fecha
- `src/components/landing/Reportajes.tsx` — mostrar fecha

