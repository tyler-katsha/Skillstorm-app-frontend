import type { UserProps } from "../types/user";

export const sampleUser: UserProps = {
    username: "john_doe",
    email: "john.doe@example.com",
    xp: 1340,
    roles: ["USER"],
    options: {
        quick_select: false,
    },
    attempts: [],
    badges: [],
    createdAt: new Date().toISOString(),
};