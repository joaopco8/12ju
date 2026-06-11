'use client'

import { useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import Header from '@/components/Header'
import FraseCard from '@/components/FraseCard'
import { momentos } from '@/data/momentos'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function FrasesPage() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 0.95 }),
  }

  function paginate(dir: number) {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + momentos.length) % momentos.length)
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.x < -60) paginate(1)
    else if (info.offset.x > 60) paginate(-1)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-screen"
    >
      <Header titulo="Frases" />

      <div className="flex-1 flex flex-col justify-center px-4 py-6 gap-6">
        {/* Contador */}
        <p className="text-center text-muted text-sm">
          {current + 1} de {momentos.length}
        </p>

        {/* Carrossel de frases */}
        <div className="relative overflow-hidden">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              <FraseCard momento={momentos[current]} index={0} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botões de navegação */}
        <div className="flex items-center justify-center gap-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-white/10 text-white"
            aria-label="Frase anterior"
          >
            <FiChevronLeft className="text-xl" />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {momentos.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1)
                  setCurrent(i)
                }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '20px' : '6px',
                  height: '6px',
                  backgroundColor: i === current ? '#9D4EDD' : 'rgba(255,255,255,0.2)',
                }}
                aria-label={`Ir para frase ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-white/10 text-white"
            aria-label="Próxima frase"
          >
            <FiChevronRight className="text-xl" />
          </motion.button>
        </div>

        <p className="text-center text-muted text-xs">
          Deslize para navegar entre as frases
        </p>
      </div>
    </motion.div>
  )
}
