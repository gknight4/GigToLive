import React, { useState,useEffect,useRef } from "react";
import ReactDOM from "react-dom/client";
import Record from "../pages/Record.js"
import EditField1 from "./EditField1.js"
import {cl,
} from '../utils/utils.js'

function Address1({parms}) {
//   const [email, setEmail] = useState("red");
  const [open,setOpen]=useState()
//   const [selField,setSelField]=useState()
  const [contactInfo,setContactInfo]=useState()
//   cl(parms)

useEffect(x=>{
  checkMapQuestInfo(parms.addr)
  setContactInfo(parms.addr)
},[])

var ocf=(func,val)=>{return e=>{func(val,e)}}

var checkMapQuestInfo=(addr)=>{
//   cl(addr)
//   cl(addr.s1)
  if(addr.street&&!addr.s1){
    addr.nm=addr.name
    addr.s1=addr.street
    addr.ci=addr.locality
    addr.st=addr.region
    addr.zp=addr.postcode
    addr.cn=addr.country
    parms.oc(addr)
  }
}

var capWords=(val)=>{
  return val.split(" ").map(w=>{
    return w.charAt(0).toUpperCase() + w.slice(1)}).join(" ")
}

var saveInfo=()=>{// called on close field
//   cl("saveInfo")
//   setSelField(null)

  parms.oc(contactInfo)
}

var setContactValue=(field,e)=>{
  cl(field,e)
  if(e.cmd=="upd"){return saveInfo()}
  e=e.e
  let val=(e.target)?e.target.value:e
  cl(val)
//   cl(val.slice(-1))
  if(val.slice(-1)=="."){val=val.slice(0,-1)}
  if(["email"].includes(field.substring(0,5))){
    val=val.replace(" at ","@")
    val=val.replaceAll(" ","")
    val=val.replaceAll(",","")
  }
  if(["s1","s2"].includes(field.substring(0,2))){val=val.replaceAll(",","")}
  if(["Fn","Ln","ti","nm","s1","s2","or"].includes(field.substring(0,2)))
    {val=capWords(val)}
  if(["tel"].includes(field.substring(0,3))){
    if(val.indexOf("-")<0){
      val=`${val.substring(0,3)}-${val.substring(3,6)}-${val.substring(6)}`
    }
  }
  cl(field.substring(0,2))
  if(field=="url"){
    val=capWords(val)
    val=val.replaceAll(" ","")
    if(val.substring(0,4).toLowerCase()!="http"){val="https://"+val}
//     val="https://"+val.replaceAll(" ","")}
  }
//   cl(val)
  let ci=Object.assign({},contactInfo)
//   if(nameFields.includes(field)){
//     let names=ci.n.split(";")
//     names[nameFields.indexOf(field)]=val
//     ci.n=names.join(";")
//   }else{
    ci[field]=val
//     cl(ci[field])
//   }
  setContactInfo(ci)
}

var toggleAddrShow=()=>{
  setOpen(!open)
}
//
var showAddr=()=>{
  var showLine=(cont)=>{
    if(cont){return <span>{cont}<br/></span>}
  }
//   cl(parms)
  let a=parms.addr||{}
//   if(open){return}
  let ciSt=(a.ci)?<>{a.ci}, {a.st} {a.zp}</>:null
  return(
    <div>
    {showLine(a.nm)}
    {showLine(a.s1)}
    {showLine(a.s2)}
    {showLine(ciSt)}
    </div>
  )
}

// var setCI=(vals,e)=>{
//   cl(vals,e)
// }

var showAddrField=()=>{
//   let open=addrFuncs[suf].v
  let suf=""
  return(
    <div>
    <span style={{cursor:"pointer",/*fontSize:24,*/
      fontWeight:700}}
      onClick={ocf(toggleAddrShow,suf)}
      >{parms.label}
      <img src={(open)?"/utils/ok.png":"/utils/edit.png"} width="18"/>
      </span><br/>
      {!open&&showAddr()}
    {open &&
      <>
        <EditField1 parms={{
          label:"Name",
          val:contactInfo.nm,
          oc:ocf(setContactValue,"nm")
        }}/>
        <EditField1 parms={{
          label:"Street 1",
          val:contactInfo.s1,
          oc:ocf(setContactValue,"s1")
        }}/>
        <EditField1 parms={{
          label:"Street 2",
          val:contactInfo.s2,
//           field:"s2",
          oc:ocf(setContactValue,"s2")
        }}/>
        <EditField1 parms={{
          label:"City",
          val:contactInfo.ci,
          oc:ocf(setContactValue,"ci")
        }}/>
        <EditField1 parms={{
          label:"State",
          val:contactInfo.st,
          oc:ocf(setContactValue,"st")
        }}/>
        <EditField1 parms={{
          label:"Zip",
          val:contactInfo.zp,
          oc:ocf(setContactValue,"zp")
        }}/>
        <EditField1 parms={{
          label:"Country",
          val:contactInfo.cn,
          oc:ocf(setContactValue,"cn")
        }}/>

      </>
    }
    </div>
  )
}

  return (
    <div>
    {showAddrField()}
    </div>
  );
}

export default Address1
