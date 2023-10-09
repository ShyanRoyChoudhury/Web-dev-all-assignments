import { Todo } from "./todo";

export type TodoCreationParams = Pick<Todo, "title" | "description">

/* above code is same as =>

export type todoCreationParams {
    title: string,
    description: string
} */    //  basically picking certain types(not all) from interface Todo

export class TodoService{
    public get(todoId: string): Todo{
        return {
            id: todoId,
            title: 'mock todo',
            description: 'mock todo desc',
            done: false
        }
    }
    
    public create(todoCreationParams: TodoCreationParams): Todo{
        console.log('mock db call');
        return {
            id: "1",
            title: 'mock todo',
            description: 'mock todo desc',
            done: false
        }
    }
}