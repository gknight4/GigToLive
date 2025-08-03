import React, { useState,useEffect,useRef } from "react";
import ReactDOM from "react-dom/client";
import Record from "../pages/Record.js"
import {cl,htmlToReact,globs
} from '../utils/utils.js'

function EditField1({parms}) {
  const [open,setOpen]=useState()
  const [val,setVal]=useState(parms.val)
  const boxRef=useRef()
//   cl(parms)

var ocf=(func,val)=>{return e=>{func(val,e)}}

var handleTranscribe=(args)=>{
  setVal(args.res)
//   parms.oc({cmd:"val",e:args.res})
//   cl(args)
}

var closeField=()=>{
//   cl("closeField")
  parms.oc({cmd:"upd",e:val})
  setOpen(false)
}

var inputKeyPress=(val,e)=>{
  if(e.key=="Enter"){closeField()}
}

var doSetVal=(val,e)=>{
//   cl(val,e)
  if(e.target){e=e.target.value}
  setVal(e)
  parms.oc({cmd:"val",e:e})
}

var handleCr=(val)=>{
  val=val.replaceAll("\n","<br/>\n")
  return htmlToReact(val)
}


var showEditField=()=>{
  var showTextInput=()=>{
    if(parms.multi){
      cl(boxRef.current?.clientWidth)
      return(
        <>
          <textarea autoFocus type="text"
          style={{padding:10,border:"1px solid #CCCCCC",resize:"none",
          width:globs.screen.w-60,height:200}}
          value={val}
          onChange={ocf(doSetVal)}
          />
        </>
      )
    }else{
      return(
        <>
          <input autoFocus type="text" style={{padding:10,border:"1px solid #CCCCCC"}}
          value={val}
          onKeyUp={ocf(inputKeyPress,"none")}
          onChange={ocf(doSetVal)}
          />
        </>
      )
    }
//     cl(val)
//         onChange={e=>parms.oc({cmd:"val",e:e}) /*ocf(parms.oc,parms.field)*/}
  }
  if(open){
    let recordParms={
      onChange:handleTranscribe,
    }
    return(
      <div ref={boxRef}
        style={{border:"1px solid black",borderRadius:10,padding:10,}}>
      <div style={{float:"left",marginTop:12}}>
      <img src="/utils/lang2.png" width="24"
      style={{marginBottom:2,cursor:"pointer"}}
      onClick={ocf(closeField)}
      />
      <strong>{parms.label}</strong><br/>
      </div>
      <div style={{float:"right"}}>
        <Record parms={recordParms}/>
      </div>
      <div style={{clear:"both"}}>
      {showTextInput()}
      </div>
      </div>
    )
  }else{
//     cl(parms)
    return(
      <><strong style={{color:"#4488CC",cursor:"pointer"}}
      onClick={ocf(setOpen,true)}
      >{parms.label}: {parms.multi&&<br/>}
      </strong>{(parms.multi)?handleCr(val):val}<br/></>
    )
  }
}

  return (
    <div>
    {showEditField()}
    </div>
  );
}

export default EditField1
