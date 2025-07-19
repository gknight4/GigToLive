import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
import {cl,wsTrans,globs,saveLocalStorage,getLocalStorage,
  ufs,getRandomString,makeTypeName,
} from '../utils/utils.js'


function DeviceTypes() {

var testUfs=async()=>{
//   cl("test ufs")
//   ufs.set("/testValue","here")
  let name="here"
  let value="there"
//   cl(...deviceTypes)
//   setDeviceTypes(prev=>{
//     cl(...prev)
//     return{prev}
//   })
  let field="two"

//   await setDeviceTypes({...deviceTypes,  "1234-5678": {name:"b",[field]:"two"}})
//   setDeviceTypes(prev=>{
//     prev["1234-5678"].name="who"
// //     cl(prev["1234-5678"])
//     return prev//{...prev,name:"what"}
//   })
//   setVal(setDeviceTypes,"1234","name","none")

//   await setDeviceTypes({...deviceTypes,  "1234": {
//         name: "a",
//         fieldTwo: {
//            fieldTwoOne: "b",
//            fieldTwoTwo: "c"
//            }
//         },
//    })
//   cl(deviceTypes)
//   cl({...deviceTypes, "1234":"new"})
//   cl(prevState => (
//       {...prevState,[name]: prevState["1234"].name+"abc"}
//     ))
//     setDeviceTypes(prevState => (
//       {...prevState,[name]: prevState["1234"].name+"abc"}
//     ));
//   cl(await ufs.get("/testValue"))
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

// var deviceTypeOptions=(isType)=>{
// //   cl(deviceTypes)
//   let types=Object.keys(deviceTypes).filter(k=>{return isType^(k.indexOf("-")>=0)})
// //   if(!types.includes(devType)){
// // //     setDeviceTypes
// //   }
//   cl(types)
//   return types.map((k,i)=>{
//     return(
//       <option key={i} value={k}>{deviceTypes[k].name}</option>
//     )
//   })
// //   if(deviceTypes.length){
// //     let types=deviceTypes.map((d,i)=>{
// //       return(
// //         <option key={i} value={d.id}>{d.name}</option>
// //       )
// //     })
// //     return types
// //   }else{
// //     return <option>No Device Types</option>
// //   }
// }

// var regOptions=()=>{
//   if(registers.length){
//     return registers.map((d,i)=>{
//       return(
//         <option key={i} value={d.id}>{d.name}</option>
//       )
//     })
//   }else{
//     return <option>No Device Types</option>
//   }
//   return
// }

// var getEntry=(arr,fVal)=>{
//   return arr.filter(a=>{return a.id==fVal})[0]
// }
//
// var setEntry=(arr,set,fVal,field2,fVal2)=>{
//   arr.filter(a=>{return a.id=fVal})[0][field2]=fVal2
//   set(arr.slice(0))
// }

var saveDeviceTypes=async(vals)=>{
  cl("save device types")
  await ufs.set("/deviceTypes",JSON.stringify(deviceTypes))
//   let deviceTypes=allDeviceTypes
//   cl(deviceTypes)
//   deviceTypes[selType]={
//     name:devTypeName,
//     id:selType,
//     registers:registers,
//   }
//   cl(deviceTypes)
}

// var selDeviceType=(val)=>{
//   setSelType(val)
//   let type=deviceTypes.filter(dt=>{return dt.id==val})[0]
//   setDevTypeName(type.name)
// }
//
// var selRegister=(val)=>{
//   setSelReg(val)
//   let reg=registers.filter(re=>{return re.id==val})[0]
//   cl(reg)
//
// }

var onChange=(type,vals)=>{
  cl(type,vals)
  let cmds={addType:addType,deleteType:deleteType,addRegister:addRegister,
    deleteRegister:deleteRegister,save:saveDeviceTypes,
  }
  if(cmds[type]){
    return cmds[type](vals)
  }
}

var removeType=(id,isType)=>{
  let dt=Object.assign({},deviceTypes)
  let types=getTypesRegs(isType)
//   cl(types)
  for(let i=0;i<types.length;i++){
    if(types[i]!=id){
      if(isType){
        setDevType(types[i])
      }else{
        setRegSel(types[i])
      }
      break
    }
  }
  delete dt[id]
  setDeviceTypes(dt)
}

var addType=()=>{
  let typeId=getRandomString(8)
  setVal(setDeviceTypes,typeId,"name",makeTypeName(deviceTypes,"Device Type"))
  let regId=`${typeId}-${getRandomString(8)}`
  initRegister(regId)
  setSaveEnable(true)
}

var deleteType=()=>{
//   cl("delete type")
  removeType(devType,true)
  setSaveEnable(true)
}

var initRegister=(regId)=>{
  let name=makeTypeName(deviceTypes,"Register")
  setVal(setDeviceTypes,regId,"name",name)
  setVal(setDeviceTypes,regId,"addr",255)
  setVal(setDeviceTypes,regId,"mbType","H")
  setVal(setDeviceTypes,regId,"offset",0)
  setVal(setDeviceTypes,regId,"scale",1)
}

var addRegister=()=>{
  cl("add reg")
  let regId=`${devType}-${getRandomString(8)}`
  initRegister(regId)
  setSaveEnable(true)
}

var deleteRegister=()=>{
  cl("delete reg")
  removeType(regSel,false)
  setSaveEnable(true)
}

var getTypesRegs=(isType,type)=>{
  return Object.keys(deviceTypes).filter(k=>{
    return (isType^(k.indexOf("-")>=0))&&
      (isType||k.indexOf(type||devType)==0)
  })
}

var selectRegister=(type)=>{
  cl(type)
  let regs=getTypesRegs(false,type)
  cl(regs)
  setRegSel(regs[0])
}

function useMbTypeSelect(val,setFunc,row,col,label,id){
//   const [value, setValue] = useState(initVal);
  const value=val[row][col]
  let opts=[
    {v:"C",t:"Coil"},
    {v:"D",t:"Discrete"},
    {v:"H",t:"Holding"},
    {v:"I",t:"Input"},
  ].map((o,i)=>{
    return <option key={i} value={o.v}>{o.t}</option>
  })
  const select=<>
    <label htmlFor={id}>{label}</label><br/>
    <select id={id}
      value={value}
      onChange={e=>{
        setVal(setFunc,row,col,e.target.value)
        setSaveEnable(true)
      }}
    >
    {opts}
    </select>
  </>
  return [value, select];
}

function useDevTypeSelect(label,id,initVal,isType){
  const [value, setValue] = useState(initVal);
  let opts=getTypesRegs(isType).map((k,i)=>{return(
    <option key={i} value={k}>{deviceTypes[k].name}</option>
  )})
  const select=<>
  <label htmlFor={id}>{label}</label><br/>
  <select id={id}
    value={value}
    onChange={e=>{
      setValue(e.target.value)
      if(isType){selectRegister(e.target.value)}
    }}
  >
  {opts}
  </select>
  </>
  return [value, setValue, select];
}

function useInput(val,setFunc,row,col,label,id){
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

const loadLocal=async()=>{
  let data=await ufs.get("/deviceTypes")
  setDeviceTypes(JSON.parse(data))
  cl(data.length)
}

//   let [selType,setSelType]=useState("1234");
//   let [selReg,setSelReg]=useState("5678");
//   let [allDeviceTypes,setAllDeviceTypes]=useState({});
//   let [registers,setRegisters]=useState([])
//   let [devTypeName, setDevTypeName] = useState("");
  let [deviceTypes,setDeviceTypes]=useState(
  {
    "1234":{name:""},
    "1234-5678":{
      name:"",
      addr:0,
      offset:0,
      scale:0,
    },
  })
//   {
//     "1234":{
//       name:"Type One",
//     },
//     "1234-5678":{
//       name:"Reg One",
//       addr:13,
//       offset:0,
//       scale:1,
//     },
//     "1234-9678":{
//       name:"Reg Two",
//       addr:14,
//       offset:2,
//       scale:3,
//     },
//     "2345":{
//       name:"Type Two",
//     },
//     "2345-5678":{
//       name:"Reg One",
//       addr:13,
//       offset:0,
//       scale:1,
//     },
//     "2345-9678":{
//       name:"Reg Two",
//       addr:14,
//       offset:2,
//       scale:3,
//     },
//   });
//   cl(...prevState)
//   let name="here"
//   let value="there"
//     setDeviceTypes(prevState => ({
//         ...prevState,
//         [name]: value
//     }));
    //   cl("set")

//         onChange={e=>{setDevTypeName(e.currentTarget.value)}}/><br/><br/>

  const[saveEnable,setSaveEnable]=useState(false);
  let initType=getTypesRegs(true)[0]
  const[devType,setDevType, devSelect]=
    useDevTypeSelect("Select Device Type","selDevType",
    initType,true)
  const[typeName,typeNameInput]=useInput(deviceTypes, setDeviceTypes,
    devType,"name","Device Type Name","devTypeName")
  let initReg=getTypesRegs(false)[0]
  const[regSel,setRegSel, regSelect]=
    useDevTypeSelect("Select Register","selReg",
    initReg,false)
  const[regName,regNameInput]=useInput(deviceTypes, setDeviceTypes,
    regSel,"name","Register Name","registerName")

  const[mbType, mbTypeSelect]=
    useMbTypeSelect(deviceTypes, setDeviceTypes,
    regSel,"mbType","Register Type","registerType")

  const[regAddr,regAddrInput]=useInput(deviceTypes, setDeviceTypes,
    regSel,"addr","Register Address","registerAddr")
  const[regOfs,regOfsInput]=useInput(deviceTypes, setDeviceTypes,
    regSel,"offset","Register Offset","registerOfs")
  const[regScale,regScaleInput]=useInput(deviceTypes, setDeviceTypes,
    regSel,"scale","Register Scale","registerScale")
  useEffect(x=>{
    loadLocal()
  },[])
  return (
    <div className="App">
      <NavBar parms={{
        showSave:true,
        saveDisabled:!saveEnable,
        onChange:onChange,
      }}/>
      <div className="base center" style={{width:400}}>
      <h1>Device Types</h1>
      <table className="center"><tbody>
      <tr><td className="left">
      {devSelect}
        &nbsp;<span style={{color:"blue",fontSize:24,cursor:"pointer"}}
        onClick={x=>onChange("addType")} title="Add Type">+</span>
        &nbsp;<span style={{color:"red",fontSize:24,cursor:"pointer"}}
        onClick={x=>onChange("deleteType")} title="Delete Type">-</span>
      </td></tr>
      <tr><td className="left">
      <br/>{typeNameInput}<br/>
      <h3>{typeName} Registers</h3>
      {regSelect}
      &nbsp;<span style={{color:"blue",fontSize:24,cursor:"pointer"}}
      onClick={x=>onChange("addRegister")} title="Add Register">+</span>
      &nbsp;<span style={{color:"red",fontSize:24,cursor:"pointer"}}
      onClick={x=>onChange("deleteRegister")} title="Delete Register">-</span>
      <br/><br/>
      {regNameInput}<br/>
      {mbTypeSelect}<br/><br/>
      {regAddrInput}<br/>
      {regOfsInput}<br/>
      {regScaleInput}<br/>
      </td></tr>
      </tbody></table>
      <button type="button"
        onClick={testUfs}
      >Test Ufs</button>
      </div>
    </div>
  );
}

export default DeviceTypes
