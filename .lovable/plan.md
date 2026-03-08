

# Plan: Lightbox para galería + fix build error

Hay dos problemas a resolver:

## 1. Error de build: `canvas-confetti` no instalado
El archivo `src/components/ui/pricing.tsx` importa `canvas-confetti` que no está en las dependencias. Se eliminará esa importación y se reemplazará el uso de confetti con una función vacía (o se elimina el efecto), ya que este componente no parece usarse activamente.

## 2. Lightbox en la Galería
Actualmente las imágenes de la galería no hacen nada al hacer click. Se agregará un modal/lightbox que muestre la imagen en grande al hacer click, con:

- Un estado `selectedItem` para trackear qué imagen se seleccionó.
- Un Dialog (ya disponible en el proyecto via Radix) que muestre la imagen a pantalla completa con fondo oscuro.
- Botón de cerrar y click fuera para cerrar.
- Navegación con flechas izquierda/derecha para pasar entre imágenes.
- Si es video, mostrar el player embebido.

### Archivos a modificar
- `src/components/ui/pricing.tsx` — eliminar import de `canvas-confetti`
- `src/components/landing/Galeria.tsx` — agregar lightbox con Dialog

