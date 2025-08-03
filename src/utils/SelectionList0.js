import React, { useState,useRef } from "react";
import ReactDOM from "react-dom/client";
import {cl} from '../utils/utils.js'

var SelectionList0=({parms})=>{
  const [selItem,setSelItem]=useState()
//   cl(parms)
//   cl(parms.list)

  var doSelItem=(item)=>{
    setSelItem(item)
    parms.onChange(item)
  }

  let items=parms.list.map((it,i)=>{
    return(
      <tr key={it.v}>
      <td style={{cursor:"pointer",
        color:it.h,
        backgroundColor:(it.v==selItem)?"#80C0FF":"#FFFFFF",
      }}
      onClick={e=>doSelItem(it.v)}
      >{it.t}</td>
      </tr>
    )
  })
  return(
    <div>
    <table width="100%"><tbody>
    {items}
    </tbody></table>
    </div>
  )
}

export default SelectionList0
