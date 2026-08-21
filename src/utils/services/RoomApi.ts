import { API } from "../API";
import { type RoomResponse } from "../type";
import { getToken } from "../Utils"

const authFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const token = getToken();
    if (!token) {
        throw new Error('No Token Found');
    }

    const response = await fetch(`${API}/${endpoint}`, {
        ...options,
        headers: {
            'content-type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Request Failed with status ${response.status}`);
    }

    return response.json();
}


export const createRoom = async () => {

    const roomId = crypto.randomUUID();
    const room = await authFetch<RoomResponse>(`duel/join-friend?room_code=${roomId}`, {
        method: "POST",
    });

    return { roomId, room };
}


export const quickJoinRoom = async (): Promise<RoomResponse> => {

    return await authFetch<RoomResponse>(`duel/quick-join`, {
        method: "POST"
    });
}


export const friendJoinRoom = async (room_code: string) => {
    return await authFetch<RoomResponse>(`duel/join-friend?room_code=${encodeURIComponent(room_code.trim())}`, {
        method: "POST"
    });
}

export const leaveQueue = async (): Promise<void> => {
    const token = getToken();

    await fetch(`${API}/duel/leave-queue`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            ...(token ? { Authroization: `Bearer ${token}` } : {})
        },
    });

}