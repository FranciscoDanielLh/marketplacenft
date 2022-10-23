import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import nft from "./nft.png";
import logo from "../assets/logo_bbva.svg";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import background from "../assets/ot.jpg";
import metamask from "../assets/metamask.svg.png";
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

const Navigation = ({ web3Handler, account }) => {
  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundImage: `url(${background})`,
      height: "300px",
      borderRadius: "15px",
      textAlign: "center",
    },
    overlay: {
      background: "rgba(49, 71, 128, 0.8)",
    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function connectMeta() {
    web3Handler();
    setIsOpen(false);
  }

  return (
    <Navbar expand="lg" className="navbar-custom " variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} height="40" className="" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar navbar-dark bg-primary" />
        <Navbar.Collapse id="navbar navbar-dark bg-primary">
          <Nav className="menu-link"></Nav>
          <Nav>
            {account ? (
              <Nav className="menu-link">
             
         

                <Nav.Link className="nav-menu" as={Link} to="/marketplace">
                  MARKETPLACE
                </Nav.Link>

                <Nav.Link className="nav-menu" as={Link} to="/my-purchases">
                  COLECCIÓN
                </Nav.Link>

                <Nav.Link
                  href={`https://etherscan.io/address/${account}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-menu  nav-menu-cuenta"
                >
                  Cuenta
                </Nav.Link>
              </Nav>
            ) : (
              <Button onClick={openModal} variant="flat">
                ENTRAR
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 className="titulo-modal">CONECTAR CON METAMASK</h2>
          <hr className="titulo-modal" />
          <br />
          <img src={metamask} height="80" className="" alt="" />
          <br />
          <br />
          <Button onClick={connectMeta} variant="flat">
            Conectar Wallet
          </Button>
          <br />
          <a href="https://metamask.io/"> Revisa como puedes crearlo aquí</a>
        
        </Modal>
      </div>
    </Navbar>
  );
};

export default Navigation;
