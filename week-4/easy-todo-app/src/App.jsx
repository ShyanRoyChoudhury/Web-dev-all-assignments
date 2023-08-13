import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function useTodos(){
  const [todos, setTodos] = useState([]);
  
  useEffect(()=> {
    fetch("http://localhost:3000/todos", {
    method: "Get"
  }).then((res)=>{
    res.json().then((data)=>{
      console.log(data);
      setTodos(data);
    });
  });


    setInterval(()=>{
     fetch("http://localhost:3000/todos", {
    method: "Get"
  }).then((res)=>{
    res.json().then((data)=>{
      console.log(data);
      setTodos(data);
    });
  }); 
    },2000);
  },[]);

  return todos
}

function App() {
  // fetch all todos from server
  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
        <HandlePostData/>
        <HandleDeleteButton/>
      </div>
    </>
  )
}

function HandleDeleteButton(){

  const todos = useTodos()

   const handleDeleteButton = (id)=>{
    fetch(`http://localhost:3000/todos/${id}`,{
      method:"DELETE"
    }).then(()=>{
      const updatedTodos = todos.filter((todo) => todo.id!==id)
      console.log(updatedTodos);
      //setTodosState(updatedTodos);
    })
  }
  
  return(
    <div>
    {todos.map((todo)=>{
          return <Todo
            key={todo.id}
            title={todo.title}
            description={todo.description}
            onDelete={()=> handleDeleteButton(parseInt(todo.id))}
          />
        })}
    </div>
  )
}

function HandlePostData(){
  //const title = inputData

  const data = {title:"", description:"", id:0};
  const [inputData, setInputData] = useState(data);

  const handleInputData = (e)=>{
    setInputData({...inputData, [e.target.name]:e.target.value});
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:3000/todos", inputData).then((response)=>{
      console.log(response);
    })
  }
  return(
    <>
    <input type="text" value={inputData.title} name='title' placeholder='Title' onChange={handleInputData}/><br/>
    <input type='text' value={inputData.description} name='description' placeholder='Description' onChange={handleInputData}/><br/>
    <button onClick={handleSubmit}>Submit</button>
    </>
  )
}


function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    return <div>
        
        {props.id}
        {props.title}
        {props.description}
        <button onClick={props.onDelete}>Delete</button>
    </div>
}

export default App
