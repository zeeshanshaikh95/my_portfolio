import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FormEvent, MouseEvent, useEffect, useMemo, useState } from 'react'
import {
  FiArrowDownRight, FiArrowUpRight, FiCheck, FiChevronUp, FiClipboard, FiCode,
  FiCommand, FiCopy, FiDownload, FiExternalLink, FiGitBranch, FiGithub, FiGlobe, FiLayers,
  FiLinkedin, FiMail, FiMapPin, FiMenu, FiSearch, FiSend, FiStar, FiTerminal,
  FiX, FiZap,
} from 'react-icons/fi'
import { useGithub } from './hooks/useGithub'
import type { GithubRepo } from './types'

const githubUrl = 'https://github.com/zeeshanshaikh95'
const email = 'shaikhzeeshan9511@gmail.com'

const navItems = [
  ['Home', 'home'], ['About', 'about'], ['Projects', 'projects'], ['Skills', 'skills'],
  ['Experience', 'experience'], ['GitHub', 'github'], ['Contact', 'contact'],
] as const

const skillGroups = [
  { label: 'Frontend', number: '01', items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { label: 'Backend', number: '02', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication'] },
  { label: 'Tools & Cloud', number: '03', items: ['Git', 'GitHub', 'Postman', 'Vercel', 'Render', 'Railway'] },
  { label: 'In Progress', number: '04', items: ['TypeScript', 'DSA', 'System Design', 'JWT', 'Scalable APIs'] },
]

const services = [
  ['01', 'Frontend systems', 'Responsive React interfaces that feel quick, clear, and unmistakably yours.'],
  ['02', 'Full stack apps', 'MERN applications designed around dependable APIs and usable product flows.'],
  ['03', 'High-conviction sites', 'Landing pages and portfolios that make an excellent first impression.'],
  ['04', 'Backend foundations', 'REST APIs, authentication, and data models built to grow with the product.'],
]

const work = [
  ['Now', 'Open to the right team', 'Actively pursuing full-time engineering roles, frontend roles, MERN roles, and internships.'],
  ['2025 - now', 'Independent builder', 'Shipping personal MERN projects, refining frontend craft, and turning ideas into working software.'],
  ['Ongoing', 'Deliberate learner', 'Deepening React, Node.js, backend design, and data structures through consistent practice.'],
  ['Always', 'Community minded', 'Exploring open source, hackathons, and opportunities to build useful things with thoughtful people.'],
]

const doingNow = [
  ['React patterns', 'Building interfaces with better structure, state, and motion.'],
  ['Node foundations', 'Exploring reliable APIs and backend systems that scale.'],
  ['MERN projects', 'Shipping end-to-end work, one practical problem at a time.'],
  ['DSA practice', 'Strengthening the problem-solving muscle every day.'],
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function MagneticLink({ children, className = '', href, onClick }: { children: React.ReactNode; className?: string; href?: string; onClick?: () => void }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    setPosition({ x: (event.clientX - box.left - box.width / 2) * 0.12, y: (event.clientY - box.top - box.height / 2) * 0.12 })
  }
  const common = { onMouseMove: handleMove, onMouseLeave: () => setPosition({ x: 0, y: 0 }), style: { transform: `translate(${position.x}px, ${position.y}px)` }, className: `magnetic ${className}` }
  if (href?.startsWith('#')) return <a {...common} href={href} onClick={(e) => { e.preventDefault(); scrollTo(href.slice(1)); }}>{children}</a>
  return <a {...common} href={href} onClick={onClick}>{children}</a>
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55 }} className="section-heading">
    <div className="eyebrow"><span /> {eyebrow}</div>
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </motion.div>
}

