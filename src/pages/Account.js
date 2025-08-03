import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Menu1 from "../utils/Menu1.js"
import Breadcrumbs from "../utils/Breadcrumbs.js"
import {cl,globs,
} from '../utils/utils.js'


function Account() {
  const [email, setEmail] = useState("red");

  return (
      <div style={{width:globs.screen.w,height:globs.screen.h-globs.bcHeight,
        backgroundColor:"white",
        textAlign:"left",
      }}>
      <Menu1 parms={{menu:"account"}}/>
      </div>
  );
}

export default Account
