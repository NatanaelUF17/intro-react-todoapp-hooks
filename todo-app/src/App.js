import { useState } from "react";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !==id));
  };

  const removeDoneTodos = (id) => {
    setTodos(todos.filter((todo) => !todo.is_done));
  };

  const toggleDone = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return  {
          ...todo,
          is_done: !todo.is_done,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const markAllDone = () => {
    setTodos(todos.map((todo) => {
      if (!todo.is_done) {
        return {
          ...todo,
          is_done: true,
        };
      }
      return todo;
    }));
  };

  return (
    <div>
      <NewTodoForm addTodo={addTodo} />
      <button onClick={markAllDone}>Mark All Done</button>
      <button onClick={removeDoneTodos}>Remove Done</button>
      <TodoList 
        todos={todos}
        removeTodo={removeTodo}
        toggleDone={toggleDone}
      />
    </div>
  );
}

export default App;

