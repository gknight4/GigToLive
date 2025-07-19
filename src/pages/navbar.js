// import Container from 'react-bootstrap/Container.js';
import { Link } from "react-router-dom";
import {Container,Nav,Navbar,NavDropdown,Form,Button,InputGroup,Row,Col,NavLink}
  from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar.js';
// import NavDropdown from 'react-bootstrap/NavDropdown.js';
// import Form from 'react-bootstrap/Form.js';
// import Button from 'react-bootstrap/Button.js';
// import InputGroup from 'react-bootstrap/InputGroup.js';
// import {Row,Col} from 'react-bootstrap';
// import Col from 'react-bootstrap/Col.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {cl,openWs,constant} from "../utils/utils.js"


function BasicExample({parms,person}) {
//   cl(props.parms)
// var pa=props?.parms||{}
//   cl(parms)
//   cl(person)

  var onChange=(type,vals)=>{
    return(e=>{parms.onChange(type,vals,e)})
    cl(type)
  }
// var onChange=(type,vals)=>{
//   if(props.parms.onChange(type,vals))
//   cl(type)
//
// }
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Link</Nav.Link>
//             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//             <Nav.Link href="/DeviceTypes">Device Types</Nav.Link>
//             {pa.showSave&&
//               <Form>
//                 <Row>
//                   <Col xs="auto">
//                     <Button type="button"
//                     onClick={x=>onChange("save")}
//                     disabled={props.parms.saveDisabled}
//                     >Save</Button>
//                   </Col>
//                 </Row>
//               </Form>
//             }
//
//
//           </Nav>
//         </Navbar.Collapse>
//             <Nav.Link href="Login">Login</Nav.Link>

//         <Navbar.Brand as={Link} to="/home"><img src="/heads/rmg.png" width="32"/></Navbar.Brand>
  return (
    <Navbar className="navbar" expand="lg" className="bg-body-tertiary"
    style={{marginBottom:0}}>
      <Container>
        <Nav.Link as={Link} to="/Brand"><img src="/heads/bra.png" width="32"/></Nav.Link>
        <Nav.Link as={Link} to="/Contacts"><img src="/heads/con.png" width="32"/>
        </Nav.Link>
        <Nav.Link as={Link} to="/Communication"><img src="/heads/com.png" width="32"/></Nav.Link>
        <Nav.Link as={Link} to="/Gigs">
          <img src="/heads/gig.png" width="32" style={{backgroundColor:"blue"}}/>
        </Nav.Link>
        <Nav.Link as={Link} to="/FollowUp"><img src="/heads/fol.png" width="32"/></Nav.Link>
        <Nav.Link as={Link} to="/Documents"><img src="/heads/doc.png" width="32"/></Nav.Link>
        <Nav.Link as={Link} to="/Media"><img src="/heads/med.png" width="32"/></Nav.Link>
        <Nav.Link as={Link} to="/Calendar"><img src="/heads/cal.png" width="32"/></Nav.Link>
        <Nav.Link as={Link} to="/Metrics"><img src="/heads/met.png" width="32"/></Nav.Link>
        <NavDropdown
          title=<img src="/heads/menu.png" width="32"/>
          align="end"
          id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/CreativeNotes">Creative Notes</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/WorkDone">
            Work Done
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/Record">Record</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to="#action/3.4">
            Separated link
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          title=<img src="/heads/user.png" width="32"/>
          align="end"
          id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/Login">Login</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/Register">Register</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/Profile">Profile</NavDropdown.Item>
          <NavDropdown.Item
            onClick={onChange("indeed",{c:"d"})}
          >Indeed</NavDropdown.Item>
          <NavDropdown.Item
            onClick={onChange("sendIndeed",{c:"d"})}
            >Send Indeed</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to="#action/3.4">
            Separated link
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
//           <NavDropdown.Item
//             onClick={onChange("login",{c:"d"})}
//           >Login</NavDropdown.Item>

}

export default BasicExample;
