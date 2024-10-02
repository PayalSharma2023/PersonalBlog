import React from "react";
import { useForm } from "react-hook-form";
import "../App.css";

function Blogform() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async(data) => {
    let r = await fetch("/blog/article",{
        method: "POST",
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    let res = await r.json();
    console.log(res, data)
    console.log(data)
  };

  return (
    <>
      <h1 className="text-center m-4 font-semibold text-xl ">Form</h1>
      <div className="container m-2">
        {isSubmitting && <div className="text-sm mx-3 text-gray-400 ">Submitting...</div>}
        <form action="" onSubmit={handleSubmit(onSubmit)} className="">
         
         <div className="h-96 min-h-fit rounded mr-auto p-10  m-auto justify-center  bg-white bg-opacity-30 flex flex-col float-right">
          <div className="">
            <label htmlFor="" className="text-sm tracking-wide uppercase font-mono text-blue-950 p-2 m-2">Title</label>
            <br />
            <input
              placeholder="Title"
              className="text-base  placeholder-tracking-wider bg-white bg-opacity-35 rounded p-2 m-2 "
              {...register("Title", {
                required: { value: true, message: "Please enter Title" },
              })}
              type="text"
            />
            {errors.Title && <div className="text-sm mx-3 text-red-500 ">{errors.Title.message}</div>}
          </div>
          <div className="">
            <label htmlFor="" className="text-sm tracking-wide uppercase font-mono text-blue-950 p-2 m-2">Snippet</label>
            <br />
            <textarea
              placeholder="Snippet"
              className="text-base sont-mono placeholder-tracking-wider bg-white bg-opacity-35 rounded p-2 m-2 "
              {...register("Snippet", {
                required: { value: true, message: "Please enter Snippet" },
              })}
              type="text"
              cols={50}
            />
            {errors.Snippet && <div className="text-sm mx-3 text-red-500 ">{errors.Snippet.message}</div>}
          </div>
          <div className="">
            <label htmlFor="" className="text-sm tracking-wide uppercase font-mono text-blue-950 p-2 m-2">Body</label>
            <br />
            <textarea
              placeholder="Body"
              className="text-base sont-mono placeholder-tracking-wider bg-white bg-opacity-35 rounded p-2 m-2 "
              {...register("Body", {
                required: { value: true, message: "Please enter Body" },
              })}
              type="text"
              rows={5}
              cols={50}
            />
            {errors.Body && <div className="text-sm mx-3 text-red-500 ">{errors.Body.message}</div>}
          </div>
          <div>
            <label htmlFor="" className="text-sm tracking-wide uppercase font-mono text-blue-950 p-2 m-2">Tags</label>
            <br />
            <select name="tags" className="m-2 p-1" id="">
                <option value="Tech" className="p-2 m-2">Tech</option>
                <option value="Wealth" className="p-2 m-2">Wealth</option>
                <option value="Health" className="p-2 m-2">Health</option>
            </select>
            {errors.Tags && <div>{errors.Tags.message}</div>}
          </div>
          <input disabled={isSubmitting} type="submit" value="Submit" className="text-white bg-green-500 p-2 float-start justify-self-start rounded-lg w-20 m-2 accent-sky-500" />
         </div>
        </form>
      </div>
    </>
  );
}

export default Blogform;
