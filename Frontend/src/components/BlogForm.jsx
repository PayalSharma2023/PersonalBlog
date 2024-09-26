import React from "react";
import "../style/BlogForm.css"

function Blogform() {
    return(
        <div>
            <h1>Create Article</h1>
            <form action="">
                <label htmlFor="" name="title">title</label>
                <input type="text" />
                <br />
                <label htmlFor="" name="snippet">snippet</label>
                <textarea type="text"  height="56px"/>
                <br />
                <label htmlFor="" name="blog">body</label>
                <textarea type="text" />
                <br />
                <label htmlFor="" name="tags">tags</label>
                <select name="" id="">
                    <option value="3">Python</option>
                    <option value="3">SQL</option>
                    <option value="3">College</option>
                    <option value="3">Backend</option>
                </select>
                <br />
                <button type="submit">Add Article</button>
            </form>
        </div>
    )

}

export default Blogform;