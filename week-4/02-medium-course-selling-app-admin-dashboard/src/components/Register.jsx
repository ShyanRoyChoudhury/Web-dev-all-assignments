import React from "react";
import axios from 'axios';
/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
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
        const response = await axios.post("http://localhost:3000/admin/signup", cred);
        console.log(response.data);
    };

    return <div>
        <h1>Register to the website</h1>
        <br/>
        <input type={"text"} name="username" placeholder='Username' onChange={handleInputData} />
        <br/>
        <input type="text" name="password" placeholder="Password" onChange={handleInputData} />
        <button onClick={registerCred}>Register</button>
        <br/>
        Already a user? <a href="/login">Login</a>
    </div>
}

export default Register;