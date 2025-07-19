import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
import Menu1 from "../utils/Menu1.js"
import {cl,clLog,cl2,globs,
} from '../utils/utils.js'

function Home() {
  const [email, setEmail] = useState("red");
  cl2("and more")
  cl2({a:"b"})
  let lines=clLog.map((l,i)=>{
    if(typeof l !="string"){l=JSON.stringify(l)}
    return <span key={i}>{l}<br/></span>
  })

  return (
    <div className="App">
      <div style={{width:globs.screen.w,height:globs.screen.h,
        backgroundColor:"white",textAlign:"left",
        overflowY:"auto",
      }}>
      <Menu1 parms={{menu:"mainMenu"}}/>
      </div>
    </div>
  );
}

export default Home
