import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
import Select0 from "./Select0.js"
import ShowInfo0 from "./ShowInfo0.js"
import {cl,wsTrans,brands,saveBrand,gpOpenAi} from '../utils/utils.js'

function Brand() {
//   const [email, setEmail] = useState("red");
  const[brand,setBrand]=useState("")
  const[brandReady,setBrandReady]=useState(false)
  useEffect(x=>{
    waitForLoadInfo().then(e=>{setBrandReady(true)})
  },[])
  useEffect(x=>{
    cl("brand state")
  },[brand])

//   var brands=[
//     {
//       name:"LeafWave",
//       id:"A9fL3zKq28RwNvY6",
//       parent:"Verdant Holdings, Inc.",
//       website:"https://leafwave.com",
//       lines:[
//         "Smart indoor-outdoor planters",
//         "hydroponic kits",
//         "home-automation garden sensors",
//       ],
//       phone:"(503) 867-2445",
//       address:{
//         street:"125 Greenway Blvd",
//         city:"Portland",
//         state:"OR",
//         zip:"97209",
//         country:"USA",
//       },
//       social:{
//         ig:"https://instagram.com/leafwave",
//         fb:"https://facebook.com/leafwave",
//         tiktok:"https://tiktok.com/@leafwave",
//         twitter:"https://twitter.com/leafwave",
//         youtube:"https://youtube.com/leafwave",
//       }
//
//     },
//     {
//       name:"LuminaPulse",
//       id:"vT7eX1MpRb39KgQa",
//       parent:"Photonix Group LLC",
//       website:"https://leafwave.com",
//       lines:[
//         "Portable solar chargers",
//         "residential battery walls",
//         "micro-grid management software",
//         , ,
//       ],
//       phone:"(737) 212-9830",
//       address:{
//         street:"500 Aurora Ave",
//         city:"Austin",
//         state:"TX",
//         zip:"78701",
//         country:"USA",
//       },
//       social:{
//         ig:"https://instagram.com/luminapulse",
//         fb:"https://facebook.com/luminapulse",
//         tiktok:"https://tiktok.com/luminapulse",
//         twitter:"https://twitter.com/luminapulse",
//         youtube:"https://youtube.com/luminapulse",
//       }
//     },
//     {
//       name:"TerraForge",
//       id:"Zc8Wn64PvAjTyE1L",
//       parent:"Gaia Industries PLC",
//       website:"https://terraforge.io",
//       lines:[
//         "3-D-printed concrete homes",
//         "biodegradable insulation",
//         "modular eco-build kits",
//         , ,
//       ],
//       phone:"(408) 559-7734",
//       address:{
//         street:"2100 Redwood Pkwy",
//         city:"San Jose",
//         state:"CA",
//         zip:"95131",
//         country:"USA",
//       },
//       social:{
//         ig:"https://instagram.com/terraforge",
//         fb:"https://facebook.com/terraforge",
//         tiktok:"https://tiktok.com/terraforge",
//         twitter:"https://twitter.com/terraforge",
//         youtube:"https://youtube.com/terraforge",
//       }
//     },
//     {
//       name:"SkyNest",
//       id:"M3rQaYt59WdBvX0C",
//       parent:"Stratosphere Ventures Ltd.",
//       website:"https://skynest.co",
//       lines:[
//         "Urban air-taxi services",
//         "autonomous cargo drones",
//         "eVTOL design & leasing",
//         , ,
//       ],
//       phone:"(720) 334-1602",
//       address:{
//         street:"800 Skyline Rd",
//         city:"Denver",
//         state:"CO",
//         zip:"80202",
//         country:"USA",
//       },
//       social:{
//         ig:"https://instagram.com/skynest",
//         fb:"https://facebook.com/skynest",
//         tiktok:"https://tiktok.com/skynest",
//         twitter:"https://twitter.com/skynest",
//         youtube:"https://youtube.com/skynest",
//       }
//     },
//     {
//       name:"NexaBloom",
//       id:"kT92LmNeX6vBqR8d",
//       parent:"NovaGrowth Corp.",
//       website:"https://nexabloom.com",
//       lines:[
//         "Seed genomics",
//         "AI-driven crop analytics",
//         "precision-ag drone imaging",
//         , ,
//       ],
//       phone:"(984) 401-7289",
//       address:{
//         street:"77 Innovation Crescent",
//         city:"Raleigh",
//         state:"NC",
//         zip:"27607",
//         country:"USA",
//       },
//       social:{
//         ig:"https://instagram.com/nexabloom",
//         fb:"https://facebook.com/nexabloom",
//         tiktok:"https://tiktok.com/nexabloom",
//         twitter:"https://twitter.com/nexabloom",
//         youtube:"https://youtube.com/nexabloom",
//       }
//     },
//     {
//       name:"CircuitCurrent",
//       id:"YpA74xCmZt39WuF2",
//       parent:"ArcLight Global AG",
//       website:"https://circuitcurrent.tech",
//       lines:[
//         "Wireless-charging pads",
//         "smart power banks",
//         "IoT home-energy hubs",
//         , ,
//       ],
//       phone:"(206) 913-5551",
//       address:{
//         street:"15 Quantum Ln",
//         city:"Seattle",
//         state:"WA",
//         zip:"98109",
//         country:"USA",
//       },
//       social:{
//         ig:"https://instagram.com/circuitcurrent",
//         fb:"https://facebook.com/circuitcurrent",
//         tiktok:"https://tiktok.com/circuitcurrent",
//         twitter:"https://twitter.com/circuitcurrent",
//         youtube:"https://youtube.com/circuitcurrent",
//       }
//     },
//   ]

  var showBrand=()=>{
//     cl("show")
//     if(!brands){return}
//     let br=brands.filter(b=>{return b.id==brand})[0]
    let br=brand
    cl(br)
    return(<h3 className="clickable"
      onClick={e=>setBrand()}
    >{br.name}</h3>)
  }

  var procDesc=async(br,desc)=>{
    let prompt=`Read the following document, and summarize it in three sections of 100 words each. The sections are: 'Who We Are','What your duties would be','What we Want'. return it as a json object. This is the document:\n\n${desc}`
//     cl(prompt)
    return await gpOpenAi(prompt)
  }

  var procBody=(html)=>{
    cl(html)
    let pos=(html||"").indexOf("<body>")
    if(pos<0){return html}
    let pos2=html.indexOf("</body>")
    return html.substring(pos+6,pos2)
  }

  var setBrand2=async(e)=>{// e is the brand ID
    let br=brands.filter(b=>{return b.id==e})[0]
    setBrand(br)
    if(!br.indeed.synopsis){
      let desc=await procDesc(e,br.indeed.description)
      let obj=JSON.parse(desc)
      br.indeed.synopsis=obj
//       cl("set brand")
      setBrand(Object.assign({},br))
      saveBrand(br)
    }
  }

  var selectBrand=(open)=>{
    let items=(brands||[]).map(b=>{return{
      v:b.id,
      t:b.name
    }})
    return(<Select0 parms={{
        title:"Select Brand",
        items:items,
        onSelect:setBrand2,
        open:open,
        h:500,// can specify x,y,w,h
      }}/>
    )
  }

  var template=[
    {
      title:"Name",
      val:"name",
      type:"input"
    },
    {
      title:"Parent",
      val:"parent",
      type:"input"
    },

  ]

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


  var showIndeed=(br)=>{
//     cl(br.indeed)
    let ind=br.indeed
    return(
      <div>
      {showInField(ind.company,"Company")}
      {showInField(ind.location,"Location")}
      {showInField(`${ind.rating} / ${ind.reviewsCount}`,"Rating / Reviews")}
      {showInField(`${ind.positionName} - ${ind.jobType} `,"Position")}
      {showInField(ind.salary,"Salary")}
      {showInField(ind.postedAt,"Posted")}
      {showInLink(ind.externalApplyLink,"Apply at Company")}
      {showInLink(ind.url,"Indeed Listing")}
      {showInLink((ind.companyInfo||{}).indeedUrl,"Indeed Company Info")}
      {showInLink((ind.companyInfo||{}).url,"Company Page")}
      {showMakeSects(ind.synopsis)}
      {showInLong(ind.description,"Full Description")}
      </div>
    )
  }

  var showBrandInfo=()=>{
//     let br=brands.filter(b=>{return b.id==brand})[0]
    let br=brand
//     cl(br)
    if(br.indeed){
      return showIndeed(br)
    }else{
      return(
        <div>
        <ShowInfo0 parms={{template:template,item:br}}/>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <div style={{width:430,height:920,backgroundColor:"white",
        textAlign:"left",padding:10,overflowY:"auto"
      }}>
      {brand?showBrand():selectBrand()}
      {brand&&showBrandInfo()}
      </div>
    </div>
  );
}

export default Brand
