import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom/client";
import {Button} from 'react-bootstrap';
import {cl,} from '../utils/utils.js'

function SelectionList1({parms}) {
  const [showList,setShowList]=useState(false)
  const [val,setVal]=useState("Unknown")
  cl(parms)
  useEffect(x=>{
    setVal(parms.val)
  })

  var oc=(type,vals)=>{return e=>{parms.oc(type,vals,e)}}

  var show=()=>{
    setShowList(!showList)
  }

  var sel=(vals,e)=>{
    cl(vals)
    setShowList(false)
    setVal(vals)
    parms.oc(vals)
  }

  var onChange=(type,vals,e)=>{
//     cl(type,vals,e)
    let types={
      show:show,
      sel:sel,
    }
    if(types[type]){types[type](vals,e)}

  }

  var oc=(type,vals)=>{return e=>{onChange(type,vals,e)}}

  if(showList){
    let lines=parms.opts.map((o,i)=>{
      return(
        <h3 key={i} className="smHead"
        onClick={oc("sel",o.v)}
        >{o.t}</h3>
      )
    })
    return(
      <div>
      {lines}
      </div>
    )
  }else{
    return (
      <div style={{backgroundColor:"white",width:"fit-content",display:"inline-block",}}>
      <span className="smHead"
      onClick={oc("show")}
      >{val}</span>
      </div>
    );
  }
}

export default SelectionList1
