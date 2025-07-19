import React, { useState,useRef,useEffect } from "react";
import ReactDOM from "react-dom/client";
import {Button} from 'react-bootstrap';
import Input0 from "../utils/Input0.js"
import {cl,saveUser,globs,wsTrans} from '../utils/utils.js'

var JobTitles0=({parms})=>{
  const [open,setOpen]=useState()
  const [newJobTitle,setNewJobTitle]=useState()
  const [floatInfo,setFloatInfo]=useState()
  const [saveTO,setSaveTO]=useState()
  const [upd,setUpd]=useState(0)
//   const [user,setUser]=useState({})
//   cl("job titles")
//   cl(parms.user)
//   cl(parms.userRef)

  var showFloat=()=>{
    if(!floatInfo){return}
    return(
      <div style={{position:"absolute",top:(globs.screen.h||0)/2-100,
        left:25,backgroundColor:"#FFFFFF",
        border:"1px solid black", borderRadius:10,padding:10,textAlign:"left"
      }}
      >
      <label><strong>Enter a New Job Title</strong></label><br/>
      <input type="text" style={{border:"1px solid #CCCCCC"}}
        value={newJobTitle||""}
        onChange={e=>{setNewJobTitle(e.target.value)}}
      /><br/><br/>
      <Button
      onClick={e=>setFloatInfo()}
      >Cancel</Button>&nbsp;
      <Button
      onClick={e=>{floatInfo.okFunc(newJobTitle)}}
      >Save</Button>&nbsp;
      <Button
      onClick={e=>{floatInfo.makeFunc(newJobTitle)}}
      >Make</Button>

      </div>
    )
  }

  var showHideFloat=(show,title,value,setValue,saveFunc,makeFunc)=>{
    if(!show){setFloatInfo();return}
    setFloatInfo({
      title:title,
      val:value,
      setVal:setValue,
      okFunc:saveFunc,
      makeFunc:makeFunc,
    })
  }

  var fixJobTitles=(arr)=>{
    return(arr||[]).map(j=>{return{t:j,e:0}})
  }

  var makeJobTitles=async()=>{
    cl("make job titles")
    let resp=await wsTrans({uri:"/s/users",
      method:"create",body:{cmd:"makeJobTitles",sessionId:globs.sessionId}})
//     cl(arr)
//     let resp="```json\n[\n    \"Podcast Producer\",\n    \"Content Writer\",\n    \"Narrative Designer\",\n    \"Voiceover Artist\",\n    \"Audio Engineer\"\n]\n```"
//     cl(resp)
//     let obj=JSON.parse(resp)
//     cl(obj)
    let arr=JSON.parse(resp)
//     let us={jobTitles:arr}
    arr=fixJobTitles(arr)
    let user0=Object.assign(parms.userRef.current)
    if(!user0.jobTitles){user0.jobTitles=[]}
    user0.jobTitles.push(...arr)
//     cl(arr)
    parms.setUser(user0)
    cl("user set")
    setUpd(upd+1)
    setSaveTimer()
  }

  var setSaveTimer=()=>{
    clearTimeout(saveTO)
//     cl(parms.userRef)
    setSaveTO(setTimeout(e=>{saveUser(parms.userRef)},5000))
  }

  var deleteJobTitle=(n)=>{
    let user0=Object.assign({},parms.user)
    user0.jobTitles.splice(n,1)
    parms.setUser(user0)
    setUpd(upd+1)
    setSaveTimer()
  }

  var addJobTitle=(newJob)=>{
    let user0=Object.assign({},parms.user)
    user0.jobTitles.push({t:newJob,e:0})
    parms.setUser(user0)
    setNewJobTitle()
    setSaveTimer()
  }

  var setJobEnable=(ind,val)=>{
//     cl(ind,val)
    let user0=Object.assign({},parms.user)
    user0.jobTitles[ind].e=val
    parms.setUser(user0)
    setSaveTimer()
  }

  var setUserField=(field,val)=>{
    let user0=Object.assign({},parms.userRef.current)
    user0[field]=val
    parms.setUser(user0)
    setUpd(upd+1)
    setSaveTimer()
  }

  var showJobTitles=()=>{
//     let jt=["Retail Associate","Warehouse Associate"]
//     cl(parms.user)
    let jsList=(parms.user?.jobTitles||[]).map((j,i)=>{
      return(
        <tr key={i}>
        <td width="30">
          <input id={i} type="checkbox" id={i}
            checked={j.e}
            onChange={e=>{setJobEnable(i,e.target.checked)}}
          />
        </td>
        <td width="30" style={{cursor:"pointer"}}
        onClick={e=>{deleteJobTitle(i)}}
        >X</td>
        <td><label htmlFor={i}>{j.t}</label></td>
        </tr>

      )
    })
//     cl(parms.user.searchZip)
    return(
      <div>
      <Input0 parms={{
        title:"Search Zip Code",
        val:parms.user.searchZip||"",
        onChange:e=>setUserField("searchZip",e),
      }}/>
      <label><strong>Search Job Titles</strong></label>&nbsp;
      <img src="/utils/plus.png" width="20"
        style={{cursor:"pointer", marginBottom:2}}
        onClick={
          e=>{
            setNewJobTitle()
            showHideFloat(true,"Enter a New Job Title",newJobTitle,
            setNewJobTitle,addJobTitle,makeJobTitles)}}
      />
      <br/>
      <table><tbody>
      {jsList}
      </tbody></table>
      </div>
    )
  }

  return(
    <div>
    {showJobTitles()}
    {showFloat()}
    </div>
  )
}

export default JobTitles0
