import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { teamMembers } from '../../data/teamData'
import { useGitHubRepos } from '../../hooks/useGitHubRepos'
import ProjectCard from './ProjectCard'
import { getProjectMeta } from '../../utils/portfolioStorage'
import vibeLogo from '../../assets/vibe-logo.jpg'

export default function MemberPortfolioAdmin() {
    const { slug } = useParams()
    const member = teamMembers.find((m) => m.slug === slug)
    const { repos, loading, error } = useGitHubRepos(member?.githubUsername)

    const sessionKey = `vibe_admin_${slug}`
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem(sessionKey) === 'true'
    })
    const [passwordInput, setPasswordInput] = useState('')
    const [loginError, setLoginError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('updated')
    const [visibilityFilter, setVisibilityFilter] = useState('all') // 'all' | 'visible' | 'hidden'
    const [filterLang, setFilterLang] = useState('all')

    const handleLogin = (e) => {
        e.preventDefault()
        setLoginError('')
        if (!member) return

        const entered = passwordInput.trim().toLowerCase()
        const expected = member.adminPassword.toLowerCase()

        if (entered === expected) {
            sessionStorage.setItem(sessionKey, 'true')
            setIsAuthenticated(true)
            setPasswordInput('')
        } else {
            setLoginError('Invalid password. Access restricted to authorized team member.')
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem(sessionKey)
        setIsAuthenticated(false)
    }

    // Languages list
    const languages = useMemo(() => {
        const langs = [...new Set(repos.map((r) => r.language).filter(Boolean))]
        return langs.sort()
    }, [repos])

    // Filter & sort
    const filteredRepos = useMemo(() => {
        let result = [...repos]

        // Search filter
        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(
                (r) =>
                    r.name.toLowerCase().includes(q) ||
                    (r.description && r.description.toLowerCase().includes(q))
            )
        }

        // Language filter
        if (filterLang !== 'all') {
            result = result.filter((r) => r.language === filterLang)
        }

        // Visibility filter
        if (visibilityFilter !== 'all') {
            result = result.filter((r) => {
                const meta = getProjectMeta(member?.githubUsername, r.name)
                const isHidden = Boolean(meta?.hidden)
                return visibilityFilter === 'hidden' ? isHidden : !isHidden
            })
        }

        // Sort
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
    }, [repos, search, sortBy, filterLang, visibilityFilter, member?.githubUsername])

    if (!member) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center p-6">
                <div className="text-center glass p-8 rounded-2xl border border-white/10 max-w-md">
                    <h1 className="text-2xl font-bold text-white mb-3">Member Not Found</h1>
                    <p className="text-slate-400 text-sm mb-6">
                        No team member found with the slug &ldquo;{slug}&rdquo;.
                    </p>
                    <Link to="/portfolio" className="text-cyan-400 hover:underline text-sm font-semibold">
                        ← Back to Team Portfolios
                    </Link>
                </div>
            </div>
        )
    }

    // Password Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#101010] flex items-center justify-center p-6 relative overflow-hidden">
                {/* Glow Backdrop */}
                <div
                    className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none"
                    style={{ background: member.accent }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md glass rounded-3xl p-8 border border-white/10 relative z-10"
                    style={{
                        boxShadow: `0 0 50px ${member.accent}20, 0 20px 40px rgba(0,0,0,0.8)`,
                    }}
                >
                    {/* Top Accent */}
                    <div
                        className={`h-1 w-24 mx-auto rounded-full bg-gradient-to-r ${member.gradient} mb-6`}
                    />

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="relative inline-block mb-4">
                            <div
                                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-4xl shadow-xl mx-auto`}
                                style={{ boxShadow: `0 0 30px ${member.accent}40` }}
                            >
                                {member.emoji}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#141414] border border-white/20 flex items-center justify-center text-xs">
                                🔐
                            </div>
                        </div>

                        <h2 className="font-display font-black text-2xl text-white mb-1">
                            {member.name}
                        </h2>
                        <span
                            className="text-[11px] font-bold tracking-widest uppercase px-3 py-0.5 rounded-full inline-block mb-3"
                            style={{
                                background: `${member.accent}20`,
                                color: member.accent,
                                border: `1px solid ${member.accent}40`,
                            }}
                        >
                            Member Admin Portal
                        </span>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            Authorized portal for editing descriptions, tech stack tags, screenshots, and repo visibility.
                        </p>
                    </div>

                    {/* Password Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                                Member Authorization Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    placeholder="Enter authorization password"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-white/30 transition-all pr-12"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-2 py-1 cursor-pointer"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {loginError && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs"
                            >
                                {loginError}
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all shadow-lg cursor-pointer"
                            style={{
                                background: `linear-gradient(135deg, ${member.accent}, ${member.accent}bb)`,
                                boxShadow: `0 4px 20px ${member.accent}40`,
                            }}
                        >
                            Unlock Admin Panel
                        </motion.button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <Link
                            to={`/portfolio/${member.slug}`}
                            className="text-xs text-slate-400 hover:text-white transition-colors"
                        >
                            ← Return to Public Portfolio
                        </Link>
                    </div>
                </motion.div>
            </div>
        )
    }

    // Authenticated Admin Dashboard
    const totalRepos = repos.length
    const hiddenCount = repos.filter((r) => {
        const meta = getProjectMeta(member.githubUsername, r.name)
        return Boolean(meta?.hidden)
    }).length
    const visibleCount = totalRepos - hiddenCount

    return (
        <div className="min-h-screen bg-[#101010] text-slate-200">
            {/* Top Admin Sticky Notification Bar */}
            <div className="sticky top-0 z-40 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-white/10 px-6 py-3">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <img src={vibeLogo} alt="Vibe Solution" className="w-7 h-7 rounded-lg object-cover" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            Admin Mode &bull; {member.name}
                        </span>
                        <span className="text-xs text-slate-500 hidden md:inline">
                            | URL: vibesolution.tech/portfolio/{member.slug}/admin
                        </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link
                            to="/"
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                        >
                            🏠 Main Site
                        </Link>
                        <Link
                            to={`/portfolio/${member.slug}`}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 transition-colors"
                        >
                            👁️ View Public Page
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer"
                        >
                            🔒 Lock & Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Dashboard Header Card */}
                <div
                    className="glass rounded-3xl p-6 md:p-8 border border-white/10 mb-8 relative overflow-hidden"
                    style={{
                        boxShadow: `0 0 40px ${member.accent}15`,
                    }}
                >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div
                                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-4xl shadow-xl flex-shrink-0`}
                                style={{ boxShadow: `0 0 30px ${member.accent}30` }}
                            >
                                {member.emoji}
                            </div>
                            <div>
                                <span
                                    className="text-[10px] font-bold tracking-widest uppercase px-3 py-0.5 rounded-full inline-block mb-1.5"
                                    style={{
                                        background: `${member.accent}20`,
                                        color: member.accent,
                                        border: `1px solid ${member.accent}40`,
                                    }}
                                >
                                    Project Management Dashboard
                                </span>
                                <h1 className="font-display font-black text-3xl text-white">
                                    {member.name}
                                </h1>
                                <p className="text-slate-400 text-xs mt-1">
                                    Click <strong>Hide / Unhide</strong> to control what public visitors can see. Click <strong>✏️ Edit</strong> to add custom screenshots, descriptions, tech stacks, and tools.
                                </p>
                            </div>
                        </div>

                        {/* Quick Counters */}
                        <div className="flex flex-wrap gap-3">
                            <div className="glass px-4 py-3 rounded-2xl border border-white/10 text-center min-w-[90px]">
                                <div className="text-xl font-black text-white">{totalRepos}</div>
                                <div className="text-[10px] uppercase text-slate-400 font-semibold">Total Repos</div>
                            </div>
                            <div className="glass px-4 py-3 rounded-2xl border border-emerald-500/30 text-center min-w-[90px] bg-emerald-950/10">
                                <div className="text-xl font-black text-emerald-400">{visibleCount}</div>
                                <div className="text-[10px] uppercase text-emerald-300 font-semibold">Public Visible</div>
                            </div>
                            <div className="glass px-4 py-3 rounded-2xl border border-rose-500/30 text-center min-w-[90px] bg-rose-950/10">
                                <div className="text-xl font-black text-rose-400">{hiddenCount}</div>
                                <div className="text-[10px] uppercase text-rose-300 font-semibold">Hidden Repos</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter and Control Bar */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    {/* Search */}
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
                            placeholder="Filter your repositories by name or description..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-white/20 transition-colors"
                        />
                    </div>

                    {/* Visibility Filter Tabs */}
                    <div className="flex rounded-xl bg-white/5 p-1 border border-white/10">
                        <button
                            onClick={() => setVisibilityFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                visibilityFilter === 'all'
                                    ? 'bg-white/15 text-white'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            All ({totalRepos})
                        </button>
                        <button
                            onClick={() => setVisibilityFilter('visible')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                visibilityFilter === 'visible'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Visible ({visibleCount})
                        </button>
                        <button
                            onClick={() => setVisibilityFilter('hidden')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                visibilityFilter === 'hidden'
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Hidden ({hiddenCount})
                        </button>
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm focus:outline-none focus:border-white/20 cursor-pointer"
                    >
                        <option value="updated">Recently Updated</option>
                        <option value="stars">Most Stars</option>
                        <option value="name">Alphabetical</option>
                    </select>

                    {/* Language Filter */}
                    <select
                        value={filterLang}
                        onChange={(e) => setFilterLang(e.target.value)}
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm focus:outline-none focus:border-white/20 cursor-pointer"
                    >
                        <option value="all">All Languages</option>
                        {languages.map((l) => (
                            <option key={l} value={l}>
                                {l}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Loading / Error / Content */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div
                            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mb-4"
                            style={{ borderColor: `${member.accent}40`, borderTopColor: 'transparent' }}
                        />
                        <p className="text-slate-400 text-sm">Fetching all GitHub repositories...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-16 glass rounded-2xl border border-red-500/20">
                        <div className="text-3xl mb-3">⚠️</div>
                        <p className="text-red-400 text-sm mb-2">{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredRepos.map((repo, i) => (
                                <ProjectCard
                                    key={repo.id}
                                    repo={repo}
                                    index={i}
                                    accent={member.accent}
                                    githubUsername={member.githubUsername}
                                    isAdmin={true}
                                />
                            ))}
                        </div>

                        {filteredRepos.length === 0 && (
                            <div className="text-center py-16 glass rounded-2xl border border-white/5 mt-6">
                                <div className="text-3xl mb-2">🔍</div>
                                <p className="text-slate-400 text-sm">No repositories found matching your filter.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
