import { useEffect, useState } from "react";
import "./App.css";
import Blogform from "./components/BlogForm";
// import { Router, Route } from "react-router";

function App() {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = () => {
    fetch("/blog/article")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else {
          console.error("Expected an array, but got:", data);
          setUsers([]); // Set to empty array or handle error state
        }
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // return (
  //         console.log({users});
  //   <div>
  //     {users.map((data) => {
  //       return (
  //         <>
  //           <div  key={data.id} className="border border-spacing-7">
  //             <h1>Name: {data.name}</h1>
  //             <h1>UserName: {data.username}</h1>
  //             <h1>Email: {data.email}</h1>
  //           </div>
  //         </>
  //       );
  //     })}
  //   </div>
  // );
  return (
    <div>
      {Array.isArray(blogs) ? (
        blogs.map((data) => (
          <div key={data._id} className="border border-spacing-7">
            <h1>Title: {data.title}</h1>
            <h1>Snippet: {data.snippet}</h1>
            <h1>Body: {data.body}</h1>
          </div>
        ))
      ) : (
        <p>No users found or data is not in the expected format.</p>
      )}
    </div>
  );
}

export default App;
