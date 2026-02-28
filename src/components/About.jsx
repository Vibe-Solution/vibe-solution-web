import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const guarantees = [
    {
        icon: '🎓',
        title: 'Driven by Students',
        description: 'We are a team of university students passionate about tech. We work hard to gain real-world experience, bringing fresh perspectives and raw dedication to every project.',
        accent: 'from-blue-400 to-cyan-500',
        glowColor: 'rgba(0, 245, 255, 0.15)'
    },
    {
        icon: '💰',
        title: 'Unbeatable Value',
        description: 'Because we are focused on building our portfolio and experience, we offer premium-quality digital solutions at a fraction of the cost of traditional agencies.',
        accent: 'from-emerald-400 to-green-600',
        glowColor: 'rgba(16, 185, 129, 0.15)'
    },
    {
        icon: '🛡️',
        title: '3-Month Warranty',
        description: 'We stand by our code. Every project comes with a comprehensive 3-month warranty to ensure your platform runs flawlessly after launch.',
        accent: 'from-violet-400 to-purple-600',
        glowColor: 'rgba(139, 92, 246, 0.15)'
    },
    {
        icon: '⚡',
        title: 'Lightning Fast Delivery',
        description: 'Time is money. We guarantee full project delivery within 2 weeks, and we will get a working prototype in your hands within just 3 days.',
        accent: 'from-amber-400 to-orange-500',
        glowColor: 'rgba(245, 158, 11, 0.15)'
    }
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function About() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section id="about" className="py-28 relative bg-[#0f0f0f] overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/20 rounded-full px-4 py-1.5 inline-block mb-4">
                        Who We Are
                    </span>
                    <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                        Young <span className="gradient-text">Talent</span>,
                        <br className="hidden md:block" /> Unmatched <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Value</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        We are a dynamic crew of university students redefining web development.
                        By choosing us, you get cutting-edge skills, relentless hustle, and premium results without the agency price tag.
                    </p>
                </motion.div>

                {/* Values/Guarantees Grid */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {guarantees.map((item, index) => (
                        <motion.div
                            key={item.title}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="glass rounded-3xl p-8 border border-white/5 relative group overflow-hidden"
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05)'
                            }}
                        >
                            {/* Hover glow effect */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{ background: `radial-gradient(circle at 50% 120%, ${item.glowColor}, transparent 70%)` }}
                            />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-2xl shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="font-display font-bold text-2xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-[15px]">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Timeline Highlight */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 rounded-3xl p-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                >
                    <div className="bg-[#141414] rounded-[22px] px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                        <div className="md:w-1/2">
                            <h3 className="font-display font-bold text-3xl text-white mb-3">
                                Need it <span className="text-cyan-400">fast?</span>
                            </h3>
                            <p className="text-slate-400">
                                Our streamlined student workflow means no corporate red tape. We move fast and break expectations, not deadlines.
                            </p>
                        </div>
                        <div className="md:w-1/2 flex flex-col sm:flex-row gap-4 w-full">
                            <div className="flex-1 glass rounded-2xl p-6 border border-white/5 text-center">
                                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">3 Days</div>
                                <div className="text-sm font-medium tracking-wider text-slate-500 uppercase">To Prototype</div>
                            </div>
                            <div className="flex-1 glass rounded-2xl p-6 border border-white/5 text-center">
                                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">2 Weeks</div>
                                <div className="text-sm font-medium tracking-wider text-slate-500 uppercase">To Launch</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
