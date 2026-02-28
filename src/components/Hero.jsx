import { useRef, useEffect } from 'react'
import { motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion'

// Floating geometric shape
function GeometricShape({ shape, size, x, y, delay, duration, color }) {
    const shapes = {
        triangle: (
            <polygon points="50,5 95,90 5,90" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
        ),
        square: (
            <rect x="10" y="10" width="80" height="80" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" transform="rotate(15 50 50)" />
        ),
        diamond: (
            <polygon points="50,5 95,50 50,95 5,50" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
        ),
        hexagon: (
            <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
        ),
        circle: (
            <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="1.5" fill="none" opacity="0.3" />
        ),
        cross: (
            <>
                <line x1="50" y1="10" x2="50" y2="90" stroke={color} strokeWidth="1.5" opacity="0.4" />
                <line x1="10" y1="50" x2="90" y2="50" stroke={color} strokeWidth="1.5" opacity="0.4" />
            </>
        ),
    }

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
            animate={{
                y: [0, -25, 0],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            <svg viewBox="0 0 100 100" width={size} height={size}>
                {shapes[shape]}
            </svg>
        </motion.div>
    )
}

const shapes = [
    { shape: 'triangle', size: 40, x: 5, y: 15, delay: 0, duration: 8, color: '#00f5ff' },
    { shape: 'diamond', size: 30, x: 90, y: 10, delay: 1, duration: 10, color: '#7c3aed' },
    { shape: 'square', size: 25, x: 80, y: 70, delay: 2, duration: 9, color: '#00f5ff' },
    { shape: 'hexagon', size: 35, x: 10, y: 75, delay: 0.5, duration: 11, color: '#7c3aed' },
    { shape: 'circle', size: 20, x: 50, y: 5, delay: 1.5, duration: 7, color: '#00f5ff' },
    { shape: 'cross', size: 28, x: 15, y: 45, delay: 3, duration: 12, color: '#7c3aed' },
    { shape: 'triangle', size: 22, x: 75, y: 40, delay: 2.5, duration: 9, color: '#00f5ff' },
    { shape: 'diamond', size: 18, x: 60, y: 85, delay: 1.8, duration: 13, color: '#7c3aed' },
    { shape: 'square', size: 32, x: 30, y: 25, delay: 0.8, duration: 10, color: '#00f5ff' },
    { shape: 'hexagon', size: 24, x: 45, y: 60, delay: 3.5, duration: 8, color: '#7c3aed' },
]

export default function Hero({ logoSrc }) {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#141414]">
            {/* Background gradient blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-700/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0,245,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.15) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Floating Geometric Shapes */}
            {shapes.map((s, i) => (
                <GeometricShape key={i} {...s} />
            ))}

            {/* Hero Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Logo with floating antigravity effect */}
                <motion.div
                    className="flex justify-center mb-8"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="relative group cursor-pointer">
                        {/* Outer glow ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={{
                                boxShadow: [
                                    '0 0 30px rgba(0,245,255,0.2)',
                                    '0 0 60px rgba(0,245,255,0.5)',
                                    '0 0 30px rgba(0,245,255,0.2)',
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        {/* Logo image or fallback */}
                        {logoSrc ? (
                            <img
                                src={logoSrc}
                                alt="Vibe Solution Logo"
                                className="w-32 h-32 rounded-full object-cover group-hover:scale-110 transition-transform duration-500"
                                style={{ filter: 'drop-shadow(0 0 20px rgba(0,245,255,0.4))' }}
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-violet-600 to-purple-800 flex items-center justify-center text-5xl font-display font-black text-white group-hover:scale-110 transition-transform duration-500 shadow-2xl"
                                style={{ boxShadow: '0 0 40px rgba(0,245,255,0.3)' }}
                            >
                                V
                            </div>
                        )}
                        {/* Rotating ring */}
                        <motion.div
                            className="absolute -inset-3 rounded-full border border-cyan-400/20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                            style={{ borderStyle: 'dashed' }}
                        />
                        <motion.div
                            className="absolute -inset-6 rounded-full border border-purple-600/15"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            style={{ borderStyle: 'dashed' }}
                        />
                    </div>
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6 border border-cyan-400/20"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Web Design & AI Solutions
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6 text-white"
                >
                    Build the{' '}
                    <span className="gradient-text">Future</span>
                    <br />
                    <span className="text-slate-400">with Vibes</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    We craft pixel-perfect digital experiences powered by AI, merging modern aesthetics with cutting-edge technology to elevate your brand.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <motion.a
                        href="#about"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,245,255,0.4)' }}
                        whileTap={{ scale: 0.97 }}
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-base shadow-xl transition-all duration-300"
                    >
                        About Us
                    </motion.a>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-8 py-4 rounded-full glass border border-white/20 text-white font-semibold text-base hover:border-cyan-400/40 transition-all duration-300"
                    >
                        Let's Talk
                    </motion.a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border-2 border-slate-600 flex items-start justify-center pt-1.5"
                    >
                        <div className="w-1 h-2 rounded-full bg-slate-500" />
                    </motion.div>
                    <span className="text-xs tracking-widest font-medium">SCROLL</span>
                </motion.div>
            </div>
        </section>
    )
}
