import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./navbar.js"

function Color() {
  const [email, setEmail] = useState("red");

  return (
    <div className="App">
      <NavBar/>
      <div className="base center" style={{width:400}}>
      <table className="center"><tbody>
      <tr><td className="left">
      <label htmlFor="email">Email</label><br/>
      <input id="email" type="text"
      onChange={e=>{setEmail(e.currentTarget.value)}}/><br/><br/>
      <label htmlFor="password">Password</label><br/>
      <input id="password" type="text"
      /><br/>
      </td></tr>
      </tbody></table>
      </div>
    </div>
  );
//   return (
//     <>
//       <h1>My favorite color is {color}!</h1>
//       <button
//         type="button"
//         onClick={() => setColor("blue")}
//       >Blue</button>
//       <button
//         type="button"
//         onClick={() => setColor("red")}
//       >Red</button>
//       <button
//         type="button"
//         onClick={() => setColor("pink")}
//       >Pink</button>
//       <button
//         type="button"
//         onClick={() => setColor("green")}
//       >Green</button>
//     </>
//   );
}

export default Color

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<FavoriteColor />);
