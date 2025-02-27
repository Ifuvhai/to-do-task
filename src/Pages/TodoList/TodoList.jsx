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

  // Handle input changes
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add Task
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
    .then(data => console.log("Task created successfully:", data))
    .catch(error => console.error("Error creating task:", error));
    
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle Status (Pending <-> Completed)
  const toggleStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" } : task
    ));
  };




 

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">To-Do List</h2>

      {/* Task Input Form */}
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

      {/* Task List */}
      {tasks.length === 0 ? <p className="text-center">No tasks yet.</p> : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="bg-white p-4 mb-2 shadow rounded">
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm">Due: {task.dueDate} | Priority: {task.priority}</p>
              <p className={`font-bold ${task.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                {task.status}
              </p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => toggleStatus(task.id)} className="bg-green-500 text-white px-3 py-1 rounded">
                  {task.status === "Pending" ? "Mark Complete" : "Mark Pending"}
                </button>
                <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
