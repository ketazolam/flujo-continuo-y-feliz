

## Plan: Miniaturas visibles para videos directos

### Problema
Los videos subidos directamente (`.mp4`, `.webm`, `.mov`) usan `<video preload="metadata">` para mostrar miniatura, pero muchos navegadores no renderizan un frame visible con ese método, resultando en cajas negras vacías como se ve en la captura.

### Solución
Crear un componente `VideoThumbnail` que carga el video en un `<video>` oculto, busca el frame en `t=1s`, lo captura a un `<canvas>`, y muestra el resultado como imagen. Esto funciona en todos los navegadores sin necesidad de servicios externos.

### Cambios

1. **Nuevo componente `src/components/VideoThumbnail.tsx`**
   - Recibe `src` (URL del video) y `alt`, `className`
   - Carga el video en un `<video>` oculto con `currentTime = 1`
   - En el evento `seeked`, dibuja el frame en un `<canvas>` y extrae un `dataURL`
   - Renderiza el `dataURL` como `<img>`, mostrando un placeholder gris mientras carga

2. **Actualizar `src/components/landing/Galeria.tsx`**
   - Reemplazar todas las instancias de `<video src={...} muted preload="metadata" />` por `<VideoThumbnail src={...} />`
   - Aplica tanto en la grilla de álbumes (cover) como dentro del modal de videos individuales

3. **Actualizar `src/components/landing/Programa.tsx`**
   - Reemplazar los `<video>` usados como miniatura por `<VideoThumbnail>` en el poster del featured player y en la grilla de episodios

4. **Actualizar `src/components/admin/GaleriaPanel.tsx`**
   - Reemplazar previsualizaciones de video en admin por `<VideoThumbnail>` para consistencia

### Detalle técnico

```text
VideoThumbnail component flow:
  1. Mount → create hidden <video> element
  2. Set video.src, video.currentTime = 1
  3. On "seeked" event → draw frame to <canvas>
  4. canvas.toDataURL("image/jpeg") → setState
  5. Render <img src={dataURL}> (or gray placeholder while loading)
```

No se necesitan herramientas externas ni APIs. Todo se ejecuta en el navegador del visitante.

