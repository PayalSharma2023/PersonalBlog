import "./App.css";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from "./components/Navbar";
import Blogform from "./components/BlogForm";
import Blogpost from "./components/BlogPost";
import Home from "./components/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: '/home',
      element: <><Navbar/><Home/></>
    },
    {
      path: '/Blogform',
      element: <><Navbar/><Blogform/></>
    },
    {
      path: '/Blogpost',
      element: <><Navbar/><Blogpost/></>
    }
  ])

 
  return (
    <div>
      <RouterProvider router={router}/>   
    </div>
  );
}

export default App;
