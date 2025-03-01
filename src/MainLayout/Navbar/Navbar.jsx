import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    handleSignOut();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <NavLink to="/" className="text-xl font-bold">To-Do App</NavLink>
      <div>
        <NavLink to="/todos" className="mx-2" activeClassName="underline">Tasks</NavLink>
        <NavLink to="/settings" className="mx-2" activeClassName="underline">Settings</NavLink>
        {user ? (
          <button onClick={handleLogout} className="mx-2 bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="mx-2" activeClassName="underline">Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
