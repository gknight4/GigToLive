import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import NavBar from "./navbar.js"
import {cl,clLog,cl2,globs,nav,
} from '../utils/utils.js'

function Breadcrumbs() {

  let crumbs=globs.loc.split("/").slice(1)
  let cum=""
  let line=crumbs.map((c,i)=>{
    cum+="/"+c
    return <span key={i} className="smHead"
    onClick={nav(cum)}
    >{`/ ${c}`}</span>
  })
//   cl(crumbs)
  line.unshift(
    <span key={"home"} className="smHead" onClick={nav("/")}
    ><img src="/utils/homeblu.png" width="20" style={{marginBottom:3}}/>
    </span>
  )
//   cl(crumbs)

  return (
    <div style={{marginBottom:10}}>
    <span className="smHead" onClick={nav(-1)}>
    <img src="/utils/lang2.png" width="20" style={{marginBottom:3}}
    />&nbsp;</span>
    {line}
    </div>
  );
}

export default Breadcrumbs
