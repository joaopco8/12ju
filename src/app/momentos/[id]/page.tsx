'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PhotoCarousel from '@/components/PhotoCarousel'
import {
  getMomentoById,
  momentos,
  CATEGORIA_LABELS,
  CATEGORIA_COLORS,
} from '@/data/momentos'
import { FiArrowLeft, FiHeart, FiChevronRight, FiCalendar } from 'react-icons/fi'

function formatarData(data: string): string {
  return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function MomentoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const momento = getMomentoById(id)
  const [favorito, setFavorito] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nossoflix-favoritos')
      if (saved) {
        const favs: string[] = JSON.parse(saved)
        setFavorito(favs.includes(id))
      }
    } catch {}
  }, [id])

  function toggleFavorito() {
    setFavorito((prev) => {
      const next = !prev
      try {
        const saved = localStorage.getItem('nossoflix-favoritos')
        const favs: string[] = saved ? JSON.parse(saved) : []
        const updated = next ? [...favs, id] : favs.filter((f) => f !== id)
        localStorage.setItem('nossoflix-favoritos', JSON.stringify(updated))
      } catch {}
      return next
    })
  }

  // Próximo momento
  const idx = momentos.findIndex((m) => m.id === id)
  const proximo = momentos[(idx + 1) % momentos.length]

  if (!momento) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted">Momento não encontrado.</p>
        <Link href="/momentos" className="text-primary">
          Voltar
        </Link>
      </div>
    )
  }

  const corCategoria = CATEGORIA_COLORS[momento.categoria]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header custom */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-white/5 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Voltar"
          >
            <FiArrowLeft className="text-xl" />
          </button>
          <h1 className="text-white font-bold text-base flex-1 truncate">{momento.titulo}</h1>
          <motion.button
            whileTap={{ scale: 1.2 }}
            onClick={toggleFavorito}
            className="p-2 rounded-full hover:bg-white/5 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label={favorito ? 'Remover favorito' : 'Favoritar'}
          >
            <FiHeart
              className={`text-xl transition-colors ${favorito ? 'text-red-500' : 'text-muted'}`}
              fill={favorito ? 'currentColor' : 'none'}
            />
          </motion.button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5 pb-6">
        {/* Carrossel */}
        <PhotoCarousel fotos={momento.fotos} titulo={momento.titulo} />

        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black"
            style={{ backgroundColor: corCategoria }}
          >
            {CATEGORIA_LABELS[momento.categoria]}
          </span>
          <div className="flex items-center gap-1.5 text-muted text-xs">
            <FiCalendar className="text-xs" />
            <span>{formatarData(momento.data)}</span>
          </div>
        </div>

        {/* Frase destaque */}
        <motion.div
          className="rounded-2xl p-5 border"
          style={{
            background: `linear-gradient(135deg, ${corCategoria}18 0%, ${corCategoria}06 100%)`,
            borderColor: `${corCategoria}30`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-white text-xl font-light italic leading-relaxed text-center">
            {momento.frase}
          </p>
        </motion.div>

        {/* Descrição */}
        <div>
          <h2 className="text-white font-bold text-lg mb-2">Sobre esse momento</h2>
          <p className="text-white/70 leading-relaxed">{momento.descricao}</p>
        </div>

        {/* Próximo episódio */}
        <Link href={`/momentos/${proximo.id}`}>
          <motion.div
            className="bg-surface border border-white/10 rounded-2xl p-4 flex items-center gap-3 hover:border-primary/30 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-muted text-xs mb-0.5">Próximo Momento</p>
              <p className="text-white font-semibold truncate">{proximo.titulo}</p>
            </div>
            <FiChevronRight className="text-muted text-xl flex-shrink-0" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}
