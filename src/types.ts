export interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
  archived: boolean
  fork: boolean
}

export interface GithubProfile {
  avatar_url: string
  public_repos: number
  followers: number
  following: number
}

export interface GithubEvent {
  id: string
  type: string
  repo: { name: string }
  created_at: string
}
