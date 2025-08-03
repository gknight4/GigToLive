import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {Button} from 'react-bootstrap';
import NavBar from "./navbar.js"
import Record from "./Record.js"
import Menu1 from "../utils/Menu1.js"
import Breadcrumbs from "../utils/Breadcrumbs.js"
import SelectionList0 from "../utils/SelectionList0.js"

import {julesAvery,prompts} from "../utils/sampleData.js"
import {cl,wsTrans,globs,waitForWs,loadUser,gpOpenAi} from '../utils/utils.js'

function Profile() {
  const [email, setEmail] = useState("red");
  const [selTab,setSelTab]=useState()
  const [selSect,setSelSect]=useState()
  const [user,setUser]=useState({})
  const [undo,setUndo]=useState()
  const [undoText,setUndoText]=useState()
  const [screen,setScreen]=useState({w:430,h:920})
  const [saveTO,setSaveTO]=useState()
  const [systemReady,setSystemReady]=useState()
  const [newJobTitle,setNewJobTitle]=useState()
  const [floatInfo,setFloatInfo]=useState()
  const [updatePrompts,setUpdatePrompts]=useState(false)
  const [taTop,setTaTop]=useState(200)
  let taRef=useRef()

//   const [tabRef,setTabRef]=useState()
  const tabRef=React.createRef()
  const userRef=useRef()
  useEffect(x=>{
    loadInfo()
  },[])
  useEffect(() => {
    userRef.current = user;
  }, [user]);
  useEffect(x=>{
    let[tab,link,doc,func]=globs.loc.split("/").slice(2)
//     cl(parts)
    setSelTab(tab)
    setSelSect(link)
    if(tab!=selTab){doUpdatePrompts()}
    if(taRef.current){setTaTop(taRef.current.offsetTop)}
//     setDoc(doc)
//     setFunc(func)
  })

//   const par0Ref=React.createRef()
//   useEffect(x=>{
//     setTabRef(React.createRef())
//   },[])
  var loadInfo=async()=>{
    await waitForWs()
//     cl("waiting")
    let user0=await loadUser()
//     cl("got")
//     cl(user0)
//     await loadGigs()
    setUser(user0)
  }
//   let tabIds2=["basic","identity","skills","goals","vision"]
  let tabIds=[
    {v:"basic",t:"Basic"},
    {v:"identity",t:"Identity"},
    {v:"skills",t:"Skills"},
    {v:"goals",t:"Goals"},
    {v:"vision",t:"Vision"},
  ]
  let tabs=tabIds.map(t=>{return(
    <td key={t.v}
    style={{backgroundColor:(t.v==selTab)?"#DDDDDD":"#EEEEEE",cursor:"pointer"}}
    onClick={e=>{
      setSelSect()
      setSelTab(t.v)
    }}
    >{t.t}</td>
  )})
  tabs.unshift(
    <td key={"head"} style={{backgroundColor:"#301870",color:"#FFFFFF"}}
    ><strong>Profile</strong></td>
  )

  var setMyUser=(user)=>{
//     cl("set my user")
//     cl(user.name)
    setUser(user)
//     cl(user.name)
  }

  var doUpdatePrompts=async()=>{
//     cl(updatePrompts)
    if(!updatePrompts){return}
//     cl("update prompts")
    setUpdatePrompts(false)
    let resp=await wsTrans({uri:"/s/users",
      method:"create",body:{cmd:"makePrompts",sessionId:globs.sessionId}})
  }

  var saveUser=async()=>{
    cl(userRef.current)
    cl("saving user")
    let resp=await wsTrans({uri:"/s/users",
      method:"update",body:{profile:userRef.current,sessionId:globs.sessionId}})
//     cl(resp)
  }

//   var loadUser=async()=>{
//     cl("load user")
//     let resp=await wsTrans({uri:"/s/users",
//       method:"retrieve",body:{sessionId:globs.sessionId}})
//     cl(resp)
//     cl(resp.user.profile)
//     if(resp.ok){setMyUser(/*julesAvery*/resp.user.profile)}
//   }

  var setSaveTimer=()=>{
    cl("set save")
    clearTimeout(saveTO)
    setSaveTO(setTimeout(saveUser,5000))
  }


  var setUserField=async(vals)=>{
//     let user0=Object.assign({},user,vals)
    setSaveTimer()
    setUpdatePrompts(true)
//     let user0=Object.assign({},user)
//     Object.assign(user0,vals)
//     cl(user0)
    await setMyUser(Object.assign({},user,vals))
//     cl(user)
  }

  var onChange=(type,vals)=>{
    cl(type,vals)

  }

  var showChange=(e)=>{
    cl(e)
    cl(e.target.value)
  }

  var MyRB=(field,label,title,group)=>{
    let val={}
    val[field]=label
    return(
      <>
      <input type="radio" name={group} value={label} id={label}
      checked={user[field]==label}
      onChange={e=>setUserField(val)}
      />&nbsp;
      <label htmlFor={label}>{title}</label><br/>
      </>
    )
  }

  var arrCont=(array,label)=>{
    return (array||[]).includes(label)?"checked":""
  }

  var arrMod=(array,label,max)=>{
    let pos=array.indexOf(label)
    if(pos>=0){
      array.splice(pos,1)
    }else{
      if(array.length<(max||100)){array.push(label)}
    }
    setUserField(label,array)
//     cl(array)
  }

  var MyCB=(field,label,title,max)=>{
    if(!user[field]){user[field]=[]}
    return(
      <>
        <input type="checkbox" id={label}
          checked={arrCont(user[field],label)}
          onChange={e=>{arrMod(user[field],label,max)}}
        />&nbsp;
        <label htmlFor={label}>{title}</label><br/>
      </>
    )
  }

  var MyTextInput=(field,title)=>{
//     cl(user,field)
    return(
      <>
        <label><strong>{title||""}</strong></label><br/>
        <input type="text" style={{border:"1px solid, #CCCCCC"}}
          value={user[field]||""}
          onChange={e=>{
            let val=[]
            val[field]=e.target.value
            setUserField(val)
          }
          }/><br/><br/>
      </>
    )
  }

  var states=[
    {v:"AL",t:"Alabama"},
    {v:"AK",t:"Alaska"},
    {v:"AZ",t:"Arizona"},
    {v:"AR",t:"Arkansas"},
    {v:"CA",t:"California"},
    {v:"CO",t:"Colorado"},
    {v:"CT",t:"Connecticut"},
    {v:"DE",t:"Delaware"},
    {v:"FL",t:"Florida"},
    {v:"GA",t:"Georgia"},
    {v:"HI",t:"Hawaii"},
    {v:"ID",t:"Idaho"},
    {v:"IL",t:"Illinois"},
    {v:"IN",t:"Indiana"},
    {v:"IA",t:"Iowa"},
    {v:"KS",t:"Kansas"},
    {v:"KY",t:"Kentucky"},
    {v:"LA",t:"Louisiana"},
    {v:"ME",t:"Maine"},
    {v:"MD",t:"Maryland"},
    {v:"MA",t:"Massachusetts"},
    {v:"MI",t:"Michigan"},
    {v:"MN",t:"Minnesota"},
    {v:"MS",t:"Mississippi"},
    {v:"MO",t:"Missouri"},
    {v:"MT",t:"Montana"},
    {v:"NE",t:"Nebraska"},
    {v:"NV",t:"Nevada"},
    {v:"NH",t:"New Hampshire"},
    {v:"NJ",t:"New Jersey"},
    {v:"NM",t:"New Mexico"},
    {v:"NY",t:"New York"},
    {v:"NC",t:"North Carolina"},
    {v:"ND",t:"North Dakota"},
    {v:"OH",t:"Ohio"},
    {v:"OK",t:"Oklahoma"},
    {v:"OR",t:"Oregon"},
    {v:"PA",t:"Pennsylvania"},
    {v:"RI",t:"Rhode Island"},
    {v:"SC",t:"South Carolina"},
    {v:"SD",t:"South Dakota"},
    {v:"TN",t:"Tennessee"},
    {v:"TX",t:"Texas"},
    {v:"UT",t:"Utah"},
    {v:"VT",t:"Vermont"},
    {v:"VA",t:"Virginia"},
    {v:"WA",t:"Washington"},
    {v:"WV",t:"West Virginia"},
    {v:"WI",t:"Wisconsin"},
    {v:"WY",t:"Wyoming"},
  ]

  var MySelect=(field,title,sels)=>{
    let opts=sels.map(s=>{return(<option key={s.v} value={s.v}>{s.t}</option>)})
//     cl(user[field])
    return(
      <>
        <label><strong>{title}</strong></label><br/>
        <select style={{border:"1px solid #CCCCCC",backgroundColor:"#FFFFFF",padding:2}}
          value={user[field]}
          onChange={e=>{
            let val=[]
            val[field]=e.target.value
            setUserField(val)
          }}
        >
        {opts}
        </select><br/><br/>
      </>
    )
  }

  var showJobTitles=()=>{
//     let jt=["Retail Associate","Warehouse Associate"]
//     cl(user)
    cl(user.jobTitles)
    let jsList=(user.jobTitles||[]).map((j,i)=>{
      return(
        <tr key={i}>
        <td width="30">
          <input id={i} type="checkbox" id={i}/>
        </td>
        <td width="30" style={{cursor:"pointer"}}
        onClick={e=>{deleteJobTitle(i)}}
        >X</td>
        <td><label htmlFor={i}>{j.t}</label></td>
        </tr>

      )
    })
//     jsList.push(
//         <tr key={"add"}>
//         <td width="20"><img src="/utils/plus.png" width="20"
//         style={{cursor:"pointer"}}/></td>
//         <td width="30"/>
//         <td/>
//         </tr>
//     )
    return(
      <div>
      <label><strong>Job Titles</strong></label>&nbsp;
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

  var deleteJobTitle=(n)=>{
    let user0=Object.assign({},user)
    user0.jobTitles.splice(n,1)
    setUser(user0)
    setSaveTimer()
  }

  var addJobTitle=(newJob)=>{
    let user0=Object.assign({},user)
    user0.jobTitles.push(newJob)
    setUser(user0)
    setNewJobTitle()
    setSaveTimer()
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

  var makeJobTitles=async()=>{
    cl("make job titles")
    let resp=await wsTrans({uri:"/s/users",
      method:"create",body:{cmd:"makeJobTitles",sessionId:globs.sessionId}})
//     cl(arr)
//     let resp="```json\n[\n    \"Podcast Producer\",\n    \"Content Writer\",\n    \"Narrative Designer\",\n    \"Voiceover Artist\",\n    \"Audio Engineer\"\n]\n```"
    cl(resp)
    let obj=JSON.parse(resp)
//     cl(obj)
    let arr=JSON.parse(resp)
    user.jobTitles.push(...arr)
    setSaveTimer()
  }

  var showFloat=()=>{
    if(!floatInfo){return}
    return(
      <div style={{position:"absolute",top:screen.h/2-100,
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

  var showBasic=()=>{
//     cl("show basic")
//     cl(user)
    if(!user){return}
    return(
      <div style={{padding:10,textAlign:"left",
        height:globs.screen.h-globs.bcHeight,overflowY:"auto"}}>
      {MyTextInput("name","Name")}
      {MyTextInput("age","Age")}
      {MyTextInput("phone","Phone")}
      {MyTextInput("email","Email")}
      {MyTextInput("street1","Street 1")}
      {MyTextInput("street2","Street 2")}
      {MyTextInput("city","City")}
      {MySelect("state","State",states)}
      {MyTextInput("zip","Zip Code")}
      {MyTextInput("country","Country")}
      {MyTextInput("instagram","Instagram")}
      {MyTextInput("facebook","Facebook")}
      {MyTextInput("tiktok","TikTok")}
      {MyTextInput("youtube","YouTube")}
      <label><strong>School</strong></label><br/>
      {MyRB("school","school","In School","userSchool")}
      {MyRB("school","nograd","Quit School","userSchool")}
      {MyRB("school","hs","HS Grad","userSchool")}
      {MyRB("school","college","College","userSchool")}
      {MyRB("school","masters","Masters","userSchool")}
      {MyRB("school","phd","PhD","userSchool")}
      {MyRB("school","jd","JD","userSchool")}
      {MyRB("school","md","MD","userSchool")}<br/>
      <label><strong>Current Work</strong></label><br/>
      {MyRB("work","unEmp","Unemployed","userWork")}
      {MyRB("work","partTime","Part Time","userWork")}
      {MyRB("work","freelance","Freelance","userWork")}
      {MyRB("work","fullTime","Full time","userWork")}
      {MyRB("work","trade","Trade","userWork")}
      {MyRB("work","pro","Professional","userWork")}<br/>
      <label><strong>Interests</strong></label><br/>
      {MyCB("interests","content","Creating Content")}
      {MyCB("interests","music","Music")}
      {MyCB("interests","cooking","Cooking")}
      {MyCB("interests","draw","Drawing")}
      {MyCB("interests","write","Writing")}
      {MyCB("interests","fix","Fixing")}
      {MyCB("interests","photo","Photography")}
      {MyCB("interests","game","Gaming")}
      {MyCB("interests","social","Social Media")}
      {MyCB("interests","garden","Gardening")}<br/>
      <label><strong>Positive Traits</strong></label><br/>
      <span>Select your five strongest traits</span><br/>
      {MyCB("pTraits","depend","Dependable",5)}
      {MyCB("pTraits","curious","Curious",5)}
      {MyCB("pTraits","creative","Creative",5)}
      {MyCB("pTraits","empathetic","Empathetic",5)}
      {MyCB("pTraits","organize","Organized",5)}
      {MyCB("pTraits","adapt","Adaptable",5)}
      {MyCB("pTraits","patient","Patient",5)}
      {MyCB("pTraits","resource","Resourceful",5)}
      {MyCB("pTraits","focus","Focused",5)}
      {MyCB("pTraits","observe","Observant",5)}<br/>
      <label><strong>Neutral Traits</strong></label><br/>
      {MyCB("nTraits","introvert","Introverted")}
      {MyCB("nTraits","extrovert","Extroverted")}
      {MyCB("nTraits","cautious","Cautious")}
      {MyCB("nTraits","bold","Bold")}
      {MyCB("nTraits","perfect","Perfectionist")}
      {MyCB("nTraits","relax","Relaxed")}
      {MyCB("nTraits","assert","Assertive")}
      {MyCB("nTraits","analytic","Analytical")}
      {MyCB("nTraits","independent","Independent")}
      {MyCB("nTraits","support","Supportive")}<br/>

      </div>
    )
//       {showJobTitles()}
  }

  var sectIds={
    identity:
    [
      {v:"self",t:"Self"},
      {v:"work",t:"Work"},
      {v:"school",t:"School"},
      {v:"skills",t:"Skills"},
      {v:"style",t:"Style"},
      {v:"values",t:"Values"},
    ],
    skills:
    [
      {v:"work",t:"Work"},
      {v:"services",t:"Services"},
      {v:"tools",t:"Tools"},
      {v:"clients",t:"Clients"},
      {v:"style",t:"Style"},
    ],
    goals:
    [
      {v:"work",t:"Work"},
      {v:"field",t:"Field"},
      {v:"culture",t:"Culture"},
      {v:"income",t:"Income"},
      {v:"dealBreakers",t:"Deal Breakers"},
    ],
    vision:
    [
      {v:"self",t:"Self"},
      {v:"learn",t:"Learn"},
      {v:"roles",t:"Roles"},
      {v:"legacy",t:"Legacy"},
      {v:"changes",t:"Changes"},
    ],
  }

  var doClearUndo=(tab,sect)=>{
    var val
    if(undo){
      val=undoText
    }else{
      setUndoText(user[tab][sect])
      val=""
    }
    doSetText(tab,sect,val)
    setUndo(!undo)
  }

  var doSetText=(tab,sect,val)=>{
    let user0=Object.assign({},user)
    user0[tab][sect]=val
    setSaveTimer()
    user0.synopsis=null
    delete user0.synopsis2
    setMyUser(user0)
    setUndo(false)
  }

//   var doTranscribe=(tab,sect)=>{
//     cl("transcribe",tab,sect)
//   }

//   var scrollTo=(sect)=>{
//     setSelSect(sect)
//     let pos=sectIds[selTab].map(s=>{return s.v}).indexOf(sect)
//     tabRef.current.scrollTop=900*pos
// //     tabRef.current.scrollTo(900*pos)
//   }

  var handleTranscribe=(args)=>{
    cl(args)
    let user0=Object.assign({},user)
//     cl(user)
//     cl(args.selTab)
//     cl(user0[args.selTab])
//     cl(args)
    user0[args.id.selTab][args.id.selSct]+=args.res
    setSaveTimer()
    setMyUser(user0)
  }

  var showPrompts=()=>{
//     let hgt=par0Ref.current?.offsetHeight||0
//     cl(par0Ref.current)
//     cl(tabRef.current)
//     cl(hgt)
//     cl(sectIds[selTab])
    if(!selSect){
      let menu=`prof_${selTab}`
//       cl(menu)
      return(
        <Menu1 parms={{menu:menu}}/>
      )
    }
//     cl(user)
    let pos=sectIds[selTab].map(s=>{return s.v}).indexOf(selSect)
    let s=sectIds[selTab][pos]
//     cl(s)
//     cl(pos)
//     let sects=sectIds[selTab].map(s=>{
      let recParms={
        id:{selTab:selTab,selSct:s.v},
//         selTab:selTab,
//         selSct:s.v,
        onChange:handleTranscribe,
      }
//       cl(user)
//       cl(prompts)
      if(!user.prompts){user.prompts=prompts}
      if(!user[selTab]){user[selTab]={}}
//       cl(s,selTab,s.v,user.prompts[selTab])
      let taHgt=globs.screen.h-globs.bcHeight-taTop-10
      let sects=(
        <div id="subPage" key={s.v} style={{textAlign:"left",padding:10,
          height:globs.screen.h-globs.bcHeight}}>
        <table id="topTab" width="100%"><tbody>
        <tr height="60"><td><h3>{s.t}</h3></td>
        <td width="48">
        <img src={`/utils/${(undo)?"undo":"clr"}.png`} width="48"
        onClick={e=>{doClearUndo(selTab,s.v)}}
        />
        </td>
        <td width="48">
        <Record parms={recParms}/>
        </td></tr>
        </tbody></table>
        <div id="profPrompt" style={{height:175}}>
        {user.prompts[selTab][s.v]}
        </div>
        <textarea id="profResp" ref={taRef}
        style={{resize:"none",width:"100%",height:taHgt,
          border:"1px solid #CCCCCC"}}
          value={user[selTab][s.v]}
          onChange={e=>{doSetText(selTab,s.v,e.target.value)}}
        />
        </div>
      )
//     })
    return(
      <div id="profPage" ref={tabRef} style={{height:globs.screen.h-globs.bcHeight,
//         scrollTop:900*pos

      }}>
      {sects}
      </div>
    )
  }

//   var showTab=()=>{
//     cl("show tab")
//     if(selTab=="basic"){return showBasic()}
// //     let sectIds
//     let sects=sectIds[selTab].map(s=>{
//       return(
//       <td key={s.v} style={{color:"#0088CC",cursor:"pointer"}}
//         onClick={e=>{scrollTo(s.v)}}
//       >{s.t}</td>
//     )})
//     return(
//       <div>
//         <table width="100%"><tbody>
//         <tr height="30">{sects}</tr>
//         </tbody></table>
//         {showPrompts()}
//       </div>
//     )
//   }

  var showMenu=(menu)=>{
//     cl("show menu")
    return(
      <div>
        <Menu1 parms={{menu:menu}}/>
      </div>
    )
  }

  var showTabs=()=>{
    tabs={
      menu:x=>{return showMenu("profile")},
      basic:showBasic,
      identity:showPrompts,
      skills:showPrompts,
      goals:showPrompts,
      vision:showPrompts,
    }
//     cl(selTab)
    return tabs[selTab||"menu"]()
  }
//   cl("render")
//   cl(user.name)
  return (
      <div id="profCont" style={{width:globs.screen.w,height:globs.screen.h-globs.bcHeight,
        backgroundColor:"white",
        textAlign:"left"}}>
      {showTabs()}
      {showFloat()}
      <div>
      </div>
      </div>
  );
//       <table width="100%"><tbody>
//       <tr height="30">
//       {tabs}
//       </tr>
//       </tbody></table>
//       {showTab()}
}

export default Profile
