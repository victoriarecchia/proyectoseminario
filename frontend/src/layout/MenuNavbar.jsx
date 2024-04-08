import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./MenuNavbar.css"
import { Link } from 'react-router-dom';



export const MenuNavbar = () => {
  return (
    <Navbar expand="lg"  className="bg-body-tertiary">
      <Container >
        <Navbar.Brand href="/">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home"></Nav.Link>
            <Nav.Link as = {Link} to = {"/info"}>About us</Nav.Link>
            <Nav.Link  as = {Link} to = {"/donar"}>Quiero donar</Nav.Link>
            <Nav.Link  as = {Link} to = {"/donantes"}>Lista de donantes</Nav.Link>
            <Nav.Link  as = {Link} to = {"/datos"}>Mis datos</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link href="/login">Iniciar Sesion</Nav.Link>
            <Nav.Link href="/registro">Registrarme</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

