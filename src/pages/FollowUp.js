import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
import {cl,wsTrans,globs,saveLocalStorage,getLocalStorage} from '../utils/utils.js'

function FollowUp({parms}) {
  const [email, setEmail] = useState("red");
  cl(parms)

  return (
    <div className="App">
      <div style={{width:430,height:920,backgroundColor:"white"}}>
      <h3>FollowUp</h3>
      </div>
    </div>
  );
}

export default FollowUp
