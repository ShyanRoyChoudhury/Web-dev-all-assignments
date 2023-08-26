import React from "react";
//import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from "@mui/material";



/// File is incomplete. You need to add input boxes to take input for users to register.
function Signin() {
    const data = {
        username: "",
        password: ""
    }

    const [cred, setCred] = React.useState(data)

    const handleInputData = (e)=>{
        e.preventDefault();
        setCred({...cred, [e.target.name]:e.target.value});
    }
    const registerCred = async () =>{
        console.log(cred)
        //const response = await axios.post("http://localhost:3000/admin/signup", cred);
        //console.log(response.data);
    };

    return <div>
        
            <div style={{
                paddingTop: 100,
                marginBottom:10,
                display:"flex",
                justifyContent:"center"}}>
                <Typography variant={"h6"}>
                    Welcome back. Sign in below.
                </Typography>
            </div>
        

        <div style={{display:"flex",
                justifyContent:"center"}}>
            <Card variant="outlined" style={{padding:20, width: 400}}>
                <TextField 
                    id="outlined-basic" 
                    fullWidth={true}
                    type={"text"} 
                    name="username" 
                    label="Username" 
                    variant="outlined" 
                    onChange={handleInputData}/>
                <br/><br/>
                <TextField 
                    id="outlined-basic"
                    fullWidth={true} 
                    type={"password"} 
                    name="password" 
                    label="Password" 
                    variant="outlined" 
                    onChange={handleInputData}/>
                <br/><br/>
                <Button variant="contained" onClick={registerCred}>Signin</Button>

            </Card>
            <br/>
        </div>
        <div style={{display:"flex",
            justifyContent:"center",
            marginTop:5
        }}>
            Already a user? <a href="/login">Login</a>
        </div>
        
    </div>
}

export default Signin;