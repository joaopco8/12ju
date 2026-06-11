export type Categoria = 'romantico' | 'diversão' | 'memória' | 'casual'

export type Momento = {
  id: string
  fotos: string[]
  frase: string
  data: string
}

export const momentos: Momento[] = [
  {
    id: '1',
    fotos: ['/foto/foto1.jpeg', '/foto/foto2.jpeg', '/foto/foto3.jpeg'],
    frase: 'Eu não sabia que ia ser você. Mas foi.',
    data: '2025-05-10',
  },
  {
    id: '2',
    fotos: ['/foto/foto4.jpeg', '/foto/foto5.jpeg', '/foto/foto6.jpeg', '/foto/foto7.jpeg'],
    frase: 'Com você até o comum vira especial.',
    data: '2025-06-08',
  },
  {
    id: '3',
    fotos: ['/foto/foto8.jpeg', '/foto/foto9.jpeg', '/foto/foto10.jpeg'],
    frase: 'Esses olhos. Sempre esses olhos.',
    data: '2025-07-14',
  },
  {
    id: '4',
    fotos: ['/foto/foto11.jpeg', '/foto/foto12.jpeg'],
    frase: 'Domingo com você dura mais.',
    data: '2025-08-03',
  },
  {
    id: '5',
    fotos: ['/foto/foto13.jpeg', '/foto/foto14.jpeg', '/foto/foto15.jpeg'],
    frase: 'Ri mais desde que te conheço.',
    data: '2025-09-20',
  },
  {
    id: '6',
    fotos: ['/foto/foto16.jpeg', '/foto/foto17.jpeg', '/foto/foto18.jpeg'],
    frase: 'Tem coisa que a gente não precisa falar.',
    data: '2025-10-11',
  },
  {
    id: '7',
    fotos: ['/foto/foto19.jpeg', '/foto/foto20.jpeg', '/foto/foto21.jpeg'],
    frase: 'Onde você está, eu quero estar.',
    data: '2025-11-30',
  },
  {
    id: '8',
    fotos: ['/foto/foto22.jpeg', '/foto/foto23.jpeg', '/foto/foto24.jpeg'],
    frase: 'Até as brigas passam. O que fica és você.',
    data: '2025-12-24',
  },
  {
    id: '9',
    fotos: ['/foto/foto25.jpeg', '/foto/foto26.jpeg', '/foto/foto27.jpeg'],
    frase: 'Que bom que eu te achei.',
    data: '2026-02-14',
  },
]

export function getMomentoById(id: string): Momento | undefined {
  return momentos.find((m) => m.id === id)
}

export function calcularDiasJuntos(dataInicio: string): number {
  const inicio = new Date(dataInicio)
  const hoje = new Date()
  const diff = hoje.getTime() - inicio.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

// 10 de maio de 2025
export const DATA_INICIO = '2025-05-10'
