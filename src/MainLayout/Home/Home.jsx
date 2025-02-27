import { useEffect, useState } from "react";

const Home = () => {

    const [tasks, setAllTasks] = useState([])

    const fetchTasks = async() =>{
        const res = await fetch("http://localhost:3000/tasks");
            const data = await res.json();
            setAllTasks(data);
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Task deleted successfully:", data);
            fetchTasks()
            // Optionally, update UI or state after deletion
        })
        .catch(error => console.error("Error deleting task:", error));


    };
    
// console.log(tasks);

    return (
        <>
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">Welcome to the To-Do App</h1>
                <p>Manage your tasks efficiently with enhanced security features.</p>
            </div>
            <div>
                <h2>To-Do-Tasks: {tasks.length}</h2>

                {/* Task List */}
                {tasks.length === 0 ? <p className="text-center">No tasks yet.</p> : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map(task => (
                            <li key={task._id} className="bg-white p-4 mb-2 shadow rounded">
                                <h3 className="font-bold">{task.title}</h3>
                                <p>{task.description}</p>
                                <p className="text-sm">Due: {task.dueDate} | Priority: {task.priority}</p>
                                <p className={`font-bold ${task.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                                    {task.status}
                                </p>
                                <div className="mt-2 flex gap-2">
                                    <button className="bg-green-500 text-white px-3 py-1 rounded">
                                        {task.status === "Pending" ? "Mark Complete" : "Mark Pending"}
                                    </button>
                                    <button onClick={()=>handleDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Home;
