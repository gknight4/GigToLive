import React, { useState,useEffect,useRef } from "react";
import ReactDOM from "react-dom/client";
// import NavBar from "./navbar.js"
import Menu1 from "../utils/Menu1.js"
import Breadcrumbs from "../utils/Breadcrumbs.js"
import ActionButton0 from "../utils/ActionButton0.js"
import NewEvent0 from "../utils/NewEvent0.js"
import {cl,globs,wsTrans,brands,saveBrand,waitForLoadInfo,gpOpenAi,az,getTime,
  getRandomString,/*loadEvents,*/tsToData,get,
} from '../utils/utils.js'
function Calendar() {
  const [showCreate,setShowCreate]=useState(false)
  const [newDate,setNewDate]=useState()
  const [month,setMonth]=useState()
  const [fromTo,setFromTo]=useState()
  const [events,setEvents]=useState([])
  let tabRef=useRef()
  let dayRef=useRef()
  let da=new Date()
  const [selDay,setSelDay]=useState([da.getFullYear(),da.getMonth(),da.getDate()])
  useEffect(x=>{
//     cl("starting")
    loadInfo()
  },[])

  var loadInfo=async()=>{
    let da=tsToData(+(new Date())/1000)
    setMonth(((da.yr-1970)*12+da.mo)-1)
//     let f=
//     cl(f)
//     let t=
//     cl(t)
    let fromTo0={
      from:+(new Date(da.yr,da.mo-1,1))/1000,
      to:+(new Date(da.yr,da.mo+1,1))/1000,
    }
    setFromTo(fromTo0)
    let events=await get("events",fromTo0)
//     cl(events)
//     events=await loadEvents(fromTo0)
//     cl(events)
    setEvents(events||[])
  }

  var moLeft=()=>{
    setMonth(month-1)
  }

  var moRight=()=>{
    setMonth(month+1)
  }

//   var selDay=(yr,mo,da)=>{
//     cl(yr,mo,da)
//
//   }

  var markDays=(events,fromTime)=>{
//     cl(events)
    let days={}
    ;(events||[]).forEach(e=>{days[Math.floor((e.date-fromTime)/86400)]=1})
    return Object.keys(days).map(d=>{return +d})
//     cl(days)
  }


  var showCalendar=(mon,left)=>{
    if(!mon){return}
    let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",]
    let [l,r]=(left)?["<",""]:["",">"]
    let yr=Math.floor(1970+mon/12)
    let mo=mon%12
    let da=new Date(yr,mo,1)
    let fromTime=+da/1000
    let days=markDays(events,fromTime)
//     cl(days)

    let da2=new Date(yr,mo+1,1)
    let mDays=(da2-da)/86400e3
    let wDay=da.getDay()
    let arr=new Array(42)
    for(let i=0;i<mDays;i++){arr[wDay+i]=i+1}
    let ma=[]// month array
    let lines=(wDay+mDays<=35)?5:6
//     cl(selDay)
    for(let i=0;i<lines;i++){
      let wk=[]
      for(let j=0;j<7;j++){
        let d=arr[7*i+j]||""
        var bgColor
        bgColor=(days.includes(d-1))?"#CCCCCC":null
        let border=(yr==selDay[0])&&(mo==selDay[1])&&(d==selDay[2])?
          "1px solid #CCCCCC":null
        wk.push(<td style={{paddingRight:6,cursor:"pointer",backgroundColor:bgColor,
          border:border
        }}
        onClick={e=>{
//           cl(yr,mo,d)
          setSelDay([yr,mo,d])}}
        key={j}>{d}</td>)
      }
      ma.push(<tr key={i}>{wk}</tr>)
    }
//     cl(ma)
    return(
      <table
      ><tbody>
      <tr><th style={{cursor:"pointer"}} onClick={moLeft}>{l}</th><th></th>
        <td colSpan="3" align="center"><strong>{months[mo]} {yr}</strong></td>
        <th></th><th style={{cursor:"pointer"}} onClick={moRight}>{r}</th></tr>
      <tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>
      {ma}
      </tbody></table>
    )
  }

  var fullMonths=["January","February","March","April","May","June","July","August",
    "September","Octover","November","December",]

  var newEventPlus=(mins)=>{
//     cl("new event plus")
    cl(selDay,mins)
    setShowCreate({date:+(new Date(...selDay))/1000+mins*60})
  }

  var ocf=(func,val)=>{return e=>{func(val,e)}}

  var makeDayTitle=(events)=>{
    if(!events.length){return ""}
//     cl(events)
    return events[0].eventType
  }

  var editEvent=(event)=>{
//     cl(event)
    setShowCreate(event)
  }

  var showDay=()=>{
    let day=+(new Date(selDay[0],selDay[1],selDay[2]))/1000
//     cl(day)
    let times=[]
    for(let i=0;i<24;i++){
      let hr=(Math.floor(i)+11)%12+1
      let mn=0//(i%2)*30
      let ap=(i<12)?"AM":"PM"
      let time=`${az(hr,2)}:${az(mn,2)} ${ap}`
      let hrTs=day+i*3600
      let events0=events.filter(e=>{return (e.date>=hrTs)&&(e.date<(hrTs+3600))})
      let title=makeDayTitle(events0)
      times.push(
        <tr key={i}><td width="32" style={{cursor:"pointer"}}
        onClick={ocf(newEventPlus,i*60)}
        ><img width="24" src="/utils/plus.png"/>
        </td><td width="80">{time}</td>
        {title?
          <td style={{backgroundColor:(i%2)?"#EEEEEE":"#F8F8F8",cursor:"pointer"}}
          onClick={ocf(editEvent,events0[0])}
          >{title}</td>:
          <td style={{backgroundColor:(i%2)?"#EEEEEE":"#F8F8F8"}}></td>
        }
        </tr>
      )
    }
//     let top=tabRef.current?.offsetTop+tabRef.current?.clientHeight||260
    let hgt=globs.screen.h-globs.bcHeight-(dayRef.current?.offsetTop||0)
//     cl(hgt)
    return(
      <>
      <hr/>
      <h3>{`${fullMonths[selDay[1]]} ${selDay[2]}, ${selDay[0]}`}</h3>
      <div ref={dayRef} id="dayCont" style={{position:"absolute",
        /*top:80,*/height:hgt/*globs.screen.h-340*/,
        width:globs.screen.w-40,overflowY:"auto"
      }}
      >
        <table id="dayTab" width="100%"><tbody>
        {times}
        </tbody></table>
      </div>
      </>
    )
  }

  var saveEventToState=(event,deleteFlag)=>{
    let pos=events.map(e=>{return e.id}).indexOf(event.id)
    let events0=events.slice(0)// copy it
    let event0=event
    if(pos>=0){
      event0=events0.splice(pos,1)[0]// take it out
    }
    Object.assign(event0,event)// update it
    if(!deleteFlag){events0.push(event0)}// add it back
    setEvents(events0)// put in state
  }

  var deleteEvent=async(event)=>{
    cl(event)
    saveEventToState(event,true)// delete
    await wsTrans({uri:"/s/events",
      method:"delete",
      body:{
        sessionId:globs.sessionId,
        event:event,
    }})

  }

  var saveEvent=async(event)=>{
    cl(event)
    saveEventToState(event)
    await wsTrans({uri:"/s/events",
      method:"update",
      body:{
        sessionId:globs.sessionId,
        event:event,
    }})

  }

  var create=()=>{
    setShowCreate({date:+(new Date())/1000})
//     let dt=dateToInDate(new Date())
//     cl(dt)
//     setNewDate(dateToInDate(new Date()))
  }

  var date=(val,e)=>{
    cl(e.target.value)
  }

  var newTime=(e,vals)=>{
    cl(e)
//     cl(vals,e)
    switch(e.cmd){
      case "save":
        delete e.cmd
        cl("save it")
        if(!e.id){e.id=getRandomString(8)}
        saveEvent(e)
  //       let ts=+Date.parse(e.date)/1000
        cl(e.date)
        break
      case "delete":
        deleteEvent(e)
        break
      default:
        break
    }
//     if(e.cmd=="save"){
//       delete e.cmd
//       cl("save it")
//       if(!e.id){e.id=getRandomString(8)}
//       saveEvent(e)
// //       let ts=+Date.parse(e.date)/1000
//       cl(e.date)
//     }
    setShowCreate(false)
  }

  var onChange=(type,vals,e)=>{
    cl(type,vals)
    let types={
      create:create,
      date:date,
      newTime:newTime,
    }
    if(types[type]){
      types[type](vals,e)
    }else{
      cl(`No onChange for ${type}`)
    }
  }

  var oc=(type,vals)=>{return e=>{onChange(type,vals,e)}}
//   cl(tabRef.current?.offsetTop,tabRef.current?.clientHeight)
//       <ActionButton0 parms={{right:{v:"create",t:"Create"},oc:onChange}}/>
  return (
      <div id="calCont" style={{width:globs.screen.w,height:globs.screen.h-globs.bcHeight,
        backgroundColor:"white",
        textAlign:"left",padding:"00px 20px 20px 20px",
        overflowY:"auto",position:"relative"}}>
      <table ref={tabRef} id="calTab" width="100%"><tbody>
      <tr><td valign="top">
        {showCalendar(month,true)}
      </td><td width="20"></td><td valign="top">
        {showCalendar(month+1)}
      </td></tr>
      </tbody></table>
      {showDay()}
      {showCreate&&
        <NewEvent0 parms={{
          event:showCreate,
          oc:newTime,
        }}/>
      }
      </div>
  );
}

export default Calendar
