export function getProjectStorageKey(username, repoName) {
    return `portfolio_${username}_${repoName}`
}

export function getProjectMeta(username, repoName) {
    if (!username || !repoName) return null
    try {
        const key = getProjectStorageKey(username, repoName)
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : null
    } catch (e) {
        console.error('Error reading project meta from localStorage:', e)
        return null
    }
}

export function saveProjectMeta(username, repoName, meta) {
    if (!username || !repoName) return
    try {
        const key = getProjectStorageKey(username, repoName)
        const current = getProjectMeta(username, repoName) || {}
        const merged = { ...current, ...meta }
        localStorage.setItem(key, JSON.stringify(merged))
        // Dispatch storage event so all components update in real-time
        window.dispatchEvent(new Event('portfolio-storage-updated'))
        return merged
    } catch (e) {
        console.error('Error saving project meta to localStorage:', e)
        return null
    }
}

export function toggleProjectVisibility(username, repoName) {
    const current = getProjectMeta(username, repoName) || {}
    const newHidden = !current.hidden
    return saveProjectMeta(username, repoName, { hidden: newHidden })
}

export function compressAndConvertImage(file, maxWidth = 1000, quality = 0.8) {
    return new Promise((resolve, reject) => {
        if (!file) return reject(new Error('No file provided'))
        if (!file.type.startsWith('image/')) return reject(new Error('File must be an image'))

        const reader = new FileReader()
        reader.onload = (e) => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                let width = img.width
                let height = img.height

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width)
                    width = maxWidth
                }

                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, width, height)

                // Convert to compressed jpeg data URL for reasonable localStorage size
                const dataUrl = canvas.toDataURL('image/jpeg', quality)
                resolve(dataUrl)
            }
            img.onerror = () => reject(new Error('Failed to load image'))
            img.src = e.target.result
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsDataURL(file)
    })
}
