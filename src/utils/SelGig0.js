import React, { useState,useRef,useEffect } from "react";
import ReactDOM from "react-dom/client";
import {cl,globs,get,trimStr,
} from '../utils/utils.js'
import Search0 from './Search0.js'

var SelGig0=({parms})=>{
//   const [open,setOpen]=useState()
//   const [selTab,setSelTab]=useState(parms.tabs[0].v)
  const [loaded,setLoaded]=useState(false)
  const [gigNames,setGigNames]=useState()
  const [selGigs,setSelGigs]=useState([])
  const [open,setOpen]=useState()
  const parRef=useRef()
  useEffect(x=>{
    loadInfo()
  },[])
  cl(parms)

  var loadInfo=async()=>{
//     cl("loadInfo")
    setSelGigs(parms.sel)
    setLoaded(true)
  }

  var getGigNames=async()=>{
    if(gigNames){return gigNames}
    let gigs=await get("gigs")
//     cl(gigs)
    let names=gigs.filter(g=>{return g.indeed.company})
      .map(g=>{return{v:g.id,t:g.name,h:selGigs.includes(g.id)?"#0060C0":"black"}})
    setGigNames(names)
  }

  var doSetSelGig=(val)=>{
    cl(val)
    if(parms.one&&!val.cmd){
      cl(val)
      setOpen(false)
      setSelGigs([val])
      parms.oc([val])
      return
    }
    if(val.cmd){
      val.val=selGigs
      setOpen(false)
      parms.oc(val)
      return
    }
//     return parms.oc({cmd:val.cmd,val:selGigs})
//     cl(val)
    let pos=(selGigs||[]).indexOf(val)
    if(pos>=0){
      selGigs.splice(pos,1)
    }else{
      selGigs.push(val)
    }
//     setSelGigs(selGigs.slice(0))
    updGigNames(selGigs)
    setSelGigs(selGigs.slice(0))
//     parms.oc(selGigs)
  }

  var updGigNames=(selGigs)=>{
    gigNames.forEach(n=>{
      n.h=(selGigs.includes(n.v)?"#0060C0":"black")
    })
//     cl(selGigs)
//     cl((gigNames||[]).slice(-1)[0]?.h)
    setGigNames(gigNames.slice(0))
  }

  var doSetOpen=()=>{
    setOpen(true)
    cl(parms.sel)
    setSelGigs(parms.sel.slice(0))
    updGigNames(parms.sel.slice(0))

  }

  var showSingleMultiGigs=(gigList,gigName)=>{
    if(parms.one){
      return(
        <>
        <strong>Gig: </strong>
        <span onClick={doSetOpen} style={{color:"#4488CC",cursor:"pointer"}}
        >{trimStr(gigName,40)}</span>
        </>
      )
    }else{
      return(
        <>
        <strong style={{color:"#4488CC",cursor:"pointer"}}
        onClick={doSetOpen}
        >For Gigs</strong><br/>
        {gigList}
        </>
      )
    }
  }

  var showPage=()=>{
      getGigNames()
      cl(selGigs)
      let gigList=(gigNames||[])
        .filter(n=>{return selGigs.includes(n.v)})
        .map(n=>{return <span>{trimStr(n.t,45)}<br/></span>})
//         cl(gigList)
//       cl((gigNames||[]).slice(-1)[0]?.h)
//       cl(selGigs)
//         cl(gigNames)
        let gigName=(gigNames||[]).filter(n=>{
          return n.v==selGigs[0]})[0]?.t||"Unknown"
      return(
        <div>
          <div ref={parRef} style={{position:"absolute",left:0,top:0,
            width:globs.screen.w-40,display:(open)?"block":"none",
            height:globs.screen.h-globs.bcHeight-40,
            backgroundColor:"white",border:"1px solid black",
            borderRadius:10,padding:20
          }}>
          {open&&
            <Search0 parms={{list:gigNames||[],oc:doSetSelGig,
              parRef:parRef/*,one:parms.one*/}}/>
          }
          </div>
          <div style={{display:(open)?"none":"block"}}>
          {showSingleMultiGigs(gigList,gigName)}
          </div>
        </div>
      )
  }

  if(loaded){return showPage()}
}

export default SelGig0
