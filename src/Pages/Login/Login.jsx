import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
    const user = useContext(AuthContext)
    console.log(user)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-bold">Login</h2>
        <form className="flex flex-col gap-4 border-2 border-red-600 mt-4">
        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>          <input type="password" placeholder="Password" className="border p-2 rounded"/>
          <button className="bg-blue-600 text-white p-2 rounded">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;
  