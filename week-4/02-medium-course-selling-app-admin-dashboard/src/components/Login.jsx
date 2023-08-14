import { useState } from "react";
import axios from 'axios';
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
        }catch(err){
            console.error(err);
        }
    }
    return <div>
        <h1>Login to admin dashboard</h1>
        <br/>
        Username - <input type="text" name="username" placeholder="Username" onChange={handleInputData} />
        <br/>
        Password - <input type="text" name="password" placeholder="Password" onChange={handleInputData}/>
        <button onClick={loginButton}>Login</button>
        <br/>
        New here? <a href="/register">Register</a>
    </div>
}

export default Login;