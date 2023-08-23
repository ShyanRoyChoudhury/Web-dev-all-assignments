import { useEffect, useState } from "react";
import axios from 'axios';

function Courses(){
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('user-token-key');
        //console.log(token)
        const fetchCourses = async ()=>{
            const res = await axios.get("http://localhost:3000/users/courses",null,{
                headers:{
                    authorization: 'bearer '+ token
                }
            });
            const data = res.data;
            setCourses(data.courses)
        }

        fetchCourses();
    },[courses]);

    useEffect(()=>{
        console.log(courses);
    },[courses])
    

return(
    <div>
        {courses.map(c=>{
            return <MapCourses
            key = {c.id}
            title = {c.title}
            description = {c.description}
            price = {c.price}
            imageLink = {c.imageLink}
            published = {c.published}
            />
        })}
    </div>
)
}

function MapCourses(props){
    return(<div>
        <h1>{props.id}</h1>
        <h2>{props.title}</h2>
        <div>
            <ul>
            <li>{props.description}</li>
            <li>{props.price}</li>
            <li>{props.imageLink}</li>
            <li>{props.published}</li>
            </ul>
        </div>
    </div>)
}
export default Courses;