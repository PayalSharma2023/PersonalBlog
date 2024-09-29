import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Blogform from "./components/BlogForm";
import { Router, Route } from "react-router";
import "axios";

function App() {
  return (
    <>
    <Blogform/>
      {/* <Router>
        <Route path="/" handler={Blogform} />
      </Router> */}
    </>
  );
}

export default App;
