import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import vibeLogo from '../assets/vibe-logo.jpg'

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Team', path: '/team' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30)
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
                    ? 'border-b border-white/10 shadow-lg shadow-black/50 bg-[#0d0d0d]/90 backdrop-blur-md'
                    : 'bg-gradient-to-b from-[#0d0d0d]/80 to-transparent backdrop-blur-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
                {/* Logo */}
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

                {/* Desktop links as dedicated pages */}
                <ul className="hidden md:flex items-center gap-7">
                    {navLinks.map((link) => {
                        const isActive =
                            link.path === '/'
                                ? location.pathname === '/'
                                : location.pathname.startsWith(link.path)

                        return (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`text-sm font-medium transition-colors relative py-1 ${
                                        isActive
                                            ? 'text-cyan-400 font-semibold'
                                            : 'text-slate-300 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {/* CTA Button */}
                <div className="hidden md:flex items-center gap-3">
                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 cursor-pointer"
                        >
                            Get Started
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </Link>
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
                                const isActive =
                                    link.path === '/'
                                        ? location.pathname === '/'
                                        : location.pathname.startsWith(link.path)
                                return (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            onClick={() => setMenuOpen(false)}
                                            className={`block py-3 border-b border-white/5 transition-colors text-sm ${
                                                isActive
                                                    ? 'text-cyan-400 font-semibold'
                                                    : 'text-slate-300 hover:text-white'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                            <li className="pt-4">
                                <Link
                                    to="/contact"
                                    onClick={() => setMenuOpen(false)}
                                    className="block text-center px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-bold uppercase tracking-wider"
                                >
                                    Get Started
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
