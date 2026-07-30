import { Link } from "react-router-dom"

export const Home = () => {
    return(
        <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Login</Link>
            <Link to='/'>Home</Link>

            Hello world
        </div>
    )
}