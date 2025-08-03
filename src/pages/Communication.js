import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {cl,globs,
} from '../utils/utils.js'

function Communication() {
  const [email, setEmail] = useState("red");

  return (
    <div className="App">
      <div style={{width:globs.screen.w,height:globs.screen.h-globs.bcHeight,
        backgroundColor:"white"}}>
      <h3>Communication</h3>
      </div>
    </div>
  );
}

export default Communication
