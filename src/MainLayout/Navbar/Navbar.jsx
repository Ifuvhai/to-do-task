import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const {user, handleSignOut}= useContext(AuthContext)
  const handleLogout = () =>{
    handleSignOut()
  }
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">To-Do App</Link>
      <div>
        <Link to="/todos" className="mx-2">Tasks</Link>
        <Link to="/settings" className="mx-2">Settings</Link>
        <Link to="/login" onClick={handleLogout} className="mx-2">{user?"Logout":"Login"}</Link>
      </div>
    </nav>
  );
};

export default Navbar;
