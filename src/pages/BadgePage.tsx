import { useState, useEffect, useCallback } from "react"
import { type Filter } from "../types/type"
import styles from '../module/BadgePage.module.css'
import { filterArray } from "../types/array"
import type { BadgeResponse } from "../types/badge"
import { CreateBadge } from "../components/createComp/CreateBadge"
import { BadgeDetailModal } from "../modals/BadgeDetailModal"
import { API } from "../utils/API"
import { getToken } from "../utils/Utils"
import { useUser } from "../contexts/UserContext"

export const BadgePage: React.FC = () => {
    const { user } = useUser();

    if (!user) return null;

    const isAdmin = user?.role === 'ADMIN';
    const [isCreateBadgeOpen, setIsCreateBadgeOpen] = useState(false)
    const [selectedBadge, setSelectedBadge] = useState<BadgeResponse | null>(null)
    const [badges, setBadges] = useState<BadgeResponse[]>([])
    const [isLoadingBadges, setIsLoadingBadges] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [filter, setFilter] = useState<Filter>('All')

    const fetchBadges = useCallback(async (isBackgroundRefresh = false) => {
        const token = getToken();
        if (!isBackgroundRefresh) setIsLoadingBadges(true);
        else setIsRefreshing(true);

        try {
            const response = await fetch(`${API}/badges/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!response.ok) throw new Error('Failed to fetch badges')

            const data = await response.json()
            console.log(data);
            setBadges(data)
        } catch (error) {
            console.error("Error fetching badges:", error)
        } finally {
            setIsLoadingBadges(false)
            setIsRefreshing(false)
        }
    }, []);

    useEffect(() => {
        fetchBadges()
    }, [fetchBadges])

    const totalBadges = badges.length;
    const earnedBadgesCount = badges.filter(badge => badge.earned).length;
    const progressPercentage = totalBadges === 0 ? 0 : Math.round((earnedBadgesCount / totalBadges) * 100);

    const nextBadge = [...badges]
        .filter(badge => !badge.earned)
        .sort((a, b) => (b.currentProgress / b.goal) - (a.currentProgress / a.goal))[0]

    const shownBadges = badges.filter(badge => {
        if (filter === 'All') return true;
        if (filter === 'Earned') return badge.earned;
        return !badge.earned;
    })

    if (isLoadingBadges) {
        return <div className={styles.badgePage}>Loading your achievements...</div>
    }

    return (
        <div className={styles.badgePage}>
            <div className={styles.breadcrumb}>YOUR PROFILE <span>/</span> BADGES</div>

            <section className={styles.intro}>
                <div>
                    <div className={styles.eyebrow}>YOUR ACHIEVEMENTS</div>
                    <h1>Badge collection<span>.</span></h1>
                    <p>Every milestone deserves recognition. Keep playing to unlock them all.</p>
                </div>
                <div className={styles.introRight}>
                    <button 
                        type="button"
                        className={styles.refreshBtn}
                        onClick={() => fetchBadges(true)}
                        style={{ marginRight: '12px' }}
                    >
                        {isRefreshing ? '↻...' : '↻ Refresh List'}
                    </button>

                    {isAdmin && (
                        <button
                            type="button"
                            className={styles.createBtn}
                            onClick={() => setIsCreateBadgeOpen(true)}
                        >
                            <span>+</span> Create Badge
                        </button>
                    )}
                    <div className={styles.introIcon} aria-hidden="true">★</div>
                </div>
            </section>

            <section className={styles.badgeHero}>
                <span aria-hidden="true">🏆</span>
                <div>
                    <div className={styles.eyebrow}>YOUR COLLECTION</div>
                    <h2>{earnedBadgesCount} of {totalBadges} badges unlocked</h2>
                    <p>{earnedBadgesCount === totalBadges && totalBadges > 0 ? 'You unlocked every badge!' : 'Your next achievement is waiting.'}</p>
                    <div className={styles.badgeTotalTrack}>
                        <div style={{ width: `${progressPercentage}%` }} />
                    </div>
                </div>
                <strong>{progressPercentage}%</strong>
            </section>

            {nextBadge && (
                <section className={styles.nextBadge}>
                    <span className={styles.nextIcon}>{nextBadge.icon}</span>
                    <div>
                        <span className={styles.eyebrow}>UP NEXT</span>
                        <strong>{nextBadge.title}</strong>
                        <small>{nextBadge.description}</small>
                    </div>
                    <strong>{Math.min(nextBadge.currentProgress, nextBadge.goal)} / {nextBadge.goal}</strong>
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
                {shownBadges.map(badge => {
                    return (
                        <article 
                            className={`${styles.badgeCard} ${badge.earned ? '' : styles.badgeLocked}`} 
                            key={badge.id}
                            onClick={() => setSelectedBadge(badge)}
                            style={{ cursor: 'pointer' }} 
                        >
                            <div className={styles.badgeEmblem} aria-hidden="true">{badge.icon}</div>
                            <span className={`${styles.badgeState} ${badge.earned ? styles.badgeEarned : ''}`}>
                                {badge.earned ? '✓ EARNED' : 'LOCKED'}
                            </span>
                            <h3>{badge.title}</h3>
                            <p>{badge.description}</p>

                            {badge.earned ? (
                                <small>
                                    Earned {badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'recently'}
                                </small>
                            ) : (
                                <div className={styles.badgeProgress}>
                                    <div>
                                        <span>Progress</span>
                                        <strong>{Math.min(badge.currentProgress, badge.goal)} / {badge.goal}</strong>
                                    </div>
                                    <div className={styles.meter}>
                                        <div style={{ width: `${Math.min(100, (badge.currentProgress / badge.goal) * 100)}%` }} />
                                    </div>
                                </div>
                            )}
                        </article>
                    )
                })}
            </section>

            {isCreateBadgeOpen && (
                <CreateBadge
                    onClose={() => setIsCreateBadgeOpen(false)}
                    onRefresh={() => fetchBadges(true)}
                />
            )}

            {selectedBadge && (
                <BadgeDetailModal
                    badge={selectedBadge}
                    isAdmin={isAdmin}
                    onClose={() => setSelectedBadge(null)}
                    onRefresh={() => fetchBadges(true)}
                />
            )}
        </div>
    )
}