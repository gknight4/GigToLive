import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom/client";
import {cl,globs,wsTrans,loadContacts,waitForWs,sortScal,sortObj
} from '../utils/utils.js'

function Search0({parms}) {
  const [email, setEmail] = useState("red");
  const [search,setSearch]=useState("")
  const [parSize,setParSize]=useState()
//   const [parSize,setParSize]=useState()

  var ocv=(func)=>{return e=>{func(e.target.value)}}
  var oc=(func,val)=>{return e=>{func(val,e)}}
  useEffect(x=>{
//     cl(parms.parRef.current)
    let parSize0={
      w:(parms.parRef?.current?.clientWidth||100)-2*padding,
      h:(parms.parRef?.current?.clientHeight||100)-2*padding,
    }
//     cl(parSize0)
    if((parSize?.w!=parSize0.w)||(parSize?.h!=parSize0.h)){
      setParSize(parSize0)
    }
  })
  cl(parms)
//   cl(parms.parRef.current.clientHeight)
//   useEffect(x=>{
//     setParSize({
//     w:parms.parRef?.current?.clientWidth,
//     h:parms.parRef?.current?.clientHeight,
//
//     })
//   })

  var sendCmd=(cmd)=>{
    parms.oc({cmd:cmd})
  }


  var showSearchBar2=(wid)=>{
    return(
      <div style={{textAlign:"left",}}>
      <table width={wid}><tbody>
      <tr style={{border:"1px solid black"}}>
        <td width="24"
        ><img width="24" src="/utils/srch.png"
          style={{opacity:0.3,cursor:"pointer"}}/></td>
        <td><input type="text" autoFocus
          style={{height:32,border:"0px solid black",width:"100%"}}
          value={search||""}
          onChange={ocv(setSearch)}
          />
        </td>
        <td width="24"><img width="24" src="/utils/ok.png"
          onClick={oc(sendCmd,"ok")}
          style={{opacity:0.3,cursor:"pointer"}}/></td>
        <td width="24"><img width="24" src="/utils/x.png"
          onClick={oc(sendCmd,"cancel")}
          style={{opacity:0.3,cursor:"pointer"}}/></td>
        </tr>
      </tbody></table>
      </div>
    )
  }

  let padding=+(parms.parRef.current?.style?.padding.slice(0,-2))||0
//   let parSize={
//     w:(parms.parRef?.current?.clientWidth||100)-2*padding,
//     h:(parms.parRef?.current?.clientHeight||100)-2*padding,
//   }
//   cl(parSize)
  let rows=parms.list.filter(l=>{
    let searchStr=search.toLowerCase()
    let [ln,fn,mn]=l?.t?.split(";")||[]
    return (ln||fn)&&((searchStr=="")||(l.t.toLowerCase().indexOf(searchStr)>=0))})
  .map((l,i)=>{
//     cl(l.t)
    let [ln,fn,mn]=l?.t?.split(";")||[]
    let name=`${ln}${(fn)?", ":""}${fn}`
//     cl(parSize.w)
//     cl(parms.list)
    let namLen=parSize?.w/18//25
    if(name.length>namLen){name=name.substring(0,namLen-2)+"..."}
    return(
      <h3 key={i} style={{cursor:"pointer",color:l.h}}
      onClick={oc(parms.oc,l.v)}
      >{name}</h3>
    )
  })
  if(parSize){
    return (
      <div style={{
        width:parSize?.w,
        height:parSize?.h||0,
  //       position:"absolute",top:0,left:0,
        backgroundColor:"white"}}>
        {showSearchBar2(parSize?.w)}
        <div style={{width:parSize?.w,height:(parSize?.h||0)-36,
          textAlign:"left",padding:10,overflowY:"auto",

        }}>
        {rows}
        </div>
      </div>
    );
  }
}

export default Search0
