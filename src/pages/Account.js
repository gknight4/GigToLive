import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Menu1 from "../utils/Menu1.js"
import Breadcrumbs from "../utils/Breadcrumbs.js"

function Account() {
  const [email, setEmail] = useState("red");

  return (
    <div className="App">
      <div style={{width:430,height:920,backgroundColor:"white",
        textAlign:"left",
      }}>
      <Breadcrumbs/>
      <Menu1 parms={{menu:"account"}}/>
      </div>
    </div>
  );
}

export default Account
