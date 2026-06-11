'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Mantém splash por 3.8s depois some
    const timer = setTimeout(() => setVisible(false), 3800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Partículas de corações */}
          <Hearts />

          {/* Conteúdo centralizado */}
          <div className="relative z-10 flex flex-col items-center gap-5 px-8 text-center w-full max-w-sm">
            {/* Linha decorativa topo */}
            <motion.div
              className="h-px bg-primary"
              style={{ width: 0 }}
              animate={{ width: '80px' }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            />

            {/* "Feliz" */}
            <motion.p
              className="font-serif text-white/70 text-base uppercase tracking-[0.35em]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              Feliz
            </motion.p>

            {/* "Dia dos Namorados" */}
            <motion.h1
              className="font-serif text-white text-4xl sm:text-5xl font-bold italic leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Dia dos<br />Namorados
            </motion.h1>

            {/* Coração */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#E50914">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>

            {/* "meu amor" */}
            <motion.p
              className="font-serif text-white/60 text-xl italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.8 }}
            >
              meu amor
            </motion.p>

            {/* Linha decorativa */}
            <motion.div
              className="h-px bg-primary"
              style={{ width: 0 }}
              animate={{ width: '80px' }}
              transition={{ delay: 2.2, duration: 0.8 }}
            />

            {/* Imagem no tamanho natural */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="mt-2 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/splash.jpg"
                alt=""
                width={320}
                height={320}
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Corações flutuando no fundo
function Hearts() {
  const items = Array.from({ length: 12 }, (_, i) => i)
  return (
    <>
      {items.map((i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${8 + (i * 7.5) % 90}%`,
            bottom: '-20px',
          }}
          animate={{
            y: [0, -(Math.random() * 300 + 200)],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, 0.6, 0],
            scale: [0.6, 1, 0.6],
          }}
          transition={{
            duration: Math.random() * 3 + 2.5,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <svg
            width={Math.random() * 14 + 8}
            height={Math.random() * 14 + 8}
            viewBox="0 0 24 24"
            fill="#E50914"
            opacity={0.5 + Math.random() * 0.4}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
      ))}
    </>
  )
}
