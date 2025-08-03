import '../App.css';
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {Link} from "react-router"
import {useNavigate} from "react-router-dom"
import Breadcrumbs from "../utils/Breadcrumbs.js"
import NavBar from "./navbar.js"
import {cl,globs,wsTrans,saveLocalStorage,getLocalStorage} from '../utils/utils.js'

// var email,setEmail,password,setPassword,code,setCode,pageType,setPageType,
// navigate

function Register({parms}) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [code, setCode] = useState("code");
const [pageType, setPageType]=useState();
const [errorMsg, setErrorMsg]=useState()
  var doShowRegister=parms.loc=="/Register"
//   cl(doShowRegister)
  var navigate=useNavigate()
//   var history=useHistory()
//   cl(parms)
//   cl(parms.loc)
//   cl(errorMsg)

var sendCode=async()=>{
  cl("sendCode")
  let resp=await wsTrans({uri:"/o/sendCode",
    method:"create",body:{email:email, password:password}})
}

var activate=async()=>{
//   cl("activate")
  let resp=await wsTrans({uri:"/o/activate",
    method:"create",body:{tabId:globs.tabId,email:email, code:code}})
  setErrorMsg((resp)?null:"That's not the right code.")
//   var resp
//   cl(resp)
}

var login=async()=>{
//   cl("login")
  cl(globs.sessionId)
  let resp=await wsTrans({uri:"/o/login",
    method:"create",body:{tabId:globs.tabId,sessionId:globs.sessionId,
      email:email, password:password}})
  cl(resp)
//   return
  if(resp.ok){
    saveLocalStorage("login",JSON.stringify({email:email,password:password}))
    cl(resp.sessionId)
    sessionStorage.setItem("sessionId",resp.sessionId)
    globs.sessionId=resp.sessionId
    navigate("/Prof")
//     history.push("/Profile")
  }
}

var onChange=(type,vals)=>{
//   cl(type,vals)
  let cmds={activate:activate,sendCode:sendCode,login:login}
  if(cmds[type]){
    return cmds[type]()
  }
//   switch(type){
//     case "sendCode":
//       return sendCode()
//     case "login":
//       re
//   }
}

var showLogin=()=>{
  return(
    <div>
      <button type="button"
        onClick={x=>{onChange("login")}}
      >Login</button> or <Link to={{pathname:"/Register"}}>Register</Link>
      <br/><br/>
    </div>
  )
}

var showRegister=()=>{
  return(
    <div>
      <button type="button"
        onClick={x=>{onChange("sendCode")}}
      >Email me the Code</button><br/><br/>
      <label htmlFor="code">Enter the Received Code</label><br/>
      <input id="code" type="text"
      value={code}
      onChange={e=>{setCode(+e.currentTarget.value)}}
      /><br/><br/>
      <button type="button"
        onClick={x=>{onChange("activate")}}
      >Register</button> or <Link to={{pathname:"/Login"}}>Login</Link><br/><br/>

    </div>
  )
}

  return (
    <div style={{width:430,height:globs.screen.h,backgroundColor:"white",textAlign:"left",
      padding:10,overflowY:"auto"
    }}>
      {(doShowRegister)?
        <h1>Register with RunMyGigs</h1>:
        <h1>Login to RunMyGigs</h1>
      }<br/>
      <table className="center"><tbody>
      <tr><td>
      {(doShowRegister)?
        <p>Enter your emails and password, and then press Email me the Code. Check your email, copy and paste the code here, press Register, and you're all set</p>:
        <p>Enter your email and password to login. Or,<br/>click Register to create an account</p>
      }
      </td></tr>
      <tr><td className="left">
      <label htmlFor="email">Email</label><br/>
      <input id="email" type="text"
      value={email}
      onChange={e=>{setEmail(e.currentTarget.value)}}/><br/><br/>
      <label htmlFor="password">Password</label><br/>
      <input id="password" type="text"
      value={password}
      onChange={e=>{setPassword(e.currentTarget.value)}}
      /><br/><br/>
      {(doShowRegister)?showRegister():showLogin()}
      {errorMsg&&
        <div>
        <p style={{color:"red"}}>{errorMsg}</p>
        </div>
      }

      </td></tr>
      </tbody></table>
    </div>
  );
}

export default Register
