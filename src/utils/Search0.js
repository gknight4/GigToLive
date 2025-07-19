import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom/client";
import {cl,globs,wsTrans,loadContacts,waitForWs,sortScal,sortObj
} from '../utils/utils.js'

function Search0({parms}) {
  const [email, setEmail] = useState("red");
  const [search,setSearch]=useState("")
//   const [parSize,setParSize]=useState()

  var ocv=(func)=>{return e=>{func(e.target.value)}}
  var oc=(func,val)=>{return e=>{func(val,e)}}
//   cl(parms.parRef.current.clientHeight)
//   useEffect(x=>{
//     setParSize({
//     w:parms.parRef?.current?.clientWidth,
//     h:parms.parRef?.current?.clientHeight,
//
//     })
//   })



  var showSearchBar2=()=>{
    return(
      <div style={{textAlign:"left",}}>
      <table width="100%"><tbody>
      <tr style={{border:"1px solid black"}}>
        <td width="24"
        ><img width="24" src="/utils/srch.png"
          style={{opacity:0.3,cursor:"pointer"}}/></td>
        <td><input type="text"
          style={{height:32,border:"0px solid black",width:"100%"}}
          value={search||""}
          onChange={ocv(setSearch)}
          />
        </td>
        <td width="24"><img width="24" src="/utils/ok.png"
          style={{opacity:0.3,cursor:"pointer"}}/></td>
        <td width="24"><img width="24" src="/utils/x.png"
          style={{opacity:0.3,cursor:"pointer"}}/></td>
        </tr>
      </tbody></table>
      </div>
    )
  }

  let rows=parms.list.filter(l=>{
    let searchStr=search.toLowerCase()
    let [ln,fn,mn]=l?.t?.split(";")||[]
    return (ln||fn)&&((searchStr=="")||(l.t.toLowerCase().indexOf(searchStr)>=0))})
  .map((l,i)=>{
//     cl(l.t)
    let [ln,fn,mn]=l?.t?.split(";")||[]
    let name=`${ln}${(fn)?", ":""}${fn}`
    let namLen=25
    if(name.length>namLen){name=name.substring(0,namLen-2)+"..."}
    return(
      <h3 key={i} style={{cursor:"pointer"}}
      onClick={oc(parms.oc,l.v)}
      >{name}</h3>
    )
  })
//   cl(parSize)
  let parSize={
    w:parms.parRef?.current?.clientWidth,
    h:parms.parRef?.current?.clientHeight,
  }
//   cl(parSize.h)
  return (
    <div style={{
      width:parSize?.w,
      height:parSize?.h||0,
      position:"absolute",top:0,left:0,
      backgroundColor:"white"}}>
      {showSearchBar2()}
      <div style={{width:parSize?.w,height:(parSize?.h||0)-36,
        textAlign:"left",padding:10,overflowY:"auto",

      }}>
      {rows}
      </div>
    </div>
  );
}

export default Search0
