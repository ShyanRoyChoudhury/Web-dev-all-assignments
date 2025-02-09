import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router.js";
import { Course } from "@/store/atoms/course";
import { BASE_URL } from "@/config";

type testInter = Partial<Course>

export function Courses({courses}: {courses: testInter[]}){
    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map((course)=>{
            return <Course course = {course}/>
        })}
    </div>
}

export function Course({course}: {course : testInter}) {
    const router = useRouter()

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{width: 300}} ></img>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                router.push("/course/" + course._id);
            }}>Edit</Button>
        </div>
    </Card>

}

export async function getServerSideProps(){
    console.log('test');
    const response = await axios.get(`${BASE_URL}/admin/courses/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
        return{
            props:{
                courses: response.data.courses,
            }
        }
}

export default Courses