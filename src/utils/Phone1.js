import React, { useState,useEffect,useRef } from "react";
import ReactDOM from "react-dom/client";
import Record from "../pages/Record.js"
import {cl,
} from '../utils/utils.js'

function Phone1({parms}) {
  const [email, setEmail] = useState("red");
  const [open,setOpen]=useState()

  var showPhoneField=()=>{

  }

  return (
    <div>
    {showPhoneField()}
    </div>
  );
}

export default Phone1
