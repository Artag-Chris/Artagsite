# Componente 3D Reutilizable

## Descripción

`Element3D` es un componente reutilizable que proporciona una base para crear elementos 3D con rotación automática y partículas flotantes.

## Uso Básico

```tsx
import Element3D from "@/components/animations/3d-element"

export default function MyCustom3D() {
  return (
    <Element3D animationDuration={20}>
      {/* Tu contenido 3D aquí */}
      <div className="your-3d-content">
        {/* Cualquier elemento React */}
      </div>
    </Element3D>
  )
}
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Contenido a renderizar dentro del elemento 3D |
| `className` | `string` | `""` | Clases CSS adicionales para el contenedor |
| `animationDuration` | `number` | `20` | Duración de la rotación en segundos |

## Ejemplos Incluidos

### 1. TechCube3D (Cubo con código)
```tsx
import TechCube3D from "@/components/animations/tech-cube-3d"

export default function Hero() {
  return <TechCube3D />
}
```

### 2. Example3DSphere (Esfera)
```tsx
import Example3DSphere from "@/components/animations/example-3d-sphere"

export default function MyPage() {
  return <Example3DSphere />
}
```

## Crear tu Propio Elemento 3D

### Paso 1: Crear el componente
```tsx
// src/components/animations/my-custom-3d.tsx
"use client"

import Element3D from "./3d-element"
import "./my-custom-3d.css"

export default function MyCustom3D() {
  return (
    <Element3D animationDuration={18}>
      <div className="my-custom-element">
        {/* Tu contenido aquí */}
      </div>
    </Element3D>
  )
}
```

### Paso 2: Crear los estilos
```css
/* src/components/animations/my-custom-3d.css */

.my-custom-element {
  width: 250px;
  height: 250px;
  position: relative;
  transform-style: preserve-3d;
  /* Tus estilos aquí */
}

/* Usa las clases disponibles:
   - .cube-face para caras de cubo
   - .face-content para contenido
   - .code-line para líneas de código
*/
```

### Paso 3: Usar en tu página
```tsx
import MyCustom3D from "@/components/animations/my-custom-3d"

export default function MyPage() {
  return (
    <div className="h-96">
      <MyCustom3D />
    </div>
  )
}
```

## Características

✨ **Características incluidas:**
- Rotación 3D automática y suave
- Partículas flotantes decorativas
- Efecto de brillo cyan
- Responsive (se adapta a diferentes tamaños)
- Sin dependencias externas (CSS puro)
- Optimizado para rendimiento

## Personalización

### Cambiar duración de rotación
```tsx
<Element3D animationDuration={30}>
  {/* Rotación más lenta */}
</Element3D>
```

### Cambiar colores
Edita las variables CSS en `3d-element.css`:
```css
/* Cambiar de cyan a otro color */
border: 2px solid rgba(0, 217, 255, 0.6); /* Cambiar aquí */
color: #00d9ff; /* Y aquí */
```

### Cambiar tamaño
```css
.element-3d {
  width: 300px; /* Cambiar tamaño */
  height: 300px;
}
```

## Notas Técnicas

- El componente usa `transform-style: preserve-3d` para la perspectiva 3D
- Las partículas se generan dinámicamente con `Array.map()`
- La rotación es una animación CSS pura (sin JavaScript)
- Responsive: se adapta automáticamente en mobile

## Troubleshooting

**Problema:** El elemento no rota
- Solución: Asegúrate de que `Element3D` esté dentro de un contenedor con altura definida

**Problema:** Las partículas no se ven
- Solución: Verifica que el contenedor tenga `overflow: hidden` o similar

**Problema:** Rendimiento lento
- Solución: Reduce el número de partículas en `3d-element.tsx` (línea con `[...Array(12)]`)
