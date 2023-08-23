import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
function PurchasedCourses(){

    const [courses, setCourses] = useState([]);
    const token = localStorage.getItem("user-token-key");
    useEffect(()=>{
        async function fetchData(){
        const res = await axios.get("http://localhost:3000/users/purchasedCourses",{
            headers:{
                authorization: `Bearer ${token}`
            }
        });
        const data = res.data
        console.log(data);
        setCourses(data.purchasedCourses);
        }
        setInterval(()=>{
            fetchData();
        }, 1000)
        
    },[]);

    return(
        <div>
            <Navbar/>
            {courses.map(c=>{
                return <Courses
                title={c.title}
                key = {c.id}
                description={c.description}
                imageLink={c.imageLink}
                />
            })}

        </div>
    )
}

function Courses(props){
    return(
        <div>
            <h2>{props.title}</h2>
            {props.id}
            <ul>
                <li>{props.description}</li>
                <li>{props.imageLink}</li>
            </ul>
        </div>
    )
}
export default PurchasedCourses;