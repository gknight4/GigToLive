import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"

function CreativeNotes() {
  const [email, setEmail] = useState("red");

  return (
    <div className="App">
      <div style={{width:430,height:920,backgroundColor:"white"}}>
      <h3>CreativeNotes</h3>
      </div>
    </div>
  );
}

export default CreativeNotes
