# Game performance page integration

`src/App.tsx` exports `GameResult` and accepts `playerName` and `results` props. The included records are labeled preview data and are used only when `results` is undefined. Pass `results={[]}` for a genuine empty history.

A `GameResult` represents one completed game with a stable `id`, ISO `playedAt` date, `topic`, `mode` (`Duel` or `Solo Quiz`), `score`, `total`, `outcome` (`Won`, `Lost`, or `Completed`) and optional `opponent`. The page calculates the overview, chart and filters from these results.

The existing backend `/attempt/attempts` returns individual question attempts for all users, and its nested `User` contains a password. Do not fetch that endpoint directly from this page. The backend team should provide an authenticated player-specific game history DTO that omits passwords and groups question attempts by game, including duel outcomes. Then map that response to `GameResult[]` and pass it to this component. The current backend data model does not yet record a duel match or outcome, so wins and opponents cannot be derived reliably from it.

## Badges

Navigation uses `#/performance` and `#/badges`. The badge page calculates eight milestones from the same `GameResult[]`: games played, duel wins, high scores, perfect games, and distinct topics. It shows earned and locked badges with progress and unlock dates. These are preview values when `results` is omitted. Supplying `results={[]}` shows no earned badges.

The backend `Badge` entity exists, but `BadgeController` has no read or award endpoint. Persistent awards across sessions require authenticated player-specific badge issuance and unlock dates. Never use the unrestricted attempts endpoint for this.
