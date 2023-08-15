
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Navbar from './components/navbar';

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.


function Landing() {
    
    const navigate = useNavigate();
    const [courseId, setCourseId] = useState(null);
    const handleInputData = (e)=>{
        e.preventDefault();
        setCourseId({...courseId, [e.target.name]:e.target.value})
    }

    const searchButton = async ()=>{
        navigate("/EditCourse");
    }


    return <div>
        <h1>Welcome to course selling website!</h1>
        {/*Navbar*/}
        <input placeholder="Search course" name="courseId" onChange={handleInputData}/>
        <button onClick={searchButton}>Search</button>


        <br/>
        <a href="/register">Register</a>
        <br/>
        <a href="/login">Login</a>
        <br/>
        <a href="/showcourses">Show Courses</a>
        <br/>
        <a href="/createcourse">Create Course</a>
        <br/>
    </div>
}

export default Landing;