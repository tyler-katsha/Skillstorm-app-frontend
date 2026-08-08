import { type AppRole, type AuthProvider, type UserPayload, type User } from "./type";

export function splitFullName(name: string) {
    const nameParts = name.split(' ');
    const fn = nameParts[0];

    const ln = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''

    return { firstName: fn, lastName: ln }
}

export function getAge(dateOfBirth: string): number | null {
    if (!dateOfBirth) return null;

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthday =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

    if (!hasHadBirthday) {
        age--;
    }

    return age;
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

export function mapPayloadToProfile(payload: UserPayload): User {
    return {
        name: payload.name,
        roles: payload.roles.length > 0 ? payload.roles : ["GUEST"],
        authProvider: payload.authProvider,
        bio: payload.bio,
        profileImageUrl: payload.profileImageUrl,
        email: payload.email,
        enabled: payload.enabled,
    };
}
export function formatTime(timeStr: string): string {
    if (!timeStr) return '';

    const [hour, minute] = timeStr.split(':').map(Number);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 || 12;

    return `${formattedHour}:${String(minute).padStart(2, '0')} ${ampm}`;
};

export function formatRoles(roles: AppRole[]): string {
    return roles.map(formatRole).join(", ");
}
export function formatRole(role: string): string {
    return role
        .toLowerCase()
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
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
    return roles.includes('ADMIN') || roles.includes('YOUTH_LEADER')
}
export function validAdmin(roles: AppRole[]): boolean {
    if(!roles) return false;
    return roles.includes('ADMIN');
}
export function validGuest(isGuest:string | null,route:string): string{

    return isGuest ? '/login' : route
}

export function removeAll(){
    localStorage.removeItem('isGuest')
    localStorage.removeItem('email')
}
export function isLocal(authProvider:AuthProvider): boolean{
    return authProvider === 'LOCAL';
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
export const roundN = (x: number, p: number) => (Math.round(x * 10**p) / 10**p);

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
