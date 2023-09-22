////////////////// Generics



function getFirstElement<T>(arr: T[]): T{
  return arr[0];
}

type USER = {
  name: string;
  age: number;
}

let ans1 = getFirstElement<number>([1,2,3,4]); 
let ans2 = getFirstElement<string>(['ONE', 'two', 'three'])
let ans3 = getFirstElement<USER>([{
  name: "shyan",
  age: 23
},{
  name: "Urja",
  age:18
}]);
//ans2 = ans2.toLowerCase();
console.log(ans3);

function swap<T>(a: T,b: T): [T, T]{
  return [b, a];
}

let ans = swap<string>("urja", "shyan");



function swap2<T, U>(a:T, b:U): [U, T]{
  return [b,a];
}

const ans5 = swap2("Shyan", 23);
console.log(ans5);



//////////////////////////////////////////
// Partials in ts

interface Todo{
  title: string;
  description: string;
  id: string;
  done: boolean;
}

type UpdateTodoInput = Partial<Todo>;

function UpdateTodo(id: number, newProp: UpdateTodoInput){

}

UpdateTodo(1, {
  description: "hehehehhehehehe"
});

//////////////////////////////////////////////////////

