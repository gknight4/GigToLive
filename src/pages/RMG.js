import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
import Brand from "./Brand.js"
import Calendar from "./Calendar.js"
import Communication from "./Communication.js"
import Contacts from "./Contacts.js"
import CreativeNotes from "./CreativeNotes.js"
import Documents from "./Documents.js"
import FollowUp from "./FollowUp.js"
import Gigs from "./Gigs.js"
import Media from "./Media.js"
import Metrics from "./Metrics.js"
import WorkDone from "./WorkDone.js"
import Profile from "./Profile.js"
import Register from "./register.js"
import Record from "./Record.js"
import Home from "./Home.js"
import Account from "./Account.js"
import Breadcrumbs from "../utils/Breadcrumbs.js"
import {cl,globs,wsTrans} from '../utils/utils.js'

function RMG(props) {
  const [email, setEmail] = useState("red");
  globs.loc=useLocation().pathname
  globs.navigate=useNavigate()
//   cl(globs.sessionId)
  if((globs.loc=="/")&&!globs.sessionId){
    cl("navigate")
    setTimeout(e=>globs.navigate("/Account"),0)}
//   cl(loc)
  let routes={
    "/":Home,
    "/Brand":Brand,
    "/Cal":Calendar,
    "/Comm":Communication,
    "/Cont":Contacts,
    "/CreativeNotes":CreativeNotes,
    "/Doc":Documents,
    "/FollowUp":FollowUp,
    "/Gigs":Gigs,
    "/Media":Media,
    "/Metrics":Metrics,
    "/WorkDone":WorkDone,
    "/Login":Register,
    "/Register":Register,
    "/Prof":Profile,
    "/Record":Record,
    "/Account":Account,
  }
  let parts=globs.loc.split("/")
  let Page=routes[`/${parts[1]}`]
  if(!Page){Page=Brand}

  var onChange=(type,vals,e)=>{
    cl(type,vals)
    let cmds={login:login,indeed:indeed,sendIndeed:sendIndeed}
    if(cmds[type]){cmds[type](type,vals)}

  }

  var indeed=async()=>{
    cl(globs)
    let res=await wsTrans({
      cmd:"cRest",
      uri:"/s/indeed",
      method:"create",
      sesh:globs.sessionId,
      body:{sessionId:globs.sessionId}
    })
  }

  var sendIndeed=async()=>{
    cl(globs)
    let res=await wsTrans({
      cmd:"cRest",
      uri:"/s/indeed",
      method:"retrieve",
      sesh:globs.sessionId,
      body:{sessionId:globs.sessionId}
    })
  }

  var login=async()=>{
    cl("login")
    let res=await wsTrans({
      cmd:"cRest",
      uri:"/o/login",
      method:"create",
      sesh:null,
      body:{email:"GeneKnight4@GMail.com",password:"Fremont0!"}
    })
    cl(res)
  }

  var showIFrame=()=>{
    return(
    <iframe
      id="hiddenIframe"
      width="500"
      height="500"
      src="https://help.livenation.com/hc/en-us/articles/9816109693841-How-to-Contact-Us"
    >
    </iframe>
    )
  }
//   cl(loc)
//       <NavBar
//         parms={{onChange:onChange}}
//       />
  return (
    <div id="rmgMain" style={{width:globs.screen.w,height:globs.screen.h,
      backgroundColor:"white"}}>
      <Breadcrumbs/>
      <div id="rmgCont" style={{position:"relative"}}>
        <Page
          parms={{onChange:onChange,loc:globs.loc}}
        />
      </div>
    </div>
  );
//       <div style={{width:430,height:920,backgroundColor:"white"}}>
//       <h3>Metrics</h3>
}

export default RMG
