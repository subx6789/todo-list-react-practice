import { useState,useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const persistData=(newList)=>{
    localStorage.setItem("todos",JSON.stringify({todos:newList}))
  }
  const handleAddTodos = (newTodo) => {
    const newTodos = [...todos, newTodo];
    persistData(newTodos);
    setTodos(newTodos);
  };
  const handleDeleteTodos = (index) => {
    const newTodos = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodos);
    setTodos(newTodos);
  };
  const handleEditTodos = (index) => {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodos(index);
  };
  useEffect(()=>{
    if(!localStorage){
      return
    }
    let localTodos=localStorage.getItem("todos");
    if(!localTodos){
      return
    }
    localTodos=JSON.parse(localTodos).todos
    setTodos(localTodos);
  },[])
  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleDeleteTodos={handleDeleteTodos}
        handleEditTodos={handleEditTodos}
        todos={todos}
      />
    </>
  );
}

export default App;
