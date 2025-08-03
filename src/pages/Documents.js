import React, { useState,useRef,useEffect } from "react";
import ReactDOM from "react-dom/client";
import ActionButton0 from "../utils/ActionButton0.js"
import Menu1 from "../utils/Menu1.js"
import EditField1 from "../utils/EditField1.js"
import SelGig0 from "../utils/SelGig0.js"
import FileUpload from "../utils/FileUpload.js"
import {cl,globs,doGetPostBasic,gpOpenAi,wsTrans,getTime,loadDocs,get,put,
  tsToInDate,tsToDisplay,
} from '../utils/utils.js'

function Documents() {
  const [email, setEmail] = useState("red");
  const [doc,setDoc]=useState()
  const [selDoc,setSelDoc]=useState()
//   const [docName,setDocName]=useState("")
//   const [docNotes,setDocNotes]=useState("")
  const [docs,setDocs]=useState()
  const [saveDocTO,setSaveDocTO]=useState()
  const [showImpFile,setShowImpFile]=useState()
  const [page,setPage]=useState()
  const [loaded,setLoaded]=useState(false)
  const [showGigs,setShowGigs]=useState(false)
  const fileRef=useRef()
  const parRef=useRef()
  useEffect(x=>{
    let [docId]=globs.loc?.split("/").slice(2)||[]
    loadInfo(docId)
  },[])
  useEffect(x=>{
    let [docId]=globs.loc?.split("/").slice(2)||[]
//     cl(docId,selDoc)
    if(docId!=selDoc){
      setSelDoc(docId)
      setShowGigs(false)
    }
  })

  var loadInfo=async(docId)=>{
    let docs0=await get("docs")
    setDocs(docs0)
//     cl(docs0)
    if(docId){
//       cl(docId)
      let doc0=await get("docs",docId)
//       cl(doc0)
      setDoc(doc0)
    }
    setLoaded(true)
  }

  var ocf=(func,val)=>{return e=>{func(e,val)}}// e,val is new

//   var fnCallback=(a,b)=>{
//     cl(a,b)
//   }

  var onChange=(type,vals)=>{
    switch(type){
      case "New":
        fileRef.current.click()
        break
    }
  }

//   let parms={
//     w:globs.screen.w,
//     h:200,
//     type:"vcf",
//     fnCallback:fnCallback,
//     show:true||false,
//   }

  var fileUpload=async(files,useType,fileId,ext/*,fileExt*/)=>{
    let selectedFile=files.target.files[0]
    if(!selectedFile){return}
    let data = new FormData()
    data.append("type", useType)
    data.append("fileId", fileId)
    data.append("ext",ext)
//     data.append("fileExt", fileExt)
    data.append("sessionId", globs.sessionId)
    data.append('file', selectedFile)
    let url=`https://sidehsl.com:3203/uploads`
    let method="POST"
    let type="multipart/form-data"
    cl("do get post")
    let ret=await doGetPostBasic(url, method, data, type)
//     cl(ret)
  }

  var makeId=async(name)=>{
  let prompt=`Create a human-readable abbreviation for the name ${name}, 10 letters or less, and return just that 10 letter response.`
  return await gpOpenAi(prompt)
//   cl(name,id)
  }

  var saveDoc=async(doc)=>{
    await put("docs",doc)// save to globs and db
    setDoc(Object.assign({},doc))// update state
    setDocs((await get("docs")).slice(0))
  }

  var saveDocTimer=(doc0)=>{
    clearTimeout(saveDocTO)
    setSaveDocTO(setTimeout(e=>{
      saveDoc(doc0)
    },1000))
  }

  var createDoc=async(docId,docFn,docExt,useType)=>{
    let doc0={
//         sessionId:globs.sessionId,
        id:docId,
        fn:docFn,
        ext:docExt,
        useType:useType,
        ts:getTime(),
        name:docFn,
        notes:"",
    }
    await saveDoc(doc0)
    globs.navigate(doc0.id)
  }

  var newDoc=async(files)=>{
    let file=files.target.files[0]
    if(!file){return}
    let fn=file.name.split(".").slice(0,-1).join(".")
    cl(fn)
    let docId=await makeId(fn)
    docId=docId.replaceAll(" ","_")
    let ext=file.name.split(".").slice(-1)[0]
    cl(docId,ext)
    await createDoc(docId,fn,ext,"docs")
    await fileUpload(files,"docs",docId,ext)
    cl(file.name)
  }

  var setDocInfo=(val,type)=>{
//     cl(type,val)
    let doc0=Object.assign(doc)
    doc0[type]=val.e
    setDoc(doc0)
    saveDocTimer(doc0)
  }

//   var showUpload=()=>{
//     cl(globs)
//     return(
//       <div>
//       <input ref={fileRef} type="file" onChange={newDoc}
//       style={{display:"none"}}/>
//       <ActionButton0 parms={{right:{v:"New",t:"New"},oc:onChange}}/>
//       <EditField1 parms={{
//         label:"Name",
//         val:doc.name||doc.id,
//         oc:ocf(setDocName)
//       }}/>
//       <EditField1 parms={{
//         label:"Notes",
//         val:doc.notes,
//         multi:true,
//         oc:ocf(setDocNotes)
//       }}/>
//       </div>
//     )
//   }

  var showUpload=()=>{
    let da=new Date(doc.ts*1000)
    let da2=tsToDisplay(doc.ts,"mm/dd/yy hh/mm")
//     cl(da2)
    return(
      <span>Upload: {da2}</span>
    )
  }

  var showType=()=>{
    let type={png:"Png Image",csv:"CSV File",ico:"Icon Image"

    }[doc.ext]||"Unknown"
    return <span>Type: {type}</span>
  }

  var doSetShowGigs=()=>{
    cl("doset")
    setShowGigs(true)
  }

  var doSetSelGigs=(val)=>{
//     cl(val)
//     cl(doc.gigs)
    setShowGigs(false)
    if(val.cmd=="ok"){
      cl("save to db")
      doc.gigs=val.val
      put("docs",doc)
    }
    setDoc(Object.assign({},doc))
//     cl(doc.gigs)
//     else{
//       doc.gigs=val.val
//       setDoc(Object.assign(doc))
//     }
//     cl(doc.gigs)
  }

  var showGigsPopUp=()=>{
//     if(showGigs){
//         <SelGig0 parms={{w:globs.screen.w-40,
//           h:globs.screen.h-globs.bcHeight-40}}/>
//     cl(docs.gigs)
      return(
        <div>
        <SelGig0 parms={{w:globs.screen.w-40,
          h:globs.screen.h-globs.bcHeight-40,
          sel:doc.gigs.slice(0),//Object.assign({},doc.gigs),
          parRef:parRef,
//           open:showGigs,
          oc:doSetSelGigs,
        }}/>
        </div>
      )
//     }else{
//       return(
//         <><strong style={{color:"#4488CC",cursor:"pointer"}}
//         onClick={doSetShowGigs}
//         >Gigs
//         </strong><br/></>
//       )
//     }
  }

  var showDoc=()=>{
    return(
      <div ref={parRef} style={{position:"relative"}}>
      {showUpload()}<br/>
      {showType()}<br/>
      {showGigsPopUp()}
      <EditField1 parms={{
        label:"Name",
        val:doc.name||doc.id,
        oc:ocf(setDocInfo,"name")
      }}/>
      <EditField1 parms={{
        label:"Notes",
        val:doc.notes,
        multi:true,
        oc:ocf(setDocInfo,"notes")
      }}/>
      </div>
    )
  }

//   var doNav=(e,val)=>{
//     globs.navigate(val)
//   }

//   var getDoc=(id)=>{
//     return docs.filter(d=>{return d.id==id})[0]
//   }

  var chooseDoc=async(val)=>{
//     cl(val)
    let doc=await get("docs",val.link)
//     doc=getDoc(val.link)
//     cl(doc)
//     cl(doc.name||doc.id)
    setDoc(doc)
//     setDocName(doc.name||doc.id)
//     setDocNotes(doc.notes)

    globs.navigate(`/Doc/${val.link}`)
  }

//   var showDocList=()=>{
// //     cl(docs)
//     if(selDoc){return showDoc()}
//     let dynMenu=(docs||[]).map(d=>{
// //       cl(d.name.length)
//       let name=(d.name.length)?d.name:d.id
//       return{h:name,hl:d.id}
//     })
//     return Menu1({parms:{dynMenu:dynMenu,cb:chooseDoc}})
// //     {h:"The Company",
// //     hl:"Company"},
//
//
//   }

  var showList=()=>{
//     cl(globs)
    let dynMenu=(docs||[]).map(d=>{
//       cl(d.name.length)
      let name=(d.name.length)?d.name:d.id
      return{h:name,hl:d.id}
    })
    return(
      <div>
      <input ref={fileRef} type="file" onChange={newDoc}
      style={{display:"none"}}/>
      <ActionButton0 parms={{right:{v:"New",t:"New"},oc:onChange}}/>
      <Menu1 parms={{dynMenu:dynMenu,cb:chooseDoc}}/>
      </div>
    )
//     return(
//       <div>
//       <ActionButton0 parms={{right:{v:"new",t:"New"},oc:ocf(doNav,"upload")}}/>
//       List
//       </div>
//     )
  }

  var showPage=()=>{
    return (selDoc)?showDoc():showList()
  }

  if(loaded){
//     cl("return")
    return (
      <div id="docCont" style={{width:globs.screen.w,
        height:globs.screen.h-globs.bcHeight,
        backgroundColor:"white",padding:20}}>
        {showPage()}
      </div>
    );
  }
}

export default Documents
