import { Client } from "@stomp/stompjs";

const WS_URL = "ws://localhost:8080/ws";

export const createStompClient = (onConnectCallback: () => void,onDisconnectCallback: () => void,token?:string) => {
    const client = new Client({
        brokerURL: WS_URL,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        connectHeaders: (token ? {Authorization:`Bearer ${token}`} : {}),
        debug: (str) => {
            console.log('[STOMP]: ', str)
        },
        onConnect: onConnectCallback,
        onDisconnect: onDisconnectCallback,
        onWebSocketClose:onDisconnectCallback,
        onStompError: (frame) => {
            console.error('[STOMP] broker error: ', frame.headers['message']);
            onDisconnectCallback();
        }
    });

    return client;
}