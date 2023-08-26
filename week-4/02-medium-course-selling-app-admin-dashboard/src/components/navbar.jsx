import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
//import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

function Navbar(){
    const navigate = useNavigate();
    const [courseId, setCourseId] = useState('');
    const handleInputData = (e)=>{
        e.preventDefault();
        setCourseId(e.target.value)
    }

    //localStorage.setItem('search-id', courseId);
    const searchButton = ()=>{
        navigate(`/viewcourse/${courseId}`);
    }

    return  <div style={{
        display:"flex",
        justifyContent:"space-between"
    }}>
        <div>
            <Link to={"/"}>
                <Typography variant={"h6"}>Dashboard</Typography>
            </Link>
        </div>
        <div>
            <Input 
            type="search"
            name="courseId"
            variant="standard"
            onChange={handleInputData}
            placeholder="Search course" 
            />

            <button onClick={searchButton}>Search</button>
        </div>
        <div >
            <Button variant="contained" style={{marginRight:4}}
            onClick={()=>{
                navigate("/Login");
            }}>Signin</Button>
            <Button variant="contained" style={{marginRight:5}}
            onClick={()=>{
                navigate("/register");
                }}>Signup</Button>
        </div>
    </div>
}

export default Navbar;