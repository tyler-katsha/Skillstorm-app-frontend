import type { AppRole, AuthProvider } from "../types/type";

export const JWT = 'jwt-token';
export const LOGIN_REGISTER = 'login-register-pages';
export const T = 'true';
export const MAIL = 'email';
export const IS_GUEST = 'isGuest';



export function splitFullName(name: string) {
    const nameParts = name.split(' ');
    const fn = nameParts[0];

    const ln = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''

    return { firstName: fn, lastName: ln }
}

export function trim(data: string): string {
    return data.trim();
}

export function getPerformanceTier(styles: any, accuracy: number) {
    if (accuracy >= 90) return { title: 'Outstanding Mastery!', badge: '🏆 Gold Tier', className: styles.tierGold };
    if (accuracy >= 70) return { title: 'Great Job!', badge: '🥈 Silver Tier', className: styles.tierSilver };
    if (accuracy >= 50) return { title: 'Good Effort!', badge: '🥉 Bronze Tier', className: styles.tierBronze };
    return { title: 'Keep Practicing!', badge: '📚 Learner', className: styles.tierPractice };
}

export function getYear(createdAt: string): number | null {
    if (!createdAt) return null;

    const joined = new Date(createdAt.split('T')[0]);

    return joined.getFullYear();
}

export function ColorUtil() {

    const colors = ['#EF4444', '#10B981', '#F59E0B', '#06B6D4', '#3B82F6'];

    const storedColor = sessionStorage.getItem('profilePictureColor');

    if (storedColor) {
        return storedColor;
    }

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    sessionStorage.setItem('profilePictureColor', randomColor);

    return randomColor;
}

export function formatTime(timeStr: string): string {
    if (!timeStr) return '';

    const [hour, minute] = timeStr.split(':').map(Number);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}:${String(minute).padStart(2, '0')} ${ampm}`;
};

export function formatTopicNames(topicNames: string[]): string {
    return topicNames.join(", ");
}
export function extractName(alt: string): string {
    if (!alt) return "";

    const parts = alt.split(' ');

    return parts.join('|');
}
export function getInitials(fullName: string): string {

    if (fullName.split(' ').length === 1) return fullName[0];

    const { firstName, lastName } = splitFullName(fullName);

    const firstLetter = firstName[0]

    const lastLetter = lastName[0]
    return firstLetter + lastLetter;
}
export function isPermitted(roles: AppRole[]): boolean {

    if (!roles) return false;
    return roles.includes('ADMIN') || roles.includes('EMPLOYEE')
}

export function validAdmin(roles: AppRole[]): boolean {
    if (!roles) return false;
    return roles.includes('ADMIN');
}

export function removeAll() {
    destroyLoadingAndRegisterPageTrue();
    destroyEmailTrue();
}

export function setJwt(data: any): void {
    localStorage.setItem(JWT, data);
}
export function getToken(): string | null {
    const token = localStorage.getItem(JWT);
    try {

        if (token === null) {
            return null;
        }

    } catch (err) {
        console.error(err)
    }

    return token;
}
export function isLocal(authProvider: AuthProvider): boolean {
    return authProvider === 'LOCAL';
}

export function destroyToken(): void {
    if (getToken() !== null) {
        localStorage.removeItem(JWT);
    }
}
export function destroyLoadingAndRegisterPageTrue(): void {
    if(getLoadingAndRegisterPage() !== undefined) {
        localStorage.removeItem(LOGIN_REGISTER);
    }
}

export function destroyEmailTrue(): void {
    if(getEmailTrue() !== undefined) {
        localStorage.removeItem(MAIL);
    }
}

export function getLoadingAndRegisterPage(): string | undefined | null { 
    const loadingAndRegister = localStorage.getItem(LOGIN_REGISTER);
    if(loadingAndRegister === undefined || loadingAndRegister === null) return undefined;
    return loadingAndRegister;
}

export function setUpLoginAndRegisterPage(): void {
    localStorage.setItem(LOGIN_REGISTER, T)
}

export function setupEmailTrue(): void {
    localStorage.setItem(MAIL, T);
}

export function getIsGuest(): string | null{
    const isGuest = localStorage.getItem(IS_GUEST);
    if(isGuest === null) return null;
    return isGuest;
}

export function getEmailTrue(): string | null | undefined {
    const emailTrue = localStorage.getItem(MAIL);
    if(emailTrue === undefined || emailTrue === null) return undefined;
    return emailTrue;
}
/** 
 * Returns the empty string if n is equal to 1, else "s".
 * Useful for adding a plural "s" ending to English words.  
 * @example
 * const f = (n) => `${n} bottle${pluralS(n)} of beer on the wall`;
 * console.log(f(99)); // 99 bottles of beer on the wall
 * console.log(f(1));  // 1 bottle of beer on the wall
 * @returns either "s" or ""
 */
export const pluralS = (n: number) => (n != 1 ? "s" : "");

/** 
 * Rounds a number to a specified number of decimal places.
 * @param x - The number to round.
 * @param p - The number of decimal places to round to.
 * @returns The rounded number.
 * @example
 * roundN(3.14159, 2); // 3.14
 */
export const roundN = (x: number, p: number) => (Math.round(x * 10 ** p) / 10 ** p);

/**
 * This is an enum representing the possible states a QuestionOption button
 * can be in.
 * 
 * - An option should be given the POSSIBLE state 
 *   if the user has not made any selection yet.
 *   If one option has the POSSIBLE state, all options must have 
 *   the POSSIBLE state.
 *   POSSIBLE options are displayed in a neutral colour.
 *   POSSIBLE options are the only options that are not disabled.
 * - An option should be given the CORRECT state 
 *   if it is the correct answer. 
 *   CORRECT options are displayed with a green highlight. 
 * - An option should be given the INCORRECT state 
 *   if the user selects it, but it is not the correct answer.
 *   INCORRECT options are displayed with a red highlight. 
 * - An option should be given the UNSELECTED state 
 *   if the user did not select it, and it is not the correct answer.
 *   UNSELECTED options are displayed in a greyed-out colour.
 */
export const OptionState = {
    "POSSIBLE": Symbol("POSSIBLE"),
    "CORRECT": Symbol("CORRECT"),
    "INCORRECT": Symbol("INCORRECT"),
    "UNSELECTED": Symbol("UNSELECTED"),
}

/**
 * The type of the values of the OptionState object.
 * This custom type is preferred over `symbol` because the type of OptionState
 * may change in the future.
*/
export type OptionStateT = (typeof OptionState)[keyof typeof OptionState];

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function calculateNextLevel(xp: number): number {
    if (xp <= 0) {
        return 0;
    }

    const currentLevel = calculateLevel(xp);
    return currentLevel * 50;
}
export function calculateLevel(xp: number): number {
    if (xp <= 0) {
        return 0;
    }

    return Math.floor(xp / 50) + 1;
}

export function formatTimeSpent(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) {
        return `${seconds}s`;
    }

    return `${minutes}m ${seconds}s`;
}

export function formatDuration(seconds?: number): string {
    if (!seconds) return '0m';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};