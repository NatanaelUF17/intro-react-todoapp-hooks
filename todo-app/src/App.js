import React, { useState, useCallback, useEffect } from "react";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  // TODO: Adding the todo values to the todos arrays and clean up the input
  const formSubmitted = useCallback(
    (event) => {
      event.preventDefault();
      if (!newTodo.trim()) return;
      setTodos([
        {
          id: todos.length ? todos[0].id + 1 : 1,
          content: newTodo,
          done: false,
        },
        ...todos
      ]);
      setNewTodo("");
    },
    [newTodo, todos]
  );

  // TODO: Adding new todo to the array
  const addTodo = useCallback(
    (todo, index) => (event) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1, {
        ...todo,
        done: !todo.done,
      });
      setTodos(newTodos);
    },
    [todos]
  );
  
  // TODO: Remove specific todo from the todos array
  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);

  // TODO: Mark all todo done
  const markAllDone = useCallback(() => {
    const updatedTodos = todos.map((todo) => {
      return {
        ...todo,
        done: true
      }
    });
    setTodos(updatedTodos);
  }, [todos]);

  // TODO: Using useEffect to call todos once at the beginning
  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo">Enter a Todo:</label>
        <input
          id="newTodo"
          name="newTodo"
          value={newTodo}
          onChange={onNewTodoChange}
        />
        <button onClick={addTodo}>Add Todo</button>
      </form>
      <button onClick={markAllDone}>Mark All Done</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={addTodo(todo, index)}
            />
            <span className={todo.done ? 'done' : ''}>{todo.content}</span>
            <button onClick={removeTodo(todo)}>Remove Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
