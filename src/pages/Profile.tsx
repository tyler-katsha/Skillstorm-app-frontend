import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeCard } from '../components/BadgeCard';
import { Profile } from '../components/ProfileImageHolder';
import { useUser } from '../contexts/UserContext';
import styles from '../module/ProfilePage.module.css';
import { getYear } from '../utils/Utils';
import type { UserTrackerResponse } from '../types/tracker';
import { fetchUserTrackerHistory, getSavedQuizPercentage } from '../utils/services/trackerService';

export const ProfilePage = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [tracker, setTracker] = useState<UserTrackerResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadTracker = async () => {
            try {
                setLoading(true);
                const data = await fetchUserTrackerHistory();
                setTracker(data);
            } catch (error) {
                console.error('Error loading user tracker history:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTracker();
    }, [user]);

    if (!user) {
        return null;
    }

    const quizzesTaken = tracker?.quizzesTaken ?? 0;
    const quizzesWon = tracker?.quizzesWon ?? 0;
    const streak = tracker?.streak ?? 0;
    const longestStreak = tracker?.longestStreak ?? 0;
    const perfectQuizzes = tracker?.perfectQuizzes ?? 0;
    const totalXp = tracker?.totalXp ?? user.xp ?? 0;
    const currentLevel = tracker?.currentLevel ?? 1;

    const calculatedWinRate = tracker?.winRate != null
        ? (tracker.winRate <= 1 ? tracker.winRate * 100 : tracker.winRate).toFixed(2)
        : quizzesTaken > 0
            ? ((quizzesWon / quizzesTaken) * 100).toFixed(2)
            : '0.00';

    const calculatedAccuracy = tracker?.accuracyRate != null
        ? (tracker.accuracyRate <= 1 ? tracker.accuracyRate * 100 : tracker.accuracyRate).toFixed(1)
        : (tracker?.totalQuestionsAnswered ?? 0) > 0
            ? (((tracker?.totalCorrectAnswers ?? 0) / (tracker?.totalQuestionsAnswered ?? 1)) * 100).toFixed(1)
            : '0.0';

    const formatDuration = (seconds?: number) => {
        if (!seconds) return '0m';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    };

    return (
        <div className={styles.pageWrapper}>
            <h1 className={styles.title}>My Profile</h1>

            <p className={styles.titleDescription}>
                SkillStorm - compete, earn badges, track progress
            </p>

            <div className={styles.profileContainer}>
                {/* LEFT SIDEBAR PANEL */}
                <div className={styles.leftContainer}>
                    <Profile name={user.username} profileImageUrl={undefined} />

                    <div className={styles.statsGrid}>
                        <div className={styles.statsCard}>{quizzesTaken} Quizzes</div>
                        <div className={styles.statsCard}>{quizzesWon} Won</div>
                        <div className={styles.statsCard}>{streak} Streak</div>
                    </div>

                    <div className={styles.historySection}>
                        <div className={styles.historyHeader}>
                            <h3>Tracker Overview</h3>
                            <span className={styles.levelBadge}>Lvl {currentLevel}</span>
                        </div>

                        <div className={styles.trackerMetricsGrid}>
                            <div className={styles.metricItem}>
                                <span className={styles.metricLabel}>Perfect Quizzes</span>
                                <span className={styles.metricValue}>{perfectQuizzes}</span>
                            </div>
                            <div className={styles.metricItem}>
                                <span className={styles.metricLabel}>Longest Streak</span>
                                <span className={styles.metricValue}>{longestStreak}d</span>
                            </div>
                            <div className={styles.metricItem}>
                                <span className={styles.metricLabel}>Accuracy</span>
                                <span className={styles.metricValue}>{calculatedAccuracy}%</span>
                            </div>
                            <div className={styles.metricItem}>
                                <span className={styles.metricLabel}>Time Spent</span>
                                <span className={styles.metricValue}>
                                    {formatDuration(tracker?.totalTimeSpentSeconds)}
                                </span>
                            </div>
                        </div>

                        <h4 className={styles.subHeading}>Recent Attempts</h4>
                        <div className={styles.attemptList}>
                            {loading ? (
                                <p className={styles.emptyText}>Loading history...</p>
                            ) : tracker?.attemptRecords && tracker.attemptRecords.length > 0 ? (
                                tracker.attemptRecords.slice(0, 5).map((attempt, idx) => (
                                    <div key={idx} className={styles.attemptRow}>
                                        <div className={styles.attemptInfo}>
                                            <span className={styles.attemptTitle}>
                                                {attempt.quizTitle || `Quiz #${attempt.quizId}`} (Try #{attempt.attemptNumber})
                                            </span>
                                            <span className={styles.attemptMeta}>
                                                {attempt.correctAnswers}/{attempt.questionsAnswered} correct • +{attempt.gainedXp} XP
                                            </span>
                                        </div>
                                        <span
                                            className={`${styles.attemptStatus} ${
                                                attempt.isPerfectQuiz
                                                    ? styles.statusPerfect
                                                    : attempt.isQuizWon
                                                    ? styles.statusWon
                                                    : styles.statusLost
                                            }`}
                                        >
                                            {attempt.isPerfectQuiz ? 'Perfect' : attempt.isQuizWon ? 'Won' : 'Lost'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.emptyText}>No attempts recorded yet</p>
                            )}
                        </div>
                    </div>

                    <div className={styles.userData}>
                        <h3>Email: {user.email}</h3>
                        <h3>Joined {getYear(user.createdAt)}</h3>
                    </div>
                </div>

                {/* RIGHT MAIN PANEL */}
                <div className={styles.rightContainer}>
                    
                    {/* PVP / MULTIPLAYER SECTION (Added) */}
                    <div className={styles.statsCardData}>
                        <h2>Multiplayer & PvP</h2>
                        <hr className={styles.divider} />
                        <div className={styles.pvpContainer}>
                            <div className={styles.quickJoinContainer}>
                                <p className={styles.hostRoom}>Looking for a match?</p>
                                <button className={styles.quickJoinBtn}>Quick Join</button>
                            </div>
                            <div className={styles.hostContainer}>
                                <button className={styles.hostBtn}>Host Room</button>
                            </div>
                            <div className={styles.friendJoinContainer}>
                                <p className={styles.friendRoom}>Join by Code:</p>
                                <input type="text" className={styles.joinInput} placeholder="Ex: A4X9" maxLength={6} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.statsCardData}>
                        <h2>Ranking</h2>
                        <hr className={styles.divider} />
                        <p className={styles.ranking}>#8 Global</p>
                        <p className={styles.points}>{totalXp} pts</p>
                        <p className={styles.winRate}>{calculatedWinRate}% win rate</p>
                    </div>

                    <div className={styles.statsCardData}>
                        <h2>Badges</h2>
                        <hr className={styles.divider} />
                        {user.badges !== undefined && user.badges.length > 0 ? (
                            user.badges.map((item: any, index: number) => (
                                <BadgeCard key={index} name={item.name} description={item.description} />
                            ))
                        ) : (
                            <div className={styles.emptyBadgeState}>No Badges Obtained</div>
                        )}
                    </div>

                    <div className={styles.statsCardData}>
                        <h2>Challenges (Uncompleted)</h2>
                        <hr className={styles.divider} />
                        <div className={styles.quizRowsContainer}>
                            {tracker?.uncompletedQuizzes && tracker.uncompletedQuizzes.length > 0 ? (
                                tracker.uncompletedQuizzes.map((quiz, index) => {
                                    const qId = quiz.quizId ?? quiz.id ?? 0;
                                    const pct = getSavedQuizPercentage(qId);
                                    return (
                                        <div key={qId || index} className={styles.bubbleChallenge}>
                                            <div className={styles.challengeRow}>
                                                <div className={styles.challengeDetails}>
                                                    <span className={styles.challengeTitle}>{quiz.title}</span>
                                                    <span className={styles.challengePercent}>{pct}% completed</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/quizzes/${qId}`)}
                                                    className={styles.resumeBtn}
                                                >
                                                    Resume
                                                </button>
                                            </div>
                                            <div className={styles.progressTrack}>
                                                <div
                                                    className={styles.progressFill}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className={styles.emptyText}>No uncompleted quizzes</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <p className={styles.bottomDescription}>SkillStorm - Compete, Earn, Conquer</p>
        </div>
    );
};