import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"

function WorkDone() {
  const [email, setEmail] = useState("red");

  return (
    <div className="App">
      <div style={{width:430,height:920,backgroundColor:"white"}}>
      <h3>WorkDone</h3>
      </div>
    </div>
  );
}

export default WorkDone
