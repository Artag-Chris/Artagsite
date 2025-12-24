"use client"

import Element3D from "./3d-element"
import "./example-3d-sphere.css"

/**
 * Ejemplo: Esfera 3D
 * Demuestra cómo reutilizar Element3D con contenido diferente
 */
export default function Example3DSphere() {
  return (
    <Element3D animationDuration={15}>
      <div className="sphere-container">
        <div className="sphere">
          <div className="sphere-inner">
            <div className="sphere-text">3D</div>
          </div>
        </div>
      </div>
    </Element3D>
  )
}
