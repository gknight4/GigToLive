import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {Button} from 'react-bootstrap';

function ActionButton0({parms}) {
  const [email, setEmail] = useState("red");

  var oc=(type,vals)=>{return e=>{parms.oc(type,vals,e)}}

  return (
    <div style={{float:"none"}}>
    {parms.left&&
      <Button style={{float:"left"}}
      onClick={oc(parms.left.v)}>{parms.left.t}</Button>
    }
    {parms.right&&
      <Button style={{float:"right"}}
      onClick={oc(parms.right.v)}>{parms.right.t}</Button>
    }
      <div style={{clear:"both"}}/>
    </div>
  );
}

export default ActionButton0
