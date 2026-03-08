

# Plan: Corregir datos de ejemplo — Semillero como medio de cobertura

## Problema

Los datos insertados tratan a Semillero de Campeones como un equipo que juega partidos. En realidad es un **medio deportivo** que cubre fútbol juvenil y de barrio.

## Cambios en datos

### 1. Estadísticas — Métricas de cobertura

Eliminar los datos actuales (12 rows) y reemplazar con categorías de cobertura:

- **Cobertura 2026**: Partidos cubiertos: 48, Fotos publicadas: 1.200+, Videos: 35, Torneos: 6
- **Comunidad**: Equipos cubiertos: 24, Jugadores destacados: 60, Seguidores: 3.500+, Reportajes: 18
- **Alcance**: Canchas visitadas: 12, Categorías: 5, Barrios: 8, Horas de transmisión: 90+

### 2. Fechas — Partidos que van a cubrir

Actualizar las 5 fechas para que Semillero no aparezca como equipo, sino que los partidos sean entre otros equipos que ellos van a cubrir:

- Club El Renacer vs Tercer Tiempo FC (Sub-12)
- Los Halcones vs Academia Sur (Sub-15)
- Deportivo San Martín vs Estrella del Barrio (Sub-17)
- etc.

### 3. Noticias — Perspectiva de medio

Actualizar las 4 noticias para que sean desde la perspectiva de cobertura:

- "Arranca el Torneo Apertura 2026 — Estaremos cubriendo todos los partidos"
- "Goleada en Sub-15: El Renacer 4 - Tercer Tiempo 1"
- "Se abren inscripciones en 3 escuelitas de la zona — Toda la info acá"
- "Diego Martínez convocado a la selección regional — Lo seguimos desde Sub-10"

### 4. Componente Estadisticas.tsx — Ajustar iconos

Actualizar el mapeo de iconos `catIcons` para que coincida con las nuevas categorías (Cobertura, Comunidad, Alcance) en vez de Sub-12/15/17.

## Ejecución

1. Migration SQL: DELETE + INSERT para las 3 tablas
2. Editar `Estadisticas.tsx` para los nuevos nombres de categorías e iconos

