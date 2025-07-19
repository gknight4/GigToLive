import React, { useState,useRef } from "react";
import ReactDOM from "react-dom/client";
import {cl} from '../utils/utils.js'

var TopLinks0=({parms})=>{
  const [open,setOpen]=useState()
//   const [selTab,setSelTab]=useState(parms.tabs[0].v)

  var showLinks=()=>{
    let tabs=parms.tabs.map((t,i)=>{return(
      <td key={i} style={{cursor:"pointer",color:"#2266CC"}}
        onClick={e=>{
//           setSelTab(t.v)
          parms.cb(t.v)
        }}
      >{(t.v==parms.selLink)?<u>{t.t}</u>:t.t}
      </td>
    )})
//     tabs.unshift(
//       <td key={"head"} style={{backgroundColor:"#301870",color:"#FFFFFF"}}
//       ><strong>{parms.title}</strong></td>
//     )
    return (
      <table width="100%" style={{textAlign:"center"}}><tbody>
      <tr>{tabs}</tr>
      </tbody></table>
    )
  }

  return showLinks()
}

export default TopLinks0
