'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiHome, FiFilm, FiMessageCircle, FiClock, FiMoreHorizontal } from 'react-icons/fi'

const navItems = [
  { href: '/', label: 'Home', icon: FiHome },
  { href: '/momentos', label: 'Momentos', icon: FiFilm },
  { href: '/frases', label: 'Frases', icon: FiMessageCircle },
  { href: '/timeline', label: 'Timeline', icon: FiClock },
  { href: '/admin', label: 'Mais', icon: FiMoreHorizontal },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-white/5">
      <div className="flex items-center justify-around max-w-2xl mx-auto px-2 py-2 pb-safe">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

          return (
            <Link key={href} href={href} className="flex-1">
              <motion.div
                className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl min-h-[48px] justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <div className="relative">
                  <Icon
                    className={`text-xl transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-muted'
                    }`}
                    fill={isActive ? 'currentColor' : 'none'}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                    />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-muted'
                  }`}
                >
                  {label}
                </span>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
