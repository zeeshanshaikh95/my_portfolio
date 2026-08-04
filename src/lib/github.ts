import type { GithubEvent, GithubProfile, GithubRepo } from '../types'

const username = import.meta.env.VITE_GITHUB_USERNAME || 'zeeshanshaikh95'
const baseUrl = `https://api.github.com/users/${username}`
const headers = { Accept: 'application/vnd.github+json' }

async function getJson<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${baseUrl}${endpoint}`, { headers })
  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`)
  return response.json() as Promise<T>
}

export async function getGithubData() {
  const [profile, repos, events] = await Promise.all([
    getJson<GithubProfile>(''),
    getJson<GithubRepo[]>('/repos?per_page=100&sort=updated'),
    getJson<GithubEvent[]>('/events/public?per_page=12'),
  ])

  return {
    profile,
    repos: repos.filter((repo) => !repo.fork && !repo.archived),
    events,
  }
}
