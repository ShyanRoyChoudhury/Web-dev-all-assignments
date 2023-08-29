import { useEffect, useState } from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import { Typography } from "@mui/material";

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

function ShowAllCourses() {
    const courses = usePageRefresh()

    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    return (
        <a href="http://localhost:3000/admin/">
        <div style={{display:"flex", flexWrap:'wrap', justifyContent:'center'}}>
                
            {/*<Typography variant="h3">Courses Available</Typography>*/}
            <br/><br/>
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
            
        </div></a>
        )
}

export function Course(props) {
    return( <div>
        
        <Card style={{
                width:300,
                margin:20,
                
                
            }}>
        
        {/*<Typography>{props.id}</Typography>
        <Typography variant="h5">{props.title}</Typography>
        
        <Typography>{props.description}</Typography>
        <img src={props.imageLink} style={{width:300}}></img>
        <Typography>{props.price}</Typography>*/}
         <Typography textAlign={"center"} variant="h5">{props.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{props.description}</Typography>
        <Typography>{props.price}</Typography>
        <img src={props.imageLink} style={{width: 300}} ></img>
        
        
        {/*props.published*/}
            
        </Card>
    </div>
    )
}

export default ShowAllCourses;