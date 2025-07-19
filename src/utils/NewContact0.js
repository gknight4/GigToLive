import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom/client";
import {Button} from 'react-bootstrap';
import SelectionList1 from "../utils/SelectionList1.js"
import {cl,globs,tsToInDate,
} from '../utils/utils.js'

function NewEvent0({parms}) {
  const [email, setEmail] = useState("red");
  const [date,setDate]=useState("")
  useEffect(x=>{
    cl(parms)
    let dt=tsToInDate(parms.ts)
    cl(dt)
    setDate(dt)

//     setDate
  },[])

  var newTime=(vals,e)=>{
    setDate(e.target.value)
  }

  var type=(vals,e)=>{
    cl(vals)
  }

  var onChange=(type,vals,e)=>{
    var types={
      newTime:newTime,
      type:type,
    }
    if(types[type]){
      types[type](vals,e)
    }else{
      cl(`No onChange for ${type}`)
    }
  }

  var oc=(type,vals)=>{return e=>{onChange(type,vals,e)}}

  var doShowCreate=()=>{
    return(
      <div style={{position:"absolute",width:globs.screen.w-40,height:400,
        border:"1px solid black",borderRadius:10,backgroundColor:"white",
        zIndex:1,padding:10,overflowY:"auto"
      }}>
        <h3>New Event</h3>
        <input type="datetime-local"
          onChange={oc("newTime")}
          value={date}
        /><br/><br/>
        <strong>Type: </strong><SelectionList1
        parms={{
          opts:[
            {v:"Contact",t:"Contact"},
            {v:"Followup",t:"Followup"},
            {v:"Followup",t:"Followup"},
            {v:"Followup",t:"Followup"},
            {v:"Followup",t:"Followup"},
            {v:"Followup",t:"Followup"},
            {v:"Followup",t:"Followup"},
            {v:"Meeting",t:"Meeting"},
            {v:"Gig Change",t:"Gig Change"},
          ],
          oc:oc("type")
        }}/>
      </div>
    )
  }

  return doShowCreate()
}

export default NewEvent0
