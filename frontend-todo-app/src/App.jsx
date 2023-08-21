
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
        setTodos(JSON.stringify(data));
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
    Todo list
    {todos.map(t =>{
      return <Todo
        key = {t.id}
        title={t.title}
        description={t.desciption}/>
    })}

    </div>
    
  );
}

function Todo(props){
  return(
    <div>
      {props.id}
      {props.title}
      {props.description}
    </div>
  )
}

export default App;