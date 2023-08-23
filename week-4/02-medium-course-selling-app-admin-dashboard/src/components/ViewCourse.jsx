
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';


function useGetData(){
    const [course, setCourse] = useState(null);
    //const token = localStorage.getItem('token-key');
    const {id} = useParams();
    console.log('id:'+id)
    useEffect(()=>{
        const fetchData = async ()=>{   
            try{
    
                
                const res = await axios.get(`http://localhost:3000/admin/viewcourse/${id}}`) /*, null, {
                    headers:{
                        authorization: 'bearer '+ token
                    }
                });*/
                const data = res.data;
                console.log(data)
                console.log('data.course:',data.course)
                setCourse(data.course);
    
            }catch(err){
                console.error('Error Fetching data',err);
            }
        }
        fetchData();
        
    },[id]);

    return course;
}
function ViewCourse(){
    const course = useGetData();
    console.log('Course:',course)
    if(!course){
        return <div>Loading.....</div>
    }else{
    return(
        <div>
            <Navbar/>
            COURSE:
            <Course
            id = {course.id}
            title = {course.title}
            description = {course.description}
            price = {course.price}
            imageLink = {course.imageLink}
            published = {course.published}
            />
        </div>
        )
    }
}

function Course(props){
    return <div>
        <h3>Course ID:{props.id}</h3>
        <h2>{props.title}</h2>
        <div>
            <ul>
                <li>{props.description}</li>
                <li>{props.price}</li>
                <li>{props.imageLink}</li>
                <li>{props.published}</li>
            </ul>
        </div>
    </div>
}

export default ViewCourse;