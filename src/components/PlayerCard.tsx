
import styles from '../module/PlayerCard.module.css';
import type { PlayerCardProps } from '../utils/type';
import { Profile } from './ProfileImageHolder';

export const PlayerCard:React.FC<PlayerCardProps> = ({ player, isHost = false, isCurrentUser = false, isReady = false, onToggleReady, placeholderText }) => {
  if (!player) {
    return (
      <div className={styles.emptySlotCard}>
        <div className={styles.emptyAvatar} />
        <p className={styles.waitingText}>{placeholderText || 'Searching...'}</p>
        <div className={styles.statsPlaceholder}>
          <span>Matches: --</span>
          <span>Wins: --</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.activeSlotCard}>
      {isHost && <span className={styles.hostBadge}>Host</span>}

      <Profile name={player.username} profileImageUrl={player.avatarUrl} />
      <h3>{player.username}</h3>
      <div className={styles.statsRow}>
        <span>Matches: {player.quizzesTaken ?? 0}</span>
        <span>Wins: {player.quizzesWon ?? 0}</span>
        <span>Streak: {player.streak ?? 0}</span>
        <span>Ranking: {player.ranking ? `#${player.ranking}` : 'N/A'}</span>
      </div>

      <div className={styles.actionContainer}>
        {isCurrentUser ? (
          <button
            className={`${styles.readyBtn} ${isReady ? styles.readyBtnActive : ''}`}
            onClick={onToggleReady}
          >
            {isReady ? 'Ready!' : 'Ready Up'}
          </button>
        ) : (
          <span className={`${styles.readyStatusBadge} ${isReady ? styles.readyStatusActive : ''}`}>
            {isReady ? 'Ready' : 'Not Ready'}
          </span>
        )}
      </div>
    </div>
  );
};