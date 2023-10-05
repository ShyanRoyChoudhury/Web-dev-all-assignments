import { Signup } from "ui";

export default function SignupPage(){
    return (<>
        hi from signup
        <Signup onClick = {async (username, password)=>{
            const response = await axios.post('/admin/signup', {
                username,
                password
            }) 
        }}/>   
    </>)
}