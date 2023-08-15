import { useEffect, useState } from "react";
import axios from 'axios';



function usePageRefresh(){
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                //const token = sessionStorage.getItem('token-key');
                const token = localStorage.getItem('token-key');
                //console.log(token)
                const res = await axios.get("http://localhost:3000/admin/courses", null, {
                    headers:{
                        authorization: 'bearer '+token
                    }
                });
                const data = res.data;
                console.log(data);
                
                setCourses(data.courses);

            }catch(err){
                console.error('Error Fetching data',err);
            }
        }

        fetchData();
        //setInterval(fetchData, 1000);
    },[]);
    return courses
    
}

function ShowCourses() {
    const courses = usePageRefresh()

    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    return (
        <div>
            <h1>Courses Available</h1>
            {courses.map(c =>{
                return <Course 
                    key={c.id}
                    title={c.title}
                    description={c.description}
                    price={c.price}
                    imageLink={c.imageLink}
                    published={c.published} 
                />
                })}
        </div>
        )
}

function Course(props) {
    return( <div>
        <h1>{props.id}</h1>
        <h2>{props.title}</h2>
        <p>
            <div>{props.description}</div>
            <div>{props.price}</div>
            <div>{props.imageLink}</div>
            <div>{props.published}</div>
        </p>
    </div>
    )
}

export default ShowCourses;