import axios from 'axios';
import { useState } from 'react';

function Login(){
    const [user, setUser] = useState({
        username:'',
        password:''
    });

    const handleInputData = (e)=>{
        e.preventDefault();
        setUser({...user, [e.target.name]:e.target.value});
    }
    
    const handleButton = async ()=>{
        console.log(user)
        const res = await axios.post("http://localhost:3000/users/login", null,{
            headers:{
                username:user.username,
                password:user.password
            }
        });
        console.log(res.data);
        localStorage.setItem('user-token-key', res.data.token)
    }

    return(
        <div>
            <input name='username' placeholder='Username' onChange={handleInputData}/>
            <br/>
            <input name='password' placeholder='Password' onChange={handleInputData}/>
            <br/>
            <button onClick={handleButton}>Login</button>
            <br/>
            New User?<a href='/users/signup'>Signup</a>
        </div>
    )
}

export default Login;