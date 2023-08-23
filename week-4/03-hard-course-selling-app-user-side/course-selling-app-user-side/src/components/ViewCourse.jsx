import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import { useParams } from "react-router-dom";

function ViewCourse(){
    const {courseId} = useParams();
    const [course, setCourse] = useState([]);

    const token = localStorage.getItem('user-token-key');
    console.log(token);
    useEffect(()=>{
        async function fetchData(){
        try{
            const res = await axios.get(`http://localhost:3000/users/courses/${courseId}`, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            });
            const data = res.data;
            setCourse(data.course);

        }catch(err){
            console.error(err);
        }

    }
    fetchData();
    },[courseId]);

    //useEffect(()=>{}, [courseId]);
    
    //console.log(course);

    const handlePurchaseButton = async ()=>{
        try{
            const res = await axios.post(`http://localhost:3000/users/courses/${courseId}`,null, {
                headers:{
                    authorization: `Bearer ${token}`
                }
            });
            const data = res.data;
            console.log(data);
        }catch(err){
            console.error(err);
        }
    }
    return(
        <div>
            <Navbar/>
            <Course
            id = {course.id}
            title = {course.title}
            description = {course.description}
            price = {course.price}
            imageLink = {course.imageLink}
            published = {course.published}
            />
            <button onClick={handlePurchaseButton}>Purchase Course</button>

        </div>
    )
}

function Course(props){
    return(
        <div>
            
            <h2>{props.title}</h2>
            <ul>
                <li>{props.description}</li>
                <li>{props.price}</li>
                <li>{props.imageLink}</li>
                <li>{props.description}</li>
            </ul>
            
        </div>
    )
}

export default ViewCourse;