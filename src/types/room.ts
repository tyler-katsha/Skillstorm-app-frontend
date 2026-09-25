import type { GameEventType } from "./type";

export interface RoomResponse {
    roomId: string | null;
    player1: number | null;
    player2: number | null;
    gameEventType: GameEventType;
}
