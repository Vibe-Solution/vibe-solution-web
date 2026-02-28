import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

const teamMembers = [
    {
        name: 'W. Nirman Achintha',
        role: 'Founder & Lead Developer',
        emoji: '💻',
        bio: 'IT undergraduate at ITUM focusing on building scalable web solutions and exploring cloud architectures.',
        skills: ['Python', 'Cloud', 'React', 'Node.js'],
        gradient: 'from-cyan-400 to-blue-600',
        accent: '#00f5ff',
        socials: {
            github: 'https://github.com/NirMAN-15',
            linkedin: 'https://www.linkedin.com/in/w-nirman-achintha/',
        },
    },
    {
        name: 'Imal Lakshitha',
        role: 'Network & Systems Specialist',
        emoji: '🌐',
        bio: 'IT undergraduate with a strong foundation in networking, infrastructure, and RBAC systems.',
        skills: ['Networks', 'Linux', 'Cisco PT', 'System Admin'],
        gradient: 'from-fuchsia-500 to-purple-700',
        accent: '#d946ef',
        socials: {
            github: 'https://github.com/Imal-Lakshitha',
            linkedin: 'https://www.linkedin.com/in/imal-lakshitha-12ab29283/',
        },
    },
    {
        name: 'Tharaka Jayampathi',
        role: 'Data Science & Python Developer',
        emoji: '📊',
        bio: 'IT student at University of Moratuwa with a passion for data-driven insights and complex problem solving.',
        skills: ['Python', 'Data Science', 'Cisco', 'HTML/CSS'],
        gradient: 'from-violet-500 to-cyan-500',
        accent: '#7c3aed',
        socials: {
            github: 'https://github.com/Tharaka-Jayampathi',
            linkedin: 'https://www.linkedin.com/in/tharaka-jayampathi-38375235b/',
        },
    },
    {
        name: 'Ravindi Geeganage',
        role: 'Frontend & UI Designer',
        emoji: '✨',
        bio: 'Detail-oriented IT undergraduate specializing in creating clean, responsive, and intuitive user interfaces.',
        skills: ['JavaScript', 'HTML/CSS', 'UI/UX Design', 'Web Admin'],
        gradient: 'from-emerald-400 to-teal-500',
        accent: '#34d399',
        socials: {
            github: 'https://github.com/Ravindi-29',
            linkedin: 'https://www.linkedin.com/in/ravindi-ranthilini-192ba4297/',
        },
    },
    {
        name: 'Miyuni Devanga',
        role: 'AI & Compliance Specialist',
        emoji: '🧠',
        bio: 'IT student focusing on the intersection of emerging technologies, LLMs, and ethical AI governance.',
        skills: ['AI Governance', 'LLMs', 'Python', 'Management'],
        gradient: 'from-orange-400 to-pink-500',
        accent: '#f97316',
        socials: {
            github: 'https://github.com/Miyuniit0467',
            linkedin: 'https://www.linkedin.com/in/miyuni-dewanga-4a1b2b35b/',
        },
    }
]

function TiltCard({ member, index }) {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 })
    const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg'])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg'])

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        x.set(mouseX / width - 0.5)
        y.set(mouseY / height - 0.5)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
            className="group cursor-default"
        >
            <div
                className="glass rounded-2xl p-8 border border-white/10 relative overflow-hidden"
                style={{
                    background: 'rgba(255,255,255,0.03)',
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.4)`,
                }}
            >
                {/* Hover gradient overlay */}
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at 50% 0%, ${member.accent}20, transparent 70%)`,
                    }}
                />

                {/* Top accent line */}
                <div
                    className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${member.gradient}`}
                    style={{ zIndex: 10 }}
                />

                {/* Avatar */}
                <div className="relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-4xl mb-5 shadow-xl`}
                        style={{ boxShadow: `0 0 30px ${member.accent}40` }}
                    >
                        {member.emoji}
                    </motion.div>

                    {/* Role badge */}
                    <span
                        className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                        style={{
                            background: `${member.accent}20`,
                            color: member.accent,
                            border: `1px solid ${member.accent}40`,
                        }}
                    >
                        {member.role}
                    </span>

                    <h3 className="font-display font-bold text-2xl text-white mb-3">{member.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{member.bio}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {member.skills.map((skill) => (
                            <span
                                key={skill}
                                className="text-xs px-3 py-1 rounded-full border border-white/10 text-slate-400"
                                style={{ background: 'rgba(255,255,255,0.05)' }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Social links */}
                    <div className="flex gap-3">
                        <a
                            href={member.socials.linkedin}
                            className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all duration-200"
                            aria-label="LinkedIn"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a
                            href={member.socials.github}
                            className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all duration-200"
                            aria-label="GitHub"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function Team() {
    return (
        <section id="team" className="py-28 relative bg-[#0f0f0f]">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-3xl" />
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
                    <span className="text-xs font-semibold tracking-widest uppercase text-purple-400 border border-purple-400/20 rounded-full px-4 py-1.5 inline-block mb-4">
                        The Dream Team
                    </span>
                    <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
                        Meet the <span className="gradient-text">Crew</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        A team of creative mavericks united by a passion for building extraordinary digital experiences
                    </p>
                </motion.div>

                {/* Team cards - 3D tilt */}
                <div className="flex flex-wrap justify-center gap-8" style={{ perspective: '1000px' }}>
                    {teamMembers.map((member, i) => (
                        <div key={member.name} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)]">
                            <TiltCard member={member} index={i} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
