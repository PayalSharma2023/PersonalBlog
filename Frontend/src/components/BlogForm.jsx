import React from "react";
import '../App.css';

function Blogform() {
    return(
        <div>
            <h1 className="text-3xl text-gray-50 font-bold underline bg-blend-color-dodge">Create Article</h1>
            <form action="">
                <div className="">
                <label htmlFor="" name="title" className="mt-1 text-sm text-gray-500 drak:text-gray-300">title</label>
                <input type="text" />
                </div>
                <div>
                <label htmlFor="" name="snippet">snippet</label>
                <textarea type="text"  height="56px"/>
                </div>
                <div>
                <label htmlFor="" name="blog" className="mt-1 text-sm text-blue-700 drak:text-gray-300">body</label>
                <textarea type="text" />
                </div>
                
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