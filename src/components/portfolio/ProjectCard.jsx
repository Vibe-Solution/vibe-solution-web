import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import EditProjectModal from './EditProjectModal'
import {
    getProjectMeta,
    saveProjectMeta,
    toggleProjectVisibility,
} from '../../utils/portfolioStorage'

// Language color map for GitHub-style badges
const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    Vue: '#41b883',
    Svelte: '#ff3e00',
    Jupyter: '#DA5B0B',
}

export default function ProjectCard({
    repo,
    index,
    accent,
    githubUsername,
    isAdmin = false,
}) {
    const [showModal, setShowModal] = useState(false)
    const [meta, setMeta] = useState(() => getProjectMeta(githubUsername, repo.name))

    // Real-time synchronization if changed in another modal/tab
    useEffect(() => {
        const handleStorageUpdate = () => {
            setMeta(getProjectMeta(githubUsername, repo.name))
        }
        window.addEventListener('portfolio-storage-updated', handleStorageUpdate)
        return () => window.removeEventListener('portfolio-storage-updated', handleStorageUpdate)
    }, [githubUsername, repo.name])

    // If repo is hidden and not in admin mode, do not display it to public visitors!
    if (!isAdmin && meta?.hidden) {
        return null
    }

    const handleSave = (newMeta) => {
        saveProjectMeta(githubUsername, repo.name, newMeta)
        setMeta(newMeta)
        setShowModal(false)
    }

    const handleToggleVisibility = (e) => {
        e.stopPropagation()
        const updated = toggleProjectVisibility(githubUsername, repo.name)
        setMeta(updated)
    }

    const langColor = languageColors[repo.language] || '#8b8b8b'
    const displayDescription = meta?.description || repo.description || 'No description provided yet.'
    const updatedAt = new Date(repo.updated_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    const isHidden = Boolean(meta?.hidden)

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.5) }}
                className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                    isHidden
                        ? 'border-rose-500/30 bg-rose-950/10 opacity-75 hover:opacity-100'
                        : 'border-white/10 hover:border-white/25'
                }`}
                style={{
                    background: isHidden ? 'rgba(30, 10, 15, 0.4)' : 'rgba(255,255,255,0.03)',
                    boxShadow: isHidden
                        ? '0 4px 20px rgba(225, 29, 72, 0.1)'
                        : '0 4px 25px rgba(0,0,0,0.35)',
                }}
            >
                {/* Top Accent Line */}
                <div
                    className="h-1 w-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{
                        background: isHidden
                            ? 'linear-gradient(90deg, #f43f5e, #fb7185)'
                            : `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                    }}
                />

                {/* Admin Status Pill (Only in Admin Mode) */}
                {isAdmin && (
                    <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between">
                        <span
                            className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                                isHidden ? 'text-rose-400' : 'text-emerald-400'
                            }`}
                        >
                            <span
                                className={`w-2 h-2 rounded-full ${
                                    isHidden ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'
                                }`}
                            />
                            {isHidden ? 'Hidden from Public' : 'Visible on Public Page'}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleToggleVisibility}
                                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border transition-colors cursor-pointer ${
                                    isHidden
                                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                                }`}
                                title={isHidden ? 'Click to show on public portfolio' : 'Click to hide from public portfolio'}
                            >
                                {isHidden ? 'Unhide' : 'Hide'}
                            </button>
                            <button
                                onClick={() => setShowModal(true)}
                                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
                                title="Edit project details"
                            >
                                ✏️ Edit
                            </button>
                        </div>
                    </div>
                )}

                {/* Project Screenshot / Cover Image if uploaded */}
                {meta?.imageUrl && (
                    <div className="relative h-44 w-full overflow-hidden bg-black/50 border-b border-white/10">
                        <img
                            src={meta.imageUrl}
                            alt={repo.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
                    </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        {/* Title and Repo Link */}
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                            <div className="flex-1 min-w-0">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base font-bold text-white hover:underline truncate block transition-colors"
                                    style={{ color: accent }}
                                >
                                    {repo.name}
                                </a>
                                {repo.fork && (
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                                        Forked Repository
                                    </span>
                                )}
                            </div>

                            {/* Public External GitHub Link */}
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/25 transition-colors flex-shrink-0"
                                title="View on GitHub"
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </a>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
                            {displayDescription}
                        </p>

                        {/* Tech Stack tags */}
                        {meta?.techStack?.length > 0 && (
                            <div className="mb-3">
                                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold block mb-1.5">
                                    Tech Stack
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {meta.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[11px] px-2.5 py-0.5 rounded-full font-medium"
                                            style={{
                                                background: `${accent}15`,
                                                color: accent,
                                                border: `1px solid ${accent}30`,
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tools tags */}
                        {meta?.tools?.length > 0 && (
                            <div className="mb-4">
                                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold block mb-1.5">
                                    Tools
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {meta.tools.map((tool) => (
                                        <span
                                            key={tool}
                                            className="text-[11px] px-2.5 py-0.5 rounded-full font-medium bg-white/5 text-slate-300 border border-white/10"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer: language, stats, updated */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-white/5 mt-auto">
                        <div className="flex items-center gap-3">
                            {repo.language && (
                                <span className="flex items-center gap-1.5">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full inline-block"
                                        style={{ backgroundColor: langColor }}
                                    />
                                    {repo.language}
                                </span>
                            )}
                            <span className="flex items-center gap-1" title="Stars">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1" title="Forks">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="18" r="3" />
                                    <circle cx="6" cy="6" r="3" />
                                    <circle cx="18" cy="6" r="3" />
                                    <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
                                    <path d="M12 12v3" />
                                </svg>
                                {repo.forks_count}
                            </span>
                        </div>
                        <span>{updatedAt}</span>
                    </div>
                </div>
            </motion.div>

            {/* Edit Modal (Available when triggered by admin) */}
            {showModal && (
                <EditProjectModal
                    project={repo}
                    projectMeta={meta}
                    onSave={handleSave}
                    onClose={() => setShowModal(false)}
                    accent={accent}
                />
            )}
        </>
    )
}
