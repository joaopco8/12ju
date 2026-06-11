'use client'

import { calcularDiasJuntos, DATA_INICIO } from '@/data/momentos'
import { motion } from 'framer-motion'

export default function Header() {
  const dias = calcularDiasJuntos(DATA_INICIO)

  return (
    <motion.header
      className="flex items-center justify-between px-5 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <span className="font-serif text-xl font-bold tracking-tight">
        Nosso<span className="text-primary">Flix</span>
      </span>

      {/* Contador */}
      <div className="text-right">
        <p className="text-primary font-serif text-lg font-bold leading-none">{dias}</p>
        <p className="text-white/30 text-[10px] uppercase tracking-widest">dias juntos</p>
      </div>
    </motion.header>
  )
}
