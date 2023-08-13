
import { useEffect, useState } from 'react';
import './App.css'

// let todo = {
//   title: "Go eat at 10",
//   description: "Chicken",
//   id: 2
// }; 


// custom hook
function useTodos(){
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    
    fetch("http://localhost:3000/todos",{
      method: "GET"
    }).then((response)=>{
      response.json().then((data)=>{
        console.log(data);
        setTodos(data);
      })
    });
  }, []);
  

  setInterval(() =>{
    fetch("http://localhost:3000/todos",{
      method: "GET"
    }).then((response)=>{
      response.json().then((data)=>{
        console.log(data);
        setTodos(data);
      })
    });
  }, 1000)

  return todos;
}


// hook
function App() {
  const todos = useTodos();

  return (
    <div>
    {todos.map(todo =>{
      return <div>
        {todo.title}
        {todo.desciption}
        <button>Delete</button>
        <br/>
      </div>
    })}

    </div>
    
  );
}


export default App;