import React, { useState,useEffect,useRef } from "react";
import ReactDOM from "react-dom/client";
import {Button} from 'react-bootstrap';
import SelectionList1 from "../utils/SelectionList1.js"
import SelectionList2 from "../utils/SelectionList2.js"
import Search0 from "./Search0.js"
import {cl,globs,tsToInDate,tsToData,procContactName,waitForWs,loadContacts,
  sortObj,
} from '../utils/utils.js'

function NewContact0({parms}) {
  const [date,setDate]=useState("")
  const [eventType,setEventType]=useState("Unknown")
  const [contactType,setContactType]=useState("Unknown")
  const [meetingType,setMeetingType]=useState("Unknown")
  const [followupType,setFollowupType]=useState("Unknown")
  const [selContact,setSelContact]=useState()
  const [showSelContact,setShowSelContact]=useState()
  const [contactNames,setContactNames]=useState()
  const [contactOpts,setContactOpts]=useState()
  const [contactOptSel,setContactOptSel]=useState()
  const parRef=useRef()
  useEffect(x=>{
    setDate(tsToInDate(parms.event.date))
    let ev=parms.event
    if(ev.id){
//       cl(ev)
      setEventType(ev.eventType)
//       setContactType(ev.contactType)
      setMeetingType(ev.meetingType)
      setSelContact(ev.selContact)
      setFollowupType(ev.followupType)
      loadInfo()
    }
  },[])

  var loadInfo=async()=>{
    cl("loadInfo")
    await waitForWs()
    let contacts=await loadContacts(null,true)
//     cl(contacts)
    contacts.forEach(c=>{procContactName(c)})
    contacts=contacts.sort((a,b)=>{return sortObj(a,b,"n")})
    setContactNames(contacts)
  }

  var newTime=(vals,e)=>{
    setDate(e.target.value)
  }

  var evType=(vals,e)=>{vals(e)}

  var saveNew=(vals,e)=>{
//     cl(vals)
    parms.oc({
      cmd:vals,
      id:parms.event.id,
      date:Date.parse(date)/1000,
      eventType:eventType,
//       contactType:contactType,
      meetingType:meetingType,
      selContact:selContact,
      followupType:followupType})
  }

  var onChange=(type,vals,e)=>{
    var types={
      newTime:newTime,
      type:evType,
      saveNew:saveNew,
    }
//     cl(types[type])
    if(types[type]){
      types[type](vals,e)
    }else{
      cl(`No onChange for ${type}`)
    }
  }

  var oc=(type,vals)=>{return e=>{onChange(type,vals,e)}}
  var ocf=(func,val)=>{return e=>{func(val,e)}}


  var useSelect=(show,name,opts0,val,valType)=>{
//     cl(show,name,opts0)
    if(show){
      let opts=opts0.map(o=>{return{v:o,t:o}})
      return(
        <div>
        <strong>{name}: </strong><SelectionList1
        parms={{
          opts:opts,
          val:val,
          oc:oc("type",valType),
        }}/>
        </div>
      )
    }
  }

//   var selContact=(vals,e)=>{
//     cl(vals,e)
//   }
  var doSelectContact=(contactId)=>{
    setSelContact(contactId)
    setShowSelContact(false)
  }

  var getContactName=(contactId)=>{
//     cl(contactId)
//     cl(contactNames)
    let ci=(contactNames||[]).filter(c=>{return c.id==contactId})[0]
    if(ci){
      let [ln,fn]=ci.t.split(";").slice(0,2)
      return `${(fn)?`${fn} `:fn}${ln}`
    }
    return "Unknown"
  }

  var getContactOpts=async(pref)=>{
    let contact=await loadContacts(selContact,false)
    let keys=Object.keys(contact).filter(
      k=>{return (k.indexOf(pref)==0)&&(contact[k]!="")&&(k.slice(-1)!="P")})
    let opts=keys.map(k=>{return{
      t:k,
      v:contact[k]
    }})
    cl(opts)
      cl(keys)
    return opts

//     cl(contact)
  }

  var doContactOpts=async(type)=>{
    cl(type,selContact)
    let pref=(type=="mailto")?"email":"tel"
    let opts=await getContactOpts(pref)
    cl(opts)
    setContactType(type)
    setContactOpts(opts)
  }

  var doSetContactOptSel=(val,e)=>{
    cl(e)
  }

//   <a href="tel:+1234567890">Call us now!</a>
//   <a href="sms:5551234567?body=Hello">Text us!
//   <a href="mailto:your_email@example.com">Email Us</a>


  var showContactOpts=()=>{
    if(contactOpts){
      let opts=contactOpts.map(o=>{
//         let link=""
//         switch(contactType){
//           case "phone":
//           case "text":
//             let pref={phone:"tel",text:"sms"}
//             let tel=o.v.replaceAll("-","")
//             link=`tel:+${tel}`
//             break
//
//         }
        return(
          <a href={`${contactType}:${o.v}`} target="_blank"
          >{o.v}<br/></a>
        )
      })
      cl(contactOpts)
      cl(opts)

      return(
        <div>
        {opts}
        </div>
      )
    }
  }

  var doShowSelContact=()=>{
    if(showSelContact){
      return(
        <Search0 parms={{list:contactNames,oc:doSelectContact,parRef:parRef}}/>
      )
    }else{
      return(
        <div>
          <strong>Contact: </strong>
          <span className="smHead"
          onClick={ocf(setShowSelContact,true)}
          >{getContactName(selContact)}</span><br/>
          <span className="smHead"
          onClick={ocf(doContactOpts,"tel")}
          >Phone</span>&nbsp;
          <span className="smHead"
          onClick={ocf(doContactOpts,"sms")}
          >Text</span>&nbsp;
          <span className="smHead"
          onClick={ocf(doContactOpts,"mailto")}
          >Email</span>&nbsp;
          {showContactOpts()}
        </div>
      )
    }
  }

  var doShowCreate=()=>{
    let day=[
    {c:"#6666CC",d:"Sun"},
    {c:"#0088FF",d:"Mon"},
    {c:"#00AAAA",d:"Tue"},
    {c:"#00AA00",d:"Wed"},
    {c:"#888800",d:"Thu"},
    {c:"#CC8800",d:"Fri"},
    {c:"#CC6666",d:"Sat"},
    ][tsToData(Date.parse(date)/1000).da]||{}
//     cl(day)
    return(
      <div ref={parRef} style={{position:"absolute",width:globs.screen.w-40,height:400,
        border:"1px solid black",borderRadius:10,backgroundColor:"white",
        zIndex:1,padding:10,overflowY:"auto"
      }}>
        <img src="/utils/lang.png" width="24"
          style={{marginBottom:8,cursor:"pointer"}}
          onClick={ocf(saveNew,"cancel")}/>
        <span style={{fontSize:"1.75rem",fontWeight:500}}>
        {parms.event.id?"Edit":"New"} Event</span>
        <div style={{marginBottom:10}}>
        <div style={{width:50,height:26,border:"1px solid black",display:"inline-block",
          backgroundColor:day.c,marginBottom:-8,color:"white",textAlign:"center",
          fontWeight:700
        }}>{day.d}
        </div>

        <input type="datetime-local"
          onChange={oc("newTime")}
          value={date}
        />
          <Button style={{height:28,lineHeight:"14px",float:"right"}}
          onClick={ocf(saveNew,"save")}
          >Save</Button>
        </div>
        {useSelect(true,"Event Type",
          ["Contact","Followup","Meeting","Gig Change"],eventType,setEventType)}
        {doShowSelContact()}
        {useSelect(eventType=="Meeting","Meeting Type",
          ["Online","Phone","Physical"],meetingType,setMeetingType)}
        {useSelect(eventType=="Followup","Followup Type",
          ["Confirm Interest","Clarify Scope","Answer Questions","Nudge Decision",
          "Offer Alternatives","Status Update","Request Feedback","Resolve Issues",
          "Confirm Details","Schedule Delivery","Ensure Satisfaction",
          "Request Testimonial","Offer Additional Help","Pitch Next Step",
          "Stay Top of Mind"],followupType,setFollowupType)}
      </div>
    )
//         {useSelect(eventType=="Contact","Contact Type",
//           ["Phone","Text","Email"],contactType,setContactType)}
  }

  return doShowCreate()
}

export default NewContact0
