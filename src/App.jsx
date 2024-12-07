
import { RouterProvider, createBrowserRouter } from "react-router";
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Vendors from './components/Vendors';
import Rfp from './components/Rfp';
import RegisterAdmin from "./components/RegisterAdmin";
import Addrfp from "./components/Addrfp";

function App() {

  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/registeradmin",
      element: <RegisterAdmin/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/dashboard",
      element:<Dashboard/>
    },
    {
      path:"/vendors",
      element:<Vendors/>
    },
    {
      path:"/rfp",
      element:<Rfp/>
    },
    {
      path:"/addrfp",
      element:<Addrfp/>
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
