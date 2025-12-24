"use client"

import Element3D from "./3d-element"

/**
 * Cubo 3D con código temático
 * Usa el componente reutilizable Element3D
 */
export default function TechCube3D() {
  return (
    <Element3D animationDuration={20}>
      <div className="cube">
        <div className="cube-face front">
          <div className="face-content">
            <div className="code-line">const innovation</div>
            <div className="code-line">= "reality"</div>
          </div>
        </div>
        <div className="cube-face back">
          <div className="face-content">
            <div className="code-line">function create()</div>
            <div className="code-line">{"{ magic(); }"}</div>
          </div>
        </div>
        <div className="cube-face right">
          <div className="face-content">
            <div className="code-line">build()</div>
            <div className="code-line">deploy()</div>
          </div>
        </div>
        <div className="cube-face left">
          <div className="face-content">
            <div className="code-line">design()</div>
            <div className="code-line">iterate()</div>
          </div>
        </div>
        <div className="cube-face top">
          <div className="face-content">
            <div className="code-line">// Tech Stack</div>
          </div>
        </div>
        <div className="cube-face bottom">
          <div className="face-content">
            <div className="code-line">// Full Stack</div>
          </div>
        </div>
      </div>
    </Element3D>
  )
}
