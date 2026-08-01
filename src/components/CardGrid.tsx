import { Card } from "./Card"

export const CardGrid = () => {
    return(
        <div>
            {[1,2,3,4].map((ele,index) => (
                <div key={index}>
                    <Card i={ele}/>
                </div>
            ))}
        </div>
    )
}