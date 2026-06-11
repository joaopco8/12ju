'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import { momentos, CATEGORIA_COLORS, CATEGORIA_LABELS } from '@/data/momentos'

function formatarDataCurta(data: string): string {
  return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function getAno(data: string): number {
  return new Date(data + 'T00:00:00').getFullYear()
}

export default function TimelinePage() {
  const ordenados = [...momentos].sort(
    (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
  )

  const anos = [...new Set(ordenados.map((m) => getAno(m.data)))].sort()
  const [filtroAno, setFiltroAno] = useState<number | 'todos'>('todos')

  const filtrados =
    filtroAno === 'todos' ? ordenados : ordenados.filter((m) => getAno(m.data) === filtroAno)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Header titulo="Timeline" />

      <div className="px-4 pt-4">
        {/* Filtro por ano */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
          <button
            onClick={() => setFiltroAno('todos')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold min-h-[40px] transition-all ${
              filtroAno === 'todos'
                ? 'bg-primary text-white'
                : 'bg-surface border border-white/10 text-muted'
            }`}
          >
            Todos
          </button>
          {anos.map((ano) => (
            <button
              key={ano}
              onClick={() => setFiltroAno(ano)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold min-h-[40px] transition-all ${
                filtroAno === ano
                  ? 'bg-primary text-white'
                  : 'bg-surface border border-white/10 text-muted'
              }`}
            >
              {ano}
            </button>
          ))}
        </div>

        {/* Linha do tempo */}
        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/10" />

          <div className="space-y-6 pb-6">
            {filtrados.map((momento, i) => {
              const cor = CATEGORIA_COLORS[momento.categoria]
              return (
                <motion.div
                  key={momento.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex gap-4"
                >
                  {/* Dot na linha */}
                  <div className="relative flex-shrink-0 flex items-start pt-3">
                    <div
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 bg-background"
                      style={{ borderColor: cor }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cor }} />
                    </div>
                  </div>

                  {/* Card */}
                  <Link href={`/momentos/${momento.id}`} className="flex-1 min-w-0">
                    <motion.div
                      className="bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex gap-3 p-3">
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={momento.fotos[0]}
                            alt={momento.titulo}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm leading-tight truncate">
                            {momento.titulo}
                          </p>
                          <p className="text-muted text-xs mt-0.5">
                            {formatarDataCurta(momento.data)}
                          </p>
                          <span
                            className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase text-black"
                            style={{ backgroundColor: cor }}
                          >
                            {CATEGORIA_LABELS[momento.categoria]}
                          </span>
                        </div>
                      </div>

                      {/* Frase */}
                      <div className="px-3 pb-3">
                        <p className="text-muted text-xs italic line-clamp-1">{momento.frase}</p>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
