import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import logo from './logo.svg';
import Register from "./pages/register.js"
import Home from "./pages/home.js"
import Color from "./pages/color.js"
import Brand from "./pages/Brand.js"
import Calendar from "./pages/Calendar.js"
import Communication from "./pages/Communication.js"
import Contacts from "./pages/Contacts.js"
import CreativeNotes from "./pages/CreativeNotes.js"
import Documents from "./pages/Documents.js"
import FollowUp from "./pages/FollowUp.js"
import Gigs from "./pages/Gigs.js"
import Media from "./pages/Media.js"
import Metrics from "./pages/Metrics.js"
import WorkDone from "./pages/WorkDone.js"
import RMG from "./pages/RMG.js"
import DeviceTypes from "./pages/deviceTypes.js"
import './App.css';
import {cl,setTabId,initUsersWs,openWS2,
} from './utils/utils.js'


function App() {
  console.log("Main ap")
  useEffect(x=>{
//     cl("use tab")
    setTabId()
    openWS2()
//     loadInfo()//.then(e=>{cl("loaded")})
//   openWebSocket(constant.wsUsersUrl)
//     initUsersWs()
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<RMG/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
Brand
Calendar
Communication
Contacts






