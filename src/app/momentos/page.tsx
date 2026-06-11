'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import EpisodeCard from '@/components/EpisodeCard'
import { momentos, Categoria, CATEGORIA_LABELS, CATEGORIA_COLORS } from '@/data/momentos'

const CATEGORIAS: Categoria[] = ['romantico', 'diversão', 'memória', 'casual']

export default function MomentosPage() {
  const [filtro, setFiltro] = useState<Categoria | 'todos'>('todos')
  const [favoritos, setFavoritos] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nossoflix-favoritos')
      if (saved) setFavoritos(JSON.parse(saved))
    } catch {}
  }, [])

  function toggleFavorito(id: string) {
    setFavoritos((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      localStorage.setItem('nossoflix-favoritos', JSON.stringify(next))
      return next
    })
  }

  const filtrados =
    filtro === 'todos' ? momentos : momentos.filter((m) => m.categoria === filtro)

  const ordenados = [...filtrados].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Header titulo="Momentos" />

      <div className="px-4 pt-4">
        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-5">
          <button
            onClick={() => setFiltro('todos')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all min-h-[40px] ${
              filtro === 'todos'
                ? 'bg-primary text-white'
                : 'bg-surface border border-white/10 text-muted'
            }`}
          >
            Todos ({momentos.length})
          </button>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all min-h-[40px] ${
                filtro === cat ? 'text-black' : 'bg-surface border border-white/10 text-muted'
              }`}
              style={
                filtro === cat ? { backgroundColor: CATEGORIA_COLORS[cat] } : {}
              }
            >
              {CATEGORIA_LABELS[cat]} ({momentos.filter((m) => m.categoria === cat).length})
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {ordenados.map((m, i) => (
            <EpisodeCard
              key={m.id}
              momento={m}
              index={i}
              favorito={favoritos.includes(m.id)}
              onToggleFavorito={toggleFavorito}
            />
          ))}
        </div>

        {ordenados.length === 0 && (
          <div className="text-center text-muted py-16">
            <p className="text-4xl mb-3">🎬</p>
            <p className="font-medium">Nenhum momento nessa categoria ainda.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
