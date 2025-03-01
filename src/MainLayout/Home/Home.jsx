import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Home = () => {
    const [tasks, setAllTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filters, setFilters] = useState({ status: "", priority: "", dueDate: "" });
    const [editingTask, setEditingTask] = useState(null);
    const [updatedData, setUpdatedData] = useState({ title: "", description: "", dueDate: "", priority: "" });

    const fetchTasks = async () => {
        const res = await fetch("http://localhost:3000/tasks");
        const data = await res.json();
        setAllTasks(data);
        setFilteredTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const applyFilters = () => {
        let filtered = [...tasks];

        if (filters.status) {
            filtered = filtered.filter(task => task.status === filters.status);
        }

        if (filters.priority) {
            filtered = filtered.filter(task => task.priority === filters.priority);
        }

        if (filters.dueDate) {
            filtered = filtered.filter(task => task.dueDate === filters.dueDate);
        }

        setFilteredTasks(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [filters, tasks]);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}/status`, { method: "PATCH" });
            await response.json();
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task._id);
        setUpdatedData({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
        });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                setEditingTask(null);
                fetchTasks();
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <>
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">Welcome to the To-Do App</h1>
                <p>Manage your tasks efficiently with enhanced security features.</p>
            </div>

            {/* Filters Section */}
            <div className="flex gap-4 p-4">
                <select className="border p-2" onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <select className="border p-2" onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
                    <option value="">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <input
                    type="date"
                    className="border p-2"
                    onChange={(e) => setFilters({ ...filters, dueDate: e.target.value })}
                />
            </div>

            <h2>To-Do-Tasks: {filteredTasks.length}</h2>

            {/* Task List */}
            {filteredTasks.length === 0 ? (
                <p className="text-center">No tasks found.</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map((task) => (
                        <li key={task._id} className="bg-white p-4 mb-2 shadow rounded">
                            <h3 className="font-bold">{task.title}</h3>
                            <p>{task.description}</p>
                            <p className="text-sm">Due: {task.dueDate} | Priority: {task.priority}</p>
                            <p className={`font-bold ${task.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                                {task.status}
                            </p>
                            <div className="mt-2 flex gap-2">
                                <button
                                    onClick={() => handleToggleStatus(task._id)}
                                    className={`px-3 py-1 rounded text-white ${task.status === "Completed" ? "bg-yellow-500" : "bg-green-500"}`}
                                >
                                    {task.status === "Pending" ? "Mark Complete" : "Mark Pending"}
                                </button>
                                <button onClick={() => handleEdit(task)} className="bg-blue-500 text-white px-3 py-1 rounded">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                            </div>

                            {/* Edit Task Modal */}
                            <Modal
                                isOpen={!!editingTask}
                                onRequestClose={() => setEditingTask(null)}
                                className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto mt-20"
                                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                            >
                                <h3 className="font-bold text-lg mb-4">Edit Task</h3>
                                <input
                                    type="text"
                                    name="title"
                                    value={updatedData.title}
                                    onChange={handleUpdateChange}
                                    className="w-full p-2 mb-2 border rounded"
                                />
                                <textarea
                                    name="description"
                                    value={updatedData.description}
                                    onChange={handleUpdateChange}
                                    className="w-full p-2 mb-2 border rounded"
                                ></textarea>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={updatedData.dueDate}
                                    onChange={handleUpdateChange}
                                    className="w-full p-2 mb-2 border rounded"
                                />
                                <select
                                    name="priority"
                                    value={updatedData.priority}
                                    onChange={handleUpdateChange}
                                    className="w-full p-2 mb-2 border rounded"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <div className="flex gap-2">
                                    <button onClick={() => handleUpdateSubmit(editingTask)} className="bg-green-500 text-white px-3 py-1 rounded">
                                        Save
                                    </button>
                                    <button onClick={() => setEditingTask(null)} className="bg-gray-500 text-white px-3 py-1 rounded">
                                        Cancel
                                    </button>
                                </div>
                            </Modal>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Home;
