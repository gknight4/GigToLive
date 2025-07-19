import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Search0 from "./Search0.js"
import {cl,globs} from './utils.js'

function ContactSearch0(parms) {
  const [selContact,setSelContact]=useState()
  const [showDAddr,setShowDAddr]=useState()
  const [showHAddr,setShowHAddr]=useState()
  const [showWAddr,setShowWAddr]=useState()
  const [contactNames,setContactNames]=useState([])

var doSetSelContact=(val)=>{
  cl(val)
  globs.navigate(val)

}

var showEditField=(label,field,multi)=>{
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
      return(
        <input type="text" style={{padding:10,border:"1px solid #CCCCCC"}}
        value={c[field]||""}
        onChange={ocf(setContactValue,field)}
        />
      )
//     }
  }
  let c=contactInfo
  let val=c[field]
//   if(nameFields.includes(field)){val=getName()}
  val=val?.replaceAll(";","\n")
  if(val?.indexOf("\n")>=0){val=showLines(val)}
  if(field==selField){
    return(
      <div style={{border:"1px solid black",borderRadius:10,padding:10}}>
      <span>
      <img src="/utils/lang2.png" width="24"
      style={{marginBottom:2,cursor:"pointer"}}
      onClick={ocf(setSelField,null)}
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

var addrFuncs={
  "H":{f:setShowHAddr,v:showHAddr},
  "W":{f:setShowWAddr,v:showWAddr},
  "D":{f:setShowDAddr,v:showDAddr},// default
}

var toggleAddrShow=(val,e)=>{
//   funcs[val]
  addrFuncs[val].f(!addrFuncs[val].v)
}

var showAddrField=(label,field,suf)=>{
  let open=addrFuncs[suf].v
  return(
    <div>
    <span style={{cursor:"pointer",fontSize:24,
      fontWeight:700}}
      onClick={ocf(toggleAddrShow,suf)}
      >{label}
      <img src={(open)?"/utils/uang.png":"/utils/dang.png"} width="24"/>
      </span><br/>
    {open &&
      <>
        {showEditField("Name",`nm${suf}`)}
        {showEditField("Street 1",`s1${suf}`)}
        {showEditField("Street 2",`s2${suf}`)}
        {showEditField("City",`ci${suf}`)}
        {showEditField("State",`st${suf}`)}
        {showEditField("Zip",`zp${suf}`)}
        {showEditField("Country",`cn${suf}`)}
      </>
    }
    </div>
  )


}

var showContactSelect=()=>{
  if(selContact){
    let c=contactInfo
    if(!c){return}
//     cl(c)
    let [ln,fn,mn]=(c?.n||[]).split(";")
//     cl(ln,fn,mn)
    return(
      <div>
      {showEditField("Title","title")}
      {showEditField("First","Fn")}
      {showEditField("Last","Ln")}
      {showEditField("Organization","org")}
      {showEditField("Web","url")}
      {showEditField("Tel Home","telH")}
      {showEditField("Tel Work","telW")}
      {showEditField("Tel Cell","telC")}
      {showEditField("Email","email")}
      {showEditField("Email Work","emailW")}
      {showAddrField("Address","addr","D")}
      {showAddrField("Address Home","addrH","H")}
      {showAddrField("Address Work","addrW","W")}
      {showEditField("Notes","note",true)}
      </div>
    )

  }else{
    return(
      <div style={{width:globs.screen.w,height:globs.screen.h,
        backgroundColor:"white",
        }}>
        <Search0 parms={{list:parms.contactNames,oc:doSetSelContact}}/>
      </div>
    )
  }
}

  return (
    <div className="App">
      <div style={{width:430,height:920,backgroundColor:"white"}}>
      {showContactSelect()}
      </div>
    </div>
  );
}

export default ContactSearch0
