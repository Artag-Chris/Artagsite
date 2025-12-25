"use client"

import { useEffect, useRef, useState } from "react"

interface GLTFViewerProps {
  modelPath: string
  autoRotate?: boolean
  className?: string
}

/**
 * Componente para renderizar modelos 3D en formato glTF/GLB
 * Usa model-viewer de Google (sin dependencias externas)
 * @param modelPath - Ruta al archivo .glb o .gltf (ej: "/energy-beam.glb")
 * @param autoRotate - Si el modelo debe rotar automáticamente
 */
export default function GLTFViewer({
  modelPath,
  autoRotate = true,
  className = "",
}: GLTFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    try {
      // Crear elemento model-viewer dinámicamente
      const modelViewer = document.createElement("model-viewer")
      modelViewer.setAttribute("src", modelPath)
      modelViewer.setAttribute("alt", "3D Model")
      modelViewer.setAttribute("camera-controls", "")
      modelViewer.setAttribute("touch-action", "pan-y")
      
      if (autoRotate) {
        modelViewer.setAttribute("auto-rotate", "")
        modelViewer.setAttribute("rotation-per-second", "45deg")
      }

      // Estilos
      modelViewer.style.width = "100%"
      modelViewer.style.height = "100%"
      modelViewer.style.backgroundColor = "transparent"

      // Event listeners
      const handleLoad = () => {
        setIsLoading(false)
      }

      const handleError = () => {
        setError("Error loading 3D model")
        setIsLoading(false)
      }

      modelViewer.addEventListener("load", handleLoad)
      modelViewer.addEventListener("error", handleError)

      // Limpiar contenedor anterior
      containerRef.current.innerHTML = ""
      containerRef.current.appendChild(modelViewer)

      // Cargar script de model-viewer si no está cargado
      if (!customElements.get("model-viewer")) {
        const script = document.createElement("script")
        script.type = "module"
        script.src = "https://cdn.jsdelivr.net/npm/@google/model-viewer/dist/model-viewer.min.js"
        script.async = true
        document.head.appendChild(script)
      }

      return () => {
        modelViewer.removeEventListener("load", handleLoad)
        modelViewer.removeEventListener("error", handleError)
      }
    } catch (err) {
      console.error("Error setting up viewer:", err)
      setError("Error setting up 3D viewer")
      setIsLoading(false)
    }
  }, [modelPath, autoRotate])

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={containerRef} className="w-full h-full" />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
            <p className="text-amber-400">Loading 3D Model...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
          <div className="text-center">
            <p className="text-red-400">{error}</p>
            <p className="text-amber-400 text-sm mt-2">Make sure the model file exists at: {modelPath}</p>
          </div>
        </div>
      )}
    </div>
  )
}
