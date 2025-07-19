import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
import {cl} from '../utils/utils.js'

function Metrics(props) {
  const [email, setEmail] = useState("red");
  let loc=useLocation().pathname
  cl(loc)

  return (
    <div className="App">
      <div style={{width:430,height:920,backgroundColor:"white"}}>
      <h3>Metrics</h3>
      </div>
    </div>
  );
}

export default Metrics
