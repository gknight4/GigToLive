import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
// import logo from './logo.svg';
// import Register from "./pages/register.js"
// import Home from "./pages/home.js"
// import Color from "./pages/color.js"
// import Brand from "./pages/Brand.js"
// import Calendar from "./pages/Calendar.js"
// import Communication from "./pages/Communication.js"
// import Contacts from "./pages/Contacts.js"
// import CreativeNotes from "./pages/CreativeNotes.js"
// import Documents from "./pages/Documents.js"
// import FollowUp from "./pages/FollowUp.js"
// import Gigs from "./pages/Gigs.js"
// import Media from "./pages/Media.js"
// import Metrics from "./pages/Metrics.js"
// import WorkDone from "./pages/WorkDone.js"
import RMG from "./pages/RMG.js"
// import DeviceTypes from "./pages/deviceTypes.js"
import './App.css';
import {cl,globs,setTabId,/*initUsersWs,*/openWS2,loadUser,loadGigs,
  loadGoogleCustomSearchClient,customSearch,
} from './utils/utils.js'


function App() {
  console.log("Main ap")
  const [ready,setReady]=useState()
  useEffect(x=>{
    loadInfo()
  },[])

  var loadInfo=async()=>{
    setTabId()
    await openWS2()
    globs.user0=await loadUser(true)
    globs.gigs0=await loadGigs()
//     cl(globs.gigs0)
//     await loadCustomSearch()
    await loadGoogleCustomSearchClient()
    cl("loaded")
//     let res=await customSearch()
//     cl(res)
    setReady(true)
  }

  if(ready){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<RMG/>}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
// Brand
// Calendar
// Communication
// Contacts






