import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
        title: 'Web Design',
        subtitle: 'Pixel-Perfect Interfaces',
        description: 'We design stunning, responsive websites that captivate visitors and convert them into customers. Every pixel crafted with intention.',
        features: ['UI/UX Design', 'Responsive Layouts', 'Brand Identity', 'Design Systems'],
        accent: 'from-cyan-400 to-cyan-600',
        glowColor: 'rgba(0,245,255,0.15)',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
        title: 'Web Development',
        subtitle: 'Blazing-Fast Applications',
        description: 'From landing pages to complex web apps, we build performant, scalable solutions using modern tech stacks like React and Next.js.',
        features: ['React / Next.js', 'Performance Optimization', 'API Integration', 'E-Commerce'],
        accent: 'from-violet-500 to-purple-700',
        glowColor: 'rgba(124,58,237,0.15)',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
        ),
        title: 'AI Solutions',
        subtitle: 'Intelligent Automation',
        description: 'Harness the power of artificial intelligence to automate workflows, generate insights, and create personalized user experiences at scale.',
        features: ['AI Chatbots', 'Automation Pipelines', 'Data Analytics', 'ML Integration'],
        accent: 'from-fuchsia-500 to-cyan-500',
        glowColor: 'rgba(217,70,239,0.15)',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
        title: 'SEO & Growth',
        subtitle: 'Dominate Search Results',
        description: 'Strategic SEO and growth hacking to put your brand in front of the right audience. More traffic, more leads, more revenue.',
        features: ['Technical SEO', 'Content Strategy', 'Analytics', 'Conversion Optimization'],
        accent: 'from-cyan-400 to-violet-600',
        glowColor: 'rgba(0,245,255,0.1)',
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function Services() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, amount: 0.1 })

    return (
        <section id="services" className="py-28 relative overflow-hidden bg-[#141414]">
            {/* Background accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-cyan-400/30" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/20 rounded-full px-4 py-1.5 inline-block mb-4">
                        What We Build
                    </span>
                    <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
                        Our <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        End-to-end digital solutions that transform ideas into market-ready products
                    </p>
                </motion.div>

                {/* Service cards grid */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.01 }}
                            className="glass rounded-2xl p-8 border border-white/8 group cursor-default relative overflow-hidden"
                            style={{ '--glow': service.glowColor }}
                        >
                            {/* Hover glow bg */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                style={{ background: `radial-gradient(circle at 20% 50%, ${service.glowColor}, transparent 70%)` }}
                            />

                            {/* Icon */}
                            <div className={`relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br ${service.accent} p-0.5 mb-5 shrink-0`}>
                                <div className="w-full h-full rounded-xl bg-[#1a1a1a] flex items-center justify-center text-white">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <span className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-1 block">
                                    {service.subtitle}
                                </span>
                                <h3 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                                    {service.description}
                                </p>

                                {/* Feature tags */}
                                <div className="flex flex-wrap gap-2">
                                    {service.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="text-xs px-3 py-1 rounded-full border border-white/10 text-slate-400 bg-white/5"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Arrow indicator */}
                            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-600 group-hover:border-cyan-400/40 group-hover:text-cyan-400 transition-all duration-300">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
