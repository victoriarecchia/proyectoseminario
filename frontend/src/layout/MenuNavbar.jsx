import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./MenuNavbar.css"
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Button } from '@mui/material';


export const MenuNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container >
        <Navbar.Brand href="/">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home"></Nav.Link>
            <Nav.Link as={Link} to={"/info"}>About us</Nav.Link>
            <Nav.Link as={Link} to={"/donar"}>Quiero donar</Nav.Link>
            <Nav.Link as={Link} to={"/donantes"}>Lista de donantes</Nav.Link>
            <Nav.Link as={Link} to={"/datos"}>Mis datos</Nav.Link>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="outlined" {...bindTrigger(popupState)}>
                    Mi cuenta
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close} component={Link} to="/login">Iniciar Sesion</MenuItem>
                    <MenuItem onClick={popupState.close} component={Link} to="/registro">Registrarme</MenuItem>
                    <MenuItem onClick={popupState.close} component={Link} to= "/"> Cerrar Sesion</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

