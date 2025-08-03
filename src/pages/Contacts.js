import React, { useState,useRef,useEffect } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
import Menu0 from "../utils/Menu0.js"
import Search0 from "../utils/Search0.js"
import FileUpload from "../utils/FileUpload.js"
import Address1 from "../utils/Address1.js"
import Phone1 from "../utils/Phone1.js"
import Breadcrumbs from "../utils/Breadcrumbs.js"
import Record from "./Record.js"
import {cl,globs,wsTrans,loadContacts,waitForWs,sortScal,sortObj,
  procContactName,
} from '../utils/utils.js'

function Contacts() {
  const [email, setEmail] = useState("red");
  const [selTab,setSelTab]=useState("brand")
  const [tabs,setTabs]=useState()
  const [importName,setImportName]=useState()
  const [showImpFile,setShowImpFile]=useState()
  const [impNames,setImpNames]=useState([])
  const [pageType,setPageType]=useState("import")
  const [contactNames,setContactNames]=useState([])
  const [selContact,setSelContact]=useState()
  const [contactInfo,setContactInfo]=useState()
  const [selField,setSelField]=useState()
  const [showDAddr,setShowDAddr]=useState()
  const [showHAddr,setShowHAddr]=useState()
  const [showWAddr,setShowWAddr]=useState()
  const [initting,setInitting]=useState(true)
  const refContactInfo=useRef(contactInfo)
  const parRef=useRef()
  let menuRef=useRef()
  useEffect(x=>{
    cl("start contacts")
    loadInfo()
    return(x=>{
//       saveContact(refContactInfo.current)
//       cl(refContactInfo.current)
    })
  },[])
  useEffect(x=>{
    let [contact]=globs.loc.split("/").slice(2)
//     cl(contact,selContact)
    if(contact&&!selContact){loadContact(contact)}
    if(!contact&&selContact){
      saveContact(contactInfo)
      setContactInfo()
    }
    setSelContact(contact)
  })
//   useEffect(x=>{
//     cl(selContact)
// //     if(selContact){loadContact(selContact)}
// //     if(selContact)
// //     return(x=>{
// //       cl("done2",selContact,contactInfo)
// //       saveContact()
// //
// //     })
//   },[selContact])
  useEffect(x=>{
    refContactInfo.current=contactInfo
//     cl(contactInfo)
//     return(x=>{
//       cl("done3",contactInfo)
      if(contactInfo){
        clearTimeout(globs.contSaveContactTO)
        globs.contSaveContactTO=setTimeout(e=>{saveContact(contactInfo)},5000)
      }
//     })
  },[contactInfo])

  var packAddr=(ci,suffix)=>{
    let fields=["nm","s1","s2","ci","st","zp","cn"]
    let vals=fields.map(f=>{
      let id=`${f}${suffix||"D"}`
      let val=ci[id]
      delete ci[id]
      return val
    }).join(";")
    if(vals.length>6){ci[`addr${suffix}`]=vals}
  }

  var packName=(ci)=>{
    ci.n=[ci.Ln,ci.Fn,ci.Mn,ci.N4,ci.N5].join(";")
    delete ci.Ln
    delete ci.Fn
    delete ci.Mn
    delete ci.N4
    delete ci.N5
  }

  var unPackAddr=(addr,suffix)=>{
    let ret={}
    if(addr){
      let [nm,s1,s2,ci,st,zp,cn]=addr.split(";")
      ret[`nm${suffix}`]=nm
      ret[`s1${suffix}`]=s1
      ret[`s2${suffix}`]=s2
      ret[`ci${suffix}`]=ci
      ret[`st${suffix}`]=st
      ret[`zp${suffix}`]=zp
      ret[`cn${suffix}`]=cn
    }
    return ret
  }

  var unPackName=(name)=>{
    let ret={}
    if(name){
      let [ln,fn,mn,n4,n5]=name.split(";")
      ret[`Ln`]=ln
      ret[`Fn`]=fn
      ret[`Mn`]=mn
      ret[`N4`]=n4
      ret[`N5`]=n5
    }
    return ret
  }

  var saveContact=(ci)=>{
    if(initting){return}
    let ci0=Object.assign({},ci)
//     cl(ci)
//     cl(ci.Ln)
//     let ci=Object.assign({},contactInfo)
    if(!ci){return}
    packName(ci0)
    packAddr(ci0,"")
    packAddr(ci0,"H")
    packAddr(ci0,"W")
    packAddr(ci0,"X")
//     cl(ci)
    delete ci0._id
    let cn=contactNames.slice(0)
    let cn0=contactNames.filter(c=>{return c.id==ci.id})[0]
    cn0.t=ci0.n
//     cl(cn0)
    setContactNames(cn)
//     cl(ci)
    wsTrans({uri:"/s/contacts",
      method:"update",body:{
        sessionId:globs.sessionId,
        contactId:ci0.id,
        ci:ci0,
    }})
  }

//   var saveTime=()=>{setSaveTimer(saveContact)}
//
//   var setSaveTimer=()=>{
//     cl("set save")
//     clearTimeout(saveTO)
//     setSaveTO(setTimeout(saveUser,5000))
//   }


  var loadContact=async(contactId)=>{
//     cl(contactId)
  if(!contactId){return}
  if(!globs.sessionId){return}
  let c=await wsTrans({uri:"/s/contacts",
    method:"retrieve",body:{
      sessionId:globs.sessionId,
      contactId:contactId,
    }})
  let nm=unPackName(c.n)
  let addr=unPackAddr(c.addr,"D")
  let addrH=unPackAddr(c.addrH,"H")
  let addrW=unPackAddr(c.addrW,"W")
  let addrX=unPackAddr(c.addrX,"X")
  Object.assign(c,nm,addr,addrH,addrW,addrX)
  setContactInfo(c)
//   cl(c)
  return c
  }

//   var procContactName=(cont)=>{
//     let [ln,fn,mn,n4,n5]=(cont.n||"").split(";")
//     if(!ln){
//       ln=fn
//       fn=""
//       cont.n=[ln,fn,mn,n4,n5].join(";")
//     }
//     cont.v=cont.id
//     cont.t=cont.n
//   }

  var loadInfo=async()=>{
    await waitForWs()
    let contacts=await loadContacts(null,true)
    contacts.forEach(c=>{procContactName(c)})
    contacts=contacts.sort((a,b)=>{return sortObj(a,b,"n")})

//     cl(contacts)
    setContactNames(contacts)
//     cl("initting false")
    setInitting(false)
  }

  var showHead=()=>{
//     if(selTab=="basic"){return showBasic()}
//     let sectIds
    let sects=sectIds[selTab].map(s=>{
      return(
      <td key={s.v} style={{color:"#0088CC",cursor:"pointer"}}
        onClick={e=>{scrollTo(s.v)}}
      >{s.t}</td>
    )})
    return(
      <div>
        <table width="100%"><tbody>
        <tr height="30">{sects}</tr>
        </tbody></table>
        {showPrompts()}
      </div>
    )
  }

//   var myMenu=()=>{
//     let c=menuRef.current
//     c=c||{}
//     cl(c.offsetTop,c.offsetLeft,c.offsetWidth,c.offsetHeight)
//     cl(Object.values(menuRef.current||{}))
//     let left=c.offsetWidth-150
//     let top=c.offsetHeight
//     return(
//       <div style={{position:"absolute",width:150,left:left,top:top,
//         textAlign:"left",padding:10,borderRadius:5,backgroundColor:"#F8F8F8"
//       }}
//       className="menuHover"
//       >
//       <div>menu and more</div>
//       <div>one</div>
//       <div>two</div>
//       </div>
//     )
//   }

  var importVcf=()=>{
    cl("import vcf")
    setShowImpFile(true)
  }

  let tabIds=[
    {v:"brand",t:"Brand"},
    {v:"vendor",t:"Vendor"},
    {v:"ally",t:"Ally"},
    {v:"fan",t:"Fan"},
    {v:"pr",t:"PR"},
  ]

  var getImpNames=async(fileName)=>{
    let resp=await wsTrans({uri:"/s/contacts",
      method:"retrieve",body:{cmd:"getImpNames",fileName:fileName,
        sessionId:globs.sessionId}})
    cl(resp)
    return resp

  }

  var fnCallback=async(fileName)=>{
    setImportName(fileName)
    setShowImpFile()// close
    cl(fileName)
    if(fileName){
      let names=await getImpNames(fileName)
      setImpNames(names)
    }
  }

  var showTabs=()=>{
    let tabs2=tabIds.map(t=>{return(
      <td key={t.v}
      style={{backgroundColor:(t.v==selTab)?"#DDDDDD":"#EEEEEE",cursor:"pointer"}}
      onClick={e=>{
        cl("click")
        cl(t)
        setSelTab(t.v)
      }}
      >{t.t}</td>
    )})
    tabs2.unshift(
      <td key={"head"} style={{backgroundColor:"#301870",color:"#FFFFFF"}}
      ><strong>Contact</strong></td>
    )
    let items=[
      {f:importVcf,t:"Import VCF"},
      {f:e=>{setPageType("import")},t:"show import"},
    ]
    let parms={items:items,parRef:menuRef,
      parCont:<img src="/utils/menu.png" width="24"/>}
    tabs2.push(
      <td key={"menu"} style={{backgroundColor:"#EEEEEE",cursor:"pointer",
        position:"relative"}}
        ref={menuRef}
      ><Menu0 parms={parms}/></td>
    )
//     setTabs(tabs2)
    return tabs2
  }

/*************************** Search Imports *******************/

const [selRow,setSelRow]=useState()

var ssbSrch=()=>{
  cl("srch")
}

var ssbOK=()=>{
  cl("ok")
}

var ssbX=()=>{
  setPageType("basic")
  cl("x")
}

  var MyRB=(field,label,title,group)=>{
    let val={}
    val[field]=label
    return(
      <>
      <input type="radio" name={field} value={label} id={label}
      checked={user[field]==label}
      onChange={e=>setUserField(val)}
      />&nbsp;
      <label htmlFor={label}>{title}</label><br/>
      </>
    )
  }

var showSearchBar=()=>{
  cl(impNames.length)
  let names=(impNames||[]).map((n,i)=>{
    let [ln,fn,mn]=(n||"").split(";").slice(0,3)
    return(ln=="")?`${fn} ${mn}`:`${ln}, ${fn} ${mn}`
  })
  names.sort((a,b)=>{
    if(a<b){return -1}
    if(a>b){return 1}
    return 0
  })
  let rows=names.map((name,i)=>{
    var el
    if(i==selRow){
      el=(
        <div>
        name<br/>
        {MyRB("group","boss","Boss")}
        {MyRB("group","vendor","Vendor")}
        {MyRB("group","ally","Ally")}
        {MyRB("group","fan","Fan")}
        {MyRB("group","pr","PR")}
        </div>
      )
    }else{
      el=name
    }
    return(
      <tr key={i} style={{cursor:"pointer",
        backgroundColor:(i==selRow)?"#AACCEE":"#FFFFFF"}}
      onClick={e=>{setSelRow(i)}}
      ><td>{el}</td>
      </tr>
    )
  })
  return(
    <div>
    <div style={{textAlign:"left",}}>
    <table width="100%"><tbody>
    <tr style={{border:"1px solid black"}}>
      <td width="24"
      ><img width="24" src="/utils/srch.png"
        onClick={ssbSrch}
        style={{opacity:0.3,cursor:"pointer"}}/></td>
      <td><input type="text"
        style={{height:32,border:"0px solid black",width:"100%"}}
        />
      </td>
      <td width="24"><img width="24" src="/utils/ok.png"
        onClick={ssbOK}
        style={{opacity:0.3,cursor:"pointer"}}/></td>
      <td width="24"><img width="24" src="/utils/x.png"
        onClick={ssbX}
        style={{opacity:0.3,cursor:"pointer"}}/></td>
      </tr>
    </tbody></table>
    </div>

    <div style={{height:globs.screen.h-38,overflowY:"auto",wordBreak:"break-word",
      textAlign:"left",padding:10,
    }}>
    <table width="100%"><tbody>
    {rows}
    </tbody></table>
    </div>
    </div>
  )
}

var doSetSelContact=(val)=>{
//   cl(val)
  globs.navigate(val)

}

var showLines=(str)=>{
//   cl(str)
  if(str){
    let parts=str.split("\n")
    let lines=parts.map((p,i)=>{
      return <React.Fragment key={i}>{p}<br/></React.Fragment>})
    lines.unshift(<br key={"br"}/>)
    return lines
  }
}

var ocf=(func,val)=>{return e=>{
//   cl(func,val,e)
  func(val,e)}}

var nameFields=["Ln","Fn","Mn"]

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
//   cl(field.substring(0,2))
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
    setSelField()
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
        value={c[field]||""}
        onKeyUp={ocf(inputKeyPress,"none")}
        onChange={ocf(setContactValue,field)}
        />
        <Record parms={recordParms}/>
      </>
    )
