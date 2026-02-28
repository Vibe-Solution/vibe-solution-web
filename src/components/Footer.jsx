import { motion } from 'framer-motion'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative bg-[#0d0d0d] border-t border-white/5 py-12 overflow-hidden">
            {/* Gradient divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <a href="#home" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center font-display font-black text-white text-sm">
                                V
                            </div>
                            <span className="font-display font-bold text-lg text-white">
                                Vibe<span className="gradient-text">Solution</span>
                            </span>
                        </a>
                        <p className="text-slate-500 text-sm max-w-xs text-center md:text-left">
                            Crafting extraordinary digital experiences powered by creativity and AI.
                        </p>
                    </div>

                    {/* Nav links */}
                    <nav>
                        <ul className="flex flex-wrap justify-center gap-6">
                            {['Home', 'Services', 'Team', 'Portfolio', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                        {/* YouTube */}
                        <motion.a
                            href="https://youtube.com/@vibesolution_me?si=lRSIv5-MSoVIZCtf"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, y: -2 }}
                            className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-400/30 transition-colors duration-300"
                            aria-label="YouTube"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </motion.a>

                        {/* TikTok */}
                        <motion.a
                            href="https://vm.tiktok.com/ZS9JERJkPeuj9-17eZe/"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, y: -2 }}
                            className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-400/30 transition-colors duration-300"
                            aria-label="TikTok"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z" />
                            </svg>
                        </motion.a>

                        {/* Instagram placeholder */}
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.15, y: -2 }}
                            className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-400/30 transition-colors duration-300"
                            aria-label="Instagram"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </motion.a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-slate-600 text-xs">
                        © {currentYear} Vibe Solution. All rights reserved.
                    </p>
                    <p className="text-slate-600 text-xs flex items-center gap-1">
                        Made with
                        <motion.span
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-red-500"
                        >
                            ♥
                        </motion.span>
                        & AI
                    </p>
                </div>
            </div>
        </footer>
    )
}
