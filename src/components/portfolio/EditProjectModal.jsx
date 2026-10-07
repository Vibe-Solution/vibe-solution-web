import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { compressAndConvertImage } from '../../utils/portfolioStorage'

export default function EditProjectModal({ project, projectMeta, onSave, onClose, accent }) {
    const [description, setDescription] = useState(
        projectMeta?.description !== undefined ? projectMeta.description : (project.description || '')
    )
    const [techInput, setTechInput] = useState('')
    const [toolInput, setToolInput] = useState('')
    const [techStack, setTechStack] = useState(projectMeta?.techStack || [])
    const [tools, setTools] = useState(projectMeta?.tools || [])
    const [imageUrl, setImageUrl] = useState(projectMeta?.imageUrl || '')
    const [hidden, setHidden] = useState(Boolean(projectMeta?.hidden))
    const [imageUploading, setImageUploading] = useState(false)
    const [imageError, setImageError] = useState('')
    const fileInputRef = useRef(null)

    const commitTech = () => {
        if (!techInput.trim()) return
        const items = techInput.split(',').map((s) => s.trim()).filter(Boolean)
        setTechStack((prev) => [...new Set([...prev, ...items])])
        setTechInput('')
    }

    const commitTools = () => {
        if (!toolInput.trim()) return
        const items = toolInput.split(',').map((s) => s.trim()).filter(Boolean)
        setTools((prev) => [...new Set([...prev, ...items])])
        setToolInput('')
    }

    const handleAddTechKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            commitTech()
        }
    }

    const handleAddToolKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            commitTools()
        }
    }

    const removeTech = (item) => setTechStack((prev) => prev.filter((t) => t !== item))
    const removeTool = (item) => setTools((prev) => prev.filter((t) => t !== item))

    const handleImageFileChange = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setImageError('')
        setImageUploading(true)
        try {
            const dataUrl = await compressAndConvertImage(file, 900, 0.75)
            setImageUrl(dataUrl)
        } catch (err) {
            setImageError(err.message || 'Failed to process image')
        } finally {
            setImageUploading(false)
        }
    }

    const handleRemoveImage = () => {
        setImageUrl('')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleSave = () => {
        let finalTechStack = [...techStack]
        if (techInput.trim()) {
            const extra = techInput.split(',').map((s) => s.trim()).filter(Boolean)
            finalTechStack = [...new Set([...finalTechStack, ...extra])]
        }

        let finalTools = [...tools]
        if (toolInput.trim()) {
            const extra = toolInput.split(',').map((s) => s.trim()).filter(Boolean)
            finalTools = [...new Set([...finalTools, ...extra])]
        }

        onSave({
            description: description.trim(),
            techStack: finalTechStack,
            tools: finalTools,
            imageUrl: imageUrl || '',
            hidden,
        })
    }

    const handleResetToDefault = () => {
        setDescription(project.description || '')
        setTechStack([])
        setTools([])
        setImageUrl('')
        setHidden(false)
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md" />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-xl my-8 rounded-2xl border border-white/10 overflow-hidden z-10"
                    style={{
                        background: 'rgba(18, 18, 18, 0.98)',
                        boxShadow: `0 0 60px ${accent}25, 0 25px 50px rgba(0,0,0,0.7)`,
                    }}
                >
                    {/* Top Accent Line */}
                    <div
                        className="h-1.5 w-full"
                        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}60)` }}
                    />

                    <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-bold text-white truncate max-w-sm">
                                        {project.name}
                                    </h3>
                                    {hidden && (
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                            Hidden
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-400 mt-1">
                                    Manage visibility, screenshots, description, tech stack & tools
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                                aria-label="Close"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Visibility Setting: Show or Hide from Public */}
                        <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                            <div>
                                <div className="text-sm font-semibold text-white flex items-center gap-2">
                                    {hidden ? (
                                        <span className="text-rose-400">🔒 Hidden from Public Portfolio</span>
                                    ) : (
                                        <span className="text-emerald-400">👁️ Visible on Public Portfolio</span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {hidden
                                        ? 'Only visible to you here in Admin Mode. Public visitors cannot see it.'
                                        : 'Visible to everyone on the homepage and your public portfolio.'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setHidden(!hidden)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    hidden
                                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                                }`}
                            >
                                {hidden ? 'Unhide Repo' : 'Hide Repo'}
                            </button>
                        </div>

                        {/* Upload Image / Screenshot Section */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Project Screenshot / Cover Image
                            </label>

                            {imageUrl ? (
                                <div className="relative rounded-xl overflow-hidden border border-white/15 group mb-3">
                                    <img
                                        src={imageUrl}
                                        alt={project.name}
                                        className="w-full h-44 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
                                        >
                                            Change Image
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="px-3 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-white/15 rounded-xl p-6 text-center cursor-pointer hover:border-white/30 hover:bg-white/[0.02] transition-all"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/5 mx-auto flex items-center justify-center text-slate-400 mb-2">
                                        📷
                                    </div>
                                    <div className="text-sm font-semibold text-slate-300">
                                        {imageUploading ? 'Processing Image...' : 'Click to Upload Project Screenshot'}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        PNG, JPG, or WebP. Auto-compressed for performance.
                                    </p>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageFileChange}
                                className="hidden"
                            />
                            {imageError && (
                                <p className="text-xs text-rose-400 mt-1.5">{imageError}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Custom Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe what this project does, key innovations, solutions provided..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-white/30 resize-none transition-colors"
                            />
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Tech Stack Tags
                            </label>
                            {techStack.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-2.5">
                                    {techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                                            style={{
                                                background: `${accent}20`,
                                                color: accent,
                                                border: `1px solid ${accent}40`,
                                            }}
                                        >
                                            {tech}
                                            <button
                                                type="button"
                                                onClick={() => removeTech(tech)}
                                                className="hover:opacity-75 font-bold cursor-pointer"
                                                title="Remove"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={techInput}
                                    onChange={(e) => setTechInput(e.target.value)}
                                    onKeyDown={handleAddTechKeyDown}
                                    placeholder="Add tech (e.g. React, FastApi, Docker) & press Enter"
                                    className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-white/30 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={commitTech}
                                    className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>

                        {/* Tools */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Tools & Platforms
                            </label>
                            {tools.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-2.5">
                                    {tools.map((tool) => (
                                        <span
                                            key={tool}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/10"
                                        >
                                            {tool}
                                            <button
                                                type="button"
                                                onClick={() => removeTool(tool)}
                                                className="hover:opacity-75 font-bold cursor-pointer"
                                                title="Remove"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={toolInput}
                                    onChange={(e) => setToolInput(e.target.value)}
                                    onKeyDown={handleAddToolKeyDown}
                                    placeholder="Add tools (e.g. VS Code, Figma, Postman, Git)"
                                    className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-white/30 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={commitTools}
                                    className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <button
                                type="button"
                                onClick={handleResetToDefault}
                                className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                            >
                                Reset to Default
                            </button>
                            <div className="flex gap-2.5">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-xl border border-white/10 text-slate-400 text-xs font-medium hover:text-white hover:border-white/20 transition-all cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSave}
                                    className="px-6 py-2.5 rounded-xl text-white text-xs font-bold transition-all cursor-pointer shadow-lg"
                                    style={{
                                        background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                                        boxShadow: `0 4px 15px ${accent}40`,
                                    }}
                                >
                                    Save Changes
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
