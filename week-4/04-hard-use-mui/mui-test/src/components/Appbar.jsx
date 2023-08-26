import React from 'react';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import "./index.css"

function Appbar(){
    const navigate = useNavigate();

    return(
        <div style={{display:"flex",
            justifyContent:"space-between",
            paddingTop:"4px",
            margin:0
        }}>
            <div style={{
            }}>
                <Typography variant={"h6"}>
                    Course selling site
                </Typography>
            </div>
            <div style={{display:"flex"}}>
                <div style={{marginRight:10}}>
                    <Button variant='contained' onClick={()=>{
                        navigate('/register');
                    }}>Signup</Button>
                </div>
                <div>
                    <Button variant='contained' onClick={()=>{
                        //window.location = "/signin"
                        navigate('/signin');
                    }}>Signin</Button>
                </div>
                
            </div>
        </div>
    )
}

export default Appbar;