import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">To-Do App</Link>
      <div>
        <Link to="/todos" className="mx-2">Tasks</Link>
        <Link to="/settings" className="mx-2">Settings</Link>
        <Link to="/login" className="mx-2">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
