import React, { useState,useRef } from "react";
import ReactDOM from "react-dom/client";
import {cl} from '../utils/utils.js'

var TopTab0=({parms})=>{
  const [open,setOpen]=useState()
  const [selTab,setSelTab]=useState(parms.tabs[0].v)

  var showTabs=()=>{
    let tabs=parms.tabs.map(t=>{return(
      <td key={t.v}
      style={{backgroundColor:(t.v==selTab)?"#DDDDDD":"#EEEEEE",cursor:"pointer"}}
      onClick={e=>{
        setSelTab(t.v)
        parms.cb(t.v)
      }}
      >{t.t}</td>
    )})
    tabs.unshift(
      <td key={"head"} style={{backgroundColor:"#301870",color:"#FFFFFF"}}
      ><strong>{parms.title}</strong></td>
    )
    return(
      <table width="100%"><tbody>
      <tr>{tabs}</tr>
      </tbody></table>
    )
  }

  return showTabs()
}

export default TopTab0