//     }
  }
  let c=contactInfo
  let val=c[field]
//   if(field=="Ln"){cl(val)}// undefined
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
  cl(contactInfo)
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

var getAddr=(suf)=>{
  let c=contactInfo
//   cl(c)
//   cl(c[`nm${suf}`])

  return{
    nm:c[`nm${suf}`],
    s1:c[`s1${suf}`],
    s2:c[`s2${suf}`],
    ci:c[`ci${suf}`],
    st:c[`st${suf}`],
    zp:c[`zp${suf}`],
    cn:c[`cn${suf}`],
  }
}

var putAddr=(suf,e)=>{
  let c=Object.assign({},contactInfo)
  c[`nm${suf}`]=e.nm
  c[`s1${suf}`]=e.s1
  c[`s2${suf}`]=e.s2
  c[`ci${suf}`]=e.ci
  c[`st${suf}`]=e.st
  c[`zp${suf}`]=e.zp
  c[`cn${suf}`]=e.cn
  setContactInfo(c)
  cl(c)
}

var showContactSelect=()=>{
  if(selContact){
    let c=contactInfo
    if(!c){return}
//     cl(c.Ln)
    let [ln,fn,mn]=(c?.n||[]).split(";")
//     cl(ln,fn,mn)
    return(
      <div style={{padding:10}}>
      {showEditField("Title","title")}
      {showEditField("First","Fn")}
      {showEditField("Last","Ln")}
      {showEditField("Organization","org")}
      {showEditField("Web","url")}
      <Phone1 parms={{
        label:"Address",
        addr:getAddr("D"),
        oc:ocf(putAddr,"D")
      }}/>
      {showEditField("Tel Home","telH")}
      {showEditField("Tel Work","telW")}
      {showEditField("Tel Cell","telC")}
      {showEditField("Email","email")}
      {showEditField("Email Work","emailW")}
      <Address1 parms={{
        label:"Address",
        addr:getAddr("D"),
        oc:ocf(putAddr,"D")
      }}/>
      <Address1 parms={{
        label:"Address Home",
        addr:getAddr("H"),
        oc:ocf(putAddr,"H")
      }}/>
      <Address1 parms={{
        label:"Address Work",
        addr:getAddr("W"),
        oc:ocf(putAddr,"W")
      }}/>
      {showEditField("Notes","note",true)}
      </div>
    )

  }else{
//     cl("show select")
//     cl(parRef.current)
    return(
      <div id="contSearch" style={{width:globs.screen.w,height:globs.screen.h-globs.bcHeight,
        backgroundColor:"white",
        }}>
        <Search0 parms={{list:contactNames,oc:doSetSelContact,parRef:parRef}}/>
      </div>
    )
  }
}

  var doSelContact=(val)=>{
    cl("sel contact")
    cl(f,e)
  }

  var ocv=(func)=>{return e=>{func(e.target.value)}}

