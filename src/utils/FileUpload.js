import React, { useState,useRef } from "react";
import ReactDOM from "react-dom/client";
import {Button} from 'react-bootstrap';
// import NavBar from "./navbar.js"
import {cl,globs,doGetPostBasic} from '../utils/utils.js'

var FileUpload=({parms})=>{
//   const [open,setOpen]=useState()
//   const [selectedFile,setSelectedFile]=useState()
  const fileRef=useRef()
//   cl(parms)

  var fileChange=(x)=>{
//     cl(x.target.files)
    setSelectedFile(x.target.files[0])
  }

  var fileUpload=async(files)=>{
    let selectedFile=files.target.files[0]
    if(!selectedFile){return}
//     cl(selectedFile.name)
//     cl(parms)
    parms.fnCallback(selectedFile.name)
    let data = new FormData()
    data.append("type", parms.type)
    data.append("sessionId", globs.sessionId)
    data.append('file', selectedFile)
    let url=`https://sidehsl.com:3203/uploads`
//     cl(globs)
    let method="POST"
    let type="multipart/form-data"
    let ret=await doGetPostBasic(url, method, data, type)
    parms.fnCallback(selectedFile)
  }

  if(parms.show){
    return(
      <div style={{width:parms.w,
        border:"1px solid black",borderRadius:10,zIndex:1,
        backgroundColor:"#FFFFCC",position:"absolute",padding:20,
      }}>
      <input ref={fileRef} type="file" onChange={fileUpload}
      style={{display:"none"}}/>
      <h3>Import Contacts</h3>
      <p style={{paddingLeft:50,paddingRight:50}}
      >Choose the "vcf" file that has your contacts</p>
      <Button
      onClick={e=>(parms.fnCallback(null))}
      >Cancel</Button>&nbsp;
      <Button
      onClick={e=>fileRef.current.click()}
      >Choose File</Button>&nbsp;
      </div>
    )
  }
}

export default FileUpload
