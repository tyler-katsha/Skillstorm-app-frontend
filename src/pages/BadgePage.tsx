import { useMemo, useState } from "react"
import { definitions, preview } from "../data/badgeData"
import { filterArray, type Filter } from "../types/type"
import styles from '../module/BadgePage.module.css'

export const BadgePage: React.FC = () => {
    // Directly uses preview mock data self-contained
    const games = useMemo(() => {
        return [...preview].sort((a, b) => Date.parse(b.playedAt) - Date.parse(a.playedAt))
    }, [])
        
    const [filter, setFilter] = useState<Filter>('All')

    const ordered = [...games].sort((a, b) => Date.parse(a.playedAt) - Date.parse(b.playedAt))
    const wins = ordered.filter(game => game.mode === 'Duel' && game.outcome === 'Won')
    const highScores = ordered.filter(game => game.total > 0 && game.score / game.total >= 0.8)
    const perfect = ordered.filter(game => game.total > 0 && game.score >= game.total)
    const topics = [...new Set(ordered.map(game => game.topic))]

    const counts = {
        games: ordered.length,
        wins: wins.length,
        highScores: highScores.length,
        perfect: perfect.length,
        topics: topics.length,
    }

    const earnedDate = (kind: keyof typeof counts, goal: number) => {
        if (counts[kind] < goal) return undefined
        if (kind === 'topics') {
            const third = topics[goal - 1]
            return ordered.find(game => game.topic === third)?.playedAt
        }
        const source = kind === 'wins' ? wins : kind === 'highScores' ? highScores : kind === 'perfect' ? perfect : ordered
        return source[goal - 1]?.playedAt
    }

    const earned = definitions.filter(badge => counts[badge.kind as keyof typeof counts] >= badge.goal).length
    
    const next = definitions
        .filter(badge => counts[badge.kind as keyof typeof counts] < badge.goal)
        .sort((a, b) => (counts[b.kind as keyof typeof counts] / b.goal) - (counts[a.kind as keyof typeof counts] / a.goal))[0]
        
    const shown = definitions.filter(badge => {
        const count = counts[badge.kind as keyof typeof counts]
        return filter === 'All' || (filter === 'Earned' ? count >= badge.goal : count < badge.goal)
    })

    return (
        <div className={styles.badgePage}>
            <div className={styles.breadcrumb}>YOUR PROFILE <span>/</span> BADGES</div>
            
            <section className={styles.intro}>
                <div>
                    <div className={styles.eyebrow}>YOUR ACHIEVEMENTS</div>
                    <h1>Badge collection<span>.</span></h1>
                    <p>Every milestone deserves recognition. Keep playing to unlock them all.</p>
                </div>
                <div className={styles.introIcon} aria-hidden="true">★</div>
            </section>

            <section className={styles.badgeHero}>
                <span aria-hidden="true">🏆</span>
                <div>
                    <div className={styles.eyebrow}>YOUR COLLECTION</div>
                    <h2>{earned} of {definitions.length} badges unlocked</h2>
                    <p>{earned === definitions.length ? 'You unlocked every badge!' : 'Your next achievement is waiting.'}</p>
                    <div className={styles.badgeTotalTrack}>
                        <div style={{ width: `${earned / definitions.length * 100}%` }} />
                    </div>
                </div>
                <strong>{Math.round(earned / definitions.length * 100)}%</strong>
            </section>

            {next && (
                <section className={styles.nextBadge}>
                    <span className={styles.nextIcon}>{next.icon}</span>
                    <div>
                        <span className={styles.eyebrow}>UP NEXT</span>
                        <strong>{next.title}</strong>
                        <small>{next.description}</small>
                    </div>
                    <strong>{Math.min(counts[next.kind as keyof typeof counts], next.goal)} / {next.goal}</strong>
                </section>
            )}

            <div className={styles.badgeListHeading}>
                <div>
                    <span className={styles.eyebrow}>MILESTONES</span>
                    <h2>All badges</h2>
                </div>
                <div className={styles.badgeFilters} aria-label="Filter badges">
                    {filterArray.map(value => (
                        <button 
                            key={value} 
                            type="button" 
                            className={filter === value ? styles.active : ''} 
                            aria-pressed={filter === value} 
                            onClick={() => setFilter(value as Filter)}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>

            <section className={styles.badgeGrid} aria-label="Badges">
                {shown.map(badge => {
                    const count = counts[badge.kind as keyof typeof counts]
                    const unlocked = count >= badge.goal
                    const date = earnedDate(badge.kind as keyof typeof counts, badge.goal)

                    return (
                        <article className={`${styles.badgeCard} ${unlocked ? '' : styles.badgeLocked}`} key={badge.id}>
                            <div className={styles.badgeEmblem} aria-hidden="true">{badge.icon}</div>
                            <span className={`${styles.badgeState} ${unlocked ? styles.badgeEarned : ''}`}>
                                {unlocked ? '✓ EARNED' : 'LOCKED'}
                            </span>
                            <h3>{badge.title}</h3>
                            <p>{badge.description}</p>
                            {unlocked ? (
                                <small>Earned {date ? new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'recently'}</small>
                            ) : (
                                <div className={styles.badgeProgress}>
                                    <div>
                                        <span>Progress</span>
                                        <strong>{Math.min(count, badge.goal)} / {badge.goal}</strong>
                                    </div>
                                    <div className={styles.meter}>
                                        <div style={{ width: `${Math.min(100, (count / badge.goal) * 100)}%` }} />
                                    </div>
                                </div>
                            )}
                        </article>
                    )
                })}
            </section>
        </div>
    )
}