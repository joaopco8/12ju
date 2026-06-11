'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Momento } from '@/data/momentos'

interface EpisodeCardProps {
  momento: Momento
  index?: number
}

export default function EpisodeCard({ momento, index = 0 }: EpisodeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col gap-3"
    >
      {/* Foto — sem overlay de texto */}
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface">
        <Image
          src={momento.fotos[0]}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>

      {/* Frase abaixo da foto */}
      <p className="font-serif text-white/70 text-sm italic leading-relaxed text-center px-1">
        {momento.frase}
      </p>
    </motion.div>
  )
}
