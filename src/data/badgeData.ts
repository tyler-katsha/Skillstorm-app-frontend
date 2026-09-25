import type { CardData } from "../types/card";
import type { PlayerHistory } from "../types/player";

export const badgeData: CardData[] = [
    { title: 'Rookie Stormer', text: 'Complete your first Quiz', numOfQuestions: 0 },
    { title: 'Top 10 Percent', text: 'Reach the Top 10 percent on the leaderboard', numOfQuestions: 0 },
    { title: 'Weekly Champion', text: 'Claim the number 1 spot weekly', numOfQuestions: 0 },
    { title: 'Quiz Master', text: 'Score perfectly on five quizzes', numOfQuestions: 0 },
]

export const preview: PlayerHistory[] = [
  { id: '1', playedAt: '2026-09-22T16:45:00', topic: 'Java Fundamentals', mode: 'Duel', score: 9, total: 10, outcome: 'Won', opponent: 'Alex M.' },
  { id: '2', playedAt: '2026-09-21T13:20:00', topic: 'Database Design', mode: 'Solo Quiz', score: 8, total: 10, outcome: 'Completed' },
  { id: '3', playedAt: '2026-09-19T18:15:00', topic: 'Networking', mode: 'Duel', score: 6, total: 10, outcome: 'Lost', opponent: 'Sam K.' },
  { id: '4', playedAt: '2026-09-18T12:10:00', topic: 'Java Fundamentals', mode: 'Duel', score: 8, total: 10, outcome: 'Won', opponent: 'Taylor R.' },
  { id: '5', playedAt: '2026-09-16T09:40:00', topic: 'Database Design', mode: 'Solo Quiz', score: 7, total: 10, outcome: 'Completed' },
  { id: '6', playedAt: '2026-09-14T14:30:00', topic: 'Networking', mode: 'Duel', score: 7, total: 10, outcome: 'Won', opponent: 'Jordan P.' },
]

export const definitions = [
  { id: 'first', title: 'First Steps', description: 'Complete your first game', icon: '✦', goal: 1, kind: 'games' },
  { id: 'five', title: 'Getting Started', description: 'Complete 5 games', icon: '⚡', goal: 5, kind: 'games' },
  { id: 'ten', title: 'Game Changer', description: 'Complete 10 games', icon: '◆', goal: 10, kind: 'games' },
  { id: 'win', title: 'First Victory', description: 'Win your first duel', icon: '🏆', goal: 1, kind: 'wins' },
  { id: 'champion', title: 'Duel Champion', description: 'Win 5 duels', icon: '♛', goal: 5, kind: 'wins' },
  { id: 'sharp', title: 'Sharp Mind', description: 'Score at least 80% in 3 games', icon: '◈', goal: 3, kind: 'highScores' },
  { id: 'flawless', title: 'Flawless', description: 'Get every question right in a game', icon: '★', goal: 1, kind: 'perfect' },
  { id: 'explorer', title: 'Knowledge Explorer', description: 'Play games in 3 different topics', icon: '◉', goal: 3, kind: 'topics' },
];
