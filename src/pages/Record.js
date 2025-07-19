import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
import {cl,globs,wsTrans,getTime} from '../utils/utils.js'

function Record({parms}) {
  const [email, setEmail] = useState("red");
  const [audioStream,setAudioStream]=useState(null)
  const [mediaRecorder,setMediaRecorder]=useState(null)
  const [audioContext,setAudioContext]=useState(null)
  const [analyser,setAnalyser]=useState(null)
  const [domainData,setDomainData]=useState(null)
  const [startTime,setStartTime]=useState(null)
  const [levelAvg,setLevelAvg]=useState(null)
  const [getLevelInterval,setGetLevelInterval]=useState(null)
  const [run,setRun]=useState(false)
//   cl(parms)

  var blobToBase64=(blob)=>{
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  var sendAudio=async(data)=>{
//     cl(parms)
    let res=await wsTrans({cmd: "cRest", uri: "/s/openai",
      method: "update", sessionId: null/*globs.userData.session.sessionId*/,
      body: {sessionId:globs.sessionId,cmd:"transcribe",data:data}})
//     this.sendText(res.data.transcription)
//     cl(res)
//     parms.onChange({selTab:parms.selTab,selSct:parms.selSct,res:res})
    parms.onChange({id:parms.id,res:res[0]})
  }

  var getLevel=()=>{
    cl(audioContext)
    var audioStreamSource=
      audioContext.createMediaStreamSource(audioStream);
    audioStreamSource.connect(analyser);
    analyser.getByteTimeDomainData(domainData)
    let total=0
    let avg=0
    domainData.forEach(d=>{
      avg=avg*.95+(d-128)*.05// 351hz filter
      total+=avg*avg
    })
    levelAvg=0.9*levelAvg+0.1*Math.sqrt(total)
    cl(levelAvg)
//     cl((getTime()-this.startTime))
    if(((getTime()-startTime)>5)&&(levelAvg<100)){
//       cl("stop")
      stopRecord()
      clearInterval(getLevelInterval)
    }
  }

  var addChunk=async(chunk)=>{
//     cl("send Chunk")
    let data=await blobToBase64(chunk.data)
    sendAudio(data)
  }

  var initAudio=async()=>{
    let ast=await navigator.mediaDevices.getUserMedia({
      audio:true,
      video:false
    })
    setAudioStream(ast)
//     this.mediaRecorder=
    let mre=new MediaRecorder(ast)
    setMediaRecorder(mre)
    mre.addEventListener("dataavailable",addChunk)
    let adc=new AudioContext();
//     cl(adc)
    setAudioContext(adc)
    let ana=adc.createAnalyser();
    setAnalyser(ana)
    ana.fftSize = 1024;
    ana.minDecibels = -35;
    mre.start()
    let dd=new Uint8Array(1024)// 1024 default
    setDomainData(dd)
//     this.startTime=getTime()
    setStartTime(getTime())
//     this.levelAvg=200
    setLevelAvg(200)

//     this.getLevelInterval=setInterval(this.getLevel,100)
//     let gli=setInterval(getLevel,1000)
//     setGetLevelInterval(gli)
//     cl("init audio done")
  }

  var record=()=>{
    cl("record")
    initAudio()
  }

  var stop=()=>{
    cl("stop")
    mediaRecorder.stop()
  }

  var doTrans2=()=>{
    return new Promise((r,e)=>{

    })
  }

  var doTranscribe=async()=>{
    if(run){
      mediaRecorder.stop()
    }else{
      initAudio()
    }
    setRun(!run)
    let res=await doTrans2()
  }

  let bgColor=(run)?"#CC8888":"#FFFFFF"
  return (
    <div style={{display:"inline-block"}}>
      <img src="/utils/mic.png" width="48" style={{backgroundColor:bgColor}}
      onClick={e=>{doTranscribe()}}
      />
    </div>
  );
//     <div className="App">
//       <div style={{width:430,height:920,backgroundColor:"white"}}>
//       <h3>Record</h3>
//       <button type="button" onClick={record}>Record</button>
//       <button type="button" onClick={stop}>Stop</button>
//       </div>
//     </div>
}

export default Record
