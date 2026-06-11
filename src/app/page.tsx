'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import { momentos } from '@/data/momentos'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// Partículas animadas no fundo
function BgParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => i)
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: Math.random() * 120 + 40,
            height: Math.random() * 120 + 40,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.15, 0],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Seções com frases famosas
const secoes = [
  {
    quote: 'Amar é encontrar em alguém a sua própria solidão e sentir alegria.',
    autor: 'Clarice Lispector',
    fotos: momentos.flatMap((m) => m.fotos).slice(0, 6),
  },
  {
    quote: 'O amor não é olhar um para o outro, é olhar juntos na mesma direção.',
    autor: 'Antoine de Saint-Exupéry',
    fotos: momentos.flatMap((m) => m.fotos).slice(6, 12),
  },
  {
    quote: 'Você é o lar que eu nunca soube que estava procurando.',
    autor: '',
    fotos: momentos.flatMap((m) => m.fotos).slice(12, 18),
  },
  {
    quote: 'A gente não se encontra por acaso. A gente se reconhece.',
    autor: '',
    fotos: momentos.flatMap((m) => m.fotos).slice(18, 27),
  },
]

const cartaParagrafos = [
  'Não vou falar de amor de forma fácil porque isso não é fácil. Isso é complicado, é intenso, é você me tirando do eixo todos os dias só por existir.',
  'Dia dos Namorados é pra celebrar o que a gente tá fazendo. E a gente tá fazendo algo que muda a forma como eu vivo...',
  'Você entra no quarto e meu corpo inteiro sente. Seu toque, seu cheiro, o jeito que você me olha quando sabe exatamente o efeito que causa. É como se você tivesse uma chave que destrava uma coisa que existe só pra você.',
  'Mas sabe o que é mais foda? Não é só o sexo (mesmo que seja absurdo). É você deitada do meu lado conversando sobre qualquer besteira enquanto a gente tá suado. É você dormindo no meu peito. É acordar e você estar ali.',
  'Você é a mulher que eu quero para tudo. Pro sexo, pra vida, pra caos, pra calma, pra tudo.',
  'E hoje, nesse dia que é pra celebrar isso, eu queria que você soubesse: você não é só minha namorada. Você é minha pessoa favorita.',
  'Você tira meu foco completamente de qualquer coisa. Uma mensagem sua e eu esqueço o que tava fazendo. Um beijo seu e eu perco a noção de tudo. Um olhar seu e eu sei exatamente por que existem pessoas que escrevem poesia.',
  'Eu quero ser possessivo com você. Quero estar contigo quando você acordar amanhã. Quero acordar dentro de você (literalmente). Quero esse cansaço que vem depois, deitado do seu lado, sabendo que você é minha.',
  'Então feliz Dia dos Namorados pra quem virou meu motivo de querer ser um pouco melhor. Pra quem faz meu corpo e minha mente ficarem completamente desarmados.',
]

function CartaDeAmor() {
  return (
    <motion.section
      className="mx-4 my-12 rounded-3xl border border-white/8 bg-surface p-7 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
    >
      {/* Aspas decorativas */}
      <div className="font-serif text-[120px] leading-none text-primary/10 absolute -top-4 -left-1 select-none pointer-events-none" aria-hidden>
        &ldquo;
      </div>

      <div className="relative z-10 flex flex-col gap-5">
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-1">
          <div className="w-6 h-px bg-primary" />
          <p className="text-primary text-[11px] uppercase tracking-[0.3em] font-medium">12 de junho de 2025</p>
        </div>

        {/* Parágrafos */}
        {cartaParagrafos.map((p, i) => (
          <motion.p
            key={i}
            className="font-serif text-white/85 text-base leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
          >
            {p}
          </motion.p>
        ))}

        {/* Assinatura */}
        <motion.div
          className="mt-4 flex flex-col items-end gap-1 border-t border-white/5 pt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-serif text-white/50 text-sm italic">te amo minha princesa</p>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#E50914" opacity={0.7}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
      </div>
    </motion.section>
  )
}

interface RowProps {
  fotos: string[]
  rowIndex: number
}

function PhotoRow({ fotos, rowIndex }: RowProps) {
  const ref = useRef<HTMLDivElement>(null)

  function scroll(dir: 'left' | 'right') {
    if (!ref.current) return
    ref.current.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' })
  }

  return (
    <div className="relative group">
      {/* Seta esquerda */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/70 border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/80"
        aria-label="Anterior"
      >
        <FiChevronLeft className="text-lg" />
      </button>

      {/* Seta direita */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/70 border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/80"
        aria-label="Próxima"
      >
        <FiChevronRight className="text-lg" />
      </button>

      {/* Fotos */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: rowIndex * 0.2 }}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-5"
      >
        {fotos.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[150px] sm:w-[190px] aspect-[3/4] rounded-xl overflow-hidden bg-surface relative"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="190px"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function HomePage() {
  const hero = momentos[0]

  return (
    <div className="relative pb-10">
      <BgParticles />

      <div className="relative z-10">
        <Header />

        {/* Hero */}
        <section className="relative w-full aspect-[3/4] sm:aspect-[16/9]">
          <Image
            src={hero.fotos[0]}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          <motion.div
            className="absolute bottom-0 left-0 right-0 px-6 pb-10"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <p className="font-serif text-white text-3xl italic leading-tight">
              {hero.fotos[0] && momentos[0].frase}
            </p>
          </motion.div>
        </section>

        {/* Carta */}
        <CartaDeAmor />

        {/* Seções com frases + fileiras */}
        <div className="mt-10 flex flex-col gap-12">
          {secoes.map((secao, i) => (
            <section key={i}>
              {/* Frase da seção */}
              <motion.div
                className="px-5 mb-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-serif text-white text-xl sm:text-2xl italic leading-snug">
                  {secao.quote}
                </p>
                {secao.autor && (
                  <p className="text-primary text-xs uppercase tracking-widest mt-2 font-medium">
                    {secao.autor}
                  </p>
                )}
                <div className="w-8 h-px bg-primary mt-3" />
              </motion.div>

              {/* Fileira de fotos */}
              <PhotoRow fotos={secao.fotos} rowIndex={i} />
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
