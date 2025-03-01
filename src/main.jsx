import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './MainLayout/MainLayout';
import Home from './MainLayout/Home/Home';
import Login from './Pages/Login/Login';
import TodoList from './Pages/TodoList/TodoList';
import AuthProvider from './Provider/AuthProvider';
import Register from './Pages/Register/Register';
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail';
import Settings from './Pages/Settings/Settings';
import PrivateRoute from './MainLayout/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home></Home></PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/verify-otp",
        element: <VerifyEmail></VerifyEmail>
      },
      {
        path: "/todos",
        element: <PrivateRoute><TodoList></TodoList></PrivateRoute>
      },
      {
        path: "/settings",
        element: <PrivateRoute><Settings></Settings></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
