import React, { useState } from "react";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";

function Navbar(){
    return(
        <>
        <div className="bg-slate-900">
           <div className="flex  justify-around h-16 items-center bg-slate-400 bg-opacity-5">

            <div className=" text-red-300 text-center">
                <h1 className="font-bold">My PERSONAL BLOG</h1>
            </div>
            <div>
            {/* <nav>
                <Link to="/">HOME</Link>
                <Link to="/">BlogPost</Link>
                <Link to="/">BLogForm</Link>
            </nav> */}
            <div className="navbar flex justify-center gap-9 text-white">
                <NavLink to="/home"><li className="list-none">Home</li></NavLink>
                <NavLink to="/BlogForm"><li className="list-none">BlogForm</li></NavLink>
                <a href="/BlogPost">BlogPost</a>
            </div>
           </div>
            </div>
        </div>
        </>
    )
}

export default Navbar;