function Cursor() {
  const [point, setPoint] = useState({ x: -100, y: -100 })
  useEffect(() => {
    const move = (event: PointerEvent) => setPoint({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return <div className="cursor-glow" style={{ left: point.x, top: point.y }} aria-hidden="true" />
}

function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  useEffect(() => { const timer = window.setTimeout(() => setVisible(false), 1050); return () => window.clearTimeout(timer) }, [])
  return <AnimatePresence>{visible && <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45 }}><div className="loader-mark">SZ</div><p>Preparing a better first impression.</p><i /></motion.div>}</AnimatePresence>
}

function CommandPalette({ open, close }: { open: boolean; close: () => void }) {
  const commands = [...navItems.map(([label, id]) => ({ label: `Go to ${label}`, action: () => { scrollTo(id); close() } })), { label: 'Open GitHub profile', action: () => { window.open(githubUrl, '_blank', 'noopener'); close() } }, { label: 'Email Zeeshan', action: () => { window.location.href = `mailto:${email}`; close() } }]
  const [query, setQuery] = useState('')
  useEffect(() => { if (!open) setQuery('') }, [open])
  return <AnimatePresence>{open && <motion.div className="command-layer" onMouseDown={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.div className="command-modal" onMouseDown={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.96, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}>
      <div className="command-input"><FiSearch /><input autoFocus placeholder="Type a command..." value={query} onChange={(e) => setQuery(e.target.value)} /><kbd>ESC</kbd></div>
      <div className="command-list">{commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase())).map((command) => <button key={command.label} onClick={command.action}>{command.label}<FiArrowUpRight /></button>)}</div>
    </motion.div>
  </motion.div>}</AnimatePresence>
}

function ProjectCard({ repo }: { repo: GithubRepo }) {
  const formattedDate = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(repo.updated_at))
  return <motion.article layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -7 }} className="project-card">
    <div className="project-top"><div className="project-icon"><FiCode /></div><div className="project-links"><a href={repo.html_url} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name} source`}><FiGithub /></a>{repo.homepage && <a href={repo.homepage} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name} demo`}><FiExternalLink /></a>}</div></div>
    <h3>{repo.name.replace(/[-_]/g, ' ')}</h3>
    <p>{repo.description || 'An open source project by Shaikh Zeeshan. Explore the repository for implementation details.'}</p>
    <div className="topics">{repo.topics.slice(0, 3).map((topic) => <span key={topic}>{topic}</span>)}</div>
    <div className="project-meta"><span className="language"><i />{repo.language || 'Code'}</span><span><FiStar /> {repo.stargazers_count}</span><time>Updated {formattedDate}</time></div>
  </motion.article>
}

function Terminal() {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<string[]>(['Type "help" to see available commands.'])
  const execute = (event: FormEvent) => {
    event.preventDefault()
    const command = input.trim().toLowerCase()
    if (!command) return
    const replies: Record<string, string> = {
      whoami: 'Shaikh Zeeshan - full stack MERN developer, Mumbai.',
      skills: 'React, JavaScript, Node.js, Express, MongoDB, REST APIs, Git.',
      projects: 'Live projects are loaded from github.com/zeeshanshaikh95.',
      resume: 'Download it from the navigation or use the hero CTA.',
      contact: `Write to ${email} or use the contact form below.`,
      help: 'Commands: whoami, skills, projects, resume, contact, clear',
      clear: '',
    }
    setLines(command === 'clear' ? [] : (previous) => [...previous, `$ ${command}`, replies[command] || `Command not found: ${command}. Try help.`])
    setInput('')
  }
  return <div className="terminal-shell"><div className="terminal-top"><div><span className="red" /><span className="yellow" /><span className="green" /></div><span>zeeshan@portfolio:~</span></div><div className="terminal-body">{lines.map((line, index) => <p key={`${line}-${index}`} className={line.startsWith('$') ? 'terminal-command' : ''}>{line || '\u00a0'}</p>)}<form onSubmit={execute}><span>$</span><input value={input} onChange={(e) => setInput(e.target.value)} aria-label="Terminal command" autoComplete="off" /><b /></form></div></div>
}

