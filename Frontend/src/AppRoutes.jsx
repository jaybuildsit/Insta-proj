import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"


export const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"/register",
        element:<Register />
    },
    {
        path:"/",
        element: <h1>Welcome to 4 level Architecture!!</h1>
    }
])

export default router


