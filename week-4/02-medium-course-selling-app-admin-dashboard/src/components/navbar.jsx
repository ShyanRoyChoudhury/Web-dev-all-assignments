import { useState } from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import EditCourse from './components/EditCourse'

function Navbar(){
    const navigate = useNavigate();
    const [courseId, setCourseId] = useState(null);
    const handleInputData = (e)=>{
        e.preventDefault();
        setCourseId({...courseId, [e.target.name]:e.target.value})
    }

    const searchButton = async ()=>{
        navigate("/EditCourse");
    }

    return  <div>
        <input placeholder="Search course" name="courseId" onChange={handleInputData}/>
        <button onClick={searchButton}>Search</button>
    </div>
}

export default Navbar;