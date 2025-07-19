import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {cl,
} from '../utils/utils.js'

function Documents() {
  const [email, setEmail] = useState("red");

  return (
    <div className="App">
      <div style={{width:430,height:920,backgroundColor:"white"}}>
      <h3>Documents</h3>
      </div>
    </div>
  );
}

export default Documents
