import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Course } from './ShowAllCourses';
import { Button, Card, TextField, Typography } from '@mui/material';

function EditCard({setCourse}){
    const [course, updateCourse] = useState([]);
    const {id} = useParams();
    const handleInputData = (e)=>{
        e.preventDefault();
        if(e.target.value !== ''){

            updateCourse({...course,[e.target.name]:e.target.value})
        }
    };
    const updateButton = async ()=>{
        try{
            const token = localStorage.getItem('token-key');
            if(token){
                const response = await axios.put(`http://localhost:3000/admin/courses/${id}`, course, {
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setCourse(course);
            }else{
                console.log('Authentication error: error in token');
            }

        }catch(err){
            console.error(err);
        }
    };

    return <div style={{
            display:"flex",
            justifyContent:"center"
        }}>
        <Card style={{
            width:500,
            padding:10
        }}>
            <Typography textAlign="left" variant='h5'>Edit Course Details</Typography>
            <TextField fullWidth='true' type="text" placeholder='title' name='title' onChange={handleInputData}/>
            <br/>
            <TextField fullWidth='true' type="text" placeholder='description' name='description' onChange={handleInputData}/>
            <br/>
            <TextField fullWidth='true' type="text" placeholder='price' name='price' onChange={handleInputData}/>
            <br/>
            <TextField fullWidth='true' type="text" placeholder='imagelink' name='imageLink' onChange={handleInputData}/>
            <br/>
            <Button variant="contained"onClick={updateButton}>Update Course</Button>
        </Card>
    </div>
}

function CourseCard(props){
    /*const {id} = useParams();
    const [course, setCourse] = useState([]);
    useEffect(()=>{
            const func = async ()=>{
        
            const res= await axios.get(`http://localhost:3000/admin/viewcourse/${id}`);
            setCourse(res.data.course);
        
        }
        func();
        },[])*/

        const course = props.course;
    return(
        <div style={{
            display:"flex",
            justifyContent:"center"
        }}>
        {/*<div style={{
            display:"flex",
            justifyContent:"center"
        }}>

            <Course 
                    key={course.id}
                    title={course.title}
                    description={course.description}
                    price={course.price}
                    imageLink={course.imageLink}/>
            
        </div>*/}
        <Card style={{width:400,
                padding:10}}>
            <img src={course.imageLink}></img>
            <Typography variant={'h5'}>{course.title}</Typography>
            <Typography variant={'h5'}>{course.description}</Typography>
            <Typography variant={'h5'}>{course.price}</Typography>
        </Card>
        </div>
    )
}


function EditCourse(){

    const {id} = useParams();
    const [course, setCourse] = useState([]);
    useEffect(()=>{
            const func = async ()=>{
        
            const res= await axios.get(`http://localhost:3000/admin/viewcourse/${id}`);
            setCourse(res.data.course);
        
        }
        func();
        },[]);

    if(!course){
        return(
            <div>
                Loading.....
            </div>
        )
    }


    return(
        <div>
            <CourseCard course={course}/>
            <EditCard setCourse={setCourse}/>
            
        </div>
    )
}
export default EditCourse;