function App() {
  const reduceMotion = useReducedMotion()
  const { profile, repos, events, loading, error } = useGithub()
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [scroll, setScroll] = useState(0)
  const [roleIndex, setRoleIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('All')
  const [sort, setSort] = useState('featured')
  const [copied, setCopied] = useState(false)
  const roles = ['Software Engineer.', 'MERN Stack Developer.', 'Frontend Developer.', 'Freelancer.']

  useEffect(() => {
    const onScroll = () => setScroll((window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)) * 100)
    const onKey = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setPaletteOpen(true) }; if (event.key === 'Escape') setPaletteOpen(false) }
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('keydown', onKey); onScroll()
    const roleTimer = window.setInterval(() => setRoleIndex((previous) => (previous + 1) % roles.length), 2600)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); window.clearInterval(roleTimer) }
  }, [roles.length])

  const languages = useMemo(() => ['All', ...Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean) as string[])).sort()], [repos])
  const visibleRepos = useMemo(() => repos.filter((repo) => (language === 'All' || repo.language === language) && `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'stars' ? b.stargazers_count - a.stargazers_count : sort === 'updated' ? +new Date(b.updated_at) - +new Date(a.updated_at) : b.stargazers_count - a.stargazers_count), [repos, language, query, sort])
  const starTotal = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const languageLeaders = useMemo(() => Object.entries(repos.reduce<Record<string, number>>((sum, repo) => { if (repo.language) sum[repo.language] = (sum[repo.language] || 0) + 1; return sum }, {})).sort((a, b) => b[1] - a[1]).slice(0, 4), [repos])
  const copyEmail = async () => { try { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1800) } catch { window.location.href = `mailto:${email}` } }

  return <>
    <LoadingScreen /><Cursor /><CommandPalette open={paletteOpen} close={() => setPaletteOpen(false)} />
    <div className="noise" /><div className="scroll-progress" style={{ transform: `scaleX(${scroll / 100})` }} />
    <header className="navbar"><a className="brand" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home') }}>SZ<span>.</span></a><nav>{navItems.map(([label, id]) => <a href={`#${id}`} key={id} onClick={(e) => { e.preventDefault(); scrollTo(id) }}>{label}</a>)}</nav><div className="nav-actions"><button className="command-button" onClick={() => setPaletteOpen(true)} aria-label="Open command menu"><FiCommand /><span>Menu</span><kbd>Ctrl K</kbd></button><a href="/Shaikh-Zeeshan-Resume.pdf" className="resume-link" download><FiDownload /> Resume</a><button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <FiX /> : <FiMenu />}</button></div></header>
    <AnimatePresence>{menuOpen && <motion.nav className="mobile-menu" initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); setMenuOpen(false) }}>{label}</a>)}<a href="/Shaikh-Zeeshan-Resume.pdf" download>Download resume</a></motion.nav>}</AnimatePresence>

    <main>
      <section id="home" className="hero section-wrap">
        <div className="hero-aurora aurora-one" /><div className="hero-aurora aurora-two" /><div className="hero-grid" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7 }}>
          <div className="availability"><span className="pulse" /> Available for new opportunities</div>
          <p className="hero-kicker">Hello, I&apos;m</p><h1>Shaikh<br /><em>Zeeshan.</em></h1>
          <div className="role-line"><span>I&apos;m a</span><AnimatePresence mode="wait"><motion.strong key={roles[roleIndex]} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>{roles[roleIndex]}</motion.strong></AnimatePresence></div>
          <p className="hero-copy">I build refined, scalable web applications with the MERN stack - where clean engineering meets a sharp eye for the details that matter.</p>
          <div className="hero-buttons"><MagneticLink href="#projects" className="button primary">Explore my work <FiArrowDownRight /></MagneticLink><MagneticLink href="#contact" className="button secondary">Let&apos;s talk <FiSend /></MagneticLink></div>
          <div className="hero-socials"><a href={githubUrl} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}><FiMail /> Email</a><span><FiMapPin /> Mumbai, IN</span></div>
        </motion.div>
        <motion.div className="hero-showcase" initial={{ opacity: 0, scale: 0.94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.9, duration: 0.9, type: 'spring' }}>
          <div className="code-tag tag-react">&lt;React /&gt;</div><div className="code-tag tag-node">node.js</div>
          <div className="laptop"><div className="laptop-camera" /><div className="laptop-screen"><div className="screen-bar"><span /><span /><span /><b>portfolio.tsx</b></div><div className="editor"><p><i>01</i><span className="pink">const</span> developer = {'{'}</p><p><i>02</i>&nbsp; name: <span className="green">&quot;Zeeshan&quot;</span>,</p><p><i>03</i>&nbsp; focus: <span className="green">&quot;crafting the web&quot;</span>,</p><p><i>04</i>&nbsp; status: <span className="violet">openToWork</span>,</p><p><i>05</i>{'}'};</p><p><i>06</i>&nbsp;</p><p><i>07</i><span className="blue">export default</span> developer<span className="pink">;</span></p></div><div className="screen-status"><span><i /> connected</span><span>TypeScript</span></div></div><div className="laptop-base" /></div>
          <div className="floating-stat"><span className="stat-spark">✦</span><div><b>Building every day</b><small>idea to interface</small></div></div>
        </motion.div>
        <a href="#about" className="scroll-cue" onClick={(e) => { e.preventDefault(); scrollTo('about') }}><span /> Scroll to discover</a>
      </section>

      <section id="about" className="section section-wrap about"><div className="about-orbit" /><SectionHeading eyebrow="A little more context" title="Engineering with intent, learning with momentum." /><div className="about-grid"><motion.div className="about-statement glass-card" initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><p className="quote-mark">“</p><p>I&apos;m a passionate developer who enjoys the whole arc of making software - from an honest problem to a polished, working solution.</p><div className="about-sign"><span>SZ</span><div><b>Shaikh Zeeshan</b><small>Full Stack MERN Developer</small></div></div></motion.div><div className="about-copy"><p>Based in Mumbai, I&apos;m focused on building real projects daily while developing a stronger foundation in React, Node.js, and scalable backend systems.</p><p>My sweet spot is the intersection of <b>clean UI</b>, thoughtful frontend engineering, dependable APIs, and the habit of solving real-world problems one careful step at a time.</p><div className="interest-list">{['Full Stack Development', 'Frontend Engineering', 'Backend APIs', 'Performance-minded UI'].map((item) => <span key={item}><FiCheck />{item}</span>)}</div></div></div></section>

      <section id="skills" className="section section-wrap"><SectionHeading eyebrow="My toolbox" title="A pragmatic stack for useful products." copy="Tools I use, concepts I am sharpening, and the parts of the web I enjoy building most." /><div className="skills-grid">{skillGroups.map((group, index) => <motion.article key={group.label} className="skill-card glass-card" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ y: -6 }}><div><span className="skill-number">{group.number}</span><FiLayers /></div><h3>{group.label}</h3><div className="skill-pills">{group.items.map((item) => <span key={item}>{item}</span>)}</div></motion.article>)}</div></section>

      <section id="projects" className="section section-wrap projects"><SectionHeading eyebrow="Selected from GitHub" title="Work that stays in motion." copy="Every project below is fetched live from my public GitHub profile - no static project cards, just the work as it evolves." /><div className="project-controls"><label className="search-box"><FiSearch /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search repositories" aria-label="Search repositories" /></label><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort repositories"><option value="featured">Featured first</option><option value="updated">Recently updated</option><option value="stars">Most starred</option></select></div><div className="filter-row">{languages.map((item) => <button key={item} className={item === language ? 'active' : ''} onClick={() => setLanguage(item)}>{item}</button>)}</div>
        {loading ? <div className="repo-state"><span className="spinner" /> Loading live GitHub work...</div> : error ? <div className="repo-state error">GitHub is taking a moment. <a href={githubUrl} target="_blank" rel="noreferrer">View the live profile instead <FiArrowUpRight /></a></div> : <motion.div layout className="projects-grid">{visibleRepos.slice(0, 9).map((repo) => <ProjectCard key={repo.id} repo={repo} />)}{visibleRepos.length === 0 && <div className="repo-state">No repositories match that search yet.</div>}</motion.div>}
        <a className="underlined-link" href={githubUrl} target="_blank" rel="noreferrer">See all repositories on GitHub <FiArrowUpRight /></a>
      </section>

      <section id="experience" className="section section-wrap experience"><SectionHeading eyebrow="The path so far" title="Growing in public, on purpose." /><div className="timeline">{work.map(([date, title, text], index) => <motion.article key={title} className="timeline-item" initial={{ opacity: 0, x: index % 2 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><div className="timeline-node"><span /></div><div className="timeline-date">{date}</div><div className="timeline-content glass-card"><h3>{title}</h3><p>{text}</p></div></motion.article>)}</div></section>

      <section id="github" className="section section-wrap github"><SectionHeading eyebrow="Open-source pulse" title="The numbers behind the commits." copy="A live view of the public GitHub profile and the small, steady activity that turns into better engineering." /><div className="github-grid"><motion.div className="github-profile glass-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="profile-head">{profile ? <img src={profile.avatar_url} alt="Shaikh Zeeshan GitHub avatar" /> : <div className="avatar-fallback">SZ</div>}<div><span>github.com</span><h3>@zeeshanshaikh95</h3><a href={githubUrl} target="_blank" rel="noreferrer">Visit profile <FiArrowUpRight /></a></div></div><div className="stat-grid"><div><b>{loading ? '...' : profile?.public_repos ?? repos.length}</b><span>Repositories</span></div><div><b>{loading ? '...' : starTotal}</b><span>Total stars</span></div><div><b>{loading ? '...' : profile?.followers ?? 0}</b><span>Followers</span></div></div></motion.div><motion.div className="contribution-card glass-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}><div className="card-label"><span>Contribution activity</span><FiGithub /></div><img src="https://ghchart.rshah.org/6366f1/zeeshanshaikh95" alt="GitHub contribution activity for Shaikh Zeeshan" loading="lazy" /><small>Live public contribution activity</small></motion.div></div><div className="github-detail-grid"><div className="glass-card"><div className="card-label"><span>Most used languages</span><FiCode /></div>{languageLeaders.length ? languageLeaders.map(([name, count], index) => <div className="language-bar" key={name}><div><span>{name}</span><b>{count} repos</b></div><i><em style={{ width: `${Math.max(24, (count / languageLeaders[0][1]) * 100)}%` }} className={`bar-${index}`} /></i></div>) : <p className="muted">Loading language data...</p>}</div><div className="glass-card activity-card"><div className="card-label"><span>Latest public activity</span><FiZap /></div>{events.slice(0, 4).map((event) => <div className="activity" key={event.id}><span><FiGitBranch /></span><p><b>{event.type.replace('Event', '')}</b><small>{event.repo.name.replace('zeeshanshaikh95/', '')} · {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(event.created_at))}</small></p></div>)}{!loading && !events.length && <p className="muted">Recent activity will appear here.</p>}</div></div></section>

      <section className="section section-wrap now"><SectionHeading eyebrow="Currently focused" title="What&apos;s keeping me curious." /><div className="now-grid">{doingNow.map(([title, text], index) => <motion.article key={title} className="now-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -5 }}><span>0{index + 1}</span><div className="now-icon">{index === 0 ? <FiCode /> : index === 1 ? <FiTerminal /> : index === 2 ? <FiZap /> : <FiGlobe />}</div><h3>{title}</h3><p>{text}</p><FiArrowUpRight className="corner-arrow" /></motion.article>)}</div></section>

      <section className="section section-wrap services"><SectionHeading eyebrow="Ways I can help" title="From first click to solid foundation." /><div className="services-list">{services.map(([number, title, text]) => <motion.article key={number} className="service-row" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} whileHover={{ x: 7 }}><span>{number}</span><h3>{title}</h3><p>{text}</p><FiArrowUpRight /></motion.article>)}</div></section>

      <section className="section section-wrap terminal-section"><div><SectionHeading eyebrow="A small terminal break" title="Ask the developer." copy="A tiny interactive shell - because every portfolio deserves at least one terminal." /><div className="terminal-hints"><span>whoami</span><span>skills</span><span>projects</span><span>contact</span></div></div><Terminal /></section>

      <section className="testimonials section-wrap"><div className="testimonials-heading"><div className="eyebrow"><span /> Kind words, soon</div><h2>Great work starts with good conversation.</h2></div><div className="testimonial-card"><FiClipboard /><p>“This space is ready for future collaborators, clients, and teammates.”</p><span>Testimonials coming soon</span></div></section>

      <section id="contact" className="contact section-wrap"><div className="contact-flare" /><div className="contact-copy"><div className="eyebrow"><span /> Available and listening</div><h2>Let&apos;s build something<br /><em>amazing together.</em></h2><p>I&apos;m actively looking for software engineering jobs, internships, freelance opportunities, and exciting collaborations.</p><div className="contact-details"><a href={`mailto:${email}`}><FiMail /> {email}</a><span><FiMapPin /> Mumbai, India</span><button onClick={copyEmail}>{copied ? <FiCheck /> : <FiCopy />}{copied ? 'Email copied' : 'Copy email'}</button></div></div><form className="contact-form glass-card" onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:${email}?subject=${encodeURIComponent('Portfolio enquiry')}` }}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label><label>Message<textarea required name="message" rows={4} placeholder="Tell me a little about what you're building..." /></label><button className="button primary" type="submit">Send message <FiSend /></button></form></section>
    </main>
    <footer className="footer section-wrap"><a className="brand" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home') }}>SZ<span>.</span></a><p>Made with React, Tailwind &amp; care in Mumbai.</p><div><a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }} aria-label="Email"><FiMail /></a><a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noreferrer" aria-label="LinkedIn placeholder"><FiLinkedin /></a></div></footer>
    <button className="scroll-top" onClick={() => scrollTo('home')} aria-label="Back to top"><FiChevronUp /></button>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: 'Shaikh Zeeshan', jobTitle: 'Full Stack MERN Developer', address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' }, url: githubUrl, sameAs: [githubUrl] }) }} />
  </>
}

export default App
