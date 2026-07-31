import { Card } from "./Card"

export const CardGrid = () => {
    return(
        <div>
            {[1,2,3,4].map((index) => (
                <Card key={index}/>
            ))}
        </div>
    )
}