
export interface CardProps{
    i:number;
}
export const Card: React.FC<CardProps> = ({i}) => {
    return(
        <div>
            This is card {i}
        </div>
    )
}