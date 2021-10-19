import React, { useState, useCallback, useEffect } from "react";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, []);

  const formSubmitted = useCallback(
    (event) => {
      event.preventDefault();
      if (!newTodo.trim()) return;
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          content: newTodo,
          done: false,
        },
      ]);
      setNewTodo("");
    },
    [newTodo, todos]
  );

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
        <button>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
              type="checkbox" 
            />
            {todo.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
