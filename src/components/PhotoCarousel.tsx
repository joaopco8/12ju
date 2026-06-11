'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface PhotoCarouselProps {
  fotos: string[]
  titulo: string
}

export default function PhotoCarousel({ fotos, titulo }: PhotoCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  function paginate(newDir: number) {
    setDirection(newDir)
    setCurrent((prev) => (prev + newDir + fotos.length) % fotos.length)
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const threshold = 50
    if (info.offset.x < -threshold) paginate(1)
    else if (info.offset.x > threshold) paginate(-1)
  }

  if (fotos.length === 0) return null

  return (
    <div className="relative w-full aspect-[4/3] bg-surface overflow-hidden rounded-2xl">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={fotos[current]}
            alt={`${titulo} - foto ${current + 1}`}
            fill
            className="object-cover select-none"
            draggable={false}
            priority={current === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Setas — só desktop */}
      {fotos.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hidden sm:flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Foto anterior"
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white hidden sm:flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Próxima foto"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </>
      )}

      {/* Dots */}
      {fotos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {fotos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1)
                setCurrent(i)
              }}
              className="w-6 h-1.5 rounded-full transition-all duration-300"
              style={{ backgroundColor: i === current ? '#9D4EDD' : 'rgba(255,255,255,0.3)' }}
              aria-label={`Ir para foto ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Contador */}
      <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs text-white/80">
        {current + 1} / {fotos.length}
      </div>
    </div>
  )
}
