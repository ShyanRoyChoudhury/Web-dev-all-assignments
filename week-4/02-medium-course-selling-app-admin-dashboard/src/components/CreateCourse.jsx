import React from "react";
import axios from 'axios';
import Navbar from "./Navbar";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [course, setCourse] = React.useState({
        title: '',
        description: '',
        price: 0,
        imageLink: '',
        published: false
    });


    const handleInputData = (e)=>{
        e.preventDefault();
        setCourse({...course, [e.target.name]:e.target.value});
    }

    const submitButton = ()=>{
        // const token = sessionStorage.getItem('token-key');
        const token = localStorage.getItem('token-key');
        console.log(token)
        axios.post("http://localhost:3000/admin/courses", course, {
            headers:{
                authorization: 'bearer '+token
            }
        });
    };

    return <div>
        <Navbar />
        <h1>Create Course Page</h1>
        <input type={"text"} name="title" placeholder="Course Title" onChange={handleInputData} />
        <br/>
        <input type="text" name="description" placeholder="Description" onChange={handleInputData}/>
        <br/>
        <input type="price" name="price" placeholder="Price" onChange={handleInputData}/>
        <br/>
        <input type="imageLink" name="imageLink" placeholder="Link" onChange={handleInputData}/>
        <br/>
        <button onClick={submitButton}>Create Course</button>
    </div>
}
export default CreateCourse;