import { Profile } from '../components/image/ProfileImageHolder';
import { useUser } from '../contexts/UserContext';
import styles from '../module/ProfilePage.module.css';
import { formatDuration, getToken, getYear, isLocal } from '../utils/Utils';
import { fetchUserTrackerHistory, getSavedQuizPercentage } from '../utils/services/trackerService'; // Removed fetchUserTrackerHistory
import { RedirectUser } from '../components/auth/RedirectUser';
import { ErrorPage } from './ErrorPage';
import { ERROR_MESSAGES, type ErrorType } from '../types/error';
import { useCallback, useEffect, useState } from 'react';
import type { UserTrackerResponse, ProfileTrackerAPIResponse } from '../types/tracker';
import { UncompletedQuiz } from '../components/quiz/UncompletedQuizz';
import { Divider } from '../components/common/Divider';
import { AttemptRecord } from '../components/attempt/AttemptRecord';
import { useNavigate } from 'react-router-dom';
import { ProfileSkeleton } from '../skeletons/pages/ProfileSkeleton';
import { API } from '../utils/API';
import { ProfileDetailsModal } from '../modals/ProfileDetailsModal';
import { useToast } from '../contexts/ToastContext';
export const ProfilePage = () => {

    const navigate = useNavigate();
    const { user } = useUser();
    const { showToast } = useToast();

    const [tracker, setTracker] = useState<UserTrackerResponse | null>(null);
    const [rank, setRank] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDetailsModalOpen,setIsDetailsModalOpen] = useState(false);
    const [errorType, setErrorType] = useState<ErrorType | null>(null);


    if (!user) return <RedirectUser />

    const handleForgotPassword = () => {
        navigate(`/reset-password?email=${user.email}`)
    }

    const handleDeleteAccount = async () => {

        setIsLoading(true);
        const token = getToken();
        try {
            const response = await fetch(`${API}/users`,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            if(!response.ok) {
                showToast('Unable to delete account','error');
                return;
            }

            
        } catch(error) {
            showToast('Network error occurred','error');
        } finally {
            setIsLoading(false);
        }
    }

    const fetchProfileData = useCallback(async () => {
        setIsLoading(true);

        try {
            const data: ProfileTrackerAPIResponse = await fetchUserTrackerHistory();

            setTracker(data.userTrackerResponse);
            setRank(data.rank);

        } catch (err) {
            setErrorType("LOAD_DATA_FAILED");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    if (!user) return <RedirectUser />;
    if (isLoading) return <ProfileSkeleton />
    if (errorType) return <ErrorPage {...ERROR_MESSAGES[errorType]} />
    if (!tracker) return <RedirectUser />
    

    console.log(getToken());

    const quizzesTaken = tracker?.quizzesTaken ?? 0;
    const quizzesWon = tracker?.quizzesWon ?? 0;
    const streak = tracker?.streak ?? 0;
    const longestStreak = tracker?.longestStreak ?? 0;
    const perfectQuizzes = tracker?.perfectQuizzes ?? 0;
    const totalXp = tracker?.totalXp ?? user.xp ?? 0;
    const currentLevel = tracker?.currentLevel ?? 1;

    const calculatedWinRate = tracker?.winRate != null
        ? (tracker.winRate <= 1 ? tracker.winRate * 100 : tracker.winRate).toFixed(2)
        : quizzesTaken > 0 ? ((quizzesWon / quizzesTaken) * 100).toFixed(2) : '0.00';

    const calculatedAccuracy = tracker?.accuracyRate != null
        ? (tracker.accuracyRate <= 1 ? tracker.accuracyRate * 100 : tracker.accuracyRate).toFixed(1)
        : (tracker?.totalQuestionsAnswered ?? 0) > 0 ? (((tracker?.totalCorrectAnswers ?? 0) / (tracker?.totalQuestionsAnswered ?? 1)) * 100).toFixed(1) : '0.0';

    return (
        <div className={styles.pageWrapper}>
            <h1 className={styles.title}>My Profile</h1>

            <p className={styles.titleDescription}>
                SkillStorm - compete, earn badges, track progress
            </p>

            <div className={styles.profileContainer}>
                <div className={styles.leftContainer}>
                    <Profile name={user.username} />

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
                            {isLoading ? (<p className={styles.emptyText}>Loading history...</p>) : tracker?.attemptRecords && tracker.attemptRecords.length > 0 ? (
                                tracker.attemptRecords.slice(0, 5).map((attempt: any, idx: number) => (
                                    <AttemptRecord key={idx} attempt={attempt} />
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

                <div className={styles.rightContainer}>

                    <div className={styles.statsCardData}>
                        <h2>Ranking</h2>
                        <Divider />
                        <p className={styles.ranking}>#{rank ?? 'Unranked'} Global</p>
                        <p className={styles.points}>{totalXp} pts</p>
                        <p className={styles.winRate}>{calculatedWinRate}% win rate</p>
                    </div>

                    <div className={styles.statsCardData}>
                        <h2>Challenges (Uncompleted)</h2>
                        <Divider />
                        <div className={styles.quizRowsContainer}>
                            {tracker?.uncompletedQuizzes && tracker.uncompletedQuizzes.length > 0 ? (
                                tracker.uncompletedQuizzes.map((quiz: any, index: number) => {
                                    const qId = quiz.id ?? 0;
                                    const pct = getSavedQuizPercentage(qId);
                                    return (
                                        <UncompletedQuiz key={qId | index} pct={pct} quiz={quiz} qId={qId} />
                                    );
                                })
                            ) : (
                                <p className={styles.emptyText}>No uncompleted quizzes</p>
                            )}
                        </div>

                        <Divider />
                        <div className={styles.profileSection}>
                            <h3 className={styles.sectionTitle}>Account Details</h3>
                            <div className={styles.settingRow}>
                                <div className={styles.settingMeta}>
                                    <h4>Profile Information</h4>
                                    <p>View your underlying account details, roles, and statistics.</p>
                                </div>
                                <button 
                                    className={styles.passwordBtn} 
                                    onClick={() => setIsDetailsModalOpen(true)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                        <Divider />

                        {isLocal(user.authProvider) && (<div className={styles.profileSection}>
                            <h3 className={styles.sectionTitle}>Security</h3>
                            <div className={styles.settingRow}>
                                <div className={styles.settingMeta}>
                                    <h4>Account Password</h4>
                                    <p>Update your password regularly to maintain a secure account environment.</p>
                                </div>
                                <button className={styles.passwordBtn} onClick={handleForgotPassword}>
                                    Change Password
                                </button>
                            </div>
                        </div>)}

                        <div className={styles.settingRow}>
                            <div className={styles.settingMeta}>
                                <h4 style={{ color: 'var(--danger-color, #dc3545)' }}>Delete Account</h4>
                                <p>Are you sure you want to permanently delete your account? Once removed, your account cannot be recovered.</p>
                            </div>
                            <button
                                className={styles.deleteBtn} 
                                onClick={handleDeleteAccount} 
                            >
                                Delete Account
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <p className={styles.bottomDescription}>SkillStorm - Compete, Earn, Conquer</p>

            <ProfileDetailsModal 
                isOpen={isDetailsModalOpen} 
                onClose={() => setIsDetailsModalOpen(false)} 
            />
        </div>
    );
};