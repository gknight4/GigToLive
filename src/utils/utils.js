import {julesAvery} from "./sampleData.js"
import {Parser} from 'html-to-react'

function getStack() {
  const obj = {};
  if ("captureStackTrace" in Error) {
    Error.captureStackTrace(obj, getStack);
  }
  return obj.stack;
}

var az=(val,ze)=>{
  let str="000000"+val
  return str.substr(str.length-ze)
}

var cl=async(...names)=>{// for phone debugging
  let msg0=names.map(n=>{return JSON.stringify(n)})
  let func=getStack().split("\n")[2].split("(")[0].trim().substring(3)
  let dt = new Date();
  let ti=`${az(dt.getFullYear(),2)}${az(dt.getMonth()+1,2)}\
${az(dt.getDate(),2)}-${az(dt.getHours(),2)}\
${az(dt.getMinutes(),2)}${az(dt.getSeconds(),2)}`
  let msg=`${ti} ${func}: ${msg0.join(", ")}`
  let url=`https://sidehsl.com:3203/log`
  let method="POST"
  let type="application/json"
  let ret=await doGetPostBasic(url, method, msg, type)
}

var cl=console.log

var usersWs={}

var globs={
  webSocket:{},
  login:null,
  session:null,
  ws:{},
  wsKey:0,
  tabId:null,
  screen:{w:430,h:800},
  isTouch:null,
  loc:"",
  navHistory:[],
  navigate:null,
  bcHeight:26,
}

var initGlobs=()=>{
  let w=document.documentElement.clientWidth
  let h=document.documentElement.clientHeight
  let maxWh={w:432,h:858}
  if(w>maxWh.w){w=maxWh.w}
  if(h>maxWh.h){h=maxWh.h}
  globs.screen={w:w,h:h}
  globs.isTouch='ontouchstart' in document.documentElement;
}

initGlobs()

var showDevice=()=>{
  var ratio = window.devicePixelRatio || 1;
  var is_touch_device = 'ontouchstart' in document.documentElement;
  var touch_status = (is_touch_device) ? 'touch' : 'no-touch';
  touch_status = ' ts:' + touch_status;
  var width_height = 'wh:' + screen.width + 'x' + screen.height;
  var client_width_height = ' cwh:' + document.documentElement.clientWidth + 'x' + document.documentElement.clientHeight;
  var rw = screen.width * ratio;
  var rh = screen.height * ratio;
  var ratio_width_height = ' r:' + ratio + ' rwh:' + rw + 'x' + rh;
//   var data_string = wid
  cl(`ratio: ${ratio}`)
  cl(`is_touch_device: ${is_touch_device}`)
  cl(`touch_status: ${touch_status}`)
  cl(`width_height: ${width_height}`)
  cl(`client_width_height: ${client_width_height}`)
  cl(`rw: ${rw}`)
  cl(`rh: ${rh}`)
  cl(`ratio_width_height: ${ratio_width_height}`)

}


var navigate=(path)=>{
  if(!isNaN(path)){return globs.navigate(-1)}
  if(path[0]!="/"){// if relative
    if(globs.loc=="/"){globs.loc=""}
    path=globs.loc+"/"+path
  }
  globs.loc=path
  globs.navHistory.push(globs.loc)
  globs.navigate(globs.loc)
}

var navBack=()=>{
  globs.navHistory.pop()
  globs.navigate(-1)
}

var nav=(path)=>{
  return e=>{navigate(path)}
}

var constant={
//   wsPort:3202,
//   wsUrl:"ws:localhost:3202",
//   wsLocalUrl:"ws:localhost:3202",
  wsUsersUrl:"wss://sidehsl.com:3202"
//   MB_PACK:1000,
//   MB_ITEM:1001,
//   READ_COIL: 1,
//   READ_DISCRETE: 2,
//   READ_HOLDING: 3,
//   READ_INPUT: 4,
//   WRITE_COIL: 5,
//   WRITE_REGISTER: 6,
//   DIAGNOSTICS: 8,
//   WRITE_MULTIPLE_COILS: 15,
//   WRITE_MULTIPLE_REGISTERS: 16,
//   MASTER: 0,
//   SLAVE: 1,
}



function getTime(){
  return (new Date()).getTime() / 1000 ;
}

