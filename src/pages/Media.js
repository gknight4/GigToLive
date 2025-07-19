import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
import {cl,clLog,cl2,
} from '../utils/utils.js'

function Media() {
  const [email, setEmail] = useState("red");
  cl2("and more")
  cl2({a:"b"})
  let lines=clLog.map((l,i)=>{
    if(typeof l !="string"){l=JSON.stringify(l)}
    return <span key={i}>{l}<br/></span>
  })

  return (
    <div className="App">
      <div style={{width:430,height:920,backgroundColor:"white",textAlign:"left",
        overflowY:"auto",
      }}>
      <h3>Log</h3>
      {lines}
      </div>
    </div>
  );
}

export default Media
