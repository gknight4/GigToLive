import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
import {cl,wsTrans} from '../utils/utils.js'

function ShowInfo0({parms}) {
  const [email, setEmail] = useState("red");
//   cl(parms)

  var showInput=(t)=>{
//     cl("input")
//     cl(t,parms.item)
//     cl(t.title)
//     return(<div>hey</div>)
    return(
      <div align="left">
        <strong>{t.title}</strong><br/>
        <span>{parms.item[t.val]}</span>
      </div>
    )
  }

  var showFields=()=>{
//     return(<div>hey2</div>)
    let rows=parms.template.map(t=>{
      switch(t.type){
        case "input":
          cl("return")
          return showInput(t)
      }
      cl(t)
    })
    return rows
  }

  return (
    <div align="left">
      {showFields()}
    </div>
  );
}

export default ShowInfo0