var makeTypeName=(table,baseName)=>{
  for(let i=1;i<100;i++){
    let typeName=`${baseName} ${i}`
    if(!Object.values(table)
      .map(v=>{return v.name})
      .includes(typeName)){return typeName}
  }
  return "New Dev Type"
}

function getRandomString(len){
  let bLen=Math.ceil(6*len/8)
  let array= new Uint8Array(bLen);
  crypto.getRandomValues(array);
  let str=""
  array.forEach(a=>{
    str+=String.fromCharCode(a)
  })
  return btoa(str).substr(0, len)// substitutes $,@ for /,+
    .replace(/\//g, "+")// tried ! and # - no dice!, no '_', '@',
    .replace(/\+/g, "*")// was '@'
}

var onOpen = (r)=>{
//   console.trace()
  cl("ws onOpen");
  usersWs.open=true
  r(true)
}

function onClose(e){
  cl("ws onClose");
  usersWs.open=false
//   wsPar.res=null
//   globs.webSocket.open=false
//   globs.webSocket.res=null// added 20231203
}

// var recvSocket = async(msg)=>{
//   globs.webSocket.onData(msg)
// //   var mo
// //   cl("got data")
// //   cl(msg)
// }

function onError(e){
  cl("ws onError");
  cl(e)
}

var sendWS = (pack)=>{
  cl(pack);
  usersWs.ws.send(JSON.stringify(pack))
}

// var openWebSockets={}

// class Ws{
//   static sockets={}
//   static callbacks={}
//   static key=0
// //   static createWs=(uri)=>{
// //
// //   }
//   constructor(uri){
//     cl(uri)
//     this.uri=uri
//     this.subscriptions={}
//     let wsPar=Ws.sockets[uri]
// //     cl(wsPar)
//     if(!wsPar){
//       wsPar={open:false}
//       Ws.sockets[uri]=wsPar
//       cl(uri)
//       this.openWs(uri)
//     }
//   }
//   async onOpen (wsPar,r, e){
//     cl("on open")
//     wsPar.open=true
//     wsPar.res.forEach(r=>{r()})
//     wsPar.res=null
//   }
//
//   async onClose (wsPar,e){
//     wsPar.open=false
//   }
//
//   async onmessage (msg){
//     let obj=JSON.parse(msg.data)
// //     cl(obj)
//     if(obj.key in Ws.callbacks){
//       let cb=Ws.callbacks[obj.key]
//       delete Ws.callbacks[obj.key]
//       cb(obj.resp)
//     }else{
// //       cl(obj.cmd)
//       let cb=this.subscriptions[obj.cmd]
//       if(cb){cb[0](obj)}
//     }
//   }
//
//   subscribe(topic,cb){
//     if(!this.subscriptions[topic]){this.subscriptions[topic]=[]}
//     this.subscriptions[topic].push(cb)
//   }
//
//   async send(msg){
//     cl("send")
//     await this.openWs(this.uri)
// //     cl("got it")
//     msg.key=Ws.key++
//     cl(msg)
//     Ws.sockets[this.uri].ws.send(JSON.stringify(msg))
//
//   }
//
//   async onError (wsPar,e){
//     wsPar.open=false
//   }
//
//   openWs(uri){
//     return new Promise((r,e)=>{
//       let wsPar=Ws.sockets[uri]
//       if(wsPar.open){
//         r()
//       }else{
//         if(wsPar.res){wsPar.res.push(r); return}// add it to the list of responses
//         wsPar.res=[r]// create the list of responses
//         let ws = new WebSocket(uri);
//         wsPar.ws=ws;
//         Ws.sockets[uri].ws=ws
//         ws.onopen = ()=>this.onOpen(wsPar,r, e);
//         ws.onclose = e=>this.onClose(wsPar,e);
//         ws.onmessage = e=>this.onmessage(e);
//         ws.onerror = e=>this.onError(wsPar,e);
//       }
//     })
//   }
// }

var openWebSocket=(uri)=>{// this is for both
//   console.trace()
//   cl(uri)
//   cl("open web socket")
  return new Promise((r,e)=>{
    let ws = new WebSocket(uri);
    ws.onopen = ()=>onOpen(r);
    ws.onclose = onClose
    ws.onmessage = onmessage
    ws.onerror = onError
    usersWs={ws:ws}
  })
  return wsPar

}

var sendUsersWs=async(msg)=>{
//   console.trace()
//   cl("send user ws")
//   cl(usersWs.ws.readyState)
  if(usersWs.ws.readyState==1){usersWs.ws.send(JSON.stringify(msg))
  }
}

var onmessage=(msg)=>{
//   cl(msg)
  let obj=JSON.parse(msg.data)
//   cl(obj)
  if(obj.key in wsTransCallbacks){
    let cb=wsTransCallbacks[obj.key]
    delete wsTransCallbacks[obj.key]
    cb(obj.resp)
  }
}

var wsTransKey=0
var wsTransCallbacks={}

var initUsersWs=async()=>{
//   cl(constant.wsUsersUrl)
  if(!usersWs.open){await openWebSocket(constant.wsUsersUrl)}
}

var wsTrans=async(parms)=>{// parms:{cmd, uri, method, sessionId, body}
// console.trace()
// cl(usersWs.open)
if(!usersWs?.open){await initUsersWs()}
// cl(usersWs.open)
// cl(usersWs.ws.readyState)
  return new Promise((r,e)=>{
    wsTransCallbacks[wsTransKey]=r
    parms.key=wsTransKey++
    sendUsersWs(parms)
//     cl(parms)
  })
}

var saveLocalStorage=(key,val)=>{
    localStorage.setItem(key, val);
  }

var getLocalStorage=(key)=>{
    let ret=localStorage.getItem(key);
    if(!ret){ret=sessionStorage.getItem(key)}
    return  ret
  }

var setTabId=()=>{
  globs.tabId=sessionStorage.getItem("tabId")
  globs.sessionId=sessionStorage.getItem("sessionId")
//   cl(globs.tabId,globs.sessionId)
  if(globs.tabId){return}
  globs.tabId=getRandomString(8)
  sessionStorage.setItem("tabId",globs.tabId)
}

var openWs=(uri)=>{
  cl(`Open WS ${uri}`)
  let ws=new Ws(uri)
  cl("got it")
  return ws//new Ws(uri)
}

/********************* Web Socket 2 *************************/

  var ws2onOpen=async(wsPar,r, e)=>{
    cl("on open")
    wsPar.open=true
    r(wsPar)
  }

  var ws2onClose=async(wsPar,e)=>{
    cl("on close")
    delete globs.ws[wsPar.uri]
    wsPar.open=false
  }

  var ws2onmessage=async(wsPar,msg)=>{
    let obj=JSON.parse(msg.data)
    let cb=wsPar.cb[obj.key]
    if(cb){
      cb(obj)
      delete wsPar.cb[obj.key]
    }
//     cl(wsPar)
//     cl(obj.cmd)
    let cbs=wsPar.sub[obj.cmd]
//     cl(cbs)
    if(cbs){
      Object.keys(cbs).forEach(k=>{
        cbs[k](obj)
      })
    }
  }

  var ws2onError=async(wsPar,e)=>{
    cl("on error")
    delete globs.ws[wsPar.uri]
    wsPar.open=false
  }

  var ws2send=(uri,msg)=>{
    return new Promise(async(r,e)=>{
      let wsPar=globs.ws[uri]
//       cl(wsPar)
      if(!wsPar){
        wsPar=await ws2Open(uri)
      }
      wsPar.cb[globs.wsKey]=r
      msg.key=globs.wsKey++
      wsPar.ws.send(JSON.stringify(msg))
    })

  }

var ws2Sub=(uri,cmd,cb)=>{
  let wsPar=globs.ws[uri]
  if(wsPar){
    if(!wsPar.sub[cmd]){wsPar.sub[cmd]={}}
    let subId=getRandomString(8)
    wsPar.sub[cmd][subId]=cb
    return subId
  }
}

var ws2UnSub=(uri,cmd,subId)=>{
  let wsPar=globs.ws[uri]
//   cl(wsPar.sub[cmd])
//   cl(wsPar.sub[cmd][subId])
  delete wsPar.sub[cmd][subId]
}

var ws2Open=(uri)=>{
  return new Promise((r,e)=>{
    if(globs.ws[uri]){
      r(globs.ws[uri])
    }else{
      let ws = new WebSocket(uri);
      let wsPar={
        uri:uri,
        ws:ws,
        open:false,
        cb:{},
        sub:{}
      }
      globs.ws[uri]=wsPar
//       Ws.sockets[uri].ws=ws
      ws.onopen = ()=>ws2onOpen(wsPar,r, e)
      ws.onclose = e=>ws2onClose(wsPar,e)
      ws.onmessage = e=>ws2onmessage(wsPar,e)
      ws.onerror = e=>ws2onError(wsPar,e)
    }
  })
}

/********************* End Web Socket 2 *************************/

var brands
// var liWaiting=[]
// var loaded=false
var openingWs=false

// var loadInfo=async()=>{
// //   cl("load info")
//   if(loaded){return}
// //   cl(loaded)
//   loaded=true
//   await openWebSocket(constant.wsUsersUrl)
// //   let res=await wsTrans({uri:"/s/brands",
// //     method:"retrieve",body:{sessionId:globs.sessionId}})
// //   if(res){brands=res.brands||[]}
// //   cl("socket open?")
//
// //   cl(brands)
//   liWaiting.forEach(r=>{r()})
// }

var loadBrands=async()=>{
  let res=await wsTrans({uri:"/s/brands",
    method:"retrieve",body:{sessionId:globs.sessionId}})
  if(res){brands=res.brands||[]}
}

var delayPromise=(delayMs)=>{
  return new Promise((r,e)=>{
    setTimeout(r,delayMs)
  })
}

var openWS2=async()=>{
  if(openingWs){return}
  openingWs=true
  cl("opening")
  await openWebSocket(constant.wsUsersUrl)
}

var waitForWs=async()=>{
  while(usersWs?.ws?.readyState!=1){await delayPromise(100)}
}


// var waitForLoadInfo=()=>{
//   return new Promise((r,e)=>{
//     liWaiting.push(r)
//   })
// }

var saveBrand=async(br)=>{
  cl("saveBrand")
  let br0=brands.filter(b=>{return b.id==br.id})[0]
  Object.assign(br0,br)
//   cl(br0)
  let res=await wsTrans({uri:"/s/brands",
    method:"update",body:{sessionId:globs.sessionId,brand:br}})
  cl(res)
}

var saveUser=async(userRef)=>{
//   cl("saveUser")
//   cl(userRef)
    let resp=await wsTrans({uri:"/s/users",
      method:"update",body:{profile:userRef.current,sessionId:globs.sessionId}})
//   cl(resp)
}

var loadUser=async(full)=>{
  if(!globs.sessionId){return}
//   cl("load user")
//   cl(globs.sessionId)
  let resp=await wsTrans({uri:"/s/users",
    method:"retrieve",body:{sessionId:globs.sessionId}})
  globs.userId=resp.user.userId
//   cl(resp)
//   cl(resp.user.profile)
//   if(resp.ok){setMyUser(/*julesAvery*/resp.user.profile)}
//   return julesAvery

  return (full)?resp?.user:resp?.user?.profile||{}
}

var loadDocs=async()=>{
    let res=await wsTrans({uri:"/s/docs",
      method:"retrieve",body:{sessionId:globs.sessionId}})
    globs.docs0=res.docs
//     cl(res.docs)
}

var loadTable=async(id,query)=>{
  let body=Object.assign({sessionId:globs.sessionId},query)
//   cl(body)
  let res=await wsTrans({uri:`/s/${id}`,method:"retrieve",
    body:body})
//   cl(res)
  let data=(res.data)?res.data:res[id]
  return res.data
}

var saveItem=async(id,data)=>{
  let res=await wsTrans({uri:`/s/${id}`,method:"update",
    body:{sessionId:globs.sessionId,data:data}})
//   return res.data
}

  var loadGigs=async()=>{
//     if(gigs){return}
    let res=await wsTrans({uri:"/s/gigs",
      method:"retrieve",body:{sessionId:globs.sessionId}})
//     cl(res)
    return res?.gigs
//     if(res){
//       setGigs(res.gigs.filter(g=>{return g.id}))}
  }

var get=async(type,query)=>{
  switch(type){
    case "docs":
      if(!globs.docs0){
        globs.docs0=await loadTable("docs")
//         cl(globs.docs0)
      }
      if(query){// one doc why 1?
        let doc=globs.docs0.filter(d=>{return d.id==query})[0]
        return doc
      }else{// all docs
        return globs.docs0
      }
      break
    case "gigs":
      if(!globs.gigs0){
        globs.gigs0=await loadTable("gigs")
//         cl(globs.gigs0)
      }
      return globs.gigs0
      break
    case "events":
      if(!globs.events0){
        globs.events0=await loadTable("events",query)
//         cl(globs.events0)
      }
      return globs.events0
      break
    default:
      break
  }
}

var put=async(type,data)=>{
//   cl(data)
  switch(type){
    case "docs":
      let doc0=globs.docs0.filter(d=>{return d.id==data.id})[0]
//       cl(doc0)
      if(doc0){
        Object.assign(doc0,data)
      }else{
        globs.docs0.push(data)
      }
//       cl(data)
      await saveItem("docs",data)
      break
    default:
      break
  }
}

var loadContacts=async(contactId,namesOnly)=>{
  if(!globs.sessionId){return}
//   cl("call",contactId,namesOnly)
  let resp=await wsTrans({uri:"/s/contacts",
    method:"retrieve",body:{
      sessionId:globs.sessionId,
      namesOnly:namesOnly,
      contactId:contactId,
    }})
//   cl("return")
  return resp
}

var loadEvents=async(range)=>{
  if(!globs.sessionId){return}
  let resp=await wsTrans({uri:"/s/events",
    method:"retrieve",body:{
      sessionId:globs.sessionId,
      from:range.from,
      to:range.to,
    }})
  return resp
}

var gpOpenAi=async(prompt)=>{
  return await wsTrans({uri:"/s/openai",
    method:"retrieve",body:{cmd:"basic",sessionId:globs.sessionId,prompt:prompt}})
//   cl(resp)

}

var doGetPostBasic=(url, method, body=null, type='')=>{
//   cl(url,method,body,type)
  return new Promise((res, rej)=>{
    let options={
      method: method,
      headers: {},
    }
    if(body) options.body = body;
    if(type) options['content-type']=type
    /*return */fetch(url, options).then(
      r=>{
        res(r)},
      e=>{
        res({json:e=>{return {result:"error"}}})
      }
    )
  })
}

var trimStr=(str,len)=>{
  return(str.length>len)?str.substring(0,len-2)+"...":str
}

var sortObj=(a,b,field)=>{
  if(a[field]<b[field]){return -1}
  if(a[field]>b[field]){return 1}
  return 0
}

var sortScal=(a,b)=>{
  if(a<b){return -1}
  if(a>b){return 1}
  return 0
}

var showBackBut=(onClick)=>{
//   cl("showback")
  return(
    <div style={{cursor:"pointer"}}>
    <img src="/utils/lft.png" width="24"
    onClick={onClick}
    />
    </div>
  )
}

var clLog=[
  "one",
  "two",
]

var cl2=(msg)=>{
  clLog.push(msg)
}

var tsToData=(ts)=>{
  let da=new Date(1000*ts)
  return{
    yr:da.getFullYear(),
    mo:da.getMonth(),
    dt:da.getDate(),
    da:da.getDay(),
    hr:da.getHours(),
    mn:da.getMinutes(),
    sc:da.getSeconds(),
  }
}

var tsToInDate=(ts)=>{
  let dt=tsToData(ts)
//   cl(dt)
  return `${dt.yr}-${az(dt.mo+1,2)}-${az(dt.dt,2)}T${az(dt.hr,2)}:${az(dt.mn,2)}`
}

var tsToDisplay=(ts,format)=>{
  let dt=tsToData(ts)
  switch(format){
    case "mm/dd/yy hh/mm":
      return `${az(dt.mo+1,2)}/${az(dt.dt,2)}/${dt.yr} ${az(dt.hr,2)}:${az(dt.mn,2)}`
      break
  }
}


var showActionButton=(buts)=>{
  return(
    <div style={{float:"none"}}>
    {buts.left&&
      <Button style={{float:"left"}}
      onClick={oc(buts.left.v)}>{buts.left.t}</Button>
    }
    {buts.right&&
      <Button style={{float:"right"}}
      onClick={oc(buts.right.v)}>{buts.right.t}</Button>
    }
      <div style={{clear:"both"}}/>
    </div>
  )
}

var setSaveTimer=(func,id)=>{
  cl("set save")
  clearTimeout(globs[id])
  globs[id]=setTimeout(func,5000)
}

var procContactName=(cont)=>{
  let [ln,fn,mn,n4,n5]=(cont.n||"").split(";")
  if(!ln){
    ln=fn
    fn=""
    cont.n=[ln,fn,mn,n4,n5].join(";")
  }
  cont.v=cont.id
  cont.t=cont.n
}






// var setSaveTimer=(st)=>{
//   clearTimeout(st.tId)
//   st.tId=setTimeout(st.cb,st.TO)
// }



/********************* User File System (ufs) *************************/

var ufs={
  db:null,
  te:new TextEncoder(),
  td:new TextDecoder(),
  dbName:"/ufs",
  osName:"file_store",

  idbRequest:(obj,method,args)=>{
// used internally to convert "onsuccess", etc. to a Promise
    return new Promise((r,e)=>{
//       cl(obj)
      let res=obj[method](...(args||[]))
//       cl(res)
      res.onsuccess=(re)=>{/*cl("success");*/r(res.result)}
      res.onerror=(e)=>{cl("error",e)}
      res.onupgradeneeded=ufs.initDB// fires when database needs to be created
    })
  },

  getStore:(rw)=>{
    try{
      let trans=ufs.db.transaction([ufs.osName],rw)
      return trans.objectStore(ufs.osName)
    }catch{
      return
    }
  },

  get:async(path)=>{// return string
    let val=await ufs.getb(path)
//     cl(val)
    return ufs.td.decode(val)
  },

  getb:(path)=>{// return Uint8Array
    return new Promise(async(r,e)=>{
//       cl(ufs.db)
      if(!ufs.db){await ufs.openDB()}
      let store=ufs.getStore()
      if(!store){return}
//       cl(path)
      let val=await ufs.idbRequest(store,"get",[path])
      let len=val?.contents?.byteLength
      let mode=val?.mode
//       cl(`mode: ${mode}, len: ${len}`)
      r(val?.contents)
    })
  },

  set:(path,data)=>{// data must be either string or Uint8Array
    let mode={'/userfs/packs':16893,
//       '/userfs/assets':16893,
//       '/userfs/scenes':16893,
//       '/userfs/scripts':16893,
      '/userfs/packs/electric_fan.pck':33206}[path]||13
    if(typeof data=="string"){ data=ufs.te.encode(data) }
    return new Promise(async(r,e)=>{
      if(!ufs.db){await ufs.openDB()}
      let store=ufs.getStore("readwrite")
      if(!store){return}
      if((data)||(data=="")){
        let obj={timestamp:new Date(),mode:mode,contents:data}
        await ufs.idbRequest(store,"put",[obj,path])
      }else{
        cl("deleting")
        let res=await ufs.idbRequest(store,"delete",[path])
        cl(res)
      }
      r(true)
    })
  },

  list:(path)=>{
    return new Promise(async(r,e)=>{
      if(!ufs.db){await ufs.openDB()}
      let store=ufs.getStore()
      if(!store){r([]);return}
      let query=(path)?window.IDBKeyRange.bound(`${path}!`,`${path}~`):undefined
      let keys=await ufs.idbRequest(store,"getAllKeys",[query])
      r(keys)
    })
  },

  close:()=>{
    if(!ufs.db){return}
    ufs.db.close()
  },

  initDB:(e)=>{// create object store when db created
// for some reason, Godot needs to create the ObjectStore, *not* here
//     ufs.notCreated=true
    cl("db needs to be created!")
    // these lines were commented out, to allow Godot to create the Object Store
    cl("initting db")
//     e.target.result.createObjectStore(ufs.osName,{keyPath:"timestamp"})
    e.target.result.createObjectStore(ufs.osName)
  },

  openDB:async()=>{
//     console.trace()
    if(!ufs.db){
//       cl("try")
      ufs.db=await ufs.idbRequest(window.indexedDB,"open",[ufs.dbName])
//       cl("got it")
//       cl("indexedDB is open")
//       cl(ufs)
//       cl(ufs.db)

      // these lines were to allow Godot to create the db:
//       if(ufs.notCreated || (ufs.db.version<21)){
//         cl("closing db")
//         ufs.db.close()
//         ufs.db=null
//       }

    }
  },
}

var getHtml=async(url)=>{
  cl(globs)
  return await wsTrans({
    cmd:"cRest",
    uri:"/s/web",
    method:"retrieve",
    sesh:globs.sessionId,
    body:{
      url:url,
      sessionId:globs.sessionId,
    }
  })
}

var stripHtml=async(url)=>{
  cl("get html")
//   url="https://www.mapquest.com/us/california/live-nation-269790640"
  let html=await getHtml(url)
  cl(html)
  let info={}
  html[0][3].children.forEach(c=>{
    switch((c||[])[1]){
      case "$L2e":
      case "$L2f":
      case "$L30":
      case "$L31":
      case "$L32":
      case "$L33":
      case "$L34":
      case "$L35":
      case "$L36":
      case "$L37":
      case "$L38":
      case "$L39":
        cl(c)
        if(!info.addr){info.addr=c[3].address}
        if(!info.phoneNumber){info.phoneNumber=c[3].phoneNumber}
        if(!info.slug){info.slug=c[3].slug}
        if(!info.title){info.title=c[3].title}
        if(!info.website){info.website=c[3].website}
        break
//       case "$L30":
//         cl(c)
//         cl(c[3])
//         cl(c[3].address)
//         if(!info.title){info.title=c[3].title}
//         if(!info.phoneNumber){info.phoneNumber=c[3].phoneNumber}
//         if(!info.website){info.website=c[3].website}
//         if(!info.addr){info.addr=c[3].address}
//         if(!info.slug){info.slug=c[3].slug}
//         break
//       case "$L31":
//         cl(c)
//         if(!info.addr){info.addr=c[3].address}
//         if(!info.slug){info.slug=c[3].slug}
//         break
//       case "$L32":
//         cl(c)
//         if(!info.phoneNumber){info.phoneNumber=c[3].phoneNumber}
//         if(!info.website){info.website=c[3].website}
//         if(!info.addr){info.addr=c[3].address}
//         if(!info.slug){info.slug=c[3].url}
//         break
//       case "$L33":
//         cl(c)
//         if(!info.title){info.title=c[3].title}
//         break
      default:
        break
    }
  })
//   cl(info)
  return info
//   let text=[]
//   let angDepth=0
//   for(let i=0;i<html.length;i++){
//     let ch=html[i]
//     if(["<",">"].includes(ch)){
//       angDepth+=(ch=="<")?1:-1
//     }else{
//       if(!angDepth){text.push(ch)}
//     }
//   }
//   let text0=text.join("")
//   cl(text0)
//   cl(angDepth)
}

var htmlToReact=(html)=>{
  if(!globs.parse){globs.parse=new Parser()}
  return globs.parse.parse(html)
}

var gcsApiKey="AIzaSyDjSriONxpjMXWR8PQZcGMXETx7mafC_mI"
var gcsSearchEngineId="c5646753f4d01404c"

var loadGoogleCustomSearchClient=async()=>{
  await gapi.load("client");// doesn't await'
  while(!gapi.client){await delayPromise(100)}// await here
  gapi.client.setApiKey(gcsApiKey);
  try{
    let url="https://customsearch.googleapis.com/$discovery/rest?version=v1"
    await gapi.client.load(url)
//     cl("GAPI client loaded for API")
  }catch{
    cl("Error loading GAPI client for API")
  }
}

var customSearch=async(query)=>{
  try{
    return await gapi.client.search.cse.list({
      cx:gcsSearchEngineId,
      q:query
    })
  }catch{
    cl("Custom Search Error")
  }
}

// showDevice()

export {cl,getTime,wsTrans,globs,saveLocalStorage,openWs,
  getLocalStorage,ufs,constant,setTabId,initUsersWs,
  ws2Open,ws2send,ws2Sub,ws2UnSub,getRandomString,makeTypeName,
  brands,gpOpenAi,saveBrand,az,clLog,cl2,navigate,navBack,nav,
  doGetPostBasic,loadUser,saveUser,waitForWs,tsToInDate,
  openWebSocket,openWS2,trimStr,sortObj,sortScal,showBackBut,
  tsToData,loadContacts,loadEvents,procContactName,loadGigs,
  loadGoogleCustomSearchClient,customSearch,stripHtml,htmlToReact,
  loadDocs,get,put,tsToDisplay,
}
