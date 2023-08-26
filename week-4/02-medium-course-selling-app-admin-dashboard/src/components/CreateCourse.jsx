import React from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

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
        <center style={{paddingTop:100, marginBottom:10}}>
            <Typography variant="h5">Create Course Page</Typography>
        </center>
        
        <center>
            <Card variant="outlined" style={{
                width:400,
                padding:20}}>
                    <TextField type="text" 
                    name="title"
                    fullWidth={true}
                    placeholder="Course Title" 
                    variant="outlined" 
                    onChange={handleInputData}/>
                    <br/><br/>
                    <TextField type="text" 
                    name="description"
                    fullWidth={true}
                    placeholder="Description" 
                    variant="outlined" 
                    onChange={handleInputData}/>
                    <br/><br/>
                    <TextField type="price" 
                    name="price"
                    fullWidth={true}
                    placeholder="Price" 
                    variant="outlined" 
                    onChange={handleInputData}/>
                    <br/><br/>
                    <TextField type="imageLink" 
                    name="imageLink"
                    fullWidth={true}
                    placeholder="Link" 
                    variant="outlined" 
                    onChange={handleInputData}/>
                    <br/><br/>
                    <Button variant="contained"
                    onClick={submitButton}>Create Course</Button>
            </Card>
        </center>

    </div>
}
export default CreateCourse;