import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const contactInfo = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        label: 'Email',
        value: 'hello@vibesolution.me',
        href: 'mailto:hello@vibesolution.me',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        label: 'Location',
        value: 'Global · Remote-First',
        href: null,
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        label: 'Response Time',
        value: 'Within 24 hours',
        href: null,
    },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
    const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, amount: 0.1 })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        // Simulate form submission
        await new Promise(r => setTimeout(r, 1500))
        setStatus('success')
        setForm({ name: '', email: '', service: '', message: '' })
    }

    return (
        <section id="contact" className="py-28 relative bg-[#0f0f0f] overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl" />
            </div>

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
                        Let's Connect
                    </span>
                    <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
                        Start a <span className="gradient-text">Project</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        Have an idea? Let's turn it into something extraordinary together.
                    </p>
                </motion.div>

                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* Info panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="space-y-4">
                            {contactInfo.map((info) => (
                                <div key={info.label} className="glass rounded-xl p-5 border border-white/8 flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-600/20 flex items-center justify-center text-cyan-400 shrink-0">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 mb-0.5">{info.label}</div>
                                        {info.href ? (
                                            <a href={info.href} className="text-slate-200 text-sm font-medium hover:text-cyan-400 transition-colors">
                                                {info.value}
                                            </a>
                                        ) : (
                                            <span className="text-slate-200 text-sm font-medium">{info.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social links */}
                        <div className="pt-4">
                            <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 font-semibold">Follow Us</p>
                            <div className="flex gap-3">
                                {/* YouTube */}
                                <motion.a
                                    href="https://youtube.com/@vibesolution_me?si=lRSIv5-MSoVIZCtf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-slate-300 hover:text-red-400 hover:border-red-400/30 transition-all duration-300"
                                    aria-label="YouTube"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    <span className="text-sm font-medium">YouTube</span>
                                </motion.a>

                                {/* TikTok */}
                                <motion.a
                                    href="https://vm.tiktok.com/ZS9JERJkPeuj9-17eZe/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-slate-300 hover:text-pink-400 hover:border-pink-400/30 transition-all duration-300"
                                    aria-label="TikTok"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z" />
                                    </svg>
                                    <span className="text-sm font-medium">TikTok</span>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="glass rounded-2xl p-8 border border-white/10 space-y-5"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all duration-200 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all duration-200 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                                    Service Needed
                                </label>
                                <select
                                    name="service"
                                    value={form.service}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 focus:outline-none focus:border-cyan-400/50 transition-all duration-200 text-sm appearance-none cursor-pointer"
                                    style={{ background: 'rgba(255,255,255,0.05)' }}
                                >
                                    <option value="" disabled style={{ background: '#1a1a1a' }}>Select a service...</option>
                                    <option value="web-design" style={{ background: '#1a1a1a' }}>Web Design</option>
                                    <option value="web-development" style={{ background: '#1a1a1a' }}>Web Development</option>
                                    <option value="ai-solutions" style={{ background: '#1a1a1a' }}>AI Solutions</option>
                                    <option value="seo-growth" style={{ background: '#1a1a1a' }}>SEO & Growth</option>
                                    <option value="other" style={{ background: '#1a1a1a' }}>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell us about your project..."
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all duration-200 text-sm resize-none"
                                />
                            </div>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 shrink-0">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Message sent! We'll get back to you within 24 hours.
                                </motion.div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                whileHover={{ scale: status === 'sending' ? 1 : 1.02, boxShadow: '0 0 30px rgba(0,245,255,0.3)' }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-base tracking-wide disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                                            <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : status === 'success' ? (
                                    '✓ Message Sent!'
                                ) : (
                                    <>
                                        Send Message
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                        </svg>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
