import React, { useState,useRef } from "react";
import ReactDOM from "react-dom/client";
// import NavBar from "./navbar.js"
import {cl} from '../utils/utils.js'

var Menu0=({parms})=>{
  const [open,setOpen]=useState()
//   cl(parms)

  var handleItem=(it)=>{
    cl("handle")
    it.f()
    setOpen(false)
  }

  let c=parms.parRef.current||{}
  c=c||{}
//     cl(c.offsetTop,c.offsetLeft,c.offsetWidth,c.offsetHeight)
//     cl(Object.values(parms.parRef.current||{}))
  let left=(c?.offsetWidth||0)-150
  let top=c?.offsetHeight||0
  let items=parms.items.map((it,i)=>{
    return(
      <div key={i}
      onClick={e=>{handleItem(it)}}
      >{it.t}</div>
    )
  })
  return(
    <>
      <span onClick={e=>setOpen(!open)}>{parms.parCont}</span>
      <div style={{position:"absolute",width:150,left:left,top:top,
        textAlign:"left",padding:10,borderRadius:5,backgroundColor:"#F8F8F8",
        display:(open)?"block":"none"
      }}
        className="menuHover">
        {items}
        <div>menu and more</div>
        <div>one</div>
        <div>two</div>
      </div>
      </>
  )
}

export default Menu0
