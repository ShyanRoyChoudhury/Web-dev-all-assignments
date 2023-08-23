import { useState } from "react";
import axios from 'axios';

function Signup(){

    const [user, setUser] = useState({
        username:'',
        password:''
    });

    const handleInputData = (e)=>{
        e.preventDefault();
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleButton = async ()=>{
        const res = await axios.post("http://localhost:3000/users/signup", user);
        const data = res.data;
        console.log(data);
    }

return(
    <div>
        <h2>Signup</h2>
        <input type="text" placeholder="Name" name="username" onChange={handleInputData}/>
        <br/>
        <input type="text" placeholder="Password" name="password" onChange={handleInputData}/>
        <button onClick={handleButton}>Signup</button>
        <br/>
        Already a user?<a href="users/login">Login</a>
    </div>
)
}

export default Signup;