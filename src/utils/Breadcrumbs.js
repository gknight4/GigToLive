import React, { useState,useRef } from "react";
import ReactDOM from "react-dom/client";
// import NavBar from "./navbar.js"
import {cl,clLog,cl2,globs,nav,
} from '../utils/utils.js'

function Breadcrumbs() {

  let crumbs=globs.loc.split("/").slice(1)
  let cum=""
  globs.bcRef=useRef()
  let line=crumbs.map((c,i)=>{
    cum+="/"+c
    return <span key={i} className="smHead"
    onClick={nav(cum)}
    >{`/ ${c.replaceAll("_"," ")}`}</span>
  })
//   cl(crumbs)
  line.unshift(
    <span key={"home"} className="smHead" onClick={nav("/")}
    ><img src="/utils/homeblu.png" width="20" style={{marginBottom:3}}/>
    </span>
  )
//   cl(crumbs)
//   cl(globs.bcRef.current?.clientHeight)
  let hgt=globs.bcRef.current?.clientHeight
  if(hgt){globs.bcHeight=hgt}
  return (
    <div ref={globs.bcRef}>
    <span className="smHead" onClick={nav(-1)}>
    <img src="/utils/lang2.png" width="20" style={{marginBottom:3}}
    />&nbsp;</span>
    {line}
    </div>
  );
}

export default Breadcrumbs
