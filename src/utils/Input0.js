import React, { useState,useRef } from "react";
import ReactDOM from "react-dom/client";
import {cl} from '../utils/utils.js'

var Input0=({parms})=>{
  const [open,setOpen]=useState()
  const [upd,setUpd]=useState(0)

  var onChange=(e)=>{
    parms.onChange(e.target.value)
    setUpd(upd+1)
  }
//   cl("return input")
//   cl(parms.val)
  return(
    <>
      <label><strong>{parms.title||""}</strong></label><br/>
      <input type="text" style={{border:"1px solid, #CCCCCC"}}
        value={parms.val}
        onChange={onChange}/><br/><br/>
    </>
  )
}

export default Input0
