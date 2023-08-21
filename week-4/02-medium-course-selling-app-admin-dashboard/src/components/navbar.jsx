import { useState } from 'react';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import EditCourse from './components/EditCourse'

function Navbar(){
    const navigate = useNavigate();
    const [courseId, setCourseId] = useState('');
    const handleInputData = (e)=>{
        e.preventDefault();
        setCourseId(e.target.value)
    }

    //localStorage.setItem('search-id', courseId);
    const searchButton = async ()=>{
        navigate(`/viewcourse/${courseId}`);
    }

    return  <div>
        <Link to={"/"}>
            <div>Dashboard</div>
        </Link>
        <input placeholder="Search course" name="courseId" onChange={handleInputData}/>
        <button onClick={searchButton}>Search</button>
    </div>
}

export default Navbar;