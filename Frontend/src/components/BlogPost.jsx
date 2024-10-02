import {useState, useEffect} from "react";


function Blogpost() {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = (data) => {
    fetch("/blog/article", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Important for sending JSON
      },
      body: JSON.stringify(data),
    })
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
  return (
    <div>
      Posts
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

export default Blogpost;
