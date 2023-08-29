import { useState } from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [cred, setCred] = useState({
        'username': '',
        'password': ''
    });

    const handleInputData = (e)=>{
        e.preventDefault();
        setCred({...cred,[e.target.name]:e.target.value});
    }
    const loginButton = async ()=>{
        console.log(cred)
        try{
            const response = await axios.post("http://localhost:3000/admin/login", null, {
                headers: 
                {
                     'username': cred.username,
                     'password': cred.password
                 }
            });
            console.log(response.data);
            console.log(response.data.token)
            //sessionStorage.setItem('token-key', response.data.token);
            localStorage.setItem('token-key', response.data.token) ;
            window.location = '/'
        }catch(err){
            console.error(err);
        }
    }
    return <div style={{padding:0,
                        margin:0}}>
        <center>
            <div style={{paddingTop:100,
                        marginBottom:10}}>
            <Typography variant={"h6"}>Welcome Back</Typography>
            </div>
        </center>
        
        <center>
            <Card variant="outlined" style={{
            width:400,
            padding:20
            
            }}>
                <TextField type="text" 
                name="username"
                fullWidth={true}
                label="Username" 
                variant="outlined" 
                onChange={handleInputData}/>
                <br/><br/>
                <TextField type="password" 
                name="password"
                fullWidth={true}
                label="Password" 
                variant="outlined" 
                onChange={handleInputData}/>
                <br/><br/>
                <Button variant="contained"
                onClick={loginButton}>Login</Button>
            </Card>
        </center>
        <center>    
            <div style={{marginTop:15}}>
                New here? <a href="/register">Register</a>
            </div>
    
        </center>
    </div>    
}

export default Login;