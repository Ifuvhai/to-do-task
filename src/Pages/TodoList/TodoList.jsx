import { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = () => {
    if (!newTask.title.trim()) return; // Prevent empty tasks

    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", description: "", dueDate: "", priority: "Medium", status: "Pending" });

    fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    })
    .then(response => response.json())
    .then(data => alert("Task created successfully:"))
    .catch(error => console.error("Error creating task:", error));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">To-Do List</h2>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button onClick={addTask} className="w-full bg-blue-600 text-white p-2 rounded">Add Task</button>
      </div>
    </div>
  );
};

export default TodoList;
