'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

export interface LabNode {
  id: string
  label: string
  detail?: string
  children?: LabNode[]
}

export function ArchitectureDiagram({ nodes, title }: { nodes: LabNode[]; title?: string }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(nodes.map((n) => n.id)))

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const renderNode = (node: LabNode, depth = 0) => {
    const hasChildren = Boolean(node.children && node.children.length)
    const isOpen = expanded.has(node.id)
    return (
      <li key={node.id} className="mb-2">
        <div
          className={`flex items-start gap-2 rounded-lg border border-white/[0.06] bg-zinc-900/40 px-3 py-2 ${
            depth === 0 ? 'border-cyan-500/20' : ''
          }`}
          style={{ marginLeft: depth * 16 }}
        >
          {hasChildren ? (
            <button
              type="button"
              onClick={() => toggle(node.id)}
              className="mt-0.5 text-zinc-400 hover:text-cyan-300"
              aria-expanded={isOpen}
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>
          ) : (
            <span className="mt-0.5 h-4 w-4" />
          )}
          <div className="flex-1">
            <div className="text-sm font-medium text-zinc-200">{node.label}</div>
            {node.detail && <div className="text-xs text-zinc-500">{node.detail}</div>}
          </div>
        </div>
        {hasChildren && isOpen && (
          <ul className="mt-2">{node.children!.map((child) => renderNode(child, depth + 1))}</ul>
        )}
      </li>
    )
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6 sm:p-8">
      {title && (
        <h3 className="mb-4 text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>
      )}
      <ul>{nodes.map((node) => renderNode(node))}</ul>
    </div>
  )
}
