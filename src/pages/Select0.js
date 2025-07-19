import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"
import {cl,wsTrans} from '../utils/utils.js'

function Select0({parms}) {
  const [email, setEmail] = useState("red");
  const[show,setShow]=useState(true)
  const[open,setOpen]=useState(false)

//   cl(parms)

  function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  var openCtrl=()=>{setOpen(!open)}

  let classNames=`dropdown-content${(show)?" show":""}`
  let style={height:90,backgroundColor:"white"}
  if(parms.h){style.height=parms.h}
//   cl(parms.items)
  let ids=parms.items.map(i=>{return i.v})

  let rows=parms.items.map((i,ix)=>{
    let name=i.t
    let maxLen=50
    if(name.length>maxLen){
      name=name.substring(0,maxLen-3)+"..."
    }
    return(
    <div key={ix} style={{textAlign:"left",cursor:"pointer"}}
      className="shadeLine"
      onClick={e=>{
        openCtrl()
        parms.onSelect(i.v)}}
      >{name}
    </div>
  )})
  if(true||open){
    return (
      <div style={{padding:10,height:900,overflowY:"auto"}}>
      <table width="100%"
      className="shadeLine"
      style={{border:"1px solid #CCCCCC",textAlign:"left"}}>
      <tbody>
      <tr>
      <td width="14"><img src='/utils/searchicon.png'/></td>
      <td><input type="text" style={{width:"100%",border:"0px solid #FFFFFF"}}/></td>
      <td width="50">X</td></tr>
      </tbody></table>
      {rows}
      </div>
    );
  }else{
    return(
      <h3 onClick={openCtrl}>{parms.title}</h3>
    )

  }
//         <div style={{width:40,height:90,backgroundColor:"white"}}>
//           <div className="dropdown">
//             <div id="myDropdown" className={classNames}>
//               <input type="text" placeholder="Search.." id="myInput" />
//               <button type="button" onClick={openCtrl} id="myClose">X</button>
//               {rows}
//             </div>
//           </div>
//         </div>
}

export default Select0
