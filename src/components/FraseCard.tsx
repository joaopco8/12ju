'use client'

import { motion } from 'framer-motion'
import { Momento } from '@/data/momentos'

interface FraseCardProps {
  momento: Momento
  index?: number
}

function formatarData(data: string): string {
  return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function FraseCard({ momento, index = 0 }: FraseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative rounded-2xl overflow-hidden min-h-[320px] flex flex-col justify-between p-8 bg-surface border border-white/5"
    >
      {/* Aspas decorativas */}
      <div
        className="font-serif text-9xl leading-none select-none opacity-15 text-primary"
        aria-hidden
      >
        &ldquo;
      </div>

      {/* Frase */}
      <p className="font-serif text-white text-2xl font-normal italic leading-relaxed text-center flex-1 flex items-center justify-center px-2">
        {momento.frase.replace(/^"|"$/g, '')}
      </p>

      {/* Rodapé */}
      <div className="mt-6 border-t border-white/5 pt-4">
        <p className="text-white/30 text-xs text-center">
          {formatarData(momento.data)}
        </p>
      </div>
    </motion.div>
  )
}
