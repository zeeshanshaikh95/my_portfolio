import { useEffect, useState } from 'react'
import { getGithubData } from '../lib/github'
import type { GithubEvent, GithubProfile, GithubRepo } from '../types'

type GithubState = { profile: GithubProfile | null; repos: GithubRepo[]; events: GithubEvent[]; error: boolean; loading: boolean }
const cacheKey = 'sz-github-data-v1'

export function useGithub() {
  const [state, setState] = useState<GithubState>({ profile: null, repos: [], events: [], error: false, loading: true })

  useEffect(() => {
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) {
      try { setState({ ...JSON.parse(cached), loading: false }) } catch { sessionStorage.removeItem(cacheKey) }
    }
    getGithubData()
      .then(({ profile, repos, events }) => {
        const next = { profile, repos, events, error: false }
        sessionStorage.setItem(cacheKey, JSON.stringify(next))
        setState({ ...next, loading: false })
      })
      .catch(() => setState((previous) => ({ ...previous, error: true, loading: false })))
  }, [])

  return state
}
