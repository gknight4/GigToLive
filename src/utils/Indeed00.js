import React, { useState,useRef,useEffect } from "react";
import ReactDOM from "react-dom/client";
import Address1 from "../utils/Address1.js"
import {cl,cl2,gpOpenAi} from '../utils/utils.js'

var Indeed00=({parms})=>{
  const [gig,setGig]=useState()
  const gigRef=useRef()
//   cl(parms)

//   useEffect(e=>{
//     if(!parms.gig.indeed.synopsis){makeSynopsis()}
//     setGig(parms.gig)
//   },[])
  useEffect(e=>{
    gigRef.current=gig
//     cl(gig)
  },[gig])
  useEffect(e=>{
//     cl(parms.gig)
    if(!parms.gig.indeed?.synopsis){makeSynopsis()}
    setGig(parms.gig)
  })

  var procDesc=async(br,desc)=>{
    let prompt=`Read the following document, and summarize it in three sections of 100 words each. The sections are: 'Who We Are','What your duties would be','What we Want'. return it as a json object. This is the document:\n\n${desc}`
//     cl(prompt)
    return await gpOpenAi(prompt)
  }

  var makeSynopsis=async()=>{
    if(!parms.gig.indeed){return}
    cl("make synopsis")
    let desc=await procDesc(parms.gig.id,parms.gig.indeed?.description)
    let obj=JSON.parse(desc)
//     cl(obj)
    let gig0=Object.assign(gigRef.current)
    gig0.indeed.synopsis=obj
//       cl("set brand")
    setGig(gig0)
    parms.onChange(gig0)
  }


  var showInField=(val,title)=>{
//     cl(val)
    if(val){
      return(
        <>
        <strong>{title}</strong><br/>
        <span>{val}</span><br/>
        </>
      )
    }
  }

const [showDesc,setShowDesc]=useState()

  var showInLong=(val,title)=>{
    if(showDesc){
      if(val){
        let vals=val.split("\n")
        let sects=vals.map((v,i)=>{return(<span key={i}>{v}<br/></span>)})
        return(
          <>
          <strong style={{cursor:"pointer"}}
          onClick={e=>setShowDesc(false)}
          >Hide {title}</strong><br/>
          {sects}
          </>
        )
      }
    }else{
      return(
        <span style={{color:"#0088CC",cursor:"pointer"}}
        onClick={e=>setShowDesc(true)}
        ><strong>Show {title}</strong></span>
      )
    }
  }

  var showInLink=(val,title)=>{
//     cl(val,title)
    if(val){
      return(
        <>
        <a href={val} target="_blank">{title}</a><br/>
        </>
      )
    }
  }

  var showMakeSects=(obj)=>{
    if(obj){
//       cl(obj)
      let sects=[]
      Object.keys(obj).forEach((k,i)=>{
        sects.push(<strong key={i+"h"}><br/>{k}<br/></strong>)
        sects.push(<span key={i+"t"}>{obj[k]}<br/></span>)
      })
      sects.push(<br key="br"/>)
      return sects
    }else{
      return(
        <span>(Working on it...)<br/></span>
      )
    }
  }

  var putAddr=(val,e)=>{
    let gig0=Object.assign({},gig)
    gig0.indeed.addr=e
    setGig(gig0)
    parms.onChange(gig0)
//     setGig(gig)
//     let c=Object.assign({},contactInfo)
//     c[`nm${suf}`]=e.nm
//     c[`s1${suf}`]=e.s1
//     c[`s2${suf}`]=e.s2
//     c[`ci${suf}`]=e.ci
//     c[`st${suf}`]=e.st
//     c[`zp${suf}`]=e.zp
//     c[`cn${suf}`]=e.cn
//     setContactInfo(c)
//     cl(c)
  }

  var ocf=(func,val)=>{return e=>{func(val,e)}}

  var showAddress=()=>{
    return(
      <Address1 parms={{
        label:"Address",
        addr:gig.indeed.addr,
        oc:ocf(putAddr)
      }}/>
    )
  }

  var showIndeed=(gig)=>{
//     cl(br.indeed)
//     cl(gig)
    if(!gig?.indeed){return}
    let ind=gig.indeed
//     cl(ind)
    return(
      <div>
      {showInField(ind.company,"Company")}
      {showInField(ind.location,"Location")}
      {showAddress()}
      {showInField(`${ind.rating} / ${ind.reviewsCount}`,"Rating / Reviews")}
      {showInField(`${ind.positionName} - ${ind.jobType} `,"Position")}
      {showInField(ind.salary,"Salary")}
      {showInField(ind.postedAt,"Posted")}
      {showInLink(ind.externalApplyLink,"Apply at Company")}
      {showInLink(ind.url,"Indeed Listing")}
      {showInLink((ind.companyInfo||{}).indeedUrl,"Indeed Company Info")}
      {showInLink((ind.companyInfo||{}).url,"Company Page")}
      {showMakeSects(ind.synopsis)}
      {showInLong(ind.description,"Full Description")}<br/><br/>
      </div>
    )
  }
//   cl(parms)
  return(
    <div>
    {showIndeed(gig)}
    </div>

  )
}

export default Indeed00
