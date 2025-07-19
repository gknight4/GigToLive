import React, { useState,useEffect,useRef } from "react";
import ReactDOM from "react-dom/client";
import Record from "../pages/Record.js"
import {cl,
} from '../utils/utils.js'

function Address1({parms}) {
  const [email, setEmail] = useState("red");
  const [open,setOpen]=useState()
  const [selField,setSelField]=useState()
  const [contactInfo,setContactInfo]=useState()
//   cl(parms)

useEffect(x=>{
  setContactInfo(parms.addr)
},[])

var ocf=(func,val)=>{return e=>{func(val,e)}}

var capWords=(val)=>{
  return val.split(" ").map(w=>{
    return w.charAt(0).toUpperCase() + w.slice(1)}).join(" ")
}

var setContactValue=(field,e)=>{
//   cl(field,e)
  let val=(e.target)?e.target.value:e
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

var inputKeyPress=(val,e)=>{
  if(e.key=="Enter"){
    cl("enter")
//     globs.navigate(-1)
//     setSelField()
    saveInfo()
  }
//   cl(val,e)
}

  var handleTranscribe=(args)=>{
//     cl(args)
    args.id.func(args.id.field,args.res)
//     let user0=Object.assign({},user)
//     user0[args.id.selTab][args.id.selSct]+=args.res
//     setSaveTimer()
//     setMyUser(user0)
  }

var showEditField=(label,field)=>{
//   var getName=()=>{
// //     cl(c.n)
// //     cl(nameFields.indexOf(field))
//     return c.n.split(";")[nameFields.indexOf(field)]
//   }
  var showTextInput=()=>{
//     if(multi){
//       return(
//         <textarea style={{width:"100%",height:200,padding:10,border:"1px solid #CCCCCC"}}
//         value={contactInfo[field]}
//         resize="false"
//         onChange={ocf(setContactValue,field)}
//         />
//       )
//     }else{
    let recordParms={
      id:{func:setContactValue,field:field},
      onChange:handleTranscribe,
    }
    return(
      <>
        <input autoFocus type="text" style={{padding:10,border:"1px solid #CCCCCC"}}
        value={(c||{})[field]||""}
        onKeyUp={ocf(inputKeyPress,"none")}
        onChange={ocf(setContactValue,field)}
        />
        <Record parms={recordParms}/>
      </>
    )
//     }
  }
  let c=contactInfo
//   cl(parms)
  let val=(c||{})[field]
//   if(nameFields.includes(field)){val=getName()}
  val=val?.replaceAll(";","\n")
  if(val?.indexOf("\n")>=0){val=showLines(val)}
  if(field==selField){
    return(
      <div style={{border:"1px solid black",borderRadius:10,padding:10}}>
      <span>
      <img src="/utils/lang2.png" width="24"
      style={{marginBottom:2,cursor:"pointer"}}
      onClick={ocf(saveInfo,null)}
      />
      </span>
      <strong>{label}</strong><br/><br/>
      {showTextInput()}
      </div>
    )
  }else{
    return(
      <><strong style={{color:"#4488CC",cursor:"pointer"}}
      onClick={ocf(setSelField,field)}
      >{label}: </strong>{val}<br/></>
    )
  }
}

var saveInfo=(field,val)=>{// called on close field
  setSelField(null)
  parms.oc(contactInfo)
}

var toggleAddrShow=()=>{
  setOpen(!open)
}

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

var showAddrField=()=>{
//   let open=addrFuncs[suf].v
  let suf=""
  return(
    <div>
    <span style={{cursor:"pointer",fontSize:24,
      fontWeight:700}}
      onClick={ocf(toggleAddrShow,suf)}
      >{parms.label}
      <img src={(open)?"/utils/ok.png":"/utils/edit.png"} width="24"/>
      </span><br/>
      {!open&&showAddr()}
    {open &&
      <>
        {showEditField("Name",`nm`)}
        {showEditField("Street 1",`s1`)}
        {showEditField("Street 2",`s2`)}
        {showEditField("City",`ci`)}
        {showEditField("State",`st`)}
        {showEditField("Zip",`zp`)}
        {showEditField("Country",`cn`)}
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
