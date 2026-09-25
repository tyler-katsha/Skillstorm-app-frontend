export interface CardProps {
    width?: string | number;
    height?: string | number;
    title: string;
    text: string;
    numOfQuestions?: number;
}

export interface CardData {
    title: string;
    text: string;
    numOfQuestions: number;
}
export interface CardGridProps {
    width?: string | number;
    height?: string | number;
    cardData: CardData[]
}
