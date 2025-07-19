import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {cl,
} from '../utils/utils.js'

function SelectionList2({parms}) {
  const [email, setEmail] = useState("red");
  cl(parms)

  var ocf=(func,val)=>{return e=>{func(val,e)}}

  let rows=parms.opts.map(o=>{
    return(
      <h3 className="smHead"
      onClick={ocf(parms.oc,o.v)}
      >{o.t}: {o.v}</h3>
    )
  })
  return (
    <div>
    {rows}
    </div>
  )
}

export default SelectionList2
