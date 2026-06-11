'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import { Categoria, CATEGORIA_LABELS, momentos as dadosIniciais } from '@/data/momentos'
import { FiPlus, FiTrash2, FiHeart, FiCheck, FiX } from 'react-icons/fi'

type MomentoForm = {
  titulo: string
  data: string
  descricao: string
  frase: string
  categoria: Categoria
  fotos: string
}

const FORM_VAZIO: MomentoForm = {
  titulo: '',
  data: '',
  descricao: '',
  frase: '',
  categoria: 'romantico',
  fotos: '',
}

export default function AdminPage() {
  const [form, setForm] = useState<MomentoForm>(FORM_VAZIO)
  const [salvos, setSalvos] = useState<typeof dadosIniciais>([])
  const [sucesso, setSucesso] = useState(false)
  const [aba, setAba] = useState<'adicionar' | 'favoritos'>('adicionar')
  const [favoritos, setFavoritos] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nossoflix-momentos-extras')
      if (saved) setSalvos(JSON.parse(saved))
      const favs = localStorage.getItem('nossoflix-favoritos')
      if (favs) setFavoritos(JSON.parse(favs))
    } catch {}
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const novo = {
      id: `custom-${Date.now()}`,
      titulo: form.titulo,
      data: form.data,
      fotos: form.fotos
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
      descricao: form.descricao,
      frase: form.frase,
      categoria: form.categoria,
    }
    const atualizados = [...salvos, novo]
    setSalvos(atualizados)
    localStorage.setItem('nossoflix-momentos-extras', JSON.stringify(atualizados))
    setForm(FORM_VAZIO)
    setSucesso(true)
    setTimeout(() => setSucesso(false), 3000)
  }

  function remover(id: string) {
    const atualizados = salvos.filter((m) => m.id !== id)
    setSalvos(atualizados)
    localStorage.setItem('nossoflix-momentos-extras', JSON.stringify(atualizados))
  }

  const momentosFavoritos = dadosIniciais.filter((m) => favoritos.includes(m.id))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Header titulo="Mais" />

      <div className="px-4 pt-4">
        {/* Abas */}
        <div className="flex gap-2 mb-6">
          {(['adicionar', 'favoritos'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setAba(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                aba === tab
                  ? 'bg-primary text-white'
                  : 'bg-surface border border-white/10 text-muted'
              }`}
            >
              {tab === 'adicionar' ? (
                <span className="flex items-center justify-center gap-2">
                  <FiPlus /> Adicionar
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FiHeart /> Favoritos ({momentosFavoritos.length})
                </span>
              )}
            </button>
          ))}
        </div>

        {aba === 'adicionar' && (
          <div className="space-y-6">
            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-muted font-medium block mb-1.5">Título *</label>
                <input
                  name="titulo"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Nossa viagem especial"
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-muted font-medium block mb-1.5">Data *</label>
                <input
                  name="data"
                  type="date"
                  value={form.data}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-muted font-medium block mb-1.5">Categoria *</label>
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                >
                  {(Object.keys(CATEGORIA_LABELS) as Categoria[]).map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORIA_LABELS[cat]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-muted font-medium block mb-1.5">Descrição *</label>
                <textarea
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Conte sobre esse momento especial..."
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="text-sm text-muted font-medium block mb-1.5">
                  Frase do Momento *
                </label>
                <input
                  name="frase"
                  value={form.frase}
                  onChange={handleChange}
                  required
                  placeholder='"Uma frase especial sobre esse momento..."'
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm text-muted font-medium block mb-1.5">
                  URLs das fotos (uma por linha)
                </label>
                <textarea
                  name="fotos"
                  value={form.fotos}
                  onChange={handleChange}
                  rows={3}
                  placeholder={'/foto/foto1.jpeg\n/foto/foto2.jpeg'}
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white placeholder-muted focus:outline-none focus:border-primary/50 transition-colors resize-none font-mono text-sm"
                />
                <p className="text-muted text-xs mt-1">
                  Use caminhos locais (/foto/foto1.jpeg) ou URLs externas
                </p>
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 min-h-[52px]"
              >
                <FiPlus className="text-lg" />
                Salvar Momento
              </motion.button>
            </form>

            {/* Feedback sucesso */}
            <AnimatePresence>
              {sucesso && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl px-4 py-3"
                >
                  <FiCheck />
                  <span className="text-sm font-medium">Momento salvo com sucesso!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Momentos adicionados */}
            {salvos.length > 0 && (
              <div>
                <h3 className="text-white font-bold mb-3">
                  Adicionados por você ({salvos.length})
                </h3>
                <div className="space-y-2">
                  {salvos.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between bg-surface border border-white/5 rounded-xl px-4 py-3"
                    >
                      <div>
                        <p className="text-white text-sm font-semibold">{m.titulo}</p>
                        <p className="text-muted text-xs">{m.data}</p>
                      </div>
                      <button
                        onClick={() => remover(m.id)}
                        className="p-2 rounded-full hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors"
                        aria-label="Remover"
                      >
                        <FiTrash2 />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {aba === 'favoritos' && (
          <div>
            {momentosFavoritos.length === 0 ? (
              <div className="text-center py-16 text-muted">
                <FiHeart className="text-5xl mx-auto mb-3 opacity-30" />
                <p className="font-medium">Nenhum favorito ainda.</p>
                <p className="text-sm mt-1">Favorite momentos para vê-los aqui.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {momentosFavoritos.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-surface border border-primary/20 rounded-2xl p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-white font-semibold">{m.titulo}</p>
                        <p className="text-muted text-xs mt-0.5">{m.data}</p>
                        <p className="text-white/60 text-sm italic mt-2 line-clamp-2">{m.frase}</p>
                      </div>
                      <FiHeart className="text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
