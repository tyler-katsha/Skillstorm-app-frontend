import { Link } from "react-router-dom"

export const Home = () => {
    return(
        <div>
            <Link to='/login'>Login</Link>
            <br/>
            <Link to='/register'>Register</Link>
            <br/>
            <Link to='/'>Home</Link>
            <br/>
            Hello world
        </div>
    )
}