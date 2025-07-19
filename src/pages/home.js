import '../App.css';
import React, { useState,useEffect } from "react";
import {Button,Form} from 'react-bootstrap';
// import Form from 'react-bootstrap/Form.js';
import NavBar from "./navbar.js"
import {cl,ufs,globs,ws2Open,ws2send,ws2Sub,ws2UnSub,constant,
  getRandomString,makeTypeName,
}
  from "../utils/utils.js"

// var ws,setWs,dummy,setDummy,saveDisable,setSaveDisable

function Home() {

var testCb=(obj)=>{
  cl(obj)
}

var onChange=(type,vals)=>{
  cl(type,vals)
  let cmds={addBus:addBus,deleteBus:deleteBus,addDevice:addDevice,
    deleteDevice:deleteDevice,save:saveMonitor,
  }
  if(cmds[type]){
    return cmds[type](vals)
  }
}

var initDeviceInfo=(devId,parent)=>{
  let initDevType=Object.keys(deviceTypes)[0]
  let name=makeTypeName(devices,"Device")
  setVal(setDevices,devId,"parent",parent)
  setVal(setDevices,devId,"type",initDevType)
  setVal(setDevices,devId,"name",name)
  setVal(setDevices,devId,"addr",255)
}

var addBus=()=>{
//   cl("add bus")
  let typeId=getRandomString(8)
  setVal(setBuses,typeId,"parent",monitor)
  setVal(setBuses,typeId,"name",makeTypeName(buses,"Bus"))
  let devId=getRandomString(8)
  initDeviceInfo(devId,typeId)
  setBus(typeId)
  setDevice(devId)
  setSaveEnable(true)
}

var removeBus=(id,isBus)=>{
//   cl(id,isBus)
  let tab=(isBus)?buses:devices
  let tab0=Object.assign({},tab)
  let busKeys=Object.keys(tab)
//   cl(types)
  for(let i=0;i<busKeys.length;i++){
    if(busKeys[i]!=id){
      if(isBus){
        setBus(busKeys[i])
//         cl(busKeys[i])
      }else{
        setDevice(busKeys[i])
      }
      break
    }
  }
//   cl(id)
  delete tab0[id];
//   cl(tab0);
  ((isBus)?setBuses:setDevices)(tab0)
//   setDeviceTypes(tab0)
}

var deleteBus=()=>{
  removeBus(bus,true)
  setSaveEnable(true)
}

var addDevice=()=>{
//   cl("add bus")
//   let typeId=getRandomString(8)
//   setVal(setBuses,typeId,"parent",monitor)
//   setVal(setBuses,typeId,"name",makeTypeName(buses,"Bus"))
  let devId=getRandomString(8)
  initDeviceInfo(devId,bus)
//   setBus(typeId)
  setDevice(devId)
  setSaveEnable(true)
}

var deleteDevice=()=>{
  removeBus(device,false)
  setSaveEnable(true)
}

var saveMonitor=async()=>{
  cl("save monitor")
  await ufs.set("/buses",JSON.stringify(buses))
  await ufs.set("/devices",JSON.stringify(devices))
  setSaveEnable(false)
  setPageType("home")

}

var getLocalMonitor=async()=>{
  cl("get local monitor")
  let res=await ws2send(constant.wsLocalUrl,{uri:"/o/monitor",cmd:"getMonitorId"})
  cl(monitors)
  let monitors2=Object.assign({},monitors)
  if(!monitors[res.monitorId]){
    monitors2[res.monitorId]={name:"Local Monitor"}
    setMonitors(monitors2)
  }
  setMonitor(Object.keys(monitors2)[0])
}

const loadLocal=async()=>{
//   getLocalMonitor()
  setMonitor("syu3Vu0s")
  let data=await ufs.get("/deviceTypes")
  setDeviceTypes(JSON.parse(data))
  data=await ufs.get("/buses")
  if(data){setBuses(JSON.parse(data))}
  data=await ufs.get("/devices")
  if(data){setDevices(JSON.parse(data))}
//   cl(data.length)
  let res=await ws2send(constant.wsLocalUrl,{uri:"/o/monitor",cmd:"getSerial"})
  let ports={}
  res.ports.forEach(p=>{
    ports[p.path]=p
    p.name=p.path
  })
  cl(ports)
//   cl(res.ports)
  setPorts(ports)
}



// var onChange=async(type,vals)=>{
//   cl(type,vals)
// //   cl(saveDisable)
// //   setSaveDisable(!saveDisable)
// //   await ws2Open(constant.wsLocalUrl)
// //   let subId=ws2Sub(constant.wsLocalUrl,"testCb",testCb)
// // //   cl(subId)
// //   let res=await ws2send(constant.wsLocalUrl,{uri:"/s/testWs",thin:"thick"})
// // //   cl(res)
// //   ws2UnSub(constant.wsLocalUrl,"testCb",subId)
// }

var updateMb=(msgObj)=>{
  cl(msgObj)

}

//   cl(saveDisable)

function useMonitorSelect(label,id,initVal){
//   const [value, setValue] = useState(initVal);
  const [value, setValue] = useState(initVal);
  let opts=Object.keys(monitors).map((k,i)=>{
    let m=monitors[k]
    return <option key={i} value={m.id}>{m.name}</option>
  })
  const select=<>
    <label htmlFor={id}>{label}</label><br/>
    <Form.Select id={id}
      style={{display:"inline-block",width:"initial"}}
      value={value}
      onChange={e=>{
        setValue(e.target.value)
      }}
    >
    {opts}
    </Form.Select>
  </>
  return [value, setValue, select];
}

function useBusSelect(table,parent,label,id,initVal,isBus){
  const [value, setValue] = useState(initVal);
  let opts=Object.keys(table)
    .filter(k=>{return table[k].parent==parent})
    .map((k,i)=>{
    return <option key={i} value={k}>{table[k].name}</option>
  })
  const select=<>
    <label htmlFor={id}>{label}</label><br/>
    <Form.Select id={id}
      style={{display:"inline-block",width:"initial"}}
      value={value}
      onChange={e=>{
        setValue(e.target.value)
        if(isBus){
          setDevice(Object.keys(devices)
            .filter(k=>{return devices[k].parent==e.target.value})[0])
        }
      }}
    >
      {opts}
    </Form.Select>
  </>
  return [value, setValue, select];
}

function makeTypeSelect(table,setFunc,row,col,label,id,initVal){
//   var value,setValue
  const value=table[row][col]
//   const [value, setValue] = useState(initVal);
  let opts=Object.keys(deviceTypes)
    .filter(k=>{return k.indexOf("-")<0})
    .map((k,i)=>{
      return <option key={i} value={k}>{deviceTypes[k].name}</option>
    })
//   cl(opts0)
//   let opts=Object.keys(table)
//     .map((k,i)=>{
//     return <option key={i} value={k}>{table[k].name}</option>
//   })
  const select=<>
    <label htmlFor={id}>{label}</label><br/>
    <Form.Select id={id}
      style={{display:"inline-block",width:"initial"}}
      value={value}
      onChange={e=>{
        setVal(setFunc,row,col,e.target.value)
        setSaveEnable(true)
//         setValue(e.target.value)
      }}
    >
      {opts}
    </Form.Select>
  </>
  return [value, select];
}

var setVal=(setFunc,row,col,val)=>{
//   cl(row,col,val)
  setFunc(prev=>{
    if(!prev[row]){prev[row]={}}
    prev[row][col]=val
//     cl(prev[row][col])
    return Object.assign({},prev)
  })
}

var getVal=(val,row,col)=>{
  return val[row][col]
}

function makeInput(val,setFunc,row,col,label,id){
  cl(val)
  cl(devices)
  cl(row,col)
  cl(val[row])
//   const value=(!row||!col)?"Unknown":val[row][col]
  const value=val[row][col]
  const input=<>
    <label htmlFor={id}>{label}</label><br/>
    <input id={id} type="text"
    value={value}
    onChange={e=>{
      setVal(setFunc,row,col,e.target.value)
      setSaveEnable(true)
    }}
    /><br/>
    </>
    return [value,input]
}

var showConfig=()=>{
//   cl(buses)
//   let monitorName=monitors
//   cl(monitors,monitor)
  let curMonitor=monitors[monitor]//.filter(m=>{return m.id==monitor})[0]
  let monitorName=(curMonitor)?curMonitor.name:"Unknown Monitor"
  cl("render")
  cl(monitor)
  return(
    <div className="App">
      <NavBar
        parms={{
          onChange:onChange,
          saveDisabled:!saveEnable,
          showSave:showSave,
        }}
      />
      <div style={{width:400,border:"1px solid black",borderRadius:10,
        backgroundColor:"white",marginLeft:"auto",marginRight:"auto",
         padding:20,position:"relative"
      }}>
      <div style={{position:"absolute", right:20,top:10,cursor:"pointer"}}
        onClick={x=>{
          setSaveEnable(false)
          setPageType("home")
        }}
      >
      X
      </div>
      <h2>{monitorName} Configuration</h2>
      <div style={{textAlign:"left"}}>
        {monitorNameInput}<br/>
        {selectPort}<br/><br/>
        {selectBus}
        &nbsp;<span style={{color:"blue",fontSize:24,cursor:"pointer"}}
        onClick={x=>onChange("addBus")} title="Add Bus">+</span>
        &nbsp;<span style={{color:"red",fontSize:24,cursor:"pointer"}}
        onClick={x=>onChange("deleteBus")} title="Delete Bus">-</span><br/><br/>
        {busNameInput}<br/>
        <h3>Devices on Bus</h3>
        {selectDevice}
        &nbsp;<span style={{color:"blue",fontSize:24,cursor:"pointer"}}
        onClick={x=>onChange("addDevice")} title="Add Device">+</span>
        &nbsp;<span style={{color:"red",fontSize:24,cursor:"pointer"}}
        onClick={x=>onChange("deleteDevice")} title="Delete Device">-</span><br/><br/>
        {devNameInput}<br/>
        {selectDevType}<br/><br/>
        {devAddrInput}
      </div>
      </div>
    </div>

  )
}

var showHome=()=>{
  return(
    <div className="App">
      <NavBar
        parms={{
          onChange:onChange,
          saveDisabled:!saveEnable,
          showSave:showSave,
        }}
      />
      <div style={{width:1000,height:700,border:"1px solid black",borderRadius:10,
        backgroundColor:"white",marginLeft:"auto",marginRight:"auto",padding:20,
      }}>
      {selectMonitor}&nbsp;
      <Button type="button"
        onClick={
          x=>{
            setSaveEnable(false)
            setShowSave(true)
            setPageType("config")}
        }
      >Configure</Button>
      </div>
    </div>
  )
}

const [monitors,setMonitors]=useState({
  "syu3Vu0s":{
    name:"Local Monitor",
    port:"/dev/ttyUSB1",
  }
})

const [buses,setBuses]=useState({
  "1234":{
    parent:"syu3Vu0s",
    name:"Bus 1",
  },
  "2345":{
    parent:"syu3Vu0s",
    name:"Bus 2",
  },
})

const [devices,setDevices]=useState({
  "3456":{
    parent:"1234",
    name:"Dev 1",
    type:"8RO",
    addr:37
  },
  "4567":{
    parent:"1234",
    name:"Dev 2",
    type:"8RO2",
    addr:38
  },
  "5678":{
    parent:"2345",
    name:"Dev 1",
    type:"8RO",
    addr:37
  },
  "6789":{
    parent:"2345",
    name:"Dev 2",
    type:"8RO2",
    addr:38
  },
})

  const [deviceTypes,setDeviceTypes]=useState({})
  const [ports,setPorts]=useState([])
//   const [port,setPort]=useState("")
  const [ws,setWs]=useState()
//   const [saveEnable,setSaveEnable]=useState(true)
  const [showSave,setShowSave]=useState(true)
//   const [monitors,setMonitors]=useState([])
  const [pageType,setPageType]=useState("config")
  const [monitor,setMonitor,selectMonitor]=useMonitorSelect()
  const [saveEnable,setSaveEnable]=useState(false);
  let initBus=Object.keys(buses)[0]
  const [bus,setBus,selectBus]=useBusSelect(buses,monitor,
    "Select Bus","selBus",initBus,true)
  const[busName,busNameInput]=makeInput(buses, setBuses,
    bus,"name","Bus Name","busName")
  let initDevice=Object.keys(devices).filter(k=>{return devices[k].parent==bus})[0]
  const [device,setDevice,selectDevice]=useBusSelect(devices,bus,
    "Select Device","selDevice",initDevice,false)
  const[devName,devNameInput]=makeInput(devices, setDevices,
    device,"name","Device Name","devName")
  const[devAddr,devAddrInput]=makeInput(devices, setDevices,
    device,"addr","Device Addr","devAddr")
  let initDevType=Object.keys(deviceTypes).filter(k=>{return k.indexOf("-")<0})[0]
  const [devType,selectDevType]=makeTypeSelect(devices,setDevices,device,"type",
    "Select DeviceType","selDevType",initDevType)
  const[monitorName,monitorNameInput]=makeInput(monitors, setMonitors,
    monitor,"name","Monitor Name","monitorName")
  const [port,setPort,selectPort]=useBusSelect(ports,null,
    "Select Port","selPort",initDevice,false)

  useEffect(x=>{
    loadLocal()
    return(x=>{
      cl("closing")
      delete globs.ws[constant.wsLocalUrl]
    })
  },[])

  return{home:showHome,config:showConfig}[pageType]();
}

export default Home;
