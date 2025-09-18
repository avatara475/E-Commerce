import { useState } from "react";

const Sample = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [todos, setTodos] = useState([]); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill both fields!");
      return;
    }

    setTodos([...todos, formData]); // add todo to list
    setFormData({ title: "", content: "" }); // reset form
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{border:'solid black 2px'}}
        />
        <input
          type="text"
          placeholder="Enter content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          style={{border:'solid black 2px'}}
        />
        <button type="submit" style={{border:'solid black 2px'}}>Add Task</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <strong>{todo.title}</strong>: {todo.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sample;
