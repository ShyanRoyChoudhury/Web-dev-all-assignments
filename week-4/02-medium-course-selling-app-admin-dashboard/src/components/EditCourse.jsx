import { useState } from 'react';
import axios from 'axios';

function Edit(){
    const [course, updateCourse] = useState([]);
    const handleInputData = (e)=>{
        e.preventDefault();
        updateCourse({...course,[e.target.name]:e.target.value})
    };
    const updateButton = async (id)=>{
        try{
            const token = localStorage.getItem('token-key');
            if(token){
                const response = await axios.put(`http://localhost:3000/admin/courses/${id}`, course, {
                    headers:{
        
                    }
                });
                console.log(response.data);

            }else{
                console.log('Authentication error: error in token');
            }

        }catch(err){
            console.error(err);
        }
    };

    return <div>
        <h1>Edit Course</h1>
        <input type="text" placeholder='title' name='title' onChange={handleInputData}/>
        <br/>
        <input type="text" placeholder='description' name='description' onChange={handleInputData}/>
        <br/>
        <input type="text" placeholder='price' name='price' onChange={handleInputData}/>
        <br/>
        <input type="text" placeholder='imagelink' name='imageLink' onChange={handleInputData}/>
        <button onClick={updateButton}>Update Course</button>
    </div>
}


export default Edit;