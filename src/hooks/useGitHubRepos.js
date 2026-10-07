import { useState, useEffect } from 'react'

const CACHE_KEY_PREFIX = 'gh_repos_'
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

export function useGitHubRepos(username) {
    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!username) {
            setLoading(false)
            return
        }

        const cacheKey = CACHE_KEY_PREFIX + username
        const cached = sessionStorage.getItem(cacheKey)

        if (cached) {
            try {
                const { data, timestamp } = JSON.parse(cached)
                if (Date.now() - timestamp < CACHE_DURATION) {
                    setRepos(data)
                    setLoading(false)
                    return
                }
            } catch {
                sessionStorage.removeItem(cacheKey)
            }
        }

        let cancelled = false

        async function fetchAllRepos() {
            setLoading(true)
            setError(null)
            const allRepos = []
            let page = 1
            const perPage = 100

            try {
                while (true) {
                    const response = await fetch(
                        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`
                    )

                    if (!response.ok) {
                        if (response.status === 403) {
                            throw new Error('GitHub API rate limit exceeded. Please try again later.')
                        }
                        throw new Error(`Failed to fetch repos: ${response.statusText}`)
                    }

                    const data = await response.json()
                    if (data.length === 0) break

                    allRepos.push(...data)

                    if (data.length < perPage) break
                    page++
                }

                if (!cancelled) {
                    setRepos(allRepos)
                    sessionStorage.setItem(
                        cacheKey,
                        JSON.stringify({ data: allRepos, timestamp: Date.now() })
                    )
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message)
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        fetchAllRepos()

        return () => {
            cancelled = true
        }
    }, [username])

    return { repos, loading, error }
}
