
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.

import { blue } from "@mui/material/colors";


function Landing() {

    return <div style={{backgroundcolor: blue}}>
        <h1>Welcome to course selling website!</h1>
        <br/>
        <a href="/showallcourses">Show Courses</a>
        <br/>
        <a href="/createcourse">Create Course</a>
        <br/>
    </div>
}

export default Landing;