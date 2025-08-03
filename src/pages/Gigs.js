import React, { useState,useRef,useEffect,createElement } from "react";
import { TransformWrapper, TransformComponent } from
  "@pronestor/react-zoom-pan-pinch";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
// import Hammer from 'react-hammerjs'
import {Button} from 'react-bootstrap';
import TopTab0 from "../utils/TopTab0.js"
import TopLinks0 from "../utils/TopLinks0.js"
import JobTitles0 from "../utils/JobTitles0.js"
import Indeed00 from "../utils/Indeed00.js"
import Menu1 from "../utils/Menu1.js"
// import Address1 from "../utils/Address1.js"
import Breadcrumbs from "../utils/Breadcrumbs.js"
import SelectionList0 from "../utils/SelectionList0.js"
import {cl,wsTrans,globs,loadUser,waitForLoadInfo,waitForWs,trimStr,sortObj,
  sortScal,showBackBut,gpOpenAi,getTime,customSearch,stripHtml,htmlToReact,

} from '../utils/utils.js'

function Gigs() {
  const [selTab,setSelTab]=useState("menu")
  const [selLink,setSelLink]=useState("menu")
  const [user,setUser]=useState({})
  const [gigs,setGigs]=useState()
  const [selGig,setSelGig]=useState()
  const [doc,setDoc]=useState()
  const [func,setFunc]=useState()
  const [showDocStyle,setShowDocStyle]=useState()
  const [gigTO,setGigTO]=useState()
  const [wsOpen,setWsOpen]=useState(false)
  const [docViewPage,setDocViewPage]=useState(1)
  const [pdfWait,setPdfWait]=useState(false)
  useEffect(x=>{
    cl("starting")
    loadInfo()
    return(x=>{cl("clean up")})
  },[])
  const userRef=useRef()
  useEffect(() => {
    userRef.current = user;
  }, [user]);
//   useEffect(x=>{
//     let[tab0,link0,doc0,func0]=globs.loc.split("/").slice(2)
//   },[doc])
  useEffect(x=>{
//     cl("useEffect")
    let[tab0,link0,doc0,func0]=globs.loc.split("/").slice(2)
//     cl(tab0,link0,doc0,func0)
//     cl(wsOpen)
    if(wsOpen){
      setSelTab(tab0)
      setSelLink(link0)
      setSelGig(doc0)
//       cl(doc0)
      setDoc(doc0)
      setFunc(func0)
      if((tab0=="tag")&&(["view","down","email"].includes(func0))){
//         setDocViewPage(1)
        docCheckPdf(doc0)
      }
      if(["tag","apply","talk"].includes(tab0)){setSelGig(link0)}
      if(tab0=="talk"){
        if(doc0&&(doc0!=doc)){
          cl(`New Doc: ${doc0}`)
          loadInterviewInfo(doc0)
        }
      }
    }
  })

//   var fixJobTitles=(user)=>{
//     user.jobTitles=(user.jobTitles||[]).map(j=>{
//       return(j?.t)?j:{t:j,e:0}})
//   }

//   var gigMenu=[
//     {p:"There are five steps that a gig goes through:"},
//     {h:"Gigs",
//     hl:"jobs",
//     p:"This is where you accumulate all of the possible gigs. Search for Gigs, then sift through the Gigs list, and Tag the ones that you want to pursue. "},
//     {h:"Tag",
//     hl:"tag",
//     p:"Prepares a Cover Letter and Resume created to pitch you to each particular Tagged Gig."},
//     {h:"Apply",
//     hl:"apply",
//     p:"After the application has been made, schedule FollowUps by phone, text, or email to show that not only are you a good hire, but you care about getting hired."},
//     {h:"Talk",
//     hl:"talk",
//     p:"Prepare for an Interview that will emphasize your strengths, minimize your weaknesses, and give you the right Questions to ask to convey that you're fully engaged in the process."},
//     {h:"Go",
//     hl:"go",
//     p:"At this point, all you have to do is say, 'I'll take this one'."}
//   ]
//
//   var smOnClick=(tab,link,arg)=>{
//     cl(tab,link,arg)
//   }

//   var showMenu=(menu)=>{
//     var oc=(e)=>{return ()=>smOnClick(selTab,selLink,e)}
//     let parts=menu.map(m=>{
//       return(
//         <div>
//         {m.h&&<h3 className="smHead" onClick={oc(m.hl)}>{m.h}</h3>}
//         {m.p&&<p>{m.p}</p>}
//         </div>
//       )
//     })
//     return(
//       <div>{parts}</div>
//     )
//   }

//   var testSearch=async()=>{
//     let str="site:mapquest.com LiveNation Los Angeles"
//     let res=await customSearch(str)
//     cl(res)
//   }

  var getGigAddr=async(gig)=>{
    cl(gig)
    let ind=gig.indeed
    let nm=ind.company
    let loc=ind.location
    let str=(`site:mapquest.com ${nm}, ${loc}`).replaceAll("&", " and ")

    let res=await customSearch(str)
    cl(str)
    cl(res)
    if(!res.result.items){return}
//     cl(res.result.items[0].formattedUrl)// I have the mqid here
    let url=res.result.items[0].formattedUrl
    cl(url)
    res=await stripHtml(url)
    cl(res)
    if(res.addr){
      Object.assign(ind,res)
      await saveGig(gig)
    }

  }

  var updateGigs=async()=>{
//     cl(globs?.gigs0?.length)
    let gg=globs.gigs0
    if(!gg){return}
//     cl(gg)
    for(let i=0;i<globs.gigs0.length;i++){
//       cl(gg[i])
      if (gg[i].indeed.company&&
        !gg[i].indeed.addr){
        cl(gg[i].name)
        await getGigAddr(gg[i])}
    }
  }


  var loadInfo=async()=>{
    cl("load info")
    await waitForWs()
//     cl("await")
    let user0=await loadUser()
    await loadGigs()
    setWsOpen(true)
//     testSearch()
    await updateGigs()
//     stripHtml()
//     cl("got gigs")
//     cl(user0)
//     cl(user0)
//     fixJobTitles(user0)
//     cl(user0)
//     cl("set user"+user0.name)
    setUser(user0)
  }

  var search=async()=>{
    cl("search")
    cl(user.jobTitles)
    let jobTitles=user.jobTitles||[]
    .filter(j=>{return j.e}).map(j=>{return j.t}).join(",")
    cl(jobTitles)
    cl(globs)
//     return
    let res=await wsTrans({
      cmd:"cRest",
      uri:"/s/indeed",
      method:"retrieve",
      sesh:globs.sessionId,
      body:{
        position:jobTitles
        .filter(j=>{return j.e})
        .map(j=>{return j.t})
        .join(","),
        location:user.searchZip,
        maxItems:5,
        sessionId:globs.sessionId
      }
    })
    cl(res)
  }

  var ShowJobSearch=()=>{
//     cl("show job")
//     cl(user)
    return(
      <div>
      <JobTitles0 parms={{
        user:user||{},
        userRef:userRef||{},
        setUser:setUser,
        search:search,
      }}/>
      <Button
      onClick={search}
      >Search</Button>&nbsp;
      </div>
    )
  }

  var doSelItem=(item)=>{
//     cl(item)
    globs.navigate(item)
//     setSelGig(item)
  }

  var indOnChange=(gig)=>{
//     setGig(gig)
//     cl(gig)
    saveGig(gig)
  }

  const handleSwipe = (event) => {
    switch (event.direction) {
      case 2: // left
        nextGig(1)
        break;
      case 4: // right
        nextGig(-1)
        break;
      default:
//         cl2("Swiped!", event.direction);
        break
    }
  }

  var navToGig=(gigId)=>{
    let loc=globs.loc.split("/").slice(0,-1)
    loc.push(gigId)
    globs.navigate(loc.join("/"))

  }

  var nextGig=(dir)=>{
    let items=getSelGigs().map(g=>{return g.id})
    let pos=items.indexOf(selGig)+dir
    let gigId=items[pos]
//     cl(loc)
//     cl(globs.loc)
    if((pos>=0)&&(pos<items.length)){navToGig(gigId)}
  }

  var showPages=()=>{
//     let items=(gigs||[]).filter(g=>{return g.isNew==(selLink=="new")})
//     .sort((a,b)=>{return sortObj(a,b,"name")})
    let items=getSelGigs()
//     cl(items.length)


//     let ids=gigs.
    let pages=items.map(i=>{
      return(
        <td key={i.id} width="48"
        onClick={e=>{
//           cl(i.id)
          navToGig(i.id)}}
        ><img src={`/utils/crc${(i.id==selGig)?"S":"O"}.png`}
        width="24"/></td>
      )
    })

    return(
      <div style={{position:"absolute",left:0,bottom:0,
        width:"100%",opacity:0.5,backgroundColor:"white"
        }}>
        <table width="100%"><tbody>
        <tr><td width="24"
        onClick={e=>nextGig(-1)}
        ><img src="/utils/lang2.png" width="24"/></td>
        <td></td>
        {pages}
        <td></td>
        <td width="24"
        onClick={e=>nextGig(1)}
        ><img src="/utils/rang.png" width="24"/></td></tr>
        </tbody></table>
      </div>
    )
  }

  var getSelGigs=()=>{
//     cl(selTab)// jobs
//     cl(gigs)
    return (gigs||[]).filter(g=>{
      let state=g.state||"jobs"
      return (state==selTab)&&(g.indeed.company)
      /*&&((state=="jobs")?g.isNew==(selLink=="new"):true)*/
    })
    .sort((a,b)=>{return sortObj(a,b,"name")})
  }

  var getGig=()=>{
//     cl(gigs)
    let gig0=(gigs||[]).filter(g=>{return g.id==selGig})[0]||{}
    return Object.assign({},gig0)
  }

  var setGigState=(state)=>{
    let gig=getGig()//gigs.filter(g=>{return g.id==selGig})[0]
    gig.state=state
    saveGig(gig)
  }

  var navUp=()=>{
    let loc=globs.loc.split("/").slice(0,-1).join("/")
    globs.navigate(loc)
  }

  var navOver=(type)=>{
//     let loc=globs.loc.split("/").slice(0,-1).join("/")
    let id=globs.loc.split("/").slice(-1)
    let url=(type=="jobs")?
      `/Gigs/${type}/view/${id}`:
      `/Gigs/${type}/${id}`
//     let parts=globs.loc.split("/")
//     parts[parts.length-2]=type
//     let loc=parts.join("/")
    globs.navigate(url)
  }

//   var tagIt=()=>{
//     setGigState("tag")
//     navUp()
//   }

//     let gig=getGig()//gigs.filter(g=>{return g.id==selGig})[0]
//     gig.state="tag"
//     saveGig(gig)
//   }

//   var unTag=(vals)=>{
//     cl(vals)
//     setGigState("jobs")
//     navUp()
//   }

  var moveGig=async(vals)=>{
    let newType={tagit:"tag",untag:"jobs",apply:"apply",unapply:"tag",
      talk:"talk",untalk:"apply"
    }
//     cl(vals)
    cl(selGig)
    await setGigState(newType[vals])
    navOver(newType[vals])
  }
//     let gig=getGig()//gigs.filter(g=>{return g.id==selGig})[0]
//     gig.state="jobs"
//     saveGig(gig)
//   }

//   var showJobsBar=()=>{
//     return(
//       <div>
//       <table width="100%"><tbody>
//       <tr><td width="24">{showBackBut(e=>{setSelGig()})}</td>
//       <td></td>
//       <td width="1%">
//         <Button style={{padding:0}}
//         onClick={tagIt}
//         >&nbsp;Tag&nbsp;It!&nbsp;</Button>
//       </td>
//       <td></td>
//       </tr>
//       </tbody></table>
//       </div>
//     )
//   }

  var showActionButton=(buts)=>{
    return(
      <div style={{float:"none"}}>
      {buts.left&&
        <Button style={{float:"left"}}
        onClick={oc(buts.left.v,buts.left.v)}>{buts.left.t}</Button>
      }
      <h3 style={{float:"left",marginLeft:50}}>{buts.title}</h3>
      {buts.right&&
        <Button style={{float:"right"}}
        onClick={oc(buts.right.v,buts.right.v)}>{buts.right.t}</Button>
      }
        <div style={{clear:"both"}}/>
      </div>
    )
  }

  var ShowJobOld=(isNew,msg)=>{// actually used for all tabs
//     setPageIds(items.map(i=>{return i.id}))
//     let items=(gigs||[]).filter(g=>{return g.isNew==isNew})
//     .sort((a,b)=>{return sortObj(a,b,"name")})
//     .filter(g=>{return g.name!="undefined - undefined"})
//     cl(msg)
    let gigs=getSelGigs()
//     cl(gigs)
    gigs=gigs.sort((a,b)=>{
      if(a.isNew==b.isNew){
        if(a.name.toLowerCase()<b.name.toLowerCase()){return -1}
        if(a.name.toLowerCase()>b.name.toLowerCase()){return 1}
        return 0
      }else{return (a.isNew)?-1:1}
    })
//     cl(gigs)
    let items=gigs
    .map(g=>{return {
      v:g.id,
      t:trimStr(g.name,50),
      h:(g.isNew?"#008000":null)
    }})
//     cl(items)
//     cl(selGig)
    let gig=getGig()
//     cl(gigs)
    if(selGig){
//         <Hammer onSwipe={handleSwipe} direction="DIRECTION_HORIZONTAL">
//         </Hammer>
//         {showPages()}
      return(
        <div>
        {showActionButton({title:"Prospects",right:{v:"tagit",t:"Tag It!"}})}
        <Indeed00 parms={{
          gig:getGig(),//gigs.filter(g=>{return g.id==selGig})[0],
          onChange:indOnChange,
        }}/>
        </div>
      )
    }else{
      return(
        <div>
        {msg&&<p><br/>{msg}</p>}
        <SelectionList0 parms={{
          list:items,
          onChange:doSelItem,
        }}/>
        </div>
      )
    }
  }

//   var ShowJobNew=()=>{
//     return(
//       <div>
//       New
//       </div>
//     )
//   }

  var saveGigToState=(gig,toGlobs)=>{// and globs
//     let pos=gigs.map(g=>{return g.id})// find in state
//       .indexOf(gig.id)
//     let gig0=gigs.splice(pos,1)[0]// take it out
//     Object.assign(gig0,gig)// update it
//     gigs.push(gig0)// add it back
//     setGigs(Object.assign({},gigs)// put in state
// update globs.gigs0, and put in state
    let pos=globs.gigs0.map(g=>{return g.id})
      .indexOf(gig.id)
    Object.assign(globs.gigs0[pos],gig)// update it
    setGigs(globs.gigs0.slice(0))// put in state
//     cl(globs.gigs0)
  }

  var saveGigToDb=async(gig)=>{
    let res=await wsTrans({uri:"/s/gigs",
      method:"update",body:{sessionId:globs.sessionId,gig:gig}})
//     cl("saved")
  }

  var saveGig=async(gig)=>{
//     cl(gig.indeed.addr)
    saveGigToState(gig)
    await saveGigToDb(gig)
  }

  var loadGigs=async()=>{
//     cl(gigs)
//     cl("load gigs")
    if(gigs){return}
    let res=await wsTrans({uri:"/s/gigs",
      method:"retrieve",body:{sessionId:globs.sessionId}})
//     cl(res)
    if(res){
//       cl("set gigs")
      setGigs(res.gigs.filter(g=>{return g.id}))}
//     if(res){brands=res.brands||[]}
  }

  var jobSelLink=(link)=>{
    cl(link)
    setSelGig()
    switch(link){
      case "old":
        loadGigs()
        break
      case "new":
        loadGigs()
        break
      case "search":
        break
    }
    setSelLink(link)
  }

  var letter=()=>{
    return(
      <div>
      letter
      </div>
    )
  }

  var resume=()=>{
    return(
      <div>
      resume
      </div>
    )
  }

  let jobLinks={
    jobs:{
      menu:e=>{return ShowMenu("gigs_jobs")},
      search:ShowJobSearch,
      view:e=>ShowJobOld(false),
//       new:e=>ShowJobOld(true),
    },
    tag:{
      menu:x=>{return ShowJobOld(null,"Select the gig that you want to apply for.")},
      letter:letter,
      resume:resume,
    },
    apply:{
      menu:x=>{return ShowJobOld(null,"Select the gig that you want to interview for.")},
      letter:letter,
      resume:resume,
    },
    talk:{
      menu:x=>{return ShowJobOld(null,"Select the gig that you want to interview for.")},
      letter:letter,
      resume:resume,
    },
  }

//   var ShowLinks=()=>{
//     let links={
//       jobs:[
//           {v:"search",t:"Search"},
//           {v:"old",t:"Old"},
//           {v:"new",t:"New"},
//         ],
//         tag:[
//           {v:"def",t:"Jobs"},
//           {v:"letter",t:"Letter"},
//           {v:"resume",t:"Resume"},
//         ],
//     }
//     return(
//       <TopLinks0 parms={{
//         tabs:links[selTab],
//         selLink:selLink||"def",
//         cb:jobSelLink,
//       }}/>
//     )
//   }

  var ShowJobs=()=>{
//     cl(selLink)
//     cl("show jobs")
    return(
      <div>
      {jobLinks[selTab][selLink||"menu"]()}
      </div>
    )
  }

  var docStyle=()=>{
//     cl("docStyle",doc)
    setShowDocStyle(true)
  }

  var makeUserProfile=()=>{
//     cl(user)
    var addBasic=(key,name)=>{prof+=`${name||key}: ${u[key]}.\n`}
    var addList=(key,name)=>{prof+=`${name}: ${u[key].join(", ")}.\n`}
    var addSects=(key)=>{
      Object.keys(u[key]||{}).forEach(k=>{
        prof+=`${k}:\n${u[key][k]}\n\n`
      })
    }
    let u=user
    let prof=`I am ${u.name}. These are my basics:\n`
    addBasic("name")
    addBasic("age")
    addBasic("phone")
    addBasic("street1")
    addBasic("street2")
    addBasic("city")
    addBasic("state")
    addBasic("zip")
    addBasic("country")
    addBasic("email")
    addBasic("school","Education")
    addBasic("instagram")
    addBasic("facebook")
    addBasic("instagram")
    addBasic("youtube")
    addList("nTraits","Neutral Traits")
    addList("pTraits","Positive Traits")
    addList("interests","Interests")
    prof+="\nThis is who I am\n"
    addSects("identity")
    prof+="\nThis is what I do\n"
    addSects("skills")
    prof+="\nThis is what I want to do\n"
    addSects("goals")
    prof+="\nThis is what I want to become:\n"
    addSects("vision")
//     cl(prof)
    return prof
  }

  var createDocInStyle=async(doc,style)=>{
//     cl(user)
//     cl(doc,style)
    let profile=makeUserProfile()
    let gig=getGig()
//     cl(gig)
    let job=gig.indeed.description
//     [covLetter:createCovLetter,resume:createResume][doc](profile,gig,job)
    let styleProf=gig.covLetter_styleDesc
    let prompt0=(doc=="covLetter")?
      `I am applying for a job, and I want you to write a cover letter. I will describe myself in the UserProfile. I will describe the job in the JobProfile. I will describe the writing style that I want you to use in the StyleProfile. For Today's Date, use the Date. Make the letter 200 words long. Return the letter as plain text. Return just the letter, not  letterhead part.`:
      `I am applying for a job, and I want you to write a resume. I will describe myself in the UserProfile. I will describe the job in the JobProfile. I will describe the writing style that I want you to use in the StyleProfile. If there are no Instagram, etc. links, leave them out. Return the resume as plain text.`

    let prompt=`${prompt0}<UserProfile>
${profile}
</UserProfile>
<Date>
${new Date()}
</Date>
<JobProfile>
${job}
</JobProfile>
<StyleProfile>
${styleProf}
</StyleProfile>`
// cl(prompt)
  let letter=await gpOpenAi(prompt)
//   cl(letter)
  let query={id:selGig}
  query[`${doc}_${style.link}`]=letter
  query[`${doc}_${style.link}_ts`]=getTime()
  await saveGig(query)
//   cl(letter)
  }

  var refreshDoc=()=>{
//     cl(doc)
    let gig=getGig()
    let style=gig[`${doc}_style`]||"Formal"
    createDocInStyle(doc,{link:style})
  }

  var setDocStyle=async(style)=>{
    cl(style)
//     cl("set doc style",style.link)
    setShowDocStyle(false)
    let query={id:selGig}
    query[`${doc}_style`]=style.link
    query[`${doc}_styleDesc`]=style.item.p
//     cl(query)
    let gig=getGig()
    let curDoc=gig[`${doc}_${style.link}`]
//     cl(curDoc)
    if(!curDoc||(curDoc=="")){
      await createDocInStyle(doc,style)
    }

    await saveGig(query)
  }

  var newDoc=(vals,e)=>{
//     cl(vals,e.target.value)
    let gig=getGig()
    gig[`${doc}_${vals.style}`]=e.target.value
    gig[`${doc}_${vals.style}_ts`]=getTime()
//     cl(gig)
    saveGigToState(gig)
    clearTimeout(gigTO)
    setGigTO(setTimeout(e=>{saveGigToDb(gig)},2000))
  }

  var onChange=(type,vals,e)=>{
    cl(type)
    let types={
      docStyle:docStyle,
      newDoc:newDoc,
      emailPdf:emailDoc,
      bumpDocViewPage:bumpDocViewPage,
      tagit:moveGig,
      untag:moveGig,
      apply:moveGig,
      unapply:moveGig,
      talk:moveGig,
      untalk:moveGig,
    }
    if(types[type]){
      types[type](vals,e)
    }else{
      cl(`No onChange for ${type}`)
    }
  }

  var oc=(type,vals)=>{return e=>{onChange(type,vals,e)}}
  var ocf=(func,val)=>{return e=>{func(val,e)}}

  var ShowDocEdit=(names,gig,docStyle)=>{
    cl(docStyle)
    return(
      <div>
      <br/><h3>{names[doc]} Style: <span className="smHead"
      onClick={oc("docStyle")}
      >{(getGig()||{})[`${doc}_style`]||"Formal"}</span>
      <img src="/utils/refresh.png" width="24"
      onClick={ocf(refreshDoc)}
      style={{float:"right",marginTop:5}}/></h3>
      <textarea style={{width:globs.screen.w-20,height:globs.screen.h-118,
        resize:"none"
      }}
      value={gig[`${doc}_${docStyle}`]||""}
      onChange={oc("newDoc",{style:docStyle})}
      />
      </div>
    )
  }

  var docCheckPdf=async(doc)=>{
//     cl(doc)
    let gig=getGig()
//     cl(gig)
    let style=gig[`${doc}_style`]||"Formal"
    let baseName=`${doc}_${style}`
//     cl(baseName)
    if((gig[`${baseName}_ts`]||1)>(gig[`${baseName}_pdf_ts`]||0)){
//       cl("make pdf")
      gig[`${baseName}_pdf_ts`]=getTime()
      setPdfWait(true)
      let res=await wsTrans({uri:"/s/gigs",method:"create",
        body:{
          sessionId:globs.sessionId,
          cmd:"makePdf",
          doc:doc,
          id:selGig
      }})
//       cl(res)
      gig[`${baseName}_pdf_pages`]=res.pdfPages
      await saveGig(gig)
      setPdfWait(false)
//       cl(gig)
    }
  }

//   var setDocTime=(gig,style)=>{
//     gig[`${doc}_${style}_ts`]=getTime()
//   }

  var bumpDocViewPage=(vals)=>{
//     cl(vals.inc)
    let page=docViewPage+vals.inc
    if((page>=1)&&(page<=vals.max)){setDocViewPage(page)}
  }

  var showViewPages=(gig,docStyle)=>{
//     cl(docStyle)
    let pages=gig[`${doc}_${docStyle}_pdf_pages`]
    return(
      <div style={{textAlign:"center",marginBottom:10}}>
        <br/><Button onClick={oc("bumpDocViewPage",{inc:-1,max:pages})}>
        {`<`}</Button>&nbsp;
        Page {docViewPage}/{pages}&nbsp;&nbsp;
        <Button onClick={oc("bumpDocViewPage",{inc:1,max:pages})}>
        {`>`}</Button><br/>
      </div>
    )
  }

//https://sidehsl.com/files/3Ju3eeEZ/pdf/covLetter_Amped-1.jpg

  var ShowDocView=(names,gig,docStyle)=>{
    let imgUrl=`https://sidehsl.com/files/${globs.userId}/pdf/\
${doc}_${docStyle}_${gig.id}-${docViewPage}.jpg`
//     cl(imgUrl)
    if(pdfWait){
      return(
        <div>
          (Waiting for PDF)
        </div>
      )
    }
    return(
      <div>
      {showViewPages(gig,docStyle)}
          <TransformWrapper
            initialScale={1}
          >
          <TransformComponent>
            <img src={imgUrl}
            width="420"
            alt="test" />
          </TransformComponent>
        </TransformWrapper>
      </div>
    )
  }

  var emailDoc=async()=>{
    let res=await wsTrans({uri:"/s/gigs",method:"create",
      body:{
        sessionId:globs.sessionId,
        cmd:"emailPdf",
        doc:doc,
        id:selGig
    }})
  }

  var ShowDocDown=(names,gig,docStyle)=>{
    let url=`https://sidehsl.com/files/${globs.userId}/pdf/${doc}_${docStyle}_${gig.id}.pdf`
    return(
      <div><br/>
      <p>This will download a copy of the pdf file to this device.</p>
      <a target="_blank" href={url}>
        <Button>Download</Button>&nbsp;
      </a>
      </div>
    )
  }

  var ShowDocEmail=(names,gig,docStyle)=>{
    return(
      <div><br/>
      <p>This will send you an email where you can download a copy of the pdf file to your device.</p>
      <Button
      onClick={oc("emailPdf")}
      >Email</Button>&nbsp;
      </div>
    )
  }

  var ShowEditDoc=(doc)=>{
//     cl(doc)
    let names={covLetter:"Cover Letter",resume:"Resume"}
    let gig=getGig()||{}
    let docStyle=gig[`${doc}_style`]||"Formal"
    if(showDocStyle){
      return <Menu1 parms={{
        menu:`${(doc=="resume")?"res":"cov"}_style`,
        cb:setDocStyle}}/>
    }else{
//       cl(func)
      let funcs={
        edit:ShowDocEdit,
        view:ShowDocView,
        down:ShowDocDown,
        email:ShowDocEmail,
      }
      return (funcs[func]||ShowDocEdit)(names,gig,docStyle)
//       return(
//         <div>
//         <br/><h3>{names[doc]} Style: <span className="smHead"
//         onClick={oc("docStyle")}
//         >{(getGig()||{})[`${doc}_style`]||"Formal"}</span></h3>
//         <textarea style={{width:globs.screen.w-20,height:globs.screen.h-118,
//           resize:"none"
//         }}
//         value={gig[`${doc}_${docStyle}`]||""}
//         onChange={oc("newDoc",{style:docStyle})}
//         />
//         </div>
//       )
    }
  }

//   var docFuncs={
//     edit:ShowEditDoc,
//     view:ShowEditDoc,
//     down:ShowEditDoc,
//     email:ShowEditDoc,
//   }

  var showDoc=(gig,doc,func)=>{
//     cl(gig,doc)
    if(func){
      return ShowEditDoc(doc)
    }else{
      return(
        <div>
          <Menu1 parms={{menu:"covLetter"}}/>
        </div>
      )
    }
  }

  var ShowTag=()=>{
    let gig=getGig()//gigs.filter
//     cl(gig?.name)
    if(selGig){
      if(doc){
        return(
          <div>
            {showDoc(selGig,doc,func)}
          </div>
        )
      }else{
        return(
          <div>
          {showActionButton({title:"Tagged",left:{v:"untag",t:"UnTag"},right:{v:"apply",t:"Applied"}})}
          <h3 style={{textAlign:"center"}}>{gig?.name}</h3>
          {ShowMenu("gigs_tag",gig?.name)}
          <Indeed00 parms={{
            gig:getGig(),//gigs.filter(g=>{return g.id==selGig})[0],
            onChange:indOnChange,
          }}/>
          </div>
        )
      }

    }else{
      cl(selTab, selLink)
      return(
        <div>
          {jobLinks[selTab][selLink||"menu"]()}
        </div>
      )
    }
  }

  var ShowApply=()=>{
    if(!globs.user0){return}
    let gig=getGig()//gigs.filter
//     cl(globs)
//     cl(selGig)
    cl(globs.user0)
    if(selGig){
      return(
        <div>
        {showActionButton({title:"Applied",left:{v:"unapply",t:"UnApply"},right:{v:"talk",t:"Talk"}})}
        {ShowMenu("gigs_apply",
          gig?.name,
          gig?.indeed?.positionName,
          globs.user0.profile.name
        )}
        <hr/>
        <h3 style={{textAlign:"center"}}>The Gig</h3>
        <Indeed00 parms={{
          gig:gig,//gigs.filter(g=>{return g.id==selGig})[0],
          onChange:indOnChange,
        }}/>
        </div>
      )
    }else{
      cl(selTab,selLink)
      return(
        <div>
          {jobLinks[selTab][selLink||"menu"]()}
        </div>
      )
    }
  }

  var loadInterviewInfo=async(subject)=>{
    let gig=getGig()
    if(!gig||!gig.id){return}
//     cl(gig)
//     cl(globs.user0)
    if((gig?.interview||{})[subject]){return}
    var prompt
//     cl(subject)
    switch(subject){
      case "Company":
        prompt=`Create a brief description of this company: ${gig.indeed.company}. Return as simple html.`
        break
      case "Industry":
        prompt=`Create a brief description of the industry that includes this company, Don't focus on the company itself, but do give attention to their place in the industry. Specifically mention their meaningful competition. Return the result in three paragraphs, as simple html. The company is:${gig.indeed.company}.`
        break
      case "Position":
        prompt=`Describe the job role in the description. Don't describe the company, describe the specific job. Don't give it a title. Return the result as simple html. Description: ${gig.indeed.description}.`
        break
      case "Experience":
        prompt=`Describe the experience that the candidate has for this jobRole. Don't describe the company, or the jobRole. Limit your response to 100 words. Don't give it a title. Return the result as simple html.
        <candidate>
        ${globs.user0.synopsis}
        </candidate>
        <jobRole>
        ${gig.indeed.description}
        </jobRole>`
        break
      case "Strengths":
        prompt=`Create a description of this candidate's strengths to apply for the jobRole. Don't include a description of the company, or of the jobRole. Return the result as simple html.
        <candidate>
        ${globs.user0.synopsis}
        </candidate>
        <jobRole>
        ${gig.indeed.description}
        </jobRole>`
        break
      case "Weaknesses":
        prompt=`Create a 100 word description in two paragraphs of this candidate's weaknesses to apply for the jobRole. Give suggestions for how these weaknesses can be overcome in an interview. Don't include a description of the company, or of the jobRole. Return the result as simple html.
        <candidate>
        ${globs.user0.synopsis}
        </candidate>
        <jobRole>
        ${gig.indeed.description}
        </jobRole>`
        break
      case "Goals":
        prompt=`Create a description in two paragraphs of this candidate's career goals, and how they align with the described jobRole. Include only the description itself. Don't include any titles or section markers. Limit your response to 100 words. Return the result as simple html.
        <candidate>
        ${globs.user0.synopsis}
        </candidate>
        <jobRole>
        ${gig.indeed.description}
        </jobRole>`
        break
      case "Sample_Questions":
        prompt=`Create 10 questions that the candidate may be asked in an interview for the jobRole. Pay particular attention to probing the candidate's weaknesses. Include only the questions themselves. Don't include a title at the beginning. Use bullet points, not numbers. Return the result as simple html.
        <candidate>
        ${globs.user0.synopsis}
        </candidate>
        <jobRole>
        ${gig.indeed.description}
        </jobRole>`
        break
      case "Your_Questions":
        prompt=`Create 10 questions that the candidate can reasonably ask in an interview for the jobRole. These are questions for the candidate to ask, not the interviewer. Ask about what sets them apart from the competition. Include two questions that demonstrate a surprising knowledge of the company's current state or history. Make the questions simple. Include only the questions themselves. Don't include a title at the beginning. Use bullet points, not numbers. Return the result as simple html.
        <candidate>
        ${globs.user0.synopsis}
        </candidate>
        <jobRole>
        ${gig.indeed.description}
        </jobRole>`
        break
    }
//     cl(prompt)
    if(!prompt){return}
    let res=await gpOpenAi(prompt)
    res=res.replaceAll("<html>","")
    res=res.replaceAll("</html>","")
//     cl(res)
    if(!gig.interview){gig.interview={}}
    gig.interview[subject]=res
    saveGig(gig)
//     cl(gig)
  }

  var showCompany=()=>{

  }

  var showTalkSections=(subject)=>{
    let gig=getGig()
//     cl(gig)
//     cl(globs.user0)
    let text=(gig?.interview||{})[subject]
    let subject0=subject.replaceAll("_"," ")
    var title
    switch(subject){
      case "Position":
        title=`${subject0}: ${gig.indeed.positionName}`
        break
      case "Company":
        title=`${subject0}: ${gig.indeed.company}`
        break
      default:
        title=subject0
        break
    }
//     let title=(subject=="Position")?
//       :subject0
    if(text){
      return(
        <div>
          <h3>{title}</h3>
          {htmlToReact(gig.interview[subject])}
        </div>
      )
    }else{
      return(
        <div>(Waiting. . .)</div>
      )
    }
  }

  var ShowTalk=()=>{
    let gig=getGig()//gigs.filter
//     cl(globs)
//     cl(selGig)
    if(selGig){
//       cl(doc)
      if(doc){
        return showTalkSections(doc)
      }else{
        return(
          <div>
          {showActionButton({title:"Talk",left:{v:"untalk",t:"UnTalk"},right:{v:"go",t:"Go!"}})}
          {ShowMenu("gigs_talk",
            gig?.name,
            gig?.indeed?.positionName,
            globs.user0.profile.name
          )}
          <hr/>
          <h3 style={{textAlign:"center"}}>The Gig</h3>
          <Indeed00 parms={{
            gig:gig,//gigs.filter(g=>{return g.id==selGig})[0],
            onChange:indOnChange,
          }}/>
          </div>
        )
      }
    }else{
      cl(selTab,selLink)
      return(
        <div>
          {jobLinks[selTab][selLink||"menu"]()}
        </div>
      )
    }
  }

  var ShowGo=()=>{
    return(
      <div>
      Go
      </div>
    )
  }

  var doSelTab=(tab)=>{
    setSelGig()
    setSelLink()
    setSelTab(tab)
  }

/**************************** html to react ***********************/

/* test string:
 <div>
  <p>This is a <em>really</em> short message.</p>
 </div>
*/

var testObj=
// {
//   t:"div",
//   c:[
//     {
//       t:"p",
//       c:[
//         "This is a ",
//         {
//           t:"em",
//           c:["really"]
//         },
//         " short message"
//       ]
//     }
//   ]
// }

// [
//   "div",null,
//   [
//     ["p",null,
//     [
//       "This is a ",
//       ["em",null,["really"]],
//       " short message"
//     ]]
//   ]
// ]

// ["div",null,[
//   ["p",null,
//    ["This is a ",
//     ["em",null,["really"]],
//     " short message"
//   ]]
// ]
// ]
// ["div",null,[
//   ["p",null,[
//     ["This is a ",
//      ["em",null,["really"]],
//      " short message"]
//   ]]
// ]]

// [
//   "div",null,[
//     "p",null,[
//       "This is a ",
//       [
//         "em",null,[
//           "really"
//         ]
//       ],
//       " short message"
//     ]
//   ]
// ]
// caononical form:
[
  "div",null,[
    [
      "p",null,[
        "This is a ",
        [
          "em",null,[
            "really"
          ]
        ],
        " short message"
      ]
    ]
  ]
]
let testLine="<div><p>This is a <em>really</em> short message</p></div>"

var crEl=(a)=>{return createElement(a[0],a[1],mkCh(a[2]))}
var mkCh=(elArr)=>{return elArr.map(a=>{return (typeof(a)=="string")?a:crEl(a)})}

var parseHtml=(html)=>{
  var getTags=()=>{
    var sects1=[]
    sects.forEach(s=>{
      let pos=s.indexOf(">")
      sects1.push({
        t:s.substring(0,pos),
        s:s.substring(pos+1)
      })
    })
    sects1.shift()
    return sects1
  }
  let sects=html.split("<")
  let sects1=getTags()
//   cl(sects1)
}



// var makeChildren=(chil)=>{
//   return chil.map(c=>{
//     if(typeof(c)=="string"){
//       return c
//     }else{
//       createElement(c[0],c[1],makeChilren(c[2]))
//     }
//   })
//
// }

// var makeTest=()=>{
// //   let el=createElement("h3",null,["here I ", " and more"])
// //   let el=crEl(testObj)
//   parseHtml(testLine)
// //   return el
// }

var ShowMenu=(menu,v0,v1,v2,v3,v4)=>{
//   cl(menu)
  return <Menu1 parms={{menu:menu,v0:v0,v1:v1,v2:v2,v3:v3,v4:v4}}/>
}

/**************************** end html to react ***********************/

/*****************************************************************/
  let Pages={
    menu:e=>ShowMenu("gigMenu"),
    jobs:ShowJobs,
    tag:ShowTag,
    apply:ShowApply,
    talk:ShowTalk,
    go:ShowGo,
  }
//   cl(Pages[selTab])
//   cl(Pages.jobs)
//   cl("returning")
//   cl("return gigs")
  let parts=globs.loc.split("/")
//   cl(selTab)

  return (
      <div id="gigsCont" style={{width:globs.screen.w,height:globs.screen.h-globs.bcHeight,
        backgroundColor:"white",textAlign:"left",
        padding:10,overflowY:"auto"
      }}>
      {Pages[selTab||"menu"]()}
      </div>
  );
//       <TopTab0 parms={{
//         title:"Gigs",
//         tabs:[
//           {v:"jobs",t:"Jobs"},
//           {v:"tag",t:"Tag"},
//           {v:"apply",t:"Apply"},
//           {v:"talk",t:"Talk"},
//           {v:"go",t:"Go"},
//         ],
//         selTab:selTab,
//         cb:doSelTab,
//       }}/>
//       {Pages[selTab||"jobs"]()}
}

export default Gigs
