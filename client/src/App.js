import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://mern-todo-gq3y.onrender.com/api" || "http://localhost:8000/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/todos`).then((res) => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (!text) return;
    const res = await axios.post(`${API_URL}/todos`, { text });
    setTodos([...todos, res.data]);
    setText("");
  };

  const toggleTodo = async (id, completed) => {
    const res = await axios.put(`${API_URL}/todos/${id}`, {
      completed: !completed,
    });
    setTodos(todos.map((t) => (t._id === id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h1>MERN Todo</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              onClick={() => toggleTodo(todo._id, todo.completed)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
