import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { teamMembers } from '../data/teamData'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import ProjectCard from './portfolio/ProjectCard'
import { getProjectMeta } from '../utils/portfolioStorage'

export default function HomePortfolio() {
    const [selectedSlug, setSelectedSlug] = useState(teamMembers[0].slug)
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('updated')
    const [filterLang, setFilterLang] = useState('all')
    const [storageVersion, setStorageVersion] = useState(0)

    // Listen to real-time storage updates
    useEffect(() => {
        const handleUpdate = () => setStorageVersion((v) => v + 1)
        window.addEventListener('portfolio-storage-updated', handleUpdate)
        return () => window.removeEventListener('portfolio-storage-updated', handleUpdate)
    }, [])

    const selectedMember = useMemo(
        () => teamMembers.find((m) => m.slug === selectedSlug) || teamMembers[0],
        [selectedSlug]
    )

    const { repos, loading, error } = useGitHubRepos(selectedMember.githubUsername)

    // Reset filters when switching members
    const handleSelectMember = (slug) => {
        setSelectedSlug(slug)
        setSearch('')
        setFilterLang('all')
    }

    // Exclude hidden repositories for public homepage view
    const publicRepos = useMemo(() => {
        return repos.filter((r) => {
            const meta = getProjectMeta(selectedMember.githubUsername, r.name)
            return !meta?.hidden
        })
    }, [repos, selectedMember, storageVersion])

    // Unique languages for visible repos
    const languages = useMemo(() => {
        const langs = [...new Set(publicRepos.map((r) => r.language).filter(Boolean))]
        return langs.sort()
    }, [publicRepos])

    // Filtered & sorted repos
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

    return (
        <section id="portfolio" className="py-28 relative bg-[#141414] overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[130px] opacity-20 transition-all duration-700"
                    style={{
                        background: `radial-gradient(circle, ${selectedMember.accent}40, transparent 70%)`,
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400 border border-cyan-400/20 rounded-full px-4 py-1.5 inline-block mb-4">
                        Member Showcase
                    </span>
                    <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
                        Member <span className="gradient-text">Portfolio</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Select any team member to explore their live GitHub projects, tech stacks, and tools.
                    </p>
                </motion.div>

                {/* Member Selector Tabs */}
                <div className="mb-10">
                    <div className="flex flex-wrap justify-center gap-3">
                        {teamMembers.map((member) => {
                            const isSelected = member.slug === selectedMember.slug
                            return (
                                <button
                                    key={member.slug}
                                    onClick={() => handleSelectMember(member.slug)}
                                    className={`group relative flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 text-left cursor-pointer ${
                                        isSelected
                                            ? 'bg-white/10 border-white/30 shadow-lg scale-[1.02]'
                                            : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                                    }`}
                                    style={{
                                        boxShadow: isSelected
                                            ? `0 0 25px ${member.accent}30, inset 0 0 15px ${member.accent}15`
                                            : undefined,
                                        borderColor: isSelected ? member.accent : undefined,
                                    }}
                                >
                                    <div
                                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-lg shadow-sm`}
                                    >
                                        {member.emoji}
                                    </div>
                                    <div>
                                        <div
                                            className={`text-sm font-bold transition-colors ${
                                                isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                                            }`}
                                        >
                                            {member.name}
                                        </div>
                                        <div className="text-[11px] text-slate-400">{member.role}</div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Selected Member Header Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedMember.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="glass rounded-3xl p-6 md:p-8 border border-white/10 mb-8 relative overflow-hidden"
                        style={{
                            boxShadow: `0 0 40px ${selectedMember.accent}15`,
                        }}
                    >
                        <div
                            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${selectedMember.gradient}`}
                        />

                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
                                <div
                                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedMember.gradient} flex items-center justify-center text-4xl shadow-xl flex-shrink-0`}
                                    style={{ boxShadow: `0 0 25px ${selectedMember.accent}40` }}
                                >
                                    {selectedMember.emoji}
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                        <span
                                            className="text-xs font-bold tracking-widest uppercase px-3 py-0.5 rounded-full"
                                            style={{
                                                background: `${selectedMember.accent}20`,
                                                color: selectedMember.accent,
                                                border: `1px solid ${selectedMember.accent}40`,
                                            }}
                                        >
                                            {selectedMember.role}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            @{selectedMember.githubUsername}
                                        </span>
                                    </div>
                                    <h3 className="font-display font-black text-2xl md:text-3xl text-white mb-2">
                                        {selectedMember.name}
                                    </h3>
                                    <p className="text-slate-400 text-sm max-w-xl leading-relaxed mb-4">
                                        {selectedMember.bio}
                                    </p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                                        {selectedMember.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="text-xs px-2.5 py-0.5 rounded-full border border-white/10 text-slate-300"
                                                style={{ background: 'rgba(255,255,255,0.05)' }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Stats & Actions */}
                            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-4 flex-shrink-0">
                                {!loading && !error && (
                                    <div className="grid grid-cols-3 gap-2 text-center w-full">
                                        <div className="glass rounded-xl px-3 py-2 border border-white/10">
                                            <div className="text-lg font-bold text-white">{publicRepos.length}</div>
                                            <div className="text-[10px] text-slate-400 uppercase">Projects</div>
                                        </div>
                                        <div className="glass rounded-xl px-3 py-2 border border-white/10">
                                            <div className="text-lg font-bold text-white">
                                                {publicRepos.reduce((s, r) => s + r.stargazers_count, 0)}
                                            </div>
                                            <div className="text-[10px] text-slate-400 uppercase">Stars</div>
                                        </div>
                                        <div className="glass rounded-xl px-3 py-2 border border-white/10">
                                            <div className="text-lg font-bold text-white">
                                                {publicRepos.reduce((s, r) => s + r.forks_count, 0)}
                                            </div>
                                            <div className="text-[10px] text-slate-400 uppercase">Forks</div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 w-full justify-center md:justify-end">
                                    <Link
                                        to={`/portfolio/${selectedMember.slug}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-md hover:scale-[1.02]"
                                        style={{
                                            background: `linear-gradient(135deg, ${selectedMember.accent}, ${selectedMember.accent}aa)`,
                                            boxShadow: `0 4px 15px ${selectedMember.accent}30`,
                                        }}
                                    >
                                        Full Portfolio
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                    <a
                                        href={selectedMember.socials.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                                        title="GitHub Profile"
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
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
                            placeholder={`Search ${selectedMember.shortName || selectedMember.name}'s projects...`}
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
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div
                            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mb-4"
                            style={{
                                borderColor: `${selectedMember.accent}40`,
                                borderTopColor: 'transparent',
                            }}
                        />
                        <p className="text-slate-400 text-sm">
                            Fetching {selectedMember.shortName || selectedMember.name}'s repositories...
                        </p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-16 glass rounded-2xl border border-red-500/20">
                        <div className="text-3xl mb-3">⚠️</div>
                        <p className="text-red-400 text-sm mb-2">{error}</p>
                    </div>
                )}

                {/* Projects Grid */}
                {!loading && !error && (
                    <>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                            <span>
                                Showing {filteredRepos.length} public {filteredRepos.length === 1 ? 'project' : 'projects'} for{' '}
                                <strong className="text-slate-300">{selectedMember.name}</strong>
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredRepos.map((repo, i) => (
                                <ProjectCard
                                    key={repo.id}
                                    repo={repo}
                                    index={i}
                                    accent={selectedMember.accent}
                                    githubUsername={selectedMember.githubUsername}
                                    isAdmin={false}
                                />
                            ))}
                        </div>

                        {filteredRepos.length === 0 && (
                            <div className="text-center py-16 glass rounded-2xl border border-white/5">
                                <div className="text-3xl mb-3">📁</div>
                                <p className="text-slate-400 text-sm">No public projects match the current filter.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}
