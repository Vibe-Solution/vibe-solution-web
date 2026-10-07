import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { teamMembers } from '../../data/teamData'

function MemberCard({ member, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <Link
                to={`/portfolio/${member.slug}`}
                className="group block rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
                style={{
                    background: 'rgba(255,255,255,0.03)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
            >
                {/* Top accent line */}
                <div
                    className={`h-1 w-full bg-gradient-to-r ${member.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}
                />

                <div className="p-8 flex flex-col items-center text-center">
                    {/* Avatar */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-4xl mb-5 shadow-xl`}
                        style={{ boxShadow: `0 0 30px ${member.accent}40` }}
                    >
                        {member.emoji}
                    </motion.div>

                    {/* Role badge */}
                    <span
                        className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                        style={{
                            background: `${member.accent}20`,
                            color: member.accent,
                            border: `1px solid ${member.accent}40`,
                        }}
                    >
                        {member.role}
                    </span>

                    <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-white/90">
                        {member.name}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
                        {member.bio}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-5">
                        {member.skills.map((skill) => (
                            <span
                                key={skill}
                                className="text-[11px] px-2.5 py-0.5 rounded-full border border-white/10 text-slate-400"
                                style={{ background: 'rgba(255,255,255,0.05)' }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* View Portfolio CTA */}
                    <div
                        className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                        style={{ color: member.accent }}
                    >
                        View Portfolio
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default function PortfolioListing() {
    return (
        <div className="min-h-screen bg-[#141414]">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/20 rounded-full px-4 py-1.5 inline-block mb-4">
                        Our Work
                    </span>
                    <h1 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
                        Team <span className="gradient-text">Portfolio</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        Explore each member's projects, tech stacks, and contributions
                    </p>
                </motion.div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member, i) => (
                        <MemberCard key={member.slug} member={member} index={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}
