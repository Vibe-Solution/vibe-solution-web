import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { teamMembers } from '../../data/teamData'
import { useGitHubRepos } from '../../hooks/useGitHubRepos'
import ProjectCard from './ProjectCard'
import { getProjectMeta } from '../../utils/portfolioStorage'

export default function MemberPortfolio() {
    const { slug } = useParams()
    const member = teamMembers.find((m) => m.slug === slug)
    const { repos, loading, error } = useGitHubRepos(member?.githubUsername)
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('updated')
    const [filterLang, setFilterLang] = useState('all')
    const [storageVersion, setStorageVersion] = useState(0)

    // Listen to real-time changes if edited in admin
    useEffect(() => {
        const handleUpdate = () => setStorageVersion((v) => v + 1)
        window.addEventListener('portfolio-storage-updated', handleUpdate)
        return () => window.removeEventListener('portfolio-storage-updated', handleUpdate)
    }, [])

    // Filter out hidden repos for public view
    const publicRepos = useMemo(() => {
        if (!member) return []
        return repos.filter((r) => {
            const meta = getProjectMeta(member.githubUsername, r.name)
            return !meta?.hidden
        })
    }, [repos, member, storageVersion])

    // Get unique languages from public repos
    const languages = useMemo(() => {
        const langs = [...new Set(publicRepos.map((r) => r.language).filter(Boolean))]
        return langs.sort()
    }, [publicRepos])

    // Filter & sort repos
    const filteredRepos = useMemo(() => {
        let result = [...publicRepos]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(
                (r) =>
                    r.name.toLowerCase().includes(q) ||
                    (r.description && r.description.toLowerCase().includes(q))
            )
        }

        if (filterLang !== 'all') {
            result = result.filter((r) => r.language === filterLang)
        }

        switch (sortBy) {
            case 'stars':
                result.sort((a, b) => b.stargazers_count - a.stargazers_count)
                break
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'updated':
            default:
                result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                break
        }

        return result
    }, [publicRepos, search, sortBy, filterLang])

    if (!member) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center p-6">
                <div className="text-center glass p-8 rounded-2xl border border-white/10 max-w-md">
                    <h1 className="text-3xl font-bold text-white mb-4">Member Not Found</h1>
                    <Link to="/portfolio" className="text-cyan-400 hover:underline">
                        ← Back to Portfolios
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#141414]">
            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[140px] opacity-20"
                    style={{
                        background: `radial-gradient(circle, ${member.accent}40, transparent 70%)`,
                    }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
                {/* Back navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between mb-8"
                >
                    <Link
                        to="/portfolio"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        All Team Portfolios
                    </Link>

                    {/* Quick navigation to other members */}
                    <div className="hidden md:flex items-center gap-2">
                        {teamMembers.map((m) => (
                            <Link
                                key={m.slug}
                                to={`/portfolio/${m.slug}`}
                                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                                    m.slug === member.slug
                                        ? 'bg-white/15 text-white border-white/30'
                                        : 'bg-white/[0.02] text-slate-400 border-white/5 hover:text-white hover:border-white/20'
                                }`}
                            >
                                {m.emoji} {m.shortName || m.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Member Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="glass rounded-3xl p-8 border border-white/10 mb-8 relative overflow-hidden"
                    style={{
                        boxShadow: `0 0 50px ${member.accent}15`,
                    }}
                >
                    <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${member.gradient}`}
                    />

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Avatar */}
                        <div
                            className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-4xl shadow-xl flex-shrink-0`}
                            style={{ boxShadow: `0 0 30px ${member.accent}40` }}
                        >
                            {member.emoji}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                <span
                                    className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                                    style={{
                                        background: `${member.accent}20`,
                                        color: member.accent,
                                        border: `1px solid ${member.accent}40`,
                                    }}
                                >
                                    {member.role}
                                </span>
                                <span className="text-xs text-slate-400">
                                    @{member.githubUsername}
                                </span>
                            </div>

                            <h1 className="font-display font-black text-3xl md:text-4xl text-white mb-2">
                                {member.name}
                            </h1>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-xl">
                                {member.bio}
                            </p>

                            {/* Skills */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mb-4">
                                {member.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xs px-3 py-1 rounded-full border border-white/10 text-slate-300"
                                        style={{ background: 'rgba(255,255,255,0.05)' }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Socials */}
                            <div className="flex justify-center md:justify-start gap-3">
                                <a
                                    href={member.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all duration-200"
                                    aria-label="LinkedIn"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a
                                    href={member.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all duration-200"
                                    aria-label="GitHub"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Stats based strictly on visible public repos */}
                        {!loading && !error && (
                            <div className="flex md:flex-col gap-3 text-center flex-shrink-0">
                                <div className="glass rounded-2xl px-5 py-3 border border-white/10 min-w-[100px]">
                                    <div className="text-2xl font-bold text-white">{publicRepos.length}</div>
                                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                                        Projects
                                    </div>
                                </div>
                                <div className="glass rounded-2xl px-5 py-3 border border-white/10 min-w-[100px]">
                                    <div className="text-2xl font-bold text-white">
                                        {publicRepos.reduce((sum, r) => sum + r.stargazers_count, 0)}
                                    </div>
                                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                                        Stars
                                    </div>
                                </div>
                                <div className="glass rounded-2xl px-5 py-3 border border-white/10 min-w-[100px]">
                                    <div className="text-2xl font-bold text-white">
                                        {publicRepos.reduce((sum, r) => sum + r.forks_count, 0)}
                                    </div>
                                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                                        Forks
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Filters & Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-3 mb-8"
                >
                    <div className="relative flex-1">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-white/20 transition-colors"
                        />
                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm focus:outline-none focus:border-white/20 transition-colors cursor-pointer"
                    >
                        <option value="updated">Recently Updated</option>
                        <option value="stars">Most Stars</option>
                        <option value="name">Alphabetical</option>
                    </select>

                    <select
                        value={filterLang}
                        onChange={(e) => setFilterLang(e.target.value)}
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm focus:outline-none focus:border-white/20 transition-colors cursor-pointer"
                    >
                        <option value="all">All Languages</option>
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div
                            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mb-4"
                            style={{ borderColor: `${member.accent}40`, borderTopColor: 'transparent' }}
                        />
                        <p className="text-slate-400 text-sm">Fetching projects...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-20 glass rounded-2xl border border-red-500/20">
                        <div className="text-4xl mb-4">⚠️</div>
                        <p className="text-red-400 text-sm mb-2">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-cyan-400 hover:underline text-sm cursor-pointer"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Projects Grid */}
                {!loading && !error && (
                    <>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
                            <span>
                                Showing {filteredRepos.length} public {filteredRepos.length === 1 ? 'repository' : 'repositories'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredRepos.map((repo, i) => (
                                <ProjectCard
                                    key={repo.id}
                                    repo={repo}
                                    index={i}
                                    accent={member.accent}
                                    githubUsername={member.githubUsername}
                                    isAdmin={false}
                                />
                            ))}
                        </div>

                        {filteredRepos.length === 0 && (
                            <div className="text-center py-20 glass rounded-2xl border border-white/5">
                                <div className="text-4xl mb-3">📁</div>
                                <p className="text-slate-400 text-sm">No visible projects match your filter.</p>
                            </div>
                        )}
                    </>
                )}

                {/* Subtle Member Admin Access Link at bottom */}
                <div className="mt-20 pt-8 border-t border-white/5 flex items-center justify-between text-xs text-slate-600">
                    <span>Vibe Solution Member Portfolio</span>
                    <Link
                        to={`/portfolio/${member.slug}/admin`}
                        className="text-slate-600 hover:text-slate-400 transition-colors flex items-center gap-1"
                    >
                        <span>🔐 Member Admin Portal</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