var showImportPage=()=>{
  return(
    <div id="contMain" ref={parRef}
    style={{width:globs.screen.w,height:globs.screen.h-globs.bcHeight,
      backgroundColor:"white",textAlign:"left",
      overflowY:"auto"
//       padding:10,
      }}>
      {showContactSelect()}
    </div>
  )
}

/*************************** End Search Imports *******************/
  var showBasicPage=()=>{
  return (
    <div className="App">
      <div style={{width:430,height:920,backgroundColor:"white",
      }}>
      {<FileUpload parms={parms}/>}
      <table width="100%"><tbody>
      <tr height="30">
      {showTabs()}
      </tr>
      </tbody></table>
      </div>
    </div>
  )
  }

  let parms={
    w:globs.screen.w,
    h:200,
    type:"vcf",
    fnCallback:fnCallback,
    show:showImpFile||false,
  }
//   cl(selTab)
//   cl(pageType)
  switch(pageType){
    case "basic":
      return showBasicPage()
    case "import":
      return showImportPage()
  }
}
//     <div className="App">
//       <div style={{width:430,height:920,backgroundColor:"white",
//       }}>
//       {<FileUpload parms={parms}/>}
//       <table width="100%"><tbody>
//       <tr height="30">
//       {tabs}
//       </tr>
//       </tbody></table>
//       </div>
//     </div>

export default Contacts
