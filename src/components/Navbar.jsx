import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import vibeLogo from '../assets/vibe-logo.jpg'

const navLinks = [
    { label: 'Home', href: '#home', path: '/' },
    { label: 'Services', href: '#services', path: '/#services' },
    { label: 'About Us', href: '#about', path: '/#about' },
    { label: 'Team', href: '#team', path: '/#team' },
    { label: 'Portfolio', href: '#portfolio', path: '/portfolio', isRoute: true },
    { label: 'Contact', href: '#contact', path: '/#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const isHomePage = location.pathname === '/'

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'glass border-b border-white/10 shadow-lg shadow-black/50 bg-[#0d0d0d]/85 backdrop-blur-md'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
                {/* Logo with official graphic */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="relative">
                        <img
                            src={vibeLogo}
                            alt="Vibe Solution"
                            className="w-9 h-9 rounded-xl object-cover border border-cyan-400/30 group-hover:border-cyan-400 group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0.3)]"
                        />
                        <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-glow-cyan transition-all duration-300">
                        Vibe<span className="gradient-text">Solution</span>
                    </span>
                </Link>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-7">
                    {navLinks.map((link) => {
                        if (link.isRoute && !isHomePage) {
                            return (
                                <li key={link.label}>
                                    <Link
                                        to={link.path}
                                        className="text-sm font-medium text-slate-300 hover:text-cyan-400 relative group transition-colors duration-200"
                                    >
                                        {link.label}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-full transition-all duration-300" />
                                    </Link>
                                </li>
                            )
                        }

                        const targetHref = isHomePage ? link.href : link.path

                        return (
                            <li key={link.label}>
                                {targetHref.startsWith('/') ? (
                                    <Link
                                        to={targetHref}
                                        className="text-sm font-medium text-slate-300 hover:text-cyan-400 relative group transition-colors duration-200"
                                    >
                                        {link.label}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-full transition-all duration-300" />
                                    </Link>
                                ) : (
                                    <a
                                        href={targetHref}
                                        className="text-sm font-medium text-slate-300 hover:text-cyan-400 relative group transition-colors duration-200"
                                    >
                                        {link.label}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-full transition-all duration-300" />
                                    </a>
                                )}
                            </li>
                        )
                    })}
                </ul>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <motion.a
                        href={isHomePage ? '#contact' : '/#contact'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                    >
                        Get Started
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </motion.a>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-slate-300 hover:text-cyan-400 p-2 transition-colors cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <div className="w-5 h-4 flex flex-col justify-between">
                        <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/10 overflow-hidden bg-[#0d0d0d]/95 backdrop-blur-xl"
                    >
                        <ul className="flex flex-col gap-0 px-6 py-4">
                            {navLinks.map((link) => {
                                const targetHref = isHomePage ? link.href : link.path
                                return (
                                    <li key={link.label}>
                                        {targetHref.startsWith('/') ? (
                                            <Link
                                                to={targetHref}
                                                onClick={() => setMenuOpen(false)}
                                                className="block py-3 text-slate-300 hover:text-cyan-400 border-b border-white/5 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={targetHref}
                                                onClick={() => setMenuOpen(false)}
                                                className="block py-3 text-slate-300 hover:text-cyan-400 border-b border-white/5 transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </li>
                                )
                            })}
                            <li className="pt-4">
                                <a
                                    href={isHomePage ? '#contact' : '/#contact'}
                                    onClick={() => setMenuOpen(false)}
                                    className="block text-center px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-bold uppercase tracking-wider"
                                >
                                    Get Started
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
