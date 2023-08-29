import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
//import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import axios from 'axios';

function Navbar(){
    const navigate = useNavigate();
    const [courseId, setCourseId] = useState('');
    const handleInputData = (e)=>{
        e.preventDefault();
        setCourseId(e.target.value)
    }

    const token = localStorage.getItem('token-key');
    const [username, SetUsername] = useState(null);

    useEffect(()=>{
            axios.get('http://localhost:3000/admin/me',{
                headers:{
                    authorization: `Bearer ${token}`
                }
            }).then((res)=>{
                SetUsername(res.data.username);        
            })
        },[])
    
    if(username){

        return  <div style={{
            display:"flex",
            justifyContent:"space-between",
            backgroundColor:"white",
            padding:5
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
        
                    <button onClick={()=>{
                        navigate(`/viewcourse/${courseId}`);
                    }}>Search</button>
                </div>
    
                <div >
                    {username}
                    <Button variant="contained" style={{marginRight:4}}
                    onClick={()=>{
                        localStorage.setItem('token-key', null);
                        window.location = '/login'
                    }}>Logout</Button>
                    {/*<Button variant="contained" style={{marginRight:5}}
                    onClick={()=>{
                        navigate("/register");
                        }}>Signup</Button>*/}
                </div>
            </div>
        }
        else{

        return  <div style={{
            display:"flex",
            justifyContent:"space-between",
            backgroundColor:"white",
            padding:5
            }}>
                <div>
                    <Link to={"/"}>
                        <Typography variant={"h6"}>Dashboard</Typography>
                    </Link>
                </div>
                
    
                <div>
                    <Button variant="contained" style={{marginRight:4}}
                    onClick={()=>{
                        navigate('/login');
                    }}>Signin</Button>
                    <Button variant="contained" style={{marginRight:5}}
                    onClick={()=>{
                        navigate("/register");
                        }}>Signup</Button>
                </div>
            </div>
        }
    }

export default Navbar;