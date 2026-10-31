import type { HomeSection } from "../../types/home";
import { API } from "../API";
import { getToken } from "../Utils";

export const findHomePageData = async (): Promise<HomeSection> => {
    const token = getToken(); 

    const response = await fetch(`${API}/home`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    });

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error("Too many requests. Please try again later.");
        }
        throw new Error("Failed to fetch home page data");
    }

    return response.json();
};