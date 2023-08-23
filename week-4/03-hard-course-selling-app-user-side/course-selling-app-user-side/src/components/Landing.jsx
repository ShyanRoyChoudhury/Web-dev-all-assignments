import Navbar from "./Navbar";

function Landing(){
    return(
        <div>
            <Navbar/>
            <h1>Landing Page</h1>
            <a href="users/courses">Show all courses</a>
            <br/>
            <a href="users/courses/purchased">Show purchased courses</a>
            <br/>
            <a href="users/login">Login</a>
            <br/>
            New User?-
            <a href="users/signup">Signup</a>
        </div>
    )
}

export default Landing;