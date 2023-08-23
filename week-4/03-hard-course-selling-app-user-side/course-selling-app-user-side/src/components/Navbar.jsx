import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate()
    const [courseId, setCourseId] = useState('');

    const handleInputData = (e)=>{
        setCourseId(e.target.value);
    }
    const handleSearchButton = ()=>{
        navigate(`/users/courses/${courseId}`);
    }
    
    return(
        <div>
            <input placeholder="Search course" name="courseId" onChange={handleInputData}/>
            <button onClick={handleSearchButton}>Search</button>
        </div>
    )
}

export default Navbar;